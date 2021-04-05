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
    .filter((line) => line.trim())
    .forEach((line) => {
      const [, pkg] = line.split(":", 2);
      if (pkg == null) {
        throw new Error(`Invalid line: "${line}"`);
      }

      const match = /^(?<name>@?\S+)@(?<version>\S+)$/u.exec(pkg);
      if (match == null || match.groups == null) {
        throw new Error(`Invalid line: "${line}"`);
      }
      /* eslint-disable dot-notation, prefer-destructuring -- Prevent TS4111 */
      const name = match.groups["name"];
      const version = match.groups["version"];
      /* eslint-enable */
      if (name == null || version == null) {
        throw new Error(`Invalid name and version: "${line}"`);
      }
      packages.set(name.trim(), version.trim());
    });
  return packages;
};
