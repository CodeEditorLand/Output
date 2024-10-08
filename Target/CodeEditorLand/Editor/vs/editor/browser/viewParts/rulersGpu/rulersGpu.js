var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { ViewPart } from "../../view/viewPart.js";
import { RenderingContext, RestrictedRenderingContext } from "../../view/renderingContext.js";
import { ViewContext } from "../../../common/viewModel/viewContext.js";
import * as viewEvents from "../../../common/viewEvents.js";
import { EditorOption } from "../../../common/config/editorOptions.js";
import { Color } from "../../../../base/common/color.js";
import { editorRuler } from "../../../common/core/editorColorRegistry.js";
import { autorun } from "../../../../base/common/observable.js";
class RulersGpu extends ViewPart {
  constructor(context, _viewGpuContext) {
    super(context);
    this._viewGpuContext = _viewGpuContext;
    this._register(autorun((reader) => this._updateEntries(reader)));
  }
  static {
    __name(this, "RulersGpu");
  }
  _gpuShapes = [];
  // --- begin event handlers
  onConfigurationChanged(e) {
    this._updateEntries(void 0);
    return true;
  }
  // --- end event handlers
  prepareRender(ctx) {
  }
  render(ctx) {
  }
  _updateEntries(reader) {
    const options = this._context.configuration.options;
    const rulers = options.get(EditorOption.rulers);
    const typicalHalfwidthCharacterWidth = options.get(EditorOption.fontInfo).typicalHalfwidthCharacterWidth;
    const devicePixelRatio = this._viewGpuContext.devicePixelRatio.read(reader);
    for (let i = 0, len = rulers.length; i < len; i++) {
      const ruler = rulers[i];
      const shape = this._gpuShapes[i];
      const color = ruler.color ? Color.fromHex(ruler.color) : this._context.theme.getColor(editorRuler) ?? Color.white;
      const rulerData = [
        ruler.column * typicalHalfwidthCharacterWidth * devicePixelRatio,
        0,
        Math.max(1, Math.ceil(devicePixelRatio)),
        Number.MAX_SAFE_INTEGER,
        color.rgba.r / 255,
        color.rgba.g / 255,
        color.rgba.b / 255,
        color.rgba.a
      ];
      if (!shape) {
        this._gpuShapes[i] = this._viewGpuContext.rectangleRenderer.register(...rulerData);
      } else {
        shape.setRaw(rulerData);
      }
    }
    while (this._gpuShapes.length > rulers.length) {
      this._gpuShapes.splice(-1, 1)[0].dispose();
    }
  }
}
export {
  RulersGpu
};
//# sourceMappingURL=rulersGpu.js.map
