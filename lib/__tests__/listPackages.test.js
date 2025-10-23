import { strict as assert } from "node:assert";
import path from "node:path";
import { test } from "node:test";

import listPackages from "../listPackages.js";

const fixtures = new URL("./fixtures", import.meta.url).pathname;

test("listPackages()", async () => {
  const packages = await listPackages({ silent: true });
  assert.notEqual(packages.size, 0);

  /** @param {string} pkg */
  function assertPackageVersion(pkg) {
    assert.match(String(packages.get(pkg)), /^\d+\.\d+\.\d+$/u);
  }

  assertPackageVersion("eslint:eslint");
  assertPackageVersion("@actions/core:@actions/core");
  assertPackageVersion("npm-package-arg/node_modules/lru-cache:lru-cache");
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
