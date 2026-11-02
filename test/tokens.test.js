"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const { signSession, verifySession } = require("../src/tokens");

test("a signed session verifies with the same secret", () => {
  assert.equal(verifySession(signSession("u1", "s3cret"), "s3cret"), "u1");
});

test("a token signed with another secret is rejected", () => {
  assert.equal(verifySession(signSession("u1", "other"), "s3cret"), null);
});
