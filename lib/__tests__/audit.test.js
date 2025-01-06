import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import audit from "../audit.js";

/**
 * @param {string} path
 */
const fixture = (path) => new URL(`./fixtures/${path}`, import.meta.url);

const auditJson = JSON.parse(readFileSync(fixture("audit.json"), "utf8"));
const auditJson2 = JSON.parse(readFileSync(fixture("audit-2.json"), "utf8"));

/**
 * @param {unknown} json
 * @returns {typeof import("@actions/exec").getExecOutput}
 */
const mockExec = (json) => () =>
  Promise.resolve({ exitCode: 0, stdout: JSON.stringify(json), stderr: "" });

test("audit()", async () => {
  const packages = await audit(mockExec(auditJson));
  assert.equal(packages.size, 1);
  assert.deepEqual(packages.get("y18n"), {
    name: "y18n",
    severity: "high",
    title: "Prototype Pollution",
    url: "https://npmjs.com/advisories/1654",
  });
});

test("audit() - 2", async () => {
  const packages = await audit(mockExec(auditJson2));
  assert.equal(packages.size, 1);
  assert.deepEqual(packages.get("underscore.string"), {
    name: "underscore.string",
    severity: "moderate",
    title: "Regular Expression Denial of Service",
    url: "https://npmjs.com/advisories/745",
  });
});
