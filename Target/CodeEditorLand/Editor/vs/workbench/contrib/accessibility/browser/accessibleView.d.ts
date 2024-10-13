import { Disposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { CodeEditorWidget } from "../../../../editor/browser/widget/codeEditor/codeEditorWidget.js";
import {
	IPosition,
	Position,
} from "../../../../editor/common/core/position.js";
import { ITextModel } from "../../../../editor/common/model.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import {
	ITextModelContentProvider,
	ITextModelService,
} from "../../../../editor/common/services/resolverService.js";
import {
	AccessibleContentProvider,
	AccessibleViewProviderId,
	ExtensionContentProvider,
	IAccessibleViewService,
	IAccessibleViewSymbol,
} from "../../../../platform/accessibility/browser/accessibleView.js";
import { IAccessibilityService } from "../../../../platform/accessibility/common/accessibility.js";
import { IMenuService } from "../../../../platform/actions/common/actions.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextViewService } from "../../../../platform/contextview/browser/contextView.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { ILayoutService } from "../../../../platform/layout/browser/layoutService.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IQuickInputService } from "../../../../platform/quickinput/common/quickInput.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { IChatCodeBlockContextProviderService } from "../../chat/browser/chat.js";
import { ICodeBlockActionContext } from "../../chat/browser/codeBlockPart.js";
import { AccessibilityVerbositySettingId } from "./accessibilityConfiguration.js";

export type AccesibleViewContentProvider =
	| AccessibleContentProvider
	| ExtensionContentProvider;
export declare class AccessibleView
	extends Disposable
	implements ITextModelContentProvider
{
	private readonly _openerService;
	private readonly _instantiationService;
	private readonly _configurationService;
	private readonly _modelService;
	private readonly _contextViewService;
	private readonly _contextKeyService;
	private readonly _accessibilityService;
	private readonly _keybindingService;
	private readonly _layoutService;
	private readonly _menuService;
	private readonly _commandService;
	private readonly _codeBlockContextProviderService;
	private readonly _storageService;
	private readonly textModelResolverService;
	private readonly _quickInputService;
	private _editorWidget;
	private _accessiblityHelpIsShown;
	private _onLastLine;
	private _accessibleViewIsShown;
	private _accessibleViewSupportsNavigation;
	private _accessibleViewVerbosityEnabled;
	private _accessibleViewGoToSymbolSupported;
	private _accessibleViewCurrentProviderId;
	private _accessibleViewInCodeBlock;
	private _accessibleViewContainsCodeBlocks;
	private _hasUnassignedKeybindings;
	private _hasAssignedKeybindings;
	private _codeBlocks?;
	private _inQuickPick;
	get editorWidget(): CodeEditorWidget;
	private _container;
	private _title;
	private readonly _toolbar;
	private _currentProvider;
	private _currentContent;
	private _lastProvider;
	private _viewContainer;
	constructor(
		_openerService: IOpenerService,
		_instantiationService: IInstantiationService,
		_configurationService: IConfigurationService,
		_modelService: IModelService,
		_contextViewService: IContextViewService,
		_contextKeyService: IContextKeyService,
		_accessibilityService: IAccessibilityService,
		_keybindingService: IKeybindingService,
		_layoutService: ILayoutService,
		_menuService: IMenuService,
		_commandService: ICommandService,
		_codeBlockContextProviderService: IChatCodeBlockContextProviderService,
		_storageService: IStorageService,
		textModelResolverService: ITextModelService,
		_quickInputService: IQuickInputService,
	);
	provideTextContent(resource: URI): Promise<ITextModel | null> | null;
	private _resetContextKeys;
	getPosition(id?: AccessibleViewProviderId): Position | undefined;
	setPosition(position: Position, reveal?: boolean, select?: boolean): void;
	getCodeBlockContext(): ICodeBlockActionContext | undefined;
	navigateToCodeBlock(type: "next" | "previous"): void;
	showLastProvider(id: AccessibleViewProviderId): void;
	show(
		provider?: AccesibleViewContentProvider,
		symbol?: IAccessibleViewSymbol,
		showAccessibleViewHelp?: boolean,
		position?: IPosition,
	): void;
	previous(): void;
	next(): void;
	private _verbosityEnabled;
	goToSymbol(): void;
	calculateCodeBlocks(markdown?: string): void;
	getSymbols(): IAccessibleViewSymbol[] | undefined;
	openHelpLink(): void;
	configureKeybindings(unassigned: boolean): void;
	private _convertTokensToSymbols;
	showSymbol(
		provider: AccesibleViewContentProvider,
		symbol: IAccessibleViewSymbol,
	): void;
	disableHint(): void;
	private _updateContextKeys;
	private _updateContent;
	private _render;
	private _updateToolbar;
	private _layout;
	private _getTextModel;
	private _goToSymbolsSupported;
	private _updateLastProvider;
	showAccessibleViewHelp(): void;
	private _accessibleViewHelpDialogContent;
	private _getChatHints;
	private _navigationHint;
	private _disableVerbosityHint;
	private _goToSymbolHint;
	private _configureUnassignedKbHint;
	private _configureAssignedKbHint;
	private _screenReaderModeHint;
	private _exitDialogHint;
	private _readMoreHint;
}
export declare class AccessibleViewService
	extends Disposable
	implements IAccessibleViewService
{
	private readonly _instantiationService;
	private readonly _configurationService;
	private readonly _keybindingService;
	readonly _serviceBrand: undefined;
	private _accessibleView;
	constructor(
		_instantiationService: IInstantiationService,
		_configurationService: IConfigurationService,
		_keybindingService: IKeybindingService,
	);
	show(provider: AccesibleViewContentProvider, position?: Position): void;
	configureKeybindings(unassigned: boolean): void;
	openHelpLink(): void;
	showLastProvider(id: AccessibleViewProviderId): void;
	next(): void;
	previous(): void;
	goToSymbol(): void;
	getOpenAriaHint(
		verbositySettingKey: AccessibilityVerbositySettingId,
	): string | null;
	disableHint(): void;
	showAccessibleViewHelp(): void;
	getPosition(id: AccessibleViewProviderId): Position | undefined;
	getLastPosition(): Position | undefined;
	setPosition(position: Position, reveal?: boolean, select?: boolean): void;
	getCodeBlockContext(): ICodeBlockActionContext | undefined;
	navigateToCodeBlock(type: "next" | "previous"): void;
}
