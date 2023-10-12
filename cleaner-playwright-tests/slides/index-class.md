---
layout: center
---

Let's create another class:

```js
// pom/index.js

import { test } from "@playwright/test";

import { SomePage } from "...";
import { AnotherPage } from "...";
import { AndAnother } from "...";
import { EtcEtc } from "...";
// ...

export class Application {
  constructor(page) {
    this.page = page;

    this.somePage = new SomePage(page)
    this.another = new AnotherPage(page)
    this.andAnother = new AndAnother(page)
    this.etcEtc = new EtcEtc(page)
    // ...
  }
  // ...
}
```
