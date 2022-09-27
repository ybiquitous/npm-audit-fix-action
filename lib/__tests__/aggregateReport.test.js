import { test, expect } from "@jest/globals";

import aggregateReport from "../aggregateReport.js";

test("aggregateReport()", async () => {
  const audit = new Map();
  audit.set("y18n", {
    name: "y18n",
    severity: "high",
    title: "Prototype Pollution",
    url: "https://npmjs.com/advisories/1654",
  });
  audit.set("xmldom", {
    name: "xmldom",
    severity: "low",
    title: "Misinterpretation of malicious XML input",
    url: "https://npmjs.com/advisories/1650",
  });

  const before = new Map();
  before.set("y18n:y18n", "4.0.0");
  before.set("xmldom:xmldom", "0.5.0");
  before.set("rimraf:rimraf", "3.0.2");
  before.set("svgo/node_modules/css-select:css-select", "3.1.2");

  const after = new Map();
  after.set("y18n:y18n", "4.0.1");
  after.set("arrify:arrify", "2.0.1");
  after.set("rimraf:rimraf", "3.0.2");

  const result = await aggregateReport(audit, before, after);
  expect(result).toMatchSnapshot();
});
