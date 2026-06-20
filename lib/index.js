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
import npmArgs from "./npmArgs.js";
import updateNpm from "./updateNpm.js";
import commaSeparatedList from "./utils/commaSeparatedList.js";

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

  process.chdir(core.getInput("path"));
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

  if (report.packageCount === 0) {
    core.info("No update.");
    return;
  }

  const files = await core.group("Check file changes", changedFiles);
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
      message: `${title}\n\n${buildCommitBody(report)}`,
      author: { name: core.getInput("github_user"), email: core.getInput("github_email") },
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
      labels: commaSeparatedList(core.getInput("labels")),
      assignees: commaSeparatedList(core.getInput("assignees")),
    });
  });
}

run().catch((e) => core.setFailed(e.message));
