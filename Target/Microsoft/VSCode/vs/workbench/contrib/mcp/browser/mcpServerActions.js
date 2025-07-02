var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var InstallAction_1, UninstallAction_1, ManageMcpServerAction_1, StartServerAction_1, StopServerAction_1, RestartServerAction_1, AuthServerAction_1, ShowServerOutputAction_1, ShowServerConfigurationAction_1, ConfigureModelAccessAction_1, ShowSamplingRequestsAction_1, BrowseResourcesAction_1;
import { ActionViewItem } from "../../../../base/browser/ui/actionbar/actionViewItems.js";
import { Action, Separator } from "../../../../base/common/actions.js";
import { disposeIfDisposable } from "../../../../base/common/lifecycle.js";
import { ThemeIcon } from "../../../../base/common/themables.js";
import { localize } from "../../../../nls.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { manageExtensionIcon } from "../../extensions/browser/extensionsIcons.js";
import { getDomNodePagePosition } from "../../../../base/browser/dom.js";
import { IMcpSamplingService, IMcpService, IMcpWorkbenchService, McpConnectionState } from "../common/mcpTypes.js";
import { IMcpRegistry } from "../common/mcpRegistryTypes.js";
import { URI } from "../../../../base/common/uri.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IAuthenticationQueryService } from "../../../services/authentication/common/authenticationQuery.js";
import { IAuthenticationService } from "../../../services/authentication/common/authentication.js";
class McpServerAction extends Action {
  static {
    __name(this, "McpServerAction");
  }
  constructor() {
    super(...arguments);
    this._mcpServer = null;
  }
  static {
    this.EXTENSION_ACTION_CLASS = "extension-action";
  }
  static {
    this.TEXT_ACTION_CLASS = `${McpServerAction.EXTENSION_ACTION_CLASS} text`;
  }
  static {
    this.LABEL_ACTION_CLASS = `${McpServerAction.EXTENSION_ACTION_CLASS} label`;
  }
  static {
    this.PROMINENT_LABEL_ACTION_CLASS = `${McpServerAction.LABEL_ACTION_CLASS} prominent`;
  }
  static {
    this.ICON_ACTION_CLASS = `${McpServerAction.EXTENSION_ACTION_CLASS} icon`;
  }
  get mcpServer() {
    return this._mcpServer;
  }
  set mcpServer(mcpServer) {
    this._mcpServer = mcpServer;
    this.update();
  }
}
let DropDownAction = class DropDownAction2 extends McpServerAction {
  static {
    __name(this, "DropDownAction");
  }
  constructor(id, label, cssClass, enabled, instantiationService) {
    super(id, label, cssClass, enabled);
    this.instantiationService = instantiationService;
    this._actionViewItem = null;
  }
  createActionViewItem(options) {
    this._actionViewItem = this.instantiationService.createInstance(DropDownExtensionActionViewItem, this, options);
    return this._actionViewItem;
  }
  run(actionGroups) {
    this._actionViewItem?.showMenu(actionGroups);
    return Promise.resolve();
  }
};
DropDownAction = __decorate([
  __param(4, IInstantiationService)
], DropDownAction);
let DropDownExtensionActionViewItem = class DropDownExtensionActionViewItem2 extends ActionViewItem {
  static {
    __name(this, "DropDownExtensionActionViewItem");
  }
  constructor(action, options, contextMenuService) {
    super(null, action, { ...options, icon: true, label: true });
    this.contextMenuService = contextMenuService;
  }
  showMenu(menuActionGroups) {
    if (this.element) {
      const actions = this.getActions(menuActionGroups);
      const elementPosition = getDomNodePagePosition(this.element);
      const anchor = { x: elementPosition.left, y: elementPosition.top + elementPosition.height + 10 };
      this.contextMenuService.showContextMenu({
        getAnchor: /* @__PURE__ */ __name(() => anchor, "getAnchor"),
        getActions: /* @__PURE__ */ __name(() => actions, "getActions"),
        actionRunner: this.actionRunner,
        onHide: /* @__PURE__ */ __name(() => disposeIfDisposable(actions), "onHide")
      });
    }
  }
  getActions(menuActionGroups) {
    let actions = [];
    for (const menuActions of menuActionGroups) {
      actions = [...actions, ...menuActions, new Separator()];
    }
    return actions.length ? actions.slice(0, actions.length - 1) : actions;
  }
};
DropDownExtensionActionViewItem = __decorate([
  __param(2, IContextMenuService)
], DropDownExtensionActionViewItem);
let InstallAction = class InstallAction2 extends McpServerAction {
  static {
    __name(this, "InstallAction");
  }
  static {
    InstallAction_1 = this;
  }
  static {
    this.CLASS = `${this.LABEL_ACTION_CLASS} prominent install`;
  }
  static {
    this.HIDE = `${this.CLASS} hide`;
  }
  constructor(mcpWorkbenchService) {
    super("extensions.install", localize("install", "Install"), InstallAction_1.CLASS, false);
    this.mcpWorkbenchService = mcpWorkbenchService;
    this.update();
  }
  update() {
    this.enabled = false;
    this.class = InstallAction_1.HIDE;
    if (this.mcpServer?.local) {
      return;
    }
    if (!this.mcpServer?.gallery && !this.mcpServer?.installable) {
      return;
    }
    this.class = InstallAction_1.CLASS;
    this.enabled = true;
    this.label = localize("install", "Install");
  }
  async run() {
    if (!this.mcpServer) {
      return;
    }
    await this.mcpWorkbenchService.install(this.mcpServer);
  }
};
InstallAction = InstallAction_1 = __decorate([
  __param(0, IMcpWorkbenchService)
], InstallAction);
let UninstallAction = class UninstallAction2 extends McpServerAction {
  static {
    __name(this, "UninstallAction");
  }
  static {
    UninstallAction_1 = this;
  }
  static {
    this.CLASS = `${this.LABEL_ACTION_CLASS} prominent uninstall`;
  }
  static {
    this.HIDE = `${this.CLASS} hide`;
  }
  constructor(mcpWorkbenchService) {
    super("extensions.uninstall", localize("uninstall", "Uninstall"), UninstallAction_1.CLASS, false);
    this.mcpWorkbenchService = mcpWorkbenchService;
    this.update();
  }
  update() {
    this.enabled = false;
    this.class = UninstallAction_1.HIDE;
    if (!this.mcpServer) {
      return;
    }
    if (!this.mcpServer.local) {
      return;
    }
    this.class = UninstallAction_1.CLASS;
    this.enabled = true;
    this.label = localize("uninstall", "Uninstall");
  }
  async run() {
    if (!this.mcpServer) {
      return;
    }
    await this.mcpWorkbenchService.uninstall(this.mcpServer);
  }
};
UninstallAction = UninstallAction_1 = __decorate([
  __param(0, IMcpWorkbenchService)
], UninstallAction);
let ManageMcpServerAction = class ManageMcpServerAction2 extends DropDownAction {
  static {
    __name(this, "ManageMcpServerAction");
  }
  static {
    ManageMcpServerAction_1 = this;
  }
  static {
    this.ID = "mcpServer.manage";
  }
  static {
    this.Class = `${McpServerAction.ICON_ACTION_CLASS} manage ` + ThemeIcon.asClassName(manageExtensionIcon);
  }
  static {
    this.HideManageExtensionClass = `${this.Class} hide`;
  }
  constructor(isEditorAction, instantiationService) {
    super(ManageMcpServerAction_1.ID, "", "", true, instantiationService);
    this.isEditorAction = isEditorAction;
    this.tooltip = localize("manage", "Manage");
    this.update();
  }
  async getActionGroups() {
    const groups = [];
    groups.push([
      this.instantiationService.createInstance(StartServerAction)
    ]);
    groups.push([
      this.instantiationService.createInstance(StopServerAction),
      this.instantiationService.createInstance(RestartServerAction)
    ]);
    groups.push([
      this.instantiationService.createInstance(AuthServerAction)
    ]);
    groups.push([
      this.instantiationService.createInstance(ShowServerOutputAction),
      this.instantiationService.createInstance(ShowServerConfigurationAction)
    ]);
    groups.push([
      this.instantiationService.createInstance(ConfigureModelAccessAction),
      this.instantiationService.createInstance(ShowSamplingRequestsAction)
    ]);
    groups.push([
      this.instantiationService.createInstance(BrowseResourcesAction)
    ]);
    if (!this.isEditorAction) {
      groups.push([
        this.instantiationService.createInstance(UninstallAction)
      ]);
    }
    groups.forEach((group) => group.forEach((extensionAction) => {
      if (extensionAction instanceof McpServerAction) {
        extensionAction.mcpServer = this.mcpServer;
      }
    }));
    return groups;
  }
  async run() {
    return super.run(await this.getActionGroups());
  }
  update() {
    this.class = ManageMcpServerAction_1.HideManageExtensionClass;
    this.enabled = false;
    if (this.mcpServer) {
      this.enabled = !!this.mcpServer.local;
      this.class = this.enabled ? ManageMcpServerAction_1.Class : ManageMcpServerAction_1.HideManageExtensionClass;
    }
  }
};
ManageMcpServerAction = ManageMcpServerAction_1 = __decorate([
  __param(1, IInstantiationService)
], ManageMcpServerAction);
let StartServerAction = class StartServerAction2 extends McpServerAction {
  static {
    __name(this, "StartServerAction");
  }
  static {
    StartServerAction_1 = this;
  }
  static {
    this.CLASS = `${this.LABEL_ACTION_CLASS} prominent start`;
  }
  static {
    this.HIDE = `${this.CLASS} hide`;
  }
  constructor(mcpService) {
    super("extensions.start", localize("start", "Start Server"), StartServerAction_1.CLASS, false);
    this.mcpService = mcpService;
    this.update();
  }
  update() {
    this.enabled = false;
    this.class = StartServerAction_1.HIDE;
    const server = this.getServer();
    if (!server) {
      return;
    }
    const serverState = server.connectionState.get();
    if (!McpConnectionState.canBeStarted(serverState.state)) {
      return;
    }
    this.class = StartServerAction_1.CLASS;
    this.enabled = true;
    this.label = localize("start", "Start Server");
  }
  async run() {
    const server = this.getServer();
    if (!server) {
      return;
    }
    await server.start({ isFromInteraction: true });
    server.showOutput();
  }
  getServer() {
    if (!this.mcpServer) {
      return;
    }
    if (!this.mcpServer.local) {
      return;
    }
    return this.mcpService.servers.get().find((s) => s.definition.label === this.mcpServer?.name);
  }
};
StartServerAction = StartServerAction_1 = __decorate([
  __param(0, IMcpService)
], StartServerAction);
let StopServerAction = class StopServerAction2 extends McpServerAction {
  static {
    __name(this, "StopServerAction");
  }
  static {
    StopServerAction_1 = this;
  }
  static {
    this.CLASS = `${this.LABEL_ACTION_CLASS} prominent stop`;
  }
  static {
    this.HIDE = `${this.CLASS} hide`;
  }
  constructor(mcpService) {
    super("extensions.stop", localize("stop", "Stop Server"), StopServerAction_1.CLASS, false);
    this.mcpService = mcpService;
    this.update();
  }
  update() {
    this.enabled = false;
    this.class = StopServerAction_1.HIDE;
    const server = this.getServer();
    if (!server) {
      return;
    }
    const serverState = server.connectionState.get();
    if (McpConnectionState.canBeStarted(serverState.state)) {
      return;
    }
    this.class = StopServerAction_1.CLASS;
    this.enabled = true;
    this.label = localize("stop", "Stop Server");
  }
  async run() {
    const server = this.getServer();
    if (!server) {
      return;
    }
    await server.stop();
  }
  getServer() {
    if (!this.mcpServer) {
      return;
    }
    if (!this.mcpServer.local) {
      return;
    }
    return this.mcpService.servers.get().find((s) => s.definition.label === this.mcpServer?.name);
  }
};
StopServerAction = StopServerAction_1 = __decorate([
  __param(0, IMcpService)
], StopServerAction);
let RestartServerAction = class RestartServerAction2 extends McpServerAction {
  static {
    __name(this, "RestartServerAction");
  }
  static {
    RestartServerAction_1 = this;
  }
  static {
    this.CLASS = `${this.LABEL_ACTION_CLASS} prominent restart`;
  }
  static {
    this.HIDE = `${this.CLASS} hide`;
  }
  constructor(mcpService) {
    super("extensions.restart", localize("restart", "Restart Server"), RestartServerAction_1.CLASS, false);
    this.mcpService = mcpService;
    this.update();
  }
  update() {
    this.enabled = false;
    this.class = RestartServerAction_1.HIDE;
    const server = this.getServer();
    if (!server) {
      return;
    }
    const serverState = server.connectionState.get();
    if (McpConnectionState.canBeStarted(serverState.state)) {
      return;
    }
    this.class = RestartServerAction_1.CLASS;
    this.enabled = true;
    this.label = localize("restart", "Restart Server");
  }
  async run() {
    const server = this.getServer();
    if (!server) {
      return;
    }
    await server.stop();
    await server.start({ isFromInteraction: true });
    server.showOutput();
  }
  getServer() {
    if (!this.mcpServer) {
      return;
    }
    if (!this.mcpServer.local) {
      return;
    }
    return this.mcpService.servers.get().find((s) => s.definition.label === this.mcpServer?.name);
  }
};
RestartServerAction = RestartServerAction_1 = __decorate([
  __param(0, IMcpService)
], RestartServerAction);
let AuthServerAction = class AuthServerAction2 extends McpServerAction {
  static {
    __name(this, "AuthServerAction");
  }
  static {
    AuthServerAction_1 = this;
  }
  static {
    this.CLASS = `${this.LABEL_ACTION_CLASS} prominent account`;
  }
  static {
    this.HIDE = `${this.CLASS} hide`;
  }
  static {
    this.SIGN_OUT = localize("mcp.signOut", "Sign Out");
  }
  static {
    this.DISCONNECT = localize("mcp.disconnect", "Disconnect Account");
  }
  constructor(mcpService, _authenticationQueryService, _authenticationService) {
    super("extensions.restart", localize("restart", "Restart Server"), RestartServerAction.CLASS, false);
    this.mcpService = mcpService;
    this._authenticationQueryService = _authenticationQueryService;
    this._authenticationService = _authenticationService;
    this.update();
  }
  update() {
    this.enabled = false;
    this.class = AuthServerAction_1.HIDE;
    const server = this.getServer();
    if (!server) {
      return;
    }
    const accountQuery = this.getAccountQuery();
    if (!accountQuery) {
      return;
    }
    this._accountQuery = accountQuery;
    this.class = AuthServerAction_1.CLASS;
    this.enabled = true;
    let label = accountQuery.entities().getEntityCount().total > 1 ? AuthServerAction_1.DISCONNECT : AuthServerAction_1.SIGN_OUT;
    label += ` (${accountQuery.accountName})`;
    this.label = label;
  }
  async run() {
    const server = this.getServer();
    if (!server) {
      return;
    }
    const accountQuery = this.getAccountQuery();
    if (!accountQuery) {
      return;
    }
    await server.stop();
    const { providerId, accountName } = accountQuery;
    accountQuery.mcpServer(server.definition.id).setAccessAllowed(false, server.definition.label);
    if (this.label === AuthServerAction_1.SIGN_OUT) {
      const accounts = await this._authenticationService.getAccounts(providerId);
      const account = accounts.find((a) => a.label === accountName);
      if (account) {
        const sessions = await this._authenticationService.getSessions(providerId, void 0, { account });
        for (const session of sessions) {
          await this._authenticationService.removeSession(providerId, session.id);
        }
      }
    }
  }
  getServer() {
    if (!this.mcpServer) {
      return;
    }
    if (!this.mcpServer.local) {
      return;
    }
    return this.mcpService.servers.get().find((s) => s.definition.label === this.mcpServer?.name);
  }
  getAccountQuery() {
    const server = this.getServer();
    if (!server) {
      return void 0;
    }
    if (this._accountQuery) {
      return this._accountQuery;
    }
    const serverId = server.definition.id;
    const preferences = this._authenticationQueryService.mcpServer(serverId).getAllAccountPreferences();
    if (!preferences.size) {
      return void 0;
    }
    for (const [providerId, accountName] of preferences) {
      const accountQuery = this._authenticationQueryService.provider(providerId).account(accountName);
      if (!accountQuery.mcpServer(serverId).isAccessAllowed()) {
        continue;
      }
      return accountQuery;
    }
    return void 0;
  }
};
AuthServerAction = AuthServerAction_1 = __decorate([
  __param(0, IMcpService),
  __param(1, IAuthenticationQueryService),
  __param(2, IAuthenticationService)
], AuthServerAction);
let ShowServerOutputAction = class ShowServerOutputAction2 extends McpServerAction {
  static {
    __name(this, "ShowServerOutputAction");
  }
  static {
    ShowServerOutputAction_1 = this;
  }
  static {
    this.CLASS = `${this.LABEL_ACTION_CLASS} prominent output`;
  }
  static {
    this.HIDE = `${this.CLASS} hide`;
  }
  constructor(mcpService) {
    super("extensions.output", localize("output", "Show Output"), ShowServerOutputAction_1.CLASS, false);
    this.mcpService = mcpService;
    this.update();
  }
  update() {
    this.enabled = false;
    this.class = ShowServerOutputAction_1.HIDE;
    const server = this.getServer();
    if (!server) {
      return;
    }
    this.class = ShowServerOutputAction_1.CLASS;
    this.enabled = true;
    this.label = localize("output", "Show Output");
  }
  async run() {
    const server = this.getServer();
    if (!server) {
      return;
    }
    server.showOutput();
  }
  getServer() {
    if (!this.mcpServer) {
      return;
    }
    if (!this.mcpServer.local) {
      return;
    }
    return this.mcpService.servers.get().find((s) => s.definition.label === this.mcpServer?.name);
  }
};
ShowServerOutputAction = ShowServerOutputAction_1 = __decorate([
  __param(0, IMcpService)
], ShowServerOutputAction);
let ShowServerConfigurationAction = class ShowServerConfigurationAction2 extends McpServerAction {
  static {
    __name(this, "ShowServerConfigurationAction");
  }
  static {
    ShowServerConfigurationAction_1 = this;
  }
  static {
    this.CLASS = `${this.LABEL_ACTION_CLASS} prominent config`;
  }
  static {
    this.HIDE = `${this.CLASS} hide`;
  }
  constructor(mcpService, mcpRegistry, editorService) {
    super("extensions.config", localize("config", "Show Configuration"), ShowServerConfigurationAction_1.CLASS, false);
    this.mcpService = mcpService;
    this.mcpRegistry = mcpRegistry;
    this.editorService = editorService;
    this.update();
  }
  update() {
    this.enabled = false;
    this.class = ShowServerConfigurationAction_1.HIDE;
    const configurationTarget = this.getConfigurationTarget();
    if (!configurationTarget) {
      return;
    }
    this.class = ShowServerConfigurationAction_1.CLASS;
    this.enabled = true;
    this.label = localize("config", "Show Configuration");
  }
  async run() {
    const configurationTarget = this.getConfigurationTarget();
    if (!configurationTarget) {
      return;
    }
    this.editorService.openEditor({
      resource: URI.isUri(configurationTarget) ? configurationTarget : configurationTarget.uri,
      options: { selection: URI.isUri(configurationTarget) ? void 0 : configurationTarget.range }
    });
  }
  getConfigurationTarget() {
    if (!this.mcpServer) {
      return;
    }
    if (!this.mcpServer.local) {
      return;
    }
    const server = this.mcpService.servers.get().find((s) => s.definition.label === this.mcpServer?.name);
    if (!server) {
      return;
    }
    const collection = this.mcpRegistry.collections.get().find((c) => c.id === server.collection.id);
    const serverDefinition = collection?.serverDefinitions.get().find((s) => s.id === server.definition.id);
    return serverDefinition?.presentation?.origin || collection?.presentation?.origin;
  }
};
ShowServerConfigurationAction = ShowServerConfigurationAction_1 = __decorate([
  __param(0, IMcpService),
  __param(1, IMcpRegistry),
  __param(2, IEditorService)
], ShowServerConfigurationAction);
let ConfigureModelAccessAction = class ConfigureModelAccessAction2 extends McpServerAction {
  static {
    __name(this, "ConfigureModelAccessAction");
  }
  static {
    ConfigureModelAccessAction_1 = this;
  }
  static {
    this.CLASS = `${this.LABEL_ACTION_CLASS} prominent config`;
  }
  static {
    this.HIDE = `${this.CLASS} hide`;
  }
  constructor(mcpService, commandService) {
    super("extensions.config", localize("mcp.configAccess", "Configure Model Access"), ConfigureModelAccessAction_1.CLASS, false);
    this.mcpService = mcpService;
    this.commandService = commandService;
    this.update();
  }
  update() {
    this.enabled = false;
    this.class = ConfigureModelAccessAction_1.HIDE;
    const server = this.getServer();
    if (!server) {
      return;
    }
    this.class = ConfigureModelAccessAction_1.CLASS;
    this.enabled = true;
    this.label = localize("mcp.configAccess", "Configure Model Access");
  }
  async run() {
    const server = this.getServer();
    if (!server) {
      return;
    }
    this.commandService.executeCommand("workbench.mcp.configureSamplingModels", server);
  }
  getServer() {
    if (!this.mcpServer) {
      return;
    }
    if (!this.mcpServer.local) {
      return;
    }
    return this.mcpService.servers.get().find((s) => s.definition.label === this.mcpServer?.name);
  }
};
ConfigureModelAccessAction = ConfigureModelAccessAction_1 = __decorate([
  __param(0, IMcpService),
  __param(1, ICommandService)
], ConfigureModelAccessAction);
let ShowSamplingRequestsAction = class ShowSamplingRequestsAction2 extends McpServerAction {
  static {
    __name(this, "ShowSamplingRequestsAction");
  }
  static {
    ShowSamplingRequestsAction_1 = this;
  }
  static {
    this.CLASS = `${this.LABEL_ACTION_CLASS} prominent config`;
  }
  static {
    this.HIDE = `${this.CLASS} hide`;
  }
  constructor(mcpService, samplingService, editorService) {
    super("extensions.config", localize("mcp.samplingLog", "Show Sampling Requests"), ShowSamplingRequestsAction_1.CLASS, false);
    this.mcpService = mcpService;
    this.samplingService = samplingService;
    this.editorService = editorService;
    this.update();
  }
  update() {
    this.enabled = false;
    this.class = ShowSamplingRequestsAction_1.HIDE;
    const server = this.getServer();
    if (!server) {
      return;
    }
    if (!this.samplingService.hasLogs(server)) {
      return;
    }
    this.class = ShowSamplingRequestsAction_1.CLASS;
    this.enabled = true;
  }
  async run() {
    const server = this.getServer();
    if (!server) {
      return;
    }
    if (!this.samplingService.hasLogs(server)) {
      return;
    }
    this.editorService.openEditor({
      resource: void 0,
      contents: this.samplingService.getLogText(server),
      label: localize("mcp.samplingLog.title", "MCP Sampling: {0}", server.definition.label)
    });
  }
  getServer() {
    if (!this.mcpServer) {
      return;
    }
    if (!this.mcpServer.local) {
      return;
    }
    return this.mcpService.servers.get().find((s) => s.definition.label === this.mcpServer?.name);
  }
};
ShowSamplingRequestsAction = ShowSamplingRequestsAction_1 = __decorate([
  __param(0, IMcpService),
  __param(1, IMcpSamplingService),
  __param(2, IEditorService)
], ShowSamplingRequestsAction);
let BrowseResourcesAction = class BrowseResourcesAction2 extends McpServerAction {
  static {
    __name(this, "BrowseResourcesAction");
  }
  static {
    BrowseResourcesAction_1 = this;
  }
  static {
    this.CLASS = `${this.LABEL_ACTION_CLASS} prominent config`;
  }
  static {
    this.HIDE = `${this.CLASS} hide`;
  }
  constructor(mcpService, commandService) {
    super("extensions.config", localize("mcp.resources", "Browse Resources"), BrowseResourcesAction_1.CLASS, false);
    this.mcpService = mcpService;
    this.commandService = commandService;
    this.update();
  }
  update() {
    this.enabled = false;
    this.class = BrowseResourcesAction_1.HIDE;
    const server = this.getServer();
    if (!server) {
      return;
    }
    const capabilities = server.capabilities.get();
    if (capabilities !== void 0 && !(capabilities & 16)) {
      return;
    }
    this.class = BrowseResourcesAction_1.CLASS;
    this.enabled = true;
  }
  async run() {
    const server = this.getServer();
    if (!server) {
      return;
    }
    const capabilities = server.capabilities.get();
    if (capabilities !== void 0 && !(capabilities & 16)) {
      return;
    }
    return this.commandService.executeCommand("workbench.mcp.browseResources", server);
  }
  getServer() {
    if (!this.mcpServer) {
      return;
    }
    if (!this.mcpServer.local) {
      return;
    }
    return this.mcpService.servers.get().find((s) => s.definition.label === this.mcpServer?.name);
  }
};
BrowseResourcesAction = BrowseResourcesAction_1 = __decorate([
  __param(0, IMcpService),
  __param(1, ICommandService)
], BrowseResourcesAction);
export {
  AuthServerAction,
  BrowseResourcesAction,
  ConfigureModelAccessAction,
  DropDownAction,
  DropDownExtensionActionViewItem,
  InstallAction,
  ManageMcpServerAction,
  McpServerAction,
  RestartServerAction,
  ShowSamplingRequestsAction,
  ShowServerConfigurationAction,
  ShowServerOutputAction,
  StartServerAction,
  StopServerAction,
  UninstallAction
};
//# sourceMappingURL=mcpServerActions.js.map
