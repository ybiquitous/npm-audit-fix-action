const { exec } = require("@actions/exec");
const npmArgs = require("./npmArgs");

/**
 * @returns {Promise<AuditFix>}
 */
module.exports = async function auditFix() {
  let stdout = "";
  await exec("npm", npmArgs("audit", "fix", "--json"), {
    listeners: {
      stdout: (data) => {
        stdout += data.toString();
      },
    },
    silent: true,
  });
  return JSON.parse(stdout);
};
