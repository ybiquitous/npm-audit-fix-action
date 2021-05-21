const { warning } = require("@actions/core");
const { exec } = require("@actions/exec");
const npmArgs = require("./npmArgs");

module.exports = async function auditFix() {
  let error = "";

  const returnCode = await exec("npm", npmArgs("audit", "fix"), {
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

  if (returnCode !== 0) {
    warning(error);
  }
};
