import { getExecOutput } from "@actions/exec";
import npmArgs from "./npmArgs.js";

/**
 * @param {typeof getExecOutput} [execFn]
 * @returns {Promise<AuditReport>}
 */
export default async function audit(execFn = getExecOutput) {
  const { stdout } = await execFn("npm", npmArgs("audit", "--json"), {
    ignoreReturnCode: true,
  });
  const { vulnerabilities } = JSON.parse(stdout);

  if (vulnerabilities != null && typeof vulnerabilities === "object") {
    /** @type {AuditReport} */
    const map = new Map();

    for (const { name, severity, via } of Object.values(vulnerabilities)) {
      if (Array.isArray(via)) {
        const [viaFirst] = via;
        const { title, url } = viaFirst;
        if (typeof title === "string" && typeof url === "string") {
          map.set(name, { name, severity, title, url });
        } else if (typeof viaFirst === "string") {
          // ignore
        } else {
          throw new Error(`"via" of "${name}" is invalid: ${JSON.stringify(via)}`);
        }
      } else {
        throw new Error('"via" is not an array');
      }
    }

    return map;
  }

  throw new Error('"vulnerabilities" is missing');
}
