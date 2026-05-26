/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="es2022" />

/**
 * # TauriDragRegion polyfill
 *
 * Stamps `data-tauri-drag-region` on the workbench titlebar drag
 * regions so click-and-drag on those areas actually moves the window
 * under Tauri 2.
 *
 * ## Why this is needed
 *
 * Stock VS Code Electron makes the titlebar draggable via a Chromium
 * `-webkit-app-region: drag` CSS rule set in `vs/workbench/.../titlebar`.
 * Tauri 2 with `decorations: false` + `TitleBarStyle::Overlay` ignores
 * `-webkit-app-region` and instead looks for the `data-tauri-drag-region`
 * HTML attribute (per Tauri docs - the attribute opts an element into
 * the OS-level window-drag hit-test). Without the attribute, dragging
 * the workbench titlebar selects text instead of moving the window.
 *
 * ## What this stamps
 *
 * The primary VS Code drag handle is `.titlebar-drag-region` (rendered
 * inside `.part.titlebar > .titlebar-container`). Older VS Code builds
 * fold it into the titlebar itself. We stamp every match on first scan
 * + observe `<body>` for late-mounted drag regions (titlebar repaints
 * on profile switch, window mode toggle, etc.).
 *
 * ## Always active
 *
 * Drag region wiring is needed on every OS the editor runs on, not
 * a "fix". Runs unconditionally - even with `DisableUIFixes=true`.
 *
 * Idempotent. Marker `__LAND_TAURI_DRAG_REGION__`. Re-stamping a
 * node is a no-op (attribute presence check before set).
 */

export default function TauriDragRegion(): void {
	if (typeof window === "undefined") return;

	if (typeof document === "undefined") return;

	const Marker = "__LAND_TAURI_DRAG_REGION__";

	const Land = window as unknown as Record<string, unknown>;

	if (Land[Marker]) return;

	Land[Marker] = true;

	// Primary drag handle plus the tabs-container fallback used when
	// `window.titleBarStyle` is `custom` and the editor-area tabs are
	// the window's draggable strip.
	const DragSelectors = [
		".monaco-workbench .part.titlebar > .titlebar-container > .titlebar-drag-region",
		".monaco-workbench .part.titlebar .titlebar-drag-region",
		".monaco-workbench .part.titlebar .titlebar-left .window-title",
	];

	// On any drag region we ALSO want to flag descendants that contain
	// `app-region: drag` in their stock CSS, so the dragability extends
	// edge-to-edge of the visible drag strip.
	const NoDragSelectors = [
		".monaco-workbench .part.titlebar .window-controls-container",
		".monaco-workbench .part.titlebar .menubar",
		".monaco-workbench .part.titlebar .command-center-container",
		".monaco-workbench .part.titlebar .titlebar-right",
	];

	function StampDrag(Node: Element): void {
		if (Node.getAttribute("data-tauri-drag-region") === null) {
			Node.setAttribute("data-tauri-drag-region", "");
		}
	}

	function StampNoDrag(Node: Element): void {
		// Interactive children (menu items, traffic-light hover zones,
		// command-center button) must not inherit drag behaviour or
		// click-to-drag eats their click events.
		if (Node.getAttribute("data-tauri-drag-region") !== "false") {
			Node.setAttribute("data-tauri-drag-region", "false");
		}
	}

	function ScanOnce(Root: ParentNode = document): void {
		for (const Selector of DragSelectors) {
			Root.querySelectorAll(Selector).forEach(StampDrag);
		}

		for (const Selector of NoDragSelectors) {
			Root.querySelectorAll(Selector).forEach(StampNoDrag);
		}
	}

	function HandleAdded(Node: Node): void {
		if (Node.nodeType !== 1) return;

		const Element = Node as Element;

		// Check the element itself...
		for (const Selector of DragSelectors) {
			if (Element.matches?.(Selector)) {
				StampDrag(Element);
			}
		}

		for (const Selector of NoDragSelectors) {
			if (Element.matches?.(Selector)) {
				StampNoDrag(Element);
			}
		}

		// ...and any descendants the workbench renders inside it.
		ScanOnce(Element);
	}

	function InstallObserver(): void {
		ScanOnce();

		const Root = document.body ?? document.documentElement;

		if (!Root) return;

		const Observer = new MutationObserver((Mutations) => {
			for (const Mutation of Mutations) {
				Mutation.addedNodes.forEach(HandleAdded);
			}
		});

		Observer.observe(Root, { childList: true, subtree: true });
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", InstallObserver, {
			once: true,
		});
	} else {
		InstallObserver();
	}
}
