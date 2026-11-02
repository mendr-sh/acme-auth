"use strict";

const { randomBytes, scryptSync, timingSafeEqual } = require("node:crypto");

function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  return `${salt}:${scryptSync(password, salt, 32).toString("hex")}`;
}

function checkPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  return timingSafeEqual(
    scryptSync(password, salt, 32),
    Buffer.from(hash, "hex"),
  );
}

module.exports = { checkPassword, hashPassword };
