const path = require("path");

const listPackages = require("../listPackages");

test("listPackages()", async () => {
  const packages = await listPackages({ silent: true });
  expect(packages.size).not.toEqual(0);
  expect(packages.get("jest")).toMatch(/^\d+\.\d+\.\d+$/u);
  expect(packages.get("@actions/core")).toMatch(/^\d+\.\d+\.\d+$/u);
});

test("listPackages() with an empty package.json", async () => {
  const packages = await listPackages({
    silent: true,
    cwd: path.join(__dirname, "fixtures", "empty_package.json"),
  });
  expect(packages.size).toEqual(0);
});

test("listPackages() with a package.json having no version", async () => {
  const packages = await listPackages({
    silent: true,
    cwd: path.join(__dirname, "fixtures", "noversion_package.json"),
  });
  expect(packages.size).toEqual(0);
});
