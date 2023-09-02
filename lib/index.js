import process from "node:process";
import * as core from "@actions/core";
import { exec } from "@actions/exec";
import aggregateReport from "./aggregateReport.js";
import audit from "./audit.js";
import auditFix from "./auditFix.js";
import buildCommitBody from "./buildCommitBody.js";
import buildPullRequestBody from "./buildPullRequestBody.js";
import { NPM_VERSION } from "./constants.js";
import createOrUpdatePullRequest from "./createOrUpdatePullRequest.js";
import getDefaultBranch from "./getDefaultBranch.js";
import listPackages from "./listPackages.js";
import npmArgs from "./npmArgs.js";
import updateNpm from "./updateNpm.js";
import commaSeparatedList from "./utils/commaSeparatedList.js";

/**
 * @returns {Promise<boolean>}
 */
async function filesChanged() {
  try {
    const exitCode = await exec("git", ["diff", "--exit-code"]);
    return exitCode === 0;
  } catch (err) {
    return false;
  }
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

async function run() {
  core.info(`Running on Node.js ${process.version}`);
  core.addPath(process.execPath.replace(/\/node$/u, ""));

  const npmVersion = await core.group(`Update npm to ${NPM_VERSION}`, () => updateNpm(NPM_VERSION));

  await core.group("Show runtime info", async () => {
    await exec("npm", ["version"]);
  });

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

  const changed = await core.group("Check file changes", filesChanged);
  if (changed) {
    core.info("No file changes.");
    return;
  }

  await core.group("Create or update a pull request", async () => {
    const token = core.getInput("github_token");
    const repository = getFromEnv("GITHUB_REPOSITORY");

    let baseBranch = core.getInput("default_branch");
    if (!baseBranch) {
      baseBranch = await getDefaultBranch({ token, repository });
    }

    const author = core.getInput("github_user");
    const email = core.getInput("github_email");

    return createOrUpdatePullRequest({
      branch: core.getInput("branch"),
      token,
      baseBranch,
      title: core.getInput("commit_title"),
      pullBody: buildPullRequestBody(report, npmVersion),
      commitBody: buildCommitBody(report),
      repository,
      author,
      email,
      labels: commaSeparatedList(core.getInput("labels")),
    });
  });
}

run().catch((e) => core.setFailed(e.message));
