/**
 * Plugin/Apply - pure-function runner used by Sky's `astro:build:done` hook
 * (and eventually by Rest).
 *
 * Walks each configured `Root`, reads every file once, feeds it through every
 * matching `TransformPlugin`, writes the result back when changed. Copy
 * plugins run separately, in declaration order, before transforms on the
 * affected roots so Step 11b (sourcemap strip) sees Step 11's fresh copy.
 *
 * The runner never imports esbuild - it is the generic driver that any
 * compiler (esbuild, Rest, hand-rolled) can reuse. For integration into an
 * esbuild pipeline directly, use `AsEsbuildPlugin` from `./Type`.
 */

import type { Dirent } from "node:fs";

import { readdir, readFile, stat, writeFile } from "node:fs/promises";

import { join } from "node:path";

import CopyFirstAvailable from "./Copy.js";

import type { CopyPlugin, FileRole, Plugin, TransformPlugin } from "./Type.js";

export interface ApplyRoot {

	readonly Path: string;

	readonly Role: FileRole;
}

export interface ApplyInput {

	readonly Plugins: ReadonlyArray<Plugin>;

	readonly Roots: ReadonlyArray<ApplyRoot>;

	readonly Log?: (Message: string) => void;
}

export interface CopyResult {

	readonly Name: string;

	readonly Copied: number;

	readonly Skipped: number;
}

export interface TransformResult {

	readonly Name: string;

	readonly Rewritten: number;

	readonly Stubbed: number;
}

export interface ApplyOutcome {

	readonly Copy: ReadonlyArray<CopyResult>;

	readonly Transform: ReadonlyArray<TransformResult>;
}

const IsTransformable = (Name: string): boolean =>
	/\.(m?js|cjs|ts|tsx|html)$/.test(Name);

const WalkFiles = async function* (
	Dir: string,
): AsyncGenerator<string, void, void> {

	let Entries: Dirent[] = [];

	try {
		Entries = await readdir(Dir, { withFileTypes: true });
	} catch {
		return;
	}

	for (const Entry of Entries) {
		const Full = join(Dir, Entry.name);

		if (Entry.isDirectory()) {
			yield* WalkFiles(Full);
		} else if (Entry.isFile() && IsTransformable(Entry.name)) {
			yield Full;
		}
	}
};

const RunCopy = async (
	Plugin: CopyPlugin,

	Log?: (Message: string) => void,
): Promise<CopyResult> => {

	if (Plugin.Enabled && !Plugin.Enabled()) {
		return { Name: Plugin.Name, Copied: 0, Skipped: 1 };
	}

	let Copied = 0;

	let Skipped = 0;

	const Resolved: Array<{ From: string; To: string }> = [];

	for (const Entry of Plugin.Entries) {
		const Candidates = Entry.From.map((From) => ({
			From,
			To: Entry.To,
			...(Entry.Recursive !== undefined
				? { Recursive: Entry.Recursive }
				: {}),
			...(Entry.Force !== undefined ? { Force: Entry.Force } : {}),
		}));

		const Outcome = await CopyFirstAvailable(Candidates);

		if (Outcome.Resolved) {
			Copied++;

			Resolved.push({
				From: Outcome.Resolved.From,
				To: Outcome.Resolved.To,
			});
		} else {
			Skipped++;

			if (Plugin.Required) {
				throw new Error(
					`Plugin ${Plugin.Name}: no candidate resolved for ${Entry.To}${
						Outcome.Error ? ` (${Outcome.Error})` : ""
					}`,
				);
			}

			Log?.(
				`[${Plugin.Name}] no candidate resolved for ${Entry.To}; skipping`,
			);
		}
	}

	if (Plugin.AfterCopy && Resolved.length > 0) {
		await Plugin.AfterCopy(Resolved);
	}

	return { Name: Plugin.Name, Copied, Skipped };
};

const RunTransforms = async (
	Roots: ReadonlyArray<ApplyRoot>,

	Transforms: ReadonlyArray<TransformPlugin>,
): Promise<ReadonlyArray<TransformResult>> => {

	const Counters = new Map<string, { Rewritten: number; Stubbed: number }>();

	for (const T of Transforms) {
		Counters.set(T.Name, { Rewritten: 0, Stubbed: 0 });
	}

	const Active = Transforms.filter((T) => !(T.Enabled && !T.Enabled()));

	if (Active.length === 0) {
		return [...Counters.entries()].map(([Name, Count]) => ({
			Name,
			...Count,
		}));
	}

	for (const Root of Roots) {
		try {
			await stat(Root.Path);
		} catch {
			continue;
		}

		for await (const File of WalkFiles(Root.Path)) {
			let Source: string;

			try {
				Source = await readFile(File, "utf-8");
			} catch {
				continue;
			}

			let Current = Source;

			for (const Plugin of Active) {
				if (!Plugin.Match({ Path: File, Role: Root.Role })) continue;

				const Result = await Plugin.Transform({
					Path: File,
					Source: Current,
					Role: Root.Role,
				});

				if (Result.Kind === "Unchanged") continue;

				Current = Result.Source;

				const Counter = Counters.get(Plugin.Name)!;

				if (Result.Kind === "Rewrite") {
					Counters.set(Plugin.Name, {
						Rewritten: Counter.Rewritten + 1,
						Stubbed: Counter.Stubbed,
					});
				} else {
					Counters.set(Plugin.Name, {
						Rewritten: Counter.Rewritten,
						Stubbed: Counter.Stubbed + 1,
					});
				}
			}

			if (Current !== Source) {
				try {
					await writeFile(File, Current, "utf-8");
				} catch {
					/* skip */
				}
			}
		}
	}

	return [...Counters.entries()].map(([Name, Count]) => ({
		Name,
		...Count,
	}));
};

const ApplyPlugins = async ({
	Plugins,
	Roots,
	Log,
}: ApplyInput): Promise<ApplyOutcome> => {

	const CopyResults: CopyResult[] = [];

	const Transforms: TransformPlugin[] = [];

	for (const Plugin of Plugins) {
		if (Plugin.Kind === "Copy") {
			Log?.(`[${Plugin.Name}] starting`);

			const Result = await RunCopy(Plugin, Log);

			Log?.(
				`[${Plugin.Name}] copied=${Result.Copied} skipped=${Result.Skipped}`,
			);

			CopyResults.push(Result);
		} else {
			Transforms.push(Plugin);
		}
	}

	const TransformResults = await RunTransforms(Roots, Transforms);

	for (const Result of TransformResults) {
		Log?.(
			`[${Result.Name}] rewritten=${Result.Rewritten} stubbed=${Result.Stubbed}`,
		);
	}

	return { Copy: CopyResults, Transform: TransformResults };
};

export default ApplyPlugins;
