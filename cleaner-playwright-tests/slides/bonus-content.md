---
layout: center
---

# Bonus content!

Sadly, Playwright's fixture mechanism editor breaks completions / suggestions...

However, you can add JSDoc type annotations to fix this!


```js {1,5-6,13}
// tests/some.test.js

import { test } from "../pom/fixtures.js";

test("getting started", ({ app: _app }) => {
/** @type {Application} */ const app = _app;

  await app.somePage.doSomething();
  await app.another.doSomethingElse();
  // ...
});

/** @typedef {import("../pom/index.js").Application} Application */
```
