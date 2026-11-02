"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const { readSession, sessionCookie } = require("../src/cookies");

test("the session cookie is HttpOnly and reads back", () => {
  const header = sessionCookie("abc");
  assert.match(header, /HttpOnly/);
  assert.equal(readSession(header.split(";")[0]), "abc");
});

test("no cookie means no session", () => {
  assert.equal(readSession(undefined), null);
});
