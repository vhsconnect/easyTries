/*=========================================================*\
 * Runs a performance test on the trie by reading in an
 * entire dictionary and checking memory and speed to load.
\*=========================================================*/

var Trie = require("./src/Tries.js");
var dict = require("./dictionary_compact.json");
// var util = require("util");

var memStart = process.memoryUsage().heapTotal / 1048576;
console.log("Memory: " + memStart + " MB");

let trie = new Trie();
let timerStartSetDict = new Date();
for (var key in dict) trie.set(key);

console.log(
  "Dictionary loaded into TrieSearch in ",
  new Date() - timerStartSetDict
);

console.log("Dictionary loaded into TrieSearch.");
let timerStart = new Date();
console.log("Sample of 'sta'", trie.get("sta"));
console.log("retrieve time: ", new Date() - timerStart);
console.log("Trie Node Count: ", trie.size);

var memEnd = process.memoryUsage().heapTotal / 1048576;
console.log("Trie Memory Used: " + (memEnd - memStart) + " MB");
