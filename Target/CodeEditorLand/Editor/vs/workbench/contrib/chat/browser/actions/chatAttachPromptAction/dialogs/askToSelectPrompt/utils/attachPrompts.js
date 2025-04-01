var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import {
  assertDefined,
  WithUriValue
} from "../../../../../../../../../base/common/types.js";
import {
  IKeyMods,
  IQuickPickItem
} from "../../../../../../../../../platform/quickinput/common/quickInput.js";
import {
  IChatWidget,
  showChatView,
  showEditsView
} from "../../../../../chat.js";
import {
  ACTION_ID_NEW_CHAT,
  ACTION_ID_NEW_EDIT_SESSION
} from "../../../../chatClearActions.js";
import { IChatAttachPromptActionOptions } from "../../../chatAttachPromptAction.js";
import { ISelectPromptOptions } from "../askToSelectPrompt.js";
const attachPrompts = /* @__PURE__ */ __name(async (files, options, keyMods) => {
  const widget = await getChatWidgetObject(options, keyMods);
  for (const file of files) {
    widget.attachmentModel.promptInstructions.add(file.value);
  }
  return widget;
}, "attachPrompts");
const getChatWidgetObject = /* @__PURE__ */ __name(async (options, keyMods) => {
  const { widget } = options;
  const { alt, ctrlCmd } = keyMods;
  if (ctrlCmd) {
    return await openNewChat(options, alt);
  }
  if (!widget) {
    return await showExistingChat(options, alt);
  }
  return widget;
}, "getChatWidgetObject");
const openNewChat = /* @__PURE__ */ __name(async (options, edits) => {
  const { commandService, chatService, viewsService } = options;
  if (chatService.unifiedViewEnabled === true) {
    await commandService.executeCommand(ACTION_ID_NEW_CHAT);
    const widget2 = await showChatView(viewsService);
    assertDefined(widget2, "Chat widget must be defined.");
    return widget2;
  }
  edits === true ? await commandService.executeCommand(ACTION_ID_NEW_EDIT_SESSION) : await commandService.executeCommand(ACTION_ID_NEW_CHAT);
  const widget = edits === true ? await showEditsView(viewsService) : await showChatView(viewsService);
  assertDefined(widget, "Chat widget must be defined.");
  return widget;
}, "openNewChat");
const showExistingChat = /* @__PURE__ */ __name(async (options, edits) => {
  const { chatService, viewsService } = options;
  const widget = edits && chatService.unifiedViewEnabled === false ? await showEditsView(viewsService) : await showChatView(viewsService);
  assertDefined(widget, "Revealed chat widget must be defined.");
  return widget;
}, "showExistingChat");
export {
  attachPrompts
};
//# sourceMappingURL=attachPrompts.js.map
