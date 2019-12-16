const exec = require("@actions/exec");

module.exports = async function audit() {
  let stdout = "";
  const stdoutFn = data => {
    stdout += data.toString();
  };
  await exec.exec("npm", ["audit", "--json"], {
    listeners: { stdout: stdoutFn },
    silent: true,
    ignoreReturnCode: true,
  });
  return JSON.parse(stdout);
};
