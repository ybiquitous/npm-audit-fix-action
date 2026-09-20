import nodePath from "node:path";
import * as core from "@actions/core";
import { exec, getExecOutput } from "@actions/exec";
import aggregateReport from "./aggregateReport.js";
import audit from "./audit.js";
import auditFix from "./auditFix.js";
import buildCommitBody from "./buildCommitBody.js";
import buildPullRequestBody from "./buildPullRequestBody.js";
import changedFiles from "./changedFiles.js";
import commit from "./commit.js";
import { NPM_VERSION } from "./constants.js";
import createOrUpdatePullRequest from "./createOrUpdatePullRequest.js";
import getDefaultBranch from "./getDefaultBranch.js";
import GitHubClient from "./GitHubClient.js";
import listPackages from "./listPackages.js";
import mergeReports from "./mergeReports.js";
import npmArgs from "./npmArgs.js";
import resolvePaths from "./resolvePaths.js";
import updateNpm from "./updateNpm.js";
import separatedList from "./utils/separatedList.js";

async function getNpmLocation() {
  return (await getExecOutput("which", ["npm"], { silent: true })).stdout.trim();
}

/**
 * @param {string} name
 * @returns {string}
 */
function getFromEnv(name) {
  const value = process.env[name];
  if (value) {
    return value;
  }
  throw new Error(`Not found '${name}' in the environment variables`);
}

/**
 * Runs the `npm audit fix` workflow for a single directory.
 *
 * @param {string} targetPath
 * @returns {Promise<{ report: Report, files: string[] }>}
 */
async function processPath(targetPath) {
  process.chdir(targetPath);
  core.info(`Current directory: ${process.cwd()}`);

  await core.group("Install user packages", async () => {
    await exec("npm", npmArgs("ci"));
  });

  const auditReport = await core.group("Get audit report", async () => {
    const res = await audit();
    core.info(JSON.stringify(res, null, 2));
    return res;
  });

  const beforePackages = await core.group("List packages before", () => listPackages());

  await core.group("Fix vulnerabilities", () => auditFix());

  await core.group("Re-install user packages", async () => {
    await exec("npm", npmArgs("ci"));
  });

  const afterPackages = await core.group("List packages after", () => listPackages());

  const report = await core.group("Aggregate report", async () => {
    const res = await aggregateReport(auditReport, beforePackages, afterPackages);
    core.info(JSON.stringify(res, null, 2));
    return res;
  });

  const files = await core.group("Check file changes", changedFiles);

  return { report, files };
}

// eslint-disable-next-line max-lines-per-function, max-statements
async function run() {
  await core.group("Show runtime info", async () => {
    core.info(`Node.js version: ${process.version}`);
    core.info(`Node.js location: ${process.execPath}`);

    core.addPath(process.execPath.replace(/\/node$/u, ""));

    core.info(`npm location: ${await getNpmLocation()}`);
  });

  const npmVersion = await core.group(`Update npm to ${NPM_VERSION}`, async () => {
    return await updateNpm(NPM_VERSION);
  });

  const rootDir = process.cwd();
  const pathPatterns = separatedList(core.getInput("path"), /[,\s]+/u);

  const targetPaths = await core.group("Resolve paths", async () => {
    const resolved = await resolvePaths(pathPatterns, rootDir);
    core.info(`Target paths: ${resolved.join(", ")}`);
    return resolved;
  });

  /** @type {Report[]} */
  const reports = [];
  /** @type {string[]} */
  const files = [];

  for (const targetPath of targetPaths) {
    await core.group(`Process path: "${targetPath}"`, async () => {
      process.chdir(rootDir);
      const result = await processPath(targetPath);
      reports.push(result.report);
      files.push(...result.files.map((file) => nodePath.posix.join(targetPath, file)));
    });
  }

  process.chdir(rootDir);

  const report = mergeReports(reports);
  if (report.packageCount === 0) {
    core.info("No update.");
    return;
  }

  if (files.length === 0) {
    core.info("No file changes.");
    return;
  }

  const token = core.getInput("github_token");
  const repository = getFromEnv("GITHUB_REPOSITORY");
  const client = new GitHubClient({ token, repository });
  const branch = core.getInput("branch");
  const title = core.getInput("commit_title");

  await core.group("Commit changes", async () => {
    await commit({
      client,
      branch,
      files,
      message: { headline: title, body: buildCommitBody(report) },
    });
  });

  await core.group("Create or update a pull request", async () => {
    const baseBranch = core.getInput("default_branch") || (await getDefaultBranch({ client }));

    const serverUrl = getFromEnv("GITHUB_SERVER_URL");
    const runId = getFromEnv("GITHUB_RUN_ID");

    return createOrUpdatePullRequest({
      client,
      branch,
      baseBranch,
      title,
      pullBody: buildPullRequestBody({
        report,
        npmVersion,
        github: { serverUrl, repository, runId },
      }),
      labels: separatedList(core.getInput("labels"), ","),
      assignees: separatedList(core.getInput("assignees"), ","),
    });
  });
}

run().catch((e) => core.setFailed(e.message));
