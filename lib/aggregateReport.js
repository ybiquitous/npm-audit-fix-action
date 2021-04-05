const capitalize = require("./utils/capitalize");
const semverToNumber = require("./utils/semverToNumber");
const packageRepoUrls = require("./packageRepoUrls");

/**
 * @param {{ name: string, version: string }} a
 * @param {{ name: string, version: string }} b
 * @returns {number}
 */
const byNameAndVersion = (a, b) => {
  const res = a.name.localeCompare(b.name);
  if (res > 0) {
    return 1;
  }
  if (res < 0) {
    return -1;
  }
  return semverToNumber(a.version) - semverToNumber(b.version);
};

/**
 * @param {AuditReport} audit
 * @param {Map<string, string>} beforePackages
 * @param {Map<string, string>} afterPackages
 * @returns {Promise<Report>}
 */
module.exports = async function aggregateReport(audit, beforePackages, afterPackages) {
  /** @type {Report["added"]} */
  const added = [];
  afterPackages.forEach((version, name) => {
    if (!beforePackages.has(name)) {
      added.push({ name, version });
    }
  });
  added.sort(byNameAndVersion);

  /** @type {Report["removed"]} */
  const removed = [];
  beforePackages.forEach((version, name) => {
    if (!afterPackages.has(name)) {
      removed.push({ name, version });
    }
  });
  removed.sort(byNameAndVersion);

  /** @type {Report["updated"]} */
  const updated = [];
  afterPackages.forEach((version, name) => {
    const previousVersion = beforePackages.get(name);
    if (version !== previousVersion && previousVersion != null) {
      const info = audit.get(name);
      const severity = info == null ? null : capitalize(info.severity);
      const title = info == null ? null : info.title;
      const url = info == null ? null : info.url;
      updated.push({ name, version, previousVersion, severity, title, url });
    }
  });
  updated.sort(byNameAndVersion);

  const allPackageNames = Array.from(
    new Set([
      ...added.map((e) => e.name),
      ...updated.map((e) => e.name),
      ...removed.map((e) => e.name),
    ])
  );
  const packageCount = allPackageNames.length;
  const packageUrls = await packageRepoUrls(allPackageNames);

  return { added, removed, updated, packageCount, packageUrls };
};
