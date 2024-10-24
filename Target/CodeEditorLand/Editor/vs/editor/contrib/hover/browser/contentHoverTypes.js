var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { ContentHoverComputerOptions } from "./contentHoverComputer.js";
import { HoverAnchor, IHoverPart } from "./hoverTypes.js";
class ContentHoverResult {
  constructor(hoverParts, isComplete, options) {
    this.hoverParts = hoverParts;
    this.isComplete = isComplete;
    this.options = options;
  }
  static {
    __name(this, "ContentHoverResult");
  }
  filter(anchor) {
    const filteredHoverParts = this.hoverParts.filter((m) => m.isValidForHoverAnchor(anchor));
    if (filteredHoverParts.length === this.hoverParts.length) {
      return this;
    }
    return new FilteredContentHoverResult(this, filteredHoverParts, this.isComplete, this.options);
  }
}
class FilteredContentHoverResult extends ContentHoverResult {
  constructor(original, messages, isComplete, options) {
    super(messages, isComplete, options);
    this.original = original;
  }
  static {
    __name(this, "FilteredContentHoverResult");
  }
  filter(anchor) {
    return this.original.filter(anchor);
  }
}
export {
  ContentHoverResult,
  FilteredContentHoverResult
};
//# sourceMappingURL=contentHoverTypes.js.map
