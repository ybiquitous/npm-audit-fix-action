import { readFile } from "node:fs/promises";
import { getExecOutput } from "@actions/exec";
import { info } from "@actions/core";

/**
 * @param {{ client: GitHubClient, branch: string, sha: string }} params
 */
async function createOrUpdateBranchRef({ client, branch, sha }) {
  const ref = `heads/${branch}`;
  try {
    await client.getRef({ ref });
    await client.updateRef({ ref, sha, force: true });
    info(`Updated the ref '${ref}' with ${sha}`);
  } catch {
    await client.createRef({ ref: `refs/${ref}`, sha });
    info(`Created the ref 'refs/${ref}' with ${sha}`);
  }
}

/**
 * @param {string} rev
 * @returns {Promise<string>}
 */
async function revParse(rev) {
  return (await getExecOutput("git", ["rev-parse", rev])).stdout.trim();
}

/**
 * @param {{
 *   client: GitHubClient,
 *   branch: string,
 *   files: string[],
 *   message: string,
 *   author: { name: string, email: string },
 * }} params
 */
export default async function commit({ client, branch, files, message, author }) {
  const pathPrefix = await revParse("--show-prefix");
  const baseSha = await revParse("HEAD");
  const baseTreeSha = await revParse("HEAD^{tree}");

  const fileChanges = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(file, "utf8");
      return { file, content };
    }),
  );

  const { data: tree } = await client.createTree({
    base_tree: baseTreeSha,
    tree: fileChanges.map(({ file, content }) => ({
      path: `${pathPrefix}${file}`,
      mode: "100644",
      type: "blob",
      content,
    })),
  });
  info(`Created the tree ${tree.sha}`);

  const { data: commit } = await client.createCommit({
    message,
    tree: tree.sha,
    parents: [baseSha],
    author,
  });
  info(`Created the commit ${commit.sha}`);

  await createOrUpdateBranchRef({ client, branch, sha: commit.sha });
}
