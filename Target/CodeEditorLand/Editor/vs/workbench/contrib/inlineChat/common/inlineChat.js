import { localize } from "../../../../nls.js";
import { MenuId } from "../../../../platform/actions/common/actions.js";
import { Extensions, IConfigurationRegistry } from "../../../../platform/configuration/common/configurationRegistry.js";
import { RawContextKey } from "../../../../platform/contextkey/common/contextkey.js";
import { Registry } from "../../../../platform/registry/common/platform.js";
import { diffInserted, diffRemoved, editorWidgetBackground, editorWidgetBorder, editorWidgetForeground, focusBorder, inputBackground, inputPlaceholderForeground, registerColor, transparent, widgetShadow } from "../../../../platform/theme/common/colorRegistry.js";
var InlineChatConfigKeys = /* @__PURE__ */ ((InlineChatConfigKeys2) => {
  InlineChatConfigKeys2["Mode"] = "inlineChat.mode";
  InlineChatConfigKeys2["FinishOnType"] = "inlineChat.finishOnType";
  InlineChatConfigKeys2["AcceptedOrDiscardBeforeSave"] = "inlineChat.acceptedOrDiscardBeforeSave";
  InlineChatConfigKeys2["StartWithOverlayWidget"] = "inlineChat.startWithOverlayWidget";
  InlineChatConfigKeys2["ZoneToolbar"] = "inlineChat.experimental.enableZoneToolbar";
  InlineChatConfigKeys2["HoldToSpeech"] = "inlineChat.holdToSpeech";
  InlineChatConfigKeys2["AccessibleDiffView"] = "inlineChat.accessibleDiffView";
  return InlineChatConfigKeys2;
})(InlineChatConfigKeys || {});
var EditMode = /* @__PURE__ */ ((EditMode2) => {
  EditMode2["Live"] = "live";
  EditMode2["Preview"] = "preview";
  return EditMode2;
})(EditMode || {});
Registry.as(Extensions.Configuration).registerConfiguration({
  id: "editor",
  properties: {
    ["inlineChat.mode" /* Mode */]: {
      description: localize("mode", "Configure if changes crafted with inline chat are applied directly to the document or are previewed first."),
      default: "live" /* Live */,
      type: "string",
      enum: ["live" /* Live */, "preview" /* Preview */],
      markdownEnumDescriptions: [
        localize("mode.live", "Changes are applied directly to the document, can be highlighted via inline diffs, and accepted/discarded by hunks. Ending a session will keep the changes."),
        localize("mode.preview", "Changes are previewed only and need to be accepted via the apply button. Ending a session will discard the changes.")
      ],
      tags: ["experimental"]
    },
    ["inlineChat.finishOnType" /* FinishOnType */]: {
      description: localize("finishOnType", "Whether to finish an inline chat session when typing outside of changed regions."),
      default: false,
      type: "boolean"
    },
    ["inlineChat.holdToSpeech" /* HoldToSpeech */]: {
      description: localize("holdToSpeech", "Whether holding the inline chat keybinding will automatically enable speech recognition."),
      default: true,
      type: "boolean"
    },
    ["inlineChat.accessibleDiffView" /* AccessibleDiffView */]: {
      description: localize("accessibleDiffView", "Whether the inline chat also renders an accessible diff viewer for its changes."),
      default: "auto",
      type: "string",
      enum: ["auto", "on", "off"],
      markdownEnumDescriptions: [
        localize("accessibleDiffView.auto", "The accessible diff viewer is based on screen reader mode being enabled."),
        localize("accessibleDiffView.on", "The accessible diff viewer is always enabled."),
        localize("accessibleDiffView.off", "The accessible diff viewer is never enabled.")
      ]
    },
    ["inlineChat.experimental.enableZoneToolbar" /* ZoneToolbar */]: {
      description: localize("zoneToolbar", "Whether to show a toolbar to accept or reject changes in the inline chat changes view."),
      default: false,
      type: "boolean",
      tags: ["experimental"]
    }
  }
});
const INLINE_CHAT_ID = "interactiveEditor";
const INTERACTIVE_EDITOR_ACCESSIBILITY_HELP_ID = "interactiveEditorAccessiblityHelp";
var InlineChatResponseType = /* @__PURE__ */ ((InlineChatResponseType2) => {
  InlineChatResponseType2["None"] = "none";
  InlineChatResponseType2["Messages"] = "messages";
  InlineChatResponseType2["MessagesAndEdits"] = "messagesAndEdits";
  return InlineChatResponseType2;
})(InlineChatResponseType || {});
const CTX_INLINE_CHAT_POSSIBLE = new RawContextKey("inlineChatPossible", false, localize("inlineChatHasPossible", "Whether a provider for inline chat exists and whether an editor for inline chat is open"));
const CTX_INLINE_CHAT_HAS_AGENT = new RawContextKey("inlineChatHasProvider", false, localize("inlineChatHasProvider", "Whether a provider for interactive editors exists"));
const CTX_INLINE_CHAT_VISIBLE = new RawContextKey("inlineChatVisible", false, localize("inlineChatVisible", "Whether the interactive editor input is visible"));
const CTX_INLINE_CHAT_FOCUSED = new RawContextKey("inlineChatFocused", false, localize("inlineChatFocused", "Whether the interactive editor input is focused"));
const CTX_INLINE_CHAT_EDITING = new RawContextKey("inlineChatEditing", true, localize("inlineChatEditing", "Whether the user is currently editing or generating code in the inline chat"));
const CTX_INLINE_CHAT_RESPONSE_FOCUSED = new RawContextKey("inlineChatResponseFocused", false, localize("inlineChatResponseFocused", "Whether the interactive widget's response is focused"));
const CTX_INLINE_CHAT_EMPTY = new RawContextKey("inlineChatEmpty", false, localize("inlineChatEmpty", "Whether the interactive editor input is empty"));
const CTX_INLINE_CHAT_INNER_CURSOR_FIRST = new RawContextKey("inlineChatInnerCursorFirst", false, localize("inlineChatInnerCursorFirst", "Whether the cursor of the iteractive editor input is on the first line"));
const CTX_INLINE_CHAT_INNER_CURSOR_LAST = new RawContextKey("inlineChatInnerCursorLast", false, localize("inlineChatInnerCursorLast", "Whether the cursor of the iteractive editor input is on the last line"));
const CTX_INLINE_CHAT_INNER_CURSOR_START = new RawContextKey("inlineChatInnerCursorStart", false, localize("inlineChatInnerCursorStart", "Whether the cursor of the iteractive editor input is on the start of the input"));
const CTX_INLINE_CHAT_INNER_CURSOR_END = new RawContextKey("inlineChatInnerCursorEnd", false, localize("inlineChatInnerCursorEnd", "Whether the cursor of the iteractive editor input is on the end of the input"));
const CTX_INLINE_CHAT_OUTER_CURSOR_POSITION = new RawContextKey("inlineChatOuterCursorPosition", "", localize("inlineChatOuterCursorPosition", "Whether the cursor of the outer editor is above or below the interactive editor input"));
const CTX_INLINE_CHAT_HAS_STASHED_SESSION = new RawContextKey("inlineChatHasStashedSession", false, localize("inlineChatHasStashedSession", "Whether interactive editor has kept a session for quick restore"));
const CTX_INLINE_CHAT_USER_DID_EDIT = new RawContextKey("inlineChatUserDidEdit", void 0, localize("inlineChatUserDidEdit", "Whether the user did changes ontop of the inline chat"));
const CTX_INLINE_CHAT_DOCUMENT_CHANGED = new RawContextKey("inlineChatDocumentChanged", false, localize("inlineChatDocumentChanged", "Whether the document has changed concurrently"));
const CTX_INLINE_CHAT_CHANGE_HAS_DIFF = new RawContextKey("inlineChatChangeHasDiff", false, localize("inlineChatChangeHasDiff", "Whether the current change supports showing a diff"));
const CTX_INLINE_CHAT_CHANGE_SHOWS_DIFF = new RawContextKey("inlineChatChangeShowsDiff", false, localize("inlineChatChangeShowsDiff", "Whether the current change showing a diff"));
const CTX_INLINE_CHAT_EDIT_MODE = new RawContextKey("config.inlineChat.mode", "live" /* Live */);
const CTX_INLINE_CHAT_REQUEST_IN_PROGRESS = new RawContextKey("inlineChatRequestInProgress", false, localize("inlineChatRequestInProgress", "Whether an inline chat request is currently in progress"));
const CTX_INLINE_CHAT_RESPONSE_TYPE = new RawContextKey("inlineChatResponseType", "none" /* None */, localize("inlineChatResponseTypes", "What type was the responses have been receieved, nothing yet, just messages, or messaged and local edits"));
const ACTION_ACCEPT_CHANGES = "inlineChat.acceptChanges";
const ACTION_DISCARD_CHANGES = "inlineChat.discardHunkChange";
const ACTION_REGENERATE_RESPONSE = "inlineChat.regenerate";
const ACTION_VIEW_IN_CHAT = "inlineChat.viewInChat";
const ACTION_TOGGLE_DIFF = "inlineChat.toggleDiff";
const ACTION_REPORT_ISSUE = "inlineChat.reportIssue";
const MENU_INLINE_CHAT_WIDGET_STATUS = MenuId.for("inlineChatWidget.status");
const MENU_INLINE_CHAT_WIDGET_SECONDARY = MenuId.for("inlineChatWidget.secondary");
const MENU_INLINE_CHAT_ZONE = MenuId.for("inlineChatWidget.changesZone");
const inlineChatForeground = registerColor("inlineChat.foreground", editorWidgetForeground, localize("inlineChat.foreground", "Foreground color of the interactive editor widget"));
const inlineChatBackground = registerColor("inlineChat.background", editorWidgetBackground, localize("inlineChat.background", "Background color of the interactive editor widget"));
const inlineChatBorder = registerColor("inlineChat.border", editorWidgetBorder, localize("inlineChat.border", "Border color of the interactive editor widget"));
const inlineChatShadow = registerColor("inlineChat.shadow", widgetShadow, localize("inlineChat.shadow", "Shadow color of the interactive editor widget"));
const inlineChatInputBorder = registerColor("inlineChatInput.border", editorWidgetBorder, localize("inlineChatInput.border", "Border color of the interactive editor input"));
const inlineChatInputFocusBorder = registerColor("inlineChatInput.focusBorder", focusBorder, localize("inlineChatInput.focusBorder", "Border color of the interactive editor input when focused"));
const inlineChatInputPlaceholderForeground = registerColor("inlineChatInput.placeholderForeground", inputPlaceholderForeground, localize("inlineChatInput.placeholderForeground", "Foreground color of the interactive editor input placeholder"));
const inlineChatInputBackground = registerColor("inlineChatInput.background", inputBackground, localize("inlineChatInput.background", "Background color of the interactive editor input"));
const inlineChatDiffInserted = registerColor("inlineChatDiff.inserted", transparent(diffInserted, 0.5), localize("inlineChatDiff.inserted", "Background color of inserted text in the interactive editor input"));
const overviewRulerInlineChatDiffInserted = registerColor("editorOverviewRuler.inlineChatInserted", { dark: transparent(diffInserted, 0.6), light: transparent(diffInserted, 0.8), hcDark: transparent(diffInserted, 0.6), hcLight: transparent(diffInserted, 0.8) }, localize("editorOverviewRuler.inlineChatInserted", "Overview ruler marker color for inline chat inserted content."));
const minimapInlineChatDiffInserted = registerColor("editorOverviewRuler.inlineChatInserted", { dark: transparent(diffInserted, 0.6), light: transparent(diffInserted, 0.8), hcDark: transparent(diffInserted, 0.6), hcLight: transparent(diffInserted, 0.8) }, localize("editorOverviewRuler.inlineChatInserted", "Overview ruler marker color for inline chat inserted content."));
const inlineChatDiffRemoved = registerColor("inlineChatDiff.removed", transparent(diffRemoved, 0.5), localize("inlineChatDiff.removed", "Background color of removed text in the interactive editor input"));
const overviewRulerInlineChatDiffRemoved = registerColor("editorOverviewRuler.inlineChatRemoved", { dark: transparent(diffRemoved, 0.6), light: transparent(diffRemoved, 0.8), hcDark: transparent(diffRemoved, 0.6), hcLight: transparent(diffRemoved, 0.8) }, localize("editorOverviewRuler.inlineChatRemoved", "Overview ruler marker color for inline chat removed content."));
export {
  ACTION_ACCEPT_CHANGES,
  ACTION_DISCARD_CHANGES,
  ACTION_REGENERATE_RESPONSE,
  ACTION_REPORT_ISSUE,
  ACTION_TOGGLE_DIFF,
  ACTION_VIEW_IN_CHAT,
  CTX_INLINE_CHAT_CHANGE_HAS_DIFF,
  CTX_INLINE_CHAT_CHANGE_SHOWS_DIFF,
  CTX_INLINE_CHAT_DOCUMENT_CHANGED,
  CTX_INLINE_CHAT_EDITING,
  CTX_INLINE_CHAT_EDIT_MODE,
  CTX_INLINE_CHAT_EMPTY,
  CTX_INLINE_CHAT_FOCUSED,
  CTX_INLINE_CHAT_HAS_AGENT,
  CTX_INLINE_CHAT_HAS_STASHED_SESSION,
  CTX_INLINE_CHAT_INNER_CURSOR_END,
  CTX_INLINE_CHAT_INNER_CURSOR_FIRST,
  CTX_INLINE_CHAT_INNER_CURSOR_LAST,
  CTX_INLINE_CHAT_INNER_CURSOR_START,
  CTX_INLINE_CHAT_OUTER_CURSOR_POSITION,
  CTX_INLINE_CHAT_POSSIBLE,
  CTX_INLINE_CHAT_REQUEST_IN_PROGRESS,
  CTX_INLINE_CHAT_RESPONSE_FOCUSED,
  CTX_INLINE_CHAT_RESPONSE_TYPE,
  CTX_INLINE_CHAT_USER_DID_EDIT,
  CTX_INLINE_CHAT_VISIBLE,
  EditMode,
  INLINE_CHAT_ID,
  INTERACTIVE_EDITOR_ACCESSIBILITY_HELP_ID,
  InlineChatConfigKeys,
  InlineChatResponseType,
  MENU_INLINE_CHAT_WIDGET_SECONDARY,
  MENU_INLINE_CHAT_WIDGET_STATUS,
  MENU_INLINE_CHAT_ZONE,
  inlineChatBackground,
  inlineChatBorder,
  inlineChatDiffInserted,
  inlineChatDiffRemoved,
  inlineChatForeground,
  inlineChatInputBackground,
  inlineChatInputBorder,
  inlineChatInputFocusBorder,
  inlineChatInputPlaceholderForeground,
  inlineChatShadow,
  minimapInlineChatDiffInserted,
  overviewRulerInlineChatDiffInserted,
  overviewRulerInlineChatDiffRemoved
};
//# sourceMappingURL=inlineChat.js.map
