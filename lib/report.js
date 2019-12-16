const os = require("os");
const newAdvisories = require("./utils/advisories");
const capitalize = require("./utils/capitalize");

module.exports = async function report(audit, fix) {
  const advisories = newAdvisories(audit);

  const lines = [];

  lines.push("Updated:");
  if (fix.updated.length) {
    fix.updated.forEach(({ name, version, previousVersion }) => {
      lines.push(`  --> ${name}: ${previousVersion} to ${version}`);
      const { title, severity, cwe, url } = advisories.find(name, previousVersion);
      if (title) {
        lines.push(`      [${capitalize(severity)}] ${title} (${cwe})`);
        lines.push(`      ${url}`);
      }
    });
  } else {
    lines.push("  --> none");
  }

  lines.push("");
  lines.push("Added:");
  if (fix.added.length) {
    fix.added.forEach(({ name, version }) => {
      lines.push(`  --> ${name}: ${version}`);
    });
  } else {
    lines.push("  --> none");
  }

  lines.push("");
  lines.push("Removed:");
  if (fix.removed.length) {
    fix.removed.forEach(({ name, version }) => {
      lines.push(`  --> ${name}: ${version}`);
    });
  } else {
    lines.push("  --> none");
  }

  lines.push("");
  lines.push("Warnings:");
  if (fix.warnings.length) {
    fix.warnings.forEach(warning => {
      lines.push(`   --> ${warning}`);
    });
  } else {
    lines.push("  --> none");
  }

  lines.push("");
  lines.push(
    [
      `${fix.updated.length} updated`,
      `${fix.added.length} added`,
      `${fix.removed.length} removed`,
      `${fix.warnings.length} warnings`,
    ].join(", ")
  );
  lines.push(`${fix.elapsed / 1000}s elapsed`);

  console.log(lines.join(os.EOL));
};
