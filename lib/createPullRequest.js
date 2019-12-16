const exec = require("@actions/exec");
const github = require("@actions/github");

module.exports = async function createPullRequest({
  audit,
  fix,
  token,
  defaultBranch,
  repo,
  actor,
  email,
}) {
  const commitSummary = "npm audit fix";
  const commitDetails = "";
  const commitMessage = `${commitSummary}\n\n${commitDetails}`;
  const branch = "npm-audit-fix";
  const remote = `https://${actor}:${token}@github.com/${repo}.git`;

  await exec.exec("git", ["config", "user.name", actor]);
  await exec.exec("git", ["config", "user.email", email]);
  await exec.exec("git", ["add", "package-lock.json"]);
  await exec.exec("git", ["commit", "--message", commitMessage]);
  await exec.exec("git", ["checkout", "-B", branch]);
  await exec.exec("git", ["push", remote, `HEAD:${branch}`]);

  const octokit = new github.GitHub(token);
  const [owner, repoName] = repo.split("/");
  const { data: pullRequest } = await octokit.pulls.create({
    owner: owner,
    repo: repoName,
    title: commitSummary,
    body: commitDetails,
    head: branch,
    base: defaultBranch,
  });
  console.log(pullRequest);
};
