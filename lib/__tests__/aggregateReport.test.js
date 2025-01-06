import { strict as assert } from "node:assert";
import { test } from "node:test";

import aggregateReport from "../aggregateReport.js";

// eslint-disable-next-line max-lines-per-function
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
  assert.deepEqual(result, {
    added: [
      {
        location: null,
        name: "arrify",
        version: "2.0.1",
      },
    ],
    packageCount: 4,
    packageUrls: {
      arrify: {
        name: "arrify",
        type: "github",
        url: "https://github.com/sindresorhus/arrify",
      },
      "css-select": {
        name: "css-select",
        type: "github",
        url: "https://github.com/fb55/css-select",
      },
      xmldom: {
        name: "xmldom",
        type: "github",
        url: "https://github.com/xmldom/xmldom",
      },
      y18n: {
        name: "y18n",
        type: "github",
        url: "https://github.com/yargs/y18n",
      },
    },
    removed: [
      {
        location: "svgo/node_modules/css-select",
        name: "css-select",
        severity: null,
        title: null,
        url: null,
        version: "3.1.2",
      },
      {
        location: null,
        name: "xmldom",
        severity: "Low",
        title: "Misinterpretation of malicious XML input",
        url: "https://npmjs.com/advisories/1650",
        version: "0.5.0",
      },
    ],
    updated: [
      {
        location: null,
        name: "y18n",
        previousVersion: "4.0.0",
        severity: "High",
        title: "Prototype Pollution",
        url: "https://npmjs.com/advisories/1654",
        version: "4.0.1",
      },
    ],
  });
});
