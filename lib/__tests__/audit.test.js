const audit = require("../audit");
const auditJson = require("./fixtures/audit.json");

test("audit()", async () => {
  const exec = jest.fn().mockImplementationOnce((_1, _2, options) => {
    options.listeners.stdout(JSON.stringify(auditJson));
  });

  const packages = await audit(exec);
  expect(packages.size).toEqual(1);
  expect(packages.get("y18n")).toEqual({
    name: "y18n",
    severity: "high",
    title: "Prototype Pollution",
    url: "https://npmjs.com/advisories/1654",
  });
});
