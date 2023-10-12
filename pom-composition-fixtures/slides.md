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

# QQ...

What's in a page?



---
layout: center
---

The Page-Object Model allows us to encapsulate all of the logic for interacting with a given page:

```js
import { expect } from "@playwright/test";

export class PlaywrightDocsPage {
  constructor(page) {
    this.page = page;
    this.getStartedLink = page.getByRole('link', { name: "Getting Started" });
    this.getStartedHeader = page.locator('h1', { hasText: "Installation" });
    this.tocList = page.locator('article div.markdown ul > li > a');
  }

  async goto() {
    await this.page.goto('https://playwright.dev');
  }

  async getStarted() {
    await this.getStartedLink.first().click();
    await expect(this.gettingStartedHeader).toBeVisible();
  }
}
```



---

# How can we use our page object(s) in a fixture?
