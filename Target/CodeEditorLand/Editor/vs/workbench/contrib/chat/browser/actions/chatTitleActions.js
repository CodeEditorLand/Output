var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Codicon } from "../../../../../base/common/codicons.js";
import { KeyCode, KeyMod } from "../../../../../base/common/keyCodes.js";
import { ResourceSet } from "../../../../../base/common/map.js";
import { marked } from "../../../../../base/common/marked/marked.js";
import { Schemas } from "../../../../../base/common/network.js";
import { URI } from "../../../../../base/common/uri.js";
import { ServicesAccessor } from "../../../../../editor/browser/editorExtensions.js";
import { IBulkEditService } from "../../../../../editor/browser/services/bulkEditService.js";
import { isLocation } from "../../../../../editor/common/languages.js";
import { localize, localize2 } from "../../../../../nls.js";
import { Action2, MenuId, registerAction2 } from "../../../../../platform/actions/common/actions.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import { ContextKeyExpr } from "../../../../../platform/contextkey/common/contextkey.js";
import { IDialogService } from "../../../../../platform/dialogs/common/dialogs.js";
import { KeybindingWeight } from "../../../../../platform/keybinding/common/keybindingsRegistry.js";
import { IEditorService } from "../../../../services/editor/common/editorService.js";
import { IViewsService } from "../../../../services/views/common/viewsService.js";
import { ResourceNotebookCellEdit } from "../../../bulkEdit/browser/bulkCellEdits.js";
import { MENU_INLINE_CHAT_WIDGET_SECONDARY } from "../../../inlineChat/common/inlineChat.js";
import { INotebookEditor } from "../../../notebook/browser/notebookBrowser.js";
import { CellEditType, CellKind, NOTEBOOK_EDITOR_ID } from "../../../notebook/common/notebookCommon.js";
import { NOTEBOOK_IS_ACTIVE_EDITOR } from "../../../notebook/common/notebookContextKeys.js";
import { ChatAgentLocation, IChatAgentService } from "../../common/chatAgents.js";
import { CONTEXT_CHAT_EDITING_PARTICIPANT_REGISTERED, CONTEXT_CHAT_ENABLED, CONTEXT_CHAT_LOCATION, CONTEXT_CHAT_RESPONSE_SUPPORT_ISSUE_REPORTING, CONTEXT_IN_CHAT_INPUT, CONTEXT_IN_CHAT_SESSION, CONTEXT_ITEM_ID, CONTEXT_LAST_ITEM_ID, CONTEXT_REQUEST, CONTEXT_RESPONSE, CONTEXT_RESPONSE_ERROR, CONTEXT_RESPONSE_FILTERED, CONTEXT_RESPONSE_VOTE } from "../../common/chatContextKeys.js";
import { IChatEditingService } from "../../common/chatEditingService.js";
import { IParsedChatRequest } from "../../common/chatParserTypes.js";
import { ChatAgentVoteDirection, ChatAgentVoteDownReason, IChatProgress, IChatService } from "../../common/chatService.js";
import { isRequestVM, isResponseVM } from "../../common/chatViewModel.js";
import { ChatTreeItem, EDITS_VIEW_ID, IChatWidgetService } from "../chat.js";
import { ChatViewPane } from "../chatViewPane.js";
import { CHAT_CATEGORY } from "./chatActions.js";
const MarkUnhelpfulActionId = "workbench.action.chat.markUnhelpful";
function registerChatTitleActions() {
  registerAction2(class MarkHelpfulAction extends Action2 {
    static {
      __name(this, "MarkHelpfulAction");
    }
    constructor() {
      super({
        id: "workbench.action.chat.markHelpful",
        title: localize2("interactive.helpful.label", "Helpful"),
        f1: false,
        category: CHAT_CATEGORY,
        icon: Codicon.thumbsup,
        toggled: CONTEXT_RESPONSE_VOTE.isEqualTo("up"),
        menu: [{
          id: MenuId.ChatMessageFooter,
          group: "navigation",
          order: 1,
          when: ContextKeyExpr.and(CONTEXT_RESPONSE, CONTEXT_RESPONSE_ERROR.negate())
        }, {
          id: MENU_INLINE_CHAT_WIDGET_SECONDARY,
          group: "navigation",
          order: 1,
          when: ContextKeyExpr.and(CONTEXT_RESPONSE, CONTEXT_RESPONSE_ERROR.negate())
        }]
      });
    }
    run(accessor, ...args) {
      const item = args[0];
      if (!isResponseVM(item)) {
        return;
      }
      const chatService = accessor.get(IChatService);
      chatService.notifyUserAction({
        agentId: item.agent?.id,
        command: item.slashCommand?.name,
        sessionId: item.sessionId,
        requestId: item.requestId,
        result: item.result,
        action: {
          kind: "vote",
          direction: ChatAgentVoteDirection.Up,
          reason: void 0
        }
      });
      item.setVote(ChatAgentVoteDirection.Up);
      item.setVoteDownReason(void 0);
    }
  });
  registerAction2(class MarkUnhelpfulAction extends Action2 {
    static {
      __name(this, "MarkUnhelpfulAction");
    }
    constructor() {
      super({
        id: MarkUnhelpfulActionId,
        title: localize2("interactive.unhelpful.label", "Unhelpful"),
        f1: false,
        category: CHAT_CATEGORY,
        icon: Codicon.thumbsdown,
        toggled: CONTEXT_RESPONSE_VOTE.isEqualTo("down"),
        menu: [{
          id: MenuId.ChatMessageFooter,
          group: "navigation",
          order: 2,
          when: ContextKeyExpr.and(CONTEXT_RESPONSE)
        }, {
          id: MENU_INLINE_CHAT_WIDGET_SECONDARY,
          group: "navigation",
          order: 2,
          when: ContextKeyExpr.and(CONTEXT_RESPONSE, CONTEXT_RESPONSE_ERROR.negate())
        }]
      });
    }
    run(accessor, ...args) {
      const item = args[0];
      if (!isResponseVM(item)) {
        return;
      }
      const reason = args[1];
      if (typeof reason !== "string") {
        return;
      }
      item.setVote(ChatAgentVoteDirection.Down);
      item.setVoteDownReason(reason);
      const chatService = accessor.get(IChatService);
      chatService.notifyUserAction({
        agentId: item.agent?.id,
        command: item.slashCommand?.name,
        sessionId: item.sessionId,
        requestId: item.requestId,
        result: item.result,
        action: {
          kind: "vote",
          direction: ChatAgentVoteDirection.Down,
          reason: item.voteDownReason
        }
      });
    }
  });
  registerAction2(class ReportIssueForBugAction extends Action2 {
    static {
      __name(this, "ReportIssueForBugAction");
    }
    constructor() {
      super({
        id: "workbench.action.chat.reportIssueForBug",
        title: localize2("interactive.reportIssueForBug.label", "Report Issue"),
        f1: false,
        category: CHAT_CATEGORY,
        icon: Codicon.report,
        menu: [{
          id: MenuId.ChatMessageFooter,
          group: "navigation",
          order: 3,
          when: ContextKeyExpr.and(CONTEXT_CHAT_RESPONSE_SUPPORT_ISSUE_REPORTING, CONTEXT_RESPONSE)
        }, {
          id: MENU_INLINE_CHAT_WIDGET_SECONDARY,
          group: "navigation",
          order: 3,
          when: ContextKeyExpr.and(CONTEXT_CHAT_RESPONSE_SUPPORT_ISSUE_REPORTING, CONTEXT_RESPONSE)
        }]
      });
    }
    run(accessor, ...args) {
      const item = args[0];
      if (!isResponseVM(item)) {
        return;
      }
      const chatService = accessor.get(IChatService);
      chatService.notifyUserAction({
        agentId: item.agent?.id,
        command: item.slashCommand?.name,
        sessionId: item.sessionId,
        requestId: item.requestId,
        result: item.result,
        action: {
          kind: "bug"
        }
      });
    }
  });
  registerAction2(class RetryChatAction extends Action2 {
    static {
      __name(this, "RetryChatAction");
    }
    constructor() {
      super({
        id: "workbench.action.chat.retry",
        title: localize2("chat.retry.label", "Retry"),
        f1: false,
        category: CHAT_CATEGORY,
        icon: Codicon.refresh,
        menu: [{
          id: MenuId.ChatMessageFooter,
          group: "navigation",
          when: ContextKeyExpr.and(
            CONTEXT_RESPONSE,
            ContextKeyExpr.in(CONTEXT_ITEM_ID.key, CONTEXT_LAST_ITEM_ID.key)
          )
        }]
      });
    }
    async run(accessor, ...args) {
      const item = args[0];
      if (!isResponseVM(item)) {
        return;
      }
      const chatService = accessor.get(IChatService);
      const chatWidgetService = accessor.get(IChatWidgetService);
      const chatEditingService = accessor.get(IChatEditingService);
      const chatModel = chatService.getSession(item.sessionId);
      const chatRequests = chatModel?.getRequests();
      if (!chatRequests) {
        return;
      }
      const itemIndex = chatRequests?.findIndex((request2) => request2.id === item.requestId);
      if (chatModel?.initialLocation === ChatAgentLocation.EditingSession) {
        const configurationService = accessor.get(IConfigurationService);
        const dialogService = accessor.get(IDialogService);
        const shouldPrompt = configurationService.getValue("chat.editing.confirmEditRequestRetry") === true;
        const confirmation = shouldPrompt ? await dialogService.confirm({
          title: localize("chat.retryLast.confirmation.title", "Do you want to retry your last edit?"),
          message: localize("chat.retry.confirmation.message", "This will also undo any edits made to your working set from this request."),
          primaryButton: localize("chat.retry.confirmation.primaryButton", "Yes"),
          checkbox: { label: localize("chat.retry.confirmation.checkbox", "Don't ask again"), checked: false },
          type: "info"
        }) : { confirmed: true };
        if (!confirmation.confirmed) {
          return;
        }
        if (confirmation.checkboxChecked) {
          await configurationService.updateValue("chat.editing.confirmEditRequestRetry", false);
        }
        const snapshotRequest = chatRequests[itemIndex];
        if (snapshotRequest) {
          await chatEditingService.restoreSnapshot(snapshotRequest.id);
        }
      }
      const request = chatModel?.getRequests().find((candidate) => candidate.id === item.requestId);
      const languageModelId = chatWidgetService.getWidgetBySessionId(item.sessionId)?.input.currentLanguageModel;
      chatService.resendRequest(request, { userSelectedModelId: languageModelId });
    }
  });
  registerAction2(class InsertToNotebookAction extends Action2 {
    static {
      __name(this, "InsertToNotebookAction");
    }
    constructor() {
      super({
        id: "workbench.action.chat.insertIntoNotebook",
        title: localize2("interactive.insertIntoNotebook.label", "Insert into Notebook"),
        f1: false,
        category: CHAT_CATEGORY,
        icon: Codicon.insert,
        menu: {
          id: MenuId.ChatMessageFooter,
          group: "navigation",
          isHiddenByDefault: true,
          when: ContextKeyExpr.and(NOTEBOOK_IS_ACTIVE_EDITOR, CONTEXT_RESPONSE, CONTEXT_RESPONSE_FILTERED.negate())
        }
      });
    }
    async run(accessor, ...args) {
      const item = args[0];
      if (!isResponseVM(item)) {
        return;
      }
      const editorService = accessor.get(IEditorService);
      if (editorService.activeEditorPane?.getId() === NOTEBOOK_EDITOR_ID) {
        const notebookEditor = editorService.activeEditorPane.getControl();
        if (!notebookEditor.hasModel()) {
          return;
        }
        if (notebookEditor.isReadOnly) {
          return;
        }
        const value = item.response.toString();
        const splitContents = splitMarkdownAndCodeBlocks(value);
        const focusRange = notebookEditor.getFocus();
        const index = Math.max(focusRange.end, 0);
        const bulkEditService = accessor.get(IBulkEditService);
        await bulkEditService.apply(
          [
            new ResourceNotebookCellEdit(
              notebookEditor.textModel.uri,
              {
                editType: CellEditType.Replace,
                index,
                count: 0,
                cells: splitContents.map((content) => {
                  const kind = content.type === "markdown" ? CellKind.Markup : CellKind.Code;
                  const language = content.type === "markdown" ? "markdown" : content.language;
                  const mime = content.type === "markdown" ? "text/markdown" : `text/x-${content.language}`;
                  return {
                    cellKind: kind,
                    language,
                    mime,
                    source: content.content,
                    outputs: [],
                    metadata: {}
                  };
                })
              }
            )
          ],
          { quotableLabel: "Insert into Notebook" }
        );
      }
    }
  });
  registerAction2(class RemoveAction extends Action2 {
    static {
      __name(this, "RemoveAction");
    }
    constructor() {
      super({
        id: "workbench.action.chat.remove",
        title: localize2("chat.remove.label", "Remove Request and Response"),
        f1: false,
        category: CHAT_CATEGORY,
        icon: Codicon.x,
        precondition: CONTEXT_CHAT_LOCATION.notEqualsTo(ChatAgentLocation.EditingSession),
        keybinding: {
          primary: KeyCode.Delete,
          mac: {
            primary: KeyMod.CtrlCmd | KeyCode.Backspace
          },
          when: ContextKeyExpr.and(CONTEXT_CHAT_LOCATION.notEqualsTo(ChatAgentLocation.EditingSession), CONTEXT_IN_CHAT_SESSION, CONTEXT_IN_CHAT_INPUT.negate()),
          weight: KeybindingWeight.WorkbenchContrib
        },
        menu: {
          id: MenuId.ChatMessageTitle,
          group: "navigation",
          order: 2,
          when: ContextKeyExpr.and(CONTEXT_CHAT_LOCATION.notEqualsTo(ChatAgentLocation.EditingSession), CONTEXT_REQUEST)
        }
      });
    }
    run(accessor, ...args) {
      let item = args[0];
      if (!isRequestVM(item)) {
        const chatWidgetService = accessor.get(IChatWidgetService);
        const widget = chatWidgetService.lastFocusedWidget;
        item = widget?.getFocus();
      }
      if (!item) {
        return;
      }
      const chatService = accessor.get(IChatService);
      const chatModel = chatService.getSession(item.sessionId);
      if (chatModel?.initialLocation === ChatAgentLocation.EditingSession) {
        return;
      }
      const requestId = isRequestVM(item) ? item.id : isResponseVM(item) ? item.requestId : void 0;
      if (requestId) {
        const chatService2 = accessor.get(IChatService);
        chatService2.removeRequest(item.sessionId, requestId);
      }
    }
  });
  registerAction2(class ContinueEditingAction extends Action2 {
    static {
      __name(this, "ContinueEditingAction");
    }
    constructor() {
      super({
        id: "workbench.action.chat.startEditing",
        title: localize2("chat.startEditing.label2", "Edit with Copilot"),
        f1: false,
        category: CHAT_CATEGORY,
        icon: Codicon.edit,
        precondition: ContextKeyExpr.and(CONTEXT_CHAT_EDITING_PARTICIPANT_REGISTERED, CONTEXT_CHAT_LOCATION.notEqualsTo(ChatAgentLocation.EditingSession)),
        menu: {
          id: MenuId.ChatMessageFooter,
          group: "navigation",
          order: 4,
          when: ContextKeyExpr.and(CONTEXT_CHAT_ENABLED, CONTEXT_CHAT_EDITING_PARTICIPANT_REGISTERED, CONTEXT_CHAT_LOCATION.notEqualsTo(ChatAgentLocation.EditingSession))
        }
      });
    }
    async run(accessor, ...args) {
      if (!accessor.get(IChatAgentService).getDefaultAgent(ChatAgentLocation.EditingSession)) {
        return;
      }
      const chatWidgetService = accessor.get(IChatWidgetService);
      const chatService = accessor.get(IChatService);
      const viewsService = accessor.get(IViewsService);
      const dialogService = accessor.get(IDialogService);
      const chatEditingService = accessor.get(IChatEditingService);
      let item = args[0];
      if (!isResponseVM(item)) {
        const widget = chatWidgetService.lastFocusedWidget;
        item = widget?.getFocus();
      }
      if (!item) {
        return;
      }
      const chatModel = chatService.getSession(item.sessionId);
      if (chatModel?.initialLocation === ChatAgentLocation.EditingSession) {
        return;
      }
      const requestId = isRequestVM(item) ? item.id : isResponseVM(item) ? item.requestId : void 0;
      const request = chatModel?.getRequests().find((candidate) => candidate.id === requestId);
      if (request) {
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
        const { widget } = await viewsService.openView(EDITS_VIEW_ID);
        if (widget.viewModel) {
          const workingSetInputs = new ResourceSet();
          const message = [];
          for (const item2 of request.response?.response.value ?? []) {
            if (item2.kind === "inlineReference") {
              workingSetInputs.add(isLocation(item2.inlineReference) ? item2.inlineReference.uri : URI.isUri(item2.inlineReference) ? item2.inlineReference : item2.inlineReference.location.uri);
            }
            if (item2.kind === "textEditGroup") {
              for (const group of item2.edits) {
                message.push({
                  kind: "textEdit",
                  edits: group,
                  uri: item2.uri
                });
              }
            } else {
              message.push(item2);
            }
          }
          chatService.addCompleteRequest(
            widget.viewModel.sessionId,
            request.message,
            request.variableData,
            request.attempt,
            {
              message,
              result: request.response?.result,
              followups: request.response?.followups
            }
          );
          if (workingSetInputs.size) {
            for (const reference of workingSetInputs) {
              await chatEditingService.addFileToWorkingSet(reference);
            }
          } else {
            for (const { reference } of request.response?.contentReferences ?? []) {
              if (URI.isUri(reference) && [Schemas.file, Schemas.vscodeRemote].includes(reference.scheme)) {
                await chatEditingService.addFileToWorkingSet(reference);
              }
            }
          }
        }
      }
    }
  });
}
__name(registerChatTitleActions, "registerChatTitleActions");
function splitMarkdownAndCodeBlocks(markdown) {
  const lexer = new marked.Lexer();
  const tokens = lexer.lex(markdown);
  const splitContent = [];
  let markdownPart = "";
  tokens.forEach((token) => {
    if (token.type === "code") {
      if (markdownPart.trim()) {
        splitContent.push({ type: "markdown", content: markdownPart });
        markdownPart = "";
      }
      splitContent.push({
        type: "code",
        language: token.lang || "",
        content: token.text
      });
    } else {
      markdownPart += token.raw;
    }
  });
  if (markdownPart.trim()) {
    splitContent.push({ type: "markdown", content: markdownPart });
  }
  return splitContent;
}
__name(splitMarkdownAndCodeBlocks, "splitMarkdownAndCodeBlocks");
export {
  MarkUnhelpfulActionId,
  registerChatTitleActions
};
//# sourceMappingURL=chatTitleActions.js.map
