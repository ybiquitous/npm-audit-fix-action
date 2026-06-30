/**
 * @param {{client: GitHubClient}} params
 * @returns {Promise<string>}
 */
export default async function getDefaultBranch({ client }) {
  const res = await client.getRepository();
  return res.data.default_branch;
}
