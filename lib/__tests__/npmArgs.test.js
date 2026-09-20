import { test } from "node:test";

import npmArgs from "../npmArgs.js";

test("npmArgs() without arguments", (t) => {
  t.assert.deepEqual(npmArgs(), ["--ignore-scripts", "--no-progress"]);
});

test("npmArgs() with arguments", (t) => {
  t.assert.deepEqual(npmArgs("a", "b"), ["a", "b", "--ignore-scripts", "--no-progress"]);
});
