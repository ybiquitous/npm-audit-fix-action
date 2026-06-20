import { info, notice, setOutput } from "@actions/core";
import { PACKAGE_NAME } from "./constants.js";

/**
 * @param {{
 *   client: GitHubClient,
 *   branch: string,
 *   baseBranch: string,
 *   title: string,
 *   pullBody: string,
 *   labels: string[],
 *   assignees: string[],
 * }} params
 */
// eslint-disable-next-line max-lines-per-function
export default async function createOrUpdatePullRequest({
  client,
  branch,
  baseBranch,
  title,
  pullBody,
  labels,
  assignees,
}) {
  // Find pull request
  const openPulls = await client.listPullRequest({
    state: "open",
    base: baseBranch,
    sort: "updated",
    direction: "desc",
    per_page: 100,
  });
  const pull = openPulls.data.find(({ head }) => head.ref === branch);

  if (pull) {
    const { data: updated } = await client.updatePullRequest({
      pull_number: pull.number,
      title,
      body: pullBody,
    });
    info(`The pull request was updated successfully: ${updated.html_url}`);
    notice(`${PACKAGE_NAME} successfully updated PR #${updated.number}: ${updated.html_url}`);
    setOutput("pull_request_url", updated.html_url);
    setOutput("branch_name", updated.head.ref);
  } else {
    const { data: created } = await client.createPullRequest({
      title,
      body: pullBody,
      head: branch,
      base: baseBranch,
    });
    info(`The pull request was created successfully: ${created.html_url}`);
    notice(`${PACKAGE_NAME} successfully created PR #${created.number}: ${created.html_url}`);
    setOutput("pull_request_url", created.html_url);
    setOutput("branch_name", created.head.ref);

    const newLabels = await client.addLabels({ issue_number: created.number, labels });
    info(`The labels were added successfully: ${newLabels.data.map((l) => l.name).join(", ")}`);

    if (assignees.length > 0) {
      const newAssignees = await client.addAssignees({ issue_number: created.number, assignees });
      info(
        `The assignee(s) were added successfully: ${newAssignees.data.assignees?.map((a) => a.login).join(", ") ?? newAssignees.data.assignee}`,
      );
    }
  }
}
