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

Every file was copied from the live Netlify deploys on 9 Nov 2026. Each one's SHA-1 matches the deployed file exactly.

## Not in the repo: `netlify.toml`

The Toolkit, Values, Motivators, Team Culture and Psych Safety sites each have a `netlify.toml` on Netlify. Netlify doesn't serve that file publicly, and its API won't return the contents, so none of them are here.

To add one, open Netlify, go to **site → Deploys**, open the latest deploy, choose **Download**, then copy `netlify.toml` into that site's folder.

**Until a site's `netlify.toml` is in the repo, don't deploy that whole folder as the site.** A full deploy from here would delete the live `netlify.toml`. Upload only the changed files instead.

The Framework and Cheat Codes sites don't use a `netlify.toml`.

## Notes

- `psych-safety/` stores responses through `netlify/functions/responses.js`, which reads the JSONbin credentials from Netlify environment variables (`JSONBIN_ACCESS_KEY`, `JSONBIN_BIN_ID`). No credentials are in the page or the repo. `psych-safety-survey.html` is an older standalone copy that saves only to the browser.
- None of the sites deploy automatically from GitHub. Pushing here does not update them.
