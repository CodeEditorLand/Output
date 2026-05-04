/**
 * Step 1: Copy `Output/Target/Microsoft/VSCode/vs/**` into the consumer's
 * `Static/Application/vs/` tree.
 *
 * The consumer supplies the absolute source (Output's published `/vs` dir)
 * and destination (their own `Static/Application/vs`) via a factory - the
 * plugin instance is a pure data bag so it stays identical whether invoked
 * from Sky, a future desktop shell, or a test harness.
 */

import type { CopyPlugin } from "../../../Type.js";

export interface CopyVSOutputInput {
	readonly From: string;
	readonly To: string;
}

export const CopyVSOutput = ({ From, To }: CopyVSOutputInput): CopyPlugin => ({
	Kind: "Copy",
	Name: "CopyVSOutput",
	Entries: [{ From: [From], To, Recursive: true, Force: true }],
	Required: false,
});

export default CopyVSOutput;
