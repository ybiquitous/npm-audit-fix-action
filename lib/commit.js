import { readFile } from "node:fs/promises";
import { getExecOutput } from "@actions/exec";
import { info } from "@actions/core";

/**
 * @param {{ client: GitHubClient, branch: string, sha: string }} params
 */
async function createOrUpdateBranchRef({ client, branch, sha }) {
  const ref = `heads/${branch}`;
  let exists = true;
  try {
    await client.getRef({ ref });
  } catch {
    exists = false;
  }
  if (exists) {
    await client.updateRef({ ref, sha, force: true });
    info(`Updated ref: ${ref}`);
  } else {
    await client.createRef({ ref: `refs/${ref}`, sha });
    info(`Created ref: refs/${ref}`);
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
 *   message: { headline: string, body: string },
 * }} params
 */
export default async function commit({ client, branch, files, message }) {
  const pathPrefix = await revParse("--show-prefix");
  const baseSha = await revParse("HEAD");

  await createOrUpdateBranchRef({ client, branch, sha: baseSha });

  const additions = await Promise.all(
    files.map(async (file) => ({
      path: `${pathPrefix}${file}`,
      contents: (await readFile(file)).toString("base64"),
    })),
  );

  const { sha } = await client.createCommitOnBranch({
    branch,
    expectedHeadOid: baseSha,
    message,
    fileChanges: { additions },
  });
  info(`Created verified commit: ${sha}`);
}
