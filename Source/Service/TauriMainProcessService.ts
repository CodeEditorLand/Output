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
	try {
		performance.mark(`land:${Tag}:${Message}`);
	} catch {}
};

// Mirror a tagged line into Mountain's dev-log file sink so
// `LAND_DEV_LOG=<tag> tail -f Mountain.dev.log` picks up TS-originated
// traffic alongside Rust `dev_log!` output. Fire-and-forget - never
// awaits, never throws. Mountain short-circuits cheaply when the tag
// isn't enabled. Mirror of the helper in Wind's TauriMainProcessService.
// Sends BOTH casings (`Tag`/`Message` + `tag`/`message`) so Tauri's
// param-case handling doesn't require a guess - the Rust command
// coalesces whichever arrived populated.
const _DevLogForward = (Tag: string, Message: string): void => {
	try {
		const Internals = (window as any).__TAURI_INTERNALS__;
		const Invoke =
			(window as any).__TAURI__?.core?.invoke ??
			(window as any).__TAURI__?.invoke ??
			Internals?.invoke;
		if (typeof Invoke !== "function") return;
		Invoke("RenderDevLog", {
			Tag,
			Message,
			tag: Tag,
			message: Message,
		}).catch(() => {});
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
	// Git: the built-in `git` extension's `MainProcessService.getChannel("localGit")`
	// path. Stock VS Code backs this with `ILocalGitService` in the shared
	// process; Land routes every method (`exec`, `clone`, `pull`, `checkout`,
	// `revParse`, `fetch`, `revListCount`, `cancel`, `isAvailable`) to
	// Mountain's `git:*` subprocess handlers (see
	// `Mountain/Source/IPC/WindServiceHandlers/Git.rs`). Unmapped before
	// Batch 4, which fired `InvokeMountain("undefined:exec")` and left
	// SourceControl panel forever loading.
	localGit: "git",
};

const FireAndForgetChannels = new Set(["logger", "output"]);

const FileSystemChannels = new Set(["localFilesystem"]);
const FileSystemThrowCommands = new Set([
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
	"cloneFile",
]);

const StubChannels: Record<string, Record<string, unknown>> = {
	sign: { sign: "", createNewMessage: "", validate: true },
	policy: { serialize: {}, registerPolicyChange: undefined },
	userDataProfiles: {},
	keyboardLayout: {
		getKeyboardLayoutData: {
			keyboardLayoutInfo: {
				model: "pc105",
				layout: "us",
				variant: "",
				options: "",
				rules: "",
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
		log: undefined,
		flush: undefined,
	},

	// Fix: `mcpGalleryManifest` channel - MCP extension marketplace
	// manifest bootstrap. `channel-stub` tag surfaced this as the sole
	// remaining `miss` per session. The workbench calls
	// `setMcpGalleryManifest({...})` once at boot to seed the MCP
	// gallery state; a no-op stub is sufficient until Land has an MCP
	// registry of its own to wire in.
	mcpGalleryManifest: {
		setMcpGalleryManifest: undefined,
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
		reportWorkspaceStats: {
			configFiles: [],
			fileTypes: [],
			launchConfigFiles: [],
		},
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

	// Fix: extensionGalleryManifest - workbench seeds gallery metadata
	// via `setExtensionGalleryManifest({...})` once at boot. No-op stub
	// because Land doesn't host an extension gallery.
	extensionGalleryManifest: {
		setExtensionGalleryManifest: undefined,
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
		addResult: undefined,
		clearResults: undefined,
	},

	// Profile-storage change notifier - emits on profile switch. Workbench
	// subscribes at boot and a missing handler surfaces as
	// `undefined.event` TypeError before any profile changes fire.
	profileStorageListener: {
		onDidChange: undefined,
	},

	// IChecksumService - single method returning a hex digest string.
	// Workbench computes checksums of builtin extension bundles at boot.
	// Empty string keeps the hash-compare path silent (never equal, so
	// caching is disabled rather than asserting bogus equality).
	checksum: {
		checksum: "",
	},

	// ILanguagePackService - UI localisation gallery. Empty arrays =
	// "only en-US installed, no other packs available", which matches
	// Land's current non-localised state.
	languagePacks: {
		getAvailableLanguages: [],
		getInstalledLanguages: [],
		getBuiltInExtensionTranslationsUri: undefined,
	},

	// IUserDataSyncUtilService - workbench-internal helper for sync conflict
	// resolution. Shape: { resolveDefaultIgnoredSettings, resolveUserKeybindings, resolveFormattingOptions }.
	userDataSyncUtil: {
		resolveDefaultIgnoredSettings: [],
		resolveUserKeybindings: {},
		resolveFormattingOptions: {
			eol: "\n",
			insertSpaces: true,
			tabSize: 4,
		},
	},

	// IUserDataSyncMachinesService - list of machines syncing with
	// the backend. `getMachines` returns the array the UI iterates.
	userDataSyncMachines: {
		getMachines: [],
		addCurrentMachine: undefined,
		removeCurrentMachine: undefined,
		renameMachine: undefined,
		setEnablements: undefined,
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
		getMachineId: undefined,
		getLocalSyncedMachines: [],
		resolveContent: null,
	},

	// ICustomEndpointTelemetryService - third-party telemetry sinks. Land
	// centralises telemetry through Mountain's PostHog bridge, so both
	// methods are no-ops.
	customEndpointTelemetry: {
		publicLog: undefined,
		publicLogError: undefined,
	},

	// ISharedProcessTunnelService wire name is `sharedProcessTunnel` -
	// exposed here under `process` because that's the string the shared
	// process registers internally in Electron. createTunnel must return
	// an object with `id` so the workbench destructure doesn't throw.
	process: {
		createTunnel: { id: "" },
		startTunnel: {},
		setAddress: undefined,
		setTunnelInUse: undefined,
		destroyTunnel: undefined,
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
		stopTunnel: undefined,
		getTunnelName: null,
		getAccount: null,
		getSessionToken: null,
	},

	// ISharedWebContentExtractorService - extracts image bytes for
	// chat/image contribution. Returns undefined on every request =
	// "image unavailable", which the workbench renders as a placeholder
	// rather than crashing.
	sharedWebContentExtractor: {
		readImage: undefined,
	},

	// IPlaywrightService - Browser-View contrib for automation tooling.
	// All methods return no-op values that let the UI render "playwright
	// unavailable" rather than throw.
	playwright: {
		// `PlaywrightChannelClient` posts `__initialize` on construction to
		// negotiate protocol version; surfaced as `disposition=drift` in
		// the previous boot. No-op acknowledgement leaves the client in
		// its default disconnected state.
		__initialize: undefined,
		click: undefined,
		hover: undefined,
		drag: undefined,
		fill: undefined,
		select: undefined,
		screenshot: null,
		snapshot: null,
		evaluate: null,
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
			endTime: 0,
		},
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

	// `tauri-invoke` tag: per-invoke duration + ok/fail in ms. Stock
	// `ipc` tag already logs the paired invoke/done from the Rust side
	// with nanosecond precision; this TS-side line captures round-trip
	// time *including* Tauri transport overhead, which lets us tell a
	// slow Rust handler (`ipc done t_ns` large) apart from a starved
	// webview message channel (`tauri-invoke elapsed_ms` large but
	// Rust-side `t_ns` small). Both tags are silent unless explicitly
	// enabled, so there's no cost when off.
	const Start =
		typeof performance !== "undefined" ? performance.now() : Date.now();
	try {
		const Value = await Invoke("MountainIPCInvoke", {
			method: Method,
			params: Params,
		});
		const Elapsed =
			(typeof performance !== "undefined"
				? performance.now()
				: Date.now()) - Start;
		// Success line is per-call and the Rust-side `ipc:done` already
		// carries the same data at ns precision. Only forward when the
		// caller explicitly opts into `tauri-invoke` via LAND_DEV_LOG so
		// normal runs stay quiet. Failures always forward.
		_DevLogForward(
			"tauri-invoke",
			`[TauriInvoke] method=${Method} ok=true elapsed_ms=${Elapsed.toFixed(2)}`,
		);
		return Value;
	} catch (Error) {
		const Elapsed =
			(typeof performance !== "undefined"
				? performance.now()
				: Date.now()) - Start;
		// ENOENT on the file:*  methods is expected - extensions probe
		// for optional workspace files (`.vscode/settings.json`,
		// `.vscode/tasks.json`, etc.) that don't exist on fresh installs.
		// Cocoon's own `readFile` converts the rejection into
		// `FileSystemError.FileNotFound` which extensions handle. The
		// Tauri-side error forwarder firing for every probe turns the
		// `short` log into a distraction. Suppress benign ENOENTs on the
		// filesystem methods; everything else still forwards.
		const Message = String(Error);
		const IsBenignEnoent =
			(Method === "file:stat" || Method === "file:readFile") &&
			(Message.includes("No such file or directory") ||
				Message.includes("os error 2") ||
				/Resource not found/i.test(Message));
		if (!IsBenignEnoent) {
			_DevLogForward(
				"tauri-invoke-error",
				`[TauriInvoke] method=${Method} ok=false elapsed_ms=${Elapsed.toFixed(2)} err=${Message}`,
			);
		}
		throw Error;
	}
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
			// Three-state disposition so the tag stops conflating
			// "stub present but value is intentionally undefined (no-op sink)"
			// with "key missing from stub object (drift - should be added)":
			//   - `value`: stub key maps to a real return payload
			//   - `noop`: stub key maps to `undefined` on purpose
			//     (telemetryAppender.log, webview.setIgnoreMenuShortcuts, …)
			//   - `drift`: channel is stubbed but THIS command isn't -
			//     worth investigating. Treated equivalently to miss here
			//     because renderer gets undefined either way.
			const Disposition = Object.prototype.hasOwnProperty.call(
				Stubs,
				Command,
			)
				? StubValue === undefined
					? "noop"
					: "value"
				: "drift";
			_DevLogForward(
				"channel-stub",
				`stub-hit channel=${this.ChannelName} cmd=${Command} disposition=${Disposition}`,
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
