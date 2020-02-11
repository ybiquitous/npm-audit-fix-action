const core = require("@actions/core");
const { exec } = require("@actions/exec");
const audit = require("./audit");
const auditFix = require("./auditFix");
const npmArgs = require("./npmArgs");
const updateNpm = require("./updateNpm");
const report = require("./report");
const createPullRequest = require("./createPullRequest");

async function run() {
  try {
    await core.group("Update npm", async () => {
      await updateNpm();
    });

    await core.group("Install user packages", async () => {
      await exec("npm", npmArgs("install", "--package-lock-only"));
      await exec("npm", npmArgs("ci"));
    });

    const auditReport = await core.group("Get audit report", () => {
      return audit();
    });

    const fix = await core.group("Fix vulnerabilities", () => {
      return auditFix();
    });

    await core.group("Show audit report", () => {
      return report(auditReport, fix);
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

    const repository = process.env.GITHUB_REPOSITORY;
    if (!repository) {
      throw new Error("No GITHUB_REPOSITORY!");
    }

    const actor = process.env.GITHUB_ACTOR;
    if (!actor) {
      throw new Error("No GITHUB_ACTOR!");
    }

    await core.group("Create a pull request", () => {
      return createPullRequest({
        audit: auditReport,
        fix,
        branch,
        token: core.getInput("github_token"),
        defaultBranch: core.getInput("default_branch"),
        commitTitle: core.getInput("commit_title"),
        repository,
        actor,
        email: "actions@github.com",
      });
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
