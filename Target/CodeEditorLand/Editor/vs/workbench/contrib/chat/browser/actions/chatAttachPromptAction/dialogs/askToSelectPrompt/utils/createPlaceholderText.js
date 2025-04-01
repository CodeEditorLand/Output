var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { localize } from "../../../../../../../../../nls.js";
import { ISelectPromptOptions } from "../askToSelectPrompt.js";
import { ALT_KEY_NAME, SUPER_KEY_NAME } from "../constants.js";
const createPlaceholderText = /* @__PURE__ */ __name((options) => {
  const { widget, chatService } = options;
  let text = localize(
    "commands.prompts.use.select-dialog.placeholder",
    "Select a prompt to use"
  );
  if (widget === void 0) {
    const superModifierNote = localize(
      "commands.prompts.use.select-dialog.super-modifier-note",
      "{0}-key to use in new chat",
      SUPER_KEY_NAME
    );
    const altOptionModifierNote = localize(
      "commands.prompts.use.select-dialog.alt-modifier-note",
      " or {0}-key to use in Copilot Edits",
      ALT_KEY_NAME
    );
    const openInEditsNote = chatService.unifiedViewEnabled === true ? "" : altOptionModifierNote;
    text += localize(
      "commands.prompts.use.select-dialog.modifier-notes",
      " (hold {0}{1})",
      superModifierNote,
      openInEditsNote
    );
  }
  return text;
}, "createPlaceholderText");
export {
  createPlaceholderText
};
//# sourceMappingURL=createPlaceholderText.js.map
