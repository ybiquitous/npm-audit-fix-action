/**
 * @param {string[]} args
 */
module.exports = function npmArgs(...args) {
  return [...args, "--ignore-scripts", "--no-progress"];
};
