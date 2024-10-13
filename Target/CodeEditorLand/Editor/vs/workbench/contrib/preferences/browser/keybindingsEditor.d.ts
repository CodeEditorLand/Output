import "./media/keybindingsEditor.css";

import * as DOM from "../../../../base/browser/dom.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Event } from "../../../../base/common/event.js";
import { IAccessibilityService } from "../../../../platform/accessibility/common/accessibility.js";
import { IClipboardService } from "../../../../platform/clipboard/common/clipboardService.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IEditorOptions } from "../../../../platform/editor/common/editor.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { EditorPane } from "../../../browser/parts/editor/editorPane.js";
import { IEditorOpenContext } from "../../../common/editor.js";
import { IEditorGroup } from "../../../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IKeybindingEditingService } from "../../../services/keybinding/common/keybindingEditing.js";
import { KeybindingsEditorInput } from "../../../services/preferences/browser/keybindingsEditorInput.js";
import {
	IKeybindingItemEntry,
	IKeybindingsEditorPane,
} from "../../../services/preferences/common/preferences.js";

export declare class KeybindingsEditor
	extends EditorPane
	implements IKeybindingsEditorPane
{
	private readonly keybindingsService;
	private readonly contextMenuService;
	private readonly keybindingEditingService;
	private readonly contextKeyService;
	private readonly notificationService;
	private readonly clipboardService;
	private readonly instantiationService;
	private readonly editorService;
	private readonly configurationService;
	private readonly accessibilityService;
	static readonly ID: string;
	private _onDefineWhenExpression;
	readonly onDefineWhenExpression: Event<IKeybindingItemEntry>;
	private _onRejectWhenExpression;
	readonly onRejectWhenExpression: Event<IKeybindingItemEntry>;
	private _onAcceptWhenExpression;
	readonly onAcceptWhenExpression: Event<IKeybindingItemEntry>;
	private _onLayout;
	readonly onLayout: Event<void>;
	private keybindingsEditorModel;
	private headerContainer;
	private actionsContainer;
	private searchWidget;
	private searchHistoryDelayer;
	private overlayContainer;
	private defineKeybindingWidget;
	private unAssignedKeybindingItemToRevealAndFocus;
	private tableEntries;
	private keybindingsTableContainer;
	private keybindingsTable;
	private dimension;
	private delayedFiltering;
	private latestEmptyFilters;
	private keybindingsEditorContextKey;
	private keybindingFocusContextKey;
	private searchFocusContextKey;
	private readonly sortByPrecedenceAction;
	private readonly recordKeysAction;
	private ariaLabelElement;
	readonly overflowWidgetsDomNode: HTMLElement;
	constructor(
		group: IEditorGroup,
		telemetryService: ITelemetryService,
		themeService: IThemeService,
		keybindingsService: IKeybindingService,
		contextMenuService: IContextMenuService,
		keybindingEditingService: IKeybindingEditingService,
		contextKeyService: IContextKeyService,
		notificationService: INotificationService,
		clipboardService: IClipboardService,
		instantiationService: IInstantiationService,
		editorService: IEditorService,
		storageService: IStorageService,
		configurationService: IConfigurationService,
		accessibilityService: IAccessibilityService,
	);
	create(parent: HTMLElement): void;
	protected createEditor(parent: HTMLElement): void;
	setInput(
		input: KeybindingsEditorInput,
		options: IEditorOptions | undefined,
		context: IEditorOpenContext,
		token: CancellationToken,
	): Promise<void>;
	clearInput(): void;
	layout(dimension: DOM.Dimension): void;
	focus(): void;
	get activeKeybindingEntry(): IKeybindingItemEntry | null;
	defineKeybinding(
		keybindingEntry: IKeybindingItemEntry,
		add: boolean,
	): Promise<void>;
	defineWhenExpression(keybindingEntry: IKeybindingItemEntry): void;
	rejectWhenExpression(keybindingEntry: IKeybindingItemEntry): void;
	acceptWhenExpression(keybindingEntry: IKeybindingItemEntry): void;
	updateKeybinding(
		keybindingEntry: IKeybindingItemEntry,
		key: string,
		when: string | undefined,
		add?: boolean,
	): Promise<void>;
	removeKeybinding(keybindingEntry: IKeybindingItemEntry): Promise<void>;
	resetKeybinding(keybindingEntry: IKeybindingItemEntry): Promise<void>;
	copyKeybinding(keybinding: IKeybindingItemEntry): Promise<void>;
	copyKeybindingCommand(keybinding: IKeybindingItemEntry): Promise<void>;
	copyKeybindingCommandTitle(keybinding: IKeybindingItemEntry): Promise<void>;
	focusSearch(): void;
	search(filter: string): void;
	clearSearchResults(): void;
	showSimilarKeybindings(keybindingEntry: IKeybindingItemEntry): void;
	private createAriaLabelElement;
	private createOverlayContainer;
	private showOverlayContainer;
	private hideOverlayContainer;
	private createHeader;
	private updateSearchOptions;
	private createRecordingBadge;
	private layoutSearchWidget;
	private createBody;
	private createTable;
	private render;
	private getActionsLabels;
	private filterKeybindings;
	clearKeyboardShortcutSearchHistory(): void;
	private renderKeybindingsEntries;
	private getAriaLabel;
	private layoutKeybindingsTable;
	private getIndexOf;
	private getNewIndexOfUnassignedKeybinding;
	private selectEntry;
	focusKeybindings(): void;
	selectKeybinding(keybindingItemEntry: IKeybindingItemEntry): void;
	recordSearchKeys(): void;
	toggleSortByPrecedence(): void;
	private onContextMenu;
	private onFocusChange;
	private createDefineKeybindingAction;
	private createAddKeybindingAction;
	private createDefineWhenExpressionAction;
	private createRemoveAction;
	private createResetAction;
	private createShowConflictsAction;
	private createCopyAction;
	private createCopyCommandAction;
	private createCopyCommandTitleAction;
	private onKeybindingEditingError;
}
