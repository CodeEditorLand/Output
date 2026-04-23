/**
 * @module TauriMainProcessService
 *
 * Drop-in replacement for VS Code's ElectronIPCMainProcessService.
 * Routes channel.call() through Tauri invoke to Mountain's WindServiceHandlers.
 *
 * Zero console.* output. Tracing via performance.mark().
 * Build-baked OTEL bridge (OTELBridge.ts) collects marks automatically.
 */

import type { Event as VSCodeEvent } from "@codeeditorland/output/vs/base/common/event";
import type {
	IChannel,
	IServerChannel,
} from "@codeeditorland/output/vs/base/parts/ipc/common/ipc";

// Inline trace - performance.mark() collected by build-baked OTELBridge.
const _Trace = (Tag: string, Message: string): void => {
	try { performance.mark(`land:${Tag}:${Message}`); } catch {}
};

// Mirror a tagged line into Mountain's dev-log file sink so
// `LAND_DEV_LOG=<tag> tail -f Mountain.dev.log` picks up TS-originated
// traffic alongside Rust `dev_log!` output. Fire-and-forget - never
// awaits, never throws. Mountain short-circuits cheaply when the tag
// isn't enabled. Mirror of the helper in Wind's TauriMainProcessService.
const _DevLogForward = (Tag: string, Message: string): void => {
	try {
		const Invoke =
			(window as any).__TAURI__?.core?.invoke ??
			(window as any).__TAURI__?.invoke;
		if (typeof Invoke !== "function") return;
		Invoke("RenderDevLog", { Tag, Message }).catch(() => {});
	} catch {}
};

// ============================================================================
// Channel → Mountain Route Mapping
// ============================================================================

const ChannelRouteMap: Record<string, string> = {
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
};

const FireAndForgetChannels = new Set(["logger", "output"]);

const FileSystemChannels = new Set(["localFilesystem"]);
const FileSystemThrowCommands = new Set([
	"stat", "readFile", "writeFile", "readdir", "mkdir",
	"delete", "rename", "copy", "open", "close",
	"read", "write", "realpath", "cloneFile",
]);

const StubChannels: Record<string, Record<string, unknown>> = {
	sign: { sign: "", createNewMessage: "", validate: true },
	policy: { serialize: {}, registerPolicyChange: undefined },
	userDataProfiles: {},
	keyboardLayout: {
		getKeyboardLayoutData: {
			keyboardLayoutInfo: {
				model: "pc105", layout: "us", variant: "",
				options: "", rules: "",
			},
			keyboardMapping: {},
		},
	},
	sharedProcess: {},
	utilityProcessWorker: {
		createWorker: new Promise(() => {}),
		disposeWorker: undefined,
	},
	meteredConnection: {},
	webContentExtractor: {},
	browserElements: {},
	NativeMcpDiscoveryHelper: { load: undefined },
	sandboxHelper: {},
	mcpGateway: {},
	browserViewGroup: {},

	// Fix: terminals.windows - IExternalTerminalService.getDefaultTerminalForPlatforms()
	externalTerminal: {
		getDefaultTerminalForPlatforms: {
			windows: "cmd.exe",
			linux: "/usr/bin/x-terminal-emulator",
			osx: "Terminal.app",
		},
	},

	// Fix: update.setInternalOrg - IUpdateService methods
	update: {
		checkForUpdates: { updateType: 0 },
		downloadUpdate: undefined,
		applyUpdate: undefined,
		quitAndInstall: undefined,
		isLatestVersion: true,
		setInternalOrg: undefined,
		_getInitialState: { type: 0 },
	},

	// Fix: webview - IWebviewManagerService stub (prevents webview IPC errors)
	webview: {
		setIgnoreMenuShortcuts: undefined,
		setContextMenuVisible: undefined,
		hideReference: undefined,
		showReference: undefined,
	},

	// Fix: watcher - IFileWatcherService stub (prevents file watch IPC errors)
	watcher: {
		watch: undefined,
		unwatch: undefined,
		setVerboseLogging: undefined,
	},

	// Fix: diagnostics - IDiagnosticsService stub (prevents diagnostics errors)
	// Must include `getWorkspaceFileExtensions` - `languageDetectionWorker
	// ServiceImpl.resolveWorkspaceLanguageIds` iterates
	// `fileExtensions.extensions` directly and throws without this stub.
	diagnostics: {
		getWorkspaceFileExtensions: { extensions: [] },
		getPerformanceInfo: {
			processInfo: {},
			workspaceInfo: {},
		},
		getSystemInfo: {},
		getDiagnostics: "",
		reportWorkspaceStats: { configFiles: [], fileTypes: [], launchConfigFiles: [] },
	},

	// Fix: urlHandler - IURLService stub (prevents vscode:// protocol errors)
	urlHandler: {
		registerHandler: undefined,
		open: false,
		create: undefined,
	},

	// Fix: userDataAutoSync - IUserDataAutoSyncService stub
	userDataAutoSync: {
		isEnabled: false,
		canToggleEnablement: false,
		turnOn: undefined,
		turnOff: undefined,
	},

	// Fix: download - IDownloadService stub (prevents extension gallery errors)
	download: {
		download: undefined,
	},

	// Fix: extensionGalleryManifest - stub for gallery metadata
	extensionGalleryManifest: {},

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
		getImportantExecutableBasedTipsForExecutable: [],
	},

	// Fix: `IMcpManagementService` - `mcpManagementIpc.ts:167` does
	// `.then(servers => servers.map(…))` expecting an array. Without a
	// stub the missing handler gives undefined and `.map` throws
	// `undefined is not an object (evaluating 'servers.map')`. Empty = no MCP servers.
	mcpManagement: {
		getInstalled: [],
		install: undefined,
		uninstall: undefined,
		getGalleryServers: [],
		getLatest: undefined,
	},
	mcpWorkbenchManagement: {
		getInstalled: [],
		getLocalServers: [],
		install: undefined,
		uninstall: undefined,
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
		accept: undefined,
		resolveContent: null,
		replace: undefined,
		reset: undefined,
		stop: undefined,
		pull: undefined,
		hasPreviouslySynced: false,
		hasLocalData: false,
		turnOn: undefined,
		turnOff: undefined,
	},
	userDataSyncAccount: {
		_getInitialData: undefined,
		getAccount: undefined,
	},
	userDataSyncStoreManagement: {
		_getInitialData: null,
	},

	// Fix: `ILanguageDetectionService` - iterates
	// `fileExtensions.extensions` and crashes on undefined result.
	languageDetection: {
		detectLanguage: null,
		provideLanguageDetectionHints: { fileExtensions: { extensions: [] } },
	},
};

