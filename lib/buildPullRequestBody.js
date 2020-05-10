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
    lines.push("### Updated");
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
    lines.push("### Added");
    lines.push("");
    lines.push(...header);
    report.added.forEach(({ name, version }) => {
      lines.push(buildTableRow(packageSummary(name), `\`${version}\``, "-"));
    });
  }
  if (report.removed.length > 0) {
    lines.push("");
    lines.push("### Removed");
    lines.push("");
    lines.push(...header);
    report.removed.forEach(({ name, version }) => {
      lines.push(buildTableRow(packageSummary(name), `\`${version}\``, "-"));
    });
  }

  lines.push("");
  lines.push(
    "*This pull request is created by [npm-audit-fix-action](https://github.com/ybiquitous/npm-audit-fix-action).*"
  );

  return lines.join("\n").trim();
};
