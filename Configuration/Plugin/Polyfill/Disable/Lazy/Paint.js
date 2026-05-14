var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
function DisableLazyPaint() {
	if (typeof window === "undefined") return;
	const Marker = "__LAND_DISABLE_LAZY_PAINT__";
	const Land = window;
	if (Land[Marker]) return;
	Land[Marker] = true;
	{
		let FlushRAF2 = function () {
			RAFFlushScheduled = false;
			const Drain = RAFQueue;
			RAFQueue = [];
			const Timestamp = performance.now();
			for (const Entry of Drain) {
				if (RAFCancelled.has(Entry.Id)) {
					RAFCancelled.delete(Entry.Id);
					continue;
				}
				try {
					Entry.Callback(Timestamp);
				} catch (Error2) {
					console.error(Error2);
				}
			}
		};
		var FlushRAF = FlushRAF2;
		__name(FlushRAF2, "FlushRAF");
		let RAFCounter = 0;
		let RAFQueue = [];
		let RAFFlushScheduled = false;
		const RAFCancelled = /* @__PURE__ */ new Set();
		window.requestAnimationFrame = (Callback) => {
			const Identifier = ++RAFCounter;
			RAFQueue.push({ Id: Identifier, Callback });
			if (!RAFFlushScheduled) {
				RAFFlushScheduled = true;
				setTimeout(FlushRAF2, 0);
			}
			return Identifier;
		};
		window.cancelAnimationFrame = (Identifier) => {
			RAFCancelled.add(Identifier);
		};
		const OriginalIO = window.IntersectionObserver;
		class FastIntersectionObserver {
			static {
				__name(this, "FastIntersectionObserver");
			}
			Callback;
			Disconnected = false;
			Observed = /* @__PURE__ */ new Set();
			constructor(Callback, _Options) {
				this.Callback = Callback;
			}
			observe(Target) {
				if (this.Disconnected) return;
				if (this.Observed.has(Target)) return;
				this.Observed.add(Target);
				const Self = this;
				queueMicrotask(() => {
					if (Self.Disconnected || !Self.Observed.has(Target)) return;
					let Rectangle;
					try {
						Rectangle = Target.getBoundingClientRect();
					} catch {
						Rectangle = {
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							width: 0,
							height: 0,
							x: 0,
							y: 0,
							toJSON() {
								return {};
							},
						};
					}
					const Entry = {
						target: Target,
						isIntersecting: true,
						intersectionRatio: 1,
						time: performance.now(),
						boundingClientRect: Rectangle,
						intersectionRect: Rectangle,
						rootBounds: null,
					};
					try {
						Self.Callback([Entry], Self);
					} catch (Error2) {
						console.error(Error2);
					}
				});
			}
			unobserve(Target) {
				this.Observed.delete(Target);
			}
			disconnect() {
				this.Disconnected = true;
				this.Observed.clear();
			}
			takeRecords() {
				return [];
			}
		}
		if (OriginalIO) {
			Land["__OriginalIntersectionObserver__"] = OriginalIO;
		}
		window["IntersectionObserver"] = FastIntersectionObserver;
	}
	function InstallStylesheet() {
		const Style = document.createElement("style");
		Style.setAttribute("data-land-disable-lazy-paint", "1");
		Style.textContent = [
			"*, ::before, ::after { content-visibility: visible !important; }",
			".monaco-workbench .part > .content,",
			".monaco-workbench .panel,",
			".monaco-workbench .viewlet,",
			".monaco-workbench .pane,",
			".monaco-workbench .pane-body,",
			".monaco-workbench .composite,",
			".monaco-workbench .activitybar,",
			".monaco-workbench .sidebar {",
			"  contain: none !important;",
			"  content-visibility: visible !important;",
			"}",
		].join("\n");
		(document.head ?? document.documentElement).appendChild(Style);
	}
	__name(InstallStylesheet, "InstallStylesheet");
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", InstallStylesheet, {
			once: true,
		});
	} else {
		InstallStylesheet();
	}
}
__name(DisableLazyPaint, "DisableLazyPaint");
export { DisableLazyPaint as default };
//# sourceMappingURL=Paint.js.map
