const { exec } = require("@actions/exec");
const npmArgs = require("./npmArgs");

module.exports = async function auditFix() {
  let error = "";
  await exec("npm", npmArgs("audit", "fix"), {
    listeners: {
      stderr: (data) => {
        error += data.toString();
      },
    },
    ignoreReturnCode: true,
  });

  if (error.includes("npm ERR!")) {
    throw new Error("Unexpected error occurred");
  }
};
