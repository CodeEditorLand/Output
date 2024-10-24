var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { ServicesAccessor } from "../../../../editor/browser/editorExtensions.js";
import { ICodeEditorService } from "../../../../editor/browser/services/codeEditorService.js";
import { AccessibleViewType } from "../../../../platform/accessibility/browser/accessibleView.js";
import { IAccessibleViewImplentation } from "../../../../platform/accessibility/browser/accessibleViewRegistry.js";
import { ContextKeyExpr } from "../../../../platform/contextkey/common/contextkey.js";
import { getChatAccessibilityHelpProvider } from "../../chat/browser/actions/chatAccessibilityHelp.js";
import { CONTEXT_CHAT_INPUT_HAS_FOCUS } from "../../chat/common/chatContextKeys.js";
import { CTX_INLINE_CHAT_RESPONSE_FOCUSED } from "../common/inlineChat.js";
class InlineChatAccessibilityHelp {
  static {
    __name(this, "InlineChatAccessibilityHelp");
  }
  priority = 106;
  name = "inlineChat";
  type = AccessibleViewType.Help;
  when = ContextKeyExpr.or(CTX_INLINE_CHAT_RESPONSE_FOCUSED, CONTEXT_CHAT_INPUT_HAS_FOCUS);
  getProvider(accessor) {
    const codeEditor = accessor.get(ICodeEditorService).getActiveCodeEditor() || accessor.get(ICodeEditorService).getFocusedCodeEditor();
    if (!codeEditor) {
      return;
    }
    return getChatAccessibilityHelpProvider(accessor, codeEditor, "inlineChat");
  }
}
export {
  InlineChatAccessibilityHelp
};
//# sourceMappingURL=inlineChatAccessibilityHelp.js.map
