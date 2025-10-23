import * as core from "@actions/core";
import { exec } from "@actions/exec";
import getNpmVersion from "./getNpmVersion.js";
import npmArgs from "./npmArgs.js";

/**
 * @param {string} version
 */
export default async function updateNpm(version) {
  const currentVersion = await getNpmVersion();
  core.info(`The current npm version: ${currentVersion}`);

  const cmdArgs = npmArgs("install", "--global", `npm@${version}`);
  try {
    await exec("npm", cmdArgs);
  } catch (error) {
    // NOTE: Without actions/setup-node, sudo is required.
    core.error(String(error));
    await exec("sudo", ["npm", ...cmdArgs]);
  }

  const newVersion = await getNpmVersion();
  core.info(`The updated npm version: ${newVersion}`);

  // HACK: Fix the error "npm update check failed".
  // eslint-disable-next-line dot-notation -- Prevent TS4111
  await exec("sudo", ["chown", "-R", `${process.env["USER"]}:`, `${process.env["HOME"]}/.config`]);

  return newVersion;
}
