---
layout: center
---

Using our page object in a test:

```js {1,4,7}
// tests/some.test.js

import { test } from "@playwright/test";
import { SomePage } from "...js";

test("getting started", async ({ page }) => {
  const docsPage = new SomePage(page);

  await docsPage.goto();
  await docsPage.getStarted();
  // ...
});
```
