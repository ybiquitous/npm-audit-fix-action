import { PACKAGE_NAME, PACKAGE_URL } from "./constants.js";

const EMPTY = "-";

/**
 * @param {string} name
 * @param {string} version
 * @param {string | null} location
 */
const npmPackage = (name, version, location) => {
  let result = `[${name}](https://www.npmjs.com/package/${name}/v/${version})`;
  if (location != null) {
    result += `<br>(\`${location}\`)`;
  }
  return result;
};

/**
 * @param {...string} items
 */
const buildTableRow = (...items) => `| ${items.join(" | ")} |`;

/**
 * @param {Report} report
 * @param {string} name
 */
const repoLink = (report, name) => {
  const url = report.packageUrls[name];
  return url ? `[${url.type}](${url.url})` : EMPTY;
};

/**
 * @param {string} version
 */
const versionLabel = (version) => `\`${version}\``;

/**
 * @param {boolean} forUpdate
 */
const header = (forUpdate) => {
  if (forUpdate) {
    return [
      // With details
      "| Package | Version | Source | Severity | Link |",
      "|:--------|:-------:|:------:|:--------:|:-----|",
    ];
  }

  return [
    // Without details
    "| Package | Version | Source |",
    "|:--------|:-------:|:------:|",
  ];
};

/**
 * @typedef {{ serverUrl: string, repository: string, runId: string }} GitHubInfo
 *
 * @param {{ report: Report, npmVersion: string, github: GitHubInfo }} args
 * @returns {string}
 */
// eslint-disable-next-line max-lines-per-function, max-statements
export default function buildPullRequestBody({ report, npmVersion, github }) {
  const lines = [];
  lines.push(
    `This pull request fixes the vulnerable packages via [npm v${npmVersion}](https://github.com/npm/cli/releases/tag/v${npmVersion}).`,
  );

  if (report.updated.length > 0) {
    lines.push("");
    lines.push("<details open>");
    lines.push(`<summary><strong>Updated (${report.updated.length})</strong></summary>`);
    lines.push("");
    lines.push(...header(true));

    report.updated.forEach(({ name, version, location, previousVersion, severity, url }) => {
      lines.push(
        buildTableRow(
          npmPackage(name, version, location),
          `${versionLabel(previousVersion)}→${versionLabel(version)}`,
          repoLink(report, name),
          severity ? `**${severity}**` : EMPTY,
          url ? `<${url}>` : EMPTY,
        ),
      );
    });

    lines.push("");
    lines.push("</details>");
  }

  if (report.added.length > 0) {
    lines.push("");
    lines.push("<details open>");
    lines.push(`<summary><strong>Added (${report.added.length})</strong></summary>`);
    lines.push("");
    lines.push(...header(false));
    report.added.forEach(({ name, version, location }) => {
      lines.push(
        buildTableRow(
          npmPackage(name, version, location),
          versionLabel(version),
          repoLink(report, name),
        ),
      );
    });
    lines.push("");
    lines.push("</details>");
  }

  if (report.removed.length > 0) {
    lines.push("");
    lines.push("<details open>");
    lines.push(`<summary><strong>Removed (${report.removed.length})</strong></summary>`);
    lines.push("");
    lines.push(...header(false));
    report.removed.forEach(({ name, version, location }) => {
      lines.push(
        buildTableRow(
          npmPackage(name, version, location),
          versionLabel(version),
          repoLink(report, name),
        ),
      );
    });
    lines.push("");
    lines.push("</details>");
  }

  lines.push("");
  lines.push(
    `This pull request was created by [${PACKAGE_NAME}](${PACKAGE_URL}) in the [action run](${github.serverUrl}/${github.repository}/actions/runs/${github.runId}).`,
  );

  return lines.join("\n").trim();
}
