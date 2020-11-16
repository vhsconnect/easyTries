## Description

easyTries.js is a [Trie](https://en.wikipedia.org/wiki/Trie) tree data structure implementation for lookaheads, autocompletes on string or types that coerce to strings. It is most commonly used for filtering a map or dictionary of strings down based on some user input. easyTries.js is a lightweight zero dependency library. The retrieval time complexity of each subsequent lookahead is much more efficient than the naive iterative implementation and approaches O(1) as the user approaches maximum depth of the tree. For a comparison between easyTries and a naive iterative implementation, consider the benchmarks.

## Usage

```js
import Trie from Tries.js
const trie = new Trie()
trie.set('adam')
trie.set('aDam\'S apple')
trie.set('  ads  ')
trie.set('abe')
trie.get('ad') // expected [ 'ads', 'adam', 'adam\'s apple']
```

### Todo

- options:
  - trim
  - casing:
    - sensitive: tree stores characters as is
    - insensitive: tree stores all characters as upper case
  - startAt:
    - number: ignore get calls until certain depth is reached
  - mapper function, filter function
