module.exports = class naive {
  constructor() {
    this.mem = [];
  }
  set(word) {
    this.mem.push(word);
  }
  get(word) {
    return this.mem.filter((x) => {
      let regex = RegExp(`^${word}`);
      return regex.test(x);
    });
  }
};
