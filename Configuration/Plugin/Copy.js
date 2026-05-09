import {
	writeFile as c,
	stat as l,
	copyFile as n,
	cp as s,
	mkdir as t,
} from "node:fs/promises";
import { dirname as a } from "node:path";

const i = "data:text/javascript,",
	u = async (o) => {
		try {
			return (await l(o), !0);
		} catch {
			return !1;
		}
	},
	d = async (o) => {
		for (const r of o) {
			if (r.From.startsWith(i))
				try {
					return (
						await t(a(r.To), { recursive: !0 }),
						await c(r.To, r.From.slice(i.length), "utf-8"),
						{ Resolved: r }
					);
				} catch (e) {
					return {
						Resolved: null,

						Error:
							e instanceof globalThis.Error
								? e.message
								: String(e),
					};
				}

			if (await u(r.From))
				try {
					return (
						await t(a(r.To), { recursive: !0 }),
						r.Recursive
							? await s(r.From, r.To, {
									recursive: !0,
									force: r.Force ?? !0,
								})
							: await n(r.From, r.To),
						{ Resolved: r }
					);
				} catch (e) {
					return {
						Resolved: null,

						Error:
							e instanceof globalThis.Error
								? e.message
								: String(e),
					};
				}
		}

		return { Resolved: null };
	};

var f = d;

export { d as CopyFirstAvailable, f as default };
