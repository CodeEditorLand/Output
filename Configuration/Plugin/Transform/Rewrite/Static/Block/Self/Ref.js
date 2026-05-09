const C = "/* __LAND_STATIC_BLOCK_SELFREF_REWRITTEN__ */";

function N(n) {
	return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function g(n, l) {
	const e = n[l],
		i = n[l + 1];

	if (e === "/" && i === "/") {
		let t = l + 2;

		for (
			;
			t < n.length &&
			n[t] !==
				`
`;
		)
			t++;
		return t;
	}
	if (e === "/" && i === "*") {
		let t = l + 2;
		for (; t < n.length; ) {
			if (n[t] === "*" && n[t + 1] === "/") return t + 2;
			t++;
		}
		return n.length;
	}
	if (e === '"' || e === "'" || e === "`") {
		const t = e;
		let s = l + 1;
		for (; s < n.length; ) {
			const c = n[s];
			if (c === "\\") {
				s += 2;
				continue;
			}
			if (c === t) return s + 1;
			s++;
		}
		return n.length;
	}
	return l;
}
function b(n, l) {
	let e = 1,
		i = l + 1;
	for (; i < n.length && e > 0; ) {
		const t = g(n, i);
		if (t > i) {
			i = t;
			continue;
		}
		const s = n[i];
		if (s === "{") e++;
		else if (s === "}" && (e--, e === 0)) return i;
		i++;
	}
	return n.length;
}
function B(n) {
	const l = [],
		e = [];
	let i = 0,
		t = 0;
	const s = /^class\b/,
		c = /^static\b/,
		d = /^[A-Za-z_$][\w$]*/;
	for (; t < n.length; ) {
		const f = g(n, t);
		if (f > t) {
			t = f;
			continue;
		}
		const p = n.slice(t),
			m = t > 0 ? n[t - 1] : "";
		if ((t === 0 || !/[\w$]/.test(m)) && s.test(p)) {
			let a = t + 5;
			for (; a < n.length && /\s/.test(n[a]); ) a++;
			const o = d.exec(n.slice(a));
			if (o) {
				const k = o[0];
				let r = a + k.length;
				for (; r < n.length; ) {
					const u = g(n, r);
					if (u > r) {
						r = u;
						continue;
					}
					if (n[r] === "{") break;
					if (n[r] === ";" || n[r] === "}") {
						r = -1;
						break;
					}
					r++;
				}
				if (r > 0 && r < n.length && n[r] === "{") {
					(e.push({ Name: k, OpenedAtDepth: i }), i++, (t = r + 1));
					continue;
				}
			}
		}
		const h = e[e.length - 1];
		if (
			h !== void 0 &&
			h.OpenedAtDepth === i - 1 &&
			(t === 0 || !/[\w$]/.test(m)) &&
			c.test(p)
		) {
			let a = t + 6;
			for (; a < n.length && /\s/.test(n[a]); ) a++;
			if (n[a] === "{") {
				const o = b(n, a);
				(l.push({ ClassName: h.Name, InnerStart: a + 1, InnerEnd: o }),
					(t = o + 1));
				continue;
			}
		}
		const w = n[t];
		if (w === "{") {
			(i++, t++);
			continue;
		}
		if (w === "}") {
			(i--, h !== void 0 && h.OpenedAtDepth === i && e.pop(), t++);
			continue;
		}
		t++;
	}
	return l;
}
const I = {
	Kind: "Transform",
	Name: "RewriteStaticBlockSelfRef",
	Match: ({ Path: n }) => /\/vs\/.*\.js$/.test(n) && !/\.d\.ts\.map$/.test(n),
	Transform({ Source: n }) {
		if (n.includes(C)) return { Kind: "Unchanged" };
		const l = B(n);
		if (l.length === 0) return { Kind: "Unchanged" };
		const e = [];
		let i = 0,
			t = !1;
		for (const s of l) {
			e.push(n.slice(i, s.InnerStart));
			const c = n.slice(s.InnerStart, s.InnerEnd),
				d = new RegExp(`(^|[^\\w$])${N(s.ClassName)}\\.`, "g"),
				f = c.replace(d, "$1this.");
			(f !== c && (t = !0), e.push(f), (i = s.InnerEnd));
		}
		return (
			e.push(n.slice(i)),
			t
				? {
						Kind: "Rewrite",
						Source:
							C +
							`
` +
							e.join(""),
					}
				: { Kind: "Unchanged" }
		);
	},
};
var $ = I;
export { $ as default };
