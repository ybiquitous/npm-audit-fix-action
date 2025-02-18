import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import buildCommitBody from "../buildCommitBody.js";

const report = JSON.parse(readFileSync(new URL("./fixtures/report.json", import.meta.url), "utf8"));

test("buildCommitBody()", () => {
  assert.equal(
    buildCommitBody(report),
    `Summary:
- Updated packages: 2
- Added packages: 1
- Removed packages: 1

Fixed vulnerabilities:
- mocha: Low (https://npmjs.com/advisories/1179)
`,
  );

  assert.equal(
    buildCommitBody({ added: [], removed: [], updated: [], packageCount: 0, packageUrls: {} }),
    `Summary:
- Updated packages: 0
- Added packages: 0
- Removed packages: 0

No fixed vulnerabilities.
`,
  );
});
