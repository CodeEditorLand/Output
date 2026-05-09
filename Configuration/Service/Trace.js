const c = /land\.editor\.binary\.[^\s/\\)]+/g,
	a = (r) => r.replace(c, "$APP"),
	e = (r, t, n) => {
		try {
			performance.mark(`land:${r}:${t}`, {
				detail: n ? { ...n, Tag: r } : { Tag: r },
			});
		} catch {}
	},
	o = (r, t) => {
		const n = `land:${r}:${t}:start`;

		try {
			performance.mark(n);
		} catch {}

		return () => {
			try {
				performance.measure(`land:${r}:${t}`, n);
			} catch {}
		};
	},
	s = (r, t, n) => {
		try {
			performance.mark(`land:error:${r}:${a(t)}`, {
				detail: { Tag: r, Error: n ? String(n) : void 0 },
			});
		} catch {}
	};

var i = e;

export {
	a as Format,
	e as Trace,
	s as TraceError,
	o as TraceSpan,
	i as default,
};
