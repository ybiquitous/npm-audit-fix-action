import { test } from "node:test";

import changedFiles from "../changedFiles.js";

/**
 * @param {string} stdout
 * @returns {typeof import("@actions/exec").getExecOutput}
 */
const mockExec = (stdout) => () => Promise.resolve({ exitCode: 0, stdout, stderr: "" });

test("changedFiles() returns only package.json and package-lock.json", async (t) => {
  const files = await changedFiles(mockExec("package.json\npackage-lock.json\n"));
  t.assert.deepEqual(files, ["package.json", "package-lock.json"]);
});

test("changedFiles() filters out other files", async (t) => {
  const files = await changedFiles(mockExec("package.json\nsrc/index.js\nREADME.md\n"));
  t.assert.deepEqual(files, ["package.json"]);
});

test("changedFiles() returns an empty array when nothing matches", async (t) => {
  const files = await changedFiles(mockExec("src/index.js\n"));
  t.assert.deepEqual(files, []);
});

test("changedFiles() returns an empty array when there are no changes", async (t) => {
  const files = await changedFiles(mockExec(""));
  t.assert.deepEqual(files, []);
});

test("changedFiles() trims whitespace and ignores blank lines", async (t) => {
  const files = await changedFiles(mockExec("  package.json  \n\n  package-lock.json\n"));
  t.assert.deepEqual(files, ["package.json", "package-lock.json"]);
});
