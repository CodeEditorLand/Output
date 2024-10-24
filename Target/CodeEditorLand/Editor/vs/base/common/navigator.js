var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
class ArrayNavigator {
  constructor(items, start = 0, end = items.length, index = start - 1) {
    this.items = items;
    this.start = start;
    this.end = end;
    this.index = index;
  }
  static {
    __name(this, "ArrayNavigator");
  }
  current() {
    if (this.index === this.start - 1 || this.index === this.end) {
      return null;
    }
    return this.items[this.index];
  }
  next() {
    this.index = Math.min(this.index + 1, this.end);
    return this.current();
  }
  previous() {
    this.index = Math.max(this.index - 1, this.start - 1);
    return this.current();
  }
  first() {
    this.index = this.start;
    return this.current();
  }
  last() {
    this.index = this.end - 1;
    return this.current();
  }
}
export {
  ArrayNavigator
};
//# sourceMappingURL=navigator.js.map
