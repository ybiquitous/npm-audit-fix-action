import { exec } from "@actions/exec";
import npmArgs from "./npmArgs.js";

/**
 * @param {typeof exec} execFn
 * @returns {Promise<AuditReport>}
 */
export default async function audit(execFn = exec) {
  let report = "";
  await execFn("npm", npmArgs("audit", "--json"), {
    listeners: {
      stdout: (data) => {
        report += data.toString();
      },
    },
    ignoreReturnCode: true,
  });
  const { vulnerabilities } = JSON.parse(report);

  if (vulnerabilities != null && typeof vulnerabilities === "object") {
    const map = /** @type {AuditReport} */ new Map();

    Object.values(vulnerabilities).forEach(({ name, severity, via }) => {
      if (Array.isArray(via)) {
        const [viaFirst] = via;
        if (typeof viaFirst.title === "string" && typeof viaFirst.url === "string") {
          map.set(name, { name, severity, title: viaFirst.title, url: viaFirst.url });
        } else if (typeof viaFirst === "string") {
          // ignore
        } else {
          throw new Error(`"via" of "${name}" is invalid: ${JSON.stringify(via)}`);
        }
      } else {
        throw new Error('"via" is not an array');
      }
    });

    return map;
  }

  throw new Error('"vulnerabilities" is missing');
}
