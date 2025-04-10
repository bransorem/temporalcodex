# Temporal Codex

This is a project to implement a puzzle interface for a 3-digit KV-store.

![](https://github.com/bransorem/temporalcodex/blob/main/example/ui.gif)
![](https://github.com/bransorem/temporalcodex/blob/main/example/admin.gif)

Stack:

- [Hono](https://hono.dev/) - Back-end framework
- [React](https://react.dev/) - Front-end framework
- [Vite](https://vite.dev/) - Build tool
- [Tailwind](https://tailwindcss.com/) - CSS framework
- [Tanstack Router](https://tanstack.com/router/latest) - Front-end routing
- [Tanstack Query](https://tanstack.com/query/v4) - Front-end query engine
- [Shadcn](https://ui.shadcn.com/) - UI components
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) - simple hosting
- [Cloudflare KV](https://developers.cloudflare.com/kv/) - KV store for data
- [React Hook Form](https://react-hook-form.com/) - form framework

## Prerequisites

- [Node.js](https://nodejs.org/en)

Homebrew:

```bash
brew install node
npm i -g pnpm
```

Manual:

Download and install https://nodejs.org/dist/v22.14.0/node-v22.14.0.pkg

Then: `npm i -g pnpm`


## Installation

```bash
pnpm i
```

Set Cloudflare KV-store key in `wrangler.jsonc`

## Running Locally

Start a Wrangler dev server

```bash
pnpm data
```

Start dev server

```bash
pnpm dev
```

## Deploy

Once you have Cloudflare configured with Wrangler, you can deploy with a simple command.

```bash
pnpm run deploy
```