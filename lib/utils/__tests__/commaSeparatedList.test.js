import { strict as assert } from "node:assert";
import { test } from "node:test";

import commaSeparatedList from "../commaSeparatedList.js";

test("commaSeparatedList()", () => {
  assert.deepEqual(commaSeparatedList(""), []);
  assert.deepEqual(commaSeparatedList(" "), []);
  assert.deepEqual(commaSeparatedList(","), []);
  assert.deepEqual(commaSeparatedList(" , "), []);
  assert.deepEqual(commaSeparatedList("a"), ["a"]);
  assert.deepEqual(commaSeparatedList("a,"), ["a"]);
  assert.deepEqual(commaSeparatedList(",a"), ["a"]);
  assert.deepEqual(commaSeparatedList("a,b"), ["a", "b"]);
  assert.deepEqual(commaSeparatedList("a ,b"), ["a", "b"]);
  assert.deepEqual(commaSeparatedList("a, b"), ["a", "b"]);
  assert.deepEqual(commaSeparatedList("a , b"), ["a", "b"]);
  assert.deepEqual(commaSeparatedList("a, b,"), ["a", "b"]);
  assert.deepEqual(commaSeparatedList("a , b,"), ["a", "b"]);
  assert.deepEqual(commaSeparatedList("a, b, "), ["a", "b"]);
  assert.deepEqual(commaSeparatedList("a , b, "), ["a", "b"]);
  assert.deepEqual(commaSeparatedList(" a, b,"), ["a", "b"]);
});
