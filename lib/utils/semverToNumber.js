/**
 * @param {string} version
 * @returns {number}
 */
export default function semverToNumber(version) {
  return version
    .split(".")
    .slice(0, 3)
    .reverse()
    .map((str) => parseInt(str, 10))
    .reduce((sum, num, idx) => {
      const added = num * 10 ** (idx * 2) || 0;
      return sum + added;
    }, 0);
}