// ============================================================================
// Tauri Invoke
// ============================================================================

async function InvokeMountain(
	Method: string,
	Params: unknown[],
): Promise<unknown> {
	const Invoke =
		(window as any).__TAURI__?.core?.invoke ??
		(window as any).__TAURI__?.invoke;

	if (typeof Invoke !== "function") return undefined;

	return await Invoke("MountainIPCInvoke", {
		method: Method,
		params: Params,
	});
}

// ============================================================================
// TauriChannel - implements IChannel
// ============================================================================

class TauriChannel implements IChannel {
	constructor(
		private readonly ChannelName: string,
		private readonly RoutePrefix: string | null,
	) {}

	async call<T>(
		Command: string,
		Arg?: unknown,
		_CancellationToken?: unknown,
	): Promise<T> {
		_Trace("ipc", `${this.ChannelName}.${Command}`);

		if (FireAndForgetChannels.has(this.ChannelName)) {
			if (this.RoutePrefix) {
				InvokeMountain(
					`${this.RoutePrefix}:${Command}`,
					Arg !== undefined ? (Array.isArray(Arg) ? Arg : [Arg]) : [],
				).catch(() => {});
			}
			_DevLogForward(
				"channel-stub",
				`fire-and-forget channel=${this.ChannelName} cmd=${Command} route=${this.RoutePrefix ?? "<none>"}`,
			);
			return undefined as T;
		}

		const Stubs = StubChannels[this.ChannelName];
		if (Stubs !== undefined) {
			_Trace("ipc", `stub:${this.ChannelName}.${Command}`);
			const StubValue = Stubs[Command];
			_DevLogForward(
				"channel-stub",
				`stub-hit channel=${this.ChannelName} cmd=${Command} present=${StubValue !== undefined}`,
			);
			return (StubValue !== undefined ? StubValue : undefined) as T;
		}

		if (this.RoutePrefix) {
			const MountainMethod = `${this.RoutePrefix}:${Command}`;
			const Params =
				Arg !== undefined ? (Array.isArray(Arg) ? Arg : [Arg]) : [];

			try {
				const Result = await InvokeMountain(MountainMethod, Params);

				if (
					FileSystemChannels.has(this.ChannelName) &&
					(Command === "readFile" || Command === "read")
				) {
					const Raw = Result as
						| { buffer: number[] }
						| number[]
						| null
						| undefined;
					if (Raw !== null && Raw !== undefined) {
						const Arr = Array.isArray(Raw)
							? Raw
							: (Raw as { buffer: number[] }).buffer;
						if (Array.isArray(Arr)) {
							const Bytes = new Uint8Array(Arr);
							return {
								buffer: Bytes,
								byteLength: Bytes.byteLength,
							} as unknown as T;
						}
					}
				}
				return Result as T;
			} catch (RawError) {
				if (
					FileSystemChannels.has(this.ChannelName) &&
					FileSystemThrowCommands.has(Command)
				) {
					const ErrorMsg = String(RawError);
					const WrappedError = new Error(ErrorMsg) as any;
					if (
						ErrorMsg.includes("No such file or directory") ||
						ErrorMsg.includes("ENOENT") ||
						ErrorMsg.includes("not found")
					) {
						WrappedError.code = "FileNotFound";
						WrappedError.fileOperationResult = 1;
					} else if (
						ErrorMsg.includes("Permission denied") ||
						ErrorMsg.includes("EACCES")
					) {
						WrappedError.code = "NoPermissions";
						WrappedError.fileOperationResult = 6;
					} else if (
						ErrorMsg.includes("File exists") ||
						ErrorMsg.includes("EEXIST")
					) {
						WrappedError.code = "FileExists";
						WrappedError.fileOperationResult = 4;
					}
					throw WrappedError;
				}
				_Trace("ipc", `error:${this.ChannelName}.${Command}`);
				return undefined as T;
			}
		}

		_Trace("ipc", `unknown:${this.ChannelName}.${Command}`);
		_DevLogForward(
			"channel-stub",
			`miss channel=${this.ChannelName} cmd=${Command} (no route, no stub)`,
		);
		return undefined as T;
	}

