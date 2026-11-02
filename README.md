# acme-auth

A small sign-in service used to demonstrate [Mendr](https://www.mendr.sh).

> **This repository started with vulnerable dependencies on purpose.** They
> were pinned to releases from early 2021, so it has real, published
> advisories for Mendr to fix. Some can still be open. Do not deploy this code.

## What it does

- `src/app.js` signs users in with **passport** and **express**.
- `src/tokens.js` signs and checks session tokens with **jsonwebtoken**.
- `src/cookies.js` writes and reads the session cookie with **cookie**.
- `src/keys.js` stores API keys as SHA-256 fingerprints with **node-forge**.

Each module has tests in `test/`, so a fix that breaks one of them fails CI.

```sh
npm ci
npm test        # node --test
SESSION_SECRET=… npm start
```
