const DEFAULT_OPTIONS = Object.freeze(["--ignore-scripts", "--no-progress"]);

/**
 * @param {string[]} args
 */
module.exports = function npmArgs(...args) {
  return [...args, ...DEFAULT_OPTIONS];
};
