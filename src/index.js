const Trie = require("./Tries.js");

modules.exports = function easyTries(options) {
  Trie.prototype.trim = options.trim ? String.trim : (x) => x;
};
