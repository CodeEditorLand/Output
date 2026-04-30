var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const _Trace = /* @__PURE__ */ __name((Tag, Message) => {
  try {
    performance.mark(`land:${Tag}:${Message}`);
  } catch {
  }
}, "_Trace");
const _DevLogForward = /* @__PURE__ */ __name((Tag, Message) => {
  try {
    const Internals = window.__TAURI_INTERNALS__;
    const Invoke = window.__TAURI__?.core?.invoke ?? window.__TAURI__?.invoke ?? Internals?.invoke;
    if (typeof Invoke !== "function") return;
    Invoke("RenderDevLog", {
      Tag,
      Message,
      tag: Tag,
      message: Message
    }).catch(() => {
    });
  } catch {
  }
}, "_DevLogForward");
const ChannelRouteMap = {
  localFilesystem: "file",
  storage: "storage",
  logger: "logger",
  configuration: "configuration",
  textFile: "textFile",
  extensions: "extensions",
  // VS Code's Extensions sidebar (`extensionsWorkbenchService.ts:815`)
  // calls `extensionManagementService.getInstalled(...)`, which bridges
  // to the `extensionManagement` Electron IPC channel. Route it to the
  // same Mountain `extensions:*` prefix as the raw `extensions` channel
  // - Mountain's `extensions:getInstalled` handler returns the scan
  // registry, which is exactly what `@builtin` in the sidebar needs.
  // Without this mapping the channel fell through TauriChannel with no
  // RoutePrefix, every call returned `undefined`, and the Extensions
  // view stayed empty despite 94 extensions being scanned.
  extensionManagement: "extensions",
  // Extension gallery reads go to the same route - Mountain doesn't
  // implement a gallery backend yet, so the handler returns an empty
  // array which the sidebar renders as "no results", matching what a
  // user on an offline/air-gapped VS Code install sees.
  extensionGallery: "extensions",
  commands: "commands",
  terminal: "terminal",
  output: "output",
  notification: "notification",
  progress: "progress",
  quickInput: "quickInput",
  workspaces: "workspaces",
  themes: "themes",
  search: "search",
  environment: "environment",
  decorations: "decorations",
  workingCopy: "workingCopy",
  keybinding: "keybinding",
  lifecycle: "lifecycle",
  label: "label",
  model: "model",
  nativeHost: "nativeHost",
  localPty: "localPty",
  // update: stubbed - Mountain doesn't implement IUpdateService yet
  url: "url",
  menubar: "menubar",
  encryption: "encryption",
  extensionHostStarter: "extensionHostStarter",
  extensionhostdebugservice: "extensionhostdebugservice",
  // Git: the built-in `git` extension's `MainProcessService.getChannel("localGit")`
  // path. Stock VS Code backs this with `ILocalGitService` in the shared
  // process; Land routes every method (`exec`, `clone`, `pull`, `checkout`,
  // `revParse`, `fetch`, `revListCount`, `cancel`, `isAvailable`) to
  // Mountain's `git:*` subprocess handlers (see
  // `Mountain/Source/IPC/WindServiceHandlers/Git.rs`). Unmapped before
  // Batch 4, which fired `InvokeMountain("undefined:exec")` and left
  // SourceControl panel forever loading.
  localGit: "git"
};
const FireAndForgetChannels = /* @__PURE__ */ new Set(["logger", "output"]);
const ChannelEventBridge = {
  localPty: {
    // VS Code's `IPtyService.onProcessData` expects
    // `{ id: number, event: IProcessDataEvent | string }` per
    // `vs/platform/terminal/common/terminal.ts`. Mountain emits
    // `{ id, data }` from `Environment/TerminalProvider.rs::PTYReader`.
    // Re-key `data` → `event` to match.
    onProcessData: {
      Channel: "sky://terminal/data",
      Map: /* @__PURE__ */ __name((P) => {
        const Obj = P;
        if (!Obj || typeof Obj.id !== "number") return void 0;
        return { id: Obj.id, event: Obj.data ?? "" };
      }, "Map")
    },
    // Listen on `sky://terminal/create` because that's when Mountain
    // spawns the PTY (same moment the process is "ready" from the
    // renderer's POV - the workbench uses this event to drive xterm
    // MOUNT and start consuming `onProcessData`). The `processId`
    // channel exists separately for extension-host PID notifications
    // from Cocoon - not the same signal.
    onProcessReady: {
      Channel: "sky://terminal/create",
      Map: /* @__PURE__ */ __name((P) => {
        const Obj = P;
        if (!Obj || typeof Obj.id !== "number") return void 0;
        return {
          id: Obj.id,
          event: { pid: Obj.pid ?? 0, cwd: "", windowsPty: void 0 }
        };
      }, "Map")
    },
    onProcessExit: {
      Channel: "sky://terminal/exit",
      Map: /* @__PURE__ */ __name((P) => {
        const Obj = P;
        if (!Obj || typeof Obj.id !== "number") return void 0;
        return { id: Obj.id, event: Obj.code ?? 0 };
      }, "Map")
    }
  }
};
const FileSystemChannels = /* @__PURE__ */ new Set(["localFilesystem"]);
const FileSystemThrowCommands = /* @__PURE__ */ new Set([
  "stat",
  "readFile",
  "writeFile",
  "readdir",
  "mkdir",
  "delete",
  "rename",
  "copy",
  "open",
  "close",
  "read",
  "write",
  "realpath",
  "cloneFile"
]);
const StubChannels = {
  sign: { sign: "", createNewMessage: "", validate: true },
  policy: { serialize: {}, registerPolicyChange: void 0 },
  userDataProfiles: {},
  keyboardLayout: {
    getKeyboardLayoutData: {
      keyboardLayoutInfo: {
        model: "pc105",
        layout: "us",
        variant: "",
        options: "",
        rules: ""
      },
      keyboardMapping: {}
    }
  },
  sharedProcess: {},
  utilityProcessWorker: {
    createWorker: new Promise(() => {
    }),
    disposeWorker: void 0
  },
  meteredConnection: {},
  webContentExtractor: {},
  browserElements: {},
  NativeMcpDiscoveryHelper: { load: void 0 },
  sandboxHelper: {},
  mcpGateway: {},
  browserViewGroup: {},
  // Fix: terminals.windows - IExternalTerminalService.getDefaultTerminalForPlatforms()
  externalTerminal: {
    getDefaultTerminalForPlatforms: {
      windows: "cmd.exe",
      linux: "/usr/bin/x-terminal-emulator",
      osx: "Terminal.app"
    }
  },
  // Fix: update.setInternalOrg - IUpdateService methods
  update: {
    checkForUpdates: { updateType: 0 },
    downloadUpdate: void 0,
    applyUpdate: void 0,
    quitAndInstall: void 0,
    isLatestVersion: true,
    setInternalOrg: void 0,
    _getInitialState: { type: 0 }
  },
  // Fix: webview - IWebviewManagerService stub (prevents webview IPC errors)
  webview: {
    setIgnoreMenuShortcuts: void 0,
    setContextMenuVisible: void 0,
    hideReference: void 0,
    showReference: void 0
  },
  // Fix: watcher - IFileWatcherService stub (prevents file watch IPC errors)
  watcher: {
    watch: void 0,
    unwatch: void 0,
    setVerboseLogging: void 0
  },
  // Fix: `telemetryAppender` channel - stock VS Code's
  // TelemetryChannelAppender posts every single event through the
  // shared-process `telemetryAppender` IPC channel. Land has no
  // shared process and no telemetry backend, so every call falls
  // through to `InvokeMountain("undefined:log")`. Observed at 155
  // calls per boot in `channel-stub` tag output - by far the hottest
  // miss. Stub with the expected `log`/`flush` no-ops so the
  // appender short-circuits in the stub path instead of chewing
  // a Tauri round-trip each time.
  telemetryAppender: {
    log: void 0,
    flush: void 0
  },
  // Fix: `mcpGalleryManifest` channel - MCP extension marketplace
  // manifest bootstrap. `channel-stub` tag surfaced this as the sole
  // remaining `miss` per session. The workbench calls
  // `setMcpGalleryManifest({...})` once at boot to seed the MCP
  // gallery state; a no-op stub is sufficient until Land has an MCP
  // registry of its own to wire in.
  mcpGalleryManifest: {
    setMcpGalleryManifest: void 0
  },
  // Fix: diagnostics - IDiagnosticsService stub (prevents diagnostics errors)
  // Must include `getWorkspaceFileExtensions` - `languageDetectionWorker
  // ServiceImpl.resolveWorkspaceLanguageIds` iterates
  // `fileExtensions.extensions` directly and throws without this stub.
  diagnostics: {
    getWorkspaceFileExtensions: { extensions: [] },
    getPerformanceInfo: {
      processInfo: {},
      workspaceInfo: {}
    },
    getSystemInfo: {},
    getDiagnostics: "",
    reportWorkspaceStats: {
      configFiles: [],
      fileTypes: [],
      launchConfigFiles: []
    }
  },
  // Fix: urlHandler - IURLService stub (prevents vscode:// protocol errors)
  urlHandler: {
    registerHandler: void 0,
    open: false,
    create: void 0
  },
  // Fix: userDataAutoSync - IUserDataAutoSyncService stub
  userDataAutoSync: {
    isEnabled: false,
    canToggleEnablement: false,
    turnOn: void 0,
    turnOff: void 0
  },
  // Fix: download - IDownloadService stub (prevents extension gallery errors)
  download: {
    download: void 0
  },
  // Fix: extensionGalleryManifest - workbench seeds gallery metadata
  // via `setExtensionGalleryManifest({...})` once at boot. No-op stub
  // because Land doesn't host an extension gallery.
  extensionGalleryManifest: {
    setExtensionGalleryManifest: void 0
  },
  // Fix: `IExtensionTipsService` - `exeBasedRecommendations.ts:54` assigns
  // `this._importantTips = await this.extensionTipsService.getImportantExecutableBasedTips()`
  // and then calls `.forEach` on the result. Without a stub the IPC call
  // reaches no handler, returns undefined, and crashes the renderer with
  // `TypeError: undefined is not an object (evaluating 'this._importantTips.forEach')`.
  // Empty arrays = "no recommendations" (Land doesn't host an exe-based tips backend).
  extensionTipsService: {
    getImportantExecutableBasedTips: [],
    getOtherExecutableBasedTips: [],
    getAllWorkspacesTips: [],
    getConfigBasedTips: [],
    getImportantExecutableBasedTipsForExecutable: []
  },
  // Fix: `IMcpManagementService` - `mcpManagementIpc.ts:167` does
  // `.then(servers => servers.map(…))` expecting an array. Without a
  // stub the missing handler gives undefined and `.map` throws
  // `undefined is not an object (evaluating 'servers.map')`. Empty = no MCP servers.
  mcpManagement: {
    getInstalled: [],
    install: void 0,
    uninstall: void 0,
    getGalleryServers: [],
    getLatest: void 0
  },
  mcpWorkbenchManagement: {
    getInstalled: [],
    getLocalServers: [],
    install: void 0,
    uninstall: void 0
  },
  // Fix: `IUserDataSyncService._getInitialData` returns a
  // `[status, conflicts, lastSyncTime]` tuple the workbench destructures
  // at `userDataSyncServiceIpc.ts:165`. Channel name is `userDataSync`
  // (registered in
  // `workbench/services/userDataSync/electron-browser/userDataSyncService.ts:13`),
  // not `userDataSyncService`. `[0, [], null]` = Uninitialised / no conflicts /
  // never synced - disables sync without surfacing a bogus error.
  userDataSync: {
    _getInitialData: [0, [], null],
    accept: void 0,
    resolveContent: null,
    replace: void 0,
    reset: void 0,
    stop: void 0,
    pull: void 0,
    hasPreviouslySynced: false,
    hasLocalData: false,
    turnOn: void 0,
    turnOff: void 0
  },
  userDataSyncAccount: {
    _getInitialData: void 0,
    getAccount: void 0
  },
  userDataSyncStoreManagement: {
    _getInitialData: null
  },
  // Fix: `ILanguageDetectionService` - iterates
  // `fileExtensions.extensions` and crashes on undefined result.
  languageDetection: {
    detectLanguage: null,
    provideLanguageDetectionHints: { fileExtensions: { extensions: [] } }
  },
  // --- Batch 6: medium-priority channels stock VS Code exposes via the
  // shared/main process that Land doesn't have. Each stub lines up with
  // a `registerSharedProcessRemoteService` callsite in the stock tree
  // (grep returned the authoritative list). Shapes track the matching
  // `I*Service` interface under `vs/platform/**/common/*.ts` so the
  // renderer-side proxy's `.then(...)` / `.forEach` / destructure paths
  // don't crash on undefined.
  // ITestResultStorage-backed channel is in-process (not an IPC), but
  // stock code in
  // `vs/workbench/contrib/testing/common/testResultService.ts` does
  // `await testResultStorage.read()` and iterates - having an explicit
  // stub is cheaper than letting it fall through.
  test: {
    getResults: [],
    addResult: void 0,
    clearResults: void 0
  },
  // Profile-storage change notifier - emits on profile switch. Workbench
  // subscribes at boot and a missing handler surfaces as
  // `undefined.event` TypeError before any profile changes fire.
  profileStorageListener: {
    onDidChange: void 0
  },
  // IChecksumService - single method returning a hex digest string.
  // Workbench computes checksums of builtin extension bundles at boot.
  // Empty string keeps the hash-compare path silent (never equal, so
  // caching is disabled rather than asserting bogus equality).
  checksum: {
    checksum: ""
  },
  // ILanguagePackService - UI localisation gallery. Empty arrays =
  // "only en-US installed, no other packs available", which matches
  // Land's current non-localised state.
  languagePacks: {
    getAvailableLanguages: [],
    getInstalledLanguages: [],
    getBuiltInExtensionTranslationsUri: void 0
  },
  // IUserDataSyncUtilService - workbench-internal helper for sync conflict
  // resolution. Shape: { resolveDefaultIgnoredSettings, resolveUserKeybindings, resolveFormattingOptions }.
  userDataSyncUtil: {
    resolveDefaultIgnoredSettings: [],
    resolveUserKeybindings: {},
    resolveFormattingOptions: {
      eol: "\n",
      insertSpaces: true,
      tabSize: 4
    }
  },
  // IUserDataSyncMachinesService - list of machines syncing with
  // the backend. `getMachines` returns the array the UI iterates.
  userDataSyncMachines: {
    getMachines: [],
    addCurrentMachine: void 0,
    removeCurrentMachine: void 0,
    renameMachine: void 0,
    setEnablements: void 0
  },
  // IUserDataSyncResourceProviderService - resource enumeration for the
  // sync settings UI. The channel name is the interface name verbatim
  // (unlike the others) because VS Code didn't pick a wire-short
  // identifier here. Empty arrays = "no sync resources configured".
  IUserDataSyncResourceProviderService: {
    getRemoteSyncedProfiles: [],
    getLocalSyncedProfiles: [],
    getRemoteSyncResourceHandles: [],
    getLocalSyncResourceHandles: [],
    getAssociatedResources: [],
    getMachineId: void 0,
    getLocalSyncedMachines: [],
    resolveContent: null
  },
  // ICustomEndpointTelemetryService - third-party telemetry sinks. Land
  // centralises telemetry through Mountain's PostHog bridge, so both
  // methods are no-ops.
  customEndpointTelemetry: {
    publicLog: void 0,
    publicLogError: void 0
  },
  // ISharedProcessTunnelService wire name is `sharedProcessTunnel` -
  // exposed here under `process` because that's the string the shared
  // process registers internally in Electron. createTunnel must return
  // an object with `id` so the workbench destructure doesn't throw.
  process: {
    createTunnel: { id: "" },
    startTunnel: {},
    setAddress: void 0,
    setTunnelInUse: void 0,
    destroyTunnel: void 0
  },
  // IRemoteTunnelService - GitHub/Microsoft Dev-Tunnels integration.
  // Methods return shapes the workbench's tunnel status UI iterates.
  // `getMode: { active: false }` flags the feature as off so no toggles
  // try to spin up a tunnel session.
  remoteTunnel: {
    getTunnelStatus: { type: "disconnected" },
    getMode: { active: false },
    initialize: { type: "disconnected" },
    startTunnel: { type: "disconnected" },
    stopTunnel: void 0,
    getTunnelName: null,
    getAccount: null,
    getSessionToken: null
  },
  // ISharedWebContentExtractorService - extracts image bytes for
  // chat/image contribution. Returns undefined on every request =
  // "image unavailable", which the workbench renders as a placeholder
  // rather than crashing.
  sharedWebContentExtractor: {
    readImage: void 0
  },
  // IPlaywrightService - Browser-View contrib for automation tooling.
  // All methods return no-op values that let the UI render "playwright
  // unavailable" rather than throw.
  playwright: {
    // `PlaywrightChannelClient` posts `__initialize` on construction to
    // negotiate protocol version; surfaced as `disposition=drift` in
    // the previous boot. No-op acknowledgement leaves the client in
    // its default disconnected state.
    __initialize: void 0,
    click: void 0,
    hover: void 0,
    drag: void 0,
    fill: void 0,
    select: void 0,
    screenshot: null,
    snapshot: null,
    evaluate: null
  },
  // IV8InspectProfilingService - dev profiling used by the command
  // `Developer: Start Profiling`. `startProfiling` must return a session
  // id string; empty = "no active session" which the UI disables.
  v8InspectProfiling: {
    startProfiling: "",
    stopProfiling: {
      nodes: [],
      samples: [],
      timeDeltas: [],
      startTime: 0,
      endTime: 0
    }
  }
};
async function InvokeMountain(Method, Params) {
  const Invoke = window.__TAURI__?.core?.invoke ?? window.__TAURI__?.invoke;
  if (typeof Invoke !== "function") return void 0;
  const Start = typeof performance !== "undefined" ? performance.now() : Date.now();
  try {
    const Value = await Invoke("MountainIPCInvoke", {
      method: Method,
      params: Params
    });
    const Elapsed = (typeof performance !== "undefined" ? performance.now() : Date.now()) - Start;
    _DevLogForward(
      "tauri-invoke",
      `[TauriInvoke] method=${Method} ok=true elapsed_ms=${Elapsed.toFixed(2)}`
    );
    return Value;
  } catch (Error2) {
    const Elapsed = (typeof performance !== "undefined" ? performance.now() : Date.now()) - Start;
    const Message = String(Error2);
    const IsBenignEnoent = (Method === "file:stat" || Method === "file:readFile") && (Message.includes("No such file or directory") || Message.includes("os error 2") || /Resource not found/i.test(Message));
    if (!IsBenignEnoent) {
      _DevLogForward(
        "tauri-invoke-error",
        `[TauriInvoke] method=${Method} ok=false elapsed_ms=${Elapsed.toFixed(2)} err=${Message}`
      );
    }
    throw Error2;
  }
}
__name(InvokeMountain, "InvokeMountain");
class TauriChannel {
  constructor(ChannelName, RoutePrefix) {
    this.ChannelName = ChannelName;
    this.RoutePrefix = RoutePrefix;
  }
  ChannelName;
  RoutePrefix;
  static {
    __name(this, "TauriChannel");
  }
  async call(Command, Arg, _CancellationToken) {
    if (Command === "then" || Command === "catch" || Command === "finally" || Command === "constructor" || Command === "valueOf" || Command === "toString" || Command === "toJSON" || Command === "@@iterator" || Command === "@@asyncIterator") {
      return void 0;
    }
    _Trace("ipc", `${this.ChannelName}.${Command}`);
    if (FireAndForgetChannels.has(this.ChannelName)) {
      if (this.RoutePrefix) {
        InvokeMountain(
          `${this.RoutePrefix}:${Command}`,
          Arg !== void 0 ? Array.isArray(Arg) ? Arg : [Arg] : []
        ).catch(() => {
        });
      }
      _DevLogForward(
        "channel-stub",
        `fire-and-forget channel=${this.ChannelName} cmd=${Command} route=${this.RoutePrefix ?? "<none>"}`
      );
      return void 0;
    }
    const Stubs = StubChannels[this.ChannelName];
    if (Stubs !== void 0) {
      _Trace("ipc", `stub:${this.ChannelName}.${Command}`);
      const StubValue = Stubs[Command];
      const Disposition = Object.prototype.hasOwnProperty.call(
        Stubs,
        Command
      ) ? StubValue === void 0 ? "noop" : "value" : "drift";
      _DevLogForward(
        "channel-stub",
        `stub-hit channel=${this.ChannelName} cmd=${Command} disposition=${Disposition}`
      );
      return StubValue !== void 0 ? StubValue : void 0;
    }
    if (this.RoutePrefix) {
      const MountainMethod = `${this.RoutePrefix}:${Command}`;
      const Params = Arg !== void 0 ? Array.isArray(Arg) ? Arg : [Arg] : [];
      try {
        const Result = await InvokeMountain(MountainMethod, Params);
        if (FileSystemChannels.has(this.ChannelName) && (Command === "readFile" || Command === "read")) {
          const Raw = Result;
          if (Raw !== null && Raw !== void 0) {
            const Arr = Array.isArray(Raw) ? Raw : Raw.buffer;
            if (Array.isArray(Arr)) {
              const Bytes = new Uint8Array(Arr);
              return {
                buffer: Bytes,
                byteLength: Bytes.byteLength
              };
            }
          }
        }
        return Result;
      } catch (RawError) {
        if (FileSystemChannels.has(this.ChannelName) && FileSystemThrowCommands.has(Command)) {
          const ErrorMsg = String(RawError);
          const WrappedError = new Error(ErrorMsg);
          if (ErrorMsg.includes("No such file or directory") || ErrorMsg.includes("ENOENT") || ErrorMsg.includes("not found")) {
            WrappedError.code = "FileNotFound";
            WrappedError.fileOperationResult = 1;
          } else if (ErrorMsg.includes("Permission denied") || ErrorMsg.includes("EACCES")) {
            WrappedError.code = "NoPermissions";
            WrappedError.fileOperationResult = 6;
          } else if (ErrorMsg.includes("File exists") || ErrorMsg.includes("EEXIST")) {
            WrappedError.code = "FileExists";
            WrappedError.fileOperationResult = 4;
          }
          throw WrappedError;
        }
        _Trace("ipc", `error:${this.ChannelName}.${Command}`);
        return void 0;
      }
    }
    _Trace("ipc", `unknown:${this.ChannelName}.${Command}`);
    _DevLogForward(
      "channel-stub",
      `miss channel=${this.ChannelName} cmd=${Command} (no route, no stub)`
    );
    return void 0;
  }
  listen(Event, Arg) {
    _Trace("ipc", `listen:${this.ChannelName}.${Event}`);
    const SkyEventBridge = ChannelEventBridge[this.ChannelName]?.[Event];
    if (SkyEventBridge) {
      return ((Listener) => {
        let Disposed = false;
        let Unlisten = null;
        import("@tauri-apps/api/event").then(({ listen }) => {
          if (Disposed) return;
          return listen(SkyEventBridge.Channel, (TauriEvent) => {
            const Mapped = SkyEventBridge.Map ? SkyEventBridge.Map(TauriEvent.payload) : TauriEvent.payload;
            if (Mapped !== void 0) Listener(Mapped);
          });
        }).then((Result) => {
          if (typeof Result === "function") {
            if (Disposed) Result();
            else Unlisten = Result;
          }
        }).catch(() => {
        });
        return {
          dispose: /* @__PURE__ */ __name(() => {
            Disposed = true;
            Unlisten?.();
          }, "dispose")
        };
      });
    }
    if (FileSystemChannels.has(this.ChannelName) && Event === "readFileStream") {
      return ((Listener) => {
        const Params = Arg !== void 0 ? Array.isArray(Arg) ? Arg : [Arg] : [];
        Promise.all([
          import("../../../base/common/buffer.js"),
          InvokeMountain(`${this.RoutePrefix}:readFile`, Params)
        ]).then(([{ VSBuffer }, Result]) => {
          const Raw = Result;
          if (Raw !== null && Raw !== void 0) {
            const Arr = Array.isArray(Raw) ? Raw : Raw.buffer;
            if (Array.isArray(Arr)) {
              Listener(VSBuffer.wrap(new Uint8Array(Arr)));
            }
          }
          Listener("end");
        }).catch((Err) => {
          Listener(Err);
        });
        return { dispose: /* @__PURE__ */ __name(() => {
        }, "dispose") };
      });
    }
    return (() => ({ dispose: /* @__PURE__ */ __name(() => {
    }, "dispose") }));
  }
}
class TauriMainProcessService {
  static {
    __name(this, "TauriMainProcessService");
  }
  Channels = /* @__PURE__ */ new Map();
  constructor(_WindowId) {
    _Trace("ipc", `TauriMainProcessService:window=${_WindowId}`);
  }
  getChannel(ChannelName) {
    let Channel = this.Channels.get(ChannelName);
    if (!Channel) {
      const RoutePrefix = ChannelRouteMap[ChannelName] ?? null;
      Channel = new TauriChannel(ChannelName, RoutePrefix);
      this.Channels.set(ChannelName, Channel);
    }
    return Channel;
  }
  registerChannel(_ChannelName, _Channel) {
  }
  dispose() {
    this.Channels.clear();
  }
}
var TauriMainProcessService_default = TauriMainProcessService;
export {
  TauriMainProcessService,
  TauriMainProcessService_default as default
};
//# sourceMappingURL=TauriMainProcessService.js.map
