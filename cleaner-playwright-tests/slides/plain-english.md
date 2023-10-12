---
layout: center
---

# In plain English, *s'il te plaît?*

Your tests use fixtures in order to have what they need to run.

We've actually already seen them before:


```js {1,3}
// tests/some.test.js

test("getting started", async ({ page }) => {
  // ...
});
```
The `page` object is a fixture that Playwright provides for us, free of charge.

<!-- "Think of fixtures as something you have to hook your tests up to in order to run." Just like lighting: you plug the lightbulb into the fixture. Also helps you think about setup: you need the right kind of wiring, switch, state, etc. -->
