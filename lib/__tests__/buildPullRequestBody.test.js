import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import buildPullRequestBody from "../buildPullRequestBody.js";

const report = JSON.parse(readFileSync(new URL("./fixtures/report.json", import.meta.url), "utf8"));

const github = {
  serverUrl: "https://github.com",
  repository: "octocat/Hello-World",
  runId: "1658821493",
};

test("buildPullRequestBody()", () => {
  assert.equal(
    buildPullRequestBody({ report, npmVersion: "7.7.0", github }),
    `
This pull request fixes the vulnerable packages via [npm v7.7.0](https://github.com/npm/cli/releases/tag/v7.7.0).

<details open>
<summary><strong>Updated (2)</strong></summary>

| Package | Version | Source | Severity | Link |
|:--------|:-------:|:------:|:--------:|:-----|
| [minimist](https://www.npmjs.com/package/minimist/v/1.2.4)<br>(\`foo/node_modules/minimist\`) | \`1.2.1\`→\`1.2.4\` | [github](https://github.com/substack/minimist) | - | - |
| [mocha](https://www.npmjs.com/package/mocha/v/1.4.3) | \`1.3.0\`→\`1.4.3\` | [github](https://github.com/mochajs/mocha) | **Low** | <https://npmjs.com/advisories/1179> |

</details>

<details open>
<summary><strong>Added (1)</strong></summary>

| Package | Version | Source |
|:--------|:-------:|:------:|
| [xo](https://www.npmjs.com/package/xo/v/0.38.0) | \`0.38.0\` | - |

</details>

<details open>
<summary><strong>Removed (1)</strong></summary>

| Package | Version | Source |
|:--------|:-------:|:------:|
| [@gitlab/ui](https://www.npmjs.com/package/@gitlab/ui/v/29.2.0) | \`29.2.0\` | [gitlab](https://gitlab.com/gitlab-org/gitlab-ui) |

</details>

This pull request was created by [ybiquitous/npm-audit-fix-action](https://github.com/ybiquitous/npm-audit-fix-action) in the [action run](https://github.com/octocat/Hello-World/actions/runs/1658821493).
`.trim(),
  );
});
