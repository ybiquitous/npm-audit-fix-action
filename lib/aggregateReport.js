const capitalize = require("./utils/capitalize");
const newAdvisories = require("./utils/advisories");
const packageRepoUrls = require("./packageRepoUrls");

/**
 * @param {AuditReport} audit
 * @param {AuditFix} fix
 * @returns {Promise<Report>}
 */
module.exports = async function aggregateReport(audit, fix) {
  /**
   * @param {{ name: string }} a
   * @param {{ name: string }} b
   * @returns {number}
   */
  const byNameOrder = (a, b) => a.name.localeCompare(b.name);

  /** @type {Report["added"]} */
  const added = [];
  const addedSet = new Set();
  fix.added.forEach(({ name, version }) => {
    const key = JSON.stringify({ name, version });
    if (!addedSet.has(key)) {
      addedSet.add(key);
      added.push({ name, version });
    }
  });
  added.sort(byNameOrder);

  /** @type {Report["removed"]} */
  const removed = [];
  const removedSet = new Set();
  fix.removed.forEach(({ name, version }) => {
    const key = JSON.stringify({ name, version });
    if (!removedSet.has(key)) {
      removedSet.add(key);
      removed.push({ name, version });
    }
  });
  removed.sort(byNameOrder);

  const advisories = newAdvisories(audit);

  /** @type {Report["updated"]} */
  const updated = [];
  const updatedSet = new Set();
  fix.updated.forEach(({ name, version, previousVersion }) => {
    const key = JSON.stringify({ name, version, previousVersion });
    if (!updatedSet.has(key)) {
      updatedSet.add(key);

      const advisory = advisories.find(name, previousVersion);
      if (advisory) {
        const { title, severity, url } = advisory;
        updated.push({
          name,
          version,
          previousVersion,
          severity: capitalize(severity),
          title,
          url,
        });
      } else {
        updated.push({ name, version, previousVersion });
      }
    }
  });
  updated.sort(byNameOrder);

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
