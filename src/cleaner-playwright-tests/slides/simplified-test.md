---
layout: center
---

# AND our test!


```js {1,5-7}
// tests/some.test.js

import { test } from "../pom/fixtures.js";

test("getting started", ({ app }) => {
  await app.somePage.doSomething();
  await app.another.doSomethingElse();
  // ...
});
```
