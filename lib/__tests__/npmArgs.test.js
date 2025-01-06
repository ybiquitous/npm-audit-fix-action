import { strict as assert } from "node:assert";
import { test } from "node:test";

import npmArgs from "../npmArgs.js";

test("npmArgs() without arguments", () => {
  assert.deepEqual(npmArgs(), ["--ignore-scripts", "--no-progress"]);
});

test("npmArgs() with arguments", () => {
  assert.deepEqual(npmArgs("a", "b"), ["a", "b", "--ignore-scripts", "--no-progress"]);
});
