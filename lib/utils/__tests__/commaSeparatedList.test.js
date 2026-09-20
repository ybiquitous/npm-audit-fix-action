import { test } from "node:test";

import commaSeparatedList from "../commaSeparatedList.js";

test("commaSeparatedList()", (t) => {
  t.assert.deepEqual(commaSeparatedList(""), []);
  t.assert.deepEqual(commaSeparatedList(" "), []);
  t.assert.deepEqual(commaSeparatedList(","), []);
  t.assert.deepEqual(commaSeparatedList(" , "), []);
  t.assert.deepEqual(commaSeparatedList("a"), ["a"]);
  t.assert.deepEqual(commaSeparatedList("a,"), ["a"]);
  t.assert.deepEqual(commaSeparatedList(",a"), ["a"]);
  t.assert.deepEqual(commaSeparatedList("a,b"), ["a", "b"]);
  t.assert.deepEqual(commaSeparatedList("a ,b"), ["a", "b"]);
  t.assert.deepEqual(commaSeparatedList("a, b"), ["a", "b"]);
  t.assert.deepEqual(commaSeparatedList("a , b"), ["a", "b"]);
  t.assert.deepEqual(commaSeparatedList("a, b,"), ["a", "b"]);
  t.assert.deepEqual(commaSeparatedList("a , b,"), ["a", "b"]);
  t.assert.deepEqual(commaSeparatedList("a, b, "), ["a", "b"]);
  t.assert.deepEqual(commaSeparatedList("a , b, "), ["a", "b"]);
  t.assert.deepEqual(commaSeparatedList(" a, b,"), ["a", "b"]);
});
