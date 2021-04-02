/**
 * @param {string} repository
 * @returns {{ owner: string, repo: string }}
 */
module.exports = function splitRepo(repository) {
  const [owner, repo] = repository.split("/");
  if (owner && repo) {
    return { owner, repo };
  }
  throw new TypeError(`invalid repository: "${repository}"`);
};
