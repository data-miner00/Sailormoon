# Sailormoon

Sailormoon is a Discord bot made with Discord.js API that serves to remind friends upon Discord Nitro expiry.

## Env Var
X_RAPIDAPI_KEY=ea1222293cmshe64912dcf8bbcf5p18e86cjsn1ea18eb5844c
DADJOKE_HOST=dad-jokes.p.rapidapi.com
JOKEAPI_HOST=jokeapi-v2.p.rapidapi.com


## Folder structure

Initial folder structure

```
Sailormoon
┬
└-- src
│   └-- commands
│   │    └-- index.ts
│   └-- events
│   │    └-- index.ts
│   │    └-- message.ts
│   │    └-- ready.ts
│   └-- app.ts
│   └-- config.ts
└-- .env
└-- .env.example
└-- .gitignore
└-- package-lock.json
└-- package.json
└-- Procfile
└-- README.md
└-- tsconfig.json
```

## Scripts

- Start a local development server

```
npm run dev
```

- Building for deploymeny

```
npm run build
```
