const b = "__LAND_DISABLE_LAZY_PAINT__";
function w() {
	if (typeof window > "u") return;
	const i = window;
	if (i[b]) return;
	i[b] = !0;
	{
		let d = function () {
			s = !1;
			const t = c;
			c = [];
			const e = performance.now();
			for (const n of t) {
				if (a.has(n.Id)) {
					a.delete(n.Id);
					continue;
				}
				try {
					n.Callback(e);
				} catch (r) {
					console.error(r);
				}
			}
		};
		var O = d;
		let o = 0,
			c = [],
			s = !1;
		const a = new Set();
		((window.requestAnimationFrame = (t) => {
			const e = ++o;
			return (
				c.push({ Id: e, Callback: t }),
				s || ((s = !0), setTimeout(d, 0)),
				e
			);
		}),
			(window.cancelAnimationFrame = (t) => {
				a.add(t);
			}));
		const u = window.IntersectionObserver;
		class m {
			Callback;
			Disconnected = !1;
			Observed = new Set();
			constructor(e, n) {
				this.Callback = e;
			}
			observe(e) {
				if (this.Disconnected || this.Observed.has(e)) return;
				this.Observed.add(e);
				const n = this;
				queueMicrotask(() => {
					if (n.Disconnected || !n.Observed.has(e)) return;
					let r;
					try {
						r = e.getBoundingClientRect();
					} catch {
						r = {
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
					const v = {
						target: e,
						isIntersecting: !0,
						intersectionRatio: 1,
						time: performance.now(),
						boundingClientRect: r,
						intersectionRect: r,
						rootBounds: null,
					};
					try {
						n.Callback([v], n);
					} catch (h) {
						console.error(h);
					}
				});
			}
			unobserve(e) {
				this.Observed.delete(e);
			}
			disconnect() {
				((this.Disconnected = !0), this.Observed.clear());
			}
			takeRecords() {
				return [];
			}
		}
		(u && (i.__OriginalIntersectionObserver__ = u),
			(window.IntersectionObserver = m));
	}
	function l() {
		const o = document.createElement("style");
		(o.setAttribute("data-land-disable-lazy-paint", "1"),
			(o.textContent = [
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
			].join(`
`)),
			(document.head ?? document.documentElement).appendChild(o));
	}
	document.readyState === "loading"
		? document.addEventListener("DOMContentLoaded", l, { once: !0 })
		: l();
}
export { b as Marker, w as default };
