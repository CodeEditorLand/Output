/**
 * Plugin/Copy - tier-fallback copy helper shared by every CopyPlugin.
 *
 * Mirrors the pattern Sky's Step 1b used inline: try each candidate in order,
 * stop at the first one that exists. Returns the resolved source (or null if
 * none matched) so the caller can emit telemetry / warnings.
 */

import { copyFile, cp, mkdir, stat, writeFile } from "node:fs/promises";

import { dirname } from "node:path";

/**
 * Marker prefix used by `StubUnpublishedAddons` to inline a body into a
 * `From` slot instead of pointing at a file on disk. Duplicated here (and
 * not imported from the plugin) because `Copy.ts` sits at a lower layer
 * than the plugins themselves - the plugin depends on the helper, not the
 * other way round.
 */
const DataPrefix = "data:text/javascript,";

export interface CopyCandidate {

	readonly From: string;

	readonly To: string;

	readonly Recursive?: boolean;

	readonly Force?: boolean;
}

export interface CopyOutcome {

	readonly Resolved: CopyCandidate | null;

	readonly Error?: string;
}

const Exists = async (Path: string): Promise<boolean> => {

	try {

		await stat(Path);

		return true;
	} catch {

		return false;
	}
};

export const CopyFirstAvailable = async (
	Candidates: ReadonlyArray<CopyCandidate>,
): Promise<CopyOutcome> => {

	for (const Candidate of Candidates) {

		// Inline-body branch: `From` holds the literal file body prefixed
		// by `data:text/javascript,`. Used by StubUnpublishedAddons to
		// synthesise a module whose source tree does not yet exist on
		// disk (the upstream npm package is unpublished). Tested before
		// the filesystem existence check so the `Exists` call is
		// skipped.
		if (Candidate.From.startsWith(DataPrefix)) {

			try {

				await mkdir(dirname(Candidate.To), { recursive: true });

				await writeFile(
					Candidate.To,

					Candidate.From.slice(DataPrefix.length),

					"utf-8",
				);

				return { Resolved: Candidate };
			} catch (Error) {

				return {

					Resolved: null,

					Error:
						Error instanceof globalThis.Error
							? Error.message
							: String(Error),
				};
			}
		}

		if (!(await Exists(Candidate.From))) continue;

		try {

			// Ensure parent dir so `copyFile` doesn't fail on fresh trees.
			await mkdir(dirname(Candidate.To), { recursive: true });

			if (Candidate.Recursive) {

				await cp(Candidate.From, Candidate.To, {
					recursive: true,
					force: Candidate.Force ?? true,
				});
			} else {

				await copyFile(Candidate.From, Candidate.To);
			}

			return { Resolved: Candidate };
		} catch (Error) {

			return {

				Resolved: null,

				Error:
					Error instanceof globalThis.Error
						? Error.message
						: String(Error),
			};
		}
	}

	return { Resolved: null };
};

export default CopyFirstAvailable;
