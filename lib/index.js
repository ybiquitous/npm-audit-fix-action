const core = require("@actions/core");
const { exec } = require("@actions/exec");
const audit = require("./audit");
const auditFix = require("./auditFix");
const report = require("./report");
const createPullRequest = require("./createPullRequest");

const NPM_VERSION = "6.13.4";

async function run() {
  try {
    await core.group("Prepare", async () => {
      await exec("npm", ["config", "set", "progress", "false"]);
      await exec("npm", ["config", "set", "ignore-scripts", "true"]);
    });

    await core.group("Update npm", async () => {
      await exec("sudo", ["npm", "install", "--global", `npm@${NPM_VERSION}`]);
    });

    await core.group("Install user packages", async () => {
      await exec("npm", ["ci"]);
    });

    const auditReport = await core.group("Get audit report", async () => {
      return await audit();
    });

    const fix = await core.group("Fix vulnerabilities", async () => {
      return await auditFix();
    });

    await core.group("Show audit report", async () => {
      await report(auditReport, fix);
    });

    if (fix.updated.length + fix.added.length + fix.removed.length === 0) {
      console.log("No update.");
      return;
    }

    const branch = core.getInput("branch");
    const branchExists = await core.group("Check if branch exists", async () => {
      try {
        await exec("git", ["fetch", "--depth=1", "--quiet", "--no-auto-gc", "origin", branch]);
        return true;
      } catch (err) {
        return false;
      }
    });
    if (branchExists) {
      console.log(`"${branch}" branch exists already.`);
      return;
    }

    await core.group("Create a pull request", async () => {
      await createPullRequest({
        audit: auditReport,
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
