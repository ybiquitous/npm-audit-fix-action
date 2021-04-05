const { exec } = require("@actions/exec");
const npmArgs = require("./npmArgs");

module.exports = function auditFix() {
  return exec("npm", npmArgs("audit", "fix"));
};
