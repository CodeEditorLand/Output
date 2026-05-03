const u = (i, e) => {
		try {
			performance.mark(`land:${i}:${e}`);
		} catch {}
	},
	c = (i, e) => {
		try {
			const n = window.__TAURI_INTERNALS__,
				d =
					window.__TAURI__?.core?.invoke ??
					window.__TAURI__?.invoke ??
					n?.invoke;
			if (typeof d != "function") return;
			d("RenderDevLog", { Tag: i, Message: e, tag: i, message: e }).catch(
				() => {},
			);
		} catch {}
	},
	h = {
		localFilesystem: "file",
		storage: "storage",
		logger: "logger",
		configuration: "configuration",
		textFile: "textFile",
		extensions: "extensions",
		extensionManagement: "extensions",
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
		url: "url",
		menubar: "menubar",
		encryption: "encryption",
		extensionHostStarter: "extensionHostStarter",
		extensionhostdebugservice: "extensionhostdebugservice",
		localGit: "git",
	},
	y = new Set(["logger", "output"]),
	m = {
		localPty: {
			onProcessData: {
				Channel: "sky://terminal/data",
				Map: (i) => {
					const e = i;
					if (!(!e || typeof e.id != "number"))
						return { id: e.id, event: e.data ?? "" };
				},
			},
			onProcessReady: {
				Channel: "sky://terminal/create",
				Map: (i) => {
					const e = i;
					if (!(!e || typeof e.id != "number"))
						return {
							id: e.id,
							event: {
								pid: e.pid ?? 0,
								cwd: "",
								windowsPty: void 0,
							},
						};
				},
			},
			onProcessExit: {
				Channel: "sky://terminal/exit",
				Map: (i) => {
					const e = i;
					if (!(!e || typeof e.id != "number"))
						return { id: e.id, event: e.code ?? 0 };
				},
			},
		},
	},
	f = new Set(["localFilesystem"]),
	w = new Set([
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
	]),
	b = {
		sign: { sign: "", createNewMessage: "", validate: !0 },
		policy: { serialize: {}, registerPolicyChange: void 0 },
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
			disposeWorker: void 0,
		},
		meteredConnection: {},
		webContentExtractor: {},
		browserElements: {},
		NativeMcpDiscoveryHelper: { load: void 0 },
		sandboxHelper: {},
		mcpGateway: {},
		browserViewGroup: {},
		externalTerminal: {
			getDefaultTerminalForPlatforms: {
				windows: "cmd.exe",
				linux: "/usr/bin/x-terminal-emulator",
				osx: "Terminal.app",
			},
		},
		update: {
			checkForUpdates: { updateType: 0 },
			downloadUpdate: void 0,
			applyUpdate: void 0,
			quitAndInstall: void 0,
			isLatestVersion: !0,
			setInternalOrg: void 0,
			_getInitialState: { type: 0 },
		},
		webview: {
			setIgnoreMenuShortcuts: void 0,
			setContextMenuVisible: void 0,
			hideReference: void 0,
			showReference: void 0,
		},
		watcher: { watch: void 0, unwatch: void 0, setVerboseLogging: void 0 },
		telemetryAppender: { log: void 0, flush: void 0 },
		mcpGalleryManifest: { setMcpGalleryManifest: void 0 },
		diagnostics: {
			getWorkspaceFileExtensions: { extensions: [] },
			getPerformanceInfo: { processInfo: {}, workspaceInfo: {} },
			getSystemInfo: {},
			getDiagnostics: "",
			reportWorkspaceStats: {
				configFiles: [],
				fileTypes: [],
				launchConfigFiles: [],
			},
		},
		urlHandler: { registerHandler: void 0, open: !1, create: void 0 },
		userDataAutoSync: {
			isEnabled: !1,
			canToggleEnablement: !1,
			turnOn: void 0,
			turnOff: void 0,
		},
		download: { download: void 0 },
		extensionGalleryManifest: { setExtensionGalleryManifest: void 0 },
		extensionTipsService: {
			getImportantExecutableBasedTips: [],
			getOtherExecutableBasedTips: [],
			getAllWorkspacesTips: [],
			getConfigBasedTips: [],
			getImportantExecutableBasedTipsForExecutable: [],
		},
		mcpManagement: {
			getInstalled: [],
			install: void 0,
			uninstall: void 0,
			getGalleryServers: [],
			getLatest: void 0,
		},
		mcpWorkbenchManagement: {
			getInstalled: [],
			getLocalServers: [],
			install: void 0,
			uninstall: void 0,
		},
		userDataSync: {
			_getInitialData: [0, [], null],
			accept: void 0,
			resolveContent: null,
			replace: void 0,
			reset: void 0,
			stop: void 0,
			pull: void 0,
			hasPreviouslySynced: !1,
			hasLocalData: !1,
			turnOn: void 0,
			turnOff: void 0,
		},
		userDataSyncAccount: { _getInitialData: void 0, getAccount: void 0 },
		userDataSyncStoreManagement: { _getInitialData: null },
		languageDetection: {
			detectLanguage: null,
			provideLanguageDetectionHints: {
				fileExtensions: { extensions: [] },
			},
		},
		test: { getResults: [], addResult: void 0, clearResults: void 0 },
		profileStorageListener: { onDidChange: void 0 },
		checksum: { checksum: "" },
		languagePacks: {
			getAvailableLanguages: [],
			getInstalledLanguages: [],
			getBuiltInExtensionTranslationsUri: void 0,
		},
		userDataSyncUtil: {
			resolveDefaultIgnoredSettings: [],
			resolveUserKeybindings: {},
			resolveFormattingOptions: {
				eol: `
`,
				insertSpaces: !0,
				tabSize: 4,
			},
		},
		userDataSyncMachines: {
			getMachines: [],
			addCurrentMachine: void 0,
			removeCurrentMachine: void 0,
			renameMachine: void 0,
			setEnablements: void 0,
		},
		IUserDataSyncResourceProviderService: {
			getRemoteSyncedProfiles: [],
			getLocalSyncedProfiles: [],
			getRemoteSyncResourceHandles: [],
			getLocalSyncResourceHandles: [],
			getAssociatedResources: [],
			getMachineId: void 0,
			getLocalSyncedMachines: [],
			resolveContent: null,
		},
		customEndpointTelemetry: { publicLog: void 0, publicLogError: void 0 },
		process: {
			createTunnel: { id: "" },
			startTunnel: {},
			setAddress: void 0,
			setTunnelInUse: void 0,
			destroyTunnel: void 0,
		},
		remoteTunnel: {
			getTunnelStatus: { type: "disconnected" },
			getMode: { active: !1 },
			initialize: { type: "disconnected" },
			startTunnel: { type: "disconnected" },
			stopTunnel: void 0,
			getTunnelName: null,
			getAccount: null,
			getSessionToken: null,
		},
		sharedWebContentExtractor: { readImage: void 0 },
		playwright: {
			__initialize: void 0,
			click: void 0,
			hover: void 0,
			drag: void 0,
			fill: void 0,
			select: void 0,
			screenshot: null,
			snapshot: null,
			evaluate: null,
		},
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
async function p(i, e) {
	const n = window.__TAURI__?.core?.invoke ?? window.__TAURI__?.invoke;
	if (typeof n != "function") return;
	const d = typeof performance < "u" ? performance.now() : Date.now();
	try {
		return await n("MountainIPCInvoke", { method: i, params: e });
	} catch (l) {
		const a =
				(typeof performance < "u" ? performance.now() : Date.now()) - d,
			r = String(l);
		throw (
			((i === "file:stat" || i === "file:readFile") &&
				(r.includes("No such file or directory") ||
					r.includes("os error 2") ||
					/Resource not found/i.test(r))) ||
				c(
					"tauri-invoke-error",
					`[TauriInvoke] method=${i} ok=false elapsed_ms=${a.toFixed(2)} err=${r}`,
				),
			l
		);
	}
}
class v {
	constructor(e, n) {
		this.ChannelName = e;
		this.RoutePrefix = n;
	}
	ChannelName;
	RoutePrefix;
	async call(e, n, d) {
		if (
			e === "then" ||
			e === "catch" ||
			e === "finally" ||
			e === "constructor" ||
			e === "valueOf" ||
			e === "toString" ||
			e === "toJSON" ||
			e === "@@iterator" ||
			e === "@@asyncIterator"
		)
			return;
		if ((u("ipc", `${this.ChannelName}.${e}`), y.has(this.ChannelName))) {
			this.RoutePrefix &&
				p(
					`${this.RoutePrefix}:${e}`,
					n !== void 0 ? (Array.isArray(n) ? n : [n]) : [],
				).catch(() => {});
			return;
		}
		const l = b[this.ChannelName];
		if (l !== void 0) {
			u("ipc", `stub:${this.ChannelName}.${e}`);
			const a = l[e],
				r = Object.prototype.hasOwnProperty.call(l, e)
					? a === void 0
						? "noop"
						: "value"
					: "drift";
			return (
				r === "drift" &&
					c(
						"channel-stub",
						`stub-hit channel=${this.ChannelName} cmd=${e} disposition=${r}`,
					),
				a !== void 0 ? a : void 0
			);
		}
		if (this.RoutePrefix) {
			const a = `${this.RoutePrefix}:${e}`,
				r = n !== void 0 ? (Array.isArray(n) ? n : [n]) : [];
			try {
				const o = await p(a, r);
				if (
					f.has(this.ChannelName) &&
					(e === "readFile" || e === "read")
				) {
					const t = o;
					if (t != null) {
						const s = Array.isArray(t) ? t : t.buffer;
						if (Array.isArray(s)) {
							const g = new Uint8Array(s);
							return { buffer: g, byteLength: g.byteLength };
						}
					}
				}
				return o;
			} catch (o) {
				if (f.has(this.ChannelName) && w.has(e)) {
					const t = String(o),
						s = new Error(t);
					throw (
						t.includes("No such file or directory") ||
						t.includes("ENOENT") ||
						t.includes("not found")
							? ((s.code = "FileNotFound"),
								(s.fileOperationResult = 1))
							: t.includes("Permission denied") ||
								  t.includes("EACCES")
								? ((s.code = "NoPermissions"),
									(s.fileOperationResult = 6))
								: (t.includes("File exists") ||
										t.includes("EEXIST")) &&
									((s.code = "FileExists"),
									(s.fileOperationResult = 4)),
						s
					);
				}
				u("ipc", `error:${this.ChannelName}.${e}`);
				return;
			}
		}
		(u("ipc", `unknown:${this.ChannelName}.${e}`),
			c(
				"channel-stub",
				`miss channel=${this.ChannelName} cmd=${e} (no route, no stub)`,
			));
	}
	listen(e, n) {
		u("ipc", `listen:${this.ChannelName}.${e}`);
		const d = m[this.ChannelName]?.[e];
		return d
			? (l) => {
					let a = !1,
						r = null;
					return (
						import("@tauri-apps/api/event")
							.then(({ listen: o }) => {
								if (!a)
									return o(d.Channel, (t) => {
										const s = d.Map
											? d.Map(t.payload)
											: t.payload;
										s !== void 0 && l(s);
									});
							})
							.then((o) => {
								typeof o == "function" && (a ? o() : (r = o));
							})
							.catch(() => {}),
						{
							dispose: () => {
								((a = !0), r?.());
							},
						}
					);
				}
			: f.has(this.ChannelName) && e === "readFileStream"
				? (l) => {
						const a =
							n !== void 0 ? (Array.isArray(n) ? n : [n]) : [];
						return (
							Promise.all([
								import("../../../base/common/buffer.js"),
								p(`${this.RoutePrefix}:readFile`, a),
							])
								.then(([{ VSBuffer: r }, o]) => {
									const t = o;
									if (t != null) {
										const s = Array.isArray(t)
											? t
											: t.buffer;
										Array.isArray(s) &&
											l(r.wrap(new Uint8Array(s)));
									}
									l("end");
								})
								.catch((r) => {
									l(r);
								}),
							{ dispose: () => {} }
						);
					}
				: () => ({ dispose: () => {} });
	}
}
class k {
	Channels = new Map();
	constructor(e) {
		u("ipc", `TauriMainProcessService:window=${e}`);
	}
	getChannel(e) {
		let n = this.Channels.get(e);
		if (!n) {
			const d = h[e] ?? null;
			((n = new v(e, d)), this.Channels.set(e, n));
		}
		return n;
	}
	registerChannel(e, n) {}
	dispose() {
		this.Channels.clear();
	}
}
var S = k;
export { k as TauriMainProcessService, S as default };
