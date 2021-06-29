import { readFileSync } from "fs";
import buildPullRequestBody from "../buildPullRequestBody.js";

// @ts-expect-error
const report = JSON.parse(readFileSync(new URL("./fixtures/report.json", import.meta.url), "utf8"));

test("buildPullRequestBody()", () => {
  expect(buildPullRequestBody(report, "7.7.0")).toBe(
    `
This pull request fixes the vulnerable packages via npm [7.7.0](https://github.com/npm/cli/releases/tag/v7.7.0).

<details open>
<summary><strong>Updated (2)</strong></summary>

| Package | Version | Source | Detail |
|:--------|:-------:|:------:|:-------|
| [minimist](https://www.npmjs.com/package/minimist/v/1.2.4) (\`foo/node_modules/minimist\`) | \`1.2.1\` → \`1.2.4\` | [github](https://github.com/substack/minimist) | - |
| [mocha](https://www.npmjs.com/package/mocha/v/1.4.3) | \`1.3.0\` → \`1.4.3\` | [github](https://github.com/mochajs/mocha) | **[Low]** Prototype Pollution ([ref](https://npmjs.com/advisories/1179)) |

</details>

<details open>
<summary><strong>Added (1)</strong></summary>

| Package | Version | Source | Detail |
|:--------|:-------:|:------:|:-------|
| [xo](https://www.npmjs.com/package/xo/v/0.38.0) | \`0.38.0\` | - | - |

</details>

<details open>
<summary><strong>Removed (1)</strong></summary>

| Package | Version | Source | Detail |
|:--------|:-------:|:------:|:-------|
| [@gitlab/ui](https://www.npmjs.com/package/@gitlab/ui/v/29.2.0) | \`29.2.0\` | [gitlab](https://gitlab.com/gitlab-org/gitlab-ui) | - |

</details>

***

Created by [ybiquitous/npm-audit-fix-action](https://github.com/ybiquitous/npm-audit-fix-action)
`.trim()
  );
});
