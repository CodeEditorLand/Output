import { Dimension } from "../../../../base/browser/dom.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { ThemeIcon } from "../../../../base/common/themables.js";

import "./media/gettingStarted.css";

import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { IAccessibilityService } from "../../../../platform/accessibility/common/accessibility.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import {
	ContextKeyExpression,
	IContextKeyService,
	RawContextKey,
} from "../../../../platform/contextkey/common/contextkey.js";
import { IEditorOptions } from "../../../../platform/editor/common/editor.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import { IQuickInputService } from "../../../../platform/quickinput/common/quickInput.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IWorkspacesService } from "../../../../platform/workspaces/common/workspaces.js";
import { EditorPane } from "../../../browser/parts/editor/editorPane.js";
import {
	IEditorOpenContext,
	IEditorSerializer,
} from "../../../common/editor.js";
import { IWebviewService } from "../../webview/browser/webview.js";

import "./gettingStartedColors.js";

import {
	IEditorGroup,
	IEditorGroupsService,
} from "../../../services/editor/common/editorGroupsService.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { IHostService } from "../../../services/host/browser/host.js";
import { IWorkbenchThemeService } from "../../../services/themes/common/workbenchThemeService.js";
import { GettingStartedInput } from "./gettingStartedInput.js";
import { IWalkthroughsService } from "./gettingStartedService.js";

export declare const allWalkthroughsHiddenContext: RawContextKey<boolean>;
export declare const inWelcomeContext: RawContextKey<boolean>;
export interface IWelcomePageStartEntry {
	id: string;
	title: string;
	description: string;
	command: string;
	order: number;
	icon: {
		type: "icon";
		icon: ThemeIcon;
	};
	when: ContextKeyExpression;
}
export declare class GettingStartedPage extends EditorPane {
	private readonly commandService;
	private readonly productService;
	private readonly keybindingService;
	private readonly gettingStartedService;
	private readonly configurationService;
	private readonly languageService;
	private readonly fileService;
	private readonly openerService;
	protected readonly themeService: IWorkbenchThemeService;
	private storageService;
	private readonly extensionService;
	private readonly instantiationService;
	private readonly notificationService;
	private readonly groupsService;
	private quickInputService;
	private readonly workspacesService;
	private readonly labelService;
	private readonly hostService;
	private readonly webviewService;
	private readonly workspaceContextService;
	private readonly accessibilityService;
	static readonly ID = "gettingStartedPage";
	private editorInput;
	private inProgressScroll;
	private readonly dispatchListeners;
	private readonly stepDisposables;
	private readonly detailsPageDisposables;
	private readonly mediaDisposables;
	private recentlyOpened;
	private gettingStartedCategories;
	private currentWalkthrough;
	private prevWalkthrough;
	private categoriesPageScrollbar;
	private detailsPageScrollbar;
	private detailsScrollbar;
	private buildSlideThrottle;
	private container;
	private contextService;
	private hasScrolledToFirstCategory;
	private recentlyOpenedList?;
	private startList?;
	private gettingStartedList?;
	private stepsSlide;
	private categoriesSlide;
	private stepsContent;
	private stepMediaComponent;
	private webview;
	private layoutMarkdown;
	private detailsRenderer;
	private readonly categoriesSlideDisposables;
	private showFeaturedWalkthrough;
	constructor(
		group: IEditorGroup,
		commandService: ICommandService,
		productService: IProductService,
		keybindingService: IKeybindingService,
		gettingStartedService: IWalkthroughsService,
		configurationService: IConfigurationService,
		telemetryService: ITelemetryService,
		languageService: ILanguageService,
		fileService: IFileService,
		openerService: IOpenerService,
		themeService: IWorkbenchThemeService,
		storageService: IStorageService,
		extensionService: IExtensionService,
		instantiationService: IInstantiationService,
		notificationService: INotificationService,
		groupsService: IEditorGroupsService,
		contextService: IContextKeyService,
		quickInputService: IQuickInputService,
		workspacesService: IWorkspacesService,
		labelService: ILabelService,
		hostService: IHostService,
		webviewService: IWebviewService,
		workspaceContextService: IWorkspaceContextService,
		accessibilityService: IAccessibilityService,
	);
	private shouldAnimate;
	private getWalkthroughCompletionStats;
	setInput(
		newInput: GettingStartedInput,
		options: IEditorOptions | undefined,
		context: IEditorOpenContext,
		token: CancellationToken,
	): Promise<void>;
	makeCategoryVisibleWhenAvailable(
		categoryID: string,
		stepId?: string,
	): Promise<void>;
	private registerDispatchListeners;
	private runDispatchCommand;
	private hideCategory;
	private markAllStepsComplete;
	private toggleStepCompletion;
	private openWalkthroughSelector;
	private getHiddenCategories;
	private setHiddenCategories;
	private currentMediaComponent;
	private currentMediaType;
	private buildMediaComponent;
	selectStepLoose(id: string): Promise<void>;
	private provideScreenReaderUpdate;
	private selectStep;
	private updateMediaSourceForColorMode;
	protected createEditor(parent: HTMLElement): void;
	private buildCategoriesSlide;
	private buildRecentlyOpenedList;
	private buildStartList;
	private buildGettingStartedWalkthroughsList;
	layout(size: Dimension): void;
	private updateCategoryProgress;
	private scrollToCategory;
	private iconWidgetFor;
	private focusSideEditorGroup;
	private runStepCommand;
	private buildMarkdownDescription;
	clearInput(): void;
	private buildCategorySlide;
	private buildTelemetryFooter;
	private getKeybindingLabel;
	private scrollPrev;
	private runSkip;
	escape(): void;
	private setSlide;
	focus(): void;
}
export declare class GettingStartedInputSerializer
	implements IEditorSerializer
{
	canSerialize(editorInput: GettingStartedInput): boolean;
	serialize(editorInput: GettingStartedInput): string;
	deserialize(
		instantiationService: IInstantiationService,
		serializedEditorInput: string,
	): GettingStartedInput;
}
