import semverToNumber from "../semverToNumber.js";

test("semverToNumber()", () => {
  expect(semverToNumber("1.2.3")).toEqual(10203);
  expect(semverToNumber("0.0.3")).toEqual(3);
  expect(semverToNumber("0.9.3")).toEqual(903);
  expect(semverToNumber("0.10.3")).toEqual(1003);
  expect(semverToNumber("1.0.3")).toEqual(10003);
  expect(semverToNumber("1.2.4")).toEqual(10204);
  expect(semverToNumber("1.2.4-beta.1")).toEqual(10204);
});
