import "./media/openeditors.css";

import { ILocalizedString } from "../../../../../platform/action/common/action.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../../platform/contextview/browser/contextView.js";
import { IFileService } from "../../../../../platform/files/common/files.js";
import { IHoverService } from "../../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../../platform/keybinding/common/keybinding.js";
import { IOpenerService } from "../../../../../platform/opener/common/opener.js";
import { ITelemetryService } from "../../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../../platform/theme/common/themeService.js";
import { ViewPane } from "../../../../browser/parts/views/viewPane.js";
import { IViewletViewOptions } from "../../../../browser/parts/views/viewsViewlet.js";
import { IViewDescriptorService } from "../../../../common/views.js";
import { IEditorGroupsService } from "../../../../services/editor/common/editorGroupsService.js";
import { IFilesConfigurationService } from "../../../../services/filesConfiguration/common/filesConfigurationService.js";
import { IWorkingCopyService } from "../../../../services/workingCopy/common/workingCopyService.js";

export declare class OpenEditorsView extends ViewPane {
	private readonly editorGroupService;
	private readonly workingCopyService;
	private readonly filesConfigurationService;
	private readonly fileService;
	private static readonly DEFAULT_VISIBLE_OPEN_EDITORS;
	private static readonly DEFAULT_MIN_VISIBLE_OPEN_EDITORS;
	static readonly ID = "workbench.explorer.openEditorsView";
	static readonly NAME: ILocalizedString;
	private dirtyCountElement;
	private listRefreshScheduler;
	private structuralRefreshDelay;
	private dnd;
	private list;
	private listLabels;
	private needsRefresh;
	private elements;
	private sortOrder;
	private blockFocusActiveEditorTracking;
	constructor(
		options: IViewletViewOptions,
		instantiationService: IInstantiationService,
		viewDescriptorService: IViewDescriptorService,
		contextMenuService: IContextMenuService,
		editorGroupService: IEditorGroupsService,
		configurationService: IConfigurationService,
		keybindingService: IKeybindingService,
		contextKeyService: IContextKeyService,
		themeService: IThemeService,
		telemetryService: ITelemetryService,
		hoverService: IHoverService,
		workingCopyService: IWorkingCopyService,
		filesConfigurationService: IFilesConfigurationService,
		openerService: IOpenerService,
		fileService: IFileService,
	);
	private registerUpdateEvents;
	protected renderHeaderTitle(container: HTMLElement): void;
	protected renderBody(container: HTMLElement): void;
	private handleContextKeys;
	focus(): void;
	protected layoutBody(height: number, width: number): void;
	private get showGroups();
	private getElements;
	private getIndex;
	private openEditor;
	private onListContextMenu;
	private withActiveEditorFocusTrackingDisabled;
	private focusActiveEditor;
	private onConfigurationChange;
	private updateSize;
	private updateDirtyIndicator;
	private get elementCount();
	private getMaxExpandedBodySize;
	private getMinExpandedBodySize;
	private computeMinExpandedBodySize;
	setStructuralRefreshDelay(delay: number): void;
	getOptimalWidth(): number;
}
