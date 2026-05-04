var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const Markers = [
	"workbench/services/search/electron-browser/searchService.js",
	"workbench/services/search/browser/searchService.js",
];
const PathRegex = new RegExp(
	`(?:${Markers.map((Marker) => Marker.replaceAll("/", "\\/")).join("|")})$`,
);
const ReExport =
	"export { RemoteSearchService, LocalFileSearchWorkerClient } from '../common/CELSearchService.js';\n";
const Plugin = {
	Kind: "Transform",
	Name: "ReplaceSearchService",
	Enabled: /* @__PURE__ */ __name(
		() => process.env["Electron"] === "true",
		"Enabled",
	),
	Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
	Transform() {
		return { Kind: "Rewrite", Source: ReExport };
	},
};
var ReplaceSearchService_default = Plugin;
export { ReplaceSearchService_default as default };
//# sourceMappingURL=ReplaceSearchService.js.map
