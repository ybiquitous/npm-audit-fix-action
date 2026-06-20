import { strict as assert } from "node:assert";
import { test } from "node:test";

import changedFiles from "../changedFiles.js";

/**
 * @param {string} stdout
 * @returns {typeof import("@actions/exec").getExecOutput}
 */
const mockExec = (stdout) => () => Promise.resolve({ exitCode: 0, stdout, stderr: "" });

test("changedFiles() returns only package.json and package-lock.json", async () => {
  const files = await changedFiles(mockExec("package.json\npackage-lock.json\n"));
  assert.deepEqual(files, ["package.json", "package-lock.json"]);
});

test("changedFiles() filters out other files", async () => {
  const files = await changedFiles(mockExec("package.json\nsrc/index.js\nREADME.md\n"));
  assert.deepEqual(files, ["package.json"]);
});

test("changedFiles() returns an empty array when nothing matches", async () => {
  const files = await changedFiles(mockExec("src/index.js\n"));
  assert.deepEqual(files, []);
});

test("changedFiles() returns an empty array when there are no changes", async () => {
  const files = await changedFiles(mockExec(""));
  assert.deepEqual(files, []);
});

test("changedFiles() trims whitespace and ignores blank lines", async () => {
  const files = await changedFiles(mockExec("  package.json  \n\n  package-lock.json\n"));
  assert.deepEqual(files, ["package.json", "package-lock.json"]);
});
