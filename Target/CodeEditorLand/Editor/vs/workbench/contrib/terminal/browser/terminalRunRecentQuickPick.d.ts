import { IContextKey } from "../../../../platform/contextkey/common/contextkey.js";
import { ServicesAccessor } from "../../../../platform/instantiation/common/instantiation.js";
import { ITerminalInstance } from "./terminal.js";

export declare function showRunRecentQuickPick(
	accessor: ServicesAccessor,
	instance: ITerminalInstance,
	terminalInRunCommandPicker: IContextKey<boolean>,
	type: "command" | "cwd",
	filterMode?: "fuzzy" | "contiguous",
	value?: string,
): Promise<void>;
