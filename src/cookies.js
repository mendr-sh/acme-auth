"use strict";

const cookie = require("cookie");

const NAME = "acme_session";

function sessionCookie(token) {
  return cookie.serialize(NAME, token, {
    httpOnly: true,
    maxAge: 3600,
    path: "/",
    sameSite: "lax",
  });
}

function readSession(header) {
  return cookie.parse(header || "")[NAME] ?? null;
}

module.exports = { readSession, sessionCookie };
