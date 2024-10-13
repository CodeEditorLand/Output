import "./outlinePane.css";

import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { ViewPane } from "../../../browser/parts/views/viewPane.js";
import { IViewletViewOptions } from "../../../browser/parts/views/viewsViewlet.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IOutlineService } from "../../../services/outline/browser/outline.js";
import { IOutlinePane } from "./outline.js";
import { OutlineViewState } from "./outlineViewState.js";

export declare class OutlinePane extends ViewPane implements IOutlinePane {
	private readonly _outlineService;
	private readonly _instantiationService;
	private readonly _storageService;
	private readonly _editorService;
	static readonly Id = "outline";
	private readonly _disposables;
	private readonly _editorControlDisposables;
	private readonly _editorPaneDisposables;
	private readonly _outlineViewState;
	private readonly _editorListener;
	private _domNode;
	private _message;
	private _progressBar;
	private _treeContainer;
	private _tree?;
	private _treeDimensions?;
	private _treeStates;
	private _ctxFollowsCursor;
	private _ctxFilterOnType;
	private _ctxSortMode;
	private _ctxAllCollapsed;
	constructor(
		options: IViewletViewOptions,
		_outlineService: IOutlineService,
		_instantiationService: IInstantiationService,
		viewDescriptorService: IViewDescriptorService,
		_storageService: IStorageService,
		_editorService: IEditorService,
		configurationService: IConfigurationService,
		keybindingService: IKeybindingService,
		contextKeyService: IContextKeyService,
		contextMenuService: IContextMenuService,
		openerService: IOpenerService,
		themeService: IThemeService,
		telemetryService: ITelemetryService,
		hoverService: IHoverService,
	);
	dispose(): void;
	focus(): void;
	protected renderBody(container: HTMLElement): void;
	protected layoutBody(height: number, width: number): void;
	collapseAll(): void;
	expandAll(): void;
	get outlineViewState(): OutlineViewState;
	private _showMessage;
	private _captureViewState;
	private _handleEditorChanged;
	private _handleEditorControlChanged;
}
