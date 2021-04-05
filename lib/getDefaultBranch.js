const github = require("@actions/github");
const splitRepo = require("./utils/splitRepo");

/**
 * @param {{token: string, repository: string}} params
 * @returns {Promise<string>}
 */
module.exports = async function getDefaultBranch({ token, repository }) {
  const octokit = github.getOctokit(token);
  const res = await octokit.repos.get(splitRepo(repository));
  return res.data.default_branch;
};
