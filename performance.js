/*=========================================================*\
 * Runs a performance test on the trie by reading in an
 * entire dictionary and checking memory and speed to load.
\*=========================================================*/

var easyTries = require("./src");
var dict = require("./dictionary_compact.json");

var memStart = process.memoryUsage().heapTotal / 1048576;
console.log("Memory: " + memStart + " MB");

let trie = easyTries({ trim: true });
let count = 0;
let timerStartSetDict = new Date();
for (var key in dict) {
  trie.set(key);
  count++;
}

console.log(
  count,
  " items loaded into TrieSearch in ",
  new Date() - timerStartSetDict
);
console.log("Dictionary loaded into TrieSearch.");
let timerStart = new Date();
console.log("Sample of 'sta'", trie.get("sta"));
console.log("retrieve time: ", new Date() - timerStart);

var memEnd = process.memoryUsage().heapTotal / 1048576;
console.log("Trie Memory Used: " + (memEnd - memStart) + " MB");
