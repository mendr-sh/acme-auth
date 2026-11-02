"use strict";

const forge = require("node-forge");

// The SHA-256 fingerprint of an API key, so the key itself is never stored.
function fingerprint(apiKey) {
  const md = forge.md.sha256.create();
  md.update(apiKey, "utf8");
  return md.digest().toHex();
}

module.exports = { fingerprint };
