import { warning } from "@actions/core";
import { getExecOutput } from "@actions/exec";
import npmArgs from "./npmArgs.js";

export default async function auditFix() {
  const { exitCode, stderr } = await getExecOutput("npm", npmArgs("audit", "fix"), {
    ignoreReturnCode: true,
  });

  if (stderr.includes("npm ERR!")) {
    throw new Error("Unexpected error occurred");
  }

  if (exitCode !== 0) {
    warning(stderr);
  }
}
