import { Disposable } from "../../../../../../base/common/lifecycle.js";
import { ILanguageService } from "../../../../../../editor/common/languages/language.js";
import { IConfigurationService } from "../../../../../../platform/configuration/common/configuration.js";
import { IInstantiationService } from "../../../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../../../platform/keybinding/common/keybinding.js";
import { IOpenerService } from "../../../../../../platform/opener/common/opener.js";
import { INotebookExecutionStateService } from "../../../common/notebookExecutionStateService.js";
import { IActiveNotebookEditorDelegate } from "../../notebookBrowser.js";
import { CodeCellViewModel } from "../../viewModel/codeCellViewModel.js";
import { NotebookCellEditorPool } from "../notebookCellEditorPool.js";
import { CodeCellRenderTemplate } from "../notebookRenderingCommon.js";

export declare class CodeCell extends Disposable {
	private readonly notebookEditor;
	private readonly viewCell;
	private readonly templateData;
	private readonly editorPool;
	private readonly instantiationService;
	private readonly keybindingService;
	private readonly languageService;
	private configurationService;
	private _outputContainerRenderer;
	private _inputCollapseElement;
	private _renderedInputCollapseState;
	private _renderedOutputCollapseState;
	private _isDisposed;
	private readonly cellParts;
	private _collapsedExecutionIcon;
	private _cellEditorOptions;
	constructor(
		notebookEditor: IActiveNotebookEditorDelegate,
		viewCell: CodeCellViewModel,
		templateData: CodeCellRenderTemplate,
		editorPool: NotebookCellEditorPool,
		instantiationService: IInstantiationService,
		keybindingService: IKeybindingService,
		openerService: IOpenerService,
		languageService: ILanguageService,
		configurationService: IConfigurationService,
		notebookExecutionStateService: INotebookExecutionStateService,
	);
	private updateCodeCellOptions;
	private _pendingLayout;
	private updateForLayout;
	private updateForOutputHover;
	private updateForOutputFocus;
	private calculateInitEditorHeight;
	private initializeEditor;
	private updateForOutputs;
	private updateEditorOptions;
	private registerNotebookEditorListeners;
	private adjustEditorPosition;
	private registerViewCellLayoutChange;
	private registerCellEditorEventListeners;
	private _reigsterModelListeners;
	private registerMouseListener;
	private shouldPreserveEditor;
	private updateEditorForFocusModeChange;
	private updateForCollapseState;
	private _collapseInput;
	private _attachInputExpandButton;
	private _showInput;
	private _getRichText;
	private _getRichTextFromLineTokens;
	private _removeInputCollapsePreview;
	private _updateOutputInnerContainer;
	private _collapseOutput;
	private _showOutput;
	private initialViewUpdateExpanded;
	private layoutEditor;
	private onCellWidthChange;
	private onCellEditorHeightChange;
	relayoutCell(): void;
	dispose(): void;
}
