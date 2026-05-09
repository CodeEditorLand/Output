const o = "__LAND_PART_ZINDEX__";

function a() {
	if (typeof window > "u") return;

	const t = window;

	if (t[o]) return;

	t[o] = !0;

	function e() {
		const n = document.createElement("style");

		(n.setAttribute("data-land-part-zindex", "1"),
			(n.textContent = [
				".monaco-workbench .part {",

				"	isolation: isolate;",

				"}",

				".monaco-workbench .part.editor {",

				"	z-index: 1;",

				"}",

				".monaco-workbench .part.activitybar {",

				"	z-index: 10;",

				"}",

				".monaco-workbench .part.sidebar,",

				".monaco-workbench .part.auxiliarybar,",

				".monaco-workbench .part.panel {",

				"	z-index: 11;",

				"}",

				".monaco-workbench .part.banner {",

				"	z-index: 12;",

				"}",

				".monaco-workbench .part.statusbar {",

				"	z-index: 20;",

				"}",

				".monaco-workbench .part.panel.maximized {",

				"	z-index: 13;",

				"}",

				".monaco-workbench .editor-drop-target,",

				".monaco-workbench .editor-group-watermark {",

				"	z-index: 5;",

				"}",

				".monaco-workbench .quick-input-widget {",

				"	z-index: 2550 !important;",

				"}",

				".monaco-workbench .notifications-toasts {",

				"	z-index: 2575 !important;",

				"}",
			].join(`
`)),
			(document.head ?? document.documentElement).appendChild(n));
	}
	document.readyState === "loading"
		? document.addEventListener("DOMContentLoaded", e, { once: !0 })
		: e();
}
export { o as Marker, a as default };
