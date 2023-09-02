import process from "node:process";
import { getExecOutput } from "@actions/exec";
import npmArgs from "./npmArgs.js";

/**
 * @param {import("@actions/exec").ExecOptions} [options]
 * @returns {Promise<Map<string, string>>}
 */
export default async function listPackages(options = {}) {
  const cwd = options.cwd || process.cwd();
  const { exitCode, stdout, stderr } = await getExecOutput(
    "npm",
    npmArgs("ls", "--parseable", "--long", "--all", "--package-lock-only"),
    {
      ignoreReturnCode: true,
      ...options,
      cwd,
    },
  );

  // NOTE: Ignore missing peer deps error.
  if (exitCode !== 0 && !stderr.includes("npm ERR! missing:")) {
    throw new Error(`"npm ls" failed`);
  }

  /** @type {Map<string, string>} */
  const packages = new Map();

  stdout
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
