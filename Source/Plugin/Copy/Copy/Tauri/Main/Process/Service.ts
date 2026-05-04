/**
 * Side-copy for Step 7: place the compiled `TauriMainProcessService.js`
 * next to `mainProcessService.js` so the re-export the transform writes can
 * resolve `./TauriMainProcessService.js`.
 *
 * Primary source is Output's published `Configuration/Service/`; the Wind
 * tier is a fallback so the pipeline still assembles during early cascades
 * where Output hasn't been rebuilt yet. The transform plugin
 * `ReplaceElectronIPCService` writes the re-export body; this copy plugin
 * supplies the file it refers to.
 */

import type { CopyPlugin } from "../../../../../Type.js";

export interface CopyTauriMainProcessServiceInput {
	readonly OutputService: string;
	readonly WindService: string;
	readonly Destination: string;
}

export const CopyTauriMainProcessService = ({
	OutputService,
	WindService,
	Destination,
}: CopyTauriMainProcessServiceInput): CopyPlugin => ({
	Kind: "Copy",
	Name: "CopyTauriMainProcessService",
	Enabled: () => process.env["Electron"] === "true",
	Entries: [
		{
			From: [OutputService, WindService],
			To: Destination,
		},
	],
});

export default CopyTauriMainProcessService;
