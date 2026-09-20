import { test } from "node:test";

import mergeReports from "../mergeReports.js";

/** @type {Report} */
const reportA = {
  added: [{ name: "arrify", version: "2.0.1", location: null }],
  removed: [],
  updated: [],
  packageCount: 1,
  packageUrls: {
    arrify: { name: "arrify", type: "github", url: "https://github.com/sindresorhus/arrify" },
  },
};

test("merges multiple reports into one", (t) => {
  /** @type {Report} */
  const reportB = {
    added: [],
    removed: [
      {
        name: "xmldom",
        version: "0.5.0",
        location: null,
        severity: "Low",
        title: "Misinterpretation of malicious XML input",
        url: "https://npmjs.com/advisories/1650",
      },
    ],
    updated: [
      {
        name: "y18n",
        version: "4.0.1",
        previousVersion: "4.0.0",
        location: null,
        severity: "High",
        title: "Prototype Pollution",
        url: "https://npmjs.com/advisories/1654",
      },
    ],
    packageCount: 2,
    packageUrls: {
      xmldom: { name: "xmldom", type: "github", url: "https://github.com/xmldom/xmldom" },
      y18n: { name: "y18n", type: "github", url: "https://github.com/yargs/y18n" },
    },
  };

  t.assert.deepEqual(mergeReports([reportA, reportB]), {
    added: reportA.added,
    removed: reportB.removed,
    updated: reportB.updated,
    packageCount: 3,
    packageUrls: { ...reportA.packageUrls, ...reportB.packageUrls },
  });
});

test("dedupes the package count across reports", (t) => {
  /** @type {Report} */
  const report = {
    added: [{ name: "arrify", version: "2.0.1", location: null }],
    removed: [
      { name: "arrify", version: "2.0.1", location: null, severity: null, title: null, url: null },
    ],
    updated: [
      {
        name: "arrify",
        version: "2.0.1",
        previousVersion: "2.0.0",
        location: null,
        severity: null,
        title: null,
        url: null,
      },
    ],
    packageCount: 1,
    packageUrls: {},
  };

  t.assert.deepEqual(mergeReports([report, report]), {
    added: [{ location: null, name: "arrify", version: "2.0.1" }],
    removed: [
      { name: "arrify", version: "2.0.1", location: null, severity: null, title: null, url: null },
    ],
    updated: [
      {
        name: "arrify",
        version: "2.0.1",
        previousVersion: "2.0.0",
        location: null,
        severity: null,
        title: null,
        url: null,
      },
    ],
    packageCount: 1,
    packageUrls: {},
  });
});

test("returns an empty report for an empty list", (t) => {
  t.assert.deepEqual(mergeReports([]), {
    added: [],
    removed: [],
    updated: [],
    packageCount: 0,
    packageUrls: {},
  });
});
