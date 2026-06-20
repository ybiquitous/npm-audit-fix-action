import { getExecOutput } from "@actions/exec";

/**
 * List paths changed in the working tree relative to HEAD, scoped to the current
 * directory and returned relative to it (so they can be prefixed to form
 * repository-root paths).
 *
 * @returns {Promise<string[]>}
 */
export default async function changedFiles() {
  const { stdout } = await getExecOutput("git", ["diff", "--name-only", "--relative", "HEAD"]);
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
