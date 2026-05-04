/**
 * Disable upstream VS Code services Land does not back with a real
 * implementation by replacing the *.contribution.js* (or equivalent
 * bootstrap) module body with an inert stub. The contribution barrel
 * normally registers singletons, registers commands, hooks into the
 * lifecycle, etc.; if the backing service throws or hangs, the workbench
 * surfaces broken UI (the gear icon turns red, sign-in dialogs appear,
 * notifications stack up). For Land these features are either:
 *
 *   1. Tied to Microsoft infrastructure that doesn't exist (settings
 *      sync, issue reporter, MS Account auth) - no behaviour worth
 *      preserving;
 *   2. Electron-shell features whose backing IPC channel doesn't reach
 *      a live service (auto-update, process explorer, native sandbox);
 *   3. Diagnostic/telemetry surfaces we want quiet (experiment service,
 *      telemetry contribution).
 *
 * Each match below replaces the entire file with a single
 * `// [Land] disabled` comment + an empty default export. Stock VS Code
 * imports the file for its side effects (singleton registrations); an
 * empty body simply means the singleton isn't registered, and any
 * caller that does `accessor.get(IUpdateService)` falls back to the
 * `NullUpdateService`-style default that VS Code wires elsewhere or to
 * a `service-not-found` error - both of which the workbench already
 * tolerates because these surfaces are gated behind product.json
 * capability flags.
 *
 * The list is intentionally narrow. Don't add a service here unless
 * you've verified:
 *   - The contribution module's only role is registering singletons /
 *     contributions for a feature we don't surface.
 *   - The backing channel is either stubbed in TauriMainProcessService
 *     or simply not called by any visible UI.
 *   - Extension activation, file IO, command palette, search, and
 *     terminal still work after the disable (run a smoke test).
 */

import type { TransformPlugin } from "../../../Type.js";

const InertBody =
	"// [Land] disabled by DisableUnusedServices transform.\nexport default {};\n";

// Path patterns that should be replaced. Each entry is anchored by
// `<path>.js$` so the regex matches the bundled output (which keeps the
// stock VS Code directory layout under `Static/Application/vs/`).
//
// Categories follow:
//   A. Update / auto-update - `IUpdateService` and the desktop wiring.
//      Land has no update server; the contribution would surface a
//      "Restart to Update" badge that does nothing.
//   B. Issue reporter - Microsoft GitHub issue wizard. Land directs
//      users to its own issue tracker via product.json.
//   C. Microsoft account / Settings Sync - Land has no MS account
//      backend. The contribution wires up the gear-icon sign-in.
//   D. Welcome / GettingStarted contribution - skips the first-run
//      walkthrough page so the editor opens straight to the workspace.
//      (The walkthrough viewlet is still installable on demand from
//      the command palette via `welcome.showAllWalkthroughs`.)
//   E. Process explorer - electron-shell window with a live PID list.
//      No matching Mountain side; previously rendered an empty pane.
//   F. Experiments - A/B test sampling against an MS endpoint Land
//      doesn't talk to.
const DisablePathSegments: string[] = [
	// A. Auto-update
	"workbench/contrib/update/browser/update.contribution.js",
	"workbench/contrib/update/electron-browser/update.contribution.js",
	// B. Issue reporter
	"workbench/contrib/issue/browser/issue.contribution.js",
	"workbench/contrib/issue/electron-browser/issue.contribution.js",
	// C. MS account / settings sync UI surface
	"workbench/contrib/userDataSync/browser/userDataSync.contribution.js",
	// D. Process explorer - electron-shell window with a live PID list.
	//    No matching Mountain side; previously rendered an empty pane.
	//
	// (`welcomeGettingStarted.contribution.js` is intentionally left
	// alive: it registers the `walkthrough.*` commands and a few view
	// containers other contributions reference. Disabling silently
	// breaks the Help menu surface.)
	"workbench/contrib/processExplorer/electron-browser/processExplorer.contribution.js",
];

const PathRegex = new RegExp(
	`(?:${DisablePathSegments.map((P) =>
		P.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
	).join("|")})$`,
);

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "DisableUnusedServices",
	Match: ({ Path }) => PathRegex.test(Path),
	Transform({ Source }) {
		// Already disabled (re-run on a previously-built tree).
		if (Source.includes("[Land] disabled by DisableUnusedServices")) {
			return { Kind: "Unchanged" };
		}
		return { Kind: "Rewrite", Source: InertBody };
	},
};

export default Plugin;
