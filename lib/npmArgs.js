/**
 * @param {string[]} args
 */
export default function npmArgs(...args) {
  return [...args, "--ignore-scripts", "--no-progress"];
}
