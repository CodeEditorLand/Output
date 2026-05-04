/**
 * Step 2: Supplement `Static/Application/vs/` with tsc-compiled files from
 * `Dependency/.../out/vs/` - fills gaps such as `workbench.web.main.js` that
 * Output's esbuild pass doesn't emit.
 *
 * Runs with `force: false` so anything Step 1 already wrote stays intact;
 * only missing files are filled in.
 */

import type { CopyPlugin } from "../../../Type.js";

export interface SupplementFromDependencyInput {
	readonly From: string;
	readonly To: string;
}

export const SupplementFromDependency = ({
	From,
	To,
}: SupplementFromDependencyInput): CopyPlugin => ({
	Kind: "Copy",
	Name: "SupplementFromDependency",
	Entries: [{ From: [From], To, Recursive: true, Force: false }],
});

export default SupplementFromDependency;
