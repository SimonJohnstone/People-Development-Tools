# People Development Tools

Source for Simon's suite of people and culture tools, each hosted as its own Netlify site.

| Tool | Repo path | Live site |
|---|---|---|
| Development Toolkit (home) | `toolkit/` | https://simon-development-toolkit.netlify.app/ |
| Personal Values | `values/` | https://simons-values-questionaire.netlify.app/ |
| Personal Motivators | `motivators/` | https://simons-motivators-questionaire.netlify.app/ |
| People Development Framework | `index.html` | https://simons-people-development-framework.netlify.app/ |
| 30 Life Cheat Codes | `cheat-codes.html` | https://simons-life-cheat-codes.netlify.app/ (served as `index.html`) |
| Team Psychological Safety Survey | `psych-safety/` | https://simon-psych-safety.netlify.app/ |
| Team Culture | `team-culture/` | https://simons-team-culture-questionaire.netlify.app/ |

Every file was copied from the live Netlify deploys on 9 Nov 2026. Each one's SHA-1 matches the deployed file exactly, apart from `psych-safety/index.html` (see Notes).

## Not in the repo: `netlify.toml`

The Toolkit, Values, Motivators, Team Culture and Psych Safety sites each have a `netlify.toml` on Netlify. Netlify doesn't serve that file publicly, and its API won't return the contents, so none of them are here.

To add one, open Netlify, go to **site → Deploys**, open the latest deploy, choose **Download**, then copy `netlify.toml` into that site's folder.

**Until a site's `netlify.toml` is in the repo, don't deploy that whole folder as the site.** A full deploy from here would delete the live `netlify.toml`. Upload only the changed files instead.

The Framework and Cheat Codes sites don't use a `netlify.toml`.

## Notes

- **`psych-safety/` differs from the live site on purpose.** The live `index.html` has a JSONbin Master Key and Bin ID written into it (`HARDCODED_API_KEY` / `HARDCODED_BIN_ID`). This repo is public, so those two values are blanked in the repo copy, and that file is the only one whose SHA-1 differs from the live deploy. Put them back locally before you deploy, and never commit them. The live site also serves `psych-safety-netlify.zip`, which holds the same `index.html` with the key in it. The zip is deliberately left out of the repo. `psych-safety-survey.html` is the same page with both values left empty.
- None of the sites deploy automatically from GitHub. Pushing here does not update them.
