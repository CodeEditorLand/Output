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
import { Codicon } from "../../../../base/common/codicons.js";
import { Disposable, IDisposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { localize, localize2 } from "../../../../nls.js";
import { CommandsRegistry } from "../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { ContextKeyExpr, IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IExtensionManagementService } from "../../../../platform/extensionManagement/common/extensionManagement.js";
import { ExtensionIdentifier } from "../../../../platform/extensions/common/extensions.js";
import { SyncDescriptor } from "../../../../platform/instantiation/common/descriptors.js";
import { ServicesAccessor } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { KeybindingsRegistry, KeybindingWeight } from "../../../../platform/keybinding/common/keybindingsRegistry.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import { Registry } from "../../../../platform/registry/common/platform.js";
import { IStorageService, StorageScope, StorageTarget } from "../../../../platform/storage/common/storage.js";
import { ViewPane } from "../../../browser/parts/views/viewPane.js";
import { ViewPaneContainer } from "../../../browser/parts/views/viewPaneContainer.js";
import { IWorkbenchContribution, registerWorkbenchContribution2, WorkbenchPhase } from "../../../common/contributions.js";
import { IViewContainersRegistry, IViewDescriptor, IViewDescriptorService, IViewsRegistry, ViewContainer, ViewContainerLocation, Extensions as ViewExtensions } from "../../../common/views.js";
import { IPaneCompositePartService } from "../../../services/panecomposite/browser/panecomposite.js";
import { IViewsService } from "../../../services/views/common/viewsService.js";
import { ChatContextKeys } from "../common/chatContextKeys.js";
import { CHAT_VIEW_ID, showChatView } from "./chat.js";
import { CHAT_SIDEBAR_OLD_VIEW_PANEL_ID, CHAT_SIDEBAR_PANEL_ID } from "./chatViewPane.js";
class MovedChatViewPane extends ViewPane {
  static {
    __name(this, "MovedChatViewPane");
  }
  shouldShowWelcome() {
    return true;
  }
}
let MoveChatViewContribution = class extends Disposable {
  constructor(contextKeyService, viewDescriptorService, extensionManagementService, productService, viewsService, paneCompositePartService, storageService, configurationService, keybindingService) {
    super();
    this.contextKeyService = contextKeyService;
    this.viewDescriptorService = viewDescriptorService;
    this.extensionManagementService = extensionManagementService;
    this.productService = productService;
    this.viewsService = viewsService;
    this.paneCompositePartService = paneCompositePartService;
    this.storageService = storageService;
    this.configurationService = configurationService;
    this.keybindingService = keybindingService;
    this.initialize();
  }
  static {
    __name(this, "MoveChatViewContribution");
  }
  static ID = "workbench.contrib.chatMovedViewWelcomeView";
  static hideMovedChatWelcomeViewStorageKey = "workbench.chat.hideMovedChatWelcomeView";
  showWelcomeViewCtx = ChatContextKeys.shouldShowMovedViewWelcome.bindTo(this.contextKeyService);
  async initialize() {
    const hidden = this.storageService.getBoolean(MoveChatViewContribution.hideMovedChatWelcomeViewStorageKey, StorageScope.APPLICATION, false);
    if (hidden) {
      this.registerKeybindings();
      return;
    }
    await this.hideViewIfCopilotIsNotInstalled();
    this.updateContextKey();
    this.registerListeners();
    this.registerKeybindings();
    this.registerCommands();
    this.registerMovedChatWelcomeView();
    this.hideViewIfOldViewIsMovedFromDefaultLocation();
  }
  markViewToHide() {
    this.storageService.store(MoveChatViewContribution.hideMovedChatWelcomeViewStorageKey, true, StorageScope.APPLICATION, StorageTarget.USER);
    this.updateContextKey();
  }
  async hideViewIfCopilotIsNotInstalled() {
    const extensions = await this.extensionManagementService.getInstalled();
    const installed = extensions.find((value) => ExtensionIdentifier.equals(value.identifier.id, this.productService.gitHubEntitlement?.extensionId));
    if (!installed) {
      this.markViewToHide();
    }
  }
  hideViewIfOldViewIsMovedFromDefaultLocation() {
    const newViewContainer = this.viewDescriptorService.getViewContainerById(CHAT_SIDEBAR_PANEL_ID);
    if (!newViewContainer) {
      return;
    }
    const currentChatViewContainer = this.viewDescriptorService.getViewContainerByViewId(CHAT_VIEW_ID);
    if (currentChatViewContainer !== newViewContainer) {
      this.markViewToHide();
      return;
    }
    const oldViewContainer = this.viewDescriptorService.getViewContainerById(CHAT_SIDEBAR_OLD_VIEW_PANEL_ID);
    if (!oldViewContainer) {
      return;
    }
    const oldLocation = this.viewDescriptorService.getViewContainerLocation(oldViewContainer);
    if (oldLocation === ViewContainerLocation.AuxiliaryBar) {
      this.markViewToHide();
    }
  }
  updateContextKey() {
    const hidden = this.storageService.getBoolean(MoveChatViewContribution.hideMovedChatWelcomeViewStorageKey, StorageScope.APPLICATION, false);
    this.showWelcomeViewCtx.set(!hidden);
  }
  registerListeners() {
    this._register(this.storageService.onDidChangeValue(StorageScope.APPLICATION, MoveChatViewContribution.hideMovedChatWelcomeViewStorageKey, this._store)(() => this.updateContextKey()));
  }
  registerKeybindings() {
    KeybindingsRegistry.registerCommandAndKeybindingRule({
      id: CHAT_SIDEBAR_OLD_VIEW_PANEL_ID,
      weight: KeybindingWeight.WorkbenchContrib,
      when: ChatContextKeys.panelParticipantRegistered,
      primary: 0,
      handler: /* @__PURE__ */ __name((accessor) => showChatView(accessor.get(IViewsService)), "handler")
    });
  }
  registerCommands() {
    CommandsRegistry.registerCommand({
      id: "_chatMovedViewWelcomeView.ok",
      handler: /* @__PURE__ */ __name(async (accessor) => {
        showChatView(accessor.get(IViewsService));
        this.markViewToHide();
      }, "handler")
    });
    CommandsRegistry.registerCommand({
      id: "_chatMovedViewWelcomeView.restore",
      handler: /* @__PURE__ */ __name(async () => {
        const oldViewContainer = this.viewDescriptorService.getViewContainerById(CHAT_SIDEBAR_OLD_VIEW_PANEL_ID);
        const newViewContainer = this.viewDescriptorService.getViewContainerById(CHAT_SIDEBAR_PANEL_ID);
        if (!oldViewContainer || !newViewContainer) {
          this.markViewToHide();
          return;
        }
        const oldLocation = this.viewDescriptorService.getViewContainerLocation(oldViewContainer);
        const newLocation = this.viewDescriptorService.getViewContainerLocation(newViewContainer);
        if (oldLocation === newLocation || oldLocation === null || newLocation === null) {
          this.markViewToHide();
          return;
        }
        const viewContainerIds = this.paneCompositePartService.getPaneCompositeIds(oldLocation);
        const targetIndex = viewContainerIds.indexOf(oldViewContainer.id);
        this.viewDescriptorService.moveViewContainerToLocation(newViewContainer, oldLocation, targetIndex);
        this.viewsService.openViewContainer(newViewContainer.id, true);
        this.markViewToHide();
      }, "handler")
    });
    CommandsRegistry.registerCommand({
      id: "_chatMovedViewWelcomeView.learnMore",
      handler: /* @__PURE__ */ __name(async (accessor) => {
        const openerService = accessor.get(IOpenerService);
        openerService.open(URI.parse("https://aka.ms/vscode-secondary-sidebar"));
      }, "handler")
    });
  }
  registerMovedChatWelcomeView() {
    const title = localize2("chat.viewContainer.movedChat.label", "Chat (Old Location)");
    const icon = Codicon.commentDiscussion;
    const viewContainerId = CHAT_SIDEBAR_OLD_VIEW_PANEL_ID;
    const viewContainer = Registry.as(ViewExtensions.ViewContainersRegistry).registerViewContainer({
      id: viewContainerId,
      title,
      icon,
      ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [viewContainerId, { mergeViewWithContainerWhenSingleView: true }]),
      storageId: viewContainerId,
      hideIfEmpty: true,
      order: 100
    }, ViewContainerLocation.Sidebar, { doNotRegisterOpenCommand: true });
    const viewId = "workbench.chat.movedView.welcomeView";
    const viewDescriptor = {
      id: viewId,
      name: title,
      order: 1,
      canToggleVisibility: false,
      canMoveView: false,
      when: ContextKeyExpr.and(ChatContextKeys.shouldShowMovedViewWelcome, ContextKeyExpr.or(ChatContextKeys.panelParticipantRegistered, ChatContextKeys.extensionInvalid)),
      ctorDescriptor: new SyncDescriptor(MovedChatViewPane, [{ id: viewId }])
    };
    Registry.as(ViewExtensions.ViewsRegistry).registerViews([viewDescriptor], viewContainer);
    const secondarySideBarLeft = this.configurationService.getValue("workbench.sideBar.location") !== "left";
    let welcomeViewMainMessage = secondarySideBarLeft ? localize("chatMovedMainMessage1Left", "Chat has been moved to the Secondary Side Bar on the left for a more integrated AI experience in your editor.") : localize("chatMovedMainMessage1Right", "Chat has been moved to the Secondary Side Bar on the right for a more integrated AI experience in your editor.");
    const chatViewKeybinding = this.keybindingService.lookupKeybinding(CHAT_SIDEBAR_PANEL_ID)?.getLabel();
    const copilotIcon = `$(${this.productService.defaultChatAgent?.icon ?? "comment-discussion"})`;
    let quicklyAccessMessage = void 0;
    if (this.hasCommandCenterChat() && chatViewKeybinding) {
      quicklyAccessMessage = localize("chatMovedCommandCenterAndKeybind", "You can quickly access Chat via the new Copilot icon ({0}) in the editor title bar or with the keyboard shortcut {1}.", copilotIcon, chatViewKeybinding);
    } else if (this.hasCommandCenterChat()) {
      quicklyAccessMessage = localize("chatMovedCommandCenter", "You can quickly access Chat via the new Copilot icon ({0}) in the editor title bar.", copilotIcon);
    } else if (chatViewKeybinding) {
      quicklyAccessMessage = localize("chatMovedKeybind", "You can quickly access Chat with the keyboard shortcut {0}.", chatViewKeybinding);
    }
    if (quicklyAccessMessage) {
      welcomeViewMainMessage = `${welcomeViewMainMessage}

${quicklyAccessMessage}`;
    }
    const okButton = `[${localize("ok", "Got it")}](command:_chatMovedViewWelcomeView.ok)`;
    const restoreButton = `[${localize("restore", "Restore Old Location")}](command:_chatMovedViewWelcomeView.restore)`;
    const welcomeViewFooterMessage = localize("chatMovedFooterMessage", "[Learn more](command:_chatMovedViewWelcomeView.learnMore) about the Secondary Side Bar.");
    const viewsRegistry = Registry.as(ViewExtensions.ViewsRegistry);
    return viewsRegistry.registerViewWelcomeContent(viewId, {
      content: [welcomeViewMainMessage, okButton, restoreButton, welcomeViewFooterMessage].join("\n\n"),
      renderSecondaryButtons: true,
      when: ContextKeyExpr.and(ChatContextKeys.shouldShowMovedViewWelcome, ContextKeyExpr.or(ChatContextKeys.panelParticipantRegistered, ChatContextKeys.extensionInvalid))
    });
  }
  hasCommandCenterChat() {
    if (this.configurationService.getValue("chat.commandCenter.enabled") === false || this.configurationService.getValue("window.commandCenter") === false) {
      return false;
    }
    return true;
  }
};
MoveChatViewContribution = __decorateClass([
  __decorateParam(0, IContextKeyService),
  __decorateParam(1, IViewDescriptorService),
  __decorateParam(2, IExtensionManagementService),
  __decorateParam(3, IProductService),
  __decorateParam(4, IViewsService),
  __decorateParam(5, IPaneCompositePartService),
  __decorateParam(6, IStorageService),
  __decorateParam(7, IConfigurationService),
  __decorateParam(8, IKeybindingService)
], MoveChatViewContribution);
registerWorkbenchContribution2(MoveChatViewContribution.ID, MoveChatViewContribution, WorkbenchPhase.BlockStartup);
export {
  MoveChatViewContribution,
  MovedChatViewPane
};
//# sourceMappingURL=chatMovedView.contribution.js.map
