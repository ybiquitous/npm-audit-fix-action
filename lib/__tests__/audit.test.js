import { readFileSync } from "fs";
import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import audit from "../audit.js";

// @ts-expect-error
const fixture = (path) => new URL(`./fixtures/${path}`, import.meta.url);

const auditJson = JSON.parse(readFileSync(fixture("audit.json"), "utf8"));
const auditJson2 = JSON.parse(readFileSync(fixture("audit-2.json"), "utf8"));

/**
 * @param {unknown} json
 * @returns {typeof import("@actions/exec").getExecOutput}
 */
const mockExec = (json) =>
  // @ts-expect-error -- TS2322: Type 'Mock<UnknownFunction>' is not assignable to type '(commandLine: string, args?: string[] | undefined, options?: ExecOptions | undefined) => Promise<ExecOutput>'.
  jest.fn().mockImplementationOnce(() => ({ stdout: JSON.stringify(json) }));

test("audit()", async () => {
  const packages = await audit(mockExec(auditJson));
  expect(packages.size).toEqual(1);
  expect(packages.get("y18n")).toEqual({
    name: "y18n",
    severity: "high",
    title: "Prototype Pollution",
    url: "https://npmjs.com/advisories/1654",
  });
});

test("audit() - 2", async () => {
  const packages = await audit(mockExec(auditJson2));
  expect(packages.size).toEqual(1);
  expect(packages.get("underscore.string")).toEqual({
    name: "underscore.string",
    severity: "moderate",
    title: "Regular Expression Denial of Service",
    url: "https://npmjs.com/advisories/745",
  });
});