	listen<T>(Event: string, Arg?: unknown): VSCodeEvent<T> {
		_Trace("ipc", `listen:${this.ChannelName}.${Event}`);

		if (
			FileSystemChannels.has(this.ChannelName) &&
			Event === "readFileStream"
		) {
			return ((Listener: (DataOrErrorOrEnd: unknown) => void) => {
				const Params =
					Arg !== undefined ? (Array.isArray(Arg) ? Arg : [Arg]) : [];

				Promise.all([
					import("../../../base/common/buffer.js") as Promise<{
						VSBuffer: { wrap(buffer: Uint8Array): unknown };
					}>,
					InvokeMountain(`${this.RoutePrefix}:readFile`, Params),
				])
					.then(([{ VSBuffer }, Result]) => {
						const Raw = Result as
							| { buffer: number[] }
							| number[]
							| null
							| undefined;
						if (Raw !== null && Raw !== undefined) {
							const Arr = Array.isArray(Raw)
								? Raw
								: (Raw as { buffer: number[] }).buffer;
							if (Array.isArray(Arr)) {
								Listener(VSBuffer.wrap(new Uint8Array(Arr)));
							}
						}
						Listener("end" as unknown);
					})
					.catch((Err) => {
						Listener(Err);
					});

				return { dispose: () => {} };
			}) as unknown as VSCodeEvent<T>;
		}

		return (() => ({ dispose: () => {} })) as unknown as VSCodeEvent<T>;
	}
}

// ============================================================================
// TauriMainProcessService - implements IMainProcessService
// ============================================================================

export class TauriMainProcessService {
	declare readonly _serviceBrand: undefined;

	private readonly Channels = new Map<string, TauriChannel>();

	constructor(_WindowId: number) {
		_Trace("ipc", `TauriMainProcessService:window=${_WindowId}`);
	}

	getChannel(ChannelName: string): IChannel {
		let Channel = this.Channels.get(ChannelName);
		if (!Channel) {
			const RoutePrefix = ChannelRouteMap[ChannelName] ?? null;
			Channel = new TauriChannel(ChannelName, RoutePrefix);
			this.Channels.set(ChannelName, Channel);
		}
		return Channel;
	}

	registerChannel(
		_ChannelName: string,
		_Channel: IServerChannel<string>,
	): void {}

	dispose(): void {
		this.Channels.clear();
	}
}

export default TauriMainProcessService;
