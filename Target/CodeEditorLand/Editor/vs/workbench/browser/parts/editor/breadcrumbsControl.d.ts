import * as dom from "../../../../base/browser/dom.js";
import { IBreadcrumbsWidgetStyles } from "../../../../base/browser/ui/breadcrumbs/breadcrumbsWidget.js";

import "./media/breadcrumbscontrol.css";

import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import {
	IContextKeyService,
	RawContextKey,
} from "../../../../platform/contextkey/common/contextkey.js";
import { IContextViewService } from "../../../../platform/contextview/browser/contextView.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { IQuickInputService } from "../../../../platform/quickinput/common/quickInput.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IBreadcrumbsService } from "./breadcrumbs.js";
import { BreadcrumbsModel } from "./breadcrumbsModel.js";
import { IEditorGroupView } from "./editor.js";

export interface IBreadcrumbsControlOptions {
	readonly showFileIcons: boolean;
	readonly showSymbolIcons: boolean;
	readonly showDecorationColors: boolean;
	readonly showPlaceholder: boolean;
	readonly widgetStyles?: IBreadcrumbsWidgetStyles;
}
export declare class BreadcrumbsControl {
	private readonly _options;
	private readonly _editorGroup;
	private readonly _contextKeyService;
	private readonly _contextViewService;
	private readonly _instantiationService;
	private readonly _quickInputService;
	private readonly _fileService;
	private readonly _editorService;
	private readonly _labelService;
	static readonly HEIGHT = 22;
	private static readonly SCROLLBAR_SIZES;
	static readonly Payload_Reveal: {};
	static readonly Payload_RevealAside: {};
	static readonly Payload_Pick: {};
	static readonly CK_BreadcrumbsPossible: RawContextKey<false>;
	static readonly CK_BreadcrumbsVisible: RawContextKey<false>;
	static readonly CK_BreadcrumbsActive: RawContextKey<false>;
	private readonly _ckBreadcrumbsPossible;
	private readonly _ckBreadcrumbsVisible;
	private readonly _ckBreadcrumbsActive;
	private readonly _cfUseQuickPick;
	private readonly _cfShowIcons;
	private readonly _cfTitleScrollbarSizing;
	readonly domNode: HTMLDivElement;
	private readonly _widget;
	private readonly _disposables;
	private readonly _breadcrumbsDisposables;
	private readonly _labels;
	private readonly _model;
	private _breadcrumbsPickerShowing;
	private _breadcrumbsPickerIgnoreOnceItem;
	private readonly _hoverDelegate;
	private readonly _onDidVisibilityChange;
	get onDidVisibilityChange(): import("../../../workbench.web.main.internal.js").Event<void>;
	constructor(
		container: HTMLElement,
		_options: IBreadcrumbsControlOptions,
		_editorGroup: IEditorGroupView,
		_contextKeyService: IContextKeyService,
		_contextViewService: IContextViewService,
		_instantiationService: IInstantiationService,
		_quickInputService: IQuickInputService,
		_fileService: IFileService,
		_editorService: IEditorService,
		_labelService: ILabelService,
		configurationService: IConfigurationService,
		breadcrumbsService: IBreadcrumbsService,
	);
	dispose(): void;
	get model(): BreadcrumbsModel | undefined;
	layout(dim: dom.Dimension | undefined): void;
	isHidden(): boolean;
	hide(): void;
	private show;
	revealLast(): void;
	update(): boolean;
	private _onFocusEvent;
	private _onSelectEvent;
	private _updateCkBreadcrumbsActive;
	private _revealInEditor;
	private _getEditorGroup;
}
export declare class BreadcrumbsControlFactory {
	private readonly _container;
	private readonly _editorGroup;
	private readonly _options;
	private readonly _instantiationService;
	private readonly _disposables;
	private readonly _controlDisposables;
	private _control;
	get control(): BreadcrumbsControl | undefined;
	private readonly _onDidEnablementChange;
	get onDidEnablementChange(): import("../../../workbench.web.main.internal.js").Event<void>;
	private readonly _onDidVisibilityChange;
	get onDidVisibilityChange(): import("../../../workbench.web.main.internal.js").Event<void>;
	constructor(
		_container: HTMLElement,
		_editorGroup: IEditorGroupView,
		_options: IBreadcrumbsControlOptions,
		configurationService: IConfigurationService,
		_instantiationService: IInstantiationService,
		fileService: IFileService,
	);
	private createControl;
	dispose(): void;
}
