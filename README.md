# Anvesha Riya — Portfolio (Claude-styled)

A single-page portfolio site styled after Claude's chat interface. No server, database, or build step needed — it's plain HTML/CSS/JS, and the "chatbot" is a rule-based keyword matcher that runs entirely in the browser using the data in `data.js`. This is intentional: it makes the whole thing free to host and dead simple to maintain.

## Files
- `index.html` — page structure (sidebar + chat interface)
- `style.css` — the dark, Claude-inspired visual theme
- `data.js` — all your resume content (edit this to update the site)
- `script.js` — navigation + chatbot logic (keyword matching against `data.js`)

The layout is responsive: on screens under ~780px wide, the sidebar becomes a slide-in menu (tap the ☰ icon top-left to open it, tap outside or the ✕ to close), and text/spacing scale down for phones.

## 1. Preview it locally
You don't need Node or Python for anything except a local preview server:

```bash
cd portfolio
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser. (Opening `index.html` directly by double-clicking also works, but a local server avoids occasional font/CORS quirks.)

## 2. Edit your content
Everything text-based lives in `data.js` — your bio, experience bullets, projects, skills, and education. To update your site later, just edit that file; no HTML/CSS knowledge needed for content changes.

To change colors/fonts, the tokens are all at the top of `style.css` under `:root`.

## 3. Host it for free — GitHub Pages (recommended)
This is the simplest free option and gives you a URL like `https://yourusername.github.io/portfolio`.

1. Create a free GitHub account at github.com if you don't have one.
2. Create a new repository — call it e.g. `portfolio` (or `yourusername.github.io` if you want it at the root of your GitHub domain).
3. Upload the four files (`index.html`, `style.css`, `data.js`, `script.js`) to the repository:
   - Easiest way: on the repo page, click **Add file → Upload files**, drag in the four files, then **Commit changes**.
4. Go to the repo's **Settings → Pages**.
5. Under **Source**, choose **Deploy from a branch**, pick branch `main` and folder `/ (root)`, then **Save**.
6. Wait 1–2 minutes. Your site will be live at:
   - `https://yourusername.github.io/portfolio/` (if repo is named `portfolio`), or
   - `https://yourusername.github.io/` (if repo is named `yourusername.github.io`)

Any time you edit a file in the repo, the live site updates automatically within a minute or two.

## Alternative free hosts (equally good)
- **Netlify** (netlify.com): drag-and-drop the `portfolio` folder onto the Netlify dashboard ("Deploy manually") — live in seconds, gives you a `*.netlify.app` URL, and lets you add a custom domain free.
- **Vercel** (vercel.com): import the GitHub repo, no config needed, gives you a `*.vercel.app` URL.

Both auto-deploy on every GitHub push if you connect the repo instead of drag-and-drop.

## 4. (Optional) Custom domain
Once hosted, all three platforms let you attach a custom domain (e.g. `anveshariya.com`) for free — you just pay for the domain itself (~₹700–1000/year from a registrar like Namecheap or Google Domains), then point its DNS to GitHub Pages/Netlify/Vercel per their docs.

## About the chatbot
It's intentionally simple — a keyword classifier (`classify()` in `script.js`) that maps your question to one of: profile, experience, projects, skills, education, contact, or a fallback. This covers the "answer basic defined questions" requirement without needing an API key, a server, or any hosting cost. If you later want a real LLM-powered chatbot (so it can answer open-ended questions, not just the predefined ones), that would need a backend to hold an API key securely — happy to help you add that as a next step with a free-tier serverless function (e.g. Netlify Functions or Vercel Edge Functions) if you want to go there.
