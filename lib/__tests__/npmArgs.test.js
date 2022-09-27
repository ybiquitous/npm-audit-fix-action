import { test, expect } from "@jest/globals";

import npmArgs from "../npmArgs.js";

test("npmArgs() without arguments", () => {
  expect(npmArgs()).toEqual(["--ignore-scripts", "--no-progress"]);
});

test("npmArgs() with arguments", () => {
  expect(npmArgs("a", "b")).toEqual(["a", "b", "--ignore-scripts", "--no-progress"]);
});
