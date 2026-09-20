import { test } from "node:test";

import separatedList from "../separatedList.js";

test("separatedList() with comma separator", (t) => {
  t.assert.deepEqual(separatedList("", ","), []);
  t.assert.deepEqual(separatedList(" ", ","), []);
  t.assert.deepEqual(separatedList(",", ","), []);
  t.assert.deepEqual(separatedList(" , ", ","), []);
  t.assert.deepEqual(separatedList("a", ","), ["a"]);
  t.assert.deepEqual(separatedList("a,", ","), ["a"]);
  t.assert.deepEqual(separatedList(",a", ","), ["a"]);
  t.assert.deepEqual(separatedList("a,b", ","), ["a", "b"]);
  t.assert.deepEqual(separatedList("a ,b", ","), ["a", "b"]);
  t.assert.deepEqual(separatedList("a, b", ","), ["a", "b"]);
  t.assert.deepEqual(separatedList("a , b", ","), ["a", "b"]);
  t.assert.deepEqual(separatedList("a, b,", ","), ["a", "b"]);
  t.assert.deepEqual(separatedList("a , b,", ","), ["a", "b"]);
  t.assert.deepEqual(separatedList("a, b, ", ","), ["a", "b"]);
  t.assert.deepEqual(separatedList("a , b, ", ","), ["a", "b"]);
  t.assert.deepEqual(separatedList(" a, b,", ","), ["a", "b"]);
});

test("separatedList() with a custom separator", (t) => {
  t.assert.deepEqual(separatedList("a b", " "), ["a", "b"]);
  t.assert.deepEqual(separatedList(" a  b ", " "), ["a", "b"]);
  t.assert.deepEqual(separatedList("a;b; c", ";"), ["a", "b", "c"]);
});

test("separatedList() with a newline separator", (t) => {
  t.assert.deepEqual(separatedList("a\nb", "\n"), ["a", "b"]);
  t.assert.deepEqual(separatedList("a\n\nb", "\n"), ["a", "b"]);
  t.assert.deepEqual(separatedList("\na\nb\n", "\n"), ["a", "b"]);
});

test("separatedList() with multiple consecutive spaces", (t) => {
  t.assert.deepEqual(separatedList("a   b", " "), ["a", "b"]);
  t.assert.deepEqual(separatedList("  a   b  ", " "), ["a", "b"]);
});

test("separatedList() with a regex separator matching mixed delimiters", (t) => {
  t.assert.deepEqual(separatedList("a, b\n c,  d", /[,\s]+/), ["a", "b", "c", "d"]);
  t.assert.deepEqual(separatedList("a,\nb, c", /[,\s]+/), ["a", "b", "c"]);
});
