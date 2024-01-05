---
layout: center
---

We still have the problem of needing to include a lot of fixtures individually in every test... Remember this?

```js {1,5}
// tests/some.test.js

import { test } from "../pom/fixtures.js";

test("getting started", ({ somePage, anotherPage, etcEtc }) => {
  // ...
});
```
