import { exec, getExecOutput } from "@actions/exec";
import npmArgs from "./npmArgs.js";

/**
 * @param {string} version
 */
export default async function updateNpm(version) {
  await exec("sudo", ["npm", ...npmArgs("install", "--global", `npm@${version}`)]);

  const { stdout: actualVersion } = await getExecOutput("npm", ["--version"]);

  // HACK: Fix the error "npm update check failed".
  // eslint-disable-next-line dot-notation -- Prevent TS4111
  await exec("sudo", ["chown", "-R", `${process.env["USER"]}:`, `${process.env["HOME"]}/.config`]);

  return actualVersion.trim();
}
