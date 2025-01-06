import { strict as assert } from "node:assert";
import { test } from "node:test";

import semverToNumber from "../semverToNumber.js";

test("semverToNumber()", () => {
  assert.equal(semverToNumber("1.2.3"), 10203);
  assert.equal(semverToNumber("0.0.3"), 3);
  assert.equal(semverToNumber("0.9.3"), 903);
  assert.equal(semverToNumber("0.10.3"), 1003);
  assert.equal(semverToNumber("1.0.3"), 10003);
  assert.equal(semverToNumber("1.2.4"), 10204);
  assert.equal(semverToNumber("1.2.4-beta.1"), 10204);
});
