var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { RGBA8 } from "../../../common/core/rgba.js";
import { Constants, getCharIndex } from "./minimapCharSheet.js";
import { toUint8 } from "../../../../base/common/uint.js";
class MinimapCharRenderer {
  constructor(charData, scale) {
    this.scale = scale;
    this.charDataNormal = MinimapCharRenderer.soften(charData, 12 / 15);
    this.charDataLight = MinimapCharRenderer.soften(charData, 50 / 60);
  }
  static {
    __name(this, "MinimapCharRenderer");
  }
  _minimapCharRendererBrand = void 0;
  charDataNormal;
  charDataLight;
  static soften(input, ratio) {
    const result = new Uint8ClampedArray(input.length);
    for (let i = 0, len = input.length; i < len; i++) {
      result[i] = toUint8(input[i] * ratio);
    }
    return result;
  }
  renderChar(target, dx, dy, chCode, color, foregroundAlpha, backgroundColor, backgroundAlpha, fontScale, useLighterFont, force1pxHeight) {
    const charWidth = Constants.BASE_CHAR_WIDTH * this.scale;
    const charHeight = Constants.BASE_CHAR_HEIGHT * this.scale;
    const renderHeight = force1pxHeight ? 1 : charHeight;
    if (dx + charWidth > target.width || dy + renderHeight > target.height) {
      console.warn("bad render request outside image data");
      return;
    }
    const charData = useLighterFont ? this.charDataLight : this.charDataNormal;
    const charIndex = getCharIndex(chCode, fontScale);
    const destWidth = target.width * Constants.RGBA_CHANNELS_CNT;
    const backgroundR = backgroundColor.r;
    const backgroundG = backgroundColor.g;
    const backgroundB = backgroundColor.b;
    const deltaR = color.r - backgroundR;
    const deltaG = color.g - backgroundG;
    const deltaB = color.b - backgroundB;
    const destAlpha = Math.max(foregroundAlpha, backgroundAlpha);
    const dest = target.data;
    let sourceOffset = charIndex * charWidth * charHeight;
    let row = dy * destWidth + dx * Constants.RGBA_CHANNELS_CNT;
    for (let y = 0; y < renderHeight; y++) {
      let column = row;
      for (let x = 0; x < charWidth; x++) {
        const c = charData[sourceOffset++] / 255 * (foregroundAlpha / 255);
        dest[column++] = backgroundR + deltaR * c;
        dest[column++] = backgroundG + deltaG * c;
        dest[column++] = backgroundB + deltaB * c;
        dest[column++] = destAlpha;
      }
      row += destWidth;
    }
  }
  blockRenderChar(target, dx, dy, color, foregroundAlpha, backgroundColor, backgroundAlpha, force1pxHeight) {
    const charWidth = Constants.BASE_CHAR_WIDTH * this.scale;
    const charHeight = Constants.BASE_CHAR_HEIGHT * this.scale;
    const renderHeight = force1pxHeight ? 1 : charHeight;
    if (dx + charWidth > target.width || dy + renderHeight > target.height) {
      console.warn("bad render request outside image data");
      return;
    }
    const destWidth = target.width * Constants.RGBA_CHANNELS_CNT;
    const c = 0.5 * (foregroundAlpha / 255);
    const backgroundR = backgroundColor.r;
    const backgroundG = backgroundColor.g;
    const backgroundB = backgroundColor.b;
    const deltaR = color.r - backgroundR;
    const deltaG = color.g - backgroundG;
    const deltaB = color.b - backgroundB;
    const colorR = backgroundR + deltaR * c;
    const colorG = backgroundG + deltaG * c;
    const colorB = backgroundB + deltaB * c;
    const destAlpha = Math.max(foregroundAlpha, backgroundAlpha);
    const dest = target.data;
    let row = dy * destWidth + dx * Constants.RGBA_CHANNELS_CNT;
    for (let y = 0; y < renderHeight; y++) {
      let column = row;
      for (let x = 0; x < charWidth; x++) {
        dest[column++] = colorR;
        dest[column++] = colorG;
        dest[column++] = colorB;
        dest[column++] = destAlpha;
      }
      row += destWidth;
    }
  }
}
export {
  MinimapCharRenderer
};
//# sourceMappingURL=minimapCharRenderer.js.map
