const { exec } = require("@actions/exec");
const npmArgs = require("./npmArgs");

const NPM_VERSION = "6.14.1";

module.exports = function updateNpm() {
  return exec("sudo", ["npm", ...npmArgs("install", "--global", `npm@${NPM_VERSION}`)]);
};
