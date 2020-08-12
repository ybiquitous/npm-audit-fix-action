const buildCommitBody = require("../buildCommitBody");
const report = require("./report.json");

test("buildCommitBody()", () => {
  expect(buildCommitBody(report)).toEqual(`Summary:
- Updated packages: 2
- Added packages: 1
- Removed packages: 1

Fixed vulnerabilities:
- mocha: "Prototype Pollution" (https://npmjs.com/advisories/1179)
`);

  expect(buildCommitBody({ added: [], removed: [], updated: [] })).toEqual(`Summary:
- Updated packages: 0
- Added packages: 0
- Removed packages: 0

No fixed vulnerabilities.
`);
});
