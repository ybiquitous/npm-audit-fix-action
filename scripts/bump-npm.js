const { execFileSync } = require("child_process");
const { readFileSync, writeFileSync } = require("fs");
const { basename } = require("path");
const pkg = require("../package.json");

const [main, sub, newVersion] = process.argv;
if (!newVersion) {
  process.stdout.write(`
Usage:
    ${basename(main)} ${basename(sub)} <new npm version>

Example:
    ${basename(main)} ${basename(sub)} 6.2.5
`);
  process.exit(); // eslint-disable-line no-process-exit
}

const oldVersion = pkg.engines.npm;
if (!oldVersion) {
  throw new Error("No npm version. See `engines` in `package.json`.");
}

execFileSync("git", ["diff", "--exit-code"]);
execFileSync("git", ["diff", "--exit-code", "--staged"]);
execFileSync("git", ["checkout", "-b", `bump-npm-${newVersion}`]);

const packageJson = "package.json";
process.stdout.write(`Updating ${packageJson}...\n`);
const packageJsonContent = readFileSync(packageJson, "utf8").replace(
  `"npm": "${oldVersion}"`,
  `"npm": "${newVersion}"`
);
writeFileSync(packageJson, packageJsonContent, "utf8");

const constants = "lib/constants.js";
process.stdout.write(`Updating ${constants}...\n`);
const constantsContent = readFileSync(constants, "utf8").replace(
  `NPM_VERSION = "${oldVersion}"`,
  `NPM_VERSION = "${newVersion}"`
);
writeFileSync(constants, constantsContent, "utf8");

execFileSync("git", ["add", packageJson, constants]);

const message = `fix(deps): bump npm from ${oldVersion} to ${newVersion}

- https://github.com/npm/cli/releases/tag/v${newVersion}
- https://github.com/npm/cli/compare/v${oldVersion}...v{newVersion}
`;
execFileSync("git", ["commit", "-m", message]);
