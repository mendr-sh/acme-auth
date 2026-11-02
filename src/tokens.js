"use strict";

const jwt = require("jsonwebtoken");

// Signs a session token for a user. Tokens expire after an hour.
function signSession(userId, secret) {
  return jwt.sign({ sub: userId }, secret, { expiresIn: "1h" });
}

// The user id of a valid token, or null.
function verifySession(token, secret) {
  try {
    return jwt.verify(token, secret).sub;
  } catch {
    return null;
  }
}

module.exports = { signSession, verifySession };
