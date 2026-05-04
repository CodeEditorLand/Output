var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const Marker = "/* __LAND_WORKER_URLS_REWRITTEN__ */";
const URLPattern =
	/new URL\(\s*[`'"]([^`'"]+(?:WorkerMain\.tsx?(?:\?[^`'"]*)?|Iframe\.html))[`'"]\s*,\s*import\.meta\.url\s*\)/g;
const Plugin = {
	Kind: "Transform",
	Name: "RewriteWorkerURLs",
	// Every JS file under `vs/` is in scope - the URLPattern test below
	// short-circuits when no matching `new URL(...)` is present, so
	// non-affected files are walked-and-skipped with no rewrite.
	Match: /* @__PURE__ */ __name(
		({ Path }) => /\/vs\/.*\.js$/.test(Path) && !/\.d\.ts\.map$/.test(Path),
		"Match",
	),
	Transform({ Path, Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		if (!URLPattern.test(Source)) return { Kind: "Unchanged" };
		URLPattern.lastIndex = 0;
		const SourceFileDir = Path.split("/").slice(0, -1).join("/");
		const Next = Source.replace(URLPattern, (_Match, RelPath) => {
			const QueryIndex = RelPath.indexOf("?");
			let PathOnly =
				QueryIndex >= 0 ? RelPath.slice(0, QueryIndex) : RelPath;
			if (PathOnly.endsWith(".ts")) {
				PathOnly = PathOnly.slice(0, -3) + ".js";
			} else if (PathOnly.endsWith(".tsx")) {
				PathOnly = PathOnly.slice(0, -4) + ".js";
			}
			const Segments = (SourceFileDir + "/" + PathOnly).split("/");
			const Resolved = [];
			for (const Segment of Segments) {
				if (Segment === "" || Segment === ".") continue;
				if (Segment === "..") {
					Resolved.pop();
					continue;
				}
				Resolved.push(Segment);
			}
			let Joined = Resolved.join("/");
			Joined = Joined.replace(/^.*?\/Target\/Microsoft\/VSCode\//, "");
			return `new URL("/Static/Application/${Joined}", location.origin)`;
		});
		if (Next === Source) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Marker + "\n" + Next };
	},
};
var RewriteWorkerURLs_default = Plugin;
export { RewriteWorkerURLs_default as default };
//# sourceMappingURL=RewriteWorkerURLs.js.map
