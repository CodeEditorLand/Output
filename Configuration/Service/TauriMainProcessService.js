var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const _Trace = /* @__PURE__ */ __name((Tag, Message) => {
  try {
    performance.mark(`land:${Tag}:${Message}`);
  } catch {
  }
}, "_Trace");
const ChannelRouteMap = {
  localFilesystem: "file",
  storage: "storage",
  logger: "logger",
  configuration: "configuration",
  textFile: "textFile",
  extensions: "extensions",
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
  // update: stubbed — Mountain doesn't implement IUpdateService yet
  url: "url",
  menubar: "menubar",
  encryption: "encryption",
  extensionHostStarter: "extensionHostStarter",
  extensionhostdebugservice: "extensionhostdebugservice"
};
const FireAndForgetChannels = /* @__PURE__ */ new Set(["logger", "output"]);
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
  // Fix: terminals.windows — IExternalTerminalService.getDefaultTerminalForPlatforms()
  externalTerminal: {
    getDefaultTerminalForPlatforms: {
      windows: "cmd.exe",
      linux: "/usr/bin/x-terminal-emulator",
      osx: "Terminal.app"
    }
  },
  // Fix: update.setInternalOrg — IUpdateService methods
  update: {
    checkForUpdates: { updateType: 0 },
    downloadUpdate: void 0,
    applyUpdate: void 0,
    quitAndInstall: void 0,
    isLatestVersion: true,
    setInternalOrg: void 0,
    _getInitialState: { type: 0 }
  }
};
async function InvokeMountain(Method, Params) {
  const Invoke = window.__TAURI__?.core?.invoke ?? window.__TAURI__?.invoke;
  if (typeof Invoke !== "function") return void 0;
  return await Invoke("MountainIPCInvoke", {
    method: Method,
    params: Params
  });
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
    _Trace("ipc", `${this.ChannelName}.${Command}`);
    if (FireAndForgetChannels.has(this.ChannelName)) {
      if (this.RoutePrefix) {
        InvokeMountain(
          `${this.RoutePrefix}:${Command}`,
          Arg !== void 0 ? Array.isArray(Arg) ? Arg : [Arg] : []
        ).catch(() => {
        });
      }
      return void 0;
    }
    const Stubs = StubChannels[this.ChannelName];
    if (Stubs !== void 0) {
      _Trace("ipc", `stub:${this.ChannelName}.${Command}`);
      const StubValue = Stubs[Command];
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
    return void 0;
  }
  listen(Event, Arg) {
    _Trace("ipc", `listen:${this.ChannelName}.${Event}`);
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
