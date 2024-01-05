---
layout: center
---

Let's create fixtures for our example that had too much boilerplate:

```js {1,5-7,11-12,15-16,19-20}
// pom/fixtures.js

import { test as base } from "@playwright/test";

import { SomePage } from "...";
import { AnotherPage } from "...";
import { EtcEtc } from "...";
// ...

export const test = base.extend({
    somePage: async ({ page }, use) => {
        const somePage = new SomePage(page);
        await use(somePage);
    },
    anotherPage: async ({ page }, use) => {
        const anotherPage = new AnotherPage(page);
        await use(anotherPage);
    },
    etcEtc: async ({ page }, use) => {
        const etcEtc = new EtcEtc(page);
        await use(etcEtc);
    },
    // ...
});
```
