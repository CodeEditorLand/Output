const e = "[Land] gpuAcceleration default",
	t = /workbench\/contrib\/terminal\/common\/terminalConfiguration\.js$/,
	r =
		/(enum:\s*\[\s*["']auto["']\s*,\s*["']on["']\s*,\s*["']off["']\s*\][\s\S]*?default:\s*)["']auto["']/,
	a = {
		Kind: "Transform",
		Name: "PatchTerminalGpuAcceleration",
		Match: ({ Path: n }) => t.test(n),
		Transform({ Source: n }) {
			return n.includes(e)
				? { Kind: "Unchanged" }
				: r.test(n)
					? {
							Kind: "Rewrite",
							Source: n.replace(r, `$1"off" /* ${e} */`),
						}
					: { Kind: "Unchanged" };
		},
	};
var o = a;
export { o as default };
