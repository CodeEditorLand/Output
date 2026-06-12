/**
 * Plugin/Type - pluggable VS Code JS shim layer.
 *
 * Every patch / injection / copy previously inlined in
 * `Element/Sky/astro.config.ts` is modelled here as a pure data object with
 * either a `Transform` (string → string) or a `Sources` (file-copy tier
 * fallback) payload. The pure form has **zero esbuild dependency** - the
 * Rest compiler (or any future runner) can load the module, call
 * `Transform()` with `{ Path, Source, Role }`, and act on the result.
 *
 * The `AsEsbuildPlugin` adapter wraps a `TransformPlugin` into the standard
 * esbuild `Plugin` shape so the same logic can be fed into any esbuild-
 * driven build (Output's own `Source/ESBuild/Output.ts`, a future Sky vite
 * plugin, the Rest compiler's esbuild-compat surface).
 */

import type { Plugin as EsbuildPlugin } from "esbuild";

/**
 * Which build tier the file belongs to. Selects which transforms apply.
 *   "original"  - `Dependency/Microsoft/Dependency/Editor/src/vs/**` (.ts)
 *   "out"       - `Dependency/Microsoft/Dependency/Editor/out/vs/**` (tsc)
 *   "out-build" - `Dependency/Microsoft/Dependency/Editor/out-build/vs/**`
 *   "app"       - `Element/Sky/Target/Static/Application/**` (post-copy)
 *
 * A transform may apply to any subset of roles; most of Sky's Step N: blocks
 * target `"app"` because they run after the files have been copied and
 * re-rooted into Sky's target tree.
 */
export type FileRole = "original" | "out" | "out-build" | "app";

/**
 * Inputs a transform sees. `Source` is the UTF-8 text of the file, `Path` is
 * the absolute path on disk (or a virtual path when called from Rest with
 * in-memory input).
 */
export interface TransformInput {

	readonly Path: string;

	readonly Source: string;

	readonly Role: FileRole;
}

/**
 * `Unchanged` - no write, no-op from the runner's view.
 * `Rewrite`   - replace the file body.
 * `Stub`      - emit the file body even if the file didn't exist (used by the
 *               addon-stub plugin; identical to Rewrite but named for intent).
 */
export type TransformResult =
	| { readonly Kind: "Unchanged" }

	| { readonly Kind: "Rewrite"; readonly Source: string }

	| { readonly Kind: "Stub"; readonly Source: string };

export interface TransformPlugin {

	readonly Kind: "Transform";

	readonly Name: string;

	readonly Match: (Input: Pick<TransformInput, "Path" | "Role">) => boolean;

	readonly Transform: (
		Input: TransformInput,
	) => Promise<TransformResult> | TransformResult;

	/**
	 * Optional predicate evaluated once before the plugin runs. When it
	 * returns `false` the runner skips the plugin entirely. Used by the
	 * Electron-only transforms to gate on `process.env.Electron === "true"`
	 * without threading the env through every call site.
	 */
	readonly Enabled?: () => boolean;
}

/**
 * File-copy step. Each entry is tried in order; the first `From` that exists
 * is copied to `To` and the rest are ignored. `Required=true` fails the
 * runner when no candidate resolves; default behaviour is a best-effort
 * warning.
 */
/**
 * One logical copy unit. `From` is an **ordered candidate list** - the
 * runner tries each in sequence and stops at the first source that exists.
 * This matches the Step 1b tier-fallback pattern
 * (Output → out-build → out) and Step 11's node_modules fallback
 * (local node_modules → Dependency node_modules).
 */
export interface CopyEntry {

	readonly From: ReadonlyArray<string>;

	readonly To: string;

	readonly Recursive?: boolean;

	readonly Force?: boolean;
}

export interface CopyPlugin {

	readonly Kind: "Copy";

	readonly Name: string;

	readonly Entries: ReadonlyArray<CopyEntry>;

	readonly Required?: boolean;

	readonly Enabled?: () => boolean;

	/**
	 * Optional side-effect run after every entry resolves. Used by Step 11b
	 * (strip-dangling-sourcemap) which is logically attached to Step 11
	 * (copy node_modules) rather than standing on its own.
	 */
	readonly AfterCopy?: (
		Resolved: ReadonlyArray<{ From: string; To: string }>,
	) => Promise<void> | void;
}

export type Plugin = TransformPlugin | CopyPlugin;

/**
 * Wrap a `TransformPlugin` into an esbuild `Plugin`. The adapter registers
 * an `onLoad` hook for the supplied `Roots` and maps `Rewrite` / `Stub`
 * results into esbuild's `contents` return shape.
 *
 * Rest can ship an equivalent adapter keyed off its own plugin API; the
 * important invariant is that `Transform()` itself never touches esbuild.
 */
export const AsEsbuildPlugin = (
	Plugin: TransformPlugin,

	Options: {
		readonly Roots: ReadonlyArray<{
			readonly Path: string;

			readonly Role: FileRole;
		}>;
	},
): EsbuildPlugin => ({
	name: `output:${Plugin.Name}`,
	setup(Build) {
		Build.onLoad({ filter: /\.(m?js|cjs|ts|tsx|html)$/ }, async (Args) => {
			const Matched = Options.Roots.find((Root) =>
				Args.path.startsWith(Root.Path),
			);

			if (!Matched) return null;

			if (
				!Plugin.Match({ Path: Args.path, Role: Matched.Role }) ||
				(Plugin.Enabled && !Plugin.Enabled())
			) {
				return null;
			}

			const { readFile } = await import("node:fs/promises");

			const Source = await readFile(Args.path, "utf-8");

			const Result = await Plugin.Transform({
				Path: Args.path,
				Source,
				Role: Matched.Role,
			});

			if (Result.Kind === "Unchanged") return null;

			return {
				contents: Result.Source,
				loader: Args.path.endsWith(".html") ? "text" : "js",
			};
		});
	},
});

export default {} satisfies Record<string, never>;
