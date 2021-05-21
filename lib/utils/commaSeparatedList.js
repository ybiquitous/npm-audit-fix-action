/**
 * @param {string} str
 * @returns {string[]}
 */
export default function commaSeparatedList(str) {
  return str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
