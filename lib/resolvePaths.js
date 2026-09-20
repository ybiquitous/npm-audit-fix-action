import { glob, stat } from "node:fs/promises";
import nodePath from "node:path";

/**
 * @param {string} dirPath
 * @returns {Promise<boolean>}
 */
async function isDirectory(dirPath) {
  try {
    return (await stat(dirPath)).isDirectory();
  } catch {
    return false;
  }
}

/**
 * @param {string} dirPath
 * @returns {string}
 */
function toPosixRelativePath(dirPath) {
  const posixPath = dirPath.split(nodePath.sep).join("/");
  return posixPath === "" ? "." : posixPath;
}

/**
 * Resolves directory paths from a list of literal paths and/or glob patterns.
 *
 * @param {string[]} patterns
 * @param {string} [cwd]
 * @returns {Promise<string[]>}
 */
export default async function resolvePaths(patterns, cwd = process.cwd()) {
  /** @type {Set<string>} */
  const resolved = new Set();

  for (const pattern of patterns) {
    // A literal, existing directory is used as-is, without being treated as a glob pattern.
    if (await isDirectory(nodePath.join(cwd, pattern))) {
      resolved.add(toPosixRelativePath(pattern));
      continue;
    }

    let matched = false;
    for await (const entry of glob(pattern, { cwd, withFileTypes: true })) {
      if (entry.isDirectory()) {
        matched = true;
        const relativePath = nodePath.relative(cwd, nodePath.join(entry.parentPath, entry.name));
        resolved.add(toPosixRelativePath(relativePath));
      }
    }

    if (!matched) {
      throw new Error(`No directory matched for the "path" input: "${pattern}"`);
    }
  }

  return Array.from(resolved).sort();
}
