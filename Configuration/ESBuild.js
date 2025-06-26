const e =
		process.env.NODE_ENV === "development" ||
		process.env.TAURI_ENV_DEBUG === "true",
	p = process.env.Dependency ?? "CodeEditorLand/Editor",
	r = process.env.Clean === "true",
	n = process.env.Browser === "true";
var c = {
	color: !0,
	format: "esm",
	logLevel: "debug",
	metafile: !0,
	minify: !e,
	outdir: "Configuration",
	platform: "node",
	target: "esnext",
	tsconfig: "tsconfig.json",
	write: !0,
	legalComments: e ? "inline" : "none",
	bundle: !1,
	assetNames: "Asset/[name]-[hash]",
	sourcemap: e,
	drop: e ? [] : ["debugger"],
	ignoreAnnotations: !e,
	keepNames: e,
	plugins: [
		{
			name: "Target",
			setup({ onStart: s, initialOptions: { outdir: o } }) {
				switch (!0) {
					case r === !0:
						s(async () => {
							try {
								o &&
									(await (
										await import("node:fs/promises")
									).rm(o, { recursive: !0 }));
							} catch (t) {
								console.log(t);
							}
						});
						break;
					default:
						break;
				}
			},
		},
	],
	loader: {
		".css": "css",
		".fish": "copy",
		".html": "copy",
		".json": "copy",
		".md": "copy",
		".mp3": "copy",
		".png": "copy",
		".ps1": "copy",
		".psm1": "copy",
		".scm": "copy",
		".scpt": "copy",
		".sh": "copy",
		".svg": "copy",
		".ttf": "copy",
		".txt": "copy",
		".zsh": "copy",
	},
};
const { sep: i, posix: a } = await import("node:path");
export {
	n as Browser,
	r as Clean,
	p as Dependency,
	e as On,
	c as default,
	a as posix,
	i as sep,
};
