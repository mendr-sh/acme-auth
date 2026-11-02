"use strict";

const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-local");
const { readSession, sessionCookie } = require("./cookies");
const { checkPassword } = require("./passwords");
const { signSession, verifySession } = require("./tokens");

// users: [{ id, username, passwordHash }]
function createApp({ secret, users }) {
  passport.use(
    new Strategy((username, password, done) => {
      const user = users.find((u) => u.username === username);
      done(null, user && checkPassword(password, user.passwordHash) ? user : false);
    }),
  );
  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.get("/health", (req, res) => res.json({ ok: true }));
  app.post(
    "/login",
    passport.authenticate("local", { session: false }),
    (req, res) => {
      res.set("Set-Cookie", sessionCookie(signSession(req.user.id, secret)));
      res.json({ id: req.user.id });
    },
  );
  app.get("/me", (req, res) => {
    const id = verifySession(readSession(req.headers.cookie), secret);
    if (!id) return res.status(401).json({ error: "signed out" });
    res.json({ id });
  });
  return app;
}

module.exports = { createApp };
