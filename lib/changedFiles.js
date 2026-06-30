import { getExecOutput } from "@actions/exec";
import { info } from "@actions/core";

const ALLOWED_FILES = new Set(["package.json", "package-lock.json"]);

/**
 * @param {typeof getExecOutput} [execFn]
 * @returns {Promise<string[]>}
 */
export default async function changedFiles(execFn = getExecOutput) {
  const { stdout } = await execFn("git", ["diff", "--name-only", "--relative", "HEAD"]);
  const all = stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const allowed = all.filter((file) => ALLOWED_FILES.has(file));
  const ignored = all.filter((file) => !ALLOWED_FILES.has(file));
  if (ignored.length > 0) {
    info(`Ignored changed files: ${ignored.map((file) => `"${file}"`).join(", ")}`);
  }
  return allowed;
}
