/*
   example Trie Tree for the words 'CAT', 'CAN' & 'CATHY'
   |Trie 'C'
   |_ children
     |_ Trie 'A'
       |_ children
         |_ Trie 'T'
         | |_ children
         | | |_ Trie 'H'
         | |   |_ children
         | |     |_ Trie 'Y'
         | |       |_ children
         | |       |_ word
         | |_ word  
         |_ Trie 'N'
           |_ children
           |_ word
- A Trie must have a children property (even if empty) but not necessarily a word property
 */

module.exports = function Trie(): void {
  this.children = {};
};

Trie.prototype.set = function (next) {
  let arr;
  if (!(next instanceof Array)) {
    next = this.processWithOptions(next.toString());
    arr = next.split("");
  } else arr = next;
  const character = arr[0];
  let flag = false;
  if (arr.length === 0) return;
  if (arr.length === 1) {
    flag = true;
  }
  //if the letter already exist in the branch at that particular position
  // dont instantiate a node,
  // check to see if you're at the end of the word, to flag it
  // invoke next set function on the new node with the rest of the word
  if (this.children[character]) {
    arr.shift();
    if (flag === true) this.children[character].word = true;
    this.children[character].set(arr);
    //else that letter does not exist at this node, so create a new node with the target letter
    //then repeat the same steps as above
  } else {
    this.children[character] = new Trie();
    arr.shift();
    if (flag === true) this.children[character].word = true;
    this.children[character].set(arr);
  }
};

Trie.prototype.get = function (string) {
  if (!this.minDepthMet) return [];
  string = this.processWithOptions(string.toString());
  let pointer = this.children;
  const result = [];
  let traverseBuild = "";
  return branches(traverse(string), string); // exe

  // traverse drills down to return the common root of all possible branches based on user input
  function traverse(string) {
    const arr = string.split("");
    const character = arr[0];

    if (arr.length === 0) {
      // target root has been reached - partial branch based on user input
      return pointer;
    }
    // no branches found - node doesnt exist
    if (!pointer[character]) {
      return false;
    }
    pointer = pointer[character].children;
    traverseBuild += arr.shift();
    const temp = arr.join("");
    //if string forms a valid branch - add it to our results
    if (temp.length === 1 && pointer[temp] && pointer[temp].word) {
      result.push(traverseBuild + temp);
    }
    return traverse(temp);
  }

  // at initiation build is the string we are finding branches for,
  // as we recurse and iterate, build is shapesifting as we build
  // all the possible word combination i.e branches
  function branches(newRoot, build) {
    if (newRoot === false) return [];
    // get all branch roots (letters)
    const keys = Object.keys(newRoot);
    // iterate over children at that particular depth
    for (let i = 0; i < keys.length; i++) {
      let childNode = newRoot[keys[i]];
      build += keys[i];
      // if there are child nodes, check to see if 'is a word' then continue down branch
      if (Object.keys(childNode.children).length !== 0) {
        if (childNode.word) result.push(build);
        branches(childNode.children, build);
        // no children , must be end of a word
      } else {
        result.push(build);
      }
      // on the way back up the branch - remove the letter so we can continue itterating
      build = build.slice(0, -1);
    }
    return result;
  }
};

// module.exports = Trie;
