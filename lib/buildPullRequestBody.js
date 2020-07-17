const { PACKAGE_NAME, PACKAGE_URL, NPM_VERSION } = require("./constants");

/**
 * @param {Report} report
 * @returns {String}
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
   * @returns {string | null}
   */
  const repoLink = (name) => {
    const url = report.packageUrls[name];
    return url ? `[${url.type}](${url.url})` : null;
  };

  /**
   * @param {string} name
   * @returns {string}
   */
  const packageSummary = (name) => {
    const pkg = npmPackage(name);
    const repo = repoLink(name);
    return repo ? `${pkg} (${repo})` : pkg;
  };

  const header = [];
  header.push("| Package | Version | Detail |");
  header.push("|:--------|:-------:|:-------|");

  const lines = [];
  if (report.updated.length > 0) {
    lines.push("");
    lines.push(`### Updated (${report.updated.length})`);
    lines.push("");
    lines.push(...header);

    report.updated.forEach((e) => {
      lines.push(
        buildTableRow(
          packageSummary(e.name),
          `\`${e.previousVersion}\` → \`${e.version}\``,
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
      lines.push(buildTableRow(packageSummary(name), `\`${version}\``, "-"));
    });
  }
  if (report.removed.length > 0) {
    lines.push("");
    lines.push(`### Removed (${report.removed.length})`);
    lines.push("");
    lines.push(...header);
    report.removed.forEach(({ name, version }) => {
      lines.push(buildTableRow(packageSummary(name), `\`${version}\``, "-"));
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
