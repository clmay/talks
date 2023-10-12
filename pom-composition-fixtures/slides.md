---
background: https://source.unsplash.com/collection/94734566/1920x1080
transition: slide-left
---

# Cleaner Playwright tests

### Using fixtures, page-object models, composition



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

What's in a `page`?



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
