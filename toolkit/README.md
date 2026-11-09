# Development Toolkit

Source for https://simon-development-toolkit.netlify.app/ (Netlify site `simon-development-toolkit`).

Copied from the live deploy on 9 Nov 2026. Every file below matches the deployed file's SHA-1 exactly.

| File | Purpose |
|---|---|
| `index.html` | Home page: cards linking to each tool |
| `landing.html` | Identical copy of `index.html` |
| `logo/logo-mark.svg` | Logo mark |
| `logo/logo-full.svg` | Logo with wordmark |
| `logo/preview.html` | Logo preview page |

## Missing: `netlify.toml`

The live site also has a `netlify.toml` (438 bytes). Netlify doesn't serve that file publicly, and its API won't return the contents, so it isn't in this folder yet.

To add it, open Netlify, go to **simon-development-toolkit → Deploys**, open the latest deploy, choose **Download**, then copy `netlify.toml` into this folder.

**Until then, don't deploy this folder as the whole site.** A full deploy from here would delete the live `netlify.toml`. To update only the pages, upload just the changed files and leave the rest as they are.
