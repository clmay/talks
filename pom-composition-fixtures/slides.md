---
background: https://images.unsplash.com/photo-1530819568329-97653eafbbfa?fit=crop&h=1080&w=1920
lineNumbers: true
transition: slide-left | slide-right
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
image: /shakespeare.jpg
layout: image-left
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



---
layout: center
---

Using our page object in a test:

```js {1,7}
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
import { PageOne } from "...";
import { PageTwo } from "...";
import { AnotherPage } from "...";
import { AndAnother } from "...";
import { YetAnother } from "...";
import { EtcEtc } from "...";
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

We've actually already seen them before! Remember this?


```js {1,3}
// tests/some.test.js

test("getting started", async ({ page }) => {
  // ...
});
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

Let's create fixtures for our example that had too much boilerplate:

```js {1,5-7,11-12,15-16,19-20}
// fixtures.js

import { test as base } from "@playwright/test";

import { PageOne } from "...";
import { AnotherPage } from "...";
import { EtcEtc } from "...";
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

Now, when we want to use multiple pages for a test, things are much cleaner. We turned this:

```js {1,5-11}
// tests/some.test.js

// ...

test("getting started", async ({ page }) => {
  const a = new PageOne(page);
  const c = new AnotherPage(page);
  const f = new EtcEtc(page);
  // ...
});
```

Into this:

```js {1,5}
// tests/some.test.js

import { test } from "../fixtures.js";

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

# Well, sort of...

You're right, now our `fixtures.js` has all of the boilerplate that used to be present in our test! However, this is
still an overall improvement; instead of duplicating all of the instantiation code in every test, the nasty repetition
is isolated to just one file!



---
layout: center
---

However, we still have the problem of needing to include a lot of fixtures individually in every test... Remember this?

```js {1,5}
// tests/some.test.js

import { test } from "../fixtures.js";

test("getting started", ({ pageOne, anotherPage, etcEtc, /* and potentially many more */ }) => {
  // ...
});
```



---
layout: center
---

# What if I told you we can do better still?

How, you might ask? Well, we still have one more trick up our sleeves...

<!-- You might ask this, but only if you aren't already hoping for this talk to end... -->

---
image: https://www.wassilykandinsky.net/images/works/50.jpg
layout: image-left
---

# Answer:

Composition

<!-- (This slide is an example of failure with respect to composition... 🤪) -->



---
layout: center
---

Let's create another class. I like to call these `index` files, but I'm open to a better name if someone has
suggestions... 🙂

```js
// pages/index.js

import { test } from "@playwright/test";

import { PageOne } from "...";
import { AnotherPage } from "...";
import { AndAnother } from "...";
import { EtcEtc } from "...";
// ...

export class Application {
  constructor(page) {
    this.page = page;

    this.pageOne = new PageOne(page)
    this.another = new AnotherPage(page)
    this.andAnother = new AndAnother(page)
    this.etcEtc = new EtcEtc(page)
    // ...
  }
  // ...
}
```



---
layout: center
---

Now, we can dramatically simplify our fixture:


```js {1,4,7-9}
// fixtures.js

import { test as base } from "@playwright/test";
import { Application } from "pages/index.js";

export const test = base.extend({
    app: async ({ page }, use) => {
        const app = new Application(page);
        await use(app);
    },
});
```

---
layout: center
---

# AND our test!


```js {1,5-7}
// tests/some.test.js

import { test } from "../fixtures.js";

test("getting started", ({ app }) => {
  await app.pageOne.doSomething();
  await app.another.doSomethingElse();
  // ...
});
```



---
layout: center
---

# Bonus content!

Sadly, Playwright's fixture mechanism editor breaks completions / suggestions...

However, you can add JSDoc type annotations to fix this!


```js {1,5-6,13}
// tests/some.test.js

import { test } from "../fixtures.js";

test("getting started", ({ app: _app }) => {
/** @type {Application} */ const app = _app;

  await app.pageOne.doSomething();
  await app.another.doSomethingElse();
  // ...
});

/** @typedef {import("../pages/index.js").Application} Application */
```



---
layout: center
---

# That's a wrap! (Finally! 🤣)

Now, we have simple tests and simple fixtures.

Best of all, we did it by adding a single additional class that collects all of our pages under a single, coherent
interface! 🎉 🚀



---
layout: end
---

# Credits

Some code borrowed from [playwright.dev/docs](https://www.playwright.dev/docs).

- GitHub: [@clmay](https://github.com/clmay)
- LinkedIn: [/in/chasemay/](https://linkedin.com/in/chasemay/)
