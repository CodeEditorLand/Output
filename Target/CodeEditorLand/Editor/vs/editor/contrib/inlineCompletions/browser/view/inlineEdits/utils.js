var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { h } from "../../../../../../base/browser/dom.js";
import { KeybindingLabel, unthemedKeybindingLabelOptions } from "../../../../../../base/browser/ui/keybindingLabel/keybindingLabel.js";
import { IReader } from "../../../../../../base/common/observable.js";
import { OS } from "../../../../../../base/common/platform.js";
import { URI } from "../../../../../../base/common/uri.js";
import { MenuEntryActionViewItem } from "../../../../../../platform/actions/browser/menuEntryActionViewItem.js";
import { ObservableCodeEditor } from "../../../../../browser/observableCodeEditor.js";
import { LineRange } from "../../../../../common/core/lineRange.js";
import { TextEdit } from "../../../../../common/core/textEdit.js";
import { RangeMapping } from "../../../../../common/diff/rangeMapping.js";
function maxLeftInRange(editor, range, reader) {
  editor.layoutInfo.read(reader);
  editor.value.read(reader);
  const model = editor.model.get();
  if (!model) {
    return 0;
  }
  let maxLeft = 0;
  editor.scrollTop.read(reader);
  for (let i = range.startLineNumber; i < range.endLineNumberExclusive; i++) {
    const column = model.getLineMaxColumn(i);
    const left = editor.editor.getOffsetForColumn(i, column);
    maxLeft = Math.max(maxLeft, left);
  }
  return maxLeft;
}
__name(maxLeftInRange, "maxLeftInRange");
class StatusBarViewItem extends MenuEntryActionViewItem {
  static {
    __name(this, "StatusBarViewItem");
  }
  updateLabel() {
    const kb = this._keybindingService.lookupKeybinding(this._action.id, this._contextKeyService);
    if (!kb) {
      return super.updateLabel();
    }
    if (this.label) {
      const div = h("div.keybinding").root;
      const keybindingLabel = this._register(new KeybindingLabel(div, OS, { disableTitle: true, ...unthemedKeybindingLabelOptions }));
      keybindingLabel.set(kb);
      this.label.textContent = this._action.label;
      this.label.appendChild(div);
      this.label.classList.add("inlineSuggestionStatusBarItemLabel");
    }
  }
  updateTooltip() {
  }
}
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static {
    __name(this, "Point");
  }
  add(other) {
    return new Point(this.x + other.x, this.y + other.y);
  }
  deltaX(delta) {
    return new Point(this.x + delta, this.y);
  }
}
class UniqueUriGenerator {
  constructor(scheme) {
    this.scheme = scheme;
  }
  static {
    __name(this, "UniqueUriGenerator");
  }
  static _modelId = 0;
  getUniqueUri() {
    return URI.from({ scheme: this.scheme, path: (/* @__PURE__ */ new Date()).toString() + String(UniqueUriGenerator._modelId++) });
  }
}
function applyEditToModifiedRangeMappings(rangeMapping, edit) {
  const updatedMappings = [];
  for (const m of rangeMapping) {
    const updatedRange = edit.mapRange(m.modifiedRange);
    updatedMappings.push(new RangeMapping(m.originalRange, updatedRange));
  }
  return updatedMappings;
}
__name(applyEditToModifiedRangeMappings, "applyEditToModifiedRangeMappings");
export {
  Point,
  StatusBarViewItem,
  UniqueUriGenerator,
  applyEditToModifiedRangeMappings,
  maxLeftInRange
};
//# sourceMappingURL=utils.js.map
