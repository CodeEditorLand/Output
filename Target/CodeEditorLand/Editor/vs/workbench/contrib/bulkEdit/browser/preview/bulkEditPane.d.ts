import { CancellationToken } from "../../../../../base/common/cancellation.js";

import "./bulkEdit.css";

import { ResourceEdit } from "../../../../../editor/browser/services/bulkEditService.js";
import { ITextModelService } from "../../../../../editor/common/services/resolverService.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import {
	IContextKeyService,
	RawContextKey,
} from "../../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../../platform/contextview/browser/contextView.js";
import { IDialogService } from "../../../../../platform/dialogs/common/dialogs.js";
import { IHoverService } from "../../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../../platform/keybinding/common/keybinding.js";
import { ILabelService } from "../../../../../platform/label/common/label.js";
import { IOpenerService } from "../../../../../platform/opener/common/opener.js";
import { IStorageService } from "../../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../../platform/theme/common/themeService.js";
import { ViewPane } from "../../../../browser/parts/views/viewPane.js";
import { IViewletViewOptions } from "../../../../browser/parts/views/viewsViewlet.js";
import { IViewDescriptorService } from "../../../../common/views.js";
import { IEditorService } from "../../../../services/editor/common/editorService.js";

export declare class BulkEditPane extends ViewPane {
	private readonly _instaService;
	private readonly _editorService;
	private readonly _labelService;
	private readonly _textModelService;
	private readonly _dialogService;
	private readonly _contextMenuService;
	private readonly _storageService;
	static readonly ID = "refactorPreview";
	static readonly Schema = "vscode-bulkeditpreview-multieditor";
	static readonly ctxHasCategories: RawContextKey<false>;
	static readonly ctxGroupByFile: RawContextKey<true>;
	static readonly ctxHasCheckedChanges: RawContextKey<true>;
	private static readonly _memGroupByFile;
	private _tree;
	private _treeDataSource;
	private _treeViewStates;
	private _message;
	private readonly _ctxHasCategories;
	private readonly _ctxGroupByFile;
	private readonly _ctxHasCheckedChanges;
	private readonly _disposables;
	private readonly _sessionDisposables;
	private _currentResolve?;
	private _currentInput?;
	private _currentProvider?;
	constructor(
		options: IViewletViewOptions,
		_instaService: IInstantiationService,
		_editorService: IEditorService,
		_labelService: ILabelService,
		_textModelService: ITextModelService,
		_dialogService: IDialogService,
		_contextMenuService: IContextMenuService,
		_storageService: IStorageService,
		contextKeyService: IContextKeyService,
		viewDescriptorService: IViewDescriptorService,
		keybindingService: IKeybindingService,
		contextMenuService: IContextMenuService,
		configurationService: IConfigurationService,
		openerService: IOpenerService,
		themeService: IThemeService,
		telemetryService: ITelemetryService,
		hoverService: IHoverService,
	);
	dispose(): void;
	protected renderBody(parent: HTMLElement): void;
	protected layoutBody(height: number, width: number): void;
	private _setState;
	setInput(
		edit: ResourceEdit[],
		token: CancellationToken,
	): Promise<ResourceEdit[] | undefined>;
	hasInput(): boolean;
	private _setTreeInput;
	accept(): void;
	discard(): void;
	private _done;
	toggleChecked(): void;
	groupByFile(): void;
	groupByType(): void;
	toggleGrouping(): void;
	private _openElementInMultiDiffEditor;
	private readonly _computeResourceDiffEditorInputs;
	private _onContextMenu;
}
