const commaSeparatedList = require("../commaSeparatedList");

test("commaSeparatedList()", () => {
  expect(commaSeparatedList("")).toEqual([]);
  expect(commaSeparatedList(" ")).toEqual([]);
  expect(commaSeparatedList(",")).toEqual([]);
  expect(commaSeparatedList(" , ")).toEqual([]);
  expect(commaSeparatedList("a,")).toEqual(["a"]);
  expect(commaSeparatedList("a,b")).toEqual(["a", "b"]);
  expect(commaSeparatedList("a ,b")).toEqual(["a", "b"]);
  expect(commaSeparatedList("a, b")).toEqual(["a", "b"]);
  expect(commaSeparatedList(",a, b")).toEqual(["a", "b"]);
  expect(commaSeparatedList("a, b,")).toEqual(["a", "b"]);
  expect(commaSeparatedList(" a, b, ")).toEqual(["a", "b"]);
});
