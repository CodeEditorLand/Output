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
import { DisposableStore, Disposable, IDisposable, MutableDisposable, combinedDisposable } from "../../../base/common/lifecycle.js";
import { ExtHostContext, ExtHostTerminalServiceShape, MainThreadTerminalServiceShape, MainContext, TerminalLaunchConfig, ITerminalDimensionsDto, ExtHostTerminalIdentifier, TerminalQuickFix, ITerminalCommandDto } from "../common/extHost.protocol.js";
import { extHostNamedCustomer, IExtHostContext } from "../../services/extensions/common/extHostCustomers.js";
import { URI } from "../../../base/common/uri.js";
import { IInstantiationService } from "../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../platform/log/common/log.js";
import { IProcessProperty, IProcessReadyWindowsPty, IShellLaunchConfig, IShellLaunchConfigDto, ITerminalOutputMatch, ITerminalOutputMatcher, ProcessPropertyType, TerminalExitReason, TerminalLocation } from "../../../platform/terminal/common/terminal.js";
import { TerminalDataBufferer } from "../../../platform/terminal/common/terminalDataBuffering.js";
import { ITerminalEditorService, ITerminalExternalLinkProvider, ITerminalGroupService, ITerminalInstance, ITerminalLink, ITerminalService } from "../../contrib/terminal/browser/terminal.js";
import { TerminalProcessExtHostProxy } from "../../contrib/terminal/browser/terminalProcessExtHostProxy.js";
import { IEnvironmentVariableService } from "../../contrib/terminal/common/environmentVariable.js";
import { deserializeEnvironmentDescriptionMap, deserializeEnvironmentVariableCollection, serializeEnvironmentVariableCollection } from "../../../platform/terminal/common/environmentVariableShared.js";
import { IStartExtensionTerminalRequest, ITerminalProcessExtHostProxy, ITerminalProfileResolverService, ITerminalProfileService } from "../../contrib/terminal/common/terminal.js";
import { IRemoteAgentService } from "../../services/remote/common/remoteAgentService.js";
import { OperatingSystem, OS } from "../../../base/common/platform.js";
import { TerminalEditorLocationOptions } from "vscode";
import { Promises } from "../../../base/common/async.js";
import { ISerializableEnvironmentDescriptionMap, ISerializableEnvironmentVariableCollection } from "../../../platform/terminal/common/environmentVariable.js";
import { ITerminalLinkProviderService } from "../../contrib/terminalContrib/links/browser/links.js";
import { ITerminalQuickFixService, ITerminalQuickFix, TerminalQuickFixType } from "../../contrib/terminalContrib/quickFix/browser/quickFix.js";
import { TerminalCapability } from "../../../platform/terminal/common/capabilities/capabilities.js";
let MainThreadTerminalService = class {
  constructor(_extHostContext, _terminalService, _terminalLinkProviderService, _terminalQuickFixService, _instantiationService, _environmentVariableService, _logService, _terminalProfileResolverService, remoteAgentService, _terminalGroupService, _terminalEditorService, _terminalProfileService) {
    this._extHostContext = _extHostContext;
    this._terminalService = _terminalService;
    this._terminalLinkProviderService = _terminalLinkProviderService;
    this._terminalQuickFixService = _terminalQuickFixService;
    this._instantiationService = _instantiationService;
    this._environmentVariableService = _environmentVariableService;
    this._logService = _logService;
    this._terminalProfileResolverService = _terminalProfileResolverService;
    this._terminalGroupService = _terminalGroupService;
    this._terminalEditorService = _terminalEditorService;
    this._terminalProfileService = _terminalProfileService;
    this._proxy = _extHostContext.getProxy(ExtHostContext.ExtHostTerminalService);
    this._store.add(_terminalService.onDidCreateInstance((instance) => {
      this._onTerminalOpened(instance);
      this._onInstanceDimensionsChanged(instance);
    }));
    this._store.add(_terminalService.onDidDisposeInstance((instance) => this._onTerminalDisposed(instance)));
    this._store.add(_terminalService.onAnyInstanceProcessIdReady((instance) => this._onTerminalProcessIdReady(instance)));
    this._store.add(_terminalService.onDidChangeInstanceDimensions((instance) => this._onInstanceDimensionsChanged(instance)));
    this._store.add(_terminalService.onAnyInstanceMaximumDimensionsChange((instance) => this._onInstanceMaximumDimensionsChanged(instance)));
    this._store.add(_terminalService.onDidRequestStartExtensionTerminal((e) => this._onRequestStartExtensionTerminal(e)));
    this._store.add(_terminalService.onDidChangeActiveInstance((instance) => this._onActiveTerminalChanged(instance ? instance.instanceId : null)));
    this._store.add(_terminalService.onAnyInstanceTitleChange((instance) => instance && this._onTitleChanged(instance.instanceId, instance.title)));
    this._store.add(_terminalService.onAnyInstanceDataInput((instance) => this._proxy.$acceptTerminalInteraction(instance.instanceId)));
    this._store.add(_terminalService.onAnyInstanceSelectionChange((instance) => this._proxy.$acceptTerminalSelection(instance.instanceId, instance.selection)));
    for (const instance of this._terminalService.instances) {
      this._onTerminalOpened(instance);
      instance.processReady.then(() => this._onTerminalProcessIdReady(instance));
    }
    const activeInstance = this._terminalService.activeInstance;
    if (activeInstance) {
      this._proxy.$acceptActiveTerminalChanged(activeInstance.instanceId);
    }
    if (this._environmentVariableService.collections.size > 0) {
      const collectionAsArray = [...this._environmentVariableService.collections.entries()];
      const serializedCollections = collectionAsArray.map((e) => {
        return [e[0], serializeEnvironmentVariableCollection(e[1].map)];
      });
      this._proxy.$initEnvironmentVariableCollections(serializedCollections);
    }
    remoteAgentService.getEnvironment().then(async (env) => {
      this._os = env?.os || OS;
      this._updateDefaultProfile();
    });
    this._store.add(this._terminalProfileService.onDidChangeAvailableProfiles(() => this._updateDefaultProfile()));
  }
  _store = new DisposableStore();
  _proxy;
  /**
   * Stores a map from a temporary terminal id (a UUID generated on the extension host side)
   * to a numeric terminal id (an id generated on the renderer side)
   * This comes in play only when dealing with terminals created on the extension host side
   */
  _extHostTerminals = /* @__PURE__ */ new Map();
  _terminalProcessProxies = /* @__PURE__ */ new Map();
  _profileProviders = /* @__PURE__ */ new Map();
  _quickFixProviders = /* @__PURE__ */ new Map();
  _dataEventTracker = new MutableDisposable();
  _sendCommandEventListener = new MutableDisposable();
  /**
   * A single shared terminal link provider for the exthost. When an ext registers a link
   * provider, this is registered with the terminal on the renderer side and all links are
   * provided through this, even from multiple ext link providers. Xterm should remove lower
   * priority intersecting links itself.
   */
  _linkProvider = this._store.add(new MutableDisposable());
  _os = OS;
  dispose() {
    this._store.dispose();
    for (const provider of this._profileProviders.values()) {
      provider.dispose();
    }
    for (const provider of this._quickFixProviders.values()) {
      provider.dispose();
    }
  }
  async _updateDefaultProfile() {
    const remoteAuthority = this._extHostContext.remoteAuthority ?? void 0;
    const defaultProfile = this._terminalProfileResolverService.getDefaultProfile({ remoteAuthority, os: this._os });
    const defaultAutomationProfile = this._terminalProfileResolverService.getDefaultProfile({ remoteAuthority, os: this._os, allowAutomationShell: true });
    this._proxy.$acceptDefaultProfile(...await Promise.all([defaultProfile, defaultAutomationProfile]));
  }
  async _getTerminalInstance(id) {
    if (typeof id === "string") {
      return this._extHostTerminals.get(id);
    }
    return this._terminalService.getInstanceFromId(id);
  }
  async $createTerminal(extHostTerminalId, launchConfig) {
    const shellLaunchConfig = {
      name: launchConfig.name,
      executable: launchConfig.shellPath,
      args: launchConfig.shellArgs,
      cwd: typeof launchConfig.cwd === "string" ? launchConfig.cwd : URI.revive(launchConfig.cwd),
      icon: launchConfig.icon,
      color: launchConfig.color,
      initialText: launchConfig.initialText,
      waitOnExit: launchConfig.waitOnExit,
      ignoreConfigurationCwd: true,
      env: launchConfig.env,
      strictEnv: launchConfig.strictEnv,
      hideFromUser: launchConfig.hideFromUser,
      customPtyImplementation: launchConfig.isExtensionCustomPtyTerminal ? (id, cols, rows) => new TerminalProcessExtHostProxy(id, cols, rows, this._terminalService) : void 0,
      extHostTerminalId,
      forceShellIntegration: launchConfig.forceShellIntegration,
      isFeatureTerminal: launchConfig.isFeatureTerminal,
      isExtensionOwnedTerminal: launchConfig.isExtensionOwnedTerminal,
      useShellEnvironment: launchConfig.useShellEnvironment,
      isTransient: launchConfig.isTransient
    };
    const terminal = Promises.withAsyncBody(async (r) => {
      const terminal2 = await this._terminalService.createTerminal({
        config: shellLaunchConfig,
        location: await this._deserializeParentTerminal(launchConfig.location)
      });
      r(terminal2);
    });
    this._extHostTerminals.set(extHostTerminalId, terminal);
    const terminalInstance = await terminal;
    this._store.add(terminalInstance.onDisposed(() => {
      this._extHostTerminals.delete(extHostTerminalId);
    }));
  }
  async _deserializeParentTerminal(location) {
    if (typeof location === "object" && "parentTerminal" in location) {
      const parentTerminal = await this._extHostTerminals.get(location.parentTerminal.toString());
      return parentTerminal ? { parentTerminal } : void 0;
    }
    return location;
  }
  async $show(id, preserveFocus) {
    const terminalInstance = await this._getTerminalInstance(id);
    if (terminalInstance) {
      this._terminalService.setActiveInstance(terminalInstance);
      if (terminalInstance.target === TerminalLocation.Editor) {
        await this._terminalEditorService.revealActiveEditor(preserveFocus);
      } else {
        await this._terminalGroupService.showPanel(!preserveFocus);
      }
    }
  }
  async $hide(id) {
    const instanceToHide = await this._getTerminalInstance(id);
    const activeInstance = this._terminalService.activeInstance;
    if (activeInstance && activeInstance.instanceId === instanceToHide?.instanceId && activeInstance.target !== TerminalLocation.Editor) {
      this._terminalGroupService.hidePanel();
    }
  }
  async $dispose(id) {
    (await this._getTerminalInstance(id))?.dispose(TerminalExitReason.Extension);
  }
  async $sendText(id, text, shouldExecute) {
    const instance = await this._getTerminalInstance(id);
    await instance?.sendText(text, shouldExecute);
  }
  $sendProcessExit(terminalId, exitCode) {
    this._terminalProcessProxies.get(terminalId)?.emitExit(exitCode);
  }
  $startSendingDataEvents() {
    if (!this._dataEventTracker.value) {
      this._dataEventTracker.value = this._instantiationService.createInstance(TerminalDataEventTracker, (id, data) => {
        this._onTerminalData(id, data);
      });
      for (const instance of this._terminalService.instances) {
        for (const data of instance.initialDataEvents || []) {
          this._onTerminalData(instance.instanceId, data);
        }
      }
    }
  }
  $stopSendingDataEvents() {
    this._dataEventTracker.clear();
  }
  $startSendingCommandEvents() {
    if (this._sendCommandEventListener.value) {
      return;
    }
    const multiplexer = this._terminalService.createOnInstanceCapabilityEvent(TerminalCapability.CommandDetection, (capability) => capability.onCommandFinished);
    const sub = multiplexer.event((e) => {
      this._onDidExecuteCommand(e.instance.instanceId, {
        commandLine: e.data.command,
        // TODO: Convert to URI if possible
        cwd: e.data.cwd,
        exitCode: e.data.exitCode,
        output: e.data.getOutput()
      });
    });
    this._sendCommandEventListener.value = combinedDisposable(multiplexer, sub);
  }
  $stopSendingCommandEvents() {
    this._sendCommandEventListener.clear();
  }
  $startLinkProvider() {
    this._linkProvider.value = this._terminalLinkProviderService.registerLinkProvider(new ExtensionTerminalLinkProvider(this._proxy));
  }
  $stopLinkProvider() {
    this._linkProvider.clear();
  }
  $registerProcessSupport(isSupported) {
    this._terminalService.registerProcessSupport(isSupported);
  }
  $registerProfileProvider(id, extensionIdentifier) {
    this._profileProviders.set(id, this._terminalProfileService.registerTerminalProfileProvider(extensionIdentifier, id, {
      createContributedTerminalProfile: /* @__PURE__ */ __name(async (options) => {
        return this._proxy.$createContributedProfileTerminal(id, options);
      }, "createContributedTerminalProfile")
    }));
  }
  $unregisterProfileProvider(id) {
    this._profileProviders.get(id)?.dispose();
    this._profileProviders.delete(id);
  }
  async $registerQuickFixProvider(id, extensionId) {
    this._quickFixProviders.set(id, this._terminalQuickFixService.registerQuickFixProvider(id, {
      provideTerminalQuickFixes: /* @__PURE__ */ __name(async (terminalCommand, lines, options, token) => {
        if (token.isCancellationRequested) {
          return;
        }
        if (options.outputMatcher?.length && options.outputMatcher.length > 40) {
          options.outputMatcher.length = 40;
          this._logService.warn("Cannot exceed output matcher length of 40");
        }
        const commandLineMatch = terminalCommand.command.match(options.commandLineMatcher);
        if (!commandLineMatch || !lines) {
          return;
        }
        const outputMatcher = options.outputMatcher;
        let outputMatch;
        if (outputMatcher) {
          outputMatch = getOutputMatchForLines(lines, outputMatcher);
        }
        if (!outputMatch) {
          return;
        }
        const matchResult = { commandLineMatch, outputMatch, commandLine: terminalCommand.command };
        if (matchResult) {
          const result = await this._proxy.$provideTerminalQuickFixes(id, matchResult, token);
          if (result && Array.isArray(result)) {
            return result.map((r) => parseQuickFix(id, extensionId, r));
          } else if (result) {
            return parseQuickFix(id, extensionId, result);
          }
        }
        return;
      }, "provideTerminalQuickFixes")
    }));
  }
  $unregisterQuickFixProvider(id) {
    this._quickFixProviders.get(id)?.dispose();
    this._quickFixProviders.delete(id);
  }
  _onActiveTerminalChanged(terminalId) {
    this._proxy.$acceptActiveTerminalChanged(terminalId);
  }
  _onTerminalData(terminalId, data) {
    this._proxy.$acceptTerminalProcessData(terminalId, data);
  }
  _onDidExecuteCommand(terminalId, command) {
    this._proxy.$acceptDidExecuteCommand(terminalId, command);
  }
  _onTitleChanged(terminalId, name) {
    this._proxy.$acceptTerminalTitleChange(terminalId, name);
  }
  _onTerminalDisposed(terminalInstance) {
    this._proxy.$acceptTerminalClosed(terminalInstance.instanceId, terminalInstance.exitCode, terminalInstance.exitReason ?? TerminalExitReason.Unknown);
  }
  _onTerminalOpened(terminalInstance) {
    const extHostTerminalId = terminalInstance.shellLaunchConfig.extHostTerminalId;
    const shellLaunchConfigDto = {
      name: terminalInstance.shellLaunchConfig.name,
      executable: terminalInstance.shellLaunchConfig.executable,
      args: terminalInstance.shellLaunchConfig.args,
      cwd: terminalInstance.shellLaunchConfig.cwd,
      env: terminalInstance.shellLaunchConfig.env,
      hideFromUser: terminalInstance.shellLaunchConfig.hideFromUser
    };
    this._proxy.$acceptTerminalOpened(terminalInstance.instanceId, extHostTerminalId, terminalInstance.title, shellLaunchConfigDto);
  }
  _onTerminalProcessIdReady(terminalInstance) {
    if (terminalInstance.processId === void 0) {
      return;
    }
    this._proxy.$acceptTerminalProcessId(terminalInstance.instanceId, terminalInstance.processId);
  }
  _onInstanceDimensionsChanged(instance) {
    this._proxy.$acceptTerminalDimensions(instance.instanceId, instance.cols, instance.rows);
  }
  _onInstanceMaximumDimensionsChanged(instance) {
    this._proxy.$acceptTerminalMaximumDimensions(instance.instanceId, instance.maxCols, instance.maxRows);
  }
  _onRequestStartExtensionTerminal(request) {
    const proxy = request.proxy;
    this._terminalProcessProxies.set(proxy.instanceId, proxy);
    const initialDimensions = request.cols && request.rows ? {
      columns: request.cols,
      rows: request.rows
    } : void 0;
    this._proxy.$startExtensionTerminal(
      proxy.instanceId,
      initialDimensions
    ).then(request.callback);
    proxy.onInput((data) => this._proxy.$acceptProcessInput(proxy.instanceId, data));
    proxy.onShutdown((immediate) => this._proxy.$acceptProcessShutdown(proxy.instanceId, immediate));
    proxy.onRequestCwd(() => this._proxy.$acceptProcessRequestCwd(proxy.instanceId));
    proxy.onRequestInitialCwd(() => this._proxy.$acceptProcessRequestInitialCwd(proxy.instanceId));
  }
  $sendProcessData(terminalId, data) {
    this._terminalProcessProxies.get(terminalId)?.emitData(data);
  }
  $sendProcessReady(terminalId, pid, cwd, windowsPty) {
    this._terminalProcessProxies.get(terminalId)?.emitReady(pid, cwd, windowsPty);
  }
  $sendProcessProperty(terminalId, property) {
    if (property.type === ProcessPropertyType.Title) {
      const instance = this._terminalService.getInstanceFromId(terminalId);
      instance?.rename(property.value);
    }
    this._terminalProcessProxies.get(terminalId)?.emitProcessProperty(property);
  }
  $setEnvironmentVariableCollection(extensionIdentifier, persistent, collection, descriptionMap) {
    if (collection) {
      const translatedCollection = {
        persistent,
        map: deserializeEnvironmentVariableCollection(collection),
        descriptionMap: deserializeEnvironmentDescriptionMap(descriptionMap)
      };
      this._environmentVariableService.set(extensionIdentifier, translatedCollection);
    } else {
      this._environmentVariableService.delete(extensionIdentifier);
    }
  }
};
__name(MainThreadTerminalService, "MainThreadTerminalService");
MainThreadTerminalService = __decorateClass([
  extHostNamedCustomer(MainContext.MainThreadTerminalService),
  __decorateParam(1, ITerminalService),
  __decorateParam(2, ITerminalLinkProviderService),
  __decorateParam(3, ITerminalQuickFixService),
  __decorateParam(4, IInstantiationService),
  __decorateParam(5, IEnvironmentVariableService),
  __decorateParam(6, ILogService),
  __decorateParam(7, ITerminalProfileResolverService),
  __decorateParam(8, IRemoteAgentService),
  __decorateParam(9, ITerminalGroupService),
  __decorateParam(10, ITerminalEditorService),
  __decorateParam(11, ITerminalProfileService)
], MainThreadTerminalService);
let TerminalDataEventTracker = class extends Disposable {
  constructor(_callback, _terminalService) {
    super();
    this._callback = _callback;
    this._terminalService = _terminalService;
    this._register(this._bufferer = new TerminalDataBufferer(this._callback));
    for (const instance of this._terminalService.instances) {
      this._registerInstance(instance);
    }
    this._register(this._terminalService.onDidCreateInstance((instance) => this._registerInstance(instance)));
    this._register(this._terminalService.onDidDisposeInstance((instance) => this._bufferer.stopBuffering(instance.instanceId)));
  }
  static {
    __name(this, "TerminalDataEventTracker");
  }
  _bufferer;
  _registerInstance(instance) {
    this._register(this._bufferer.startBuffering(instance.instanceId, instance.onData));
  }
};
TerminalDataEventTracker = __decorateClass([
  __decorateParam(1, ITerminalService)
], TerminalDataEventTracker);
class ExtensionTerminalLinkProvider {
  constructor(_proxy) {
    this._proxy = _proxy;
  }
  static {
    __name(this, "ExtensionTerminalLinkProvider");
  }
  async provideLinks(instance, line) {
    const proxy = this._proxy;
    const extHostLinks = await proxy.$provideLinks(instance.instanceId, line);
    return extHostLinks.map((dto) => ({
      id: dto.id,
      startIndex: dto.startIndex,
      length: dto.length,
      label: dto.label,
      activate: /* @__PURE__ */ __name(() => proxy.$activateLink(instance.instanceId, dto.id), "activate")
    }));
  }
}
function getOutputMatchForLines(lines, outputMatcher) {
  const match = lines.join("\n").match(outputMatcher.lineMatcher);
  return match ? { regexMatch: match, outputLines: lines } : void 0;
}
__name(getOutputMatchForLines, "getOutputMatchForLines");
function parseQuickFix(id, source, fix) {
  let type = TerminalQuickFixType.TerminalCommand;
  if ("uri" in fix) {
    fix.uri = URI.revive(fix.uri);
    type = TerminalQuickFixType.Opener;
  } else if ("id" in fix) {
    type = TerminalQuickFixType.VscodeCommand;
  }
  return { id, type, source, ...fix };
}
__name(parseQuickFix, "parseQuickFix");
export {
  MainThreadTerminalService,
  getOutputMatchForLines
};
//# sourceMappingURL=mainThreadTerminalService.js.map
