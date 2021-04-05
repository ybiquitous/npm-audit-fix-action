const core = require("@actions/core");
const { exec } = require("@actions/exec");
const { NPM_VERSION } = require("./constants");
const audit = require("./audit");
const auditFix = require("./auditFix");
const npmArgs = require("./npmArgs");
const updateNpm = require("./updateNpm");
const listPackages = require("./listPackages");
const aggregateReport = require("./aggregateReport");
const buildPullRequestBody = require("./buildPullRequestBody");
const buildCommitBody = require("./buildCommitBody");
const createOrUpdatePullRequest = require("./createOrUpdatePullRequest");
const getDefaultBranch = require("./getDefaultBranch");
const commaSeparatedList = require("./utils/commaSeparatedList");

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
  try {
    const npmVersion = await core.group(`Update npm to ${NPM_VERSION}`, () =>
      updateNpm(NPM_VERSION)
    );

    await core.group("Install user packages", async () => {
      await exec("npm", npmArgs("install", "--package-lock-only"));
      await exec("npm", npmArgs("ci"));
    });

    const auditReport = await core.group("Get audit report", async () => {
      const res = await audit();
      core.info(JSON.stringify(res, null, 2));
      return res;
    });

    const beforePackages = await core.group("List packages before", () => listPackages());

    await core.group("Fix vulnerabilities", () => auditFix());

    const afterPackages = await core.group("List packages after", () => listPackages());

    const report = await core.group("Aggregate report", () =>
      aggregateReport(auditReport, beforePackages, afterPackages)
    );

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

      return createOrUpdatePullRequest({
        branch: core.getInput("branch"),
        token,
        baseBranch,
        title: core.getInput("commit_title"),
        pullBody: buildPullRequestBody(report, npmVersion),
        commitBody: buildCommitBody(report),
        repository,
        actor: getFromEnv("GITHUB_ACTOR"),
        email: "actions@github.com",
        labels: commaSeparatedList(core.getInput("labels")),
      });
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
