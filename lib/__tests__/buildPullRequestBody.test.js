const buildPullRequestBody = require("../buildPullRequestBody");
const audit = require("./audit.json");
const auditFix = require("./auditFix.json");

test("buildPullRequestBody()", () => {
  const urls = new Map([
    ["mocha", { url: "https://github.com/mochajs/mocha", type: "github" }],
    ["@gitlab/ui", { url: "https://gitlab.com/gitlab-org/gitlab-ui", type: "gitlab" }],
  ]);

  expect(buildPullRequestBody(audit, auditFix, urls)).toBe(
    `
### Updated

| Package | Version | Detail |
|:--------|:-------:|:-------|
| [mocha](https://npm.im/mocha) ([github](https://github.com/mochajs/mocha)) | \`1.3.0\` → \`1.2.3\` | - |

### Added

| Package | Version | Detail |
|:--------|:-------:|:-------|
| [xo](https://npm.im/xo) | \`0.1.1\` | - |

### Removed

| Package | Version | Detail |
|:--------|:-------:|:-------|
| [@gitlab/ui](https://npm.im/@gitlab/ui) ([gitlab](https://gitlab.com/gitlab-org/gitlab-ui)) | \`1.2.3\` | - |

*This pull request is created by [npm-audit-fix-action](https://github.com/ybiquitous/npm-audit-fix-action).*
`.trim()
  );
});
