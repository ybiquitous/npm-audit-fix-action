const { exec } = require("@actions/exec");
const npmArgs = require("./npmArgs");

/**
 * @param {string} version
 */
module.exports = async function updateNpm(version) {
  await exec("sudo", ["npm", ...npmArgs("install", "--global", `npm@${version}`)]);

  // HACK: Fix the error "npm update check failed".
  // eslint-disable-next-line dot-notation -- Prevent TS4111
  return exec("sudo", ["chown", "-R", `${process.env["USER"]}:`, `${process.env["HOME"]}/.config`]);
};
