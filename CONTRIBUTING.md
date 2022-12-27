# Contributing to the ecosystem

Thanks for taking the time to contribute !

## Setup

Install the dependencies

```shell
yarn
yarn dev
```

Don't forget to setup your IDE with `eslint` and `prettier`.

## Project structure

- **components** contains generic components used inside the application.
- **views** contains building blocks for each page. The entry point of a view is used as the root component of each route.
- **config** contains all the config files and ABIs.
- **redux** contains the redux files for the global state of the app.
- **context** contains global contexts (separated from the redux store)
- **hooks** contains generic hooks.
- **utils** contains generic utilities functions.
- **pages** contains page components for next.js
- **library** contains lib utils for global app.

Template:

```
**Environment:**
Device and OS:
Browser:
Reproducibility rate:

**Steps to reproduce:**
1.
2.
3.

**Expected result:**
```

A good bug report shouldn't leave others needing to chase you up for more.
