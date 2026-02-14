# Valentine Next.js Site

A pink-themed, interactive Valentine page built with Next.js + Tailwind CSS.

## Main Features

1. Landing flow
- Valentine countdown timer
- Name input + `Create Valentine Link`
- Link format: `/?from=<name>&id=<randomId>`

2. Link ready page
- Copyable Valentine link
- `Preview Link` button
- `Create Another Link` button

3. Recipient page (`?from=...`)
- Dynamic title: `Hey there! {name} has a question for you...`
- 5-step `No` GIF sequence (Tenor embeds)
- `Yes` success GIF
- `No` clicks make `Yes` larger and `No` smaller
- Final `No` stage makes the `No` button run away
- `Yes` triggers full-screen fanfare effect
- `Restart` + `Back To Main` actions

4. Navigation
- `Main Page`
- `Create Link`
- `GitHub`

## Security Hardening

The app includes practical client-side and platform-level protections:

- Input sanitization for `name` values
  - Removes unsafe characters
  - Enforces a max length of 24
- Query param safety
  - `from` is sanitized before rendering
- Security headers (via `next.config.js`)
  - `Content-Security-Policy`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` (camera/microphone/geolocation disabled)
- Random share IDs generated with `crypto.getRandomValues` when available

## Run Locally

```bash
cd /Users/sionjeon/wybmv
npm install
npm run dev
```

Open: `http://localhost:3000`

## Notes

- Tenor embeds require internet access.
- Update the GitHub button URL in `/Users/sionjeon/wybmv/app/page.tsx` if needed.
