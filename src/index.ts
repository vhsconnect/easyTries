import Trie from "./Tries";

interface Options {
  trim: boolean;
  casing: string;
  getDepth: number;
}

export function easyTries(
  options: Options = {
    trim: true,
    casing: "sensitive",
    getDepth: 1,
  }
) {
  Trie.prototype.processWithOptions = (string: string) =>
    [
      options.trim ? (x: string) => x.trim() : (x: string) => x,
      options.casing === "lower"
        ? (x: string) => x.toLowerCase()
        : options.casing === "upper"
        ? (x: string) => x.toUpperCase()
        : (x: string) => x,
    ].reduce((acc, fn) => fn(acc), string);

  Trie.prototype.minDepthMet = (string: string) =>
    string.length >= options.getDepth;

  return new Trie();
}
