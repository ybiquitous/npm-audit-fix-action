import { exec } from "@actions/exec";

/**
 * @param {import("@actions/exec").ExecOptions} [options]
 * @returns {Promise<void>}
 */
export default async function restoreYarn(options = {}) {
  const cwd = options.cwd || process.cwd();

  await exec("rm -rf yarn.lock", undefined, { ...options, cwd });

  await exec("yarn import --silent", undefined, { ...options, cwd });

  await exec("rm -rf package-lock.json", undefined, { ...options, cwd });
}
