import packageRepoUrls from "./packageRepoUrls.js";
import capitalize from "./utils/capitalize.js";
import semverToNumber from "./utils/semverToNumber.js";
import splitPackageName from "./utils/splitPackageName.js";

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
export default async function aggregateReport(audit, beforePackages, afterPackages) {
  /** @type {Report["added"]} */
  const added = [];
  afterPackages.forEach((version, name) => {
    if (!beforePackages.has(name)) {
      const pkg = splitPackageName(name);
      added.push({ name: pkg.name, location: pkg.location, version });
    }
  });
  added.sort(byNameAndVersion);

  /** @type {Report["removed"]} */
  const removed = [];
  beforePackages.forEach((version, name) => {
    if (!afterPackages.has(name)) {
      const pkg = splitPackageName(name);
      removed.push({ name: pkg.name, location: pkg.location, version });
    }
  });
  removed.sort(byNameAndVersion);

  /** @type {Report["updated"]} */
  const updated = [];
  afterPackages.forEach((version, name) => {
    const previousVersion = beforePackages.get(name);
    if (version !== previousVersion && previousVersion != null) {
      const pkg = splitPackageName(name);
      const info = audit.get(pkg.name);
      const severity = info == null ? null : capitalize(info.severity);
      const title = info == null ? null : info.title;
      const url = info == null ? null : info.url;
      updated.push({
        name: pkg.name,
        location: pkg.location,
        version,
        previousVersion,
        severity,
        title,
        url,
      });
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
}
