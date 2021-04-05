const listPackages = require("../listPackages");

test("listPackages()", async () => {
  const packages = await listPackages();
  expect(packages.size).not.toEqual(0);
  expect(packages.get("jest")).toMatch(/^\d+\.\d+\.\d+$/u);
});
