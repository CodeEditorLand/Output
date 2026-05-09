import {
	readdir as c,
	stat as f,
	writeFile as m,
	readFile as u,
} from "node:fs/promises";
import { join as R } from "node:path";

import b from "./Copy.js";

const w = (t) => /\.(m?js|cjs|ts|tsx|html)$/.test(t),
	y = async function* (t) {
		let i = [];

		try {
			i = await c(t, { withFileTypes: !0 });
		} catch {
			return;
		}

		for (const r of i) {
			const s = R(t, r.name);

			r.isDirectory()
				? yield* y(s)
				: r.isFile() && w(r.name) && (yield s);
		}
	},
	C = async (t, i) => {
		if (t.Enabled && !t.Enabled())
			return { Name: t.Name, Copied: 0, Skipped: 1 };

		let r = 0,
			s = 0;

		const e = [];

		for (const o of t.Entries) {
			const n = o.From.map((l) => ({
					From: l,
					To: o.To,
					Recursive: o.Recursive,
					Force: o.Force,
				})),
				a = await b(n);

			if (a.Resolved)
				(r++, e.push({ From: a.Resolved.From, To: a.Resolved.To }));
			else {
				if ((s++, t.Required))
					throw new Error(
						`Plugin ${t.Name}: no candidate resolved for ${o.To}${a.Error ? ` (${a.Error})` : ""}`,
					);

				i?.(`[${t.Name}] no candidate resolved for ${o.To}; skipping`);
			}
		}

		return (
			t.AfterCopy && e.length > 0 && (await t.AfterCopy(e)),
			{ Name: t.Name, Copied: r, Skipped: s }
		);
	},
	g = async (t, i) => {
		const r = new Map();

		for (const e of i) r.set(e.Name, { Rewritten: 0, Stubbed: 0 });

		const s = i.filter((e) => !(e.Enabled && !e.Enabled()));

		if (s.length === 0)
			return [...r.entries()].map(([e, o]) => ({ Name: e, ...o }));

		for (const e of t) {
			try {
				await f(e.Path);
			} catch {
				continue;
			}

			for await (const o of y(e.Path)) {
				let n;

				try {
					n = await u(o, "utf-8");
				} catch {
					continue;
				}

				let a = n;

				for (const l of s) {
					if (!l.Match({ Path: o, Role: e.Role })) continue;

					const p = await l.Transform({
						Path: o,
						Source: a,
						Role: e.Role,
					});

					if (p.Kind === "Unchanged") continue;

					a = p.Source;

					const d = r.get(l.Name);

					p.Kind === "Rewrite"
						? r.set(l.Name, {
								Rewritten: d.Rewritten + 1,
								Stubbed: d.Stubbed,
							})
						: r.set(l.Name, {
								Rewritten: d.Rewritten,
								Stubbed: d.Stubbed + 1,
							});
				}

				if (a !== n)
					try {
						await m(o, a, "utf-8");
					} catch {}
			}
		}

		return [...r.entries()].map(([e, o]) => ({ Name: e, ...o }));
	},
	A = async ({ Plugins: t, Roots: i, Log: r }) => {
		const s = [],
			e = [];

		for (const n of t)
			if (n.Kind === "Copy") {
				r?.(`[${n.Name}] starting`);

				const a = await C(n, r);

				(r?.(`[${n.Name}] copied=${a.Copied} skipped=${a.Skipped}`),
					s.push(a));
			} else e.push(n);

		const o = await g(i, e);

		for (const n of o)
			r?.(`[${n.Name}] rewritten=${n.Rewritten} stubbed=${n.Stubbed}`);

		return { Copy: s, Transform: o };
	};

var N = A;

export { N as default };
