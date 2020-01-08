# React, TypeScript, ESLint, ANTDesign starter kit

## Features

* [Webpack](https://webpack.js.org) builder with dev and prod modes, devserver and analysis
* [Ant Design](https://ant.design)
* React 16 (hooks, functional components) framework
* Typescript
* ESLint
* Static main HTML file
* Static JS bundles (main, react, antd, vendors)
* ANTD icons mitigation (only used icon imported via `src/icons.js`)
* ANTD `momentjs` mitigation (replaced to dayjs)
* Main and the only application .LESS file: `.less` -> `.css`

## Content

* Custom navigation based on react-router
* Smart breadcrumbs component
* Smart main menu
* Default system font and reset CSS

The kit should works in all major browsers. IE11 support isn't too complicated as well: just change `"target": "es2015"` in tsconfig.json and add some polyfills.

## Installation

1. Download
2. Run `npm install`

## Usage

Use one of `build.*.bat` on Windows (just a shortcuts, on Linux/Mac you can assign execute permissions and use them as well)

Or

- `npm run build` for production build,
- `npm run dev` for dev mode build,
- `npm run analyze` to see package analysis,
- `npm run start` to run devserver.

File `start.devserver.bat` is a shortcut for the last one.
