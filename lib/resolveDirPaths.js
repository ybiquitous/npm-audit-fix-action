import * as fs from "node:fs/promises";
import path from "node:path";

/**
 * @param {string} dirPath
 * @returns {Promise<boolean>}
 */
async function isDirectory(dirPath) {
  const dir = await fs.stat(dirPath, { throwIfNoEntry: false });
  return Boolean(dir?.isDirectory());
}

/**
 * @param {string} dirPath
 * @returns {Promise<boolean>}
 */
async function hasPackageFile(dirPath) {
  const file = await fs.stat(path.join(dirPath, "package.json"), { throwIfNoEntry: false });
  return Boolean(file?.isFile() || file?.isSymbolicLink());
}

/**
 * @param {string} dirPath
 * @returns {string}
 */
function toPosixPath(dirPath) {
  return dirPath.split(path.sep).join(path.posix.sep);
}

/**
 * @param {string[]} patterns
 * @param {string} baseDir
 * @returns {Promise<{ resolved: string[], excluded: string[], failed: string[] }>}
 */
export default async function resolveDirPaths(patterns, baseDir) {
  /** @type {Set<string>} */
  const resolved = new Set();
  /** @type {Set<string>} */
  const excluded = new Set();
  /** @type {Set<string>} */
  const failed = new Set();

  for (const pattern of patterns) {
    const testDir = path.join(baseDir, pattern);
    if (await isDirectory(testDir)) {
      ((await hasPackageFile(testDir)) ? resolved : excluded).add(toPosixPath(pattern));
      continue;
    }

    let matched = false;
    for await (const entry of fs.glob(pattern, { cwd: baseDir, withFileTypes: true })) {
      if (entry.isDirectory()) {
        matched = true;
        const relativePath = path.relative(baseDir, path.join(entry.parentPath, entry.name));
        ((await hasPackageFile(path.join(baseDir, relativePath))) ? resolved : excluded).add(
          toPosixPath(relativePath),
        );
      }
    }
    if (!matched) failed.add(pattern);
  }

  return {
    resolved: Array.from(resolved).sort(),
    excluded: Array.from(excluded).sort(),
    failed: Array.from(failed).sort(),
  };
}
