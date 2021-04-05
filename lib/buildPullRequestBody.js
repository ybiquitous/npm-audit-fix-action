const { PACKAGE_NAME, PACKAGE_URL } = require("./constants");

const EMPTY = "-";

/**
 * @param {Report} report
 * @param {string} npmVersion
 * @returns {string}
 */
module.exports = function buildPullRequestBody(report, npmVersion) {
  /**
   * @param {string} name
   */
  const npmPackage = (name) => `[${name}](https://npm.im/${name})`;

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
  if (report.updated.length > 0) {
    lines.push("");
    lines.push(`### Updated (${report.updated.length})`);
    lines.push("");
    lines.push(...header);

    report.updated.forEach(({ name, version, previousVersion, severity, title, url }) => {
      let extra = EMPTY;
      if (severity != null && title != null && url != null) {
        extra = `**[${severity}]** ${title} ([ref](${url}))`;
      }
      lines.push(
        buildTableRow(
          npmPackage(name),
          `${versionLabel(previousVersion)} → ${versionLabel(version)}`,
          repoLink(name),
          extra
        )
      );
    });
  }
  if (report.added.length > 0) {
    lines.push("");
    lines.push(`### Added (${report.added.length})`);
    lines.push("");
    lines.push(...header);
    report.added.forEach(({ name, version }) => {
      lines.push(buildTableRow(npmPackage(name), versionLabel(version), repoLink(name), EMPTY));
    });
  }
  if (report.removed.length > 0) {
    lines.push("");
    lines.push(`### Removed (${report.removed.length})`);
    lines.push("");
    lines.push(...header);
    report.removed.forEach(({ name, version }) => {
      lines.push(buildTableRow(npmPackage(name), versionLabel(version), repoLink(name), EMPTY));
    });
  }

  lines.push("");
  lines.push("***");
  lines.push("");
  lines.push(
    `This pull request is created by [${PACKAGE_NAME}](${PACKAGE_URL}). The used npm version is **${npmVersion}**.`
  );

  return lines.join("\n").trim();
};
