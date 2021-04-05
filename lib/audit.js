const { exec } = require("@actions/exec");
const npmArgs = require("./npmArgs");

/**
 * @param {typeof exec} execFn
 * @returns {Promise<AuditReport>}
 */
module.exports = async function audit(execFn = exec) {
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
        const [{ title, url }] = via;
        if (typeof title === "string" && typeof url === "string") {
          map.set(name, { name, severity, title, url });
        } else {
          throw new Error(`"via" of "${name}" is invalid`);
        }
      } else {
        throw new Error('"via" is not an array');
      }
    });
    return map;
  }
  throw new Error('"vulnerabilities" is missing');
};
