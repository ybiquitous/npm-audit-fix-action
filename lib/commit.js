import { readFile } from "node:fs/promises";
import { getExecOutput } from "@actions/exec";

/**
 * @param {{ client: GitHubClient, branch: string, sha: string }} params
 */
async function createOrUpdateBranchRef({ client, branch, sha }) {
  const ref = `heads/${branch}`;
  try {
    await client.getRef({ ref });
  } catch {
    await client.createRef({ ref: `refs/${ref}`, sha });
    return;
  }
  await client.updateRef({ ref, sha, force: true });
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
 * @returns {Promise<{ sha: string; }>}
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

  const { data: commit } = await client.createCommit({
    message,
    tree: tree.sha,
    parents: [baseSha],
    author,
  });

  await createOrUpdateBranchRef({ client, branch, sha: commit.sha });

  return { sha: commit.sha };
}
