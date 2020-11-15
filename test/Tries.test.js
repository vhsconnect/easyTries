const Trie = require("../src/Tries.js");
const assert = require("assert");

describe("Tries.js", () => {
  describe(".set", () => {
    it("Should set a word in the trie", () => {
      let trie = new Trie();
      trie.set("hello");
      let postSet = {
        children: {
          H: {
            children: {
              E: {
                children: {
                  L: {
                    children: {
                      L: {
                        children: {
                          O: {
                            children: {},
                            word: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      assert.deepEqual(trie, postSet);
    });
    it("Should set two words with a commom root", () => {
      let trie = new Trie();
      trie.set("hello");
      trie.set("he");
      let postSet = {
        children: {
          H: {
            children: {
              E: {
                word: true,
                children: {
                  L: {
                    children: {
                      L: {
                        children: {
                          O: {
                            children: {},
                            word: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      assert.deepEqual(trie, postSet);
    });
    it("Should work with number types", () => {
      let trie = new Trie();
      trie.set(3);
      let postSet = {
        children: {
          3: {
            children: {},
            word: true
          }
        }
      };
      assert.deepEqual(trie, postSet);
    });
    // it("Should work with white spaces", () => {
    //   let trie = new Trie();
    //   trie.set("h o");
    //   let postSet = {
    //     children: {
    //       H: {
    //         children: {
    //           " ": {
    //             children: {
    //               O: {
    //                 children: {},
    //                 word: true,
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   };
    //   assert.deepEqual(trie, postSet);
    // });
    it("Should handle adding many nodes", done => {
      assert.doesNotThrow(() => {
        let trie = new Trie();
        for (let i = 0; i < 1000001; i++) trie.set(i);
        done();
      });
    }).timeout("3000");
  });
  describe(".get", () => {
    it("Should should return result in an array", () => {
      let trie = new Trie();
      trie.set("hello");
      assert(trie.get("hello"), ["hello"]);
    });
    it("Should  return words that share a root", () => {
      let trie = new Trie();
      trie.set("hello");
      trie.set("HE");
      assert(trie.get("he"), ["hello", "he"]);
    });
    it("Should ignore whitespaces, before and after word", () => {
      let trie = new Trie();
      trie.set("hello  ");
      trie.set("  never  ");
      assert(trie.get("   ne"), ["never"]);
      assert(trie.get("  hello "), ["hello"]);
    });
    // it("Should  return words that share a root", () => {
    //   let trie = new Trie();
    //   trie.set("hello");
    //   trie.set("HE");
    //   assert(trie.get("he"), ["hello", "he"]);
    // });
  });
});
