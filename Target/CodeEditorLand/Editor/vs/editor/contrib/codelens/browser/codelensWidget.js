var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import * as dom from "../../../../base/browser/dom.js";
import { renderLabelWithIcons } from "../../../../base/browser/ui/iconLabel/iconLabels.js";
import { Constants } from "../../../../base/common/uint.js";
import "./codelensWidget.css";
import { ContentWidgetPositionPreference, IActiveCodeEditor, IContentWidget, IContentWidgetPosition, IViewZone, IViewZoneChangeAccessor } from "../../../browser/editorBrowser.js";
import { Range } from "../../../common/core/range.js";
import { IModelDecorationsChangeAccessor, IModelDeltaDecoration, ITextModel } from "../../../common/model.js";
import { ModelDecorationOptions } from "../../../common/model/textModel.js";
import { CodeLens, Command } from "../../../common/languages.js";
import { CodeLensItem } from "./codelens.js";
class CodeLensViewZone {
  static {
    __name(this, "CodeLensViewZone");
  }
  suppressMouseDown;
  domNode;
  afterLineNumber;
  /**
   * We want that this view zone, which reserves space for a code lens appears
   * as close as possible to the next line, so we use a very large value here.
   */
  afterColumn = Constants.MAX_SAFE_SMALL_INTEGER;
  heightInPx;
  _lastHeight;
  _onHeight;
  constructor(afterLineNumber, heightInPx, onHeight) {
    this.afterLineNumber = afterLineNumber;
    this.heightInPx = heightInPx;
    this._onHeight = onHeight;
    this.suppressMouseDown = true;
    this.domNode = document.createElement("div");
  }
  onComputedHeight(height) {
    if (this._lastHeight === void 0) {
      this._lastHeight = height;
    } else if (this._lastHeight !== height) {
      this._lastHeight = height;
      this._onHeight();
    }
  }
  isVisible() {
    return this._lastHeight !== 0 && this.domNode.hasAttribute("monaco-visible-view-zone");
  }
}
class CodeLensContentWidget {
  static {
    __name(this, "CodeLensContentWidget");
  }
  static _idPool = 0;
  // Editor.IContentWidget.allowEditorOverflow
  allowEditorOverflow = false;
  suppressMouseDown = true;
  _id;
  _domNode;
  _editor;
  _commands = /* @__PURE__ */ new Map();
  _widgetPosition;
  _isEmpty = true;
  constructor(editor, line) {
    this._editor = editor;
    this._id = `codelens.widget-${CodeLensContentWidget._idPool++}`;
    this.updatePosition(line);
    this._domNode = document.createElement("span");
    this._domNode.className = `codelens-decoration`;
  }
  withCommands(lenses, animate) {
    this._commands.clear();
    const children = [];
    let hasSymbol = false;
    for (let i = 0; i < lenses.length; i++) {
      const lens = lenses[i];
      if (!lens) {
        continue;
      }
      hasSymbol = true;
      if (lens.command) {
        const title = renderLabelWithIcons(lens.command.title.trim());
        if (lens.command.id) {
          const id = `c${CodeLensContentWidget._idPool++}`;
          children.push(dom.$("a", { id, title: lens.command.tooltip, role: "button" }, ...title));
          this._commands.set(id, lens.command);
        } else {
          children.push(dom.$("span", { title: lens.command.tooltip }, ...title));
        }
        if (i + 1 < lenses.length) {
          children.push(dom.$("span", void 0, "\xA0|\xA0"));
        }
      }
    }
    if (!hasSymbol) {
      dom.reset(this._domNode, dom.$("span", void 0, "no commands"));
    } else {
      dom.reset(this._domNode, ...children);
      if (this._isEmpty && animate) {
        this._domNode.classList.add("fadein");
      }
      this._isEmpty = false;
    }
  }
  getCommand(link) {
    return link.parentElement === this._domNode ? this._commands.get(link.id) : void 0;
  }
  getId() {
    return this._id;
  }
  getDomNode() {
    return this._domNode;
  }
  updatePosition(line) {
    const column = this._editor.getModel().getLineFirstNonWhitespaceColumn(line);
    this._widgetPosition = {
      position: { lineNumber: line, column },
      preference: [ContentWidgetPositionPreference.ABOVE]
    };
  }
  getPosition() {
    return this._widgetPosition || null;
  }
}
class CodeLensHelper {
  static {
    __name(this, "CodeLensHelper");
  }
  _removeDecorations;
  _addDecorations;
  _addDecorationsCallbacks;
  constructor() {
    this._removeDecorations = [];
    this._addDecorations = [];
    this._addDecorationsCallbacks = [];
  }
  addDecoration(decoration, callback) {
    this._addDecorations.push(decoration);
    this._addDecorationsCallbacks.push(callback);
  }
  removeDecoration(decorationId) {
    this._removeDecorations.push(decorationId);
  }
  commit(changeAccessor) {
    const resultingDecorations = changeAccessor.deltaDecorations(this._removeDecorations, this._addDecorations);
    for (let i = 0, len = resultingDecorations.length; i < len; i++) {
      this._addDecorationsCallbacks[i](resultingDecorations[i]);
    }
  }
}
const codeLensDecorationOptions = ModelDecorationOptions.register({
  collapseOnReplaceEdit: true,
  description: "codelens"
});
class CodeLensWidget {
  static {
    __name(this, "CodeLensWidget");
  }
  _editor;
  _viewZone;
  _viewZoneId;
  _contentWidget;
  _decorationIds;
  _data;
  _isDisposed = false;
  constructor(data, editor, helper, viewZoneChangeAccessor, heightInPx, updateCallback) {
    this._editor = editor;
    this._data = data;
    this._decorationIds = [];
    let range;
    const lenses = [];
    this._data.forEach((codeLensData, i) => {
      if (codeLensData.symbol.command) {
        lenses.push(codeLensData.symbol);
      }
      helper.addDecoration({
        range: codeLensData.symbol.range,
        options: codeLensDecorationOptions
      }, (id) => this._decorationIds[i] = id);
      if (!range) {
        range = Range.lift(codeLensData.symbol.range);
      } else {
        range = Range.plusRange(range, codeLensData.symbol.range);
      }
    });
    this._viewZone = new CodeLensViewZone(range.startLineNumber - 1, heightInPx, updateCallback);
    this._viewZoneId = viewZoneChangeAccessor.addZone(this._viewZone);
    if (lenses.length > 0) {
      this._createContentWidgetIfNecessary();
      this._contentWidget.withCommands(lenses, false);
    }
  }
  _createContentWidgetIfNecessary() {
    if (!this._contentWidget) {
      this._contentWidget = new CodeLensContentWidget(this._editor, this._viewZone.afterLineNumber + 1);
      this._editor.addContentWidget(this._contentWidget);
    } else {
      this._editor.layoutContentWidget(this._contentWidget);
    }
  }
  dispose(helper, viewZoneChangeAccessor) {
    this._decorationIds.forEach(helper.removeDecoration, helper);
    this._decorationIds = [];
    viewZoneChangeAccessor?.removeZone(this._viewZoneId);
    if (this._contentWidget) {
      this._editor.removeContentWidget(this._contentWidget);
      this._contentWidget = void 0;
    }
    this._isDisposed = true;
  }
  isDisposed() {
    return this._isDisposed;
  }
  isValid() {
    return this._decorationIds.some((id, i) => {
      const range = this._editor.getModel().getDecorationRange(id);
      const symbol = this._data[i].symbol;
      return !!(range && Range.isEmpty(symbol.range) === range.isEmpty());
    });
  }
  updateCodeLensSymbols(data, helper) {
    this._decorationIds.forEach(helper.removeDecoration, helper);
    this._decorationIds = [];
    this._data = data;
    this._data.forEach((codeLensData, i) => {
      helper.addDecoration({
        range: codeLensData.symbol.range,
        options: codeLensDecorationOptions
      }, (id) => this._decorationIds[i] = id);
    });
  }
  updateHeight(height, viewZoneChangeAccessor) {
    this._viewZone.heightInPx = height;
    viewZoneChangeAccessor.layoutZone(this._viewZoneId);
    if (this._contentWidget) {
      this._editor.layoutContentWidget(this._contentWidget);
    }
  }
  computeIfNecessary(model) {
    if (!this._viewZone.isVisible()) {
      return null;
    }
    for (let i = 0; i < this._decorationIds.length; i++) {
      const range = model.getDecorationRange(this._decorationIds[i]);
      if (range) {
        this._data[i].symbol.range = range;
      }
    }
    return this._data;
  }
  updateCommands(symbols) {
    this._createContentWidgetIfNecessary();
    this._contentWidget.withCommands(symbols, true);
    for (let i = 0; i < this._data.length; i++) {
      const resolved = symbols[i];
      if (resolved) {
        const { symbol } = this._data[i];
        symbol.command = resolved.command || symbol.command;
      }
    }
  }
  getCommand(link) {
    return this._contentWidget?.getCommand(link);
  }
  getLineNumber() {
    const range = this._editor.getModel().getDecorationRange(this._decorationIds[0]);
    if (range) {
      return range.startLineNumber;
    }
    return -1;
  }
  update(viewZoneChangeAccessor) {
    if (this.isValid()) {
      const range = this._editor.getModel().getDecorationRange(this._decorationIds[0]);
      if (range) {
        this._viewZone.afterLineNumber = range.startLineNumber - 1;
        viewZoneChangeAccessor.layoutZone(this._viewZoneId);
        if (this._contentWidget) {
          this._contentWidget.updatePosition(range.startLineNumber);
          this._editor.layoutContentWidget(this._contentWidget);
        }
      }
    }
  }
  getItems() {
    return this._data;
  }
}
export {
  CodeLensHelper,
  CodeLensWidget
};
//# sourceMappingURL=codelensWidget.js.map
