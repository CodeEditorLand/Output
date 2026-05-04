var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const Marker = /* @__PURE__ */ __name(
	(Letter, Note) =>
		`try { process.stdout.write('[GIT-MARK-${Letter}] ${Note}\\n'); } catch (e) {} `,
	"Marker",
);
const MainPatches = [
	{
		Letter: "A",
		Anchor: "async function activate(context) {",
		Position: "after",
		Note: "activate() entered",
	},
	{
		Letter: "B",
		Anchor: "context.subscriptions.push(new vscode_1.Disposable(() => vscode_1.Disposable.from(...disposables).dispose()));",
		Position: "after",
		Note: "_activate Disposable ctor returned",
	},
	{
		Letter: "C",
		Anchor: "const logger = vscode_1.window.createOutputChannel('Git', { log: true });",
		Position: "after",
		Note: "_activate createOutputChannel returned",
	},
	{
		Letter: "D",
		Anchor: "const enabled = config.get('enabled');",
		Position: "after",
		Note: "_activate config.get(enabled) read",
	},
	{
		Letter: "E",
		Anchor: "const { model, cloneManager } = await createModel(context, logger, telemetryReporter, disposables);",
		Position: "before",
		Note: "_activate await createModel start",
	},
	{
		// F = `_activate await createModel done`. Fires only on the
		// success branch of the `try` - if createModel rejects, the
		// `catch` runs and F never appears, disambiguating "createModel
		// rejected silently" (E without F) from "model created"
		// (E + F + I).
		Letter: "F",
		Anchor: "return new extension_1.GitExtensionImpl({ model, cloneManager });",
		Position: "before",
		Note: "_activate await createModel done",
	},
	{
		Letter: "G",
		Anchor: "async function createModel(context, logger, telemetryReporter, disposables) {",
		Position: "after",
		Note: "createModel entered",
	},
	{
		Letter: "H",
		Anchor: "const info = await (0, git_1.findGit)(pathHints, gitPath => {",
		Position: "before",
		Note: "createModel findGit start",
	},
	{
		Letter: "I",
		Anchor: "const model = new model_1.Model(git, askpass, context.globalState, context.workspaceState, logger, telemetryReporter);",
		Position: "after",
		Note: "createModel new Model done",
	},
];
const ModelPatches = [
	{
		Letter: "J",
		Anchor: "async doInitialScan() {",
		Position: "after",
		Note: "Model doInitialScan start",
	},
	{
		Letter: "K",
		Anchor: "async openRepository(repoPath, openIfClosed = false, openIfParent = false) {",
		Position: "after",
		Note: "Model openRepository entered",
	},
	{
		// L = `Model openRepository getRepositoryRoot done`. Fires after
		// the `await this.getRepositoryRoot(repoPath)` resolves so we can
		// distinguish "openRepository entered but spawn hangs" (K only)
		// from "found repository root, proceeding to status() / scan
		// pipeline" (K + L). Anchor is the `logger.trace` line that
		// always immediately follows the await on the success path.
		Letter: "L",
		Anchor: "this.logger.trace(`[Model][openRepository] Repository root for path",
		Position: "before",
		Note: "Model openRepository getRepositoryRoot done",
	},
];
const ApplyPatches = /* @__PURE__ */ __name((Source, Patches) => {
	let Next = Source;
	for (const Patch of Patches) {
		const Inject = Marker(Patch.Letter, Patch.Note);
		if (Next.includes(`[GIT-MARK-${Patch.Letter}]`)) continue;
		const Index = Next.indexOf(Patch.Anchor);
		if (Index < 0) continue;
		if (Patch.Position === "after") {
			const End = Index + Patch.Anchor.length;
			Next = Next.slice(0, End) + " " + Inject + Next.slice(End);
		} else {
			Next = Next.slice(0, Index) + Inject + Next.slice(Index);
		}
	}
	return Next;
}, "ApplyPatches");
const Plugin = {
	Kind: "Transform",
	Name: "InstrumentVscodeGit",
	Match: /* @__PURE__ */ __name(
		({ Path }) =>
			/extensions\/git\/(?:out|dist)\/main\.js$/.test(Path) ||
			/extensions\/git\/(?:out|dist)\/model\.js$/.test(Path),
		"Match",
	),
	Transform({ Path, Source }) {
		const Patches = /main\.js$/.test(Path) ? MainPatches : ModelPatches;
		const Next = ApplyPatches(Source, Patches);
		return Next === Source
			? { Kind: "Unchanged" }
			: { Kind: "Rewrite", Source: Next };
	},
};
var InstrumentVscodeGit_default = Plugin;
export { InstrumentVscodeGit_default as default };
//# sourceMappingURL=InstrumentVscodeGit.js.map
