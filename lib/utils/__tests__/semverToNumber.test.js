import { test } from "node:test";

import semverToNumber from "../semverToNumber.js";

test("semverToNumber()", (t) => {
  t.assert.equal(semverToNumber("1.2.3"), 10203);
  t.assert.equal(semverToNumber("0.0.3"), 3);
  t.assert.equal(semverToNumber("0.9.3"), 903);
  t.assert.equal(semverToNumber("0.10.3"), 1003);
  t.assert.equal(semverToNumber("1.0.3"), 10003);
  t.assert.equal(semverToNumber("1.2.4"), 10204);
  t.assert.equal(semverToNumber("1.2.4-beta.1"), 10204);
});
