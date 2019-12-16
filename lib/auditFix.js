const exec = require("@actions/exec");

module.exports = async function auditFix() {
  let stdout = "";
  const stdoutFn = data => {
    stdout += data.toString();
  };
  await exec.exec("npm", ["audit", "fix", "--json"], {
    listeners: { stdout: stdoutFn },
    silent: true,
  });
  return JSON.parse(stdout);
};
