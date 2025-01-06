import { strict as assert } from "node:assert";
import path from "node:path";
import { test } from "node:test";

import listPackages from "../listPackages.js";

const fixtures = new URL("./fixtures", import.meta.url).pathname;

test("listPackages()", async () => {
  const packages = await listPackages({ silent: true });
  assert.notEqual(packages.size, 0);
  assert.match(String(packages.get("eslint:eslint")), /^\d+\.\d+\.\d+$/u);
  assert.match(String(packages.get("@actions/core:@actions/core")), /^\d+\.\d+\.\d+$/u);
  assert.match(
    String(packages.get("eslint/node_modules/eslint-scope:eslint-scope")),
    /^\d+\.\d+\.\d+$/u,
  );
});

test("listPackages() with an empty package.json", async () => {
  const packages = await listPackages({
    silent: true,
    cwd: path.join(fixtures, "empty_package.json"),
  });
  assert.equal(packages.size, 0);
});

test("listPackages() with a package.json having no version", async () => {
  const packages = await listPackages({
    silent: true,
    cwd: path.join(fixtures, "noversion_package.json"),
  });
  assert.equal(packages.size, 0);
});
