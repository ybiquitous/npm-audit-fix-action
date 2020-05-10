const core = require("@actions/core");
const { exec } = require("@actions/exec");
const audit = require("./audit");
const auditFix = require("./auditFix");
const npmArgs = require("./npmArgs");
const updateNpm = require("./updateNpm");
const aggregateReport = require("./aggregateReport");
const buildPullRequestBody = require("./buildPullRequestBody");
const createOrUpdatePullRequest = require("./createOrUpdatePullRequest");

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
    await core.group("Update npm", async () => {
      await updateNpm();
    });

    await core.group("Install user packages", async () => {
      await exec("npm", npmArgs("install", "--package-lock-only"));
      await exec("npm", npmArgs("ci"));
    });

    const auditReport = await core.group("Get audit report", async () => {
      const res = await audit();
      console.log(res);
      return res;
    });

    const fixReport = await core.group("Fix vulnerabilities", async () => {
      const res = await auditFix();
      console.log(res);
      return res;
    });

    const report = await core.group("Aggregate report", () => {
      return aggregateReport(auditReport, fixReport);
    });

    if (report.packageCount === 0) {
      console.log("No update.");
      return;
    }

    const changed = await core.group("Check file changes", filesChanged);
    if (changed) {
      console.log("No file changes.");
      return;
    }

    await core.group("Create or update a pull request", () => {
      return createOrUpdatePullRequest({
        branch: core.getInput("branch"),
        token: core.getInput("github_token") || getFromEnv("GITHUB_TOKEN"),
        defaultBranch: core.getInput("default_branch"),
        title: core.getInput("commit_title"),
        body: buildPullRequestBody(report),
        repository: getFromEnv("GITHUB_REPOSITORY"),
        actor: getFromEnv("GITHUB_ACTOR"),
        email: "actions@github.com",
      });
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
