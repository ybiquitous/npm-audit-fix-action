import * as fs from "fs";
import * as path from "path";
import { exec } from "@actions/exec";

/**
 * Deletes the given file
 *
 * @param {string} filePath
 */
async function forceDelete(filePath) {
  if (fs.existsSync(filePath)) {
    await fs.promises.rm(filePath);
  }
}

/**
 * @param {import("@actions/exec").ExecOptions} [options]
 * @returns {Promise<void>}
 */
export default async function restoreYarn(options = {}) {
  const cwd = options.cwd || process.cwd();

  await forceDelete(path.join(cwd, "yarn.lock"));

  await exec("yarn", ["import", "--silent"]);

  await forceDelete(path.join(cwd, "package-lock.json"));
}
