const { exec } = require("@actions/exec");
const npmArgs = require("./npmArgs");

const NPM_VERSION = "6.14.3";

module.exports = async function updateNpm() {
  await exec("sudo", ["npm", ...npmArgs("install", "--global", `npm@${NPM_VERSION}`)]);

  // HACK: Fix the error "npm update check failed".
  return exec("sudo", ["chown", "-R", `${process.env.USER}:`, `${process.env.HOME}/.config`]);
};
