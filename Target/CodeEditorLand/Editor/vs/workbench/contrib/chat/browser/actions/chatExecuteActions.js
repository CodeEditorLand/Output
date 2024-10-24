var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Codicon } from "../../../../../base/common/codicons.js";
import { KeyCode, KeyMod } from "../../../../../base/common/keyCodes.js";
import { URI } from "../../../../../base/common/uri.js";
import { ServicesAccessor } from "../../../../../editor/browser/editorExtensions.js";
import { localize, localize2 } from "../../../../../nls.js";
import { Action2, MenuId, MenuRegistry, registerAction2 } from "../../../../../platform/actions/common/actions.js";
import { ContextKeyExpr } from "../../../../../platform/contextkey/common/contextkey.js";
import { IDialogService } from "../../../../../platform/dialogs/common/dialogs.js";
import { KeybindingWeight } from "../../../../../platform/keybinding/common/keybindingsRegistry.js";
import { IViewsService } from "../../../../services/views/common/viewsService.js";
import { ChatAgentLocation, IChatAgentService } from "../../common/chatAgents.js";
import { CONTEXT_CHAT_EDITING_PARTICIPANT_REGISTERED, CONTEXT_CHAT_ENABLED, CONTEXT_CHAT_HAS_FILE_ATTACHMENTS, CONTEXT_CHAT_INPUT_HAS_AGENT, CONTEXT_CHAT_INPUT_HAS_TEXT, CONTEXT_CHAT_LOCATION, CONTEXT_CHAT_REQUEST_IN_PROGRESS, CONTEXT_IN_CHAT_INPUT, CONTEXT_LANGUAGE_MODELS_ARE_USER_SELECTABLE } from "../../common/chatContextKeys.js";
import { applyingChatEditsContextKey, IChatEditingService } from "../../common/chatEditingService.js";
import { chatAgentLeader, extractAgentAndCommand } from "../../common/chatParserTypes.js";
import { IChatService } from "../../common/chatService.js";
import { EDITS_VIEW_ID, IChatWidget, IChatWidgetService } from "../chat.js";
import { ChatViewPane } from "../chatViewPane.js";
import { CHAT_CATEGORY } from "./chatActions.js";
class SubmitAction extends Action2 {
  static {
    __name(this, "SubmitAction");
  }
  static ID = "workbench.action.chat.submit";
  constructor() {
    super({
      id: SubmitAction.ID,
      title: localize2("interactive.submit.label", "Send"),
      f1: false,
      category: CHAT_CATEGORY,
      icon: Codicon.send,
      precondition: ContextKeyExpr.and(CONTEXT_CHAT_INPUT_HAS_TEXT, CONTEXT_CHAT_REQUEST_IN_PROGRESS.negate(), ContextKeyExpr.or(CONTEXT_CHAT_LOCATION.notEqualsTo(ChatAgentLocation.EditingSession), ContextKeyExpr.and(CONTEXT_CHAT_LOCATION.isEqualTo(ChatAgentLocation.EditingSession), applyingChatEditsContextKey.toNegated()))),
      keybinding: {
        when: CONTEXT_IN_CHAT_INPUT,
        primary: KeyCode.Enter,
        weight: KeybindingWeight.EditorContrib
      },
      menu: [
        {
          id: MenuId.ChatExecuteSecondary,
          group: "group_1"
        },
        {
          id: MenuId.ChatExecute,
          order: 4,
          when: ContextKeyExpr.and(CONTEXT_CHAT_REQUEST_IN_PROGRESS.negate(), ContextKeyExpr.or(CONTEXT_CHAT_LOCATION.notEqualsTo(ChatAgentLocation.EditingSession), ContextKeyExpr.and(CONTEXT_CHAT_LOCATION.isEqualTo(ChatAgentLocation.EditingSession), applyingChatEditsContextKey.toNegated()))),
          group: "navigation"
        }
      ]
    });
  }
  run(accessor, ...args) {
    const context = args[0];
    const widgetService = accessor.get(IChatWidgetService);
    const widget = context?.widget ?? widgetService.lastFocusedWidget;
    widget?.acceptInput(context?.inputValue);
  }
}
const ChatModelPickerActionId = "workbench.action.chat.pickModel";
MenuRegistry.appendMenuItem(MenuId.ChatExecute, {
  command: {
    id: ChatModelPickerActionId,
    title: localize2("chat.pickModel.label", "Pick Model")
  },
  order: 3,
  group: "navigation",
  when: ContextKeyExpr.and(CONTEXT_LANGUAGE_MODELS_ARE_USER_SELECTABLE, ContextKeyExpr.or(ContextKeyExpr.equals(CONTEXT_CHAT_LOCATION.key, "panel"), ContextKeyExpr.equals(CONTEXT_CHAT_LOCATION.key, ChatAgentLocation.EditingSession)))
});
class ChatSubmitSecondaryAgentAction extends Action2 {
  static {
    __name(this, "ChatSubmitSecondaryAgentAction");
  }
  static ID = "workbench.action.chat.submitSecondaryAgent";
  constructor() {
    super({
      id: ChatSubmitSecondaryAgentAction.ID,
      title: localize2({ key: "actions.chat.submitSecondaryAgent", comment: ["Send input from the chat input box to the secondary agent"] }, "Submit to Secondary Agent"),
      precondition: ContextKeyExpr.and(CONTEXT_CHAT_INPUT_HAS_TEXT, CONTEXT_CHAT_INPUT_HAS_AGENT.negate(), CONTEXT_CHAT_REQUEST_IN_PROGRESS.negate()),
      keybinding: {
        when: CONTEXT_IN_CHAT_INPUT,
        primary: KeyMod.CtrlCmd | KeyCode.Enter,
        weight: KeybindingWeight.EditorContrib
      },
      menu: {
        id: MenuId.ChatExecuteSecondary,
        group: "group_1"
      }
    });
  }
  run(accessor, ...args) {
    const context = args[0];
    const agentService = accessor.get(IChatAgentService);
    const secondaryAgent = agentService.getSecondaryAgent();
    if (!secondaryAgent) {
      return;
    }
    const widgetService = accessor.get(IChatWidgetService);
    const widget = context?.widget ?? widgetService.lastFocusedWidget;
    if (!widget) {
      return;
    }
    if (extractAgentAndCommand(widget.parsedInput).agentPart) {
      widget.acceptInput();
    } else {
      widget.lastSelectedAgent = secondaryAgent;
      widget.acceptInputWithPrefix(`${chatAgentLeader}${secondaryAgent.name}`);
    }
  }
}
class SendToChatEditingAction extends Action2 {
  static {
    __name(this, "SendToChatEditingAction");
  }
  constructor() {
    super({
      id: "workbench.action.chat.sendToChatEditing",
      title: localize2("chat.sendToChatEditing.label", "Send to Copilot Edits"),
      precondition: ContextKeyExpr.and(CONTEXT_CHAT_REQUEST_IN_PROGRESS.negate(), CONTEXT_CHAT_INPUT_HAS_AGENT.negate(), CONTEXT_CHAT_INPUT_HAS_TEXT, CONTEXT_CHAT_HAS_FILE_ATTACHMENTS),
      category: CHAT_CATEGORY,
      f1: false,
      menu: {
        id: MenuId.ChatExecuteSecondary,
        group: "group_1",
        order: 3,
        when: ContextKeyExpr.and(CONTEXT_CHAT_ENABLED, CONTEXT_CHAT_EDITING_PARTICIPANT_REGISTERED, CONTEXT_CHAT_LOCATION.notEqualsTo(ChatAgentLocation.EditingSession))
      },
      keybinding: {
        weight: KeybindingWeight.WorkbenchContrib,
        primary: KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.Enter,
        when: ContextKeyExpr.and(CONTEXT_CHAT_ENABLED, CONTEXT_CHAT_EDITING_PARTICIPANT_REGISTERED, CONTEXT_CHAT_LOCATION.notEqualsTo(ChatAgentLocation.EditingSession))
      }
    });
  }
  async run(accessor, ...args) {
    if (!accessor.get(IChatAgentService).getDefaultAgent(ChatAgentLocation.EditingSession)) {
      return;
    }
    const context = args[0];
    const widgetService = accessor.get(IChatWidgetService);
    const widget = context?.widget ?? widgetService.lastFocusedWidget;
    if (!widget || widget.viewModel?.model.initialLocation === ChatAgentLocation.EditingSession) {
      return;
    }
    const viewsService = accessor.get(IViewsService);
    const dialogService = accessor.get(IDialogService);
    const chatEditingService = accessor.get(IChatEditingService);
    const currentEditingSession = chatEditingService.currentEditingSessionObs.get();
    const currentEditCount = currentEditingSession?.entries.get().length;
    if (currentEditCount) {
      const result = await dialogService.confirm({
        title: localize("chat.startEditing.confirmation.title", "Start new editing session?"),
        message: localize("chat.startEditing.confirmation.message", "Starting a new editing session will end your current editing session and discard edits to {0} files. Do you wish to proceed?", currentEditCount),
        type: "info",
        primaryButton: localize("chat.startEditing.confirmation.primaryButton", "Yes")
      });
      if (!result.confirmed) {
        return;
      }
      await currentEditingSession?.stop();
    }
    const { widget: editingWidget } = await viewsService.openView(EDITS_VIEW_ID);
    for (const attachment of widget.attachmentModel.attachments) {
      if (attachment.isFile && URI.isUri(attachment.value)) {
        await chatEditingService.addFileToWorkingSet(attachment.value);
      } else {
        editingWidget.attachmentModel.addContext(attachment);
      }
    }
    editingWidget.setInput(widget.getInput());
    widget.setInput("");
    widget.attachmentModel.clear();
    editingWidget.acceptInput();
    editingWidget.focusInput();
  }
}
class SendToNewChatAction extends Action2 {
  static {
    __name(this, "SendToNewChatAction");
  }
  constructor() {
    super({
      id: "workbench.action.chat.sendToNewChat",
      title: localize2("chat.newChat.label", "Send to New Chat"),
      precondition: ContextKeyExpr.and(CONTEXT_CHAT_REQUEST_IN_PROGRESS.negate(), CONTEXT_CHAT_INPUT_HAS_TEXT),
      category: CHAT_CATEGORY,
      f1: false,
      menu: {
        id: MenuId.ChatExecuteSecondary,
        group: "group_2"
      },
      keybinding: {
        weight: KeybindingWeight.WorkbenchContrib,
        primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.Enter,
        when: CONTEXT_IN_CHAT_INPUT
      }
    });
  }
  async run(accessor, ...args) {
    const context = args[0];
    const widgetService = accessor.get(IChatWidgetService);
    const widget = context?.widget ?? widgetService.lastFocusedWidget;
    if (!widget) {
      return;
    }
    widget.clear();
    widget.acceptInput(context?.inputValue);
  }
}
class CancelAction extends Action2 {
  static {
    __name(this, "CancelAction");
  }
  static ID = "workbench.action.chat.cancel";
  constructor() {
    super({
      id: CancelAction.ID,
      title: localize2("interactive.cancel.label", "Cancel"),
      f1: false,
      category: CHAT_CATEGORY,
      icon: Codicon.stopCircle,
      menu: {
        id: MenuId.ChatExecute,
        when: ContextKeyExpr.or(CONTEXT_CHAT_REQUEST_IN_PROGRESS, ContextKeyExpr.and(CONTEXT_CHAT_LOCATION.isEqualTo(ChatAgentLocation.EditingSession), applyingChatEditsContextKey)),
        order: 4,
        group: "navigation"
      },
      keybinding: {
        weight: KeybindingWeight.WorkbenchContrib,
        primary: KeyMod.CtrlCmd | KeyCode.Escape,
        win: { primary: KeyMod.Alt | KeyCode.Backspace }
      }
    });
  }
  run(accessor, ...args) {
    const context = args[0];
    const widgetService = accessor.get(IChatWidgetService);
    const widget = context?.widget ?? widgetService.lastFocusedWidget;
    if (!widget) {
      return;
    }
    const chatService = accessor.get(IChatService);
    if (widget.viewModel) {
      chatService.cancelCurrentRequestForSession(widget.viewModel.sessionId);
    }
    const chatEditingService = accessor.get(IChatEditingService);
    const currentEditingSession = chatEditingService.currentEditingSession;
    if (currentEditingSession && currentEditingSession?.chatSessionId === widget.viewModel?.sessionId) {
      chatEditingService.currentAutoApplyOperation?.cancel();
    }
  }
}
function registerChatExecuteActions() {
  registerAction2(SubmitAction);
  registerAction2(CancelAction);
  registerAction2(SendToNewChatAction);
  registerAction2(ChatSubmitSecondaryAgentAction);
  registerAction2(SendToChatEditingAction);
}
__name(registerChatExecuteActions, "registerChatExecuteActions");
export {
  CancelAction,
  ChatModelPickerActionId,
  ChatSubmitSecondaryAgentAction,
  SubmitAction,
  registerChatExecuteActions
};
//# sourceMappingURL=chatExecuteActions.js.map
