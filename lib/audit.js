const { exec } = require("@actions/exec");
const npmArgs = require("./npmArgs");

/**
 * @returns {Promise<AuditReport>}
 */
module.exports = async function audit() {
  let stdout = "";
  await exec("npm", npmArgs("audit", "--json"), {
    listeners: {
      stdout: (data) => {
        stdout += data.toString();
      },
    },
    silent: true,
    ignoreReturnCode: true,
  });
  return JSON.parse(stdout);
};
