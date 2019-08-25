# Sudden.js

The API framework.

## How to use

### Setup

Install it in your project:

```bash
npm install sudden
```

and add a script to your package.json like this:

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

Write modern javascript

## Dynamic route support

Write modern javascript

## API middlewares

Write modern javascript

## Built-in error handling

Write modern javascript

## Built-in TypeScript support

Write modern javascript

## Static endpoints support

Write modern javascript
