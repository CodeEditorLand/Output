const c = "__LAND_WORKBENCH_PAINT_PRIME_V2__";
function m() {
	if (typeof window > "u") return;
	const o = window;
	if (o[c]) return;
	o[c] = !0;
	const s = [
			".monaco-workbench .activitybar",
			".monaco-workbench .sidebar",
			".monaco-workbench .auxiliarybar",
			".monaco-workbench .panel",
			".monaco-workbench .editor",
			".monaco-workbench .titlebar",
			".monaco-workbench .statusbar",
			".monaco-workbench .banner",
			".monaco-workbench .part",
			".monaco-workbench .composite",
		],
		a = new WeakSet();
	function r(t) {
		if (!(!t || a.has(t))) {
			(a.add(t), t.offsetHeight);
			try {
				t.getBoundingClientRect();
			} catch {}
		}
	}
	function e() {
		for (const t of s) {
			const n = document.querySelectorAll(t);
			for (const u of Array.from(n)) r(u);
		}
	}
	function l(t) {
		let n = t;
		for (; n && n !== document.body; ) {
			if (
				n.classList &&
				(n.classList.contains("part") ||
					n.classList.contains("composite") ||
					n.classList.contains("activitybar") ||
					n.classList.contains("sidebar") ||
					n.classList.contains("auxiliarybar") ||
					n.classList.contains("panel") ||
					n.classList.contains("pane") ||
					n.classList.contains("editor"))
			)
				return n;
			n = n.parentElement;
		}
		return null;
	}
	function d(t) {
		const n = l(t.target);
		n && r(n);
	}
	function i() {
		(e(),
			setTimeout(e, 200),
			setTimeout(e, 800),
			document.addEventListener("pointerdown", d, {
				capture: !0,
				once: !1,
				passive: !0,
			}));
	}
	document.readyState === "loading"
		? document.addEventListener("DOMContentLoaded", i, { once: !0 })
		: i();
}
export { c as Marker, m as default };
