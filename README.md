## Description

A typed, zero-dependancy Tries library.

easyTries.js is a [Trie](https://en.wikipedia.org/wiki/Trie) tree data structure implementation for lookaheads, autocompletes on strings or types that coerce to strings. It is most commonly used for quickly filtering a large set of strings down based on some user input. easyTries is able to filter down a tree of 1,000,000 words down in 1 to 3 ms. for a quick benchmark of easyTries, run `npm run benchmark`.

## Usage

```bash
npm i easyTries
```

Support for Both ES6 imports and CommonJS

```js
import Trie from "easyTries";
```

```js
const Trie = require("easyTries").easyTries;
```

```js
const trie = easyTries();
trie.set("adam");
trie.set("adam's apple");
trie.set("ads");
trie.set("abe");
trie.get("ad"); // expected [ 'ads', 'adam', 'adam\'s apple']
```

### Options

By default,

1. Strings are trimmed before being set into the tree
2. Casing is preserved
3. No minimum string length required on get operations

You can change One or all of these initial settings by initializing easyTries with options.

#### Trim

```js
let trie = easyTries({ trim: false }); // default is true
trie.set("  rice");
trie.set("rinse   ");
trie.get("ri"); // expected []
trie.get("  "); // expected ["  rice"]
```

#### Casing

```js
let trie = easyTries(); //default
trie.set("STEW");
trie.set("Stew");
trie.set("Stanley");
trie.get("ST"); // expected ["STEW"]
trie.get("st"); // expected []
```

```js
let trie = easyTries({ casing: "upper" });
trie.set("STEW");
trie.set("Stew");
trie.set("Stanley");
trie.get("ST"); // expected ["STEW", "STANLEY"]
trie.get("st"); // expected ["STEW", "STANLEY"]
```

```js
let trie = easyTries({ casing: "lower" });
trie.set("STEW");
trie.set("Stew");
trie.set("Stanley");
trie.get("ST"); // expected ["stew", "stanley"]
trie.get("st"); // expected ["stew", "stanley"]
```

#### StartAt

Probably only useful for extremly large sets, over-the-network operations, or if you want to filter out strings smaller than a particular length

```js
let trie = easyTries({ startAt: 3, casing: "lower" });
trie.set("I"); // will never get returned
trie.set("int");
trie.set("inert");
trie.set("infinity");
trie.get("i"); // expected []
trie.get("in"); // expected []
trie.get("inf"); // expected ["infinity"]
```
