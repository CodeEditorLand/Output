var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import * as dom from "../../dom.js";
import { IKeyboardEvent } from "../../keyboardEvent.js";
import { IMouseEvent } from "../../mouseEvent.js";
import { IToggleStyles, Toggle } from "../toggle/toggle.js";
import { IContextViewProvider } from "../contextview/contextview.js";
import { CaseSensitiveToggle, RegexToggle, WholeWordsToggle } from "./findInputToggles.js";
import { HistoryInputBox, IInputBoxStyles, IInputValidator, IMessage as InputBoxMessage } from "../inputbox/inputBox.js";
import { Widget } from "../widget.js";
import { Emitter, Event } from "../../../common/event.js";
import { KeyCode } from "../../../common/keyCodes.js";
import "./findInput.css";
import * as nls from "../../../../nls.js";
import { DisposableStore, MutableDisposable } from "../../../common/lifecycle.js";
import { createInstantHoverDelegate } from "../hover/hoverDelegateFactory.js";
const NLS_DEFAULT_LABEL = nls.localize("defaultLabel", "input");
class FindInput extends Widget {
  static {
    __name(this, "FindInput");
  }
  static OPTION_CHANGE = "optionChange";
  placeholder;
  validation;
  label;
  showCommonFindToggles;
  fixFocusOnOptionClickEnabled = true;
  imeSessionInProgress = false;
  additionalTogglesDisposables = this._register(new MutableDisposable());
  controls;
  regex;
  wholeWords;
  caseSensitive;
  additionalToggles = [];
  domNode;
  inputBox;
  _onDidOptionChange = this._register(new Emitter());
  onDidOptionChange = this._onDidOptionChange.event;
  _onKeyDown = this._register(new Emitter());
  onKeyDown = this._onKeyDown.event;
  _onMouseDown = this._register(new Emitter());
  onMouseDown = this._onMouseDown.event;
  _onInput = this._register(new Emitter());
  onInput = this._onInput.event;
  _onKeyUp = this._register(new Emitter());
  onKeyUp = this._onKeyUp.event;
  _onCaseSensitiveKeyDown = this._register(new Emitter());
  onCaseSensitiveKeyDown = this._onCaseSensitiveKeyDown.event;
  _onRegexKeyDown = this._register(new Emitter());
  onRegexKeyDown = this._onRegexKeyDown.event;
  constructor(parent, contextViewProvider, options) {
    super();
    this.placeholder = options.placeholder || "";
    this.validation = options.validation;
    this.label = options.label || NLS_DEFAULT_LABEL;
    this.showCommonFindToggles = !!options.showCommonFindToggles;
    const appendCaseSensitiveLabel = options.appendCaseSensitiveLabel || "";
    const appendWholeWordsLabel = options.appendWholeWordsLabel || "";
    const appendRegexLabel = options.appendRegexLabel || "";
    const history = options.history || [];
    const flexibleHeight = !!options.flexibleHeight;
    const flexibleWidth = !!options.flexibleWidth;
    const flexibleMaxHeight = options.flexibleMaxHeight;
    this.domNode = document.createElement("div");
    this.domNode.classList.add("monaco-findInput");
    this.inputBox = this._register(new HistoryInputBox(this.domNode, contextViewProvider, {
      placeholder: this.placeholder || "",
      ariaLabel: this.label || "",
      validationOptions: {
        validation: this.validation
      },
      history,
      showHistoryHint: options.showHistoryHint,
      flexibleHeight,
      flexibleWidth,
      flexibleMaxHeight,
      inputBoxStyles: options.inputBoxStyles
    }));
    const hoverDelegate = this._register(createInstantHoverDelegate());
    if (this.showCommonFindToggles) {
      this.regex = this._register(new RegexToggle({
        appendTitle: appendRegexLabel,
        isChecked: false,
        hoverDelegate,
        ...options.toggleStyles
      }));
      this._register(this.regex.onChange((viaKeyboard) => {
        this._onDidOptionChange.fire(viaKeyboard);
        if (!viaKeyboard && this.fixFocusOnOptionClickEnabled) {
          this.inputBox.focus();
        }
        this.validate();
      }));
      this._register(this.regex.onKeyDown((e) => {
        this._onRegexKeyDown.fire(e);
      }));
      this.wholeWords = this._register(new WholeWordsToggle({
        appendTitle: appendWholeWordsLabel,
        isChecked: false,
        hoverDelegate,
        ...options.toggleStyles
      }));
      this._register(this.wholeWords.onChange((viaKeyboard) => {
        this._onDidOptionChange.fire(viaKeyboard);
        if (!viaKeyboard && this.fixFocusOnOptionClickEnabled) {
          this.inputBox.focus();
        }
        this.validate();
      }));
      this.caseSensitive = this._register(new CaseSensitiveToggle({
        appendTitle: appendCaseSensitiveLabel,
        isChecked: false,
        hoverDelegate,
        ...options.toggleStyles
      }));
      this._register(this.caseSensitive.onChange((viaKeyboard) => {
        this._onDidOptionChange.fire(viaKeyboard);
        if (!viaKeyboard && this.fixFocusOnOptionClickEnabled) {
          this.inputBox.focus();
        }
        this.validate();
      }));
      this._register(this.caseSensitive.onKeyDown((e) => {
        this._onCaseSensitiveKeyDown.fire(e);
      }));
      const indexes = [this.caseSensitive.domNode, this.wholeWords.domNode, this.regex.domNode];
      this.onkeydown(this.domNode, (event) => {
        if (event.equals(KeyCode.LeftArrow) || event.equals(KeyCode.RightArrow) || event.equals(KeyCode.Escape)) {
          const index = indexes.indexOf(this.domNode.ownerDocument.activeElement);
          if (index >= 0) {
            let newIndex = -1;
            if (event.equals(KeyCode.RightArrow)) {
              newIndex = (index + 1) % indexes.length;
            } else if (event.equals(KeyCode.LeftArrow)) {
              if (index === 0) {
                newIndex = indexes.length - 1;
              } else {
                newIndex = index - 1;
              }
            }
            if (event.equals(KeyCode.Escape)) {
              indexes[index].blur();
              this.inputBox.focus();
            } else if (newIndex >= 0) {
              indexes[newIndex].focus();
            }
            dom.EventHelper.stop(event, true);
          }
        }
      });
    }
    this.controls = document.createElement("div");
    this.controls.className = "controls";
    this.controls.style.display = this.showCommonFindToggles ? "" : "none";
    if (this.caseSensitive) {
      this.controls.append(this.caseSensitive.domNode);
    }
    if (this.wholeWords) {
      this.controls.appendChild(this.wholeWords.domNode);
    }
    if (this.regex) {
      this.controls.appendChild(this.regex.domNode);
    }
    this.setAdditionalToggles(options?.additionalToggles);
    if (this.controls) {
      this.domNode.appendChild(this.controls);
    }
    parent?.appendChild(this.domNode);
    this._register(dom.addDisposableListener(this.inputBox.inputElement, "compositionstart", (e) => {
      this.imeSessionInProgress = true;
    }));
    this._register(dom.addDisposableListener(this.inputBox.inputElement, "compositionend", (e) => {
      this.imeSessionInProgress = false;
      this._onInput.fire();
    }));
    this.onkeydown(this.inputBox.inputElement, (e) => this._onKeyDown.fire(e));
    this.onkeyup(this.inputBox.inputElement, (e) => this._onKeyUp.fire(e));
    this.oninput(this.inputBox.inputElement, (e) => this._onInput.fire());
    this.onmousedown(this.inputBox.inputElement, (e) => this._onMouseDown.fire(e));
  }
  get isImeSessionInProgress() {
    return this.imeSessionInProgress;
  }
  get onDidChange() {
    return this.inputBox.onDidChange;
  }
  layout(style) {
    this.inputBox.layout();
    this.updateInputBoxPadding(style.collapsedFindWidget);
  }
  enable() {
    this.domNode.classList.remove("disabled");
    this.inputBox.enable();
    this.regex?.enable();
    this.wholeWords?.enable();
    this.caseSensitive?.enable();
    for (const toggle of this.additionalToggles) {
      toggle.enable();
    }
  }
  disable() {
    this.domNode.classList.add("disabled");
    this.inputBox.disable();
    this.regex?.disable();
    this.wholeWords?.disable();
    this.caseSensitive?.disable();
    for (const toggle of this.additionalToggles) {
      toggle.disable();
    }
  }
  setFocusInputOnOptionClick(value) {
    this.fixFocusOnOptionClickEnabled = value;
  }
  setEnabled(enabled) {
    if (enabled) {
      this.enable();
    } else {
      this.disable();
    }
  }
  setAdditionalToggles(toggles) {
    for (const currentToggle of this.additionalToggles) {
      currentToggle.domNode.remove();
    }
    this.additionalToggles = [];
    this.additionalTogglesDisposables.value = new DisposableStore();
    for (const toggle of toggles ?? []) {
      this.additionalTogglesDisposables.value.add(toggle);
      this.controls.appendChild(toggle.domNode);
      this.additionalTogglesDisposables.value.add(toggle.onChange((viaKeyboard) => {
        this._onDidOptionChange.fire(viaKeyboard);
        if (!viaKeyboard && this.fixFocusOnOptionClickEnabled) {
          this.inputBox.focus();
        }
      }));
      this.additionalToggles.push(toggle);
    }
    if (this.additionalToggles.length > 0) {
      this.controls.style.display = "";
    }
    this.updateInputBoxPadding();
  }
  updateInputBoxPadding(controlsHidden = false) {
    if (controlsHidden) {
      this.inputBox.paddingRight = 0;
    } else {
      this.inputBox.paddingRight = (this.caseSensitive?.width() ?? 0) + (this.wholeWords?.width() ?? 0) + (this.regex?.width() ?? 0) + this.additionalToggles.reduce((r, t) => r + t.width(), 0);
    }
  }
  clear() {
    this.clearValidation();
    this.setValue("");
    this.focus();
  }
  getValue() {
    return this.inputBox.value;
  }
  setValue(value) {
    if (this.inputBox.value !== value) {
      this.inputBox.value = value;
    }
  }
  onSearchSubmit() {
    this.inputBox.addToHistory();
  }
  select() {
    this.inputBox.select();
  }
  focus() {
    this.inputBox.focus();
  }
  getCaseSensitive() {
    return this.caseSensitive?.checked ?? false;
  }
  setCaseSensitive(value) {
    if (this.caseSensitive) {
      this.caseSensitive.checked = value;
    }
  }
  getWholeWords() {
    return this.wholeWords?.checked ?? false;
  }
  setWholeWords(value) {
    if (this.wholeWords) {
      this.wholeWords.checked = value;
    }
  }
  getRegex() {
    return this.regex?.checked ?? false;
  }
  setRegex(value) {
    if (this.regex) {
      this.regex.checked = value;
      this.validate();
    }
  }
  focusOnCaseSensitive() {
    this.caseSensitive?.focus();
  }
  focusOnRegex() {
    this.regex?.focus();
  }
  _lastHighlightFindOptions = 0;
  highlightFindOptions() {
    this.domNode.classList.remove("highlight-" + this._lastHighlightFindOptions);
    this._lastHighlightFindOptions = 1 - this._lastHighlightFindOptions;
    this.domNode.classList.add("highlight-" + this._lastHighlightFindOptions);
  }
  validate() {
    this.inputBox.validate();
  }
  showMessage(message) {
    this.inputBox.showMessage(message);
  }
  clearMessage() {
    this.inputBox.hideMessage();
  }
  clearValidation() {
    this.inputBox.hideMessage();
  }
}
export {
  FindInput
};
//# sourceMappingURL=findInput.js.map
