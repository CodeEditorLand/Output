import { Dimension } from "../../../../base/browser/dom.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";

import "./media/extensionEditor.css";

import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IExtensionGalleryService } from "../../../../platform/extensionManagement/common/extensionManagement.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { EditorPane } from "../../../browser/parts/editor/editorPane.js";
import { IEditorOpenContext } from "../../../common/editor.js";
import { IEditorGroup } from "../../../services/editor/common/editorGroupsService.js";
import { IExtensionRecommendationsService } from "../../../services/extensionRecommendations/common/extensionRecommendations.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { IViewsService } from "../../../services/views/common/viewsService.js";
import { IExplorerService } from "../../files/browser/files.js";
import { IWebview, IWebviewService } from "../../webview/browser/webview.js";
import {
	ExtensionEditorTab,
	IExtensionsWorkbenchService,
} from "../common/extensions.js";
import {
	ExtensionsInput,
	IExtensionEditorOptions,
} from "../common/extensionsInput.js";

export declare class ExtensionEditor extends EditorPane {
	private readonly instantiationService;
	private readonly extensionsWorkbenchService;
	private readonly extensionGalleryService;
	private readonly notificationService;
	private readonly openerService;
	private readonly extensionRecommendationsService;
	private readonly extensionService;
	private readonly webviewService;
	private readonly languageService;
	private readonly contextMenuService;
	private readonly contextKeyService;
	private readonly contextService;
	private readonly explorerService;
	private readonly viewsService;
	private readonly uriIdentityService;
	private readonly hoverService;
	static readonly ID: string;
	private readonly _scopedContextKeyService;
	private template;
	private extensionReadme;
	private extensionChangelog;
	private extensionManifest;
	private initialScrollProgress;
	private currentIdentifier;
	private layoutParticipants;
	private readonly contentDisposables;
	private readonly transientDisposables;
	private activeElement;
	private dimension;
	private showPreReleaseVersionContextKey;
	constructor(
		group: IEditorGroup,
		telemetryService: ITelemetryService,
		instantiationService: IInstantiationService,
		extensionsWorkbenchService: IExtensionsWorkbenchService,
		extensionGalleryService: IExtensionGalleryService,
		themeService: IThemeService,
		notificationService: INotificationService,
		openerService: IOpenerService,
		extensionRecommendationsService: IExtensionRecommendationsService,
		storageService: IStorageService,
		extensionService: IExtensionService,
		webviewService: IWebviewService,
		languageService: ILanguageService,
		contextMenuService: IContextMenuService,
		contextKeyService: IContextKeyService,
		contextService: IWorkspaceContextService,
		explorerService: IExplorerService,
		viewsService: IViewsService,
		uriIdentityService: IUriIdentityService,
		hoverService: IHoverService,
	);
	get scopedContextKeyService(): IContextKeyService | undefined;
	protected createEditor(parent: HTMLElement): void;
	setInput(
		input: ExtensionsInput,
		options: IExtensionEditorOptions | undefined,
		context: IEditorOpenContext,
		token: CancellationToken,
	): Promise<void>;
	setOptions(options: IExtensionEditorOptions | undefined): void;
	private updatePreReleaseVersionContext;
	openTab(tab: ExtensionEditorTab): Promise<void>;
	private getGalleryVersionToShow;
	private render;
	private renderNavbar;
	clearInput(): void;
	focus(): void;
	showFind(): void;
	runFindAction(previous: boolean): void;
	get activeWebview(): IWebview | undefined;
	private onNavbarChange;
	private open;
	private openMarkdown;
	private renderMarkdown;
	private renderBody;
	private openDetails;
	private shallRenderAsExtensionPack;
	private openExtensionPackReadme;
	private renderAdditionalDetails;
	private renderCategories;
	private renderExtensionResources;
	private renderMoreInfo;
	private openChangelog;
	private openFeatures;
	private openExtensionDependencies;
	private openExtensionPack;
	private renderExtensionPack;
	private loadContents;
	layout(dimension: Dimension): void;
	private onError;
}
