const { exec } = require("@actions/exec");
const npmArgs = require("./npmArgs");
const { NPM_VERSION } = require("./constants");

module.exports = async function updateNpm() {
  await exec("sudo", ["npm", ...npmArgs("install", "--global", `npm@${NPM_VERSION}`)]);

  // HACK: Fix the error "npm update check failed".
  // eslint-disable-next-line dot-notation -- Prevent TS4111
  return exec("sudo", ["chown", "-R", `${process.env["USER"]}:`, `${process.env["HOME"]}/.config`]);
};
