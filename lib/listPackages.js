import { exec } from "@actions/exec";
import npmArgs from "./npmArgs.js";

/**
 * @param {import("@actions/exec").ExecOptions} [options]
 * @returns {Promise<Map<string, string>>}
 */
export default async function listPackages(options = {}) {
  const cwd = options.cwd || process.cwd();
  let lines = "";
  let stderr = "";
  const returnCode = await exec(
    "npm",
    npmArgs("ls", "--parseable", "--long", "--all", "--package-lock-only"),
    {
      listeners: {
        stdout: (data) => {
          lines += data.toString();
        },
        stderr: (data) => {
          stderr += data.toString();
        },
      },
      ignoreReturnCode: true,
      ...options,
      cwd,
    }
  );

  // NOTE: Ignore missing peer deps error.
  if (returnCode !== 0 && !stderr.includes("npm ERR! missing:")) {
    throw new Error(`"npm ls" failed`);
  }

  /** @type {Map<string, string>} */
  const packages = new Map();

  lines
    .split("\n")
    .filter((line) => line.trim().length !== 0)
    .map((line) => line.replace(`${cwd}/node_modules/`, ""))
    .forEach((line) => {
      const versionSeparatorPosition = line.lastIndexOf("@");
      if (versionSeparatorPosition === line.length - 1) {
        return; // exclude when no version
      }
      const name = line.slice(0, versionSeparatorPosition);
      const version = line.slice(versionSeparatorPosition + 1);
      packages.set(name, version);
    });

  return packages;
}
