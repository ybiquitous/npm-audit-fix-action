const { exec } = require("@actions/exec");
const npmArgs = require("./npmArgs");

/**
 * @param {string} version
 */
module.exports = async function updateNpm(version) {
  await exec("sudo", ["npm", ...npmArgs("install", "--global", `npm@${version}`)]);

  let actualVersion = "";
  await exec("npm", ["--version"], {
    listeners: {
      stdout: (data) => {
        actualVersion += data.toString();
      },
    },
  });

  // HACK: Fix the error "npm update check failed".
  // eslint-disable-next-line dot-notation -- Prevent TS4111
  await exec("sudo", ["chown", "-R", `${process.env["USER"]}:`, `${process.env["HOME"]}/.config`]);

  return actualVersion.trim();
};
