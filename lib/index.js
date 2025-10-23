import path from "node:path";
import * as core from "@actions/core";
import { exec, getExecOutput } from "@actions/exec";
import aggregateReport from "./aggregateReport.js";
import audit from "./audit.js";
import auditFix from "./auditFix.js";
import buildCommitBody from "./buildCommitBody.js";
import buildPullRequestBody from "./buildPullRequestBody.js";
import { NPM_VERSION } from "./constants.js";
import createOrUpdatePullRequest from "./createOrUpdatePullRequest.js";
import getDefaultBranch from "./getDefaultBranch.js";
import getNpmVersion from "./getNpmVersion.js";
import listPackages from "./listPackages.js";
import npmArgs from "./npmArgs.js";
import updateNpm from "./updateNpm.js";
import commaSeparatedList from "./utils/commaSeparatedList.js";

async function getNpmLocation() {
  return (await getExecOutput("which", ["npm"], { silent: true })).stdout.trim();
}

/**
 * HACK: This fallback works around the following error.
 *
 * ```
 * /home/runner/actions-runner/cached/externals/node24/bin/npm --version
 * ERROR: npm v11.6.1 is known not to run on Node.js v24.10.0.  This version of npm supports the following node versions: `^20.17.0 || >=22.9.0`. You can find the latest version at https://nodejs.org/.
 *
 * ERROR:
 * /home/runner/actions-runner/cached/externals/node24/lib/node_modules/npm/lib/cli/exit-handler.js:175
 * s.#process.exitCode || getExitCodeFromError(err) || 1)
 * ^
 *
 * SyntaxError: Private field '#process' must be declared in an enclosing class
 *     at wrapSafe (node:internal/modules/cjs/loader:1691:18)
 *     at Module._compile (node:internal/modules/cjs/loader:1734:20)
 *     at Object..js (node:internal/modules/cjs/loader:1893:10)
 *     at Module.load (node:internal/modules/cjs/loader:1480:32)
 *     at Module._load (node:internal/modules/cjs/loader:1299:12)
 *     at TracingChannel.traceSync (node:diagnostics_channel:328:14)
 *     at wrapModuleLoad (node:internal/modules/cjs/loader:244:24)
 *     at Module.require (node:internal/modules/cjs/loader:1503:12)
 *     at require (node:internal/modules/helpers:152:16)
 *     at module.exports (/home/runner/actions-runner/cached/externals/node24/lib/node_modules/npm/lib/cli/entry.js:11:23)
 * Error: The process '/home/runner/actions-runner/cached/externals/node24/bin/npm' failed with exit code 1
 * ```
 *
 * @param {unknown} error
 */
async function fallbackToLocalNpm(error) {
  if (error instanceof Error && error.message.includes("SyntaxError: Private field")) {
    core.addPath(path.resolve(import.meta.dirname, "node_modules", ".bin"));

    core.info(`Fallback to local npm due to SyntaxError`);
    core.info(`local npm location: ${await getNpmLocation()}`);

    const npmVersion = await getNpmVersion();
    core.info(`local npm version: ${npmVersion}`);

    if (!npmVersion.startsWith(NPM_VERSION)) {
      throw new Error(
        `The local npm version "${npmVersion}" does not match the required version "${NPM_VERSION}"`,
      );
    }

    return npmVersion;
  }

  throw error;
}

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

// eslint-disable-next-line max-lines-per-function
async function run() {
  await core.group("Show runtime info", async () => {
    core.info(`Node.js version: ${process.version}`);
    core.info(`Node.js location: ${process.execPath}`);

    core.addPath(process.execPath.replace(/\/node$/u, ""));

    core.info(`npm location: ${await getNpmLocation()}`);
  });

  const npmVersion = await core.group(`Update npm to ${NPM_VERSION}`, async () => {
    try {
      return await updateNpm(NPM_VERSION);
    } catch (e) {
      return await fallbackToLocalNpm(e);
    }
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
    const assignees = commaSeparatedList(core.getInput("assignees"));

    const serverUrl = getFromEnv("GITHUB_SERVER_URL");
    const runId = getFromEnv("GITHUB_RUN_ID");

    return createOrUpdatePullRequest({
      branch: core.getInput("branch"),
      token,
      baseBranch,
      title: core.getInput("commit_title"),
      pullBody: buildPullRequestBody({
        report,
        npmVersion,
        github: { serverUrl, repository, runId },
      }),
      commitBody: buildCommitBody(report),
      repository,
      author,
      email,
      labels: commaSeparatedList(core.getInput("labels")),
      assignees,
    });
  });
}

run().catch((e) => core.setFailed(e.message));
