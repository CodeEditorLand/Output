var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
import { toAction } from "../../../../../base/common/actions.js";
import { coalesce } from "../../../../../base/common/arrays.js";
import { Codicon } from "../../../../../base/common/codicons.js";
import { fromNowByDay } from "../../../../../base/common/date.js";
import { KeyCode, KeyMod } from "../../../../../base/common/keyCodes.js";
import { DisposableStore } from "../../../../../base/common/lifecycle.js";
import { ThemeIcon } from "../../../../../base/common/themables.js";
import { ICodeEditor } from "../../../../../editor/browser/editorBrowser.js";
import { EditorAction2, ServicesAccessor } from "../../../../../editor/browser/editorExtensions.js";
import { Position } from "../../../../../editor/common/core/position.js";
import { SuggestController } from "../../../../../editor/contrib/suggest/browser/suggestController.js";
import { localize, localize2 } from "../../../../../nls.js";
import { IActionViewItemService } from "../../../../../platform/actions/browser/actionViewItemService.js";
import { DropdownWithPrimaryActionViewItem } from "../../../../../platform/actions/browser/dropdownWithPrimaryActionViewItem.js";
import { Action2, MenuId, MenuItemAction, MenuRegistry, registerAction2, SubmenuItemAction } from "../../../../../platform/actions/common/actions.js";
import { ContextKeyExpr } from "../../../../../platform/contextkey/common/contextkey.js";
import { IsLinuxContext, IsWindowsContext } from "../../../../../platform/contextkey/common/contextkeys.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { KeybindingWeight } from "../../../../../platform/keybinding/common/keybindingsRegistry.js";
import { IQuickInputButton, IQuickInputService, IQuickPickItem, IQuickPickSeparator } from "../../../../../platform/quickinput/common/quickInput.js";
import { ToggleTitleBarConfigAction } from "../../../../browser/parts/titlebar/titlebarActions.js";
import { IWorkbenchContribution } from "../../../../common/contributions.js";
import { IEditorGroupsService } from "../../../../services/editor/common/editorGroupsService.js";
import { ACTIVE_GROUP, IEditorService } from "../../../../services/editor/common/editorService.js";
import { IViewsService } from "../../../../services/views/common/viewsService.js";
import { ChatAgentLocation, IChatAgentService } from "../../common/chatAgents.js";
import { CONTEXT_CHAT_ENABLED, CONTEXT_CHAT_INPUT_CURSOR_AT_TOP, CONTEXT_CHAT_LOCATION, CONTEXT_IN_CHAT_INPUT, CONTEXT_IN_CHAT_SESSION, CONTEXT_IN_QUICK_CHAT } from "../../common/chatContextKeys.js";
import { extractAgentAndCommand } from "../../common/chatParserTypes.js";
import { IChatDetail, IChatService } from "../../common/chatService.js";
import { IChatRequestViewModel, IChatResponseViewModel, isRequestVM } from "../../common/chatViewModel.js";
import { IChatWidgetHistoryService } from "../../common/chatWidgetHistoryService.js";
import { CHAT_VIEW_ID, IChatWidget, IChatWidgetService, showChatView } from "../chat.js";
import { IChatEditorOptions } from "../chatEditor.js";
import { ChatEditorInput } from "../chatEditorInput.js";
import { ChatViewPane } from "../chatViewPane.js";
import { convertBufferToScreenshotVariable } from "../contrib/screenshot.js";
import { clearChatEditor } from "./chatClear.js";
import { IHostService } from "../../../../services/host/browser/host.js";
const CHAT_CATEGORY = localize2("chat.category", "Chat");
const CHAT_OPEN_ACTION_ID = "workbench.action.chat.open";
class OpenChatGlobalAction extends Action2 {
  static {
    __name(this, "OpenChatGlobalAction");
  }
  static TITLE = localize2("openChat", "Open Chat");
  constructor() {
    super({
      id: CHAT_OPEN_ACTION_ID,
      title: OpenChatGlobalAction.TITLE,
      icon: Codicon.commentDiscussion,
      f1: true,
      category: CHAT_CATEGORY,
      keybinding: {
        weight: KeybindingWeight.WorkbenchContrib,
        primary: KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.KeyI,
        mac: {
          primary: KeyMod.CtrlCmd | KeyMod.WinCtrl | KeyCode.KeyI
        }
      },
      menu: {
        id: MenuId.ChatCommandCenter,
        group: "a_chat",
        order: 1
      }
    });
  }
  async run(accessor, opts) {
    opts = typeof opts === "string" ? { query: opts } : opts;
    const chatService = accessor.get(IChatService);
    const viewsService = accessor.get(IViewsService);
    const hostService = accessor.get(IHostService);
    const chatWidget = await showChatView(viewsService);
    if (!chatWidget) {
      return;
    }
    if (opts?.previousRequests?.length && chatWidget.viewModel) {
      for (const { request, response } of opts.previousRequests) {
        chatService.addCompleteRequest(chatWidget.viewModel.sessionId, request, void 0, 0, { message: response });
      }
    }
    if (opts?.attachScreenshot) {
      const screenshot = await hostService.getScreenshot();
      if (screenshot) {
        chatWidget.attachmentModel.addContext(convertBufferToScreenshotVariable(screenshot));
      }
    }
    if (opts?.query) {
      if (opts.isPartialQuery) {
        chatWidget.setInput(opts.query);
      } else {
        chatWidget.acceptInput(opts.query);
      }
    }
    chatWidget.focusInput();
  }
}
class ChatHistoryAction extends Action2 {
  static {
    __name(this, "ChatHistoryAction");
  }
  constructor() {
    super({
      id: `workbench.action.chat.history`,
      title: localize2("chat.history.label", "Show Chats..."),
      menu: {
        id: MenuId.ViewTitle,
        when: ContextKeyExpr.equals("view", CHAT_VIEW_ID),
        group: "navigation",
        order: 2
      },
      category: CHAT_CATEGORY,
      icon: Codicon.history,
      f1: true,
      precondition: CONTEXT_CHAT_ENABLED
    });
  }
  async run(accessor) {
    const chatService = accessor.get(IChatService);
    const quickInputService = accessor.get(IQuickInputService);
    const viewsService = accessor.get(IViewsService);
    const editorService = accessor.get(IEditorService);
    const showPicker = /* @__PURE__ */ __name(() => {
      const openInEditorButton = {
        iconClass: ThemeIcon.asClassName(Codicon.file),
        tooltip: localize("interactiveSession.history.editor", "Open in Editor")
      };
      const deleteButton = {
        iconClass: ThemeIcon.asClassName(Codicon.x),
        tooltip: localize("interactiveSession.history.delete", "Delete")
      };
      const renameButton = {
        iconClass: ThemeIcon.asClassName(Codicon.pencil),
        tooltip: localize("chat.history.rename", "Rename")
      };
      const getPicks = /* @__PURE__ */ __name(() => {
        const items = chatService.getHistory();
        items.sort((a, b) => (b.lastMessageDate ?? 0) - (a.lastMessageDate ?? 0));
        let lastDate = void 0;
        const picks2 = items.flatMap((i) => {
          const timeAgoStr = fromNowByDay(i.lastMessageDate, true, true);
          const separator = timeAgoStr !== lastDate ? {
            type: "separator",
            label: timeAgoStr
          } : void 0;
          lastDate = timeAgoStr;
          return [
            separator,
            {
              label: i.title,
              description: i.isActive ? `(${localize("currentChatLabel", "current")})` : "",
              chat: i,
              buttons: i.isActive ? [renameButton] : [
                renameButton,
                openInEditorButton,
                deleteButton
              ]
            }
          ];
        });
        return coalesce(picks2);
      }, "getPicks");
      const store = new DisposableStore();
      const picker = store.add(quickInputService.createQuickPick({ useSeparators: true }));
      picker.placeholder = localize("interactiveSession.history.pick", "Switch to chat");
      const picks = getPicks();
      picker.items = picks;
      store.add(picker.onDidTriggerItemButton(async (context) => {
        if (context.button === openInEditorButton) {
          const options = { target: { sessionId: context.item.chat.sessionId }, pinned: true };
          editorService.openEditor({ resource: ChatEditorInput.getNewEditorUri(), options }, ACTIVE_GROUP);
          picker.hide();
        } else if (context.button === deleteButton) {
          chatService.removeHistoryEntry(context.item.chat.sessionId);
          picker.items = getPicks();
        } else if (context.button === renameButton) {
          const title = await quickInputService.input({ title: localize("newChatTitle", "New chat title"), value: context.item.chat.title });
          if (title) {
            chatService.setChatSessionTitle(context.item.chat.sessionId, title);
          }
          showPicker();
        }
      }));
      store.add(picker.onDidAccept(async () => {
        try {
          const item = picker.selectedItems[0];
          const sessionId = item.chat.sessionId;
          const view = await viewsService.openView(CHAT_VIEW_ID);
          view.loadSession(sessionId);
        } finally {
          picker.hide();
        }
      }));
      store.add(picker.onDidHide(() => store.dispose()));
      picker.show();
    }, "showPicker");
    showPicker();
  }
}
class OpenChatEditorAction extends Action2 {
  static {
    __name(this, "OpenChatEditorAction");
  }
  constructor() {
    super({
      id: `workbench.action.openChat`,
      title: localize2("interactiveSession.open", "Open Editor"),
      f1: true,
      category: CHAT_CATEGORY,
      precondition: CONTEXT_CHAT_ENABLED
    });
  }
  async run(accessor) {
    const editorService = accessor.get(IEditorService);
    await editorService.openEditor({ resource: ChatEditorInput.getNewEditorUri(), options: { pinned: true } });
  }
}
class ChatAddAction extends Action2 {
  static {
    __name(this, "ChatAddAction");
  }
  constructor() {
    super({
      id: "workbench.action.chat.addParticipant",
      title: localize2("chatWith", "Chat with Extension"),
      icon: Codicon.mention,
      f1: false,
      category: CHAT_CATEGORY,
      menu: {
        id: MenuId.ChatInput,
        when: CONTEXT_CHAT_LOCATION.isEqualTo(ChatAgentLocation.Panel),
        group: "navigation",
        order: 1
      }
    });
  }
  async run(accessor, ...args) {
    const widgetService = accessor.get(IChatWidgetService);
    const context = args[0];
    const widget = context?.widget ?? widgetService.lastFocusedWidget;
    if (!widget) {
      return;
    }
    const hasAgentOrCommand = extractAgentAndCommand(widget.parsedInput);
    if (hasAgentOrCommand?.agentPart || hasAgentOrCommand?.commandPart) {
      return;
    }
    const suggestCtrl = SuggestController.get(widget.inputEditor);
    if (suggestCtrl) {
      const curText = widget.inputEditor.getValue();
      const newValue = curText ? `@ ${curText}` : "@";
      if (!curText.startsWith("@")) {
        widget.inputEditor.setValue(newValue);
      }
      widget.inputEditor.setPosition(new Position(1, 2));
      suggestCtrl.triggerSuggest(void 0, true);
    }
  }
}
function registerChatActions() {
  registerAction2(OpenChatGlobalAction);
  registerAction2(ChatHistoryAction);
  registerAction2(OpenChatEditorAction);
  registerAction2(ChatAddAction);
  registerAction2(class ClearChatInputHistoryAction extends Action2 {
    static {
      __name(this, "ClearChatInputHistoryAction");
    }
    constructor() {
      super({
        id: "workbench.action.chat.clearInputHistory",
        title: localize2("interactiveSession.clearHistory.label", "Clear Input History"),
        precondition: CONTEXT_CHAT_ENABLED,
        category: CHAT_CATEGORY,
        f1: true
      });
    }
    async run(accessor, ...args) {
      const historyService = accessor.get(IChatWidgetHistoryService);
      historyService.clearHistory();
    }
  });
  registerAction2(class ClearChatHistoryAction extends Action2 {
    static {
      __name(this, "ClearChatHistoryAction");
    }
    constructor() {
      super({
        id: "workbench.action.chat.clearHistory",
        title: localize2("chat.clear.label", "Clear All Workspace Chats"),
        precondition: CONTEXT_CHAT_ENABLED,
        category: CHAT_CATEGORY,
        f1: true
      });
    }
    async run(accessor, ...args) {
      const editorGroupsService = accessor.get(IEditorGroupsService);
      const viewsService = accessor.get(IViewsService);
      const chatService = accessor.get(IChatService);
      chatService.clearAllHistoryEntries();
      const chatView = viewsService.getViewWithId(CHAT_VIEW_ID);
      if (chatView) {
        chatView.widget.clear();
      }
      editorGroupsService.groups.forEach((group) => {
        group.editors.forEach((editor) => {
          if (editor instanceof ChatEditorInput) {
            clearChatEditor(accessor, editor);
          }
        });
      });
    }
  });
  registerAction2(class FocusChatAction extends EditorAction2 {
    static {
      __name(this, "FocusChatAction");
    }
    constructor() {
      super({
        id: "chat.action.focus",
        title: localize2("actions.interactiveSession.focus", "Focus Chat List"),
        precondition: ContextKeyExpr.and(CONTEXT_IN_CHAT_INPUT),
        category: CHAT_CATEGORY,
        keybinding: [
          // On mac, require that the cursor is at the top of the input, to avoid stealing cmd+up to move the cursor to the top
          {
            when: ContextKeyExpr.and(CONTEXT_CHAT_INPUT_CURSOR_AT_TOP, CONTEXT_IN_QUICK_CHAT.negate()),
            primary: KeyMod.CtrlCmd | KeyCode.UpArrow,
            weight: KeybindingWeight.EditorContrib
          },
          // On win/linux, ctrl+up can always focus the chat list
          {
            when: ContextKeyExpr.and(ContextKeyExpr.or(IsWindowsContext, IsLinuxContext), CONTEXT_IN_QUICK_CHAT.negate()),
            primary: KeyMod.CtrlCmd | KeyCode.UpArrow,
            weight: KeybindingWeight.EditorContrib
          },
          {
            when: ContextKeyExpr.and(CONTEXT_IN_CHAT_SESSION, CONTEXT_IN_QUICK_CHAT),
            primary: KeyMod.CtrlCmd | KeyCode.DownArrow,
            weight: KeybindingWeight.WorkbenchContrib
          }
        ]
      });
    }
    runEditorCommand(accessor, editor) {
      const editorUri = editor.getModel()?.uri;
      if (editorUri) {
        const widgetService = accessor.get(IChatWidgetService);
        widgetService.getWidgetByInputUri(editorUri)?.focusLastMessage();
      }
    }
  });
  registerAction2(class FocusChatInputAction extends Action2 {
    static {
      __name(this, "FocusChatInputAction");
    }
    constructor() {
      super({
        id: "workbench.action.chat.focusInput",
        title: localize2("interactiveSession.focusInput.label", "Focus Chat Input"),
        f1: false,
        keybinding: [
          {
            primary: KeyMod.CtrlCmd | KeyCode.DownArrow,
            weight: KeybindingWeight.WorkbenchContrib,
            when: ContextKeyExpr.and(CONTEXT_IN_CHAT_SESSION, CONTEXT_IN_CHAT_INPUT.negate(), CONTEXT_IN_QUICK_CHAT.negate())
          },
          {
            when: ContextKeyExpr.and(CONTEXT_IN_CHAT_SESSION, CONTEXT_IN_CHAT_INPUT.negate(), CONTEXT_IN_QUICK_CHAT),
            primary: KeyMod.CtrlCmd | KeyCode.UpArrow,
            weight: KeybindingWeight.WorkbenchContrib
          }
        ]
      });
    }
    run(accessor, ...args) {
      const widgetService = accessor.get(IChatWidgetService);
      widgetService.lastFocusedWidget?.focusInput();
    }
  });
}
__name(registerChatActions, "registerChatActions");
function stringifyItem(item, includeName = true) {
  if (isRequestVM(item)) {
    return (includeName ? `${item.username}: ` : "") + item.messageText;
  } else {
    return (includeName ? `${item.username}: ` : "") + item.response.toString();
  }
}
__name(stringifyItem, "stringifyItem");
MenuRegistry.appendMenuItem(MenuId.CommandCenter, {
  submenu: MenuId.ChatCommandCenter,
  title: localize("title4", "Chat"),
  icon: Codicon.commentDiscussion,
  when: ContextKeyExpr.and(CONTEXT_CHAT_ENABLED, ContextKeyExpr.has("config.chat.commandCenter.enabled")),
  order: 10001
});
registerAction2(class ToggleChatControl extends ToggleTitleBarConfigAction {
  static {
    __name(this, "ToggleChatControl");
  }
  constructor() {
    super("chat.commandCenter.enabled", localize("toggle.chatControl", "Chat Controls"), localize("toggle.chatControlsDescription", "Toggle visibility of the Chat Controls in title bar"), 3, false, ContextKeyExpr.and(CONTEXT_CHAT_ENABLED, ContextKeyExpr.has("config.window.commandCenter")));
  }
});
let ChatCommandCenterRendering = class {
  static {
    __name(this, "ChatCommandCenterRendering");
  }
  static ID = "chat.commandCenterRendering";
  _store = new DisposableStore();
  constructor(actionViewItemService, agentService, instantiationService) {
    this._store.add(actionViewItemService.register(MenuId.CommandCenter, MenuId.ChatCommandCenter, (action, options) => {
      const agent = agentService.getDefaultAgent(ChatAgentLocation.Panel);
      if (!agent?.metadata.themeIcon) {
        return void 0;
      }
      if (!(action instanceof SubmenuItemAction)) {
        return void 0;
      }
      const dropdownAction = toAction({
        id: agent.id,
        label: localize("more", "More..."),
        run() {
        }
      });
      const primaryAction = instantiationService.createInstance(MenuItemAction, {
        id: CHAT_OPEN_ACTION_ID,
        title: OpenChatGlobalAction.TITLE,
        icon: agent.metadata.themeIcon
      }, void 0, void 0, void 0, void 0);
      return instantiationService.createInstance(
        DropdownWithPrimaryActionViewItem,
        primaryAction,
        dropdownAction,
        action.actions,
        "",
        {
          ...options,
          skipTelemetry: true
          // already handled by the workbench action bar
        }
      );
    }, agentService.onDidChangeAgents));
  }
  dispose() {
    this._store.dispose();
  }
};
ChatCommandCenterRendering = __decorateClass([
  __decorateParam(0, IActionViewItemService),
  __decorateParam(1, IChatAgentService),
  __decorateParam(2, IInstantiationService)
], ChatCommandCenterRendering);
export {
  CHAT_CATEGORY,
  CHAT_OPEN_ACTION_ID,
  ChatCommandCenterRendering,
  registerChatActions,
  stringifyItem
};
//# sourceMappingURL=chatActions.js.map
