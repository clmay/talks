---
layout: center
---

Now, we can dramatically simplify our fixture:


```js {1,4,7-9}
// pom/fixtures.js

import { test as base } from "@playwright/test";
import { Application } from "./index.js";

export const test = base.extend({
    app: async ({ page }, use) => {
        const app = new Application(page);
        await use(app);
    },
});
```
