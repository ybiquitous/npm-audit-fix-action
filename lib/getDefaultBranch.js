const github = require("@actions/github");

/**
 * @param {{token: string, repository: string}} params
 * @returns {Promise<string>}
 */
module.exports = async function getDefaultBranch({ token, repository }) {
  const octokit = github.getOctokit(token);
  const [owner, repo] = repository.split("/");
  const res = await octokit.repos.get({ owner, repo });
  return res.data.default_branch;
};
