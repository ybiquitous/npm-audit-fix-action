/**
 * @param {string} str
 * @returns {string[]}
 */
module.exports = function commaSeparatedList(str) {
  return str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};
