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
import { AsyncIterableObject } from "../../../../../base/common/async.js";
import { CancellationToken } from "../../../../../base/common/cancellation.js";
import { ICodeEditor } from "../../../../browser/editorBrowser.js";
import { Range } from "../../../../common/core/range.js";
import { IModelDecoration } from "../../../../common/model.js";
import { DocumentColorProvider } from "../../../../common/languages.js";
import { ColorDetector } from "../colorDetector.js";
import { ColorPickerModel } from "../colorPickerModel.js";
import { ColorPickerWidget } from "./hoverColorPickerWidget.js";
import { HoverAnchor, HoverAnchorType, IEditorHoverParticipant, IEditorHoverRenderContext, IHoverPart, IRenderedHoverPart, IRenderedHoverParts, RenderedHoverParts } from "../../../hover/browser/hoverTypes.js";
import { IThemeService } from "../../../../../platform/theme/common/themeService.js";
import * as nls from "../../../../../nls.js";
import { BaseColor, createColorHover, updateColorPresentations, updateEditorModel } from "../colorPickerParticipantUtils.js";
import { EditorOption } from "../../../../common/config/editorOptions.js";
import { Dimension } from "../../../../../base/browser/dom.js";
import { DisposableStore } from "../../../../../base/common/lifecycle.js";
import { Color } from "../../../../../base/common/color.js";
class ColorHover {
  constructor(owner, range, model, provider) {
    this.owner = owner;
    this.range = range;
    this.model = model;
    this.provider = provider;
  }
  static {
    __name(this, "ColorHover");
  }
  /**
   * Force the hover to always be rendered at this specific range,
   * even in the case of multiple hover parts.
   */
  forceShowAtRange = true;
  isValidForHoverAnchor(anchor) {
    return anchor.type === HoverAnchorType.Range && this.range.startColumn <= anchor.range.startColumn && this.range.endColumn >= anchor.range.endColumn;
  }
  static fromBaseColor(owner, color) {
    return new ColorHover(owner, color.range, color.model, color.provider);
  }
}
let HoverColorPickerParticipant = class {
  constructor(_editor, _themeService) {
    this._editor = _editor;
    this._themeService = _themeService;
  }
  static {
    __name(this, "HoverColorPickerParticipant");
  }
  hoverOrdinal = 2;
  _colorPicker;
  computeSync(_anchor, _lineDecorations) {
    return [];
  }
  computeAsync(anchor, lineDecorations, token) {
    return AsyncIterableObject.fromPromise(this._computeAsync(anchor, lineDecorations, token));
  }
  async _computeAsync(_anchor, lineDecorations, _token) {
    if (!this._editor.hasModel()) {
      return [];
    }
    const colorDetector = ColorDetector.get(this._editor);
    if (!colorDetector) {
      return [];
    }
    for (const d of lineDecorations) {
      if (!colorDetector.isColorDecoration(d)) {
        continue;
      }
      const colorData = colorDetector.getColorData(d.range.getStartPosition());
      if (colorData) {
        const colorHover = ColorHover.fromBaseColor(this, await createColorHover(this._editor.getModel(), colorData.colorInfo, colorData.provider));
        return [colorHover];
      }
    }
    return [];
  }
  renderHoverParts(context, hoverParts) {
    const editor = this._editor;
    if (hoverParts.length === 0 || !editor.hasModel()) {
      return new RenderedHoverParts([]);
    }
    if (context.setMinimumDimensions) {
      const minimumHeight = editor.getOption(EditorOption.lineHeight) + 8;
      context.setMinimumDimensions(new Dimension(302, minimumHeight));
    }
    const disposables = new DisposableStore();
    const colorHover = hoverParts[0];
    const editorModel = editor.getModel();
    const model = colorHover.model;
    this._colorPicker = disposables.add(new ColorPickerWidget(context.fragment, model, editor.getOption(EditorOption.pixelRatio), this._themeService, false));
    let editorUpdatedByColorPicker = false;
    let range = new Range(colorHover.range.startLineNumber, colorHover.range.startColumn, colorHover.range.endLineNumber, colorHover.range.endColumn);
    disposables.add(model.onColorFlushed(async (color) => {
      await updateColorPresentations(editorModel, model, color, range, colorHover);
      editorUpdatedByColorPicker = true;
      range = updateEditorModel(editor, range, model);
    }));
    disposables.add(model.onDidChangeColor((color) => {
      updateColorPresentations(editorModel, model, color, range, colorHover);
    }));
    disposables.add(editor.onDidChangeModelContent((e) => {
      if (editorUpdatedByColorPicker) {
        editorUpdatedByColorPicker = false;
      } else {
        context.hide();
        editor.focus();
      }
    }));
    const renderedHoverPart = {
      hoverPart: ColorHover.fromBaseColor(this, colorHover),
      hoverElement: this._colorPicker.domNode,
      dispose() {
        disposables.dispose();
      }
    };
    return new RenderedHoverParts([renderedHoverPart]);
  }
  getAccessibleContent(hoverPart) {
    return nls.localize("hoverAccessibilityColorParticipant", "There is a color picker here.");
  }
  handleResize() {
    this._colorPicker?.layout();
  }
  isColorPickerVisible() {
    return !!this._colorPicker;
  }
};
HoverColorPickerParticipant = __decorateClass([
  __decorateParam(1, IThemeService)
], HoverColorPickerParticipant);
export {
  ColorHover,
  HoverColorPickerParticipant
};
//# sourceMappingURL=hoverColorPickerParticipant.js.map
