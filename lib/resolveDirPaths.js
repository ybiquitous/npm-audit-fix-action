import * as fs from "node:fs/promises";
import path from "node:path";

/**
 * @param {string} dirPath
 * @returns {Promise<boolean>}
 */
async function isDirectory(dirPath) {
  try {
    // TODO: `{ throwIfNoEntry: false }` option will make the error catching unneeded.
    const dir = await fs.stat(dirPath);
    return Boolean(dir?.isDirectory());
  } catch (e) {
    if (e instanceof Error && "code" in e && e.code === "ENOENT") return false;
    throw e;
  }
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
 * @returns {Promise<{ resolved: string[], failed: string[] }>}
 */
export default async function resolveDirPaths(patterns, baseDir) {
  /** @type {Set<string>} */
  const resolved = new Set();
  /** @type {Set<string>} */
  const failed = new Set();

  for (const pattern of patterns) {
    if (await isDirectory(path.join(baseDir, pattern))) {
      resolved.add(toPosixPath(pattern));
      continue;
    }

    let matched = false;
    for await (const entry of fs.glob(pattern, { cwd: baseDir, withFileTypes: true })) {
      if (entry.isDirectory()) {
        matched = true;
        const relativePath = path.relative(baseDir, path.join(entry.parentPath, entry.name));
        resolved.add(toPosixPath(relativePath));
      }
    }
    if (!matched) failed.add(pattern);
  }

  return { resolved: Array.from(resolved).sort(), failed: Array.from(failed).sort() };
}
