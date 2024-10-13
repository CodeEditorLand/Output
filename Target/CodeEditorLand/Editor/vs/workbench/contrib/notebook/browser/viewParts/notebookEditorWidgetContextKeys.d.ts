import { IContextKeyService } from "../../../../../platform/contextkey/common/contextkey.js";
import { IExtensionService } from "../../../../services/extensions/common/extensions.js";
import { INotebookExecutionStateService } from "../../common/notebookExecutionStateService.js";
import { INotebookKernelService } from "../../common/notebookKernelService.js";
import { INotebookEditorDelegate } from "../notebookBrowser.js";

export declare class NotebookEditorContextKeys {
	private readonly _editor;
	private readonly _notebookKernelService;
	private readonly _extensionService;
	private readonly _notebookExecutionStateService;
	private readonly _notebookKernel;
	private readonly _notebookKernelCount;
	private readonly _notebookKernelSourceCount;
	private readonly _notebookKernelSelected;
	private readonly _interruptibleKernel;
	private readonly _hasVariableProvider;
	private readonly _someCellRunning;
	private readonly _kernelRunning;
	private readonly _hasOutputs;
	private readonly _useConsolidatedOutputButton;
	private readonly _viewType;
	private readonly _missingKernelExtension;
	private readonly _cellToolbarLocation;
	private readonly _lastCellFailed;
	private readonly _disposables;
	private readonly _viewModelDisposables;
	private readonly _cellOutputsListeners;
	private readonly _selectedKernelDisposables;
	constructor(
		_editor: INotebookEditorDelegate,
		_notebookKernelService: INotebookKernelService,
		contextKeyService: IContextKeyService,
		_extensionService: IExtensionService,
		_notebookExecutionStateService: INotebookExecutionStateService,
	);
	dispose(): void;
	private _handleDidChangeModel;
	private _updateForExecution;
	private _updateForLastRunFailState;
	private _updateForInstalledExtension;
	private _updateKernelContext;
	private _updateForNotebookOptions;
}
