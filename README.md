# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Local development

Start the local API and Vite frontend together:

```powershell
npm install
npm run dev
```

The frontend is available at `http://localhost:5173`. Vite proxies `/api/*`
to the local API on port 3001, which invokes the same handlers used by Vercel.
The API process loads server-side values from `.env.local`; keep that file
local and never expose `SUPABASE_SERVICE_ROLE_KEY` or admin authentication
variables to the client.

In Vercel Project Settings > Build and Deployment, set Development Command to
`npm run dev:vite` (or leave it blank). Do not set it to `npm run dev` or
`vercel dev`, as either value recursively invokes Vercel.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
