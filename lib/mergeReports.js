/**
 * @param {Report[]} reports
 * @returns {Report}
 */
export default function mergeReports(reports) {
  const added = new Set(reports.flatMap((report) => report.added));
  const removed = new Set(reports.flatMap((report) => report.removed));
  const updated = new Set(reports.flatMap((report) => report.updated));

  /** @type {Record<string, UrlInfo>} */
  const packageUrls = {};
  for (const report of reports) {
    Object.assign(packageUrls, report.packageUrls);
  }

  const packageCount = new Set([...added, ...removed, ...updated].map((entry) => entry.name)).size;

  return {
    added: [...added],
    removed: [...removed],
    updated: [...updated],
    packageCount,
    packageUrls,
  };
}
