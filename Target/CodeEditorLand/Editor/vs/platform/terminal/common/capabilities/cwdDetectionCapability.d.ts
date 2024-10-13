import { Disposable } from "../../../../base/common/lifecycle.js";
import { ICwdDetectionCapability, TerminalCapability } from "./capabilities.js";

export declare class CwdDetectionCapability
	extends Disposable
	implements ICwdDetectionCapability
{
	readonly type = TerminalCapability.CwdDetection;
	private _cwd;
	private _cwds;
	/**
	 * Gets the list of cwds seen in this session in order of last accessed.
	 */
	get cwds(): string[];
	private readonly _onDidChangeCwd;
	readonly onDidChangeCwd: import("../../../../workbench/workbench.web.main.internal.js").Event<string>;
	getCwd(): string;
	updateCwd(cwd: string): void;
}
