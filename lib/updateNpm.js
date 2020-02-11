const { exec } = require("@actions/exec");

function npmVersion() {
  return "6.13.7";
}

module.exports = function updateNpm() {
  return exec("sudo", ["npm", "install", "--global", `npm@${npmVersion()}`]);
};

module.exports.npmVersion = npmVersion; // Export for test
