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
import * as dom from "../../../../base/browser/dom.js";
import { ScrollableElement } from "../../../../base/browser/ui/scrollbar/scrollableElement.js";
import { IAction } from "../../../../base/common/actions.js";
import { isNonEmptyArray } from "../../../../base/common/arrays.js";
import { Color } from "../../../../base/common/color.js";
import { Emitter, Event } from "../../../../base/common/event.js";
import { DisposableStore, dispose } from "../../../../base/common/lifecycle.js";
import { basename } from "../../../../base/common/resources.js";
import { ScrollbarVisibility } from "../../../../base/common/scrollable.js";
import { splitLines } from "../../../../base/common/strings.js";
import "./media/gotoErrorWidget.css";
import { ICodeEditor } from "../../../browser/editorBrowser.js";
import { EditorOption } from "../../../common/config/editorOptions.js";
import { Range } from "../../../common/core/range.js";
import { ScrollType } from "../../../common/editorCommon.js";
import { peekViewTitleForeground, peekViewTitleInfoForeground, PeekViewWidget } from "../../peekView/browser/peekView.js";
import * as nls from "../../../../nls.js";
import { createAndFillInActionBarActions } from "../../../../platform/actions/browser/menuEntryActionViewItem.js";
import { IMenuService, MenuId } from "../../../../platform/actions/common/actions.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { IMarker, IRelatedInformation, MarkerSeverity } from "../../../../platform/markers/common/markers.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { SeverityIcon } from "../../../../platform/severityIcon/browser/severityIcon.js";
import { contrastBorder, editorBackground, editorErrorBorder, editorErrorForeground, editorInfoBorder, editorInfoForeground, editorWarningBorder, editorWarningForeground, oneOf, registerColor, transparent } from "../../../../platform/theme/common/colorRegistry.js";
import { IColorTheme, IThemeService } from "../../../../platform/theme/common/themeService.js";
class MessageWidget {
  constructor(parent, editor, onRelatedInformation, _openerService, _labelService) {
    this._openerService = _openerService;
    this._labelService = _labelService;
    this._editor = editor;
    const domNode = document.createElement("div");
    domNode.className = "descriptioncontainer";
    this._messageBlock = document.createElement("div");
    this._messageBlock.classList.add("message");
    this._messageBlock.setAttribute("aria-live", "assertive");
    this._messageBlock.setAttribute("role", "alert");
    domNode.appendChild(this._messageBlock);
    this._relatedBlock = document.createElement("div");
    domNode.appendChild(this._relatedBlock);
    this._disposables.add(dom.addStandardDisposableListener(this._relatedBlock, "click", (event) => {
      event.preventDefault();
      const related = this._relatedDiagnostics.get(event.target);
      if (related) {
        onRelatedInformation(related);
      }
    }));
    this._scrollable = new ScrollableElement(domNode, {
      horizontal: ScrollbarVisibility.Auto,
      vertical: ScrollbarVisibility.Auto,
      useShadows: false,
      horizontalScrollbarSize: 6,
      verticalScrollbarSize: 6
    });
    parent.appendChild(this._scrollable.getDomNode());
    this._disposables.add(this._scrollable.onScroll((e) => {
      domNode.style.left = `-${e.scrollLeft}px`;
      domNode.style.top = `-${e.scrollTop}px`;
    }));
    this._disposables.add(this._scrollable);
  }
  static {
    __name(this, "MessageWidget");
  }
  _lines = 0;
  _longestLineLength = 0;
  _editor;
  _messageBlock;
  _relatedBlock;
  _scrollable;
  _relatedDiagnostics = /* @__PURE__ */ new WeakMap();
  _disposables = new DisposableStore();
  _codeLink;
  dispose() {
    dispose(this._disposables);
  }
  update(marker) {
    const { source, message, relatedInformation, code } = marker;
    let sourceAndCodeLength = (source?.length || 0) + "()".length;
    if (code) {
      if (typeof code === "string") {
        sourceAndCodeLength += code.length;
      } else {
        sourceAndCodeLength += code.value.length;
      }
    }
    const lines = splitLines(message);
    this._lines = lines.length;
    this._longestLineLength = 0;
    for (const line of lines) {
      this._longestLineLength = Math.max(line.length + sourceAndCodeLength, this._longestLineLength);
    }
    dom.clearNode(this._messageBlock);
    this._messageBlock.setAttribute("aria-label", this.getAriaLabel(marker));
    this._editor.applyFontInfo(this._messageBlock);
    let lastLineElement = this._messageBlock;
    for (const line of lines) {
      lastLineElement = document.createElement("div");
      lastLineElement.innerText = line;
      if (line === "") {
        lastLineElement.style.height = this._messageBlock.style.lineHeight;
      }
      this._messageBlock.appendChild(lastLineElement);
    }
    if (source || code) {
      const detailsElement = document.createElement("span");
      detailsElement.classList.add("details");
      lastLineElement.appendChild(detailsElement);
      if (source) {
        const sourceElement = document.createElement("span");
        sourceElement.innerText = source;
        sourceElement.classList.add("source");
        detailsElement.appendChild(sourceElement);
      }
      if (code) {
        if (typeof code === "string") {
          const codeElement = document.createElement("span");
          codeElement.innerText = `(${code})`;
          codeElement.classList.add("code");
          detailsElement.appendChild(codeElement);
        } else {
          this._codeLink = dom.$("a.code-link");
          this._codeLink.setAttribute("href", `${code.target.toString()}`);
          this._codeLink.onclick = (e) => {
            this._openerService.open(code.target, { allowCommands: true });
            e.preventDefault();
            e.stopPropagation();
          };
          const codeElement = dom.append(this._codeLink, dom.$("span"));
          codeElement.innerText = code.value;
          detailsElement.appendChild(this._codeLink);
        }
      }
    }
    dom.clearNode(this._relatedBlock);
    this._editor.applyFontInfo(this._relatedBlock);
    if (isNonEmptyArray(relatedInformation)) {
      const relatedInformationNode = this._relatedBlock.appendChild(document.createElement("div"));
      relatedInformationNode.style.paddingTop = `${Math.floor(this._editor.getOption(EditorOption.lineHeight) * 0.66)}px`;
      this._lines += 1;
      for (const related of relatedInformation) {
        const container = document.createElement("div");
        const relatedResource = document.createElement("a");
        relatedResource.classList.add("filename");
        relatedResource.innerText = `${this._labelService.getUriBasenameLabel(related.resource)}(${related.startLineNumber}, ${related.startColumn}): `;
        relatedResource.title = this._labelService.getUriLabel(related.resource);
        this._relatedDiagnostics.set(relatedResource, related);
        const relatedMessage = document.createElement("span");
        relatedMessage.innerText = related.message;
        container.appendChild(relatedResource);
        container.appendChild(relatedMessage);
        this._lines += 1;
        relatedInformationNode.appendChild(container);
      }
    }
    const fontInfo = this._editor.getOption(EditorOption.fontInfo);
    const scrollWidth = Math.ceil(fontInfo.typicalFullwidthCharacterWidth * this._longestLineLength * 0.75);
    const scrollHeight = fontInfo.lineHeight * this._lines;
    this._scrollable.setScrollDimensions({ scrollWidth, scrollHeight });
  }
  layout(height, width) {
    this._scrollable.getDomNode().style.height = `${height}px`;
    this._scrollable.getDomNode().style.width = `${width}px`;
    this._scrollable.setScrollDimensions({ width, height });
  }
  getHeightInLines() {
    return Math.min(17, this._lines);
  }
  getAriaLabel(marker) {
    let severityLabel = "";
    switch (marker.severity) {
      case MarkerSeverity.Error:
        severityLabel = nls.localize("Error", "Error");
        break;
      case MarkerSeverity.Warning:
        severityLabel = nls.localize("Warning", "Warning");
        break;
      case MarkerSeverity.Info:
        severityLabel = nls.localize("Info", "Info");
        break;
      case MarkerSeverity.Hint:
        severityLabel = nls.localize("Hint", "Hint");
        break;
    }
    let ariaLabel = nls.localize("marker aria", "{0} at {1}. ", severityLabel, marker.startLineNumber + ":" + marker.startColumn);
    const model = this._editor.getModel();
    if (model && marker.startLineNumber <= model.getLineCount() && marker.startLineNumber >= 1) {
      const lineContent = model.getLineContent(marker.startLineNumber);
      ariaLabel = `${lineContent}, ${ariaLabel}`;
    }
    return ariaLabel;
  }
}
let MarkerNavigationWidget = class extends PeekViewWidget {
  constructor(editor, _themeService, _openerService, _menuService, instantiationService, _contextKeyService, _labelService) {
    super(editor, { showArrow: true, showFrame: true, isAccessible: true, frameWidth: 1 }, instantiationService);
    this._themeService = _themeService;
    this._openerService = _openerService;
    this._menuService = _menuService;
    this._contextKeyService = _contextKeyService;
    this._labelService = _labelService;
    this._severity = MarkerSeverity.Warning;
    this._backgroundColor = Color.white;
    this._applyTheme(_themeService.getColorTheme());
    this._callOnDispose.add(_themeService.onDidColorThemeChange(this._applyTheme.bind(this)));
    this.create();
  }
  static {
    __name(this, "MarkerNavigationWidget");
  }
  static TitleMenu = new MenuId("gotoErrorTitleMenu");
  _parentContainer;
  _container;
  _icon;
  _message;
  _callOnDispose = new DisposableStore();
  _severity;
  _backgroundColor;
  _onDidSelectRelatedInformation = new Emitter();
  _heightInPixel;
  onDidSelectRelatedInformation = this._onDidSelectRelatedInformation.event;
  _applyTheme(theme) {
    this._backgroundColor = theme.getColor(editorMarkerNavigationBackground);
    let colorId = editorMarkerNavigationError;
    let headerBackground = editorMarkerNavigationErrorHeader;
    if (this._severity === MarkerSeverity.Warning) {
      colorId = editorMarkerNavigationWarning;
      headerBackground = editorMarkerNavigationWarningHeader;
    } else if (this._severity === MarkerSeverity.Info) {
      colorId = editorMarkerNavigationInfo;
      headerBackground = editorMarkerNavigationInfoHeader;
    }
    const frameColor = theme.getColor(colorId);
    const headerBg = theme.getColor(headerBackground);
    this.style({
      arrowColor: frameColor,
      frameColor,
      headerBackgroundColor: headerBg,
      primaryHeadingColor: theme.getColor(peekViewTitleForeground),
      secondaryHeadingColor: theme.getColor(peekViewTitleInfoForeground)
    });
  }
  _applyStyles() {
    if (this._parentContainer) {
      this._parentContainer.style.backgroundColor = this._backgroundColor ? this._backgroundColor.toString() : "";
    }
    super._applyStyles();
  }
  dispose() {
    this._callOnDispose.dispose();
    super.dispose();
  }
  focus() {
    this._parentContainer.focus();
  }
  _fillHead(container) {
    super._fillHead(container);
    this._disposables.add(this._actionbarWidget.actionRunner.onWillRun((e) => this.editor.focus()));
    const actions = [];
    const menu = this._menuService.getMenuActions(MarkerNavigationWidget.TitleMenu, this._contextKeyService);
    createAndFillInActionBarActions(menu, actions);
    this._actionbarWidget.push(actions, { label: false, icon: true, index: 0 });
  }
  _fillTitleIcon(container) {
    this._icon = dom.append(container, dom.$(""));
  }
  _fillBody(container) {
    this._parentContainer = container;
    container.classList.add("marker-widget");
    this._parentContainer.tabIndex = 0;
    this._parentContainer.setAttribute("role", "tooltip");
    this._container = document.createElement("div");
    container.appendChild(this._container);
    this._message = new MessageWidget(this._container, this.editor, (related) => this._onDidSelectRelatedInformation.fire(related), this._openerService, this._labelService);
    this._disposables.add(this._message);
  }
  show() {
    throw new Error("call showAtMarker");
  }
  showAtMarker(marker, markerIdx, markerCount) {
    this._container.classList.remove("stale");
    this._message.update(marker);
    this._severity = marker.severity;
    this._applyTheme(this._themeService.getColorTheme());
    const range = Range.lift(marker);
    const editorPosition = this.editor.getPosition();
    const position = editorPosition && range.containsPosition(editorPosition) ? editorPosition : range.getStartPosition();
    super.show(position, this.computeRequiredHeight());
    const model = this.editor.getModel();
    if (model) {
      const detail = markerCount > 1 ? nls.localize("problems", "{0} of {1} problems", markerIdx, markerCount) : nls.localize("change", "{0} of {1} problem", markerIdx, markerCount);
      this.setTitle(basename(model.uri), detail);
    }
    this._icon.className = `codicon ${SeverityIcon.className(MarkerSeverity.toSeverity(this._severity))}`;
    this.editor.revealPositionNearTop(position, ScrollType.Smooth);
    this.editor.focus();
  }
  updateMarker(marker) {
    this._container.classList.remove("stale");
    this._message.update(marker);
  }
  showStale() {
    this._container.classList.add("stale");
    this._relayout();
  }
  _doLayoutBody(heightInPixel, widthInPixel) {
    super._doLayoutBody(heightInPixel, widthInPixel);
    this._heightInPixel = heightInPixel;
    this._message.layout(heightInPixel, widthInPixel);
    this._container.style.height = `${heightInPixel}px`;
  }
  _onWidth(widthInPixel) {
    this._message.layout(this._heightInPixel, widthInPixel);
  }
  _relayout() {
    super._relayout(this.computeRequiredHeight());
  }
  computeRequiredHeight() {
    return 3 + this._message.getHeightInLines();
  }
};
MarkerNavigationWidget = __decorateClass([
  __decorateParam(1, IThemeService),
  __decorateParam(2, IOpenerService),
  __decorateParam(3, IMenuService),
  __decorateParam(4, IInstantiationService),
  __decorateParam(5, IContextKeyService),
  __decorateParam(6, ILabelService)
], MarkerNavigationWidget);
const errorDefault = oneOf(editorErrorForeground, editorErrorBorder);
const warningDefault = oneOf(editorWarningForeground, editorWarningBorder);
const infoDefault = oneOf(editorInfoForeground, editorInfoBorder);
const editorMarkerNavigationError = registerColor("editorMarkerNavigationError.background", { dark: errorDefault, light: errorDefault, hcDark: contrastBorder, hcLight: contrastBorder }, nls.localize("editorMarkerNavigationError", "Editor marker navigation widget error color."));
const editorMarkerNavigationErrorHeader = registerColor("editorMarkerNavigationError.headerBackground", { dark: transparent(editorMarkerNavigationError, 0.1), light: transparent(editorMarkerNavigationError, 0.1), hcDark: null, hcLight: null }, nls.localize("editorMarkerNavigationErrorHeaderBackground", "Editor marker navigation widget error heading background."));
const editorMarkerNavigationWarning = registerColor("editorMarkerNavigationWarning.background", { dark: warningDefault, light: warningDefault, hcDark: contrastBorder, hcLight: contrastBorder }, nls.localize("editorMarkerNavigationWarning", "Editor marker navigation widget warning color."));
const editorMarkerNavigationWarningHeader = registerColor("editorMarkerNavigationWarning.headerBackground", { dark: transparent(editorMarkerNavigationWarning, 0.1), light: transparent(editorMarkerNavigationWarning, 0.1), hcDark: "#0C141F", hcLight: transparent(editorMarkerNavigationWarning, 0.2) }, nls.localize("editorMarkerNavigationWarningBackground", "Editor marker navigation widget warning heading background."));
const editorMarkerNavigationInfo = registerColor("editorMarkerNavigationInfo.background", { dark: infoDefault, light: infoDefault, hcDark: contrastBorder, hcLight: contrastBorder }, nls.localize("editorMarkerNavigationInfo", "Editor marker navigation widget info color."));
const editorMarkerNavigationInfoHeader = registerColor("editorMarkerNavigationInfo.headerBackground", { dark: transparent(editorMarkerNavigationInfo, 0.1), light: transparent(editorMarkerNavigationInfo, 0.1), hcDark: null, hcLight: null }, nls.localize("editorMarkerNavigationInfoHeaderBackground", "Editor marker navigation widget info heading background."));
const editorMarkerNavigationBackground = registerColor("editorMarkerNavigation.background", editorBackground, nls.localize("editorMarkerNavigationBackground", "Editor marker navigation widget background."));
export {
  MarkerNavigationWidget
};
//# sourceMappingURL=gotoErrorWidget.js.map
