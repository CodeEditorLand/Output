const a = "__LAND_MAC_TITLEBAR_OFFSET__";
function o() {
	if (typeof window > "u") return;
	const e = window;
	if (e[a]) return;
	e[a] = !0;
	function n() {
		const t = document.createElement("style");
		(t.setAttribute("data-land-mac-titlebar-offset", "1"),
			(t.textContent = [
				".monaco-workbench.mac .part.titlebar > .titlebar-container {",
				"	padding-left: 80px;",
				"}",
				".monaco-workbench.mac .part.titlebar {",
				"	flex-direction: row !important;",
				"}",
				".monaco-workbench.mac .part.titlebar > .titlebar-container > .titlebar-drag-region {",
				"	left: 80px;",
				"	width: calc(100% - 80px);",
				"}",
				".monaco-workbench.mac .part.titlebar > .titlebar-container.has-center > .titlebar-center {",
				"	margin-inline-start: 16px;",
				"}",
			].join(`
`)),
			(document.head ?? document.documentElement).appendChild(t));
	}
	document.readyState === "loading"
		? document.addEventListener("DOMContentLoaded", n, { once: !0 })
		: n();
}
export { a as Marker, o as default };
