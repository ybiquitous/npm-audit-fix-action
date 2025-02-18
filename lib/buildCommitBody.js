/**
 * @param {Report} report
 * @returns {string}
 */
export default function buildCommitBody({ updated, added, removed }) {
  /** @type {string[]} */
  const lines = [];

  lines.push("Summary:");
  lines.push(`- Updated packages: ${updated.length}`);
  lines.push(`- Added packages: ${added.length}`);
  lines.push(`- Removed packages: ${removed.length}`);

  lines.push("");

  /** @type {Set<string>} */
  const vulnerabilities = new Set();

  for (const entry of [...updated, ...added, ...removed]) {
    if ("severity" in entry && "url" in entry) {
      const { name, severity, url } = entry;
      if (severity && url) {
        vulnerabilities.add(`- ${name}: ${severity} (${url})`);
      }
    }
  }

  if (vulnerabilities.size > 0) {
    lines.push("Fixed vulnerabilities:");
    lines.push(...Array.from(vulnerabilities));
  } else {
    lines.push("No fixed vulnerabilities.");
  }

  return lines.map((line) => `${line}\n`).join("");
}
