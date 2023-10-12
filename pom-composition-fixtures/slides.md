---
background: >-
  https://images.unsplash.com/photo-1530819568329-97653eafbbfa?fit=crop&h=1080&w=1920
transition: slide-left
title: Cleaner Playwright tests
---

# Cleaner Playwright tests

### Using page objects, composition, and fixtures

<!--
There's an eclipse-related Easter egg in this title slide... Can anyone find it?
-->

---
layout: center
---

# Contents

1. Page objects
1. Fixtures
1. Composition
1. Bringing it all together



---
layout: image-left
image: /shakespeare.jpg
---

# Question...

> What's in a ~~name~~ page?

—William Shakespeare, at some point, maybe...

<!--
Everyone knows Willy's most famous quote, right?
-->

---
layout: center
---

A simple page object:

```js
// pages/playwright-docs-page.js

import { expect } from "@playwright/test";

export class PlaywrightDocsPage {
  constructor(page) {
    this.page = page;
    this.getStarted = page.getByRole('...');
    this.header = page.locator('h1');
  }

  async goto() {
    await this.page.goto('https://playwright.dev');
  }

  async getStarted() {
    await this.getStarted.click();
    await expect(this.header).toBeVisible();
  }
}
```



---
layout: center
---

Using our page object in a test:

```js
// tests/some.test.js

import { test } from "@playwright/test";
import { PlaywrightDocsPage } from "../pages/playwright-docs.js";

test("getting started", async ({ page }) => {
  const docsPage = new PlaywrightDocsPage(page);

  await docsPage.goto();
  await docsPage.getStarted();
  // ...
});
```



---
layout: center
---

# Question... So, what are page objects good for?

---
layout: center
---

# Answer: Encapsulation & DRY

The page-object model allows us to encapsulate the logic for interacting with a page in a reusable way.



---
layout: center
---

# Question... What's the catch?



---
layout: center
---

# Answer: Boilerplate...

Let's say you're writing an E2E test for a complex user flow, requiring interaction with many pages. Pretty soon, it
will look like this:


```js
// tests/some.test.js

import { test } from "@playwright/test";
import { PageOne } from "../pages/...js";
import { PageTwo } from "../pages/...js";
import { AnotherPage } from "../pages/...js";
import { AndAnother } from "../pages/...js";
import { YetAnother } from "../pages/...js";
import { EtcEtc } from "../pages/...js";
// ...

test("getting started", async ({ page }) => {
  const a = new PageOne(page);
  const b = new PageTwo(page);
  const c = new AnotherPage(page);
  const d = new AndAnother(page);
  const e = new YetAnother(page);
  const f = new EtcEtc(page);
  // ...
});
```



---
layout: center
---

# Enter: Fixtures



---
layout: center
---

# Question... First of all, what's a fixture?



---
layout: center
---

# Answer:

>Test fixtures are used to establish environment for each test, giving the test everything it needs and nothing else.

—The Playwright Docs



---
layout: center
---

# In plain English, *s'il te plaît?*

Your tests into fixtures in order to have what they need to run.

We've actually already seen them before!


```js
test("getting started", async ({ page }) => {});
```
The `page` object is a fixture that Playwright provides for us, free of charge!

<!-- "Think of fixtures as something you have to hook your tests up to in order to run." Just like lighting: you plug the lightbulb into the fixture. Also helps you think about setup: you need the right kind of wiring, switch, state, etc. -->



---
layout: center
---

# Question... How does this help?

We can use custom fixtures to relocate much of the boilerplate from the previous example.



---
layout: center
---

First, a basic example of defining a custom fixture:


```js
// fixtures.js
import { PlaywrightDocsPage } from "./pw-docs-page.js";
import { test as base } from "@playwright/test";


export const test = base.extend({
    docsPage: async ({ page }, use) => {
        const docsPage = new PlaywrightDocsPage(page);
        await use(docsPage);
    },
});
```

```js
// tests/some.test.js
test('something', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await expect(page).toHaveTitle(/Playwright/);
});

```



---
layout: center
---

Let's create fixtures for our example that had too much boilerplate:

```js
// tests/some.test.js

import { test as base } from "@playwright/test";

import { test } from "@playwright/test";
import { PageOne } from "../pages/...js";
import { AnotherPage } from "../pages/...js";
import { EtcEtc } from "../pages/...js";
// ...

export const test = base.extend({
    pageOne: async ({ page }, use) => {
        const pageOne = new PageOne(page);
        await use(pageOne);
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



---
layout: center
---

Now, when we want to use multiple pages for a test, things are much cleaner:

```js
// tests/some-test.js

test("getting started", ({ pageOne, anotherPage, etcEtc }) => {
  // ...
});
```



---
layout: center
---

# Now, you might be thinking...

"OK, but how is this an improvement? We've move boilerplate from one place to another..."



---
layout: center
---

# Answer: Well, sort of...

You're right, now our `fixtures.js` has all of the boilerplate that used to be present in our test! However, this is
still an overall improvement; instead of duplicating all of the instantiation code in every test,



---

# Credits

Some code examples were borrowed directly from the Playwright docs: playwright.dev/docs
