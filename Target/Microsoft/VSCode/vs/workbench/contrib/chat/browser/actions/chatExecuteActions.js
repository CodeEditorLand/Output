var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { CancellationToken } from "../../../../../base/common/cancellation.js";
import { Codicon } from "../../../../../base/common/codicons.js";
import { MarkdownString } from "../../../../../base/common/htmlContent.js";
import { basename } from "../../../../../base/common/resources.js";
import { ThemeIcon } from "../../../../../base/common/themables.js";
import { assertType } from "../../../../../base/common/types.js";
import { EditorContextKeys } from "../../../../../editor/common/editorContextKeys.js";
import { localize, localize2 } from "../../../../../nls.js";
import { Action2, MenuId, registerAction2 } from "../../../../../platform/actions/common/actions.js";
import { ICommandService } from "../../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import { ContextKeyExpr, IContextKeyService } from "../../../../../platform/contextkey/common/contextkey.js";
import { IDialogService } from "../../../../../platform/dialogs/common/dialogs.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { ITelemetryService } from "../../../../../platform/telemetry/common/telemetry.js";
import { IRemoteCodingAgentsService } from "../../../remoteCodingAgents/common/remoteCodingAgentsService.js";
import { IChatAgentService } from "../../common/chatAgents.js";
import { ChatContextKeys } from "../../common/chatContextKeys.js";
import { toChatHistoryContent } from "../../common/chatModel.js";
import { IChatModeService } from "../../common/chatModes.js";
import { chatVariableLeader } from "../../common/chatParserTypes.js";
import { ChatRequestParser } from "../../common/chatRequestParser.js";
import { IChatService } from "../../common/chatService.js";
import { ChatAgentLocation, ChatConfiguration, ChatModeKind } from "../../common/constants.js";
import { ILanguageModelToolsService } from "../../common/languageModelToolsService.js";
import { IChatWidgetService } from "../chat.js";
import { getEditingSessionContext } from "../chatEditing/chatEditingActions.js";
import { ACTION_ID_NEW_CHAT, CHAT_CATEGORY, handleCurrentEditingSession, handleModeSwitch } from "./chatActions.js";
class SubmitAction extends Action2 {
  static {
    __name(this, "SubmitAction");
  }
  async run(accessor, ...args) {
    const context = args[0];
    const telemetryService = accessor.get(ITelemetryService);
    const widgetService = accessor.get(IChatWidgetService);
    const widget = context?.widget ?? widgetService.lastFocusedWidget;
    if (widget?.viewModel?.editing) {
      const configurationService = accessor.get(IConfigurationService);
      const dialogService = accessor.get(IDialogService);
      const chatService = accessor.get(IChatService);
      const chatModel = chatService.getSession(widget.viewModel.sessionId);
      if (!chatModel) {
        return;
      }
      const session = chatModel.editingSession;
      if (!session) {
        return;
      }
      const requestId = widget.viewModel?.editing.id;
      if (requestId) {
        const chatRequests = chatModel.getRequests();
        const itemIndex = chatRequests.findIndex((request) => request.id === requestId);
        const editsToUndo = chatRequests.length - itemIndex;
        const requestsToRemove = chatRequests.slice(itemIndex);
        const requestIdsToRemove = new Set(requestsToRemove.map((request) => request.id));
        const entriesModifiedInRequestsToRemove = session.entries.get().filter((entry) => requestIdsToRemove.has(entry.lastModifyingRequestId)) ?? [];
        const shouldPrompt = entriesModifiedInRequestsToRemove.length > 0 && configurationService.getValue("chat.editing.confirmEditRequestRemoval") === true;
        let message;
        if (editsToUndo === 1) {
          if (entriesModifiedInRequestsToRemove.length === 1) {
            message = localize("chat.removeLast.confirmation.message2", "This will remove your last request and undo the edits made to {0}. Do you want to proceed?", basename(entriesModifiedInRequestsToRemove[0].modifiedURI));
          } else {
            message = localize("chat.removeLast.confirmation.multipleEdits.message", "This will remove your last request and undo edits made to {0} files in your working set. Do you want to proceed?", entriesModifiedInRequestsToRemove.length);
          }
        } else {
          if (entriesModifiedInRequestsToRemove.length === 1) {
            message = localize("chat.remove.confirmation.message2", "This will remove all subsequent requests and undo edits made to {0}. Do you want to proceed?", basename(entriesModifiedInRequestsToRemove[0].modifiedURI));
          } else {
            message = localize("chat.remove.confirmation.multipleEdits.message", "This will remove all subsequent requests and undo edits made to {0} files in your working set. Do you want to proceed?", entriesModifiedInRequestsToRemove.length);
          }
        }
        const confirmation = shouldPrompt ? await dialogService.confirm({
          title: editsToUndo === 1 ? localize("chat.removeLast.confirmation.title", "Do you want to undo your last edit?") : localize("chat.remove.confirmation.title", "Do you want to undo {0} edits?", editsToUndo),
          message,
          primaryButton: localize("chat.remove.confirmation.primaryButton", "Yes"),
          checkbox: { label: localize("chat.remove.confirmation.checkbox", "Don't ask again"), checked: false },
          type: "info"
        }) : { confirmed: true };
        if (!confirmation.confirmed) {
          telemetryService.publicLog2("chat.undoEditsConfirmation", {
            editRequestType: configurationService.getValue("chat.editRequests"),
            outcome: "cancelled",
            editsUndoCount: editsToUndo
          });
          return;
        } else if (editsToUndo > 0) {
          telemetryService.publicLog2("chat.undoEditsConfirmation", {
            editRequestType: configurationService.getValue("chat.editRequests"),
            outcome: "applied",
            editsUndoCount: editsToUndo
          });
        }
        if (confirmation.checkboxChecked) {
          await configurationService.updateValue("chat.editing.confirmEditRequestRemoval", false);
        }
        const snapshotRequestId = chatRequests[itemIndex].id;
        await session.restoreSnapshot(snapshotRequestId, void 0);
      }
    }
    widget?.acceptInput(context?.inputValue);
  }
}
const whenNotInProgressOrPaused = ContextKeyExpr.or(ChatContextKeys.isRequestPaused, ChatContextKeys.requestInProgress.negate());
class ChatSubmitAction extends SubmitAction {
  static {
    __name(this, "ChatSubmitAction");
  }
  static {
    this.ID = "workbench.action.chat.submit";
  }
  constructor() {
    const precondition = ChatContextKeys.chatModeKind.isEqualTo(ChatModeKind.Ask);
    super({
      id: ChatSubmitAction.ID,
      title: localize2("interactive.submit.label", "Send and Dispatch"),
      f1: false,
      category: CHAT_CATEGORY,
      icon: Codicon.send,
      precondition,
      keybinding: {
        when: ChatContextKeys.inChatInput,
        primary: 3,
        weight: 100
        /* KeybindingWeight.EditorContrib */
      },
      menu: [
        {
          id: MenuId.ChatExecuteSecondary,
          group: "group_1",
          order: 1,
          when: precondition
        },
        {
          id: MenuId.ChatExecute,
          order: 4,
          when: ContextKeyExpr.and(whenNotInProgressOrPaused, precondition),
          group: "navigation"
        }
      ]
    });
  }
}
const ToggleAgentModeActionId = "workbench.action.chat.toggleAgentMode";
class ToggleChatModeAction extends Action2 {
  static {
    __name(this, "ToggleChatModeAction");
  }
  static {
    this.ID = ToggleAgentModeActionId;
  }
  constructor() {
    super({
      id: ToggleChatModeAction.ID,
      title: localize2("interactive.toggleAgent.label", "Set Chat Mode"),
      f1: true,
      category: CHAT_CATEGORY,
      precondition: ContextKeyExpr.and(ChatContextKeys.enabled, ChatContextKeys.requestInProgress.negate()),
      tooltip: localize("setChatMode", "Set Mode"),
      keybinding: {
        when: ContextKeyExpr.and(ChatContextKeys.inChatInput, ChatContextKeys.location.isEqualTo(ChatAgentLocation.Panel)),
        primary: 2048 | 89,
        weight: 100
        /* KeybindingWeight.EditorContrib */
      },
      menu: [
        {
          id: MenuId.ChatInput,
          order: 1,
          when: ContextKeyExpr.and(ChatContextKeys.enabled, ChatContextKeys.location.isEqualTo(ChatAgentLocation.Panel), ChatContextKeys.inQuickChat.negate()),
          group: "navigation"
        }
      ]
    });
  }
  async run(accessor, ...args) {
    const commandService = accessor.get(ICommandService);
    const configurationService = accessor.get(IConfigurationService);
    const instaService = accessor.get(IInstantiationService);
    const modeService = accessor.get(IChatModeService);
    const context = getEditingSessionContext(accessor, args);
    if (!context?.chatWidget) {
      return;
    }
    const arg = args.at(0);
    const chatSession = context.chatWidget.viewModel?.model;
    const requestCount = chatSession?.getRequests().length ?? 0;
    const switchToMode = (arg && modeService.findModeById(arg.modeId)) ?? this.getNextMode(context.chatWidget, requestCount, configurationService, modeService);
    if (switchToMode.id === context.chatWidget.input.currentModeObs.get().id) {
      return;
    }
    const chatModeCheck = await instaService.invokeFunction(handleModeSwitch, context.chatWidget.input.currentModeKind, switchToMode.kind, requestCount, context.editingSession);
    if (!chatModeCheck) {
      return;
    }
    context.chatWidget.input.setChatMode(switchToMode.id);
    if (chatModeCheck.needToClearSession) {
      await commandService.executeCommand(ACTION_ID_NEW_CHAT);
    }
  }
  getNextMode(chatWidget, requestCount, configurationService, modeService) {
    const modes = modeService.getModes();
    const flat = [
      ...modes.builtin.filter((mode) => {
        return mode.kind !== ChatModeKind.Edit || configurationService.getValue(ChatConfiguration.Edits2Enabled) || requestCount === 0;
      }),
      ...modes.custom ?? []
    ];
    const curModeIndex = flat.findIndex((mode) => mode.id === chatWidget.input.currentModeObs.get().id);
    const newMode = flat[(curModeIndex + 1) % flat.length];
    return newMode;
  }
}
const ToggleRequestPausedActionId = "workbench.action.chat.toggleRequestPaused";
class ToggleRequestPausedAction extends Action2 {
  static {
    __name(this, "ToggleRequestPausedAction");
  }
  static {
    this.ID = ToggleRequestPausedActionId;
  }
  constructor() {
    super({
      id: ToggleRequestPausedAction.ID,
      title: localize2("interactive.toggleRequestPausd.label", "Toggle Request Paused"),
      category: CHAT_CATEGORY,
      icon: Codicon.debugPause,
      toggled: {
        condition: ChatContextKeys.isRequestPaused,
        icon: Codicon.play,
        tooltip: localize("requestIsPaused", "Resume Request")
      },
      tooltip: localize("requestNotPaused", "Pause Request"),
      menu: [
        {
          id: MenuId.ChatExecute,
          order: 3.5,
          when: ContextKeyExpr.and(ChatContextKeys.canRequestBePaused, ChatContextKeys.chatModeKind.isEqualTo(ChatModeKind.Agent), ChatContextKeys.location.isEqualTo(ChatAgentLocation.Panel), ContextKeyExpr.or(ChatContextKeys.isRequestPaused.negate(), ChatContextKeys.inputHasText.negate())),
          group: "navigation"
        }
      ]
    });
  }
  run(accessor, ...args) {
    const context = args[0];
    const widgetService = accessor.get(IChatWidgetService);
    const widget = context?.widget ?? widgetService.lastFocusedWidget;
    widget?.togglePaused();
  }
}
class SwitchToNextModelAction extends Action2 {
  static {
    __name(this, "SwitchToNextModelAction");
  }
  static {
    this.ID = "workbench.action.chat.switchToNextModel";
  }
  constructor() {
    super({
      id: SwitchToNextModelAction.ID,
      title: localize2("interactive.switchToNextModel.label", "Switch to Next Model"),
      category: CHAT_CATEGORY,
      f1: true,
      precondition: ChatContextKeys.enabled
    });
  }
  run(accessor, ...args) {
    const widgetService = accessor.get(IChatWidgetService);
    const widget = widgetService.lastFocusedWidget;
    widget?.input.switchToNextModel();
  }
}
const ChatOpenModelPickerActionId = "workbench.action.chat.openModelPicker";
class OpenModelPickerAction extends Action2 {
  static {
    __name(this, "OpenModelPickerAction");
  }
  static {
    this.ID = ChatOpenModelPickerActionId;
  }
  constructor() {
    super({
      id: OpenModelPickerAction.ID,
      title: localize2("interactive.openModelPicker.label", "Open Model Picker"),
      category: CHAT_CATEGORY,
      f1: false,
      keybinding: {
        primary: 2048 | 512 | 89,
        weight: 200,
        when: ChatContextKeys.inChatInput
      },
      precondition: ChatContextKeys.enabled,
      menu: {
        id: MenuId.ChatInput,
        order: 3,
        group: "navigation",
        when: ContextKeyExpr.and(ChatContextKeys.languageModelsAreUserSelectable, ContextKeyExpr.or(ContextKeyExpr.equals(ChatContextKeys.location.key, ChatAgentLocation.Panel), ContextKeyExpr.equals(ChatContextKeys.location.key, ChatAgentLocation.Editor), ContextKeyExpr.equals(ChatContextKeys.location.key, ChatAgentLocation.Notebook), ContextKeyExpr.equals(ChatContextKeys.location.key, ChatAgentLocation.Terminal)))
      }
    });
  }
  async run(accessor, ...args) {
    const widgetService = accessor.get(IChatWidgetService);
    const widget = widgetService.lastFocusedWidget;
    if (widget) {
      widget.input.openModelPicker();
    }
  }
}
const ChangeChatModelActionId = "workbench.action.chat.changeModel";
class ChangeChatModelAction extends Action2 {
  static {
    __name(this, "ChangeChatModelAction");
  }
  static {
    this.ID = ChangeChatModelActionId;
  }
  constructor() {
    super({
      id: ChangeChatModelAction.ID,
      title: localize2("interactive.changeModel.label", "Change Model"),
      category: CHAT_CATEGORY,
      f1: false,
      precondition: ChatContextKeys.enabled
    });
  }
  run(accessor, ...args) {
    const modelInfo = args[0];
    assertType(typeof modelInfo.vendor === "string" && typeof modelInfo.id === "string" && typeof modelInfo.family === "string");
    const widgetService = accessor.get(IChatWidgetService);
    const widgets = widgetService.getAllWidgets();
    for (const widget of widgets) {
      widget.input.switchModel(modelInfo);
    }
  }
}
class ChatEditingSessionSubmitAction extends SubmitAction {
  static {
    __name(this, "ChatEditingSessionSubmitAction");
  }
  static {
    this.ID = "workbench.action.edits.submit";
  }
  constructor() {
    const precondition = ChatContextKeys.chatModeKind.notEqualsTo(ChatModeKind.Ask);
    super({
      id: ChatEditingSessionSubmitAction.ID,
      title: localize2("edits.submit.label", "Send"),
      f1: false,
      category: CHAT_CATEGORY,
      icon: Codicon.send,
      precondition,
      keybinding: {
        when: ChatContextKeys.inChatInput,
        primary: 3,
        weight: 100
        /* KeybindingWeight.EditorContrib */
      },
      menu: [
        {
          id: MenuId.ChatExecuteSecondary,
          group: "group_1",
          when: ContextKeyExpr.and(whenNotInProgressOrPaused, precondition),
          order: 1
        },
        {
          id: MenuId.ChatExecute,
          order: 4,
          when: ContextKeyExpr.and(ContextKeyExpr.or(ContextKeyExpr.and(ChatContextKeys.isRequestPaused, ChatContextKeys.inputHasText), ChatContextKeys.requestInProgress.negate()), precondition),
          group: "navigation"
        }
      ]
    });
  }
}
class SubmitWithoutDispatchingAction extends Action2 {
  static {
    __name(this, "SubmitWithoutDispatchingAction");
  }
  static {
    this.ID = "workbench.action.chat.submitWithoutDispatching";
  }
  constructor() {
    const precondition = ContextKeyExpr.and(
      // if the input has prompt instructions attached, allow submitting requests even
      // without text present - having instructions is enough context for a request
      ContextKeyExpr.or(ChatContextKeys.inputHasText, ChatContextKeys.hasPromptFile),
      whenNotInProgressOrPaused,
      ChatContextKeys.chatModeKind.isEqualTo(ChatModeKind.Ask)
    );
    super({
      id: SubmitWithoutDispatchingAction.ID,
      title: localize2("interactive.submitWithoutDispatch.label", "Send"),
      f1: false,
      category: CHAT_CATEGORY,
      precondition,
      keybinding: {
        when: ChatContextKeys.inChatInput,
        primary: 512 | 1024 | 3,
        weight: 100
        /* KeybindingWeight.EditorContrib */
      },
      menu: [
        {
          id: MenuId.ChatExecuteSecondary,
          group: "group_1",
          order: 2,
          when: ChatContextKeys.chatModeKind.isEqualTo(ChatModeKind.Ask)
        }
      ]
    });
  }
  run(accessor, ...args) {
    const context = args[0];
    const widgetService = accessor.get(IChatWidgetService);
    const widget = context?.widget ?? widgetService.lastFocusedWidget;
    widget?.acceptInput(context?.inputValue, { noCommandDetection: true });
  }
}
class CreateRemoteAgentJobAction extends Action2 {
  static {
    __name(this, "CreateRemoteAgentJobAction");
  }
  static {
    this.ID = "workbench.action.chat.createRemoteAgentJob";
  }
  static {
    this.markdownStringTrustedOptions = {
      isTrusted: {
        enabledCommands: []
      }
    };
  }
  constructor() {
    const precondition = ContextKeyExpr.and(ContextKeyExpr.or(ChatContextKeys.inputHasText, ChatContextKeys.hasPromptFile), whenNotInProgressOrPaused, ChatContextKeys.remoteJobCreating.negate());
    super({
      id: CreateRemoteAgentJobAction.ID,
      // TODO(joshspicer): Generalize title
      title: localize2("actions.chat.createRemoteJob", "Push to Copilot coding agent"),
      icon: Codicon.cloudUpload,
      precondition,
      toggled: {
        condition: ChatContextKeys.remoteJobCreating,
        icon: Codicon.sync,
        tooltip: localize("remoteJobCreating", "Pushing to Copilot coding agent")
      },
      menu: {
        id: MenuId.ChatExecute,
        group: "navigation",
        order: 3.4,
        when: ChatContextKeys.hasRemoteCodingAgent
      }
    });
  }
  async run(accessor, ...args) {
    const contextKeyService = accessor.get(IContextKeyService);
    const remoteJobCreatingKey = ChatContextKeys.remoteJobCreating.bindTo(contextKeyService);
    try {
      remoteJobCreatingKey.set(true);
      const remoteCodingAgent = accessor.get(IRemoteCodingAgentsService);
      const commandService = accessor.get(ICommandService);
      const widgetService = accessor.get(IChatWidgetService);
      const chatAgentService = accessor.get(IChatAgentService);
      const widget = widgetService.lastFocusedWidget;
      if (!widget) {
        return;
      }
      const session = widget.viewModel?.sessionId;
      if (!session) {
        return;
      }
      const userPrompt = widget.getInput();
      widget.setInput();
      const chatModel = widget.viewModel?.model;
      if (!chatModel) {
        return;
      }
      const chatRequests = chatModel.getRequests();
      const defaultAgent = chatAgentService.getDefaultAgent(ChatAgentLocation.Panel);
      const instantiationService = accessor.get(IInstantiationService);
      const requestParser = instantiationService.createInstance(ChatRequestParser);
      const parsedRequest = requestParser.parseChatRequest(session, userPrompt, ChatAgentLocation.Panel);
      const addedRequest = chatModel.addRequest(parsedRequest, { variables: [] }, 0, defaultAgent);
      const agents = remoteCodingAgent.getAvailableAgents();
      const agent = agents[0];
      if (!agent) {
        return;
      }
      let summary;
      let followup;
      if (defaultAgent && chatRequests.length > 0) {
        chatModel.acceptResponseProgress(addedRequest, {
          kind: "progressMessage",
          content: new MarkdownString(localize("analyzingChatHistory", "Analyzing chat history"), CreateRemoteAgentJobAction.markdownStringTrustedOptions)
        });
        if (agent.followUpRegex) {
          const regex = new RegExp(agent.followUpRegex);
          followup = chatRequests.map((req) => req.response?.response.toString() ?? "").reverse().find((text) => regex.test(text));
        }
        const historyEntries = chatRequests.map((req) => ({
          request: {
            sessionId: session,
            requestId: req.id,
            agentId: req.response?.agent?.id ?? "",
            message: req.message.text,
            command: req.response?.slashCommand?.name,
            variables: req.variableData,
            location: ChatAgentLocation.Panel,
            editedFileEvents: req.editedFileEvents
          },
          response: toChatHistoryContent(req.response.response.value),
          result: req.response?.result ?? {}
        }));
        summary = await chatAgentService.getChatSummary(defaultAgent.id, historyEntries, CancellationToken.None);
      }
      chatModel.acceptResponseProgress(addedRequest, {
        kind: "progressMessage",
        content: new MarkdownString(localize("creatingRemoteJob", "Pushing state to coding agent"), CreateRemoteAgentJobAction.markdownStringTrustedOptions)
      });
      const resultMarkdown = await commandService.executeCommand(agent.command, {
        userPrompt,
        summary: summary || userPrompt,
        followup
      });
      let content = new MarkdownString(resultMarkdown, CreateRemoteAgentJobAction.markdownStringTrustedOptions);
      if (!resultMarkdown) {
        content = new MarkdownString(localize("remoteAgentError", "Coding agent session cancelled."), CreateRemoteAgentJobAction.markdownStringTrustedOptions);
      }
      chatModel.acceptResponseProgress(addedRequest, { content, kind: "markdownContent" });
      chatModel.setResponse(addedRequest, {});
      chatModel.completeResponse(addedRequest);
    } finally {
      remoteJobCreatingKey.set(false);
    }
  }
}
class ChatSubmitWithCodebaseAction extends Action2 {
  static {
    __name(this, "ChatSubmitWithCodebaseAction");
  }
  static {
    this.ID = "workbench.action.chat.submitWithCodebase";
  }
  constructor() {
    const precondition = ContextKeyExpr.and(
      // if the input has prompt instructions attached, allow submitting requests even
      // without text present - having instructions is enough context for a request
      ContextKeyExpr.or(ChatContextKeys.inputHasText, ChatContextKeys.hasPromptFile),
      whenNotInProgressOrPaused
    );
    super({
      id: ChatSubmitWithCodebaseAction.ID,
      title: localize2("actions.chat.submitWithCodebase", "Send with {0}", `${chatVariableLeader}codebase`),
      precondition,
      menu: {
        id: MenuId.ChatExecuteSecondary,
        group: "group_1",
        order: 3,
        when: ContextKeyExpr.equals(ChatContextKeys.location.key, ChatAgentLocation.Panel)
      },
      keybinding: {
        when: ChatContextKeys.inChatInput,
        primary: 2048 | 3,
        weight: 100
        /* KeybindingWeight.EditorContrib */
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
    const languageModelToolsService = accessor.get(ILanguageModelToolsService);
    const codebaseTool = languageModelToolsService.getToolByName("codebase");
    if (!codebaseTool) {
      return;
    }
    widget.input.attachmentModel.addContext({
      id: codebaseTool.id,
      name: codebaseTool.displayName ?? "",
      fullName: codebaseTool.displayName ?? "",
      value: void 0,
      icon: ThemeIcon.isThemeIcon(codebaseTool.icon) ? codebaseTool.icon : void 0,
      kind: "tool"
    });
    widget.acceptInput();
  }
}
class SendToNewChatAction extends Action2 {
  static {
    __name(this, "SendToNewChatAction");
  }
  constructor() {
    const precondition = ContextKeyExpr.and(
      // if the input has prompt instructions attached, allow submitting requests even
      // without text present - having instructions is enough context for a request
      ContextKeyExpr.or(ChatContextKeys.inputHasText, ChatContextKeys.hasPromptFile),
      whenNotInProgressOrPaused
    );
    super({
      id: "workbench.action.chat.sendToNewChat",
      title: localize2("chat.newChat.label", "Send to New Chat"),
      precondition,
      category: CHAT_CATEGORY,
      f1: false,
      menu: {
        id: MenuId.ChatExecuteSecondary,
        group: "group_2",
        when: ContextKeyExpr.equals(ChatContextKeys.location.key, ChatAgentLocation.Panel)
      },
      keybinding: {
        weight: 200,
        primary: 2048 | 1024 | 3,
        when: ChatContextKeys.inChatInput
      }
    });
  }
  async run(accessor, ...args) {
    const context = args[0];
    const widgetService = accessor.get(IChatWidgetService);
    const dialogService = accessor.get(IDialogService);
    const widget = context?.widget ?? widgetService.lastFocusedWidget;
    if (!widget) {
      return;
    }
    const editingSession = widget.viewModel?.model.editingSession;
    if (editingSession) {
      if (!await handleCurrentEditingSession(editingSession, void 0, dialogService)) {
        return;
      }
    }
    widget.clear();
    await widget.waitForReady();
    widget.acceptInput(context?.inputValue);
  }
}
const CancelChatActionId = "workbench.action.chat.cancel";
class CancelAction extends Action2 {
  static {
    __name(this, "CancelAction");
  }
  static {
    this.ID = CancelChatActionId;
  }
  constructor() {
    super({
      id: CancelAction.ID,
      title: localize2("interactive.cancel.label", "Cancel"),
      f1: false,
      category: CHAT_CATEGORY,
      icon: Codicon.stopCircle,
      menu: [
        {
          id: MenuId.ChatExecute,
          when: ContextKeyExpr.and(ChatContextKeys.isRequestPaused.negate(), ChatContextKeys.requestInProgress),
          order: 4,
          group: "navigation"
        }
      ],
      keybinding: {
        weight: 200,
        primary: 2048 | 9,
        win: {
          primary: 512 | 1
          /* KeyCode.Backspace */
        }
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
  }
}
const CancelChatEditId = "workbench.edit.chat.cancel";
class CancelEdit extends Action2 {
  static {
    __name(this, "CancelEdit");
  }
  static {
    this.ID = CancelChatEditId;
  }
  constructor() {
    super({
      id: CancelEdit.ID,
      title: localize2("interactive.cancelEdit.label", "Cancel Edit"),
      f1: false,
      category: CHAT_CATEGORY,
      icon: Codicon.x,
      menu: [
        {
          id: MenuId.ChatMessageTitle,
          group: "navigation",
          order: 1,
          when: ContextKeyExpr.and(ChatContextKeys.isRequest, ChatContextKeys.currentlyEditing, ContextKeyExpr.equals(`config.${ChatConfiguration.EditRequests}`, "input"))
        }
      ],
      keybinding: {
        primary: 9,
        when: ContextKeyExpr.and(ChatContextKeys.inChatInput, EditorContextKeys.hoverVisible.toNegated(), EditorContextKeys.hasNonEmptySelection.toNegated(), EditorContextKeys.hasMultipleSelections.toNegated(), ContextKeyExpr.or(ChatContextKeys.currentlyEditing, ChatContextKeys.currentlyEditingInput)),
        weight: 100 - 5
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
    widget.finishedEditing();
  }
}
function registerChatExecuteActions() {
  registerAction2(ChatSubmitAction);
  registerAction2(ChatEditingSessionSubmitAction);
  registerAction2(SubmitWithoutDispatchingAction);
  registerAction2(CancelAction);
  registerAction2(SendToNewChatAction);
  registerAction2(ChatSubmitWithCodebaseAction);
  registerAction2(CreateRemoteAgentJobAction);
  registerAction2(ToggleChatModeAction);
  registerAction2(ToggleRequestPausedAction);
  registerAction2(SwitchToNextModelAction);
  registerAction2(OpenModelPickerAction);
  registerAction2(ChangeChatModelAction);
  registerAction2(CancelEdit);
}
__name(registerChatExecuteActions, "registerChatExecuteActions");
export {
  CancelAction,
  CancelChatActionId,
  CancelChatEditId,
  CancelEdit,
  ChangeChatModelActionId,
  ChatEditingSessionSubmitAction,
  ChatOpenModelPickerActionId,
  ChatSubmitAction,
  ChatSubmitWithCodebaseAction,
  CreateRemoteAgentJobAction,
  ToggleAgentModeActionId,
  ToggleRequestPausedAction,
  ToggleRequestPausedActionId,
  registerChatExecuteActions
};
//# sourceMappingURL=chatExecuteActions.js.map
