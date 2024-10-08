# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!
### Sveltekit

```bash
# create a new project in the current directory
pnpm create svelte@latest
# create a new project in my-app
pnpm create svelte@latest my-app
```

### Cloudflare

```bash
# Via cloudflare
pnpm create cloudflare@latest my-app -- --framework=svelte
```

#### Styling

##### Tailwind

```bash
# tailwind
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

##### Flowbite

```bash
# install tailwind css
npx svelte-add@latest tailwindcss
pnpm i
# install all Flowbite dependencies
pnpm i -D flowbite-svelte flowbite
# install Flowbite icons
pnpm i -D flowbite-svelte-icons
```


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
