import { getInput } from "@actions/core";

/**
 * @param {string[]} args
 */
export default function npmArgs(...args) {
  const defaultArgs = (getInput("npm_args") ?? "").split(/\s+/u).filter(Boolean);
  return [...args, ...defaultArgs, "--ignore-scripts", "--no-progress"];
}
