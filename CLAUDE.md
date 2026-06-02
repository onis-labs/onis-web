# Claude Project Rules — ONIS Web

## Project identity
This project is ONIS Web.

Allowed GitHub repo:
- onis-labs/onis-web

Do not touch PathBuild.
Do not touch onis-ios unless I clearly ask.

Before coding, always confirm:
1. current folder
2. git remote
3. current branch
4. app name

## GitHub usage
Use GitHub only when helpful for:
- reading issues
- reading pull requests
- checking branches
- checking recent commits
- preparing proposed issue/PR lists

Do not use GitHub for simple local edits if local files are enough.

Before using GitHub, say:
1. which GitHub tool/server you are using
2. which repo you are accessing
3. why GitHub is needed
4. whether it is read-only or write action

## GitHub safety
Read-only GitHub actions are allowed:
- list repositories
- list issues
- list pull requests
- list branches
- read commits

Write actions require my approval:
- create issue
- edit issue
- create branch
- create pull request
- commit
- push
- merge

Never commit or push unless I explicitly approve.

## Token-saving rules
Always minimize token usage.

Before editing:
1. identify the exact screen, component, or feature
2. inspect only relevant files
3. summarize the plan
4. make the smallest safe edit

Avoid:
- reading unrelated folders
- scanning the whole repo without reason
- pasting huge files
- rewriting whole files unnecessarily
- using GitHub when local files are enough

Prefer:
- small diffs
- focused searches
- summaries instead of huge dumps
- one screen/feature at a time
- build/test only after meaningful changes

## Web / UI rules
When changing web UI:
- use shared design tokens
- avoid random inline colors
- avoid random padding
- spacing must be divisible by 4 or 8
- keep font sizes minimal
- keep components consistent
- do not touch deployment settings unless I ask
- do not change production environment variables

## Copywriting rules
When changing copy:
- clear before clever
- simple before poetic
- always name the thing being discussed
- do not use fake stats
- do not invent money/time savings
- do not use guilt-heavy language
- make every CTA obvious

## Safety rules
Never touch:
- API keys
- .env files
- auth
- payments
- database schema
- git remotes
- production data
- deployment settings

Never run:
- git push
- git reset --hard
- git clean -fd
- rm -rf
- destructive database commands
- deployment commands

unless I explicitly approve.
