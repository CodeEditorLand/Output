var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Codicon } from "../../../../base/common/codicons.js";
import { localize, localize2 } from "../../../../nls.js";
import { Action2, MenuRegistry, registerAction2 } from "../../../../platform/actions/common/actions.js";
import { IHostService } from "../../../../workbench/services/host/browser/host.js";
import { registerWorkbenchContribution2 } from "../../../../workbench/common/contributions.js";
import { Extensions as ViewExtensions } from "../../../../workbench/common/views.js";
import { Registry } from "../../../../platform/registry/common/platform.js";
import { SyncDescriptor } from "../../../../platform/instantiation/common/descriptors.js";
import { AgentSessionProviders } from "../../../../workbench/contrib/chat/browser/agentSessions/agentSessions.js";
import { isAgentSession } from "../../../../workbench/contrib/chat/browser/agentSessions/agentSessionsModel.js";
import { ISessionsManagementService, IsNewChatSessionContext } from "../../sessions/browser/sessionsManagementService.js";
import { ITerminalService } from "../../../../workbench/contrib/terminal/browser/terminal.js";
import { TERMINAL_VIEW_ID } from "../../../../workbench/contrib/terminal/common/terminal.js";
import { IViewsService } from "../../../../workbench/services/views/common/viewsService.js";
import { Menus } from "../../../browser/menus.js";
import { BranchChatSessionAction } from "./branchChatSessionAction.js";
import { RunScriptContribution } from "./runScriptAction.js";
import { registerSingleton } from "../../../../platform/instantiation/common/extensions.js";
import { AgenticPromptsService } from "./promptsService.js";
import { IPromptsService } from "../../../../workbench/contrib/chat/common/promptSyntax/service/promptsService.js";
import { ChatViewContainerId, ChatViewId } from "../../../../workbench/contrib/chat/browser/chat.js";
import { CHAT_CATEGORY } from "../../../../workbench/contrib/chat/browser/actions/chatActions.js";
import { NewChatViewPane, SessionsViewId } from "./newChatViewPane.js";
import { ViewPaneContainer } from "../../../../workbench/browser/parts/views/viewPaneContainer.js";
import { registerIcon } from "../../../../platform/theme/common/iconRegistry.js";
import { ChatViewPane } from "../../../../workbench/contrib/chat/browser/widgetHosts/viewPane/chatViewPane.js";
class OpenSessionWorktreeInVSCodeAction extends Action2 {
  static {
    __name(this, "OpenSessionWorktreeInVSCodeAction");
  }
  static {
    this.ID = "chat.openSessionWorktreeInVSCode";
  }
  constructor() {
    super({
      id: OpenSessionWorktreeInVSCodeAction.ID,
      title: localize2("openInVSCode", "Open in VS Code"),
      icon: Codicon.vscodeInsiders,
      menu: [{
        id: Menus.OpenSubMenu,
        group: "navigation",
        order: 2
      }]
    });
  }
  async run(accessor) {
    const hostService = accessor.get(IHostService);
    const sessionsManagementService = accessor.get(ISessionsManagementService);
    const activeSession = sessionsManagementService.activeSession.get();
    if (!activeSession) {
      return;
    }
    const folderUri = isAgentSession(activeSession) && activeSession.providerType !== AgentSessionProviders.Cloud ? activeSession.worktree : void 0;
    if (!folderUri) {
      return;
    }
    await hostService.openWindow([{ folderUri }], { forceNewWindow: true });
  }
}
registerAction2(OpenSessionWorktreeInVSCodeAction);
class NewChatInSessionsWindowAction extends Action2 {
  static {
    __name(this, "NewChatInSessionsWindowAction");
  }
  constructor() {
    super({
      id: "workbench.action.sessions.newChat",
      title: localize2("chat.newEdits.label", "New Chat"),
      category: CHAT_CATEGORY,
      keybinding: {
        weight: 200 + 2,
        primary: 2048 | 44,
        secondary: [
          2048 | 42
          /* KeyCode.KeyL */
        ],
        mac: {
          primary: 2048 | 44,
          secondary: [
            256 | 42
            /* KeyCode.KeyL */
          ]
        }
      }
    });
  }
  run(accessor) {
    const sessionsManagementService = accessor.get(ISessionsManagementService);
    sessionsManagementService.openNewSession();
  }
}
registerAction2(NewChatInSessionsWindowAction);
class OpenSessionInTerminalAction extends Action2 {
  static {
    __name(this, "OpenSessionInTerminalAction");
  }
  constructor() {
    super({
      id: "agentSession.openInTerminal",
      title: localize2("openInTerminal", "Open Terminal"),
      icon: Codicon.terminal,
      menu: [{
        id: Menus.OpenSubMenu,
        group: "navigation",
        order: 1
      }]
    });
  }
  async run(accessor) {
    const terminalService = accessor.get(ITerminalService);
    const viewsService = accessor.get(IViewsService);
    const sessionsManagementService = accessor.get(ISessionsManagementService);
    const activeSession = sessionsManagementService.activeSession.get();
    const repository = isAgentSession(activeSession) && activeSession.providerType !== AgentSessionProviders.Cloud ? activeSession.worktree : void 0;
    if (repository) {
      const instance = await terminalService.createTerminal({ config: { cwd: repository } });
      if (instance) {
        terminalService.setActiveInstance(instance);
      }
    }
    await viewsService.openView(TERMINAL_VIEW_ID, true);
  }
}
registerAction2(OpenSessionInTerminalAction);
MenuRegistry.appendMenuItem(Menus.TitleBarRight, {
  submenu: Menus.OpenSubMenu,
  isSplitButton: { togglePrimaryAction: true },
  title: localize2("open", "Open..."),
  icon: Codicon.folderOpened,
  group: "navigation",
  order: 9
});
const chatViewIcon = registerIcon("chat-view-icon", Codicon.chatSparkle, localize("chatViewIcon", "View icon of the chat view."));
class RegisterChatViewContainerContribution {
  static {
    __name(this, "RegisterChatViewContainerContribution");
  }
  static {
    this.ID = "sessions.registerChatViewContainer";
  }
  constructor() {
    const viewContainerRegistry = Registry.as(ViewExtensions.ViewContainersRegistry);
    const viewsRegistry = Registry.as(ViewExtensions.ViewsRegistry);
    let chatViewContainer = viewContainerRegistry.get(ChatViewContainerId);
    if (chatViewContainer) {
      viewContainerRegistry.deregisterViewContainer(chatViewContainer);
      const view = viewsRegistry.getView(ChatViewId);
      if (view) {
        viewsRegistry.deregisterViews([view], chatViewContainer);
      }
    }
    chatViewContainer = viewContainerRegistry.registerViewContainer({
      id: ChatViewContainerId,
      title: localize2("chat.viewContainer.label", "Chat"),
      icon: chatViewIcon,
      ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [ChatViewContainerId, { mergeViewWithContainerWhenSingleView: true }]),
      storageId: ChatViewContainerId,
      hideIfEmpty: true,
      order: 1,
      windowVisibility: 2
    }, 3, { isDefault: true, doNotRegisterOpenCommand: true });
    viewsRegistry.registerViews([{
      id: ChatViewId,
      containerIcon: chatViewContainer.icon,
      containerTitle: chatViewContainer.title.value,
      singleViewPaneContainerTitle: chatViewContainer.title.value,
      name: localize2("chat.viewContainer.label", "Chat"),
      canToggleVisibility: false,
      canMoveView: false,
      ctorDescriptor: new SyncDescriptor(ChatViewPane),
      when: IsNewChatSessionContext.negate(),
      windowVisibility: 2
      /* WindowVisibility.Sessions */
    }, {
      id: SessionsViewId,
      containerIcon: chatViewContainer.icon,
      containerTitle: chatViewContainer.title.value,
      singleViewPaneContainerTitle: chatViewContainer.title.value,
      name: localize2("sessions.newChat.view", "New Session"),
      canToggleVisibility: false,
      canMoveView: false,
      ctorDescriptor: new SyncDescriptor(NewChatViewPane),
      when: IsNewChatSessionContext,
      windowVisibility: 2
    }], chatViewContainer);
  }
}
registerAction2(BranchChatSessionAction);
registerWorkbenchContribution2(
  RegisterChatViewContainerContribution.ID,
  RegisterChatViewContainerContribution,
  1
  /* WorkbenchPhase.BlockStartup */
);
registerWorkbenchContribution2(
  RunScriptContribution.ID,
  RunScriptContribution,
  3
  /* WorkbenchPhase.AfterRestored */
);
registerSingleton(
  IPromptsService,
  AgenticPromptsService,
  1
  /* InstantiationType.Delayed */
);
export {
  OpenSessionInTerminalAction,
  OpenSessionWorktreeInVSCodeAction
};
//# sourceMappingURL=chat.contribution.js.map
