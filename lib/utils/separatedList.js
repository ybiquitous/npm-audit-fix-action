/**
 * @param {string} str
 * @returns {string}
 */
function trim(str) {
  return str.trim();
}

/**
 * @param {string} str
 * @param {string | RegExp} separator
 * @returns {string[]}
 */
export default function separatedList(str, separator) {
  return str.split(separator).map(trim).filter(Boolean);
}
