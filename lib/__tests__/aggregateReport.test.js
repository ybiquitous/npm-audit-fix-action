const aggregateReport = require("../aggregateReport");
const audit = require("./audit.json");
const auditFix = require("./auditFix.json");

test("aggregateReport()", async () => {
  const result = await aggregateReport(audit, auditFix);
  expect(result).toMatchSnapshot();
});
