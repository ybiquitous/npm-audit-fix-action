const core = require("@actions/core");
const { exec } = require("@actions/exec");
const audit = require("./audit");
const auditFix = require("./auditFix");
const report = require("./report");
const createPullRequest = require("./createPullRequest");

const NPM_VERSION = "6.13.4";

const branchExists = async branch => {
  try {
    await exec("git", ["fetch", "--depth=1", "--quiet", "--no-auto-gc", "origin", branch]);
    return true;
  } catch (err) {
    return false;
  }
};

async function run() {
  try {
    await core.group("Prepare", async () => {
      await exec("npm", ["config", "set", "progress", "false"]);
      await exec("npm", ["config", "set", "ignore-scripts", "true"]);
    });

    await core.group("Install npm", async () => {
      await exec("sudo", ["npm", "install", "--global", `npm@${NPM_VERSION}`]);
    });

    await core.group("Install user packages", async () => {
      await exec("npm", ["ci"]);
    });

    const auditData = await core.group("Get audit data", async () => {
      return await audit();
    });

    const fix = await core.group("Fix vulnerabilities", async () => {
      return await auditFix();
    });

    await core.group("Show audit report", async () => {
      await report(auditData, fix);
    });

    if (fix.updated.length + fix.added.length + fix.removed.length === 0) {
      console.log("No update.");
      return;
    }

    const branch = core.getInput("branch");
    if (branchExists(branch)) {
      console.log(`"${branch}" branch exists already.`);
      return;
    }

    await core.group("Create a pull request", async () => {
      await createPullRequest({
        audit: auditData,
        fix: fix,
        token: core.getInput("github_token"),
        branch: branch,
        defaultBranch: core.getInput("default_branch"),
        commitTitle: core.getInput("commit_title"),
        repository: process.env.GITHUB_REPOSITORY,
        actor: process.env.GITHUB_ACTOR,
        email: "actions@github.com",
      });
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
