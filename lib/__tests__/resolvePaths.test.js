import path from "node:path";
import { test } from "node:test";

import resolvePaths from "../resolvePaths.js";

const cwd = path.join(new URL("./fixtures", import.meta.url).pathname, "resolvePaths");

test("resolvePaths() resolves a literal path as-is", async (t) => {
  const paths = await resolvePaths(["."], cwd);
  t.assert.deepEqual(paths, ["."]);
});

test("resolvePaths() resolves a literal nested path", async (t) => {
  const paths = await resolvePaths(["packages/foo"], cwd);
  t.assert.deepEqual(paths, ["packages/foo"]);
});

test("resolvePaths() expands a glob pattern to matching directories", async (t) => {
  const paths = await resolvePaths(["packages/*"], cwd);
  t.assert.deepEqual(paths, ["packages/bar", "packages/foo"]);
});

test("resolvePaths() ignores non-directory glob matches", async (t) => {
  const paths = await resolvePaths(["packages/*"], cwd);
  t.assert.equal(paths.includes("packages/readme.txt"), false);
});

test("resolvePaths() merges and dedupes multiple patterns", async (t) => {
  const paths = await resolvePaths([".", "packages/*", "packages/foo"], cwd);
  t.assert.deepEqual(paths, [".", "packages/bar", "packages/foo"]);
});

test("resolvePaths() throws for a pattern matching nothing", async (t) => {
  await t.assert.rejects(async () => {
    await resolvePaths(["no-such-dir"], cwd);
  }, /No directory matched/u);
  await t.assert.rejects(async () => {
    await resolvePaths(["no-such-dir/*"], cwd);
  }, /No directory matched/u);
});

test("resolvePaths() returns an empty array for an empty pattern list", async (t) => {
  t.assert.deepEqual(await resolvePaths([], cwd), []);
});
