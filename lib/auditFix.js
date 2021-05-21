import { warning } from "@actions/core";
import { exec } from "@actions/exec";
import npmArgs from "./npmArgs.js";

export default async function auditFix() {
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
}
