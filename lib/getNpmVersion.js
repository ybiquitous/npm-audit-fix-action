import { getExecOutput } from "@actions/exec";

export default async function getNpmVersion() {
  const options = { ignoreReturnCode: true };
  const { exitCode, stdout, stderr } = await getExecOutput("npm", ["--version"], options);

  if (exitCode === 0) {
    return stdout.trim();
  }

  throw new Error(`"npm --version" failed due to:\n${stderr.trim()}`);
}
