var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { SingleTextEdit } from "../../../../common/core/textEdit.js";
class InlineEdit {
  constructor(edit, isCollapsed) {
    this.edit = edit;
    this.isCollapsed = isCollapsed;
  }
  static {
    __name(this, "InlineEdit");
  }
  get range() {
    return this.edit.range;
  }
  get text() {
    return this.edit.text;
  }
  equals(other) {
    return this.edit.equals(other.edit) && this.isCollapsed === other.isCollapsed;
  }
}
export {
  InlineEdit
};
//# sourceMappingURL=inlineEdit.js.map
