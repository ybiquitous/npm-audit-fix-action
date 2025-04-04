import { execFileSync } from "node:child_process";
import process from "node:process";

try {
  execFileSync("npm", ["install"], { stdio: "inherit" });
} catch (e) {
  if (e instanceof Error && "status" in e && typeof e.status === "number") {
    process.exit(e.status); // eslint-disable-line no-process-exit
  } else {
    throw e;
  }
}
