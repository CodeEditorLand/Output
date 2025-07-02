var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
class ViewLineOptions {
  static {
    __name(this, "ViewLineOptions");
  }
  constructor(config, themeType) {
    this.themeType = themeType;
    const options = config.options;
    const fontInfo = options.get(
      57
      /* EditorOption.fontInfo */
    );
    this.renderWhitespace = options.get(
      109
      /* EditorOption.renderWhitespace */
    );
    this.experimentalWhitespaceRendering = options.get(
      45
      /* EditorOption.experimentalWhitespaceRendering */
    );
    this.renderControlCharacters = options.get(
      104
      /* EditorOption.renderControlCharacters */
    );
    this.spaceWidth = fontInfo.spaceWidth;
    this.middotWidth = fontInfo.middotWidth;
    this.wsmiddotWidth = fontInfo.wsmiddotWidth;
    this.useMonospaceOptimizations = fontInfo.isMonospace && !options.get(
      38
      /* EditorOption.disableMonospaceOptimizations */
    );
    this.canUseHalfwidthRightwardsArrow = fontInfo.canUseHalfwidthRightwardsArrow;
    this.lineHeight = options.get(
      73
      /* EditorOption.lineHeight */
    );
    this.stopRenderingLineAfter = options.get(
      127
      /* EditorOption.stopRenderingLineAfter */
    );
    this.fontLigatures = options.get(
      58
      /* EditorOption.fontLigatures */
    );
    this.useGpu = options.get(
      44
      /* EditorOption.experimentalGpuAcceleration */
    ) === "on";
  }
  equals(other) {
    return this.themeType === other.themeType && this.renderWhitespace === other.renderWhitespace && this.experimentalWhitespaceRendering === other.experimentalWhitespaceRendering && this.renderControlCharacters === other.renderControlCharacters && this.spaceWidth === other.spaceWidth && this.middotWidth === other.middotWidth && this.wsmiddotWidth === other.wsmiddotWidth && this.useMonospaceOptimizations === other.useMonospaceOptimizations && this.canUseHalfwidthRightwardsArrow === other.canUseHalfwidthRightwardsArrow && this.lineHeight === other.lineHeight && this.stopRenderingLineAfter === other.stopRenderingLineAfter && this.fontLigatures === other.fontLigatures && this.useGpu === other.useGpu;
  }
}
export {
  ViewLineOptions
};
//# sourceMappingURL=viewLineOptions.js.map
