import { PACKAGE_NAME, PACKAGE_URL } from "./constants.js";

const EMPTY = "-";

export default function buildPullRequestBody(report, npmVersion) {
  /**
   * @param {string} name
   * @param {string} version
   */
  const npmPackage = (name, version) =>
    `[${name}](https://www.npmjs.com/package/${name}/v/${version})`;

  /**
   * @param {...string} items
   */
  const buildTableRow = (...items) => `| ${items.join(" | ")} |`;

  /**
   * @param {string} name
   * @returns {string}
   */
  const repoLink = (name) => {
    const url = report.packageUrls[name];
    return url ? `[${url.type}](${url.url})` : EMPTY;
  };

  /**
   * @param {string} version
   * @returns {string}
   */
  const versionLabel = (version) => `\`${version}\``;

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

    report.updated.forEach(({ name, version, previousVersion, severity, title, url }) => {
      let extra = EMPTY;
      if (severity != null && title != null && url != null) {
        extra = `**[${severity}]** ${title} ([ref](${url}))`;
      }
      lines.push(
        buildTableRow(
          npmPackage(name, version),
          `${versionLabel(previousVersion)} → ${versionLabel(version)}`,
          repoLink(name),
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

    report.added.forEach(({ name, version }) => {
      lines.push(
        buildTableRow(npmPackage(name, version), versionLabel(version), repoLink(name), EMPTY)
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

    report.removed.forEach(({ name, version }) => {
      lines.push(
        buildTableRow(npmPackage(name, version), versionLabel(version), repoLink(name), EMPTY)
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
