const core = require("@actions/core");
const { exec } = require("@actions/exec");
const audit = require("./audit");
const auditFix = require("./auditFix");
const npmArgs = require("./npmArgs");
const updateNpm = require("./updateNpm");
const report = require("./report");
const buildPullRequestBody = require("./buildPullRequestBody");
const createOrUpdatePullRequest = require("./createOrUpdatePullRequest");
const packageRepoUrls = require("./packageRepoUrls");

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

    const fix = await core.group("Fix vulnerabilities", async () => {
      const res = await auditFix();
      console.log(res);
      return res;
    });

    await core.group("Show audit report", () => {
      return report(auditReport, fix);
    });

    if (fix.updated.length + fix.added.length + fix.removed.length === 0) {
      console.log("No update.");
      return;
    }

    const changed = await filesChanged();
    if (changed) {
      console.log("No file changes.");
      return;
    }

    await core.group("Create or update a pull request", async () => {
      const allPackageNames = Array.from(
        new Set([
          ...fix.added.map(e => e.name),
          ...fix.updated.map(e => e.name),
          ...fix.removed.map(e => e.name),
        ])
      );
      const allUrls = await packageRepoUrls(allPackageNames);

      return createOrUpdatePullRequest({
        branch: core.getInput("branch"),
        token: core.getInput("github_token"),
        defaultBranch: core.getInput("default_branch"),
        title: core.getInput("commit_title"),
        body: buildPullRequestBody(auditReport, fix, allUrls),
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
