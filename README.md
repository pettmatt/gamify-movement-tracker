# Gamified Tracker

The application is still "a work in progress" and is aimed to be an cardio exercise application that can visualize the progress of a person. Btw. Best experience is achieved by using Firefox. Chrome works, but it has some visual issues.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Bug list

**Local storage**

- Local storage settings values are all converted to strings for some reason. Happened when started the project the next day. Changing the settings changed the string values to their respected types.