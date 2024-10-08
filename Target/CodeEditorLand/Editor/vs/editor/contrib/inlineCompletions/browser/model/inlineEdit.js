var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { SingleTextEdit } from "../../../../common/core/textEdit.js";
class InlineEdit {
  constructor(edit) {
    this.edit = edit;
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
}
export {
  InlineEdit
};
//# sourceMappingURL=inlineEdit.js.map
