import { execFileSync } from "node:child_process";
import process from "node:process";

try {
  execFileSync("npm", ["ci"], { stdio: "inherit" });
} catch (e) {
  if (e instanceof Error && "status" in e && typeof e.status === "number") {
    // eslint-disable-next-line no-process-exit
    process.exit(e.status);
  } else {
    throw e;
  }
}
