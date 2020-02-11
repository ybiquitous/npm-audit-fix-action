const { exec } = require("@actions/exec");

/**
 * @returns {Promise<Fix>}
 */
module.exports = async function auditFix() {
  let stdout = "";
  await exec("npm", ["audit", "fix", "--json"], {
    listeners: {
      stdout: data => {
        stdout += data.toString();
      },
    },
    silent: true,
  });
  return JSON.parse(stdout);
};
