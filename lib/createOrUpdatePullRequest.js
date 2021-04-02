const { info } = require("@actions/core");
const { exec } = require("@actions/exec");
const github = require("@actions/github");
const splitRepo = require("./utils/splitRepo");

/**
 * @param {{
 *   token: string,
 *   branch: string,
 *   baseBranch: string,
 *   title: string,
 *   pullBody: string,
 *   commitBody: string,
 *   repository: string,
 *   actor: string,
 *   email: string,
 *   labels: string[],
 * }} params
 */
module.exports = async function createOrUpdatePullRequest({
  token,
  branch,
  baseBranch,
  title,
  pullBody,
  commitBody,
  repository,
  actor,
  email,
  labels,
}) {
  const remote = `https://${actor}:${token}@github.com/${repository}.git`;
  const { owner, repo } = splitRepo(repository);
  const octokit = github.getOctokit(token);

  // Find pull request
  const pulls = await octokit.pulls.list({
    owner,
    repo,
    state: "open",
    base: baseBranch,
    sort: "updated",
    direction: "desc",
    per_page: 100,
  });
  const pull = pulls.data.find(({ head }) => head.ref === branch);

  await exec("git", ["config", "user.name", actor]);
  await exec("git", ["config", "user.email", email]);
  await exec("git", ["add", "package-lock.json"]);
  await exec("git", ["commit", "--message", `${title}\n\n${commitBody}`]);
  await exec("git", ["checkout", "-B", branch]);
  await exec("git", ["push", remote, `HEAD:${branch}`, ...(pull ? ["--force"] : [])]);

  if (pull) {
    await octokit.pulls.update({
      owner,
      repo,
      pull_number: pull.number,
      title,
      body: pullBody,
    });
    info(`The pull request was updated successfully: ${pull.html_url}`);
  } else {
    const newPull = await octokit.pulls.create({
      owner,
      repo,
      title,
      body: pullBody,
      head: branch,
      base: baseBranch,
    });
    info(`The pull request was created successfully: ${newPull.data.html_url}`);

    const newLabels = await octokit.issues.addLabels({
      owner,
      repo,
      issue_number: newPull.data.number,
      labels,
    });
    info(`The labels were added successfully: ${newLabels.data.map((l) => l.name).join(", ")}`);
  }
};
