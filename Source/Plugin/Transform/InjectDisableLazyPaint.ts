/**
 * Disable WKWebView's lazy-paint mechanisms structurally so workbench
 * panels render on `display:flex` rather than waiting for the next
 * compositor invalidation (a hover, scroll, focus, or resize).
 *
 * # Why
 *
 * macOS WKWebView's Core Animation compositor does not repaint a
 * subtree on `display:none -> display:flex` unless something else
 * invalidates the layer. VS Code's `IViewletService.openViewlet`
 * flips display, schedules a `requestAnimationFrame` for layout,
 * and trusts the browser to commit. Chromium does. WKWebView does
 * not - the layer holds its empty backing store until a user event
 * triggers a `:hover` style recalc, at which point the panel
 * suddenly paints.
 *
 * The user has loaded the workbench directly and does not need
 * frame-synced animation. CSS transitions still work; what we are
 * killing is the optimisation path that defers paint to "the next
 * frame" - because in WKWebView "the next frame" never comes for
 * an offscreen-then-attached layer.
 *
 * # What this disables
 *
 * 1. **`requestAnimationFrame` -> coalesced `setTimeout(0)` queue.**
 *    All rAFs in one task drain in one event-loop tick; the tick
 *    yields back to the compositor BEFORE running the callbacks, so
 *    the compositor processes pending layout invalidations first.
 *    Stack-overflow safe (rAF-schedules-rAF still works).
 *
 * 2. **`IntersectionObserver` -> fire-on-observe.** Workbench tree-
 *    views and viewlet contributions install IOs to gate layout.
 *    WKWebView's IO implementation also waits for compositor frames.
 *    We replace it with a stub that fires `isIntersecting: true`
 *    one microtask after observe.
 *
 * 3. **`content-visibility: auto` and `contain: paint`** stripped
 *    from workbench-level CSS rules via an injected stylesheet.
 *    These tell the compositor "skip painting" - the same
 *    optimisation that bites us.
 *
 * # What this does NOT disable
 *
 * - `ResizeObserver` - correctness-critical for Monaco's layout
 *   tracking; not a lazy-paint mechanism.
 * - `requestIdleCallback` - already polyfilled by
 *   `InjectWebViewPolyfills.ts`; idle scheduling is fine.
 * - CSS transitions - they paint synchronously; not the issue.
 * - Cursor blink - uses rAF; under the new path it ticks via
 *   setTimeout 0 (~4 ms). Visually indistinguishable.
 *
 * # Idempotent
 *
 * Marker `__LAND_DISABLE_LAZY_PAINT__`. Skip on second pass.
 */

import type { TransformPlugin } from "../Type.js";

const Marker = "__LAND_DISABLE_LAZY_PAINT__";

const Polyfill = `
/* ${Marker} */
(function(){
	if (typeof window === "undefined") return;
	if (window.${Marker}) return;
	window.${Marker} = true;

	// ----- requestAnimationFrame: coalesced setTimeout 0 queue -----
	//
	// rAFs scheduled in the same task drain together one event-loop
	// tick later. The tick yields back to the WKWebView compositor
	// FIRST, so any pending paint invalidations process before our
	// callbacks run - that is exactly what makes panels appear on
	// show rather than on hover.
	var RAFCounter = 0;
	var RAFQueue = [];
	var RAFFlushScheduled = false;
	var RAFCancelled = new Set();
	function FlushRAF() {
		RAFFlushScheduled = false;
		var Drain = RAFQueue;
		RAFQueue = [];
		var Timestamp = performance.now();
		for (var Index = 0; Index < Drain.length; Index++) {
			var Entry = Drain[Index];
			if (RAFCancelled.has(Entry.Id)) {
				RAFCancelled.delete(Entry.Id);
				continue;
			}
			try { Entry.Callback(Timestamp); }
			catch (Error) { console.error(Error); }
		}
	}
	window.requestAnimationFrame = function(Callback) {
		var Id = ++RAFCounter;
		RAFQueue.push({ Id: Id, Callback: Callback });
		if (!RAFFlushScheduled) {
			RAFFlushScheduled = true;
			setTimeout(FlushRAF, 0);
		}
		return Id;
	};
	window.cancelAnimationFrame = function(Id) {
		RAFCancelled.add(Id);
	};

	// ----- IntersectionObserver: fire-on-observe -----
	//
	// Stub reports every observed target as fully intersecting one
	// microtask after observe() is called. unobserve() and
	// disconnect() honour their contract (no further callbacks).
	var OriginalIO = window.IntersectionObserver;
	function FastIntersectionObserver(Callback, Options) {
		this.Callback = Callback;
		this.Options = Options || {};
		this.Observed = new Set();
		this.Disconnected = false;
	}
	FastIntersectionObserver.prototype.observe = function(Target) {
		if (this.Disconnected) return;
		if (this.Observed.has(Target)) return;
		this.Observed.add(Target);
		var Self = this;
		queueMicrotask(function(){
			if (Self.Disconnected || !Self.Observed.has(Target)) return;
			var Rectangle;
			try { Rectangle = Target.getBoundingClientRect(); }
			catch (E) { Rectangle = { top:0, left:0, right:0, bottom:0, width:0, height:0, x:0, y:0, toJSON:function(){return{};} }; }
			var Entry = {
				target: Target,
				isIntersecting: true,
				intersectionRatio: 1,
				time: performance.now(),
				boundingClientRect: Rectangle,
				intersectionRect: Rectangle,
				rootBounds: null,
			};
			try { Self.Callback([Entry], Self); }
			catch (Error) { console.error(Error); }
		});
	};
	FastIntersectionObserver.prototype.unobserve = function(Target) {
		this.Observed.delete(Target);
	};
	FastIntersectionObserver.prototype.disconnect = function() {
		this.Disconnected = true;
		this.Observed.clear();
	};
	FastIntersectionObserver.prototype.takeRecords = function() {
		return [];
	};
	// Preserve constructor identity for instanceof checks; thread the
	// real type through under \`__OriginalIntersectionObserver__\` for
	// any code that wants to bypass.
	if (OriginalIO) window.__OriginalIntersectionObserver__ = OriginalIO;
	window.IntersectionObserver = FastIntersectionObserver;

	// ----- CSS lazy-paint kill -----
	//
	// Strip \`content-visibility: auto\` and \`contain: paint\` from
	// workbench-level rules via a high-specificity stylesheet
	// injected into the documentElement. These properties tell the
	// compositor it can skip painting - the same optimisation that
	// causes panels not to render on show.
	function InstallStylesheet() {
		var Style = document.createElement("style");
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
		].join("\\n");
		(document.head || document.documentElement).appendChild(Style);
	}
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", InstallStylesheet, { once: true });
	} else {
		InstallStylesheet();
	}
})();
`;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectDisableLazyPaint",
	Match: ({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};

export default Plugin;
