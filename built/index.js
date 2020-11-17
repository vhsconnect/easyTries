var Trie = require("./Tries.js");
module.exports = function easyTries(options) {
    if (options === void 0) { options = {
        trim: true,
        casing: "sensitive",
        getDepth: 1,
    }; }
    Trie.prototype.processWithOptions = function (string) {
        return [
            options.trim ? function (x) { return x.trim(); } : function (x) { return x; },
            options.casing === "lower"
                ? function (x) { return x.toLowercase(); }
                : options.casing === "upper"
                    ? function (x) { return x.toUppercase(); }
                    : function (x) { return x; },
        ].reduce(function (acc, fn) { return fn(acc); }, string);
    };
    Trie.prototype.minDepthMet = function (string) { return string.length >= options.getDepth; };
    return new Trie();
};
