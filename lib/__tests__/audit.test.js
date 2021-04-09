const audit = require("../audit");
const auditJson = require("./fixtures/audit.json");
const auditJson2 = require("./fixtures/audit-2.json");

const mockExec = (/** @type {unknown} */ json) =>
  jest.fn().mockImplementationOnce((_1, _2, options) => {
    options.listeners.stdout(JSON.stringify(json));
  });

test("audit()", async () => {
  const packages = await audit(mockExec(auditJson));
  expect(packages.size).toEqual(1);
  expect(packages.get("y18n")).toEqual({
    name: "y18n",
    severity: "high",
    title: "Prototype Pollution",
    url: "https://npmjs.com/advisories/1654",
  });
});

test("audit() - 2", async () => {
  const packages = await audit(mockExec(auditJson2));
  expect(packages.size).toEqual(1);
  expect(packages.get("underscore.string")).toEqual({
    name: "underscore.string",
    severity: "moderate",
    title: "Regular Expression Denial of Service",
    url: "https://npmjs.com/advisories/745",
  });
});
