import { getExecOutput } from "@actions/exec";

export default async function getNpmVersion() {
  return (await getExecOutput("npm", ["--version"])).stdout.trim();
}
