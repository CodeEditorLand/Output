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
import { RunOnceScheduler } from "../../../base/common/async.js";
import { VSBuffer } from "../../../base/common/buffer.js";
import { CancellationToken } from "../../../base/common/cancellation.js";
import { Emitter } from "../../../base/common/event.js";
import { Disposable, DisposableStore } from "../../../base/common/lifecycle.js";
import { ResourceMap } from "../../../base/common/map.js";
import { equals } from "../../../base/common/objects.js";
import { URI } from "../../../base/common/uri.js";
import { IEnvironmentService } from "../../environment/common/environment.js";
import { IFileService } from "../../files/common/files.js";
import { IInstantiationService } from "../../instantiation/common/instantiation.js";
import { ILogService } from "../../log/common/log.js";
import { IUriIdentityService } from "../../uriIdentity/common/uriIdentity.js";
import { IUserDataProfilesService } from "../../userDataProfile/common/userDataProfile.js";
import { IMcpGalleryService } from "./mcpManagement.js";
import { IMcpResourceScannerService } from "./mcpResourceScannerService.js";
let AbstractMcpResourceManagementService = class AbstractMcpResourceManagementService2 extends Disposable {
  static {
    __name(this, "AbstractMcpResourceManagementService");
  }
  get onDidInstallMcpServers() {
    return this._onDidInstallMcpServers.event;
  }
  get onDidUpdateMcpServers() {
    return this._onDidUpdateMcpServers.event;
  }
  get onUninstallMcpServer() {
    return this._onUninstallMcpServer.event;
  }
  get onDidUninstallMcpServer() {
    return this._onDidUninstallMcpServer.event;
  }
  constructor(mcpResource, target, mcpGalleryService, fileService, uriIdentityService, logService, mcpResourceScannerService) {
    super();
    this.mcpResource = mcpResource;
    this.target = target;
    this.mcpGalleryService = mcpGalleryService;
    this.fileService = fileService;
    this.uriIdentityService = uriIdentityService;
    this.logService = logService;
    this.mcpResourceScannerService = mcpResourceScannerService;
    this.local = /* @__PURE__ */ new Map();
    this._onInstallMcpServer = this._register(new Emitter());
    this.onInstallMcpServer = this._onInstallMcpServer.event;
    this._onDidInstallMcpServers = this._register(new Emitter());
    this._onDidUpdateMcpServers = this._register(new Emitter());
    this._onUninstallMcpServer = this._register(new Emitter());
    this._onDidUninstallMcpServer = this._register(new Emitter());
    this.reloadConfigurationScheduler = this._register(new RunOnceScheduler(() => this.updateLocal(), 50));
  }
  initialize() {
    if (!this.initializePromise) {
      this.initializePromise = (async () => {
        this.local = await this.populateLocalServer();
        this.startWatching();
      })();
    }
    return this.initializePromise;
  }
  async populateLocalServer() {
    const local = /* @__PURE__ */ new Map();
    this.logService.info("MCP Management Service: fetchInstalled", this.mcpResource.toString());
    try {
      const scannedMcpServers = await this.mcpResourceScannerService.scanMcpServers(this.mcpResource, this.target);
      if (scannedMcpServers.servers) {
        await Promise.allSettled(Object.entries(scannedMcpServers.servers).map(async ([name, scannedServer]) => {
          const server = await this.scanLocalServer(name, scannedServer);
          local.set(name, server);
        }));
      }
    } catch (error) {
      this.logService.debug("Could not read user MCP servers:", error);
      throw error;
    }
    return local;
  }
  startWatching() {
    this._register(this.fileService.watch(this.mcpResource));
    this._register(this.fileService.onDidFilesChange((e) => {
      if (e.affects(this.mcpResource)) {
        this.reloadConfigurationScheduler.schedule();
      }
    }));
  }
  async updateLocal() {
    try {
      const current = await this.populateLocalServer();
      const added = [];
      const updated = [];
      const removed = [...this.local.keys()].filter((name) => !current.has(name));
      for (const server of removed) {
        this.local.delete(server);
      }
      for (const [name, server] of current) {
        const previous = this.local.get(name);
        if (previous) {
          if (!equals(previous, server)) {
            updated.push(server);
            this.local.set(name, server);
          }
        } else {
          added.push(server);
          this.local.set(name, server);
        }
      }
      for (const server of removed) {
        this.local.delete(server);
        this._onDidUninstallMcpServer.fire({ name: server, mcpResource: this.mcpResource });
      }
      if (updated.length) {
        this._onDidUpdateMcpServers.fire(updated.map((server) => ({ name: server.name, local: server, mcpResource: this.mcpResource })));
      }
      if (added.length) {
        this._onDidInstallMcpServers.fire(added.map((server) => ({ name: server.name, local: server, mcpResource: this.mcpResource })));
      }
    } catch (error) {
      this.logService.error("Failed to load installed MCP servers:", error);
    }
  }
  async getInstalled() {
    await this.initialize();
    return Array.from(this.local.values());
  }
  async scanLocalServer(name, config) {
    let mcpServerInfo = await this.getLocalServerInfo(name, config);
    if (!mcpServerInfo) {
      mcpServerInfo = { name, version: config.version };
    }
    return {
      name,
      config,
      mcpResource: this.mcpResource,
      version: mcpServerInfo.version,
      location: mcpServerInfo.location,
      id: mcpServerInfo.id,
      displayName: mcpServerInfo.displayName,
      description: mcpServerInfo.description,
      publisher: mcpServerInfo.publisher,
      publisherDisplayName: mcpServerInfo.publisherDisplayName,
      repositoryUrl: mcpServerInfo.repositoryUrl,
      readmeUrl: mcpServerInfo.readmeUrl,
      icon: mcpServerInfo.icon,
      codicon: mcpServerInfo.codicon,
      manifest: mcpServerInfo.manifest
    };
  }
  async install(server, options) {
    this.logService.trace("MCP Management Service: install", server.name);
    this._onInstallMcpServer.fire({ name: server.name, mcpResource: this.mcpResource });
    try {
      await this.mcpResourceScannerService.addMcpServers([server], this.mcpResource, this.target);
      await this.updateLocal();
      const local = this.local.get(server.name);
      if (!local) {
        throw new Error(`Failed to install MCP server: ${server.name}`);
      }
      return local;
    } catch (e) {
      this._onDidInstallMcpServers.fire([{ name: server.name, error: e, mcpResource: this.mcpResource }]);
      throw e;
    }
  }
  async uninstall(server, options) {
    this.logService.trace("MCP Management Service: uninstall", server.name);
    this._onUninstallMcpServer.fire({ name: server.name, mcpResource: this.mcpResource });
    try {
      const currentServers = await this.mcpResourceScannerService.scanMcpServers(this.mcpResource, this.target);
      if (!currentServers.servers) {
        return;
      }
      await this.mcpResourceScannerService.removeMcpServers([server.name], this.mcpResource, this.target);
      if (server.location) {
        await this.fileService.del(URI.revive(server.location), { recursive: true });
      }
      await this.updateLocal();
    } catch (e) {
      this._onDidUninstallMcpServer.fire({ name: server.name, error: e, mcpResource: this.mcpResource });
      throw e;
    }
  }
  toScannedMcpServerAndInputs(manifest, packageType) {
    if (packageType === void 0) {
      packageType = manifest.packages?.[0]?.registry_name ?? "remote";
    }
    let config;
    const inputs = [];
    if (packageType === "remote" && manifest.remotes?.length) {
      const headers = {};
      for (const input of manifest.remotes[0].headers ?? []) {
        const variables = input.variables ? this.getVariables(input.variables) : [];
        let value = input.value;
        for (const variable of variables) {
          value = value.replace(`{${variable.id}}`, `{input:${variable.id}}`);
        }
        headers[input.name] = value;
        if (variables.length) {
          inputs.push(...variables);
        }
      }
      config = {
        type: "http",
        url: manifest.remotes[0].url,
        headers: Object.keys(headers).length ? headers : void 0
      };
    } else {
      const serverPackage = manifest.packages?.find((p) => p.registry_name === packageType) ?? manifest.packages?.[0];
      if (!serverPackage) {
        throw new Error(`No server package found`);
      }
      const args = [];
      const env = {};
      if (serverPackage.registry_name === "docker") {
        args.push("run");
        args.push("-i");
        args.push("--rm");
      }
      for (const arg of serverPackage.runtime_arguments ?? []) {
        const variables = arg.variables ? this.getVariables(arg.variables) : [];
        if (arg.type === "positional") {
          let value = arg.value;
          if (value) {
            for (const variable of variables) {
              value = value.replace(`{${variable.id}}`, `{input:${variable.id}}`);
            }
          }
          args.push(value ?? arg.value_hint);
        } else if (arg.type === "named") {
          args.push(arg.name);
          if (arg.value) {
            let value = arg.value;
            for (const variable of variables) {
              value = value.replace(`{${variable.id}}`, `{input:${variable.id}}`);
            }
            args.push(value);
          }
        }
        if (variables.length) {
          inputs.push(...variables);
        }
      }
      for (const input of serverPackage.environment_variables ?? []) {
        const variables = input.variables ? this.getVariables(input.variables) : [];
        let value = input.value;
        for (const variable of variables) {
          value = value.replace(`{${variable.id}}`, `{input:${variable.id}}`);
        }
        env[input.name] = value;
        if (variables.length) {
          inputs.push(...variables);
        }
        if (serverPackage.registry_name === "docker") {
          args.push("-e");
          args.push(input.name);
        }
      }
      if (serverPackage.registry_name === "npm") {
        args.push(serverPackage.version ? `${serverPackage.name}@${serverPackage.version}` : serverPackage.name);
      } else if (serverPackage.registry_name === "pypi") {
        args.push(serverPackage.version ? `${serverPackage.name}==${serverPackage.version}` : serverPackage.name);
      } else if (serverPackage.registry_name === "docker") {
        args.push(serverPackage.version ? `${serverPackage.name}:${serverPackage.version}` : serverPackage.name);
      }
      for (const arg of serverPackage.package_arguments ?? []) {
        const variables = arg.variables ? this.getVariables(arg.variables) : [];
        if (arg.type === "positional") {
          let value = arg.value;
          if (value) {
            for (const variable of variables) {
              value = value.replace(`{${variable.id}}`, `{input:${variable.id}}`);
            }
          }
          args.push(value ?? arg.value_hint);
        } else if (arg.type === "named") {
          args.push(arg.name);
          if (arg.value) {
            let value = arg.value;
            for (const variable of variables) {
              value = value.replace(`{${variable.id}}`, `{input:${variable.id}}`);
            }
            args.push(value);
          }
        }
        if (variables.length) {
          inputs.push(...variables);
        }
      }
      config = {
        type: "stdio",
        command: this.getCommandName(serverPackage.registry_name),
        args: args.length ? args : void 0,
        env: Object.keys(env).length ? env : void 0
      };
    }
    return {
      config,
      inputs: inputs.length ? inputs : void 0
    };
  }
  getCommandName(packageType) {
    switch (packageType) {
      case "npm":
        return "npx";
      case "docker":
        return "docker";
      case "pypi":
        return "uvx";
    }
    return packageType;
  }
  getVariables(variableInputs) {
    const variables = [];
    for (const [key, value] of Object.entries(variableInputs)) {
      variables.push({
        id: key,
        type: value.choices ? "pickString" : "promptString",
        description: value.description ?? "",
        password: !!value.is_secret,
        default: value.default,
        options: value.choices
      });
    }
    return variables;
  }
};
AbstractMcpResourceManagementService = __decorate([
  __param(2, IMcpGalleryService),
  __param(3, IFileService),
  __param(4, IUriIdentityService),
  __param(5, ILogService),
  __param(6, IMcpResourceScannerService)
], AbstractMcpResourceManagementService);
let McpUserResourceManagementService = class McpUserResourceManagementService2 extends AbstractMcpResourceManagementService {
  static {
    __name(this, "McpUserResourceManagementService");
  }
  constructor(mcpResource, mcpGalleryService, fileService, uriIdentityService, logService, mcpResourceScannerService, environmentService) {
    super(mcpResource, 2, mcpGalleryService, fileService, uriIdentityService, logService, mcpResourceScannerService);
    this.mcpLocation = uriIdentityService.extUri.joinPath(environmentService.userRoamingDataHome, "mcp");
  }
  async installFromGallery(server, options) {
    this.logService.trace("MCP Management Service: installGallery", server.url);
    this._onInstallMcpServer.fire({ name: server.name, mcpResource: this.mcpResource });
    try {
      const manifest = await this.mcpGalleryService.getManifest(server, CancellationToken.None);
      const location = this.getLocation(server.name, server.version);
      const manifestPath = this.uriIdentityService.extUri.joinPath(location, "manifest.json");
      await this.fileService.writeFile(manifestPath, VSBuffer.fromString(JSON.stringify({
        id: server.id,
        name: server.name,
        displayName: server.displayName,
        description: server.description,
        version: server.version,
        publisher: server.publisher,
        publisherDisplayName: server.publisherDisplayName,
        repository: server.repositoryUrl,
        licenseUrl: server.licenseUrl,
        icon: server.icon,
        codicon: server.codicon,
        ...manifest
      })));
      if (server.readmeUrl) {
        const readme = await this.mcpGalleryService.getReadme(server, CancellationToken.None);
        await this.fileService.writeFile(this.uriIdentityService.extUri.joinPath(location, "README.md"), VSBuffer.fromString(readme));
      }
      const { config, inputs } = this.toScannedMcpServerAndInputs(manifest, options?.packageType);
      const installable = {
        name: server.name,
        config: {
          ...config,
          gallery: true,
          version: server.version
        },
        inputs
      };
      await this.mcpResourceScannerService.addMcpServers([installable], this.mcpResource, this.target);
      await this.updateLocal();
      const local = (await this.getInstalled()).find((s) => s.name === server.name);
      if (!local) {
        throw new Error(`Failed to install MCP server: ${server.name}`);
      }
      return local;
    } catch (e) {
      this._onDidInstallMcpServers.fire([{ name: server.name, source: server, error: e, mcpResource: this.mcpResource }]);
      throw e;
    }
  }
  async getLocalServerInfo(name, mcpServerConfig) {
    let storedMcpServerInfo;
    let location;
    let readmeUrl;
    if (mcpServerConfig.gallery) {
      location = this.getLocation(name, mcpServerConfig.version);
      const manifestLocation = this.uriIdentityService.extUri.joinPath(location, "manifest.json");
      try {
        const content = await this.fileService.readFile(manifestLocation);
        storedMcpServerInfo = JSON.parse(content.value.toString());
        storedMcpServerInfo.location = location;
        readmeUrl = this.uriIdentityService.extUri.joinPath(location, "README.md");
        if (!await this.fileService.exists(readmeUrl)) {
          readmeUrl = void 0;
        }
        storedMcpServerInfo.readmeUrl = readmeUrl;
      } catch (e) {
        this.logService.error("MCP Management Service: failed to read manifest", location.toString(), e);
      }
    }
    return storedMcpServerInfo;
  }
  getLocation(name, version) {
    name = name.replace("/", ".");
    return this.uriIdentityService.extUri.joinPath(this.mcpLocation, version ? `${name}-${version}` : name);
  }
};
McpUserResourceManagementService = __decorate([
  __param(1, IMcpGalleryService),
  __param(2, IFileService),
  __param(3, IUriIdentityService),
  __param(4, ILogService),
  __param(5, IMcpResourceScannerService),
  __param(6, IEnvironmentService)
], McpUserResourceManagementService);
let McpManagementService = class McpManagementService2 extends Disposable {
  static {
    __name(this, "McpManagementService");
  }
  constructor(userDataProfilesService, instantiationService) {
    super();
    this.userDataProfilesService = userDataProfilesService;
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
    this.mcpResourceManagementServices = new ResourceMap();
  }
  getMcpResourceManagementService(mcpResource) {
    let mcpResourceManagementService = this.mcpResourceManagementServices.get(mcpResource);
    if (!mcpResourceManagementService) {
      const disposables = new DisposableStore();
      const service = disposables.add(this.instantiationService.createInstance(McpUserResourceManagementService, mcpResource));
      disposables.add(service.onInstallMcpServer((e) => this._onInstallMcpServer.fire(e)));
      disposables.add(service.onDidInstallMcpServers((e) => this._onDidInstallMcpServers.fire(e)));
      disposables.add(service.onDidUpdateMcpServers((e) => this._onDidUpdateMcpServers.fire(e)));
      disposables.add(service.onUninstallMcpServer((e) => this._onUninstallMcpServer.fire(e)));
      disposables.add(service.onDidUninstallMcpServer((e) => this._onDidUninstallMcpServer.fire(e)));
      this.mcpResourceManagementServices.set(mcpResource, mcpResourceManagementService = { service, dispose: /* @__PURE__ */ __name(() => disposables.dispose(), "dispose") });
    }
    return mcpResourceManagementService.service;
  }
  async getInstalled(mcpResource) {
    const mcpResourceUri = mcpResource || this.userDataProfilesService.defaultProfile.mcpResource;
    return this.getMcpResourceManagementService(mcpResourceUri).getInstalled();
  }
  async install(server, options) {
    const mcpResourceUri = options?.mcpResource || this.userDataProfilesService.defaultProfile.mcpResource;
    return this.getMcpResourceManagementService(mcpResourceUri).install(server, options);
  }
  async uninstall(server, options) {
    const mcpResourceUri = options?.mcpResource || this.userDataProfilesService.defaultProfile.mcpResource;
    return this.getMcpResourceManagementService(mcpResourceUri).uninstall(server, options);
  }
  async installFromGallery(server, options) {
    const mcpResourceUri = options?.mcpResource || this.userDataProfilesService.defaultProfile.mcpResource;
    return this.getMcpResourceManagementService(mcpResourceUri).installFromGallery(server, options);
  }
  dispose() {
    this.mcpResourceManagementServices.forEach((service) => service.dispose());
    this.mcpResourceManagementServices.clear();
    super.dispose();
  }
};
McpManagementService = __decorate([
  __param(0, IUserDataProfilesService),
  __param(1, IInstantiationService)
], McpManagementService);
export {
  AbstractMcpResourceManagementService,
  McpManagementService,
  McpUserResourceManagementService
};
//# sourceMappingURL=mcpManagementService.js.map
