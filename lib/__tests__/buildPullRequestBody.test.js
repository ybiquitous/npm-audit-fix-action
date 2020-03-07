const buildPullRequestBody = require("../buildPullRequestBody");
const audit = require("./audit.json");
const auditFix = require("./auditFix.json");

test("buildPullRequestBody()", () => {
  expect(buildPullRequestBody(audit, auditFix)).toBe(
    `
### Updated

| Package | Version | Detail |
| ------- | ------- | ------ |
| [mod3](https://npm.im/mod3) | \`1.3.0\` → \`1.2.3\` | - |

### Added

| Package | Version | Detail |
| ------- | ------- | ------ |
| [mod1](https://npm.im/mod1)) | \`0.1.1\` | - |

### Removed

| Package | Version | Detail |
| ------- | ------- | ------ |
| [mod2](https://npm.im/mod2)) | \`1.2.3\` | - |

*This pull request is created by [npm-audit-fix-action](https://github.com/ybiquitous/npm-audit-fix-action).*
`.trim()
  );
});
