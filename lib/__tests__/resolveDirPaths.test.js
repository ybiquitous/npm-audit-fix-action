import { test } from "node:test";

import resolveDirPaths from "../resolveDirPaths.js";

const baseDir = new URL("./fixtures/resolveDirPaths", import.meta.url).pathname;

test("resolves literal paths as-is", async (t) => {
  const paths = await resolveDirPaths([".", "packages/foo"], baseDir);
  t.assert.deepEqual(paths, { resolved: [".", "packages/foo"], failed: [] });
});

test("expands a glob pattern to matching directories and ignores files", async (t) => {
  const paths = await resolveDirPaths(["packages/*"], baseDir);
  t.assert.deepEqual(paths, { resolved: ["packages/bar", "packages/foo"], failed: [] });
  t.assert.equal(paths.resolved.includes("packages/sample.js"), false);
});

test("merges and dedupes multiple patterns", async (t) => {
  const paths = await resolveDirPaths([".", "packages/*", "packages/foo"], baseDir);
  t.assert.deepEqual(paths, { resolved: [".", "packages/bar", "packages/foo"], failed: [] });
});

test("throws for a pattern matching nothing", async (t) => {
  const paths = await resolveDirPaths([".", "no-such-dir", "no-such-dir/*"], baseDir);
  t.assert.deepEqual(paths, { resolved: ["."], failed: ["no-such-dir", "no-such-dir/*"] });
});

test("returns an empty array for an empty pattern list", async (t) => {
  t.assert.deepEqual(await resolveDirPaths([], baseDir), { resolved: [], failed: [] });
});
