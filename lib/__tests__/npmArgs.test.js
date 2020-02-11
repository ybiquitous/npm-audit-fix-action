const npmArgs = require("../npmArgs");

test("npmArgs() without arguments", () => {
  expect(npmArgs()).toEqual(["--ignore-scripts", "--no-progress"]);
});

test("npmArgs() with arguments", () => {
  expect(npmArgs("a", "b")).toEqual(["a", "b", "--ignore-scripts", "--no-progress"]);
});
