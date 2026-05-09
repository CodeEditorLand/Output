import { readFile as r } from "node:fs/promises";
import { fileURLToPath as t } from "node:url";

const n = "__LAND_EDITOR_GPU_LAYER__",
	o = t(
		new URL(
			"../../../../../../../Source/Asset/Style/Editor/GPU/Layer.css",

			import.meta.url,
		),
	),
	s =
		`
` + (await r(o, "utf8")),
	i = /editor\/browser\/(?:[^/]+\/)*[^/]+\.css$/,
	a = {
		Kind: "Transform",

		Name: "InjectEditorGPULayerCSS",

		Match: ({ Path: e }) => i.test(e),

		Transform({ Source: e }) {
			return e.includes(n)
				? { Kind: "Unchanged" }
				: { Kind: "Rewrite", Source: e + s };
		},
	};

var d = a;

export { d as default };
