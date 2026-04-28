/**
 * Step: instrument the bundled vscode.git extension's `out/main.js` with
 * `process.stdout.write` markers at strategic points in the activation
 * pipeline. Diagnoses the F6 mystery - vscode.git activates ok in
 * 2814-4173 ms but never reaches `vscode.scm.createSourceControl`,
 * leaving the SCM viewlet empty.
 *
 * The extension's own `logger.info(...)` calls go through Cocoon's
 * `outputChannel.append` IPC, which is routed to the `output-verbose`
 * dev_log tag (muted in `LAND_DEV_LOG=short`). Even with the channel-
 * name routing fix in `OutputChannelAppend.rs`, individual `logger.X`
 * calls happen INSIDE the extension after `createOutputChannel` returns
 * a wrapper - if `createOutputChannel` itself was never reached (e.g.
 * `_activate` threw on line 189's `new vscode_1.Disposable(...)`), no
 * channel-routed logs appear at all.
 *
 * Bypassing the outputChannel layer entirely with `process.stdout.write`
 * markers gives us unambiguous progress signals visible in any
 * `LAND_DEV_LOG` mode. Each marker is a distinct prefix the watcher can
 * grep with no ambiguity:
 *
 *   [GIT-MARK-A] activate() entered
 *   [GIT-MARK-B] _activate Disposable ctor returned
 *   [GIT-MARK-C] _activate createOutputChannel returned
 *   [GIT-MARK-D] _activate config.get('enabled') = <value>
 *   [GIT-MARK-E] _activate await createModel start
 *   [GIT-MARK-F] _activate await createModel done
 *   [GIT-MARK-G] createModel findGit start
 *   [GIT-MARK-H] createModel findGit done version=<...>
 *   [GIT-MARK-I] createModel new Model() done
 *   [GIT-MARK-J] Model doInitialScan start
 *   [GIT-MARK-K] Model openRepository(<path>) start
 *   [GIT-MARK-L] Model openRepository getRepositoryRoot ok=<bool>
 *
 * Whichever marker is the LAST visible one identifies the bail point.
 *
 * Insertions are idempotent (`indexOf('[GIT-MARK-A]')` short-circuits)
 * so re-running the transform is a no-op.
 */

import type { TransformPlugin } from "../Type.js";

const Marker = (Letter: string, Note: string): string =>
	`try { process.stdout.write('[GIT-MARK-${Letter}] ${Note}\\n'); } catch (e) {} `;

// Each entry: marker letter + an exact-match anchor in the compiled
// source + injection placement (before/after the anchor). The anchors
// are stable lines from vscode.git's `extensions/git/out/main.js` /
// `out/model.js` (verified at 2026-04-26).
type MainPatch = {
	Letter: string;
	Anchor: string;
	Position: "before" | "after";
	Note: string;
};

const MainPatches: MainPatch[] = [
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

const ModelPatches: MainPatch[] = [
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
];

const ApplyPatches = (Source: string, Patches: MainPatch[]): string => {
	let Next = Source;
	for (const Patch of Patches) {
		const Inject = Marker(Patch.Letter, Patch.Note);
		// Idempotency: never inject if a marker with this letter is
		// already present.
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
};

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InstrumentVscodeGit",
	Match: ({ Path }) =>
		/extensions\/git\/(?:out|dist)\/main\.js$/.test(Path) ||
		/extensions\/git\/(?:out|dist)\/model\.js$/.test(Path),
	Transform({ Path, Source }) {
		const Patches = /main\.js$/.test(Path) ? MainPatches : ModelPatches;
		const Next = ApplyPatches(Source, Patches);
		return Next === Source
			? { Kind: "Unchanged" }
			: { Kind: "Rewrite", Source: Next };
	},
};

export default Plugin;
