const { exec } = require("@actions/exec");
const npmArgs = require("./npmArgs");

/**
 * @returns {Promise<Map<string, string>>}
 */
module.exports = async function listPackages() {
  let lines = "";
  await exec("npm", npmArgs("ls", "--parseable", "--long"), {
    listeners: {
      stdout: (data) => {
        lines += data.toString();
      },
    },
  });

  const packages = /** @type {Map<string, string>} */ new Map();
  lines
    .split("\n")
    .filter(Boolean)
    .forEach((line) => {
      const [, pkg] = line.split(":");
      if (pkg == null) {
        throw new Error(`Invalid line: "${line}"`);
      }

      const [name, version] = pkg.split("@");
      if (name == null || version == null) {
        throw new Error(`Invalid name and version: "${line}"`);
      }
      packages.set(name.trim(), version.trim());
    });
  return packages;
};
