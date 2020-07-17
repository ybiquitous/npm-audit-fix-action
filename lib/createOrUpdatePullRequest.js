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
 *  labels: string[],
 * }} params
 */
module.exports = async function createOrUpdatePullRequest({
  token,
  branch,
  defaultBranch,
  title,
  body,
  repository,
  actor,
  email,
  labels,
}) {
  const remote = `https://${actor}:${token}@github.com/${repository}.git`;
  const [owner, repo] = repository.split("/");
  const octokit = github.getOctokit(token);

  // Find pull request
  const pulls = await octokit.pulls.list({
    owner,
    repo,
    state: "open",
    base: defaultBranch,
    sort: "updated",
    direction: "desc",
    per_page: 100,
  });
  const pull = pulls.data.find(({ head }) => head.ref === branch);

  await exec("git", ["config", "user.name", actor]);
  await exec("git", ["config", "user.email", email]);
  await exec("git", ["add", "package-lock.json"]);
  await exec("git", ["commit", "--message", `${title}\n\n${body}`]);
  await exec("git", ["checkout", "-B", branch]);
  await exec("git", ["push", remote, `HEAD:${branch}`, ...(pull ? ["--force"] : [])]);

  if (pull) {
    await octokit.pulls.update({
      owner,
      repo,
      pull_number: pull.number,
      title,
      body,
    });
    console.log(`The pull request was updated successfully: ${pull.html_url}`);
  } else {
    const newPull = await octokit.pulls.create({
      owner,
      repo,
      title,
      body,
      head: branch,
      base: defaultBranch,
    });
    console.log(`The pull request was created successfully: ${newPull.data.html_url}`);

    const newLabels = await octokit.issues.addLabels({
      owner,
      repo,
      issue_number: newPull.data.number,
      labels,
    });
    console.log(`The labels were added successfully: ${newLabels.data.join(", ")}`);
  }
};
