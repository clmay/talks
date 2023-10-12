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

# So, what's it good for?

---
layout: center
---

# Encapsulation & DRY

The page-object model allows us to encapsulate the logic for interacting with a page in a reusable way:



---
layout: center
---

# OK... what's the catch?



---
layout: center
---

Let's say you're writing an E2E test for a complex user flow...
