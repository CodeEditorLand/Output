var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Codicon } from "../../../../base/common/codicons.js";
import { ICodeEditor } from "../../../browser/editorBrowser.js";
import { IModelDecorationOptions, IModelDecorationsChangeAccessor, MinimapPosition, TrackedRangeStickiness } from "../../../common/model.js";
import { ModelDecorationOptions } from "../../../common/model/textModel.js";
import { IDecorationProvider } from "./foldingModel.js";
import { localize } from "../../../../nls.js";
import { editorSelectionBackground, iconForeground, registerColor, transparent } from "../../../../platform/theme/common/colorRegistry.js";
import { registerIcon } from "../../../../platform/theme/common/iconRegistry.js";
import { themeColorFromId } from "../../../../platform/theme/common/themeService.js";
import { ThemeIcon } from "../../../../base/common/themables.js";
const foldBackground = registerColor("editor.foldBackground", { light: transparent(editorSelectionBackground, 0.3), dark: transparent(editorSelectionBackground, 0.3), hcDark: null, hcLight: null }, localize("foldBackgroundBackground", "Background color behind folded ranges. The color must not be opaque so as not to hide underlying decorations."), true);
registerColor("editor.foldPlaceholderForeground", { light: "#808080", dark: "#808080", hcDark: null, hcLight: null }, localize("collapsedTextColor", "Color of the collapsed text after the first line of a folded range."));
registerColor("editorGutter.foldingControlForeground", iconForeground, localize("editorGutter.foldingControlForeground", "Color of the folding control in the editor gutter."));
const foldingExpandedIcon = registerIcon("folding-expanded", Codicon.chevronDown, localize("foldingExpandedIcon", "Icon for expanded ranges in the editor glyph margin."));
const foldingCollapsedIcon = registerIcon("folding-collapsed", Codicon.chevronRight, localize("foldingCollapsedIcon", "Icon for collapsed ranges in the editor glyph margin."));
const foldingManualCollapsedIcon = registerIcon("folding-manual-collapsed", foldingCollapsedIcon, localize("foldingManualCollapedIcon", "Icon for manually collapsed ranges in the editor glyph margin."));
const foldingManualExpandedIcon = registerIcon("folding-manual-expanded", foldingExpandedIcon, localize("foldingManualExpandedIcon", "Icon for manually expanded ranges in the editor glyph margin."));
const foldedBackgroundMinimap = { color: themeColorFromId(foldBackground), position: MinimapPosition.Inline };
const collapsed = localize("linesCollapsed", "Click to expand the range.");
const expanded = localize("linesExpanded", "Click to collapse the range.");
class FoldingDecorationProvider {
  constructor(editor) {
    this.editor = editor;
  }
  static {
    __name(this, "FoldingDecorationProvider");
  }
  static COLLAPSED_VISUAL_DECORATION = ModelDecorationOptions.register({
    description: "folding-collapsed-visual-decoration",
    stickiness: TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
    afterContentClassName: "inline-folded",
    isWholeLine: true,
    linesDecorationsTooltip: collapsed,
    firstLineDecorationClassName: ThemeIcon.asClassName(foldingCollapsedIcon)
  });
  static COLLAPSED_HIGHLIGHTED_VISUAL_DECORATION = ModelDecorationOptions.register({
    description: "folding-collapsed-highlighted-visual-decoration",
    stickiness: TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
    afterContentClassName: "inline-folded",
    className: "folded-background",
    minimap: foldedBackgroundMinimap,
    isWholeLine: true,
    linesDecorationsTooltip: collapsed,
    firstLineDecorationClassName: ThemeIcon.asClassName(foldingCollapsedIcon)
  });
  static MANUALLY_COLLAPSED_VISUAL_DECORATION = ModelDecorationOptions.register({
    description: "folding-manually-collapsed-visual-decoration",
    stickiness: TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
    afterContentClassName: "inline-folded",
    isWholeLine: true,
    linesDecorationsTooltip: collapsed,
    firstLineDecorationClassName: ThemeIcon.asClassName(foldingManualCollapsedIcon)
  });
  static MANUALLY_COLLAPSED_HIGHLIGHTED_VISUAL_DECORATION = ModelDecorationOptions.register({
    description: "folding-manually-collapsed-highlighted-visual-decoration",
    stickiness: TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
    afterContentClassName: "inline-folded",
    className: "folded-background",
    minimap: foldedBackgroundMinimap,
    isWholeLine: true,
    linesDecorationsTooltip: collapsed,
    firstLineDecorationClassName: ThemeIcon.asClassName(foldingManualCollapsedIcon)
  });
  static NO_CONTROLS_COLLAPSED_RANGE_DECORATION = ModelDecorationOptions.register({
    description: "folding-no-controls-range-decoration",
    stickiness: TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
    afterContentClassName: "inline-folded",
    isWholeLine: true,
    linesDecorationsTooltip: collapsed
  });
  static NO_CONTROLS_COLLAPSED_HIGHLIGHTED_RANGE_DECORATION = ModelDecorationOptions.register({
    description: "folding-no-controls-range-decoration",
    stickiness: TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
    afterContentClassName: "inline-folded",
    className: "folded-background",
    minimap: foldedBackgroundMinimap,
    isWholeLine: true,
    linesDecorationsTooltip: collapsed
  });
  static EXPANDED_VISUAL_DECORATION = ModelDecorationOptions.register({
    description: "folding-expanded-visual-decoration",
    stickiness: TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
    isWholeLine: true,
    firstLineDecorationClassName: "alwaysShowFoldIcons " + ThemeIcon.asClassName(foldingExpandedIcon),
    linesDecorationsTooltip: expanded
  });
  static EXPANDED_AUTO_HIDE_VISUAL_DECORATION = ModelDecorationOptions.register({
    description: "folding-expanded-auto-hide-visual-decoration",
    stickiness: TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
    isWholeLine: true,
    firstLineDecorationClassName: ThemeIcon.asClassName(foldingExpandedIcon),
    linesDecorationsTooltip: expanded
  });
  static MANUALLY_EXPANDED_VISUAL_DECORATION = ModelDecorationOptions.register({
    description: "folding-manually-expanded-visual-decoration",
    stickiness: TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
    isWholeLine: true,
    firstLineDecorationClassName: "alwaysShowFoldIcons " + ThemeIcon.asClassName(foldingManualExpandedIcon),
    linesDecorationsTooltip: expanded
  });
  static MANUALLY_EXPANDED_AUTO_HIDE_VISUAL_DECORATION = ModelDecorationOptions.register({
    description: "folding-manually-expanded-auto-hide-visual-decoration",
    stickiness: TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
    isWholeLine: true,
    firstLineDecorationClassName: ThemeIcon.asClassName(foldingManualExpandedIcon),
    linesDecorationsTooltip: expanded
  });
  static NO_CONTROLS_EXPANDED_RANGE_DECORATION = ModelDecorationOptions.register({
    description: "folding-no-controls-range-decoration",
    stickiness: TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
    isWholeLine: true
  });
  static HIDDEN_RANGE_DECORATION = ModelDecorationOptions.register({
    description: "folding-hidden-range-decoration",
    stickiness: TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges
  });
  showFoldingControls = "mouseover";
  showFoldingHighlights = true;
  getDecorationOption(isCollapsed, isHidden, isManual) {
    if (isHidden) {
      return FoldingDecorationProvider.HIDDEN_RANGE_DECORATION;
    }
    if (this.showFoldingControls === "never") {
      if (isCollapsed) {
        return this.showFoldingHighlights ? FoldingDecorationProvider.NO_CONTROLS_COLLAPSED_HIGHLIGHTED_RANGE_DECORATION : FoldingDecorationProvider.NO_CONTROLS_COLLAPSED_RANGE_DECORATION;
      }
      return FoldingDecorationProvider.NO_CONTROLS_EXPANDED_RANGE_DECORATION;
    }
    if (isCollapsed) {
      return isManual ? this.showFoldingHighlights ? FoldingDecorationProvider.MANUALLY_COLLAPSED_HIGHLIGHTED_VISUAL_DECORATION : FoldingDecorationProvider.MANUALLY_COLLAPSED_VISUAL_DECORATION : this.showFoldingHighlights ? FoldingDecorationProvider.COLLAPSED_HIGHLIGHTED_VISUAL_DECORATION : FoldingDecorationProvider.COLLAPSED_VISUAL_DECORATION;
    } else if (this.showFoldingControls === "mouseover") {
      return isManual ? FoldingDecorationProvider.MANUALLY_EXPANDED_AUTO_HIDE_VISUAL_DECORATION : FoldingDecorationProvider.EXPANDED_AUTO_HIDE_VISUAL_DECORATION;
    } else {
      return isManual ? FoldingDecorationProvider.MANUALLY_EXPANDED_VISUAL_DECORATION : FoldingDecorationProvider.EXPANDED_VISUAL_DECORATION;
    }
  }
  changeDecorations(callback) {
    return this.editor.changeDecorations(callback);
  }
  removeDecorations(decorationIds) {
    this.editor.removeDecorations(decorationIds);
  }
}
export {
  FoldingDecorationProvider,
  foldingCollapsedIcon,
  foldingExpandedIcon,
  foldingManualCollapsedIcon,
  foldingManualExpandedIcon
};
//# sourceMappingURL=foldingDecorations.js.map
