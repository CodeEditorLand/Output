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
import { Disposable, DisposableStore } from "../../../../base/common/lifecycle.js";
import { IMcpManagementService, IMcpGalleryService } from "../../../../platform/mcp/common/mcpManagement.js";
import { createDecorator, IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IUserDataProfileService } from "../../../services/userDataProfile/common/userDataProfile.js";
import { registerSingleton } from "../../../../platform/instantiation/common/extensions.js";
import { Emitter } from "../../../../base/common/event.js";
import { IMcpResourceScannerService } from "../../../../platform/mcp/common/mcpResourceScannerService.js";
import { isWorkspaceFolder, IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { MCP_CONFIGURATION_KEY, WORKSPACE_STANDALONE_CONFIGURATIONS } from "../../configuration/common/configuration.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IRemoteAgentService } from "../../remote/common/remoteAgentService.js";
import { McpManagementChannelClient } from "../../../../platform/mcp/common/mcpManagementIpc.js";
import { IUserDataProfilesService } from "../../../../platform/userDataProfile/common/userDataProfile.js";
import { IRemoteUserDataProfilesService } from "../../userDataProfile/common/remoteUserDataProfiles.js";
import { AbstractMcpResourceManagementService } from "../../../../platform/mcp/common/mcpManagementService.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { ResourceMap } from "../../../../base/common/map.js";
var LocalMcpServerScope;
(function(LocalMcpServerScope2) {
  LocalMcpServerScope2["User"] = "user";
  LocalMcpServerScope2["RemoteUser"] = "remoteUser";
  LocalMcpServerScope2["Workspace"] = "workspace";
})(LocalMcpServerScope || (LocalMcpServerScope = {}));
const IWorkbenchMcpManagementService = createDecorator("workbenchMcpManagementService");
let WorkbenchMcpManagementService = class WorkbenchMcpManagementService2 extends Disposable {
  static {
    __name(this, "WorkbenchMcpManagementService");
  }
  constructor(userDataProfileService, uriIdentityService, workspaceContextService, mcpManagementService, remoteAgentService, userDataProfilesService, remoteUserDataProfilesService, instantiationService) {
    super();
    this.userDataProfileService = userDataProfileService;
    this.uriIdentityService = uriIdentityService;
    this.workspaceContextService = workspaceContextService;
    this.mcpManagementService = mcpManagementService;
    this.userDataProfilesService = userDataProfilesService;
    this.remoteUserDataProfilesService = remoteUserDataProfilesService;
    this._onInstallMcpServer = this._register(new Emitter());
    this.onInstallMcpServer = this._onInstallMcpServer.event;
    this._onDidInstallMcpServers = this._register(new Emitter());
    this.onDidInstallMcpServers = this._onDidInstallMcpServers.event;
    this._onDidUpdateMcpServers = this._register(new Emitter());
    this.onDidUpdateMcpServers = this._onDidUpdateMcpServers.event;
    this._onUninstallMcpServer = this._register(new Emitter());
    this.onUninstallMcpServer = this._onUninstallMcpServer.event;
    this._onDidUninstallMcpServer = this._register(new Emitter());
    this.onDidUninstallMcpServer = this._onDidUninstallMcpServer.event;
    this._onInstallMcpServerInCurrentProfile = this._register(new Emitter());
    this.onInstallMcpServerInCurrentProfile = this._onInstallMcpServerInCurrentProfile.event;
    this._onDidInstallMcpServersInCurrentProfile = this._register(new Emitter());
    this.onDidInstallMcpServersInCurrentProfile = this._onDidInstallMcpServersInCurrentProfile.event;
    this._onDidUpdateMcpServersInCurrentProfile = this._register(new Emitter());
    this.onDidUpdateMcpServersInCurrentProfile = this._onDidUpdateMcpServersInCurrentProfile.event;
    this._onUninstallMcpServerInCurrentProfile = this._register(new Emitter());
    this.onUninstallMcpServerInCurrentProfile = this._onUninstallMcpServerInCurrentProfile.event;
    this._onDidUninstallMcpServerInCurrentProfile = this._register(new Emitter());
    this.onDidUninstallMcpServerInCurrentProfile = this._onDidUninstallMcpServerInCurrentProfile.event;
    this.workspaceMcpManagementService = this._register(instantiationService.createInstance(WorkspaceMcpManagementService));
    const remoteAgentConnection = remoteAgentService.getConnection();
    if (remoteAgentConnection) {
      this.remoteMcpManagementService = this._register(new McpManagementChannelClient(remoteAgentConnection.getChannel("mcpManagement")));
    }
    this._register(this.mcpManagementService.onInstallMcpServer((e) => {
      this._onInstallMcpServer.fire(e);
      if (uriIdentityService.extUri.isEqual(e.mcpResource, this.userDataProfileService.currentProfile.mcpResource)) {
        this._onInstallMcpServerInCurrentProfile.fire(e);
      }
    }));
    this._register(this.mcpManagementService.onDidInstallMcpServers((e) => this.handleInstallMcpServerResultsFromEvent(e, this._onDidInstallMcpServers, this._onDidInstallMcpServersInCurrentProfile)));
    this._register(this.mcpManagementService.onDidUpdateMcpServers((e) => this.handleInstallMcpServerResultsFromEvent(e, this._onDidUpdateMcpServers, this._onDidUpdateMcpServersInCurrentProfile)));
    this._register(this.mcpManagementService.onUninstallMcpServer((e) => {
      this._onUninstallMcpServer.fire(e);
      if (uriIdentityService.extUri.isEqual(e.mcpResource, this.userDataProfileService.currentProfile.mcpResource)) {
        this._onUninstallMcpServerInCurrentProfile.fire(e);
      }
    }));
    this._register(this.mcpManagementService.onDidUninstallMcpServer((e) => {
      this._onDidUninstallMcpServer.fire(e);
      if (uriIdentityService.extUri.isEqual(e.mcpResource, this.userDataProfileService.currentProfile.mcpResource)) {
        this._onDidUninstallMcpServerInCurrentProfile.fire(e);
      }
    }));
    this._register(this.workspaceMcpManagementService.onInstallMcpServer(async (e) => {
      this._onInstallMcpServer.fire(e);
      this._onInstallMcpServerInCurrentProfile.fire(e);
    }));
    this._register(this.workspaceMcpManagementService.onDidInstallMcpServers(async (e) => {
      const mcpServerInstallResult = [];
      for (const result of e) {
        const workbenchResult = {
          ...result,
          local: result.local ? this.toWorkspaceMcpServer(
            result.local,
            "workspace"
            /* LocalMcpServerScope.Workspace */
          ) : void 0
        };
        mcpServerInstallResult.push(workbenchResult);
      }
      this._onDidInstallMcpServersInCurrentProfile.fire(mcpServerInstallResult);
      this._onDidInstallMcpServersInCurrentProfile.fire(mcpServerInstallResult);
    }));
    this._register(this.workspaceMcpManagementService.onUninstallMcpServer(async (e) => {
      this._onUninstallMcpServer.fire(e);
      this._onUninstallMcpServerInCurrentProfile.fire(e);
    }));
    this._register(this.workspaceMcpManagementService.onDidUninstallMcpServer(async (e) => {
      this._onDidUninstallMcpServer.fire(e);
      this._onDidUninstallMcpServerInCurrentProfile.fire(e);
    }));
    if (this.remoteMcpManagementService) {
      this._register(this.remoteMcpManagementService.onInstallMcpServer(async (e) => {
        this._onInstallMcpServer.fire(e);
        const remoteMcpResource = await this.getRemoteMcpResource(this.userDataProfileService.currentProfile.mcpResource);
        if (remoteMcpResource ? uriIdentityService.extUri.isEqual(e.mcpResource, remoteMcpResource) : this.userDataProfileService.currentProfile.isDefault) {
          this._onInstallMcpServerInCurrentProfile.fire(e);
        }
      }));
      this._register(this.remoteMcpManagementService.onDidInstallMcpServers((e) => this.handleRemoteInstallMcpServerResultsFromEvent(e, this._onDidInstallMcpServers, this._onDidInstallMcpServersInCurrentProfile)));
      this._register(this.remoteMcpManagementService.onDidUpdateMcpServers((e) => this.handleRemoteInstallMcpServerResultsFromEvent(e, this._onDidInstallMcpServers, this._onDidInstallMcpServersInCurrentProfile)));
      this._register(this.remoteMcpManagementService.onUninstallMcpServer(async (e) => {
        this._onUninstallMcpServer.fire(e);
        const remoteMcpResource = await this.getRemoteMcpResource(this.userDataProfileService.currentProfile.mcpResource);
        if (remoteMcpResource ? uriIdentityService.extUri.isEqual(e.mcpResource, remoteMcpResource) : this.userDataProfileService.currentProfile.isDefault) {
          this._onUninstallMcpServerInCurrentProfile.fire(e);
        }
      }));
      this._register(this.remoteMcpManagementService.onDidUninstallMcpServer(async (e) => {
        this._onDidUninstallMcpServer.fire(e);
        const remoteMcpResource = await this.getRemoteMcpResource(this.userDataProfileService.currentProfile.mcpResource);
        if (remoteMcpResource ? uriIdentityService.extUri.isEqual(e.mcpResource, remoteMcpResource) : this.userDataProfileService.currentProfile.isDefault) {
          this._onDidUninstallMcpServerInCurrentProfile.fire(e);
        }
      }));
    }
  }
  handleInstallMcpServerResultsFromEvent(e, emitter, currentProfileEmitter) {
    const mcpServerInstallResult = [];
    const mcpServerInstallResultInCurrentProfile = [];
    for (const result of e) {
      const workbenchResult = {
        ...result,
        local: result.local ? this.toWorkspaceMcpServer(
          result.local,
          "user"
          /* LocalMcpServerScope.User */
        ) : void 0
      };
      mcpServerInstallResult.push(workbenchResult);
      if (this.uriIdentityService.extUri.isEqual(result.mcpResource, this.userDataProfileService.currentProfile.mcpResource)) {
        mcpServerInstallResultInCurrentProfile.push(workbenchResult);
      }
    }
    emitter.fire(mcpServerInstallResult);
    if (mcpServerInstallResultInCurrentProfile.length) {
      currentProfileEmitter.fire(mcpServerInstallResultInCurrentProfile);
    }
  }
  async handleRemoteInstallMcpServerResultsFromEvent(e, emitter, currentProfileEmitter) {
    const mcpServerInstallResult = [];
    const mcpServerInstallResultInCurrentProfile = [];
    const remoteMcpResource = await this.getRemoteMcpResource(this.userDataProfileService.currentProfile.mcpResource);
    for (const result of e) {
      const workbenchResult = {
        ...result,
        local: result.local ? this.toWorkspaceMcpServer(
          result.local,
          "remoteUser"
          /* LocalMcpServerScope.RemoteUser */
        ) : void 0
      };
      mcpServerInstallResult.push(workbenchResult);
      if (remoteMcpResource ? this.uriIdentityService.extUri.isEqual(result.mcpResource, remoteMcpResource) : this.userDataProfileService.currentProfile.isDefault) {
        mcpServerInstallResultInCurrentProfile.push(workbenchResult);
      }
    }
    emitter.fire(mcpServerInstallResult);
    if (mcpServerInstallResultInCurrentProfile.length) {
      currentProfileEmitter.fire(mcpServerInstallResultInCurrentProfile);
    }
  }
  async getInstalled() {
    const installed = [];
    const [userServers, remoteServers, workspaceServers] = await Promise.all([
      this.mcpManagementService.getInstalled(this.userDataProfileService.currentProfile.mcpResource),
      this.remoteMcpManagementService?.getInstalled(await this.getRemoteMcpResource()) ?? Promise.resolve([]),
      this.workspaceMcpManagementService?.getInstalled() ?? Promise.resolve([])
    ]);
    for (const server of userServers) {
      installed.push(this.toWorkspaceMcpServer(
        server,
        "user"
        /* LocalMcpServerScope.User */
      ));
    }
    for (const server of remoteServers) {
      installed.push(this.toWorkspaceMcpServer(
        server,
        "remoteUser"
        /* LocalMcpServerScope.RemoteUser */
      ));
    }
    for (const server of workspaceServers) {
      installed.push(this.toWorkspaceMcpServer(
        server,
        "workspace"
        /* LocalMcpServerScope.Workspace */
      ));
    }
    return installed;
  }
  toWorkspaceMcpServer(server, scope) {
    return { ...server, scope };
  }
  async install(server, options) {
    options = options ?? {};
    if (options.target === 5 || isWorkspaceFolder(options.target)) {
      const mcpResource = options.target === 5 ? this.workspaceContextService.getWorkspace().configuration : options.target.toResource(WORKSPACE_STANDALONE_CONFIGURATIONS[MCP_CONFIGURATION_KEY]);
      if (!mcpResource) {
        throw new Error(`Illegal target: ${options.target}`);
      }
      options.mcpResource = mcpResource;
      return this.workspaceMcpManagementService.install(server, options);
    }
    if (options.target === 4) {
      if (!this.remoteMcpManagementService) {
        throw new Error(`Illegal target: ${options.target}`);
      }
      options.mcpResource = await this.getRemoteMcpResource(options.mcpResource);
      return this.remoteMcpManagementService.install(server, options);
    }
    if (options.target && options.target !== 2 && options.target !== 3) {
      throw new Error(`Illegal target: ${options.target}`);
    }
    options.mcpResource = this.userDataProfileService.currentProfile.mcpResource;
    return this.mcpManagementService.install(server, options);
  }
  installFromGallery(server, options) {
    options = options ?? {};
    if (!options.mcpResource) {
      options.mcpResource = this.userDataProfileService.currentProfile.mcpResource;
    }
    return this.mcpManagementService.installFromGallery(server, options);
  }
  async uninstall(server) {
    if (server.scope === "workspace") {
      return this.workspaceMcpManagementService.uninstall(server);
    }
    if (server.scope === "remoteUser") {
      if (!this.remoteMcpManagementService) {
        throw new Error(`Illegal target: ${server.scope}`);
      }
      return this.remoteMcpManagementService.uninstall(server);
    }
    return this.mcpManagementService.uninstall(server, { mcpResource: this.userDataProfileService.currentProfile.mcpResource });
  }
  async getRemoteMcpResource(mcpResource) {
    if (!mcpResource && this.userDataProfileService.currentProfile.isDefault) {
      return void 0;
    }
    mcpResource = mcpResource ?? this.userDataProfileService.currentProfile.mcpResource;
    let profile = this.userDataProfilesService.profiles.find((p) => this.uriIdentityService.extUri.isEqual(p.mcpResource, mcpResource));
    if (profile) {
      profile = await this.remoteUserDataProfilesService.getRemoteProfile(profile);
    } else {
      profile = (await this.remoteUserDataProfilesService.getRemoteProfiles()).find((p) => this.uriIdentityService.extUri.isEqual(p.extensionsResource, mcpResource));
    }
    return profile?.extensionsResource;
  }
};
WorkbenchMcpManagementService = __decorate([
  __param(0, IUserDataProfileService),
  __param(1, IUriIdentityService),
  __param(2, IWorkspaceContextService),
  __param(3, IMcpManagementService),
  __param(4, IRemoteAgentService),
  __param(5, IUserDataProfilesService),
  __param(6, IRemoteUserDataProfilesService),
  __param(7, IInstantiationService)
], WorkbenchMcpManagementService);
let WorkspaceMcpResourceManagementService = class WorkspaceMcpResourceManagementService2 extends AbstractMcpResourceManagementService {
  static {
    __name(this, "WorkspaceMcpResourceManagementService");
  }
  constructor(mcpResource, target, mcpGalleryService, fileService, uriIdentityService, logService, mcpResourceScannerService) {
    super(mcpResource, target, mcpGalleryService, fileService, uriIdentityService, logService, mcpResourceScannerService);
  }
  installFromGallery() {
    throw new Error("Not supported");
  }
  async getLocalServerInfo() {
    return void 0;
  }
};
WorkspaceMcpResourceManagementService = __decorate([
  __param(2, IMcpGalleryService),
  __param(3, IFileService),
  __param(4, IUriIdentityService),
  __param(5, ILogService),
  __param(6, IMcpResourceScannerService)
], WorkspaceMcpResourceManagementService);
let WorkspaceMcpManagementService = class WorkspaceMcpManagementService2 extends Disposable {
  static {
    __name(this, "WorkspaceMcpManagementService");
  }
  constructor(uriIdentityService, logService, workspaceContextService, instantiationService) {
    super();
    this.uriIdentityService = uriIdentityService;
    this.logService = logService;
    this.workspaceContextService = workspaceContextService;
    this.instantiationService = instantiationService;
    this._onInstallMcpServer = this._register(new Emitter());
    this.onInstallMcpServer = this._onInstallMcpServer.event;
    this._onDidInstallMcpServers = this._register(new Emitter());
    this.onDidInstallMcpServers = this._onDidInstallMcpServers.event;
    this._onDidUpdateMcpServers = this._register(new Emitter());
    this.onDidUpdateMcpServers = this._onDidUpdateMcpServers.event;
    this._onUninstallMcpServer = this._register(new Emitter());
    this.onUninstallMcpServer = this._onUninstallMcpServer.event;
    this._onDidUninstallMcpServer = this._register(new Emitter());
    this.onDidUninstallMcpServer = this._onDidUninstallMcpServer.event;
    this.allMcpServers = [];
    this.workspaceMcpManagementServices = new ResourceMap();
    this.initialize();
  }
  async initialize() {
    try {
      await this.onDidChangeWorkbenchState();
      await this.onDidChangeWorkspaceFolders({ added: this.workspaceContextService.getWorkspace().folders, removed: [], changed: [] });
      this._register(this.workspaceContextService.onDidChangeWorkspaceFolders((e) => this.onDidChangeWorkspaceFolders(e)));
      this._register(this.workspaceContextService.onDidChangeWorkbenchState((e) => this.onDidChangeWorkbenchState()));
    } catch (error) {
      this.logService.error("Failed to initialize workspace folders", error);
    }
  }
  async onDidChangeWorkbenchState() {
    if (this.workspaceConfiguration) {
      await this.removeWorkspaceService(this.workspaceConfiguration);
    }
    this.workspaceConfiguration = this.workspaceContextService.getWorkspace().configuration;
    if (this.workspaceConfiguration) {
      await this.addWorkspaceService(
        this.workspaceConfiguration,
        5
        /* ConfigurationTarget.WORKSPACE */
      );
    }
  }
  async onDidChangeWorkspaceFolders(e) {
    try {
      await Promise.allSettled(e.removed.map((folder) => this.removeWorkspaceService(folder.toResource(WORKSPACE_STANDALONE_CONFIGURATIONS[MCP_CONFIGURATION_KEY]))));
    } catch (error) {
      this.logService.error(error);
    }
    try {
      await Promise.allSettled(e.added.map((folder) => this.addWorkspaceService(
        folder.toResource(WORKSPACE_STANDALONE_CONFIGURATIONS[MCP_CONFIGURATION_KEY]),
        6
        /* ConfigurationTarget.WORKSPACE_FOLDER */
      )));
    } catch (error) {
      this.logService.error(error);
    }
  }
  async addWorkspaceService(mcpResource, target) {
    if (this.workspaceMcpManagementServices.has(mcpResource)) {
      return;
    }
    const disposables = new DisposableStore();
    const service = disposables.add(this.instantiationService.createInstance(WorkspaceMcpResourceManagementService, mcpResource, target));
    try {
      const installedServers = await service.getInstalled();
      this.allMcpServers.push(...installedServers);
      if (installedServers.length > 0) {
        const installResults = installedServers.map((server) => ({
          name: server.name,
          local: server,
          mcpResource: server.mcpResource
        }));
        this._onDidInstallMcpServers.fire(installResults);
      }
    } catch (error) {
      this.logService.warn("Failed to get installed servers from", mcpResource.toString(), error);
    }
    disposables.add(service.onInstallMcpServer((e) => this._onInstallMcpServer.fire(e)));
    disposables.add(service.onDidInstallMcpServers((e) => {
      for (const { local } of e) {
        if (local) {
          this.allMcpServers.push(local);
        }
      }
      this._onDidInstallMcpServers.fire(e);
    }));
    disposables.add(service.onDidUpdateMcpServers((e) => {
      for (const { local, mcpResource: mcpResource2 } of e) {
        if (local) {
          const index = this.allMcpServers.findIndex((server) => this.uriIdentityService.extUri.isEqual(server.mcpResource, mcpResource2) && server.name === local.name);
          if (index !== -1) {
            this.allMcpServers.splice(index, 1, local);
          }
        }
      }
      this._onDidUpdateMcpServers.fire(e);
    }));
    disposables.add(service.onUninstallMcpServer((e) => this._onUninstallMcpServer.fire(e)));
    disposables.add(service.onDidUninstallMcpServer((e) => {
      const index = this.allMcpServers.findIndex((server) => this.uriIdentityService.extUri.isEqual(server.mcpResource, e.mcpResource) && server.name === e.name);
      if (index !== -1) {
        this.allMcpServers.splice(index, 1);
        this._onDidUninstallMcpServer.fire(e);
      }
    }));
    this.workspaceMcpManagementServices.set(mcpResource, { service, dispose: /* @__PURE__ */ __name(() => disposables.dispose(), "dispose") });
  }
  async removeWorkspaceService(mcpResource) {
    const serviceItem = this.workspaceMcpManagementServices.get(mcpResource);
    if (serviceItem) {
      try {
        const installedServers = await serviceItem.service.getInstalled();
        this.allMcpServers = this.allMcpServers.filter((server) => !installedServers.some((uninstalled) => this.uriIdentityService.extUri.isEqual(uninstalled.mcpResource, server.mcpResource)));
        for (const server of installedServers) {
          this._onDidUninstallMcpServer.fire({
            name: server.name,
            mcpResource: server.mcpResource
          });
        }
      } catch (error) {
        this.logService.warn("Failed to get installed servers from", mcpResource.toString(), error);
      }
      this.workspaceMcpManagementServices.delete(mcpResource);
      serviceItem.dispose();
    }
  }
  async getInstalled() {
    return this.allMcpServers;
  }
  async install(server, options) {
    if (!options?.mcpResource) {
      throw new Error("MCP resource is required");
    }
    const mcpManagementServiceItem = this.workspaceMcpManagementServices.get(options?.mcpResource);
    if (!mcpManagementServiceItem) {
      throw new Error(`No MCP management service found for resource: ${options?.mcpResource.toString()}`);
    }
    return mcpManagementServiceItem.service.install(server, options);
  }
  async uninstall(server, options) {
    const mcpResource = server.mcpResource;
    const mcpManagementServiceItem = this.workspaceMcpManagementServices.get(mcpResource);
    if (!mcpManagementServiceItem) {
      throw new Error(`No MCP management service found for resource: ${mcpResource.toString()}`);
    }
    return mcpManagementServiceItem.service.uninstall(server, options);
  }
  async installFromGallery() {
    throw new Error("Not supported");
  }
  dispose() {
    this.workspaceMcpManagementServices.forEach((service) => service.dispose());
    this.workspaceMcpManagementServices.clear();
    super.dispose();
  }
};
WorkspaceMcpManagementService = __decorate([
  __param(0, IUriIdentityService),
  __param(1, ILogService),
  __param(2, IWorkspaceContextService),
  __param(3, IInstantiationService)
], WorkspaceMcpManagementService);
registerSingleton(
  IWorkbenchMcpManagementService,
  WorkbenchMcpManagementService,
  1
  /* InstantiationType.Delayed */
);
export {
  IWorkbenchMcpManagementService,
  LocalMcpServerScope
};
//# sourceMappingURL=mcpWorkbenchManagementService.js.map
