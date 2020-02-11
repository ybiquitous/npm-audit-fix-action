const pkg = require("../../package.json");
const { npmVersion } = require("../updateNpm");

test("npmVersion()", () => {
  expect(npmVersion()).toBe(pkg.engines.npm);
});
