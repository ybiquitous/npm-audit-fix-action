import { info, notice, setOutput } from "@actions/core";
import { exec } from "@actions/exec";
import * as github from "@actions/github";
import { PACKAGE_NAME } from "./constants.js";
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
 *   assignees: string[],
 * }} params
 */
// eslint-disable-next-line max-lines-per-function, max-statements
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
  assignees,
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
  await exec("git", ["add", "package.json", "package-lock.json"]);
  await exec("git", ["commit", "--message", `${title}\n\n${commitBody}`]);
  await exec("git", ["checkout", "-B", branch]);
  await exec("git", ["push", "--force", remote, `HEAD:${branch}`]);

  if (pull) {
    const { data: updated } = await octokit.rest.pulls.update({
      owner,
      repo,
      pull_number: pull.number,
      title,
      body: pullBody,
    });
    info(`The pull request was updated successfully: ${updated.html_url}`);
    notice(`${PACKAGE_NAME} successfully updated PR #${updated.number}: ${updated.html_url}`);
    setOutput("pull_request_url", updated.html_url);
    setOutput("branch_name", updated.head.ref);
  } else {
    const { data: created } = await octokit.rest.pulls.create({
      owner,
      repo,
      title,
      body: pullBody,
      head: branch,
      base: baseBranch,
    });
    info(`The pull request was created successfully: ${created.html_url}`);
    notice(`${PACKAGE_NAME} successfully created PR #${created.number}: ${created.html_url}`);
    setOutput("pull_request_url", created.html_url);
    setOutput("branch_name", created.head.ref);

    const newLabels = await octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number: created.number,
      labels,
    });
    info(`The labels were added successfully: ${newLabels.data.map((l) => l.name).join(", ")}`);

    if (assignees.length > 0) {
      const newAssignees = await octokit.rest.issues.addAssignees({
        owner,
        repo,
        issue_number: created.number,
        assignees,
      });
      info(
        `The assignee(s) were added successfully: ${newAssignees.data.assignees?.map((a) => a.login).join(", ") ?? newAssignees.data.assignee}`,
      );
    }
  }
}
