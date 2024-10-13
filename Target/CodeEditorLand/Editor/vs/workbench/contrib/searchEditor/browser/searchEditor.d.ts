import * as DOM from "../../../../base/browser/dom.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { URI } from "../../../../base/common/uri.js";

import "./media/searchEditor.css";

import { ICodeEditorWidgetOptions } from "../../../../editor/browser/widget/codeEditor/codeEditorWidget.js";
import { ICodeEditorViewState } from "../../../../editor/common/editorCommon.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import { ITextResourceConfigurationService } from "../../../../editor/common/services/textResourceConfiguration.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextViewService } from "../../../../platform/contextview/browser/contextView.js";
import { IEditorOptions } from "../../../../platform/editor/common/editor.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IEditorProgressService } from "../../../../platform/progress/common/progress.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { AbstractTextCodeEditor } from "../../../browser/parts/editor/textCodeEditor.js";
import { IEditorOpenContext } from "../../../common/editor.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import {
	IEditorGroup,
	IEditorGroupsService,
} from "../../../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import type {
	SearchConfiguration,
	SearchEditorInput,
} from "./searchEditorInput.js";

type SearchEditorViewState = ICodeEditorViewState & {
	focused: "input" | "editor";
};
export declare class SearchEditor extends AbstractTextCodeEditor<SearchEditorViewState> {
	private readonly modelService;
	private readonly contextService;
	private readonly labelService;
	private readonly contextViewService;
	private readonly commandService;
	private readonly openerService;
	private readonly notificationService;
	protected configurationService: IConfigurationService;
	private readonly logService;
	private readonly hoverService;
	static readonly ID: string;
	static readonly SEARCH_EDITOR_VIEW_STATE_PREFERENCE_KEY =
		"searchEditorViewState";
	private queryEditorWidget;
	private get searchResultEditor();
	private queryEditorContainer;
	private dimension?;
	private inputPatternIncludes;
	private inputPatternExcludes;
	private includesExcludesContainer;
	private toggleQueryDetailsButton;
	private messageBox;
	private runSearchDelayer;
	private pauseSearching;
	private showingIncludesExcludes;
	private searchOperation;
	private searchHistoryDelayer;
	private readonly messageDisposables;
	private container;
	private searchModel;
	private ongoingOperations;
	private updatingModelForSearch;
	constructor(
		group: IEditorGroup,
		telemetryService: ITelemetryService,
		themeService: IThemeService,
		storageService: IStorageService,
		modelService: IModelService,
		contextService: IWorkspaceContextService,
		labelService: ILabelService,
		instantiationService: IInstantiationService,
		contextViewService: IContextViewService,
		commandService: ICommandService,
		openerService: IOpenerService,
		notificationService: INotificationService,
		progressService: IEditorProgressService,
		textResourceService: ITextResourceConfigurationService,
		editorGroupService: IEditorGroupsService,
		editorService: IEditorService,
		configurationService: IConfigurationService,
		fileService: IFileService,
		logService: ILogService,
		hoverService: IHoverService,
	);
	protected createEditor(parent: HTMLElement): void;
	private createQueryEditor;
	private toggleRunAgainMessage;
	private _getContributions;
	protected getCodeEditorWidgetOptions(): ICodeEditorWidgetOptions;
	private registerEditorListeners;
	getControl(): import("../../../../editor/browser/editorBrowser.js").ICodeEditor;
	focus(): void;
	focusSearchInput(): void;
	focusFilesToIncludeInput(): void;
	focusFilesToExcludeInput(): void;
	focusNextInput(): void;
	focusPrevInput(): void;
	setQuery(query: string): void;
	selectQuery(): void;
	toggleWholeWords(): void;
	toggleRegex(): void;
	toggleCaseSensitive(): void;
	toggleContextLines(): void;
	modifyContextLines(increase: boolean): void;
	toggleQueryDetails(shouldShow?: boolean): void;
	deleteResultBlock(): void;
	cleanState(): void;
	private get searchConfig();
	private iterateThroughMatches;
	focusNextResult(): void;
	focusPreviousResult(): void;
	focusAllResults(): void;
	triggerSearch(_options?: {
		resetCursor?: boolean;
		delay?: number;
		focusResults?: boolean;
	}): Promise<void>;
	private readConfigFromWidget;
	private doRunSearch;
	private onSearchComplete;
	private addMessage;
	private retrieveFileStats;
	layout(dimension: DOM.Dimension): void;
	getSelected(): string;
	private reLayout;
	private getInput;
	private priorConfig;
	setSearchConfig(config: Partial<Readonly<SearchConfiguration>>): void;
	setInput(
		newInput: SearchEditorInput,
		options: IEditorOptions | undefined,
		context: IEditorOpenContext,
		token: CancellationToken,
	): Promise<void>;
	private toggleIncludesExcludes;
	protected toEditorViewStateResource(input: EditorInput): URI | undefined;
	protected computeEditorViewState(
		resource: URI,
	): SearchEditorViewState | undefined;
	protected tracksEditorViewState(input: EditorInput): boolean;
	private restoreViewState;
	getAriaLabel(): string;
}
export {};
