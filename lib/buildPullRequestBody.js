const newAdvisories = require("./utils/advisories");
const capitalize = require("./utils/capitalize");

/**
 * @param {string} name
 */
const npmPackage = name => `[${name}](https://npm.im/${name})`;

/**
 * @param {Advisory | undefined} advisory
 * @returns {string}
 */
const buildDetail = advisory => {
  if (advisory) {
    const { title, severity, url } = advisory;
    return `**[${capitalize(severity)}]** ${title} ([ref](${url}))`;
  }
  return "-";
};

/**
 * @param {...string} items
 */
const buildTableRow = (...items) => `| ${items.join(" | ")} |`;

/**
 * @param {AuditReport} audit
 * @param {AuditFix} fix
 * @param {Map<string, { type: string, url: string }>} urls
 * @returns {String}
 */
module.exports = function buildPullRequestBody(audit, fix, urls) {
  /**
   * @param {string} name
   * @returns {string | null}
   */
  const repoLink = name => {
    const url = urls.get(name);
    return url ? `[${url.type}](${url.url})` : null;
  };

  /**
   * @param {string} name
   * @returns {string}
   */
  const packageSummary = name => {
    const pkg = npmPackage(name);
    const repo = repoLink(name);
    return repo ? `${pkg} (${repo})` : pkg;
  };

  const advisories = newAdvisories(audit);

  const header = [];
  header.push("| Package | Version | Detail |");
  header.push("|:--------|:-------:|:-------|");

  const lines = [];
  if (fix.updated.length) {
    lines.push("");
    lines.push("### Updated");
    lines.push("");
    lines.push(...header);
    fix.updated.forEach(({ name, version, previousVersion }) => {
      lines.push(
        buildTableRow(
          packageSummary(name),
          `\`${previousVersion}\` → \`${version}\``,
          buildDetail(advisories.find(name, previousVersion))
        )
      );
    });
  }
  if (fix.added.length) {
    lines.push("");
    lines.push("### Added");
    lines.push("");
    lines.push(...header);
    fix.added.forEach(({ name, version }) => {
      lines.push(
        buildTableRow(
          packageSummary(name),
          `\`${version}\``,
          buildDetail(advisories.find(name, version))
        )
      );
    });
  }
  if (fix.removed.length) {
    lines.push("");
    lines.push("### Removed");
    lines.push("");
    lines.push(...header);
    fix.removed.forEach(({ name, version }) => {
      lines.push(
        buildTableRow(
          packageSummary(name),
          `\`${version}\``,
          buildDetail(advisories.find(name, version))
        )
      );
    });
  }

  lines.push("");
  lines.push(
    "*This pull request is created by [npm-audit-fix-action](https://github.com/ybiquitous/npm-audit-fix-action).*"
  );

  return lines.join("\n").trim();
};
