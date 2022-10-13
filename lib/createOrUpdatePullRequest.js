import { info } from "@actions/core";
import { exec } from "@actions/exec";
import * as github from "@actions/github";
import splitRepo from "./utils/splitRepo.js";

/**
 * @param {{
 *   token: string,
 *   branch: string,
 *   baseBranch: string,
 *   title: string,
 *   pullBody: string,
 *   commitBody: string,
 *   repository: string,
 *   author: string,
 *   email: string,
 *   labels: string[],
 *   lockFile: string,
 * }} params
 */
export default async function createOrUpdatePullRequest({
  token,
  branch,
  baseBranch,
  title,
  pullBody,
  commitBody,
  repository,
  author,
  email,
  labels,
  lockFile,
}) {
  const remote = `https://${author}:${token}@github.com/${repository}.git`;
  const { owner, repo } = splitRepo(repository);
  const octokit = github.getOctokit(token);

  // Find pull request
  const pulls = await octokit.rest.pulls.list({
    owner,
    repo,
    state: "open",
    base: baseBranch,
    sort: "updated",
    direction: "desc",
    per_page: 100,
  });
  const pull = pulls.data.find(({ head }) => head.ref === branch);

  await exec("git", ["config", "user.name", author]);
  await exec("git", ["config", "user.email", email]);
  await exec("git", ["add", lockFile]);
  await exec("git", ["commit", "--message", `${title}\n\n${commitBody}`]);
  await exec("git", ["checkout", "-B", branch]);
  await exec("git", ["push", remote, `HEAD:${branch}`, ...(pull ? ["--force"] : [])]);

  if (pull) {
    await octokit.rest.pulls.update({
      owner,
      repo,
      pull_number: pull.number,
      title,
      body: pullBody,
    });
    info(`The pull request was updated successfully: ${pull.html_url}`);
  } else {
    const newPull = await octokit.rest.pulls.create({
      owner,
      repo,
      title,
      body: pullBody,
      head: branch,
      base: baseBranch,
    });
    info(`The pull request was created successfully: ${newPull.data.html_url}`);

    const newLabels = await octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number: newPull.data.number,
      labels,
    });
    info(`The labels were added successfully: ${newLabels.data.map((l) => l.name).join(", ")}`);
  }
}
