var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
import { getActiveWindow } from "../../../../../base/browser/dom.js";
import { FastDomNode } from "../../../../../base/browser/fastDomNode.js";
import { localize } from "../../../../../nls.js";
import { AccessibilitySupport, IAccessibilityService } from "../../../../../platform/accessibility/common/accessibility.js";
import { IKeybindingService } from "../../../../../platform/keybinding/common/keybinding.js";
import { EditorOption } from "../../../../common/config/editorOptions.js";
import { FontInfo } from "../../../../common/config/fontInfo.js";
import { Position } from "../../../../common/core/position.js";
import { Range } from "../../../../common/core/range.js";
import { Selection } from "../../../../common/core/selection.js";
import { EndOfLinePreference } from "../../../../common/model.js";
import { ViewConfigurationChangedEvent, ViewCursorStateChangedEvent } from "../../../../common/viewEvents.js";
import { ViewContext } from "../../../../common/viewModel/viewContext.js";
import { applyFontInfo } from "../../../config/domFontInfo.js";
import { RestrictedRenderingContext, RenderingContext } from "../../../view/renderingContext.js";
import { ariaLabelForScreenReaderContent, ISimpleModel, newlinecount, PagedScreenReaderStrategy, ScreenReaderContentState } from "../screenReaderUtils.js";
let ScreenReaderSupport = class {
  constructor(_domNode, _context, _keybindingService, _accessibilityService) {
    this._domNode = _domNode;
    this._context = _context;
    this._keybindingService = _keybindingService;
    this._accessibilityService = _accessibilityService;
    this._updateConfigurationSettings();
    this._updateDomAttributes();
  }
  static {
    __name(this, "ScreenReaderSupport");
  }
  // Configuration values
  _contentLeft = 1;
  _contentWidth = 1;
  _lineHeight = 1;
  _fontInfo;
  _accessibilityPageSize = 1;
  _primarySelection = new Selection(1, 1, 1, 1);
  _screenReaderContentState;
  onConfigurationChanged(e) {
    this._updateConfigurationSettings();
    this._updateDomAttributes();
    if (this._accessibilityService.isScreenReaderOptimized()) {
      this.writeScreenReaderContent();
    }
  }
  _updateConfigurationSettings() {
    const options = this._context.configuration.options;
    const layoutInfo = options.get(EditorOption.layoutInfo);
    this._contentLeft = layoutInfo.contentLeft;
    this._contentWidth = layoutInfo.contentWidth;
    this._fontInfo = options.get(EditorOption.fontInfo);
    this._lineHeight = options.get(EditorOption.lineHeight);
    this._accessibilityPageSize = options.get(EditorOption.accessibilityPageSize);
  }
  _updateDomAttributes() {
    const options = this._context.configuration.options;
    this._domNode.domNode.setAttribute("role", "textbox");
    this._domNode.domNode.setAttribute("aria-required", options.get(EditorOption.ariaRequired) ? "true" : "false");
    this._domNode.domNode.setAttribute("aria-multiline", "true");
    this._domNode.domNode.setAttribute("aria-autocomplete", options.get(EditorOption.readOnly) ? "none" : "both");
    this._domNode.domNode.setAttribute("aria-roledescription", localize("editor", "editor"));
    this._domNode.domNode.setAttribute("aria-label", ariaLabelForScreenReaderContent(options, this._keybindingService));
    const tabSize = this._context.viewModel.model.getOptions().tabSize;
    const spaceWidth = options.get(EditorOption.fontInfo).spaceWidth;
    this._domNode.domNode.style.tabSize = `${tabSize * spaceWidth}px`;
  }
  onCursorStateChanged(e) {
    this._primarySelection = e.selections[0] ?? new Selection(1, 1, 1, 1);
  }
  prepareRender(ctx) {
    this.writeScreenReaderContent();
  }
  render(ctx) {
    if (!this._screenReaderContentState) {
      return;
    }
    applyFontInfo(this._domNode, this._fontInfo);
    const verticalOffsetForPrimaryLineNumber = this._context.viewLayout.getVerticalOffsetForLineNumber(this._primarySelection.positionLineNumber);
    const editorScrollTop = this._context.viewLayout.getCurrentScrollTop();
    const top = verticalOffsetForPrimaryLineNumber - editorScrollTop;
    this._domNode.setTop(top);
    this._domNode.setLeft(this._contentLeft);
    this._domNode.setWidth(this._contentWidth);
    this._domNode.setHeight(this._lineHeight);
    const textContentBeforeSelection = this._screenReaderContentState.value.substring(0, this._screenReaderContentState.selectionStart);
    const numberOfLinesOfContentBeforeSelection = newlinecount(textContentBeforeSelection);
    this._domNode.domNode.scrollTop = numberOfLinesOfContentBeforeSelection * this._lineHeight;
  }
  setAriaOptions() {
  }
  writeScreenReaderContent() {
    const focusedElement = getActiveWindow().document.activeElement;
    if (!focusedElement || focusedElement !== this._domNode.domNode) {
      return;
    }
    this._screenReaderContentState = this._getScreenReaderContentState();
    if (!this._screenReaderContentState) {
      return;
    }
    if (this._domNode.domNode.textContent !== this._screenReaderContentState.value) {
      this._domNode.domNode.textContent = this._screenReaderContentState.value;
    }
    this._setSelectionOfScreenReaderContent(this._screenReaderContentState.selectionStart, this._screenReaderContentState.selectionEnd);
  }
  get screenReaderContentState() {
    return this._screenReaderContentState;
  }
  _getScreenReaderContentState() {
    if (!this._accessibilityService.isScreenReaderOptimized()) {
      return;
    }
    const simpleModel = {
      getLineCount: /* @__PURE__ */ __name(() => {
        return this._context.viewModel.getLineCount();
      }, "getLineCount"),
      getLineMaxColumn: /* @__PURE__ */ __name((lineNumber) => {
        return this._context.viewModel.getLineMaxColumn(lineNumber);
      }, "getLineMaxColumn"),
      getValueInRange: /* @__PURE__ */ __name((range, eol) => {
        return this._context.viewModel.getValueInRange(range, eol);
      }, "getValueInRange"),
      getValueLengthInRange: /* @__PURE__ */ __name((range, eol) => {
        return this._context.viewModel.getValueLengthInRange(range, eol);
      }, "getValueLengthInRange"),
      modifyPosition: /* @__PURE__ */ __name((position, offset) => {
        return this._context.viewModel.modifyPosition(position, offset);
      }, "modifyPosition")
    };
    return PagedScreenReaderStrategy.fromEditorSelection(simpleModel, this._primarySelection, this._accessibilityPageSize, this._accessibilityService.getAccessibilitySupport() === AccessibilitySupport.Unknown);
  }
  _setSelectionOfScreenReaderContent(selectionOffsetStart, selectionOffsetEnd) {
    const activeDocument = getActiveWindow().document;
    const activeDocumentSelection = activeDocument.getSelection();
    if (!activeDocumentSelection) {
      return;
    }
    const textContent = this._domNode.domNode.firstChild;
    if (!textContent) {
      return;
    }
    const range = new globalThis.Range();
    range.setStart(textContent, selectionOffsetStart);
    range.setEnd(textContent, selectionOffsetEnd);
    activeDocumentSelection.removeAllRanges();
    activeDocumentSelection.addRange(range);
  }
};
ScreenReaderSupport = __decorateClass([
  __decorateParam(2, IKeybindingService),
  __decorateParam(3, IAccessibilityService)
], ScreenReaderSupport);
export {
  ScreenReaderSupport
};
//# sourceMappingURL=screenReaderSupport.js.map
