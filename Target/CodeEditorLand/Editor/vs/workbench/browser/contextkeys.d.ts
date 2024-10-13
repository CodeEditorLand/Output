import { Disposable } from "../../base/common/lifecycle.js";
import { IConfigurationService } from "../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../platform/contextkey/common/contextkey.js";
import { IProductService } from "../../platform/product/common/productService.js";
import { IWorkspaceContextService } from "../../platform/workspace/common/workspace.js";
import { IEditorGroupsService } from "../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../services/editor/common/editorService.js";
import { IWorkbenchEnvironmentService } from "../services/environment/common/environmentService.js";
import { IWorkbenchLayoutService } from "../services/layout/browser/layoutService.js";
import { IPaneCompositePartService } from "../services/panecomposite/browser/panecomposite.js";
import { IWorkingCopyService } from "../services/workingCopy/common/workingCopyService.js";

export declare class WorkbenchContextKeysHandler extends Disposable {
	private readonly contextKeyService;
	private readonly contextService;
	private readonly configurationService;
	private readonly environmentService;
	private readonly productService;
	private readonly editorGroupService;
	private readonly editorService;
	private readonly layoutService;
	private readonly paneCompositeService;
	private readonly workingCopyService;
	private inputFocusedContext;
	private dirtyWorkingCopiesContext;
	private activeEditorGroupEmpty;
	private activeEditorGroupIndex;
	private activeEditorGroupLast;
	private activeEditorGroupLocked;
	private multipleEditorGroupsContext;
	private editorsVisibleContext;
	private splitEditorsVerticallyContext;
	private workbenchStateContext;
	private workspaceFolderCountContext;
	private openFolderWorkspaceSupportContext;
	private enterMultiRootWorkspaceSupportContext;
	private emptyWorkspaceSupportContext;
	private virtualWorkspaceContext;
	private temporaryWorkspaceContext;
	private inZenModeContext;
	private isMainWindowFullscreenContext;
	private isAuxiliaryWindowFocusedContext;
	private isMainEditorCenteredLayoutContext;
	private sideBarVisibleContext;
	private mainEditorAreaVisibleContext;
	private panelPositionContext;
	private panelVisibleContext;
	private panelAlignmentContext;
	private panelMaximizedContext;
	private auxiliaryBarVisibleContext;
	private editorTabsVisibleContext;
	private titleAreaVisibleContext;
	private titleBarStyleContext;
	constructor(
		contextKeyService: IContextKeyService,
		contextService: IWorkspaceContextService,
		configurationService: IConfigurationService,
		environmentService: IWorkbenchEnvironmentService,
		productService: IProductService,
		editorGroupService: IEditorGroupsService,
		editorService: IEditorService,
		layoutService: IWorkbenchLayoutService,
		paneCompositeService: IPaneCompositePartService,
		workingCopyService: IWorkingCopyService,
	);
	private registerListeners;
	private updateVisiblePanesContextKeys;
	private updateActiveEditorGroupContextKeys;
	private updateEditorGroupsContextKeys;
	private updateEditorAreaContextKeys;
	private updateInputContextKeys;
	private updateWorkbenchStateContextKey;
	private updateWorkspaceFolderCountContextKey;
	private updateSplitEditorsVerticallyContext;
	private getWorkbenchStateString;
	private updateSideBarContextKeys;
	private updateTitleBarContextKeys;
	private updateWorkspaceContextKeys;
}
