const buildPullRequestBody = require("../buildPullRequestBody");
const report = require("./fixtures/report.json");

test("buildPullRequestBody()", () => {
  expect(buildPullRequestBody(report, "7.7.0")).toBe(
    `
### Updated (2)

| Package | Version | Source | Detail |
|:--------|:-------:|:------:|:-------|
| [minimist](https://npm.im/minimist) | \`1.2.1\` → \`1.2.4\` | [github](https://github.com/substack/minimist) | - |
| [mocha](https://npm.im/mocha) | \`1.3.0\` → \`1.4.3\` | [github](https://github.com/mochajs/mocha) | **[Low]** Prototype Pollution ([ref](https://npmjs.com/advisories/1179)) |

### Added (1)

| Package | Version | Source | Detail |
|:--------|:-------:|:------:|:-------|
| [xo](https://npm.im/xo) | \`0.1.1\` | - | - |

### Removed (1)

| Package | Version | Source | Detail |
|:--------|:-------:|:------:|:-------|
| [@gitlab/ui](https://npm.im/@gitlab/ui) | \`1.2.3\` | [gitlab](https://gitlab.com/gitlab-org/gitlab-ui) | - |

***

This pull request is created by [ybiquitous/npm-audit-fix-action](https://github.com/ybiquitous/npm-audit-fix-action) via npm 7.7.0.
`.trim()
  );
});
