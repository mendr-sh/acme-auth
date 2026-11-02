"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const { createApp } = require("../src/app");
const { hashPassword } = require("../src/passwords");

test("signing in sets a session that /me accepts", async (t) => {
  const users = [{ id: "u1", username: "ada", passwordHash: hashPassword("pw") }];
  const server = createApp({ secret: "s3cret", users }).listen(0);
  t.after(() => server.close());
  const base = `http://127.0.0.1:${server.address().port}`;

  const login = await fetch(`${base}/login`, {
    body: new URLSearchParams({ password: "pw", username: "ada" }),
    method: "POST",
  });
  assert.equal(login.status, 200);
  const cookie = login.headers.get("set-cookie").split(";")[0];

  const me = await fetch(`${base}/me`, { headers: { cookie } });
  assert.deepEqual(await me.json(), { id: "u1" });
});

test("a wrong password is rejected", async (t) => {
  const users = [{ id: "u1", username: "ada", passwordHash: hashPassword("pw") }];
  const server = createApp({ secret: "s3cret", users }).listen(0);
  t.after(() => server.close());
  const login = await fetch(`http://127.0.0.1:${server.address().port}/login`, {
    body: new URLSearchParams({ password: "nope", username: "ada" }),
    method: "POST",
  });
  assert.equal(login.status, 401);
});
