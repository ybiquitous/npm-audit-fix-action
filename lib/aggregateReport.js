import packageRepoUrls from "./packageRepoUrls.js";
import capitalize from "./utils/capitalize.js";
import semverToNumber from "./utils/semverToNumber.js";
import splitPackageName from "./utils/splitPackageName.js";

/**
 * @param {{ name: string, version: string }} a
 * @param {{ name: string, version: string }} b
 * @returns {number}
 */
function byNameAndVersion(a, b) {
  const res = a.name.localeCompare(b.name);
  if (res > 0) {
    return 1;
  }
  if (res < 0) {
    return -1;
  }
  return semverToNumber(a.version) - semverToNumber(b.version);
}

/**
 * @param {AuditReport} audit
 * @param {string} name
 * @returns {{ severity: string | null, title: string | null, url: string | null }}
 */
function getAuditInfo(audit, name) {
  const info = audit.get(name);
  const severity = info == null ? null : capitalize(info.severity);
  const title = info == null ? null : info.title;
  const url = info == null ? null : info.url;
  return { severity, title, url };
}

/**
 * @param {AuditReport} audit
 * @param {Map<string, string>} beforePackages
 * @param {Map<string, string>} afterPackages
 * @returns {Promise<Report>}
 */
export default async function aggregateReport(audit, beforePackages, afterPackages) {
  /** @type {Report["added"]} */
  const added = [];
  afterPackages.forEach((version, pkgName) => {
    if (!beforePackages.has(pkgName)) {
      const { name, location } = splitPackageName(pkgName);
      added.push({ name, location, version });
    }
  });
  added.sort(byNameAndVersion);

  /** @type {Report["removed"]} */
  const removed = [];
  beforePackages.forEach((version, pkgName) => {
    if (!afterPackages.has(pkgName)) {
      const { name, location } = splitPackageName(pkgName);
      removed.push({ name, location, version, ...getAuditInfo(audit, name) });
    }
  });
  removed.sort(byNameAndVersion);

  /** @type {Report["updated"]} */
  const updated = [];
  afterPackages.forEach((version, pkgName) => {
    const previousVersion = beforePackages.get(pkgName);
    if (version !== previousVersion && previousVersion != null) {
      const { name, location } = splitPackageName(pkgName);
      updated.push({
        name,
        location,
        version,
        previousVersion,
        ...getAuditInfo(audit, name),
      });
    }
  });
  updated.sort(byNameAndVersion);

  const allPackageNames = Array.from(
    new Set([
      ...added.map((e) => e.name),
      ...updated.map((e) => e.name),
      ...removed.map((e) => e.name),
    ]),
  );
  const packageCount = allPackageNames.length;
  const packageUrls = await packageRepoUrls(allPackageNames);

  return { added, removed, updated, packageCount, packageUrls };
}
