const { exec } = require("@actions/exec");

/**
 * @returns {Promise<AuditReport>}
 */
module.exports = async function audit() {
  let stdout = "";
  await exec("npm", ["audit", "--json"], {
    listeners: {
      stdout: data => {
        stdout += data.toString();
      },
    },
    silent: true,
    ignoreReturnCode: true,
  });
  return JSON.parse(stdout);
};
