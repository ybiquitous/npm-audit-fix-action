/**
 * @param {Report} report
 * @returns {string}
 */
module.exports = function buildCommitBody(report) {
  const lines = [];

  lines.push("Summary:");
  lines.push(`- Updated packages: ${report.updated.length}`);
  lines.push(`- Added packages: ${report.added.length}`);
  lines.push(`- Removed packages: ${report.removed.length}`);

  lines.push("");
  if (report.updated.length > 0) {
    lines.push("Fixed vulnerabilities:");
    report.updated.forEach((e) => {
      if ("severity" in e) {
        lines.push(`- ${e.name}: "${e.title}" (${e.url})`);
      }
    });
  } else {
    lines.push("No fixed vulnerabilities.");
  }

  return lines.map((line) => `${line}\n`).join("");
};
