let o = null,
	l = null;
const c = () => {
		if (o !== null) return o;
		const e =
			window.__Trace ??
			(typeof localStorage < "u" ? localStorage.getItem("Trace") : null);
		return (
			(o = e
				? String(e)
						.split(",")
						.map((n) => n.trim().toLowerCase())
				: []),
			o
		);
	},
	g = () => (l !== null || (l = c().includes("short")), l),
	f = (e) => {
		const n = c();
		if (n.length === 0) return !1;
		if (g()) return !0;
		const t = e.toLowerCase();
		return n.some((s) => s === "all" || s === t);
	},
	h = /land\.editor\.binary\.[^\s/\\)]+/g,
	w = (e) => e.replace(h, "$APP");
let a = "",
	r = 0;
const d = () => {
		(r > 1 && console.log(`  (x${r})`), (a = ""), (r = 0));
	},
	p = (e, ...n) => {
		if (!f(e)) return;
		const t = e.toUpperCase();
		if (g()) {
			const s = n.map(String).join(" "),
				i = w(s),
				u = `${t}:${i}`;
			if (u === a) {
				r++;
				return;
			}
			(d(), (a = u), (r = 1), console.log(`[DEV:${t}]`, i));
		} else console.log(`[DEV:${t}]`, ...n);
	};
p.reset = () => {
	((o = null), (l = null), d());
};
var D = p;
export { D as default };
