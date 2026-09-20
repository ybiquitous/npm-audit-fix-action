import { isDeepStrictEqual } from "node:util";

/**
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
function unique(array) {
  return array.filter(
    (elem, index, self) => index === self.findIndex((elem2) => isDeepStrictEqual(elem, elem2)),
  );
}

/**
 * @param {Report[]} reports
 * @returns {Report}
 */
export default function mergeReports(reports) {
  const added = unique(reports.flatMap((report) => report.added));
  const removed = unique(reports.flatMap((report) => report.removed));
  const updated = unique(reports.flatMap((report) => report.updated));

  /** @type {Record<string, UrlInfo>} */
  const packageUrls = {};
  for (const report of reports) {
    Object.assign(packageUrls, report.packageUrls);
  }

  const packageCount = new Set([...added, ...removed, ...updated].map((entry) => entry.name)).size;

  return { added, removed, updated, packageCount, packageUrls };
}
