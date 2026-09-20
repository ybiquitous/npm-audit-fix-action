/**
 * @param {string} str
 * @param {string | RegExp} separator
 * @returns {string[]}
 */
export default function separatedList(str, separator) {
  return str
    .split(separator)
    .map((s) => s.trim())
    .filter(Boolean);
}
