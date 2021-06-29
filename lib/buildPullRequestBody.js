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
    result += ` (\`${location}\`)`;
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
 * @param {Report} report
 * @param {string} npmVersion
 * @returns {string}
 */
export default function buildPullRequestBody(report, npmVersion) {
  const header = [];
  header.push("| Package | Version | Source | Detail |");
  header.push("|:--------|:-------:|:------:|:-------|");

  const lines = [];
  lines.push(
    `This pull request fixes the vulnerable packages via npm [${npmVersion}](https://github.com/npm/cli/releases/tag/v${npmVersion}).`
  );

  if (report.updated.length > 0) {
    lines.push("");
    lines.push("<details open>");
    lines.push(`<summary><strong>Updated (${report.updated.length})</strong></summary>`);
    lines.push("");
    lines.push(...header);

    report.updated.forEach(({ name, version, location, previousVersion, severity, title, url }) => {
      let extra = EMPTY;
      if (severity != null && title != null && url != null) {
        extra = `**[${severity}]** ${title} ([ref](${url}))`;
      }
      lines.push(
        buildTableRow(
          npmPackage(name, version, location),
          `${versionLabel(previousVersion)} → ${versionLabel(version)}`,
          repoLink(report, name),
          extra
        )
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
    lines.push(...header);
    report.added.forEach(({ name, version, location }) => {
      lines.push(
        buildTableRow(
          npmPackage(name, version, location),
          versionLabel(version),
          repoLink(report, name),
          EMPTY
        )
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
    lines.push(...header);
    report.removed.forEach(({ name, version, location }) => {
      lines.push(
        buildTableRow(
          npmPackage(name, version, location),
          versionLabel(version),
          repoLink(report, name),
          EMPTY
        )
      );
    });
    lines.push("");
    lines.push("</details>");
  }

  lines.push("");
  lines.push("***");
  lines.push("");
  lines.push(`Created by [${PACKAGE_NAME}](${PACKAGE_URL})`);

  return lines.join("\n").trim();
}
