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
import { Emitter } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { Schemas } from "../../../../base/common/network.js";
import { basename } from "../../../../base/common/resources.js";
import { URI } from "../../../../base/common/uri.js";
import { localize } from "../../../../nls.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { IMcpGalleryService } from "../../../../platform/mcp/common/mcpManagement.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IURLService } from "../../../../platform/url/common/url.js";
import { IUserDataProfilesService } from "../../../../platform/userDataProfile/common/userDataProfile.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { MCP_CONFIGURATION_KEY, WORKSPACE_STANDALONE_CONFIGURATIONS } from "../../../services/configuration/common/configuration.js";
import { ACTIVE_GROUP, IEditorService } from "../../../services/editor/common/editorService.js";
import { IWorkbenchEnvironmentService } from "../../../services/environment/common/environmentService.js";
import { IWorkbenchMcpManagementService } from "../../../services/mcp/common/mcpWorkbenchManagementService.js";
import { IRemoteAgentService } from "../../../services/remote/common/remoteAgentService.js";
import { mcpConfigurationSection } from "../common/mcpConfiguration.js";
import { HasInstalledMcpServersContext, IMcpWorkbenchService, McpServersGalleryEnabledContext } from "../common/mcpTypes.js";
import { McpServerEditorInput } from "./mcpServerEditorInput.js";
let McpWorkbenchServer = class McpWorkbenchServer2 {
  static {
    __name(this, "McpWorkbenchServer");
  }
  constructor(local, gallery, installable, mcpGalleryService, fileService) {
    this.local = local;
    this.gallery = gallery;
    this.installable = installable;
    this.mcpGalleryService = mcpGalleryService;
    this.fileService = fileService;
    this.local = local;
  }
  get id() {
    return this.gallery?.id ?? this.local?.id ?? this.installable?.name ?? "";
  }
  get name() {
    return this.gallery?.name ?? this.local?.name ?? this.installable?.name ?? "";
  }
  get label() {
    return this.gallery?.displayName ?? this.local?.displayName ?? this.local?.name ?? this.installable?.name ?? "";
  }
  get icon() {
    return this.gallery?.icon ?? this.local?.icon;
  }
  get codicon() {
    return this.gallery?.codicon ?? this.local?.codicon;
  }
  get publisherDisplayName() {
    return this.gallery?.publisherDisplayName ?? this.local?.publisherDisplayName ?? this.gallery?.publisher ?? this.local?.publisher;
  }
  get publisherUrl() {
    return this.gallery?.publisherDomain?.link;
  }
  get description() {
    return this.gallery?.description ?? this.local?.description ?? "";
  }
  get installCount() {
    return this.gallery?.installCount ?? 0;
  }
  get url() {
    return this.gallery?.url;
  }
  get repository() {
    return this.gallery?.repositoryUrl;
  }
  get config() {
    return this.local?.config ?? this.installable?.config;
  }
  hasReadme() {
    return !!(this.local?.readmeUrl || this.gallery?.readmeUrl);
  }
  async getReadme(token) {
    if (this.local?.readmeUrl) {
      const content = await this.fileService.readFile(this.local.readmeUrl);
      return content.value.toString();
    }
    if (this.gallery?.readmeUrl) {
      return this.mcpGalleryService.getReadme(this.gallery, token);
    }
    return Promise.reject(new Error("not available"));
  }
  async getManifest(token) {
    if (this.local?.manifest) {
      return this.local.manifest;
    }
    if (this.gallery) {
      return this.mcpGalleryService.getManifest(this.gallery, token);
    }
    throw new Error("No manifest available");
  }
};
McpWorkbenchServer = __decorate([
  __param(3, IMcpGalleryService),
  __param(4, IFileService)
], McpWorkbenchServer);
let McpWorkbenchService = class McpWorkbenchService2 extends Disposable {
  static {
    __name(this, "McpWorkbenchService");
  }
  get local() {
    return this._local;
  }
  constructor(mcpGalleryService, mcpManagementService, editorService, userDataProfilesService, uriIdentityService, workspaceService, environmentService, labelService, productService, remoteAgentService, instantiationService, urlService) {
    super();
    this.mcpGalleryService = mcpGalleryService;
    this.mcpManagementService = mcpManagementService;
    this.editorService = editorService;
    this.userDataProfilesService = userDataProfilesService;
    this.uriIdentityService = uriIdentityService;
    this.workspaceService = workspaceService;
    this.environmentService = environmentService;
    this.labelService = labelService;
    this.productService = productService;
    this.remoteAgentService = remoteAgentService;
    this.instantiationService = instantiationService;
    this._local = [];
    this._onChange = this._register(new Emitter());
    this.onChange = this._onChange.event;
    this._register(this.mcpManagementService.onDidInstallMcpServersInCurrentProfile((e) => this.onDidInstallMcpServers(e)));
    this._register(this.mcpManagementService.onDidUpdateMcpServersInCurrentProfile((e) => this.onDidUpdateMcpServers(e)));
    this._register(this.mcpManagementService.onDidUninstallMcpServerInCurrentProfile((e) => this.onDidUninstallMcpServer(e)));
    this.queryLocal().then(async () => {
      await this.queryGallery();
      this._onChange.fire(void 0);
    });
    urlService.registerHandler(this);
  }
  onDidUninstallMcpServer(e) {
    if (e.error) {
      return;
    }
    const server = this._local.find((server2) => server2.local?.name === e.name);
    if (server) {
      this._local = this._local.filter((server2) => server2.local?.name !== e.name);
      server.local = void 0;
      this._onChange.fire(server);
    }
  }
  onDidInstallMcpServers(e) {
    for (const result of e) {
      if (!result.local) {
        continue;
      }
      let server = this._local.find((server2) => server2.local?.name === result.name);
      if (server) {
        server.local = result.local;
      } else {
        server = this.instantiationService.createInstance(McpWorkbenchServer, result.local, result.source, void 0);
        this._local.push(server);
      }
      this._onChange.fire(server);
    }
  }
  onDidUpdateMcpServers(e) {
    for (const result of e) {
      if (!result.local) {
        continue;
      }
      const serverIndex = this._local.findIndex((server2) => server2.local?.name === result.name);
      let server;
      if (serverIndex !== -1) {
        this._local[serverIndex].local = result.local;
        server = this._local[serverIndex];
      } else {
        server = this.instantiationService.createInstance(McpWorkbenchServer, result.local, result.source, void 0);
        this._local.push(server);
      }
      this._onChange.fire(server);
    }
  }
  fromGallery(gallery) {
    for (const local of this._local) {
      if (local.name === gallery.name) {
        local.gallery = gallery;
        return local;
      }
    }
    return void 0;
  }
  async queryGallery(options, token) {
    if (!this.mcpGalleryService.isEnabled()) {
      return [];
    }
    const result = await this.mcpGalleryService.query(options, token);
    return result.map((gallery) => this.fromGallery(gallery) ?? this.instantiationService.createInstance(McpWorkbenchServer, void 0, gallery, void 0));
  }
  async queryLocal() {
    const installed = await this.mcpManagementService.getInstalled();
    this._local = installed.map((i) => {
      const local = this._local.find((server) => server.name === i.name) ?? this.instantiationService.createInstance(McpWorkbenchServer, void 0, void 0, void 0);
      local.local = i;
      return local;
    });
    return this._local;
  }
  async install(server) {
    if (server.installable) {
      await this.mcpManagementService.install(server.installable);
      return;
    }
    if (server.gallery) {
      await this.mcpManagementService.installFromGallery(server.gallery, { packageType: server.gallery.packageTypes[0] });
      return;
    }
    throw new Error("No installable server found");
  }
  async uninstall(server) {
    if (!server.local) {
      throw new Error("Local server is missing");
    }
    await this.mcpManagementService.uninstall(server.local);
  }
  getMcpConfigPath(arg) {
    if (arg instanceof URI) {
      const mcpResource = arg;
      for (const profile of this.userDataProfilesService.profiles) {
        if (this.uriIdentityService.extUri.isEqual(profile.mcpResource, mcpResource)) {
          return this.getUserMcpConfigPath(mcpResource);
        }
      }
      return this.remoteAgentService.getEnvironment().then((remoteEnvironment) => {
        if (remoteEnvironment && this.uriIdentityService.extUri.isEqual(remoteEnvironment.mcpResource, mcpResource)) {
          return this.getRemoteMcpConfigPath(mcpResource);
        }
        return this.getWorkspaceMcpConfigPath(mcpResource);
      });
    }
    if (arg.scope === "user") {
      return this.getUserMcpConfigPath(arg.mcpResource);
    }
    if (arg.scope === "workspace") {
      return this.getWorkspaceMcpConfigPath(arg.mcpResource);
    }
    if (arg.scope === "remoteUser") {
      return this.getRemoteMcpConfigPath(arg.mcpResource);
    }
    return void 0;
  }
  getUserMcpConfigPath(mcpResource) {
    return {
      id: "usrlocal",
      key: "userLocalValue",
      target: 3,
      label: localize("mcp.configuration.userLocalValue", "Global in {0}", this.productService.nameShort),
      scope: 0,
      order: 200,
      uri: mcpResource,
      section: []
    };
  }
  getRemoteMcpConfigPath(mcpResource) {
    return {
      id: "usrremote",
      key: "userRemoteValue",
      target: 4,
      label: this.environmentService.remoteAuthority ? this.labelService.getHostLabel(Schemas.vscodeRemote, this.environmentService.remoteAuthority) : "Remote",
      scope: 0,
      order: 200 + -50,
      remoteAuthority: this.environmentService.remoteAuthority,
      uri: mcpResource,
      section: []
    };
  }
  getWorkspaceMcpConfigPath(mcpResource) {
    const workspace = this.workspaceService.getWorkspace();
    if (workspace.configuration && this.uriIdentityService.extUri.isEqual(workspace.configuration, mcpResource)) {
      return {
        id: "workspace",
        key: "workspaceValue",
        target: 5,
        label: basename(mcpResource),
        scope: 1,
        order: 100,
        remoteAuthority: this.environmentService.remoteAuthority,
        uri: mcpResource,
        section: ["settings", mcpConfigurationSection]
      };
    }
    const workspaceFolders = workspace.folders;
    for (let index = 0; index < workspaceFolders.length; index++) {
      const workspaceFolder = workspaceFolders[index];
      if (this.uriIdentityService.extUri.isEqual(this.uriIdentityService.extUri.joinPath(workspaceFolder.uri, WORKSPACE_STANDALONE_CONFIGURATIONS[MCP_CONFIGURATION_KEY]), mcpResource)) {
        return {
          id: `wf${index}`,
          key: "workspaceFolderValue",
          target: 6,
          label: `${workspaceFolder.name}/.vscode/mcp.json`,
          scope: 1,
          remoteAuthority: this.environmentService.remoteAuthority,
          order: 0,
          uri: mcpResource,
          workspaceFolder
        };
      }
    }
    return void 0;
  }
  async handleURL(uri) {
    if (uri.path !== "mcp/install") {
      return false;
    }
    let parsed;
    try {
      parsed = JSON.parse(decodeURIComponent(uri.query));
    } catch (e) {
      return false;
    }
    try {
      const { name, inputs, gallery, ...config } = parsed;
      if (gallery || !config || Object.keys(config).length === 0) {
        const galleryServer = await this.mcpGalleryService.getMcpServer(name);
        if (!galleryServer) {
          throw new Error(`MCP server '${name}' not found in gallery`);
        }
        this.open(this.instantiationService.createInstance(McpWorkbenchServer, void 0, galleryServer, void 0));
      } else {
        if (config.type === void 0) {
          config.type = parsed.command ? "stdio" : "http";
        }
        this.open(this.instantiationService.createInstance(McpWorkbenchServer, void 0, void 0, { name, config, inputs }));
      }
    } catch (e) {
    }
    return true;
  }
  async open(extension, options) {
    await this.editorService.openEditor(this.instantiationService.createInstance(McpServerEditorInput, extension), options, ACTIVE_GROUP);
  }
};
McpWorkbenchService = __decorate([
  __param(0, IMcpGalleryService),
  __param(1, IWorkbenchMcpManagementService),
  __param(2, IEditorService),
  __param(3, IUserDataProfilesService),
  __param(4, IUriIdentityService),
  __param(5, IWorkspaceContextService),
  __param(6, IWorkbenchEnvironmentService),
  __param(7, ILabelService),
  __param(8, IProductService),
  __param(9, IRemoteAgentService),
  __param(10, IInstantiationService),
  __param(11, IURLService)
], McpWorkbenchService);
let MCPContextsInitialisation = class MCPContextsInitialisation2 extends Disposable {
  static {
    __name(this, "MCPContextsInitialisation");
  }
  static {
    this.ID = "workbench.mcp.contexts.initialisation";
  }
  constructor(mcpWorkbenchService, mcpGalleryService, contextKeyService) {
    super();
    const hasInstalledMcpServersContextKey = HasInstalledMcpServersContext.bindTo(contextKeyService);
    McpServersGalleryEnabledContext.bindTo(contextKeyService).set(mcpGalleryService.isEnabled());
    hasInstalledMcpServersContextKey.set(mcpWorkbenchService.local.length > 0);
    this._register(mcpWorkbenchService.onChange(() => hasInstalledMcpServersContextKey.set(mcpWorkbenchService.local.length > 0)));
  }
};
MCPContextsInitialisation = __decorate([
  __param(0, IMcpWorkbenchService),
  __param(1, IMcpGalleryService),
  __param(2, IContextKeyService)
], MCPContextsInitialisation);
export {
  MCPContextsInitialisation,
  McpWorkbenchService
};
//# sourceMappingURL=mcpWorkbenchService.js.map
