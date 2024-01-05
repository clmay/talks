---
layout: center
---

A simple page object:

```js
// pom/pages/playwright-docs-page.js

import { expect } from "@playwright/test";

export class SomePage {
  constructor(page) {
    this.page = page;
    this.getStarted = page.getByRole('...');
    this.header = page.locator('h1');
    // ...
  }

  async goto() {
    await this.page.goto('https://playwright.dev');
  }

  async getStarted() {
    await this.getStarted.click();
    await expect(this.header).toBeVisible();
  }
  // ...
}
```
