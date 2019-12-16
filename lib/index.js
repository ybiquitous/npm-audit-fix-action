const core = require("@actions/core");
const exec = require("@actions/exec");
const audit = require("./audit");
const auditFix = require("./auditFix");
const report = require("./report");
const createPullRequest = require("./createPullRequest");

const NPM_VERSION = "6.13.4";

async function run() {
  try {
    await core.group("Prepare", async () => {
      await exec.exec("npm", ["config", "set", "progress", "false"]);
      await exec.exec("npm", ["config", "set", "ignore-scripts", "true"]);
    });

    await core.group("Install npm", async () => {
      await exec.exec("sudo", ["npm", "install", "--global", `npm@${NPM_VERSION}`]);
    });

    await core.group("Install user packages", async () => {
      await exec.exec("npm", ["ci"]);
    });

    const auditData = await core.group("Get audit data", async () => {
      return await audit();
    });

    const fixData = await core.group("Fix vulnerabilities", async () => {
      return await auditFix();
    });

    await core.group("Show audit report", async () => {
      await report(auditData, fixData);
    });

    await core.group("Create a pull request", async () => {
      await createPullRequest({
        audit: auditData,
        fix: fixData,
        token: core.getInput("github_token"),
        defaultBranch: core.getInput("default_branch"),
        repo: process.env.GITHUB_REPOSITORY,
        actor: process.env.GITHUB_ACTOR,
        email: "actions@github.com",
      });
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
