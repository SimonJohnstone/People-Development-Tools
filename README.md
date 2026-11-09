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

Every file was copied from the live Netlify deploys on 9 Nov 2026. Each one's SHA-1 matches the deployed file exactly, except the `netlify.toml` files described below.

## `netlify.toml`

The Toolkit, Values, Motivators, Team Culture and Psych Safety folders each have the `netlify.toml` from their live deploy. Netlify generated them on drag-and-drop deploys, and they set no redirects, headers, plugins or build settings.

Four of the live copies also had a `publish = "..."` line pointing at a local Google Drive folder, plus `publishOrigin = "default"`. Those two lines were removed before committing because the folder path includes a personal email address and this repo is public. Netlify doesn't use them when files are uploaded directly, so the sites behave the same.

You can deploy a whole folder from here as the site. The Framework and Cheat Codes sites don't use a `netlify.toml`.

## Notes

- `psych-safety/` stores responses through `netlify/functions/responses.js`, which reads the JSONbin credentials from Netlify environment variables (`JSONBIN_ACCESS_KEY`, `JSONBIN_BIN_ID`). No credentials are in the page or the repo. The dashboard's **Clear all responses** button needs the admin password stored in the `ADMIN_PASSWORD` environment variable; clearing is refused while that variable isn't set. `psych-safety-survey.html` is an older standalone copy that saves only to the browser. `psych-safety-survey-team.html` is an unpublished "team edition" of the survey, recovered from an old branch. It isn't deployed to any site.
- None of the sites deploy automatically from GitHub. Pushing here does not update them.
