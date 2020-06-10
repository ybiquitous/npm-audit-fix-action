const buildPullRequestBody = require("../buildPullRequestBody");
const report = require("./report.json");

test("buildPullRequestBody()", () => {
  expect(buildPullRequestBody(report)).toBe(
    `
### Updated

| Package | Version | Detail |
|:--------|:-------:|:-------|
| [minimist](https://npm.im/minimist) ([github](https://github.com/substack/minimist)) | \`1.2.1\` → \`1.2.4\` | - |
| [mocha](https://npm.im/mocha) ([github](https://github.com/mochajs/mocha)) | \`1.3.0\` → \`1.4.3\` | **[Low]** Prototype Pollution ([ref](https://npmjs.com/advisories/1179)) |

### Added

| Package | Version | Detail |
|:--------|:-------:|:-------|
| [xo](https://npm.im/xo) | \`0.1.1\` | - |

### Removed

| Package | Version | Detail |
|:--------|:-------:|:-------|
| [@gitlab/ui](https://npm.im/@gitlab/ui) ([gitlab](https://gitlab.com/gitlab-org/gitlab-ui)) | \`1.2.3\` | - |

***

This pull request is created by [npm-audit-fix-action](https://github.com/ybiquitous/npm-audit-fix-action). The used npm version is **6.14.5**.
`.trim()
  );
});
