"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const { fingerprint } = require("../src/keys");

test("fingerprints are SHA-256 hex", () => {
  assert.equal(
    fingerprint("abc"),
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
  );
});
