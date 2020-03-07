const newAdvisories = require("./utils/advisories");
const capitalize = require("./utils/capitalize");

/**
 * @param {string} name
 */
const npmPackage = name => `[${name}](https://npm.im/${name})`;

/**
 * @param {Advisory} advisory
 */
const buildDetail = ({ title, severity, url }) =>
  `**[${capitalize(severity)}]** ${title} ([ref](${url}))`;

/**
 * @param {AuditReport} audit
 * @param {AuditFix} fix
 */
module.exports = function buildPullRequestBody(audit, fix) {
  const advisories = newAdvisories(audit);

  const header = [];
  header.push("| Package | Version | Detail |");
  header.push("| ------- | ------- | ------ |");

  const lines = [];
  if (fix.updated.length) {
    lines.push("");
    lines.push("### Updated");
    lines.push("");
    lines.push(...header);
    fix.updated.forEach(({ name, version, previousVersion }) => {
      const advisory = advisories.find(name, previousVersion);
      const detail = advisory ? buildDetail(advisory) : "-";
      lines.push(`| ${npmPackage(name)} | \`${previousVersion}\` → \`${version}\` | ${detail} |`);
    });
  }
  if (fix.added.length) {
    lines.push("");
    lines.push("### Added");
    lines.push("");
    lines.push(...header);
    fix.added.forEach(({ name, version }) => {
      const advisory = advisories.find(name, version);
      const detail = advisory ? buildDetail(advisory) : "-";
      lines.push(`| ${npmPackage(name)}) | \`${version}\` | ${detail} |`);
    });
  }
  if (fix.removed.length) {
    lines.push("");
    lines.push("### Removed");
    lines.push("");
    lines.push(...header);
    fix.removed.forEach(({ name, version }) => {
      const advisory = advisories.find(name, version);
      const detail = advisory ? buildDetail(advisory) : "-";
      lines.push(`| ${npmPackage(name)}) | \`${version}\` | ${detail} |`);
    });
  }

  lines.push("");
  lines.push(
    "*This pull request is created by [npm-audit-fix-action](https://github.com/ybiquitous/npm-audit-fix-action).*"
  );

  return lines.join("\n").trim();
};
