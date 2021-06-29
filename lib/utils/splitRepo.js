/**
 * @param {string} repository
 * @returns {{ owner: string, repo: string }}
 */
export default function splitRepo(repository) {
  const [owner, repo] = repository.split("/", 2);
  if (owner && repo) {
    return { owner, repo };
  }
  throw new TypeError(`invalid repository: "${repository}"`);
}
