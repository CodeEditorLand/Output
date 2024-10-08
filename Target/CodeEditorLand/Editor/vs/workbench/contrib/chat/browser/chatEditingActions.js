var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Codicon } from "../../../../base/common/codicons.js";
import { ResourceSet } from "../../../../base/common/map.js";
import { URI } from "../../../../base/common/uri.js";
import { ServicesAccessor } from "../../../../editor/browser/editorExtensions.js";
import { localize, localize2 } from "../../../../nls.js";
import { Action2, MenuId, registerAction2 } from "../../../../platform/actions/common/actions.js";
import { ContextKeyExpr } from "../../../../platform/contextkey/common/contextkey.js";
import { EditorActivation } from "../../../../platform/editor/common/editor.js";
import { IListService } from "../../../../platform/list/browser/listService.js";
import { GroupsOrder, IEditorGroupsService } from "../../../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { CHAT_EDITING_MULTI_DIFF_SOURCE_RESOLVER_SCHEME, chatEditingResourceContextKey, chatEditingWidgetFileStateContextKey, decidedChatEditingResourceContextKey, IChatEditingService, IChatEditingSession, inChatEditingSessionContextKey, WorkingSetEntryState } from "../common/chatEditingService.js";
import { CHAT_CATEGORY } from "./actions/chatActions.js";
import { IChatWidget, IChatWidgetService } from "./chat.js";
class WorkingSetAction extends Action2 {
  static {
    __name(this, "WorkingSetAction");
  }
  run(accessor, ...args) {
    const chatEditingService = accessor.get(IChatEditingService);
    const currentEditingSession = chatEditingService.currentEditingSession;
    if (!currentEditingSession) {
      return;
    }
    const chatWidget = accessor.get(IChatWidgetService).lastFocusedWidget;
    const uris = [];
    if (URI.isUri(args[0])) {
      uris.push(args[0]);
    } else if (chatWidget) {
      uris.push(...chatWidget.input.selectedElements);
    }
    if (!uris.length) {
      return;
    }
    return this.runWorkingSetAction(accessor, currentEditingSession, chatWidget, ...uris);
  }
}
registerAction2(class RemoveFileFromWorkingSet extends WorkingSetAction {
  static {
    __name(this, "RemoveFileFromWorkingSet");
  }
  constructor() {
    super({
      id: "chatEditing.removeFileFromWorkingSet",
      title: localize2("removeFileFromWorkingSet", "Remove File"),
      icon: Codicon.close,
      menu: [{
        id: MenuId.ChatEditingSessionWidgetToolbar,
        // when: ContextKeyExpr.false(), // TODO@joyceerhl enable this when attachments are stored as part of the chat input
        when: ContextKeyExpr.equals(chatEditingWidgetFileStateContextKey.key, WorkingSetEntryState.Attached),
        order: 0,
        group: "navigation"
      }]
    });
  }
  async runWorkingSetAction(accessor, currentEditingSession, chatWidget, ...uris) {
    currentEditingSession.remove(...uris);
    const resourceSet = new ResourceSet(uris);
    const newContext = [];
    for (const context of chatWidget.input.attachmentModel.attachments) {
      if (!URI.isUri(context.value) || !context.isFile || !resourceSet.has(context.value)) {
        newContext.push(context);
      }
    }
    chatWidget.attachmentModel.clearAndSetContext(...newContext);
  }
});
registerAction2(class OpenFileAction extends WorkingSetAction {
  static {
    __name(this, "OpenFileAction");
  }
  constructor() {
    super({
      id: "chatEditing.openFile",
      title: localize2("open.file", "Open File"),
      icon: Codicon.goToFile,
      menu: [{
        id: MenuId.ChatEditingSessionWidgetToolbar,
        when: ContextKeyExpr.equals(chatEditingWidgetFileStateContextKey.key, WorkingSetEntryState.Modified),
        order: 0,
        group: "navigation"
      }]
    });
  }
  async runWorkingSetAction(accessor, currentEditingSession, chatWidget, ...uris) {
    const editorService = accessor.get(IEditorService);
    await Promise.all(uris.map((uri) => editorService.openEditor({ resource: uri, options: { pinned: true, activation: EditorActivation.ACTIVATE } })));
  }
});
registerAction2(class AcceptAction extends WorkingSetAction {
  static {
    __name(this, "AcceptAction");
  }
  constructor() {
    super({
      id: "chatEditing.acceptFile",
      title: localize2("accept.file", "Accept"),
      icon: Codicon.check,
      menu: [{
        when: ContextKeyExpr.and(ContextKeyExpr.equals("resourceScheme", CHAT_EDITING_MULTI_DIFF_SOURCE_RESOLVER_SCHEME), ContextKeyExpr.notIn(chatEditingResourceContextKey.key, decidedChatEditingResourceContextKey.key)),
        id: MenuId.MultiDiffEditorFileToolbar,
        order: 0,
        group: "navigation"
      }, {
        id: MenuId.ChatEditingSessionWidgetToolbar,
        when: ContextKeyExpr.equals(chatEditingWidgetFileStateContextKey.key, WorkingSetEntryState.Modified),
        order: 2,
        group: "navigation"
      }]
    });
  }
  async runWorkingSetAction(accessor, currentEditingSession, chatWidget, ...uris) {
    await currentEditingSession.accept(...uris);
  }
});
registerAction2(class DiscardAction extends WorkingSetAction {
  static {
    __name(this, "DiscardAction");
  }
  constructor() {
    super({
      id: "chatEditing.discardFile",
      title: localize2("discard.file", "Discard"),
      icon: Codicon.discard,
      menu: [{
        when: ContextKeyExpr.and(ContextKeyExpr.equals("resourceScheme", CHAT_EDITING_MULTI_DIFF_SOURCE_RESOLVER_SCHEME), ContextKeyExpr.notIn(chatEditingResourceContextKey.key, decidedChatEditingResourceContextKey.key)),
        id: MenuId.MultiDiffEditorFileToolbar,
        order: 0,
        group: "navigation"
      }, {
        id: MenuId.ChatEditingSessionWidgetToolbar,
        when: ContextKeyExpr.equals(chatEditingWidgetFileStateContextKey.key, WorkingSetEntryState.Modified),
        order: 1,
        group: "navigation"
      }]
    });
  }
  async runWorkingSetAction(accessor, currentEditingSession, chatWidget, ...uris) {
    await currentEditingSession.reject(...uris);
  }
});
class ChatEditingAcceptAllAction extends Action2 {
  static {
    __name(this, "ChatEditingAcceptAllAction");
  }
  static ID = "chatEditing.acceptAllFiles";
  static LABEL = localize("accept.allFiles", "Accept All");
  constructor() {
    super({
      id: ChatEditingAcceptAllAction.ID,
      title: ChatEditingAcceptAllAction.LABEL,
      // icon: Codicon.goToFile,
      menu: {
        when: ContextKeyExpr.equals("resourceScheme", CHAT_EDITING_MULTI_DIFF_SOURCE_RESOLVER_SCHEME),
        id: MenuId.EditorTitle,
        order: 0,
        group: "navigation"
      }
    });
  }
  async run(accessor, ...args) {
    const chatEditingService = accessor.get(IChatEditingService);
    const currentEditingSession = chatEditingService.currentEditingSession;
    if (!currentEditingSession) {
      return;
    }
    await currentEditingSession.accept();
  }
}
registerAction2(ChatEditingAcceptAllAction);
class ChatEditingDiscardAllAction extends Action2 {
  static {
    __name(this, "ChatEditingDiscardAllAction");
  }
  static ID = "chatEditing.discardAllFiles";
  static LABEL = localize("discard.allFiles", "Discard All");
  constructor() {
    super({
      id: ChatEditingDiscardAllAction.ID,
      title: ChatEditingDiscardAllAction.LABEL,
      // icon: Codicon.goToFile,
      menu: {
        when: ContextKeyExpr.equals("resourceScheme", CHAT_EDITING_MULTI_DIFF_SOURCE_RESOLVER_SCHEME),
        id: MenuId.EditorTitle,
        order: 0,
        group: "navigation"
      }
    });
  }
  async run(accessor, ...args) {
    const chatEditingService = accessor.get(IChatEditingService);
    const currentEditingSession = chatEditingService.currentEditingSession;
    if (!currentEditingSession) {
      return;
    }
    await currentEditingSession.reject();
  }
}
registerAction2(ChatEditingDiscardAllAction);
class ChatEditingShowChangesAction extends Action2 {
  static {
    __name(this, "ChatEditingShowChangesAction");
  }
  static ID = "chatEditing.openDiffs";
  static LABEL = localize("chatEditing.openDiffs", "Open Diffs");
  constructor() {
    super({
      id: ChatEditingShowChangesAction.ID,
      title: ChatEditingShowChangesAction.LABEL,
      f1: false
    });
  }
  async run(accessor, ...args) {
    const chatEditingService = accessor.get(IChatEditingService);
    const currentEditingSession = chatEditingService.currentEditingSession;
    if (!currentEditingSession) {
      return;
    }
    await currentEditingSession.show();
  }
}
registerAction2(ChatEditingShowChangesAction);
registerAction2(class AddFilesToWorkingSetAction extends Action2 {
  static {
    __name(this, "AddFilesToWorkingSetAction");
  }
  constructor() {
    super({
      id: "workbench.action.chat.addFilesToWorkingSet",
      title: localize2("workbench.action.chat.addFilesToWorkingSet.label", "Add Files to Working Set"),
      icon: Codicon.attach,
      category: CHAT_CATEGORY,
      precondition: inChatEditingSessionContextKey,
      f1: true
    });
  }
  async run(accessor, ...args) {
    const listService = accessor.get(IListService);
    const chatEditingService = accessor.get(IChatEditingService);
    const editorGroupService = accessor.get(IEditorGroupsService);
    const uris = [];
    for (const group of editorGroupService.getGroups(GroupsOrder.MOST_RECENTLY_ACTIVE)) {
      for (const selection of group.selectedEditors) {
        if (selection.resource) {
          uris.push(selection.resource);
        }
      }
    }
    if (uris.length === 0) {
      const selection = listService.lastFocusedList?.getSelection();
      if (selection?.length) {
        for (const file of selection) {
          if (!!file && typeof file === "object" && "resource" in file && URI.isUri(file.resource)) {
            uris.push(file.resource);
          }
        }
      }
    }
    for (const file of uris) {
      await chatEditingService?.addFileToWorkingSet(file);
    }
  }
});
export {
  ChatEditingAcceptAllAction,
  ChatEditingDiscardAllAction,
  ChatEditingShowChangesAction
};
//# sourceMappingURL=chatEditingActions.js.map
