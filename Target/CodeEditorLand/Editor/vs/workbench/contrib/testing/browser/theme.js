import { Color, RGBA } from "../../../../base/common/color.js";
import { localize } from "../../../../nls.js";
import { badgeBackground, badgeForeground, chartsGreen, chartsRed, contrastBorder, diffInserted, diffRemoved, editorBackground, editorErrorForeground, editorForeground, editorInfoForeground, opaque, registerColor, transparent } from "../../../../platform/theme/common/colorRegistry.js";
import { registerThemingParticipant } from "../../../../platform/theme/common/themeService.js";
import { TestResultState } from "../common/testTypes.js";
const testingColorIconFailed = registerColor("testing.iconFailed", {
  dark: "#f14c4c",
  light: "#f14c4c",
  hcDark: "#f14c4c",
  hcLight: "#B5200D"
}, localize("testing.iconFailed", "Color for the 'failed' icon in the test explorer."));
const testingColorIconErrored = registerColor("testing.iconErrored", {
  dark: "#f14c4c",
  light: "#f14c4c",
  hcDark: "#f14c4c",
  hcLight: "#B5200D"
}, localize("testing.iconErrored", "Color for the 'Errored' icon in the test explorer."));
const testingColorIconPassed = registerColor("testing.iconPassed", {
  dark: "#73c991",
  light: "#73c991",
  hcDark: "#73c991",
  hcLight: "#007100"
}, localize("testing.iconPassed", "Color for the 'passed' icon in the test explorer."));
const testingColorRunAction = registerColor("testing.runAction", testingColorIconPassed, localize("testing.runAction", "Color for 'run' icons in the editor."));
const testingColorIconQueued = registerColor("testing.iconQueued", "#cca700", localize("testing.iconQueued", "Color for the 'Queued' icon in the test explorer."));
const testingColorIconUnset = registerColor("testing.iconUnset", "#848484", localize("testing.iconUnset", "Color for the 'Unset' icon in the test explorer."));
const testingColorIconSkipped = registerColor("testing.iconSkipped", "#848484", localize("testing.iconSkipped", "Color for the 'Skipped' icon in the test explorer."));
const testingPeekBorder = registerColor("testing.peekBorder", {
  dark: editorErrorForeground,
  light: editorErrorForeground,
  hcDark: contrastBorder,
  hcLight: contrastBorder
}, localize("testing.peekBorder", "Color of the peek view borders and arrow."));
const testingMessagePeekBorder = registerColor("testing.messagePeekBorder", {
  dark: editorInfoForeground,
  light: editorInfoForeground,
  hcDark: contrastBorder,
  hcLight: contrastBorder
}, localize("testing.messagePeekBorder", "Color of the peek view borders and arrow when peeking a logged message."));
const testingPeekHeaderBackground = registerColor("testing.peekHeaderBackground", {
  dark: transparent(editorErrorForeground, 0.1),
  light: transparent(editorErrorForeground, 0.1),
  hcDark: null,
  hcLight: null
}, localize("testing.peekBorder", "Color of the peek view borders and arrow."));
const testingPeekMessageHeaderBackground = registerColor("testing.messagePeekHeaderBackground", {
  dark: transparent(editorInfoForeground, 0.1),
  light: transparent(editorInfoForeground, 0.1),
  hcDark: null,
  hcLight: null
}, localize("testing.messagePeekHeaderBackground", "Color of the peek view borders and arrow when peeking a logged message."));
const testingCoveredBackground = registerColor("testing.coveredBackground", {
  dark: diffInserted,
  light: diffInserted,
  hcDark: null,
  hcLight: null
}, localize("testing.coveredBackground", "Background color of text that was covered."));
const testingCoveredBorder = registerColor("testing.coveredBorder", {
  dark: transparent(testingCoveredBackground, 0.75),
  light: transparent(testingCoveredBackground, 0.75),
  hcDark: contrastBorder,
  hcLight: contrastBorder
}, localize("testing.coveredBorder", "Border color of text that was covered."));
const testingCoveredGutterBackground = registerColor("testing.coveredGutterBackground", {
  dark: transparent(diffInserted, 0.6),
  light: transparent(diffInserted, 0.6),
  hcDark: chartsGreen,
  hcLight: chartsGreen
}, localize("testing.coveredGutterBackground", "Gutter color of regions where code was covered."));
const testingUncoveredBranchBackground = registerColor("testing.uncoveredBranchBackground", {
  dark: opaque(transparent(diffRemoved, 2), editorBackground),
  light: opaque(transparent(diffRemoved, 2), editorBackground),
  hcDark: null,
  hcLight: null
}, localize("testing.uncoveredBranchBackground", "Background of the widget shown for an uncovered branch."));
const testingUncoveredBackground = registerColor("testing.uncoveredBackground", {
  dark: diffRemoved,
  light: diffRemoved,
  hcDark: null,
  hcLight: null
}, localize("testing.uncoveredBackground", "Background color of text that was not covered."));
const testingUncoveredBorder = registerColor("testing.uncoveredBorder", {
  dark: transparent(testingUncoveredBackground, 0.75),
  light: transparent(testingUncoveredBackground, 0.75),
  hcDark: contrastBorder,
  hcLight: contrastBorder
}, localize("testing.uncoveredBorder", "Border color of text that was not covered."));
const testingUncoveredGutterBackground = registerColor("testing.uncoveredGutterBackground", {
  dark: transparent(diffRemoved, 1.5),
  light: transparent(diffRemoved, 1.5),
  hcDark: chartsRed,
  hcLight: chartsRed
}, localize("testing.uncoveredGutterBackground", "Gutter color of regions where code not covered."));
const testingCoverCountBadgeBackground = registerColor("testing.coverCountBadgeBackground", badgeBackground, localize("testing.coverCountBadgeBackground", "Background for the badge indicating execution count"));
const testingCoverCountBadgeForeground = registerColor("testing.coverCountBadgeForeground", badgeForeground, localize("testing.coverCountBadgeForeground", "Foreground for the badge indicating execution count"));
registerColor(
  "testing.message.error.decorationForeground",
  { dark: editorErrorForeground, light: editorErrorForeground, hcDark: editorForeground, hcLight: editorForeground },
  localize("testing.message.error.decorationForeground", "Text color of test error messages shown inline in the editor.")
);
registerColor(
  "testing.message.error.lineBackground",
  { dark: new Color(new RGBA(255, 0, 0, 0.1)), light: new Color(new RGBA(255, 0, 0, 0.1)), hcDark: null, hcLight: null },
  localize("testing.message.error.marginBackground", "Margin color beside error messages shown inline in the editor.")
);
registerColor(
  "testing.message.info.decorationForeground",
  transparent(editorForeground, 0.5),
  localize("testing.message.info.decorationForeground", "Text color of test info messages shown inline in the editor.")
);
registerColor(
  "testing.message.info.lineBackground",
  null,
  localize("testing.message.info.marginBackground", "Margin color beside info messages shown inline in the editor.")
);
const testStatesToIconColors = {
  [TestResultState.Errored]: testingColorIconErrored,
  [TestResultState.Failed]: testingColorIconFailed,
  [TestResultState.Passed]: testingColorIconPassed,
  [TestResultState.Queued]: testingColorIconQueued,
  [TestResultState.Unset]: testingColorIconUnset,
  [TestResultState.Skipped]: testingColorIconSkipped
};
const testingRetiredColorIconErrored = registerColor("testing.iconErrored.retired", transparent(testingColorIconErrored, 0.7), localize("testing.iconErrored.retired", "Retired color for the 'Errored' icon in the test explorer."));
const testingRetiredColorIconFailed = registerColor("testing.iconFailed.retired", transparent(testingColorIconFailed, 0.7), localize("testing.iconFailed.retired", "Retired color for the 'failed' icon in the test explorer."));
const testingRetiredColorIconPassed = registerColor("testing.iconPassed.retired", transparent(testingColorIconPassed, 0.7), localize("testing.iconPassed.retired", "Retired color for the 'passed' icon in the test explorer."));
const testingRetiredColorIconQueued = registerColor("testing.iconQueued.retired", transparent(testingColorIconQueued, 0.7), localize("testing.iconQueued.retired", "Retired color for the 'Queued' icon in the test explorer."));
const testingRetiredColorIconUnset = registerColor("testing.iconUnset.retired", transparent(testingColorIconUnset, 0.7), localize("testing.iconUnset.retired", "Retired color for the 'Unset' icon in the test explorer."));
const testingRetiredColorIconSkipped = registerColor("testing.iconSkipped.retired", transparent(testingColorIconSkipped, 0.7), localize("testing.iconSkipped.retired", "Retired color for the 'Skipped' icon in the test explorer."));
const testStatesToRetiredIconColors = {
  [TestResultState.Errored]: testingRetiredColorIconErrored,
  [TestResultState.Failed]: testingRetiredColorIconFailed,
  [TestResultState.Passed]: testingRetiredColorIconPassed,
  [TestResultState.Queued]: testingRetiredColorIconQueued,
  [TestResultState.Unset]: testingRetiredColorIconUnset,
  [TestResultState.Skipped]: testingRetiredColorIconSkipped
};
registerThemingParticipant((theme, collector) => {
  const editorBg = theme.getColor(editorBackground);
  const missBadgeBackground = editorBg && theme.getColor(testingUncoveredBackground)?.transparent(2).makeOpaque(editorBg);
  collector.addRule(`
	.coverage-deco-inline.coverage-deco-hit.coverage-deco-hovered {
		background: ${theme.getColor(testingCoveredBackground)?.transparent(1.3)};
		outline-color: ${theme.getColor(testingCoveredBorder)?.transparent(2)};
	}
	.coverage-deco-inline.coverage-deco-miss.coverage-deco-hovered {
		background: ${theme.getColor(testingUncoveredBackground)?.transparent(1.3)};
		outline-color: ${theme.getColor(testingUncoveredBorder)?.transparent(2)};
	}
	.coverage-deco-branch-miss-indicator::before {
		border-color: ${missBadgeBackground?.transparent(1.3)};
		background-color: ${missBadgeBackground};
	}
	`);
});
export {
  testStatesToIconColors,
  testStatesToRetiredIconColors,
  testingColorIconErrored,
  testingColorIconFailed,
  testingColorIconPassed,
  testingColorIconQueued,
  testingColorIconSkipped,
  testingColorIconUnset,
  testingColorRunAction,
  testingCoverCountBadgeBackground,
  testingCoverCountBadgeForeground,
  testingCoveredBackground,
  testingCoveredBorder,
  testingCoveredGutterBackground,
  testingMessagePeekBorder,
  testingPeekBorder,
  testingPeekHeaderBackground,
  testingPeekMessageHeaderBackground,
  testingRetiredColorIconErrored,
  testingRetiredColorIconFailed,
  testingRetiredColorIconPassed,
  testingRetiredColorIconQueued,
  testingRetiredColorIconSkipped,
  testingRetiredColorIconUnset,
  testingUncoveredBackground,
  testingUncoveredBorder,
  testingUncoveredBranchBackground,
  testingUncoveredGutterBackground
};
//# sourceMappingURL=theme.js.map
