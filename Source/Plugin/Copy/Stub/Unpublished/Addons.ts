/**
 * Step 12: Write AMD-style stubs for xterm addons VS Code references in
 * `xtermAddonImporter.ts` but which are not yet published to npm.
 *
 * Without a stub, the AMD loader GETs the missing `.js`, receives the SPA
 * HTML fallback, and `SyntaxError: Unexpected token '<'` kills the terminal
 * view. The stub exposes a no-op `ProgressAddon` (and can be extended with
 * more as addons slip in/out of the upstream build).
 *
 * Unlike the other copy plugins, this one writes a static string rather
 * than copying an existing file. It uses the CopyPlugin shape because it
 * fits the same "emit N files to N destinations" slot in the pipeline; the
 * runner special-cases the `From` prefix `data:text/javascript,` so no
 * filesystem candidate is expected.
 */

import { join } from "node:path";

import type { CopyPlugin } from "../../../Type.js";

export interface StubUnpublishedAddonsInput {
	readonly Destination: string;

	readonly Stubs?: ReadonlyArray<{
		readonly Package: string;

		readonly Body: string;
	}>;
}

export const DefaultStubs = [
	{
		Package: "@xterm/addon-progress",

		Body: "define([],function(){var n=function(){};var P=function(){this.activate=n;this.dispose=n;this.onChange=function(){return{dispose:n}}};return{ProgressAddon:P}})",
	},
] as const;

/**
 * Marker prefix that tells the runner to treat `From` as an inline body to
 * write instead of a filesystem path. Kept local to this plugin - the
 * runner's `CopyFirstAvailable` helper recognises the prefix and routes to
 * a `writeFile` branch.
 */
const DataPrefix = "data:text/javascript,";

export const StubUnpublishedAddons = ({
	Destination,
	Stubs = DefaultStubs,
}: StubUnpublishedAddonsInput): CopyPlugin => ({
	Kind: "Copy",

	Name: "StubUnpublishedAddons",

	Entries: Stubs.map((Stub) => {
		const FileName = Stub.Package.split("/").pop()!;
		return {
			From: [DataPrefix + Stub.Body],
			To: join(Destination, Stub.Package, "lib", `${FileName}.js`),
		};
	}),
});

export const StubDataPrefix = DataPrefix;

export default StubUnpublishedAddons;
