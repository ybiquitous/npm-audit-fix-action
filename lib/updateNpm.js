const { exec } = require("@actions/exec");
const npmArgs = require("./npmArgs");

function npmVersion() {
  return "6.13.7";
}

module.exports = function updateNpm() {
  return exec("sudo", ["npm", ...npmArgs("install", "--global", `npm@${npmVersion()}`)]);
};

module.exports.npmVersion = npmVersion; // Export for test
