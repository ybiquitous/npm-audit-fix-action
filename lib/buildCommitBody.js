/**
 * @param {Report} report
 * @returns {string}
 */
export default function buildCommitBody(report) {
  /** @type {string[]} */
  const lines = [];

  lines.push("Summary:");
  lines.push(`- Updated packages: ${report.updated.length}`);
  lines.push(`- Added packages: ${report.added.length}`);
  lines.push(`- Removed packages: ${report.removed.length}`);

  lines.push("");
  if (report.updated.length > 0) {
    lines.push("Fixed vulnerabilities:");

    /** @type {Set<string>} */
    const vulnerabilities = new Set();
    report.updated.forEach(({ name, severity, title, url }) => {
      if (severity != null && title != null && url != null) {
        vulnerabilities.add(`- ${name}: "${title}" (${url})`);
      }
    });
    lines.push(...Array.from(vulnerabilities));
  } else {
    lines.push("No fixed vulnerabilities.");
  }

  return lines.map((line) => `${line}\n`).join("");
}
