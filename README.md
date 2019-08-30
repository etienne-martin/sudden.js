# Sudden.js

A high-level API framework built on top of express.

This project is heavily inspired by [Next.js](https://github.com/zeit/next.js) for its simplicity and ease of use.

[![Coveralls github](https://img.shields.io/coveralls/github/etienne-martin/sudden.js.svg)](https://coveralls.io/github/etienne-martin/sudden.js)
[![CircleCI build](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser.svg)](https://circleci.com/gh/etienne-martin/sudden.js)
[![node version](https://img.shields.io/node/v/sudden.svg)](https://www.npmjs.com/package/sudden)
[![npm version](https://img.shields.io/npm/v/sudden.svg)](https://www.npmjs.com/package/sudden)
[![npm monthly downloads](https://img.shields.io/npm/dm/sudden.svg)](https://www.npmjs.com/package/sudden)

![demo](https://raw.githubusercontent.com/etienne-martin/sudden.js/master/demo.gif)

## How to use

### Setup

Install it in your project:

```bash
npm install sudden
```

and add a script to your `package.json` like this:

```json
{
  "scripts": {
    "dev": "sudden",
    "build": "sudden build",
    "start": "sudden start"
  }
}
```

After that, the file-system is the main API. Every `.js` file becomes a route that gets automatically processed.

Populate `./endpoints/index.js` inside your project:

```js
export default (req, res) => {
  res.json({
    hello: "world!"
  });
};
```

and then just run `npm run dev` and go to `http://localhost:3000`. To use another port, you can run `npm run dev -p <your port here>`.

So far, we get:

- Automatic transpilation (with webpack and babel)
- Automatic route reloading
- Dynamic routes support
- API middlewares
- Built-in error handling
- Built-in TypeScript support
- Static endpoints support

## Automatic transpilation

Write modern javascript right away without configuring webpack and babel.

## Dynamic route support

// TODO: document this thing

## Built-in middlewares

```javascript
export default (req, res) => {
  const body = req.body; // The request body
  const query = req.query; // The url querystring
  const cookies = req.cookies; // The passed cookies

  res.json({
    body,
    query,
    cookies
  });
};
```

## Custom middlewares

You can add your own middleware by extending the default router with a special file called `./endpoints/_router.js` as shown below:

```javascript
import cors from "cors";

export default router => {
  router.use(cors());
};
```

## Built-in error handling

404s and execeptions are handled gracefully out of the box. Any unexpected error will return a generic 500 error to avoid leaking sensitive information. The actual error will be logged in the console.

## Custom error handling

You can add your error handler with a special file called `./endpoints/_error.js` as shown below:

```javascript
export default (err, req, res) => {
  if (err.message === "some error") {
    // Do something with the error
  }
};
```

## TypeScript

Sudden.js provides an integrated TypeScript experience out of the box.

Convert your existing endpoints from `.js` to `.ts` and restart your development server with `sudden dev` (normally `npm run dev`).

Sudden.js will guide you through installing the necessary packages to complete setup.

## Static endpoints support

Static endpoints can be created by populating the `./endpoints` folder with json files. The content of those json files will be sent as the response body:

```json
{
  "ping": "pong"
}
```

## HTTP verbs

By default, files in the `./endpoints` folder will respond to any type of request. Add the HTTP verb as a suffix to your endpoint's name to allow only a specific verb like so `./endpoints/user.post.js`.

The supported HTTP verbs are `get`, `post`, `put`, `delete` and `patch`.
