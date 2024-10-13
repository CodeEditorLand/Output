import { Disposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IShellLaunchConfig } from "../../../../platform/terminal/common/terminal.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import { IEditorGroupsService } from "../../../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { ILifecycleService } from "../../../services/lifecycle/common/lifecycle.js";
import {
	IDeserializedTerminalEditorInput,
	ITerminalEditorService,
	ITerminalInstance,
	ITerminalInstanceService,
	TerminalEditorLocation,
} from "./terminal.js";
import { TerminalEditorInput } from "./terminalEditorInput.js";

export declare class TerminalEditorService
	extends Disposable
	implements ITerminalEditorService
{
	private readonly _editorService;
	private readonly _editorGroupsService;
	private readonly _terminalInstanceService;
	private readonly _instantiationService;
	_serviceBrand: undefined;
	instances: ITerminalInstance[];
	private _activeInstanceIndex;
	private _isShuttingDown;
	private _activeOpenEditorRequest?;
	private _terminalEditorActive;
	private _editorInputs;
	private _instanceDisposables;
	private readonly _onDidDisposeInstance;
	readonly onDidDisposeInstance: import("../../../workbench.web.main.internal.js").Event<ITerminalInstance>;
	private readonly _onDidFocusInstance;
	readonly onDidFocusInstance: import("../../../workbench.web.main.internal.js").Event<ITerminalInstance>;
	private readonly _onDidChangeInstanceCapability;
	readonly onDidChangeInstanceCapability: import("../../../workbench.web.main.internal.js").Event<ITerminalInstance>;
	private readonly _onDidChangeActiveInstance;
	readonly onDidChangeActiveInstance: import("../../../workbench.web.main.internal.js").Event<
		ITerminalInstance | undefined
	>;
	private readonly _onDidChangeInstances;
	readonly onDidChangeInstances: import("../../../workbench.web.main.internal.js").Event<void>;
	constructor(
		_editorService: IEditorService,
		_editorGroupsService: IEditorGroupsService,
		_terminalInstanceService: ITerminalInstanceService,
		_instantiationService: IInstantiationService,
		lifecycleService: ILifecycleService,
		contextKeyService: IContextKeyService,
	);
	private _getActiveTerminalEditors;
	get activeInstance(): ITerminalInstance | undefined;
	setActiveInstance(instance: ITerminalInstance | undefined): void;
	focusInstance(instance: ITerminalInstance): Promise<void>;
	focusActiveInstance(): Promise<void>;
	openEditor(
		instance: ITerminalInstance,
		editorOptions?: TerminalEditorLocation,
	): Promise<void>;
	resolveResource(instance: ITerminalInstance): URI;
	getInputFromResource(resource: URI): TerminalEditorInput;
	private _registerInstance;
	private _removeInstance;
	getInstanceFromResource(resource?: URI): ITerminalInstance | undefined;
	splitInstance(
		instanceToSplit: ITerminalInstance,
		shellLaunchConfig?: IShellLaunchConfig,
	): ITerminalInstance;
	reviveInput(
		deserializedInput: IDeserializedTerminalEditorInput,
	): EditorInput;
	detachInstance(instance: ITerminalInstance): void;
	revealActiveEditor(preserveFocus?: boolean): Promise<void>;
}
