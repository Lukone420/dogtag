# Dog ID Tag — free NFC + QR pendant page

A single static page that shows your dog's info and lets whoever finds them
call or email you instantly. €0 to run, no account, no database, no server.

Files:
- `index.html` — the page structure
- `style.css` — the look (mobile-first "field tag" card, light/dark mode)
- `script.js` — **the only file you edit day-to-day** — holds the `dog` object
- `README.md` — this guide

---

## 1. Edit the dog's info

`script.js` is already filled in for Tilly:

```js
const dog = {
  name: "Tilly",
  breed: "Border Collie",
  microchip: "",              // add it once you have the number
  vet: "Monvets Balmes",
  photo: "",

  owners: [
    { name: "Dicu Marius Nicolae", phone: "+34600272523" },
    { name: "Antonia Maria Taroiu", phone: "+34610633906" }
  ]
};
```

- **Microchip**: left blank because no number was given — the page will
  simply skip that plate until you add one. Drop the number in as a string
  (e.g. `microchip: "981000000000000"`) whenever you have it, no other
  change needed.
- **Owners**: one **Call** button is generated automatically for each
  person in the `owners` array, labelled with their first name. Add,
  remove, or reorder entries freely. If you ever want an email button too,
  just add `email: "..."` to that owner's entry and it will appear
  alongside their call button.
- `phone` — always use the full international format (`+34...` for Spain)
  so the `tel:` link works regardless of the finder's own country.
- `photo` — left as `""` on purpose (no photo), which shows a simple paw
  icon instead. To add one later, put an image file in the same folder as
  `index.html` and set `photo: "filename.jpg"`.
- Nothing else on the page needs editing — everything else is filled in
  automatically from this object.

### Language (English / Spanish)

The page shows automatically in **Spanish if the finder's phone is set to
Spanish**, and **English otherwise** — this uses the phone's own language
setting, so no guessing is needed. There's also a small **EN/ES** button
in the top-right corner of the card in case someone wants to switch
manually; their choice is remembered on that phone for next time.

To add a third language later, open `script.js`, copy the `en` block
inside the `strings` object, translate it, add its two-letter code to the
`LANGS` array, and it'll appear in the toggle automatically.

---

## 2. Deploy for free with GitHub Pages

You don't need any experience with this — follow it step by step.

### 2.1 Create the repository

