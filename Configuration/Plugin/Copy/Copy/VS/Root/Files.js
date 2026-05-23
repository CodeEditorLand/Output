import { join } from "node:path";

var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });

const DefaultFiles = [
	"nls.keys.json",
	"nls.messages.js",
	"nls.messages.json",
	"nls.metadata.json",
	"bootstrap-esm.js",
	"bootstrap-import.js",
	"bootstrap-meta.js",
];
const InlineStubs = {
	// Empty NLS message table: `vs/nls.js` reads
	// `globalThis._VSCODE_NLS_MESSAGES` by integer index; an empty array
	// causes the runtime to fall through to the per-call fallback string
	// every workbench `localize(id, fallback, …)` callsite already passes.
	"nls.messages.js":
		"globalThis._VSCODE_NLS_MESSAGES=globalThis._VSCODE_NLS_MESSAGES??[];export{};",
	// Empty JSON tables - workbench code reads these via `JSON.parse`
	// expecting either an array or object.
	"nls.keys.json": "[]",
	"nls.messages.json": "[]",
	"nls.metadata.json": "{}",
};
const InlineCandidate = /* @__PURE__ */ __name((File) => {
	const Body = InlineStubs[File];
	if (!Body) return null;
	return `data:text/javascript,${Body}`;
}, "InlineCandidate");
const ResolveOnDevelopment = /* @__PURE__ */ __name((Override) => {
	if (typeof Override === "boolean") return Override;
	const Env = process.env["NODE_ENV"];
	if (Env === "production") return false;
	if (Env === "development") return true;
	return process.env["TAURI_ENV_DEBUG"] === "true";
}, "ResolveOnDevelopment");
const BuildCandidates = /* @__PURE__ */ __name(
	(File, OutputRoot, DependencyOutBuild, DependencyOut, OnDevelopment) => {
		const PrimaryDependency = OnDevelopment
			? DependencyOut
			: DependencyOutBuild;
		const SecondaryDependency = OnDevelopment
			? DependencyOutBuild
			: DependencyOut;
		const Candidates = [
			join(OutputRoot, File),
			join(OutputRoot, "vs", File),
			join(PrimaryDependency, File),
			join(PrimaryDependency, "vs", File),
			join(SecondaryDependency, File),
			join(SecondaryDependency, "vs", File),
		];
		const Inline = InlineCandidate(File);
		if (Inline) Candidates.push(Inline);
		return Candidates;
	},
	"BuildCandidates",
);
const CopyVSRootFiles = /* @__PURE__ */ __name(
	({
		OutputRoot,
		DependencyOutBuild,
		DependencyOut,
		Destination,
		Files = DefaultFiles,
		OnDevelopment,
	}) => {
		const Dev = ResolveOnDevelopment(OnDevelopment);
		return {
			Kind: "Copy",
			Name: "CopyVSRootFiles",
			Entries: Files.map((File) => ({
				From: BuildCandidates(
					File,
					OutputRoot,
					DependencyOutBuild,
					DependencyOut,
					Dev,
				),
				To: join(Destination, File),
			})),
		};
	},
	"CopyVSRootFiles",
);
var Files_default = CopyVSRootFiles;
export { CopyVSRootFiles, Files_default as default };
//# sourceMappingURL=Files.js.map
