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
import { CancellationToken } from "../../../../../base/common/cancellation.js";
import { Color } from "../../../../../base/common/color.js";
import { DisposableStore, IDisposable } from "../../../../../base/common/lifecycle.js";
import { IThemeService } from "../../../../../platform/theme/common/themeService.js";
import { ICodeEditor } from "../../../../browser/editorBrowser.js";
import { LanguageFeatureRegistry } from "../../../../common/languageFeatureRegistry.js";
import { DocumentColorProvider, IColorInformation } from "../../../../common/languages.js";
import { IEditorHoverRenderContext } from "../../../hover/browser/hoverTypes.js";
import { getColors } from "../color.js";
import { ColorDetector } from "../colorDetector.js";
import { ColorPickerModel } from "../colorPickerModel.js";
import { BaseColor, createColorHover, updateColorPresentations, updateEditorModel } from "../colorPickerParticipantUtils.js";
import { ColorPickerWidget } from "../hoverColorPicker/hoverColorPickerWidget.js";
import { Range } from "../../../../common/core/range.js";
import { EditorOption } from "../../../../common/config/editorOptions.js";
import { Dimension } from "../../../../../base/browser/dom.js";
class StandaloneColorPickerHover {
  constructor(owner, range, model, provider) {
    this.owner = owner;
    this.range = range;
    this.model = model;
    this.provider = provider;
  }
  static {
    __name(this, "StandaloneColorPickerHover");
  }
  static fromBaseColor(owner, color) {
    return new StandaloneColorPickerHover(owner, color.range, color.model, color.provider);
  }
}
let StandaloneColorPickerParticipant = class {
  constructor(_editor, _themeService) {
    this._editor = _editor;
    this._themeService = _themeService;
  }
  static {
    __name(this, "StandaloneColorPickerParticipant");
  }
  hoverOrdinal = 2;
  _color = null;
  async createColorHover(defaultColorInfo, defaultColorProvider, colorProviderRegistry) {
    if (!this._editor.hasModel()) {
      return null;
    }
    const colorDetector = ColorDetector.get(this._editor);
    if (!colorDetector) {
      return null;
    }
    const colors = await getColors(colorProviderRegistry, this._editor.getModel(), CancellationToken.None);
    let foundColorInfo = null;
    let foundColorProvider = null;
    for (const colorData of colors) {
      const colorInfo2 = colorData.colorInfo;
      if (Range.containsRange(colorInfo2.range, defaultColorInfo.range)) {
        foundColorInfo = colorInfo2;
        foundColorProvider = colorData.provider;
      }
    }
    const colorInfo = foundColorInfo ?? defaultColorInfo;
    const colorProvider = foundColorProvider ?? defaultColorProvider;
    const foundInEditor = !!foundColorInfo;
    const colorHover = StandaloneColorPickerHover.fromBaseColor(this, await createColorHover(this._editor.getModel(), colorInfo, colorProvider));
    return { colorHover, foundInEditor };
  }
  async updateEditorModel(colorHoverData) {
    if (!this._editor.hasModel()) {
      return;
    }
    const colorPickerModel = colorHoverData.model;
    let range = new Range(colorHoverData.range.startLineNumber, colorHoverData.range.startColumn, colorHoverData.range.endLineNumber, colorHoverData.range.endColumn);
    if (this._color) {
      await updateColorPresentations(this._editor.getModel(), colorPickerModel, this._color, range, colorHoverData);
      range = updateEditorModel(this._editor, range, colorPickerModel);
    }
  }
  renderHoverParts(context, hoverParts) {
    if (hoverParts.length === 0 || !this._editor.hasModel()) {
      return void 0;
    }
    if (context.setMinimumDimensions) {
      const minimumHeight = this._editor.getOption(EditorOption.lineHeight) + 8;
      context.setMinimumDimensions(new Dimension(302, minimumHeight));
    }
    const disposables = new DisposableStore();
    const colorHover = hoverParts[0];
    const editorModel = this._editor.getModel();
    const model = colorHover.model;
    const colorPicker = disposables.add(new ColorPickerWidget(context.fragment, model, this._editor.getOption(EditorOption.pixelRatio), this._themeService, true));
    let editorUpdatedByColorPicker = false;
    const range = new Range(colorHover.range.startLineNumber, colorHover.range.startColumn, colorHover.range.endLineNumber, colorHover.range.endColumn);
    const color = colorHover.model.color;
    this._color = color;
    updateColorPresentations(editorModel, model, color, range, colorHover);
    disposables.add(model.onColorFlushed((color2) => {
      this._color = color2;
    }));
    disposables.add(model.onDidChangeColor((color2) => {
      updateColorPresentations(editorModel, model, color2, range, colorHover);
    }));
    disposables.add(this._editor.onDidChangeModelContent((e) => {
      if (editorUpdatedByColorPicker) {
        editorUpdatedByColorPicker = false;
      } else {
        context.hide();
        this._editor.focus();
      }
    }));
    return { hoverPart: colorHover, colorPicker, disposables };
  }
};
StandaloneColorPickerParticipant = __decorateClass([
  __decorateParam(1, IThemeService)
], StandaloneColorPickerParticipant);
export {
  StandaloneColorPickerHover,
  StandaloneColorPickerParticipant
};
//# sourceMappingURL=standaloneColorPickerParticipant.js.map
