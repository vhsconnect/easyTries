const easyTries = require("../built").easyTries;
const assert = require("assert");

describe("Tries.js", () => {
  describe(".set", () => {
    it("Should set a word in the trie", () => {
      let trie = easyTries();
      trie.set("hello");
      let postSet = {
        children: {
          h: {
            children: {
              e: {
                children: {
                  l: {
                    children: {
                      l: {
                        children: {
                          o: {
                            children: {},
                            word: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      };
      assert.deepEqual(trie, postSet);
    });
    it("Should set two words with a commom root", () => {
      let trie = easyTries();
      trie.set("hello");
      trie.set("he");
      let postSet = {
        children: {
          h: {
            children: {
              e: {
                word: true,
                children: {
                  l: {
                    children: {
                      l: {
                        children: {
                          o: {
                            children: {},
                            word: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      };
      assert.deepEqual(trie, postSet);
    });
    it("Should work with numbers", () => {
      let trie = easyTries();
      trie.set(3);
      let postSet = {
        children: {
          3: {
            children: {},
            word: true,
          },
        },
      };
      assert.deepEqual(trie, postSet);
    });
    it("Should work with white spaces", () => {
      let trie = easyTries();
      trie.set("h o");
      let postSet = {
        children: {
          h: {
            children: {
              " ": {
                children: {
                  o: {
                    children: {},
                    word: true,
                  },
                },
              },
            },
          },
        },
      };
      assert.deepEqual(trie, postSet);
    });
    it("Should handle adding many nodes", (done) => {
      assert.doesNotThrow(() => {
        let trie = easyTries();
        for (let i = 0; i < 1000001; i++) trie.set(i);
        done();
      });
    });
  });
  describe(".get", () => {
    it("Should return result in an array", () => {
      let trie = easyTries();
      trie.set("hello");
      assert(trie.get("hello"), ["hello"]);
    });
    it("Should return words that share a root", () => {
      let trie = easyTries();
      trie.set("hello");
      trie.set("he");
      assert(trie.get("he"), ["hello", "he"]);
    });
    it("Should ignore whitespaces, before and after word", () => {
      let trie = easyTries();
      trie.set("hello  ");
      trie.set("  never  ");
      assert(trie.get("   ne"), ["never"]);
      assert(trie.get("  hello "), ["hello"]);
    });
    it("Should process special charachters", () => {
      let trie = easyTries();
      trie.set("#$^!@#$234><?}{][]]]][[]]}1");
      assert(trie.get("#$^!"), ["#$^!@#$234><?}{][]]]][[]]}1"]);
    });
  });
  describe("withOptions", () => {
    it("Should work with uppercase option", () => {
      let trie = easyTries({ casing: "upper" });
      trie.set("hello");
      assert(trie.get("hello"), ["HELLO"]);
      assert(trie.get("HELLO"), ["HELLO"]);
    });
    it("Should work with lowercase option", () => {
      let trie = easyTries({ casing: "lower" });
      trie.set("hello");
      trie.set("HE");
      assert(trie.get("hE"), ["hello", "he"]);
    });
    it("Should work with trim = false", () => {
      let trie = easyTries({ trim: false });
      trie.set("hello  ");
      trie.set("  never  ");
      assert(trie.get("  hello "), []);
      assert(trie.get("hello  "), ["hello  "]);
    });
    it("Should not alter other default options when an option is set", () => {
      let trie = easyTries({ casing: "lower" });
      trie.set("hello  ");
      trie.set("  never  ");
      assert(trie.get("  hello "), ["hello"]);
    });
    it("Should work not return results if input does not meet min depth", () => {
      let trie = easyTries({ getDepth: 5 });
      trie.set("he");
      trie.set("hello there");
      assert(trie.get("he"), []);
    });
  });
});
