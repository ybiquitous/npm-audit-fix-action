import { getOctokit } from "@actions/github";
import splitRepo from "./utils/splitRepo.js";

/**
 * @param {{token: string, repository: string}} params
 * @returns {Promise<string>}
 */
export default async function getDefaultBranch({ token, repository }) {
  const octokit = getOctokit(token);
  const res = await octokit.rest.repos.get(splitRepo(repository));
  return res.data.default_branch;
}
