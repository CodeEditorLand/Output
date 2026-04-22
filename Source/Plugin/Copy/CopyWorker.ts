/**
 * Step 3: Copy the bundled Worker JS (Element/Worker) to the consumer's
 * `Target/Worker.js` root so VS Code's service-worker-style CSS intercept
 * path resolves against a real file served at `/Worker.js`.
 */

import type { CopyPlugin } from "../Type.js";

export interface CopyWorkerInput {
	readonly From: string;
	readonly To: string;
}

export const CopyWorker = ({ From, To }: CopyWorkerInput): CopyPlugin => ({
	Kind: "Copy",
	Name: "CopyWorker",
	Entries: [{ From: [From], To }],
});

export default CopyWorker;
