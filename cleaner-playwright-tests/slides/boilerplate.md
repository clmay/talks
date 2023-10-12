---
layout: center
---

# Answer: Boilerplate...

Let's say you're writing an E2E test for a complex user flow, requiring interaction with many pages. Pretty soon, it
will look like this:


```js
// tests/some.test.js

import { test } from "@playwright/test";
import { SomePage } from "...";
import { AnotherPage } from "...";
import { AndAnother } from "...";
import { EtcEtc } from "...";
// ...

test("getting started", async ({ page }) => {
  const somePage = new SomePage(page);
  const anotherPage = new AnotherPage(page);
  const andAnother = new AndAnother(page);
  const etcEtc = new EtcEtc(page);
  // ...
});
```
