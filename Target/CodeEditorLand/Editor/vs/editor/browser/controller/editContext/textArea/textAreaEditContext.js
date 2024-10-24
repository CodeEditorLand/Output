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
import "./textAreaEditContext.css";
import * as nls from "../../../../../nls.js";
import * as browser from "../../../../../base/browser/browser.js";
import { FastDomNode, createFastDomNode } from "../../../../../base/browser/fastDomNode.js";
import { IKeyboardEvent } from "../../../../../base/browser/keyboardEvent.js";
import * as platform from "../../../../../base/common/platform.js";
import * as strings from "../../../../../base/common/strings.js";
import { applyFontInfo } from "../../../config/domFontInfo.js";
import { ViewController } from "../../../view/viewController.js";
import { PartFingerprint, PartFingerprints } from "../../../view/viewPart.js";
import { LineNumbersOverlay } from "../../../viewParts/lineNumbers/lineNumbers.js";
import { Margin } from "../../../viewParts/margin/margin.js";
import { RenderLineNumbersType, EditorOption, IComputedEditorOptions, EditorOptions } from "../../../../common/config/editorOptions.js";
import { FontInfo } from "../../../../common/config/fontInfo.js";
import { Position } from "../../../../common/core/position.js";
import { Range } from "../../../../common/core/range.js";
import { Selection } from "../../../../common/core/selection.js";
import { ScrollType } from "../../../../common/editorCommon.js";
import { EndOfLinePreference } from "../../../../common/model.js";
import { RenderingContext, RestrictedRenderingContext, HorizontalPosition, LineVisibleRanges } from "../../../view/renderingContext.js";
import { ViewContext } from "../../../../common/viewModel/viewContext.js";
import * as viewEvents from "../../../../common/viewEvents.js";
import { AccessibilitySupport } from "../../../../../platform/accessibility/common/accessibility.js";
import { IEditorAriaOptions } from "../../../editorBrowser.js";
import { MOUSE_CURSOR_TEXT_CSS_CLASS_NAME } from "../../../../../base/browser/ui/mouseCursor/mouseCursor.js";
import { TokenizationRegistry } from "../../../../common/languages.js";
import { ColorId, ITokenPresentation } from "../../../../common/encodedTokenAttributes.js";
import { Color } from "../../../../../base/common/color.js";
import { IME } from "../../../../../base/common/ime.js";
import { IKeybindingService } from "../../../../../platform/keybinding/common/keybinding.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { AbstractEditContext } from "../editContext.js";
import { ICompositionData, IPasteData, ITextAreaInputHost, TextAreaInput, TextAreaWrapper } from "./textAreaEditContextInput.js";
import { ariaLabelForScreenReaderContent, ISimpleModel, newlinecount, PagedScreenReaderStrategy } from "../screenReaderUtils.js";
import { ClipboardDataToCopy, getDataToCopy } from "../clipboardUtils.js";
import { _debugComposition, ITypeData, TextAreaState } from "./textAreaEditContextState.js";
import { getMapForWordSeparators, WordCharacterClass } from "../../../../common/core/wordCharacterClassifier.js";
class VisibleTextAreaData {
  constructor(_context, modelLineNumber, distanceToModelLineStart, widthOfHiddenLineTextBefore, distanceToModelLineEnd) {
    this._context = _context;
    this.modelLineNumber = modelLineNumber;
    this.distanceToModelLineStart = distanceToModelLineStart;
    this.widthOfHiddenLineTextBefore = widthOfHiddenLineTextBefore;
    this.distanceToModelLineEnd = distanceToModelLineEnd;
  }
  static {
    __name(this, "VisibleTextAreaData");
  }
  _visibleTextAreaBrand = void 0;
  startPosition = null;
  endPosition = null;
  visibleTextareaStart = null;
  visibleTextareaEnd = null;
  /**
   * When doing composition, the currently composed text might be split up into
   * multiple tokens, then merged again into a single token, etc. Here we attempt
   * to keep the presentation of the <textarea> stable by using the previous used
   * style if multiple tokens come into play. This avoids flickering.
   */
  _previousPresentation = null;
  prepareRender(visibleRangeProvider) {
    const startModelPosition = new Position(this.modelLineNumber, this.distanceToModelLineStart + 1);
    const endModelPosition = new Position(this.modelLineNumber, this._context.viewModel.model.getLineMaxColumn(this.modelLineNumber) - this.distanceToModelLineEnd);
    this.startPosition = this._context.viewModel.coordinatesConverter.convertModelPositionToViewPosition(startModelPosition);
    this.endPosition = this._context.viewModel.coordinatesConverter.convertModelPositionToViewPosition(endModelPosition);
    if (this.startPosition.lineNumber === this.endPosition.lineNumber) {
      this.visibleTextareaStart = visibleRangeProvider.visibleRangeForPosition(this.startPosition);
      this.visibleTextareaEnd = visibleRangeProvider.visibleRangeForPosition(this.endPosition);
    } else {
      this.visibleTextareaStart = null;
      this.visibleTextareaEnd = null;
    }
  }
  definePresentation(tokenPresentation) {
    if (!this._previousPresentation) {
      if (tokenPresentation) {
        this._previousPresentation = tokenPresentation;
      } else {
        this._previousPresentation = {
          foreground: ColorId.DefaultForeground,
          italic: false,
          bold: false,
          underline: false,
          strikethrough: false
        };
      }
    }
    return this._previousPresentation;
  }
}
const canUseZeroSizeTextarea = browser.isFirefox;
let TextAreaEditContext = class extends AbstractEditContext {
  constructor(context, overflowGuardContainer, viewController, visibleRangeProvider, _keybindingService, _instantiationService) {
    super(context);
    this._keybindingService = _keybindingService;
    this._instantiationService = _instantiationService;
    this._viewController = viewController;
    this._visibleRangeProvider = visibleRangeProvider;
    this._scrollLeft = 0;
    this._scrollTop = 0;
    const options = this._context.configuration.options;
    const layoutInfo = options.get(EditorOption.layoutInfo);
    this._setAccessibilityOptions(options);
    this._contentLeft = layoutInfo.contentLeft;
    this._contentWidth = layoutInfo.contentWidth;
    this._contentHeight = layoutInfo.height;
    this._fontInfo = options.get(EditorOption.fontInfo);
    this._lineHeight = options.get(EditorOption.lineHeight);
    this._emptySelectionClipboard = options.get(EditorOption.emptySelectionClipboard);
    this._copyWithSyntaxHighlighting = options.get(EditorOption.copyWithSyntaxHighlighting);
    this._visibleTextArea = null;
    this._selections = [new Selection(1, 1, 1, 1)];
    this._modelSelections = [new Selection(1, 1, 1, 1)];
    this._lastRenderPosition = null;
    this.textArea = createFastDomNode(document.createElement("textarea"));
    PartFingerprints.write(this.textArea, PartFingerprint.TextArea);
    this.textArea.setClassName(`inputarea ${MOUSE_CURSOR_TEXT_CSS_CLASS_NAME}`);
    this.textArea.setAttribute("wrap", this._textAreaWrapping && !this._visibleTextArea ? "on" : "off");
    const { tabSize } = this._context.viewModel.model.getOptions();
    this.textArea.domNode.style.tabSize = `${tabSize * this._fontInfo.spaceWidth}px`;
    this.textArea.setAttribute("autocorrect", "off");
    this.textArea.setAttribute("autocapitalize", "off");
    this.textArea.setAttribute("autocomplete", "off");
    this.textArea.setAttribute("spellcheck", "false");
    this.textArea.setAttribute("aria-label", ariaLabelForScreenReaderContent(options, this._keybindingService));
    this.textArea.setAttribute("aria-required", options.get(EditorOption.ariaRequired) ? "true" : "false");
    this.textArea.setAttribute("tabindex", String(options.get(EditorOption.tabIndex)));
    this.textArea.setAttribute("role", "textbox");
    this.textArea.setAttribute("aria-roledescription", nls.localize("editor", "editor"));
    this.textArea.setAttribute("aria-multiline", "true");
    this.textArea.setAttribute("aria-autocomplete", options.get(EditorOption.readOnly) ? "none" : "both");
    this._ensureReadOnlyAttribute();
    this.textAreaCover = createFastDomNode(document.createElement("div"));
    this.textAreaCover.setPosition("absolute");
    overflowGuardContainer.appendChild(this.textArea);
    overflowGuardContainer.appendChild(this.textAreaCover);
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
    const textAreaInputHost = {
      getDataToCopy: /* @__PURE__ */ __name(() => {
        return getDataToCopy(this._context.viewModel, this._modelSelections, this._emptySelectionClipboard, this._copyWithSyntaxHighlighting);
      }, "getDataToCopy"),
      getScreenReaderContent: /* @__PURE__ */ __name(() => {
        if (this._accessibilitySupport === AccessibilitySupport.Disabled) {
          const selection = this._selections[0];
          if (platform.isMacintosh && selection.isEmpty()) {
            const position = selection.getStartPosition();
            let textBefore = this._getWordBeforePosition(position);
            if (textBefore.length === 0) {
              textBefore = this._getCharacterBeforePosition(position);
            }
            if (textBefore.length > 0) {
              return new TextAreaState(textBefore, textBefore.length, textBefore.length, Range.fromPositions(position), 0);
            }
          }
          const LIMIT_CHARS = 500;
          if (platform.isMacintosh && !selection.isEmpty() && simpleModel.getValueLengthInRange(selection, EndOfLinePreference.TextDefined) < LIMIT_CHARS) {
            const text = simpleModel.getValueInRange(selection, EndOfLinePreference.TextDefined);
            return new TextAreaState(text, 0, text.length, selection, 0);
          }
          if (browser.isSafari && !selection.isEmpty()) {
            const placeholderText = "vscode-placeholder";
            return new TextAreaState(placeholderText, 0, placeholderText.length, null, void 0);
          }
          return TextAreaState.EMPTY;
        }
        if (browser.isAndroid) {
          const selection = this._selections[0];
          if (selection.isEmpty()) {
            const position = selection.getStartPosition();
            const [wordAtPosition, positionOffsetInWord] = this._getAndroidWordAtPosition(position);
            if (wordAtPosition.length > 0) {
              return new TextAreaState(wordAtPosition, positionOffsetInWord, positionOffsetInWord, Range.fromPositions(position), 0);
            }
          }
          return TextAreaState.EMPTY;
        }
        const screenReaderContentState = PagedScreenReaderStrategy.fromEditorSelection(simpleModel, this._selections[0], this._accessibilityPageSize, this._accessibilitySupport === AccessibilitySupport.Unknown);
        return TextAreaState.fromScreenReaderContentState(screenReaderContentState);
      }, "getScreenReaderContent"),
      deduceModelPosition: /* @__PURE__ */ __name((viewAnchorPosition, deltaOffset, lineFeedCnt) => {
        return this._context.viewModel.deduceModelPositionRelativeToViewPosition(viewAnchorPosition, deltaOffset, lineFeedCnt);
      }, "deduceModelPosition")
    };
    const textAreaWrapper = this._register(new TextAreaWrapper(this.textArea.domNode));
    this._textAreaInput = this._register(this._instantiationService.createInstance(TextAreaInput, textAreaInputHost, textAreaWrapper, platform.OS, {
      isAndroid: browser.isAndroid,
      isChrome: browser.isChrome,
      isFirefox: browser.isFirefox,
      isSafari: browser.isSafari
    }));
    this._register(this._textAreaInput.onKeyDown((e) => {
      this._viewController.emitKeyDown(e);
    }));
    this._register(this._textAreaInput.onKeyUp((e) => {
      this._viewController.emitKeyUp(e);
    }));
    this._register(this._textAreaInput.onPaste((e) => {
      let pasteOnNewLine = false;
      let multicursorText = null;
      let mode = null;
      if (e.metadata) {
        pasteOnNewLine = this._emptySelectionClipboard && !!e.metadata.isFromEmptySelection;
        multicursorText = typeof e.metadata.multicursorText !== "undefined" ? e.metadata.multicursorText : null;
        mode = e.metadata.mode;
      }
      this._viewController.paste(e.text, pasteOnNewLine, multicursorText, mode);
    }));
    this._register(this._textAreaInput.onCut(() => {
      this._viewController.cut();
    }));
    this._register(this._textAreaInput.onType((e) => {
      if (e.replacePrevCharCnt || e.replaceNextCharCnt || e.positionDelta) {
        if (_debugComposition) {
          console.log(` => compositionType: <<${e.text}>>, ${e.replacePrevCharCnt}, ${e.replaceNextCharCnt}, ${e.positionDelta}`);
        }
        this._viewController.compositionType(e.text, e.replacePrevCharCnt, e.replaceNextCharCnt, e.positionDelta);
      } else {
        if (_debugComposition) {
          console.log(` => type: <<${e.text}>>`);
        }
        this._viewController.type(e.text);
      }
    }));
    this._register(this._textAreaInput.onSelectionChangeRequest((modelSelection) => {
      this._viewController.setSelection(modelSelection);
    }));
    this._register(this._textAreaInput.onCompositionStart((e) => {
      const ta = this.textArea.domNode;
      const modelSelection = this._modelSelections[0];
      const { distanceToModelLineStart, widthOfHiddenTextBefore } = (() => {
        const textBeforeSelection = ta.value.substring(0, Math.min(ta.selectionStart, ta.selectionEnd));
        const lineFeedOffset1 = textBeforeSelection.lastIndexOf("\n");
        const lineTextBeforeSelection = textBeforeSelection.substring(lineFeedOffset1 + 1);
        const tabOffset1 = lineTextBeforeSelection.lastIndexOf("	");
        const desiredVisibleBeforeCharCount = lineTextBeforeSelection.length - tabOffset1 - 1;
        const startModelPosition = modelSelection.getStartPosition();
        const visibleBeforeCharCount = Math.min(startModelPosition.column - 1, desiredVisibleBeforeCharCount);
        const distanceToModelLineStart2 = startModelPosition.column - 1 - visibleBeforeCharCount;
        const hiddenLineTextBefore = lineTextBeforeSelection.substring(0, lineTextBeforeSelection.length - visibleBeforeCharCount);
        const { tabSize: tabSize2 } = this._context.viewModel.model.getOptions();
        const widthOfHiddenTextBefore2 = measureText(this.textArea.domNode.ownerDocument, hiddenLineTextBefore, this._fontInfo, tabSize2);
        return { distanceToModelLineStart: distanceToModelLineStart2, widthOfHiddenTextBefore: widthOfHiddenTextBefore2 };
      })();
      const { distanceToModelLineEnd } = (() => {
        const textAfterSelection = ta.value.substring(Math.max(ta.selectionStart, ta.selectionEnd));
        const lineFeedOffset2 = textAfterSelection.indexOf("\n");
        const lineTextAfterSelection = lineFeedOffset2 === -1 ? textAfterSelection : textAfterSelection.substring(0, lineFeedOffset2);
        const tabOffset2 = lineTextAfterSelection.indexOf("	");
        const desiredVisibleAfterCharCount = tabOffset2 === -1 ? lineTextAfterSelection.length : lineTextAfterSelection.length - tabOffset2 - 1;
        const endModelPosition = modelSelection.getEndPosition();
        const visibleAfterCharCount = Math.min(this._context.viewModel.model.getLineMaxColumn(endModelPosition.lineNumber) - endModelPosition.column, desiredVisibleAfterCharCount);
        const distanceToModelLineEnd2 = this._context.viewModel.model.getLineMaxColumn(endModelPosition.lineNumber) - endModelPosition.column - visibleAfterCharCount;
        return { distanceToModelLineEnd: distanceToModelLineEnd2 };
      })();
      this._context.viewModel.revealRange(
        "keyboard",
        true,
        Range.fromPositions(this._selections[0].getStartPosition()),
        viewEvents.VerticalRevealType.Simple,
        ScrollType.Immediate
      );
      this._visibleTextArea = new VisibleTextAreaData(
        this._context,
        modelSelection.startLineNumber,
        distanceToModelLineStart,
        widthOfHiddenTextBefore,
        distanceToModelLineEnd
      );
      this.textArea.setAttribute("wrap", this._textAreaWrapping && !this._visibleTextArea ? "on" : "off");
      this._visibleTextArea.prepareRender(this._visibleRangeProvider);
      this._render();
      this.textArea.setClassName(`inputarea ${MOUSE_CURSOR_TEXT_CSS_CLASS_NAME} ime-input`);
      this._viewController.compositionStart();
      this._context.viewModel.onCompositionStart();
    }));
    this._register(this._textAreaInput.onCompositionUpdate((e) => {
      if (!this._visibleTextArea) {
        return;
      }
      this._visibleTextArea.prepareRender(this._visibleRangeProvider);
      this._render();
    }));
    this._register(this._textAreaInput.onCompositionEnd(() => {
      this._visibleTextArea = null;
      this.textArea.setAttribute("wrap", this._textAreaWrapping && !this._visibleTextArea ? "on" : "off");
      this._render();
      this.textArea.setClassName(`inputarea ${MOUSE_CURSOR_TEXT_CSS_CLASS_NAME}`);
      this._viewController.compositionEnd();
      this._context.viewModel.onCompositionEnd();
    }));
    this._register(this._textAreaInput.onFocus(() => {
      this._context.viewModel.setHasFocus(true);
    }));
    this._register(this._textAreaInput.onBlur(() => {
      this._context.viewModel.setHasFocus(false);
    }));
    this._register(IME.onDidChange(() => {
      this._ensureReadOnlyAttribute();
    }));
  }
  static {
    __name(this, "TextAreaEditContext");
  }
  _viewController;
  _visibleRangeProvider;
  _scrollLeft;
  _scrollTop;
  _accessibilitySupport;
  _accessibilityPageSize;
  _textAreaWrapping;
  _textAreaWidth;
  _contentLeft;
  _contentWidth;
  _contentHeight;
  _fontInfo;
  _lineHeight;
  _emptySelectionClipboard;
  _copyWithSyntaxHighlighting;
  /**
   * Defined only when the text area is visible (composition case).
   */
  _visibleTextArea;
  _selections;
  _modelSelections;
  /**
   * The position at which the textarea was rendered.
   * This is useful for hit-testing and determining the mouse position.
   */
  _lastRenderPosition;
  textArea;
  textAreaCover;
  _textAreaInput;
  get domNode() {
    return this.textArea;
  }
  writeScreenReaderContent(reason) {
    this._textAreaInput.writeNativeTextAreaContent(reason);
  }
  dispose() {
    super.dispose();
    this.textArea.domNode.remove();
    this.textAreaCover.domNode.remove();
  }
  _getAndroidWordAtPosition(position) {
    const ANDROID_WORD_SEPARATORS = '`~!@#$%^&*()-=+[{]}\\|;:",.<>/?';
    const lineContent = this._context.viewModel.getLineContent(position.lineNumber);
    const wordSeparators = getMapForWordSeparators(ANDROID_WORD_SEPARATORS, []);
    let goingLeft = true;
    let startColumn = position.column;
    let goingRight = true;
    let endColumn = position.column;
    let distance = 0;
    while (distance < 50 && (goingLeft || goingRight)) {
      if (goingLeft && startColumn <= 1) {
        goingLeft = false;
      }
      if (goingLeft) {
        const charCode = lineContent.charCodeAt(startColumn - 2);
        const charClass = wordSeparators.get(charCode);
        if (charClass !== WordCharacterClass.Regular) {
          goingLeft = false;
        } else {
          startColumn--;
        }
      }
      if (goingRight && endColumn > lineContent.length) {
        goingRight = false;
      }
      if (goingRight) {
        const charCode = lineContent.charCodeAt(endColumn - 1);
        const charClass = wordSeparators.get(charCode);
        if (charClass !== WordCharacterClass.Regular) {
          goingRight = false;
        } else {
          endColumn++;
        }
      }
      distance++;
    }
    return [lineContent.substring(startColumn - 1, endColumn - 1), position.column - startColumn];
  }
  _getWordBeforePosition(position) {
    const lineContent = this._context.viewModel.getLineContent(position.lineNumber);
    const wordSeparators = getMapForWordSeparators(this._context.configuration.options.get(EditorOption.wordSeparators), []);
    let column = position.column;
    let distance = 0;
    while (column > 1) {
      const charCode = lineContent.charCodeAt(column - 2);
      const charClass = wordSeparators.get(charCode);
      if (charClass !== WordCharacterClass.Regular || distance > 50) {
        return lineContent.substring(column - 1, position.column - 1);
      }
      distance++;
      column--;
    }
    return lineContent.substring(0, position.column - 1);
  }
  _getCharacterBeforePosition(position) {
    if (position.column > 1) {
      const lineContent = this._context.viewModel.getLineContent(position.lineNumber);
      const charBefore = lineContent.charAt(position.column - 2);
      if (!strings.isHighSurrogate(charBefore.charCodeAt(0))) {
        return charBefore;
      }
    }
    return "";
  }
  _setAccessibilityOptions(options) {
    this._accessibilitySupport = options.get(EditorOption.accessibilitySupport);
    const accessibilityPageSize = options.get(EditorOption.accessibilityPageSize);
    if (this._accessibilitySupport === AccessibilitySupport.Enabled && accessibilityPageSize === EditorOptions.accessibilityPageSize.defaultValue) {
      this._accessibilityPageSize = 500;
    } else {
      this._accessibilityPageSize = accessibilityPageSize;
    }
    const layoutInfo = options.get(EditorOption.layoutInfo);
    const wrappingColumn = layoutInfo.wrappingColumn;
    if (wrappingColumn !== -1 && this._accessibilitySupport !== AccessibilitySupport.Disabled) {
      const fontInfo = options.get(EditorOption.fontInfo);
      this._textAreaWrapping = true;
      this._textAreaWidth = Math.round(wrappingColumn * fontInfo.typicalHalfwidthCharacterWidth);
    } else {
      this._textAreaWrapping = false;
      this._textAreaWidth = canUseZeroSizeTextarea ? 0 : 1;
    }
  }
  // --- begin event handlers
  onConfigurationChanged(e) {
    const options = this._context.configuration.options;
    const layoutInfo = options.get(EditorOption.layoutInfo);
    this._setAccessibilityOptions(options);
    this._contentLeft = layoutInfo.contentLeft;
    this._contentWidth = layoutInfo.contentWidth;
    this._contentHeight = layoutInfo.height;
    this._fontInfo = options.get(EditorOption.fontInfo);
    this._lineHeight = options.get(EditorOption.lineHeight);
    this._emptySelectionClipboard = options.get(EditorOption.emptySelectionClipboard);
    this._copyWithSyntaxHighlighting = options.get(EditorOption.copyWithSyntaxHighlighting);
    this.textArea.setAttribute("wrap", this._textAreaWrapping && !this._visibleTextArea ? "on" : "off");
    const { tabSize } = this._context.viewModel.model.getOptions();
    this.textArea.domNode.style.tabSize = `${tabSize * this._fontInfo.spaceWidth}px`;
    this.textArea.setAttribute("aria-label", ariaLabelForScreenReaderContent(options, this._keybindingService));
    this.textArea.setAttribute("aria-required", options.get(EditorOption.ariaRequired) ? "true" : "false");
    this.textArea.setAttribute("tabindex", String(options.get(EditorOption.tabIndex)));
    if (e.hasChanged(EditorOption.domReadOnly) || e.hasChanged(EditorOption.readOnly)) {
      this._ensureReadOnlyAttribute();
    }
    if (e.hasChanged(EditorOption.accessibilitySupport)) {
      this._textAreaInput.writeNativeTextAreaContent("strategy changed");
    }
    return true;
  }
  onCursorStateChanged(e) {
    this._selections = e.selections.slice(0);
    this._modelSelections = e.modelSelections.slice(0);
    this._textAreaInput.writeNativeTextAreaContent("selection changed");
    return true;
  }
  onDecorationsChanged(e) {
    return true;
  }
  onFlushed(e) {
    return true;
  }
  onLinesChanged(e) {
    return true;
  }
  onLinesDeleted(e) {
    return true;
  }
  onLinesInserted(e) {
    return true;
  }
  onScrollChanged(e) {
    this._scrollLeft = e.scrollLeft;
    this._scrollTop = e.scrollTop;
    return true;
  }
  onZonesChanged(e) {
    return true;
  }
  // --- end event handlers
  // --- begin view API
  isFocused() {
    return this._textAreaInput.isFocused();
  }
  focus() {
    this._textAreaInput.focusTextArea();
  }
  refreshFocusState() {
    this._textAreaInput.refreshFocusState();
  }
  getLastRenderData() {
    return this._lastRenderPosition;
  }
  setAriaOptions(options) {
    if (options.activeDescendant) {
      this.textArea.setAttribute("aria-haspopup", "true");
      this.textArea.setAttribute("aria-autocomplete", "list");
      this.textArea.setAttribute("aria-activedescendant", options.activeDescendant);
    } else {
      this.textArea.setAttribute("aria-haspopup", "false");
      this.textArea.setAttribute("aria-autocomplete", "both");
      this.textArea.removeAttribute("aria-activedescendant");
    }
    if (options.role) {
      this.textArea.setAttribute("role", options.role);
    }
  }
  // --- end view API
  _ensureReadOnlyAttribute() {
    const options = this._context.configuration.options;
    const useReadOnly = !IME.enabled || options.get(EditorOption.domReadOnly) && options.get(EditorOption.readOnly);
    if (useReadOnly) {
      this.textArea.setAttribute("readonly", "true");
    } else {
      this.textArea.removeAttribute("readonly");
    }
  }
  _primaryCursorPosition = new Position(1, 1);
  _primaryCursorVisibleRange = null;
  prepareRender(ctx) {
    this._primaryCursorPosition = new Position(this._selections[0].positionLineNumber, this._selections[0].positionColumn);
    this._primaryCursorVisibleRange = ctx.visibleRangeForPosition(this._primaryCursorPosition);
    this._visibleTextArea?.prepareRender(ctx);
  }
  render(ctx) {
    this._textAreaInput.writeNativeTextAreaContent("render");
    this._render();
  }
  _render() {
    if (this._visibleTextArea) {
      const visibleStart = this._visibleTextArea.visibleTextareaStart;
      const visibleEnd = this._visibleTextArea.visibleTextareaEnd;
      const startPosition = this._visibleTextArea.startPosition;
      const endPosition = this._visibleTextArea.endPosition;
      if (startPosition && endPosition && visibleStart && visibleEnd && visibleEnd.left >= this._scrollLeft && visibleStart.left <= this._scrollLeft + this._contentWidth) {
        const top2 = this._context.viewLayout.getVerticalOffsetForLineNumber(this._primaryCursorPosition.lineNumber) - this._scrollTop;
        const lineCount = newlinecount(this.textArea.domNode.value.substr(0, this.textArea.domNode.selectionStart));
        let scrollLeft = this._visibleTextArea.widthOfHiddenLineTextBefore;
        let left2 = this._contentLeft + visibleStart.left - this._scrollLeft;
        let width = visibleEnd.left - visibleStart.left + 1;
        if (left2 < this._contentLeft) {
          const delta = this._contentLeft - left2;
          left2 += delta;
          scrollLeft += delta;
          width -= delta;
        }
        if (width > this._contentWidth) {
          width = this._contentWidth;
        }
        const viewLineData = this._context.viewModel.getViewLineData(startPosition.lineNumber);
        const startTokenIndex = viewLineData.tokens.findTokenIndexAtOffset(startPosition.column - 1);
        const endTokenIndex = viewLineData.tokens.findTokenIndexAtOffset(endPosition.column - 1);
        const textareaSpansSingleToken = startTokenIndex === endTokenIndex;
        const presentation = this._visibleTextArea.definePresentation(
          textareaSpansSingleToken ? viewLineData.tokens.getPresentation(startTokenIndex) : null
        );
        this.textArea.domNode.scrollTop = lineCount * this._lineHeight;
        this.textArea.domNode.scrollLeft = scrollLeft;
        this._doRender({
          lastRenderPosition: null,
          top: top2,
          left: left2,
          width,
          height: this._lineHeight,
          useCover: false,
          color: (TokenizationRegistry.getColorMap() || [])[presentation.foreground],
          italic: presentation.italic,
          bold: presentation.bold,
          underline: presentation.underline,
          strikethrough: presentation.strikethrough
        });
      }
      return;
    }
    if (!this._primaryCursorVisibleRange) {
      this._renderAtTopLeft();
      return;
    }
    const left = this._contentLeft + this._primaryCursorVisibleRange.left - this._scrollLeft;
    if (left < this._contentLeft || left > this._contentLeft + this._contentWidth) {
      this._renderAtTopLeft();
      return;
    }
    const top = this._context.viewLayout.getVerticalOffsetForLineNumber(this._selections[0].positionLineNumber) - this._scrollTop;
    if (top < 0 || top > this._contentHeight) {
      this._renderAtTopLeft();
      return;
    }
    if (platform.isMacintosh || this._accessibilitySupport === AccessibilitySupport.Enabled) {
      this._doRender({
        lastRenderPosition: this._primaryCursorPosition,
        top,
        left: this._textAreaWrapping ? this._contentLeft : left,
        width: this._textAreaWidth,
        height: this._lineHeight,
        useCover: false
      });
      this.textArea.domNode.scrollLeft = this._primaryCursorVisibleRange.left;
      const lineCount = this._textAreaInput.textAreaState.newlineCountBeforeSelection ?? newlinecount(this.textArea.domNode.value.substring(0, this.textArea.domNode.selectionStart));
      this.textArea.domNode.scrollTop = lineCount * this._lineHeight;
      return;
    }
    this._doRender({
      lastRenderPosition: this._primaryCursorPosition,
      top,
      left: this._textAreaWrapping ? this._contentLeft : left,
      width: this._textAreaWidth,
      height: canUseZeroSizeTextarea ? 0 : 1,
      useCover: false
    });
  }
  _renderAtTopLeft() {
    this._doRender({
      lastRenderPosition: null,
      top: 0,
      left: 0,
      width: this._textAreaWidth,
      height: canUseZeroSizeTextarea ? 0 : 1,
      useCover: true
    });
  }
  _doRender(renderData) {
    this._lastRenderPosition = renderData.lastRenderPosition;
    const ta = this.textArea;
    const tac = this.textAreaCover;
    applyFontInfo(ta, this._fontInfo);
    ta.setTop(renderData.top);
    ta.setLeft(renderData.left);
    ta.setWidth(renderData.width);
    ta.setHeight(renderData.height);
    ta.setColor(renderData.color ? Color.Format.CSS.formatHex(renderData.color) : "");
    ta.setFontStyle(renderData.italic ? "italic" : "");
    if (renderData.bold) {
      ta.setFontWeight("bold");
    }
    ta.setTextDecoration(`${renderData.underline ? " underline" : ""}${renderData.strikethrough ? " line-through" : ""}`);
    tac.setTop(renderData.useCover ? renderData.top : 0);
    tac.setLeft(renderData.useCover ? renderData.left : 0);
    tac.setWidth(renderData.useCover ? renderData.width : 0);
    tac.setHeight(renderData.useCover ? renderData.height : 0);
    const options = this._context.configuration.options;
    if (options.get(EditorOption.glyphMargin)) {
      tac.setClassName("monaco-editor-background textAreaCover " + Margin.OUTER_CLASS_NAME);
    } else {
      if (options.get(EditorOption.lineNumbers).renderType !== RenderLineNumbersType.Off) {
        tac.setClassName("monaco-editor-background textAreaCover " + LineNumbersOverlay.CLASS_NAME);
      } else {
        tac.setClassName("monaco-editor-background textAreaCover");
      }
    }
  }
};
TextAreaEditContext = __decorateClass([
  __decorateParam(4, IKeybindingService),
  __decorateParam(5, IInstantiationService)
], TextAreaEditContext);
function measureText(targetDocument, text, fontInfo, tabSize) {
  if (text.length === 0) {
    return 0;
  }
  const container = targetDocument.createElement("div");
  container.style.position = "absolute";
  container.style.top = "-50000px";
  container.style.width = "50000px";
  const regularDomNode = targetDocument.createElement("span");
  applyFontInfo(regularDomNode, fontInfo);
  regularDomNode.style.whiteSpace = "pre";
  regularDomNode.style.tabSize = `${tabSize * fontInfo.spaceWidth}px`;
  regularDomNode.append(text);
  container.appendChild(regularDomNode);
  targetDocument.body.appendChild(container);
  const res = regularDomNode.offsetWidth;
  container.remove();
  return res;
}
__name(measureText, "measureText");
export {
  TextAreaEditContext
};
//# sourceMappingURL=textAreaEditContext.js.map
