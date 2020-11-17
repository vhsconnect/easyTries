const Trie = require("./Tries.js");

module.exports = function easyTries(
  options = {
    trim: true,
    casing: "sensitive",
    getDepth: 1
  }
) {
  Trie.prototype.processWithOptions = string =>
    [
      options.trim ? x => x.trim() : x => x,
      options.casing === "lower"
        ? x => x.toLowercase()
        : options.casing === "upper"
        ? x => x.toUppercase()
        : x => x
    ].reduce((acc, fn) => fn(acc), string);

  Trie.prototype.minDepthMet = string => string.length >= options.getDepth;

  return new Trie();
};
