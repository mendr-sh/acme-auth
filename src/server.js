"use strict";

const { createApp } = require("./app");

const secret = process.env.SESSION_SECRET;
if (!secret) throw new Error("Set SESSION_SECRET");
createApp({ secret, users: [] }).listen(process.env.PORT || 3000);
