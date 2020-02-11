/**
 * @param {string} str
 * @returns {string}
 */
module.exports = function capitalize(str) {
  if (typeof str === "string") {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return "";
};
