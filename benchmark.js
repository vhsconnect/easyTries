let easyTries = require("./built/index.js").easyTries;
let oneHundredThousandWordDictionary = require("./dictionary_compact.json");
let Naive = require("./naiveSolution.js");

let fiveHundredThousand = [];
for (let i = 0; i < 500000; i++) fiveHundredThousand.push(i);

let oneMillion = [];
for (let i = 0; i < 1000 * 1000; i++) oneMillion.push(i);

function benchmark(algo, list, testString, header) {
  let startTimeLoad = new Date();
  list.forEach((x) => algo.set(x));
  let loadTime = new Date() - startTimeLoad;
  let startTimeGet = new Date();
  let returned = algo.get(testString);
  let getTime = new Date() - startTimeGet;
  console.log(`loaded ${list.length} strings in ${loadTime} ms`);
  console.log(
    `returned a list of ${returned.length} values with input string=${testString} in ${getTime} ms`
  );
  console.log("--------");
}

console.log("***********");
console.log("Naive Implentation");
console.log("***********");
benchmark(new Naive(), Object.keys(oneHundredThousandWordDictionary), "sta");
benchmark(new Naive(), fiveHundredThousand, "834");
benchmark(new Naive(), oneMillion, "155");

console.log("***********");
console.log("EasyTries");
console.log("***********");
benchmark(easyTries(), Object.keys(oneHundredThousandWordDictionary), "sta");
benchmark(easyTries(), fiveHundredThousand, "834");
benchmark(easyTries(), oneMillion, "155");
