# Nishan & Anjalika — Wedding Invitation

A static wedding invitation site: plain HTML, CSS and vanilla JavaScript. There is no build step and nothing to install.

## Run locally

You only need Node.js. There is no `npm install` step and there are no dependencies.

```bash
npm start
```

Open http://localhost:3000. To check it on your phone, open the "Phone" address that the server prints. Your phone needs to be on the same Wi-Fi.

## Edit the details

Everything is in **`assets/js/config.js`**:

| What | Key |
|---|---|
| Names / monogram | `partner1`, `partner2`, `monogram` |
| Wedding date & time | `start`, `end` (keep the `+05:30` offset) |
| Schedule | `events` |
| Venue & map | `venue` |
| RSVP deadline & WhatsApp number | `rsvp` |
| Call buttons | `phones` |
| Photos | `heroImage`, `storyImage`, `gallery` |
| Background music | `music` (put an mp3 in `assets/music/`) |

The date shown everywhere and the countdown both come from `start`.

## Personal guest links

Add `?to=` to the link to greet a guest by name. For example:

```
https://your-site.com/?to=Mr.%20%26%20Mrs.%20Perera
```

shows **"Dear Mr. & Mrs. Perera"** on the envelope and in the hero section, and fills in their RSVP name.

## RSVP

When a guest presses **Send RSVP**, WhatsApp opens with their reply already typed, addressed to `rsvp.whatsapp`. The site has no server, so nothing else is needed.

## Structure

```
index.html            page markup
assets/css/style.css  theme & layout
assets/js/config.js   ← your wedding details
assets/js/main.js     envelope, countdown, gallery, RSVP, calendar
assets/images/        optimised photos + floral.svg decoration
images/               your original photos (not used by the site, not committed)
server.js             local preview server
redirect.html         published as the site root → forwards to me/
.github/workflows/    GitHub Pages deployment
```

## Deploy (GitHub Pages)

The site is published at **`https://<username>.github.io/invitation/me/`**.

- `.github/workflows/deploy.yml` runs on every push to `main`. It copies `index.html` and `assets/` into a `me/` folder and publishes it to GitHub Pages.
- `redirect.html` becomes the site root, so `/invitation/` forwards to `/invitation/me/`.
- The repo must be named **`invitation`**. If it has a different name, the URL becomes `/<repo-name>/me/`.

To set it up once, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

To update the site:

```bash
git add .
git commit -m "Update invitation details"
git push
```

It goes live about 1 minute after the push. You can follow progress in the **Actions** tab.
