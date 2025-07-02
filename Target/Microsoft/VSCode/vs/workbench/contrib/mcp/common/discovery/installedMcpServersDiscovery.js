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
import { Disposable, DisposableMap, DisposableStore } from "../../../../../base/common/lifecycle.js";
import { Throttler } from "../../../../../base/common/async.js";
import { URI } from "../../../../../base/common/uri.js";
import { IMcpRegistry } from "../mcpRegistryTypes.js";
import { IMcpWorkbenchService } from "../mcpTypes.js";
import { mcpConfigurationSection } from "../mcpConfiguration.js";
import { posix as pathPosix, win32 as pathWin32, sep as pathSep } from "../../../../../base/common/path.js";
import { ITextModelService } from "../../../../../editor/common/services/resolverService.js";
import { getMcpServerMapping } from "../mcpConfigFileUtils.js";
import { ResourceMap } from "../../../../../base/common/map.js";
import { observableValue } from "../../../../../base/common/observable.js";
import { IRemoteAgentService } from "../../../../services/remote/common/remoteAgentService.js";
import { isWindows } from "../../../../../base/common/platform.js";
let InstalledMcpServersDiscovery = class InstalledMcpServersDiscovery2 extends Disposable {
  static {
    __name(this, "InstalledMcpServersDiscovery");
  }
  constructor(mcpWorkbenchService, mcpRegistry, remoteAgentService, textModelService) {
    super();
    this.mcpWorkbenchService = mcpWorkbenchService;
    this.mcpRegistry = mcpRegistry;
    this.remoteAgentService = remoteAgentService;
    this.textModelService = textModelService;
    this.collectionDisposables = this._register(new DisposableMap());
  }
  start() {
    const throttler = this._register(new Throttler());
    this._register(this.mcpWorkbenchService.onChange(() => throttler.queue(() => this.sync())));
    this.sync();
  }
  async getServerIdMapping(resource, pathToServers) {
    const store = new DisposableStore();
    try {
      const ref = await this.textModelService.createModelReference(resource);
      store.add(ref);
      const serverIdMapping = getMcpServerMapping({ model: ref.object.textEditorModel, pathToServers });
      return serverIdMapping;
    } catch {
      return /* @__PURE__ */ new Map();
    } finally {
      store.dispose();
    }
  }
  async sync() {
    try {
      const remoteEnv = await this.remoteAgentService.getEnvironment();
      const collections = /* @__PURE__ */ new Map();
      const mcpConfigPathInfos = new ResourceMap();
      for (const server of this.mcpWorkbenchService.local) {
        if (!server.local) {
          continue;
        }
        let mcpConfigPathPromise = mcpConfigPathInfos.get(server.local.mcpResource);
        if (!mcpConfigPathPromise) {
          mcpConfigPathPromise = (async (local) => {
            const mcpConfigPath2 = this.mcpWorkbenchService.getMcpConfigPath(local);
            const locations = mcpConfigPath2?.uri ? await this.getServerIdMapping(mcpConfigPath2?.uri, mcpConfigPath2.section ? [...mcpConfigPath2.section, "servers"] : ["servers"]) : /* @__PURE__ */ new Map();
            return mcpConfigPath2 ? { ...mcpConfigPath2, locations } : void 0;
          })(server.local);
          mcpConfigPathInfos.set(server.local.mcpResource, mcpConfigPathPromise);
        }
        const config = server.local.config;
        const mcpConfigPath = await mcpConfigPathPromise;
        const collectionId = `mcp.config.${mcpConfigPath ? mcpConfigPath.id : "unknown"}`;
        let definitions = collections.get(collectionId);
        if (!definitions) {
          definitions = [mcpConfigPath, []];
          collections.set(collectionId, definitions);
        }
        const { isAbsolute, join, sep } = mcpConfigPath?.remoteAuthority && remoteEnv ? remoteEnv.os === 1 ? pathWin32 : pathPosix : isWindows ? pathWin32 : pathPosix;
        const fsPathForRemote = /* @__PURE__ */ __name((uri) => {
          const fsPathLocal = uri.fsPath;
          return fsPathLocal.replaceAll(pathSep, sep);
        }, "fsPathForRemote");
        definitions[1].push({
          id: `${collectionId}.${server.local.name}`,
          label: server.local.name,
          launch: config.type === "http" ? {
            type: 2,
            uri: URI.parse(config.url),
            headers: Object.entries(config.headers || {})
          } : {
            type: 1,
            command: config.command,
            args: config.args || [],
            env: config.env || {},
            envFile: config.envFile,
            cwd: config.cwd ? !isAbsolute(config.cwd) && !config.cwd.startsWith("~") && !config.cwd.startsWith("${") && mcpConfigPath?.workspaceFolder ? join(fsPathForRemote(mcpConfigPath.workspaceFolder.uri), config.cwd) : config.cwd : mcpConfigPath?.workspaceFolder ? fsPathForRemote(mcpConfigPath.workspaceFolder.uri) : void 0
          },
          roots: mcpConfigPath?.workspaceFolder ? [mcpConfigPath.workspaceFolder.uri] : void 0,
          variableReplacement: {
            folder: mcpConfigPath?.workspaceFolder,
            section: mcpConfigurationSection,
            target: mcpConfigPath?.target ?? 2
          },
          devMode: config.dev,
          presentation: {
            order: mcpConfigPath?.order,
            origin: mcpConfigPath?.locations.get(server.local.name)
          }
        });
      }
      for (const [id, [mcpConfigPath, serverDefinitions]] of collections) {
        this.collectionDisposables.deleteAndDispose(id);
        this.collectionDisposables.set(id, this.mcpRegistry.registerCollection({
          id,
          label: mcpConfigPath?.label ?? "",
          presentation: {
            order: serverDefinitions[0]?.presentation?.order,
            origin: mcpConfigPath?.uri
          },
          remoteAuthority: mcpConfigPath?.remoteAuthority ?? null,
          serverDefinitions: observableValue(this, serverDefinitions),
          isTrustedByDefault: true,
          configTarget: mcpConfigPath?.target ?? 2,
          scope: mcpConfigPath?.scope ?? 0
        }));
      }
      for (const [id] of this.collectionDisposables) {
        if (!collections.has(id)) {
          this.collectionDisposables.deleteAndDispose(id);
        }
      }
    } catch (error) {
      this.collectionDisposables.clearAndDisposeAll();
    }
  }
};
InstalledMcpServersDiscovery = __decorate([
  __param(0, IMcpWorkbenchService),
  __param(1, IMcpRegistry),
  __param(2, IRemoteAgentService),
  __param(3, ITextModelService)
], InstalledMcpServersDiscovery);
export {
  InstalledMcpServersDiscovery
};
//# sourceMappingURL=installedMcpServersDiscovery.js.map
