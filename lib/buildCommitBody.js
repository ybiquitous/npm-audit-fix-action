/**
 * @param {Report} report
 * @returns {string}
 */
export default function buildCommitBody(report) {
  const lines = [];

  lines.push("Summary:");
  lines.push(`- Updated packages: ${report.updated.length}`);
  lines.push(`- Added packages: ${report.added.length}`);
  lines.push(`- Removed packages: ${report.removed.length}`);

  lines.push("");
  if (report.updated.length > 0) {
    lines.push("Fixed vulnerabilities:");
    report.updated.forEach(({ name, severity, title, url }) => {
      if (severity != null && title != null && url != null) {
        lines.push(`- ${name}: "${title}" (${url})`);
      }
    });
  } else {
    lines.push("No fixed vulnerabilities.");
  }

  return lines.map((line) => `${line}\n`).join("");
}
