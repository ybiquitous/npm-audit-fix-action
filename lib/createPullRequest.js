const { exec } = require("@actions/exec");
const github = require("@actions/github");

/**
 * @param {{
 *  token: string,
 *  branch: string,
 *  defaultBranch: string,
 *  title: string,
 *  body: string,
 *  repository: string,
 *  actor: string,
 *  email: string,
 * }} params
 */
module.exports = async function createPullRequest({
  token,
  branch,
  defaultBranch,
  title,
  body,
  repository,
  actor,
  email,
}) {
  const remote = `https://${actor}:${token}@github.com/${repository}.git`;
  const [owner, repo] = repository.split("/");

  await exec("git", ["config", "user.name", actor]);
  await exec("git", ["config", "user.email", email]);
  await exec("git", ["add", "package-lock.json"]);
  await exec("git", ["commit", "--message", `${title}\n\n${body}`]);
  await exec("git", ["checkout", "-B", branch]);
  await exec("git", ["push", remote, `HEAD:${branch}`]);

  const octokit = new github.GitHub(token);
  const { data: pullRequest } = await octokit.pulls.create({
    owner,
    repo,
    title,
    body,
    head: branch,
    base: defaultBranch,
  });
  console.log(`The pull request was created successfully: ${pullRequest.html_url}`);
};
