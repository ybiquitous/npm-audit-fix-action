const { PACKAGE_NAME, PACKAGE_URL, NPM_VERSION } = require("./constants");

/**
 * @param {Report} report
 * @returns {string}
 */
module.exports = function buildPullRequestBody(report) {
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
    return url ? `[${url.type}](${url.url})` : "-";
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

    report.updated.forEach((e) => {
      lines.push(
        buildTableRow(
          npmPackage(e.name),
          `${versionLabel(e.previousVersion)} → ${versionLabel(e.version)}`,
          repoLink(e.name),
          "severity" in e ? `**[${e.severity}]** ${e.title} ([ref](${e.url}))` : "-"
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
      lines.push(buildTableRow(npmPackage(name), versionLabel(version), repoLink(name), "-"));
    });
  }
  if (report.removed.length > 0) {
    lines.push("");
    lines.push(`### Removed (${report.removed.length})`);
    lines.push("");
    lines.push(...header);
    report.removed.forEach(({ name, version }) => {
      lines.push(buildTableRow(npmPackage(name), versionLabel(version), repoLink(name), "-"));
    });
  }

  lines.push("");
  lines.push("***");
  lines.push("");
  lines.push(
    `This pull request is created by [${PACKAGE_NAME}](${PACKAGE_URL}). The used npm version is **${NPM_VERSION}**.`
  );

  return lines.join("\n").trim();
};
