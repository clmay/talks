---
layout: center
---

Now, when we want to use multiple pages for a test, things are much cleaner. We turned this:

```js {1,3-5,8-11}
// tests/some.test.js

import { SomePage } from "...";
import { AnotherPage } from "...";
import { EtcEtc } from "...";
// ...

test("getting started", async ({ page }) => {
  const somePage = new SomePage(page);
  const anotherPage = new AnotherPage(page);
  const etcEtc = new EtcEtc(page);
  // ...
});
```

Into this:

```js {1,3}
import { test } from "../pom/fixtures.js";

test("getting started", ({ somePage, anotherPage, etcEtc }) => {
  // ...
});
```