1. Go to [github.com](https://github.com) and sign in (create a free account
   if you don't have one).
2. Click the **+** in the top-right corner → **New repository**.
3. Name it something like `dog-tag`.
4. Set it to **Public** (GitHub Pages' free tier requires public repos on
   free accounts).
5. Click **Create repository**.

### 2.2 Upload the files

1. On your new (empty) repository page, click **uploading an existing
   file**.
2. Drag in `index.html`, `style.css`, `script.js` (and your photo, if you
   have one).
3. Scroll down and click **Commit changes**.

### 2.3 Enable GitHub Pages

1. In your repository, go to **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **Deploy from a
   branch**.
3. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
4. Wait about 1–2 minutes. Refresh the page — GitHub will show you the
   live URL, something like:

   ```
   https://YOUR-USERNAME.github.io/dog-tag/
   ```

### 2.4 Test the URL on your phone

Open that exact URL in your phone's browser. Confirm:
- The name, breed, and microchip number are correct.
- Tapping **Call owner** opens your phone dialer with the right number.
- Tapping **Email owner** opens a new email addressed to you.

Once this works, that URL is the one and only thing you need to write to
the NFC tag and encode in the QR code — the page itself will always be
free to host and update.

---

## 3. Write the URL to the NFC tag (NTAG213)

The NFC tag stores **only the URL** — nothing personal is stored on the
chip itself, so if the physical tag is ever cloned or scanned by curiosity,
all it reveals is a link to your public page (which you control and can
edit or take down at any time).

You need a phone with NFC (basically every phone from the last ~8 years)
and a free NFC-writing app.

### On Android

1. Install **NFC Tools** (by wakdev) from the Play Store — free.
2. Open the app → **Write** tab → **Add a record** → **URL / URI**.
3. Enter your full page URL: `https://YOUR-USERNAME.github.io/dog-tag/`
4. Tap **OK**, then **Write**.
5. Hold the back of your phone against the NFC tag (the NTAG213 chip) —
   most phones have the NFC antenna near the top-center of the back.
6. The app confirms once the write succeeds.

### On iPhone

1. Install **NFC Tools** (by wakdev) from the App Store — free, same app,
   same interface as Android.
2. Open the app → **Write** → **Add a record** → **URL/URI**.
3. Enter the same URL.
4. Tap **Write**, then hold the **top edge** of the iPhone against the tag
   (that's where iPhone's NFC reader is).
5. Confirm the success message.

You only need to do this once. NTAG213 tags are read-only in daily use —
your dog's info can still be updated freely, because the chip just holds a
link, and the destination page is what you edit.

---

## 4. How to test the NFC tag

- **Android**: NFC should be enabled by default (check **Settings → Connected
  devices → NFC** if nothing happens). Simply tap the back of the phone to
  the tag — no app needed to *read* it, it should prompt you to open the
  link in your browser.
- **iPhone**: iPhone 7 and later support "background tag reading" — just
  hold the top edge of the phone near the tag with the screen on and
  unlocked. A notification will pop up; tap it to open the page. No app
  needed to read it either.

If nothing happens, move the tag around slightly — the antenna position
varies slightly by phone model.

---

## 5. Generate the QR code (free, permanent)

Because the QR code just encodes your URL as an image, it stays valid
forever as long as the URL doesn't change — the QR code itself never
expires or needs "renewing," unlike some paid dynamic QR services.

1. Go to a free QR generator such as
   [qr-code-generator.com](https://www.qr-code-generator.com/) or
   [qrcode-monkey.com](https://www.qrcode-monkey.com/) (both have a
   permanently free static QR option — make sure you pick **static**, not
   a paid "dynamic/trackable" QR).
2. Paste in the exact same URL: `https://YOUR-USERNAME.github.io/dog-tag/`
3. Export as **SVG** (best for engraving/3D printing — it scales to any
   size with no quality loss) or a high-resolution PNG (at least 1000×1000
   px) if your pendant supplier requires a raster format.
4. Save the file — this is what you send to your pendant
   manufacturer/engraver, or use directly if 3D printing/laser-engraving
   it yourself.

### Test the QR code

Scan it with your phone's default camera app (both iPhone and Android
camera apps read QR codes natively — no app needed) and confirm it opens
the same page.

---

## 6. What happens, technically, when someone taps the tag

1. **The chip**: The NTAG213 is a passive NFC chip — it has no battery. It
   only activates when a phone's NFC antenna gets close enough (a few cm)
   to induce a small electric current in the tag's coil, powering the chip
   just long enough to transmit its stored data.
2. **The data format**: The tag stores your URL as an **NDEF (NFC Data
   Exchange Format) URI record** — a tiny standardized packet that says,
   in effect, "this is a URL, and here it is."
3. **The phone reads it**: The phone's OS (iOS or Android) has a built-in
   NFC reader service constantly listening in the background (on
   supported, unlocked phones). When it detects a valid NDEF URI record,
   it recognizes the MIME type and shows a system notification/prompt:
   "Open in Safari / Chrome?"
4. **The browser opens your URL**: Tapping that prompt launches the
   phone's default browser and navigates to
   `https://YOUR-USERNAME.github.io/dog-tag/`.
5. **GitHub Pages serves the file**: GitHub's servers (a free static file
   host, backed by a global CDN) receive the request and return
   `index.html`, `style.css`, and `script.js` exactly as you uploaded
   them — no server-side code runs, nothing is generated on the fly.
6. **The page renders**: The browser parses the HTML, applies the CSS, and
   runs `script.js`, which reads the `dog` object and fills in the name,
   breed, microchip number, and the `tel:`/`mailto:` links.
7. **The finder acts**: Tapping **Call owner** hands off to the phone's own
   dialer app via the `tel:` link; tapping **Email owner** hands off to the
   phone's mail app via the `mailto:` link — both are native OS behaviors,
   not anything the webpage itself has access to or logs.

Nothing is stored, tracked, or transmitted beyond that — the whole flow is
just "chip → URL → static file → phone's own apps."

---

## 7. Adding more dogs later (optional, future-proofing)

If you later want tags for other dogs, don't build a database — just
duplicate the folder. In the same repository, create one subfolder per
dog, each with its own copy of the three files:

```
dog-tag/
├── index.html          (your first dog — lives at the repo root)
├── style.css
├── script.js
├── luna/
│   ├── index.html
│   ├── script.js        (own "dog" object)
│   └── (style.css not needed — see below)
├── max/
│   ├── index.html
│   ├── script.js
│   └── ...
```

To avoid repeating the CSS, in each subfolder's `index.html` just change
the stylesheet link to point one level up:

```html
<link rel="stylesheet" href="../style.css" />
```

and in `script.js`, change only the `dog` object's values. Each dog then
gets its own permanent URL and its own NFC tag/QR code:

```
https://YOUR-USERNAME.github.io/dog-tag/luna/
https://YOUR-USERNAME.github.io/dog-tag/max/
```

That's it — no build tools, no database, no server. Every "new dog" is
just: copy a folder, edit one object, upload, write a new tag.
