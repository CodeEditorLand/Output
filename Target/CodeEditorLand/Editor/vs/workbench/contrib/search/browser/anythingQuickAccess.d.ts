import "./media/anythingQuickAccess.css";

import { CancellationToken } from "../../../../base/common/cancellation.js";
import {
	DisposableStore,
	IDisposable,
} from "../../../../base/common/lifecycle.js";
import { IRange } from "../../../../editor/common/core/range.js";
import { IEditor } from "../../../../editor/common/editorCommon.js";
import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import { ITextModelService } from "../../../../editor/common/services/resolverService.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import {
	FastAndSlowPicks,
	IPickerQuickAccessItem,
	PickerQuickAccessProvider,
	Picks,
} from "../../../../platform/quickinput/browser/pickerQuickAccess.js";
import {
	AnythingQuickAccessProviderRunOptions,
	DefaultQuickAccessFilterValue,
} from "../../../../platform/quickinput/common/quickAccess.js";
import {
	IQuickInputService,
	IQuickPick,
	IQuickPickItemWithResource,
} from "../../../../platform/quickinput/common/quickInput.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { ICustomEditorLabelService } from "../../../services/editor/common/customEditorLabelService.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IWorkbenchEnvironmentService } from "../../../services/environment/common/environmentService.js";
import { IFilesConfigurationService } from "../../../services/filesConfiguration/common/filesConfigurationService.js";
import { IHistoryService } from "../../../services/history/common/history.js";
import { IPathService } from "../../../services/path/common/pathService.js";
import { ISearchService } from "../../../services/search/common/search.js";
import { IWorkingCopyService } from "../../../services/workingCopy/common/workingCopyService.js";
import { IQuickChatService } from "../../chat/browser/chat.js";

interface IAnythingQuickPickItem
	extends IPickerQuickAccessItem,
		IQuickPickItemWithResource {}
export declare class AnythingQuickAccessProvider extends PickerQuickAccessProvider<IAnythingQuickPickItem> {
	private readonly instantiationService;
	private readonly searchService;
	private readonly contextService;
	private readonly pathService;
	private readonly environmentService;
	private readonly fileService;
	private readonly labelService;
	private readonly modelService;
	private readonly languageService;
	private readonly workingCopyService;
	private readonly configurationService;
	private readonly editorService;
	private readonly historyService;
	private readonly filesConfigurationService;
	private readonly textModelService;
	private readonly uriIdentityService;
	private readonly quickInputService;
	private readonly keybindingService;
	private readonly quickChatService;
	private readonly logService;
	private readonly customEditorLabelService;
	static PREFIX: string;
	private static readonly NO_RESULTS_PICK;
	private static readonly MAX_RESULTS;
	private static readonly TYPING_SEARCH_DELAY;
	private static SYMBOL_PICKS_MERGE_DELAY;
	private readonly pickState;
	get defaultFilterValue(): DefaultQuickAccessFilterValue | undefined;
	constructor(
		instantiationService: IInstantiationService,
		searchService: ISearchService,
		contextService: IWorkspaceContextService,
		pathService: IPathService,
		environmentService: IWorkbenchEnvironmentService,
		fileService: IFileService,
		labelService: ILabelService,
		modelService: IModelService,
		languageService: ILanguageService,
		workingCopyService: IWorkingCopyService,
		configurationService: IConfigurationService,
		editorService: IEditorService,
		historyService: IHistoryService,
		filesConfigurationService: IFilesConfigurationService,
		textModelService: ITextModelService,
		uriIdentityService: IUriIdentityService,
		quickInputService: IQuickInputService,
		keybindingService: IKeybindingService,
		quickChatService: IQuickChatService,
		logService: ILogService,
		customEditorLabelService: ICustomEditorLabelService,
	);
	private get configuration();
	provide(
		picker: IQuickPick<
			IAnythingQuickPickItem,
			{
				useSeparators: true;
			}
		>,
		token: CancellationToken,
		runOptions?: AnythingQuickAccessProviderRunOptions,
	): IDisposable;
	private decorateAndRevealSymbolRange;
	protected _getPicks(
		originalFilter: string,
		disposables: DisposableStore,
		token: CancellationToken,
		runOptions?: AnythingQuickAccessProviderRunOptions,
	):
		| Picks<IAnythingQuickPickItem>
		| Promise<Picks<IAnythingQuickPickItem>>
		| FastAndSlowPicks<IAnythingQuickPickItem>
		| null;
	private doGetPicks;
	private getAdditionalPicks;
	private readonly labelOnlyEditorHistoryPickAccessor;
	private getEditorHistoryPicks;
	private readonly fileQueryDelayer;
	private readonly fileQueryBuilder;
	private createFileQueryCache;
	private getFilePicks;
	private doFileSearch;
	private getFileSearchResults;
	private doGetFileSearchResults;
	private getFileQueryOptions;
	private getAbsolutePathFileResult;
	private getRelativePathFileResults;
	private readonly lazyRegistry;
	private getHelpPicks;
	private workspaceSymbolsQuickAccess;
	private getWorkspaceSymbolPicks;
	private readonly editorSymbolsQuickAccess;
	private getEditorSymbolPicks;
	private doGetEditorSymbolPicks;
	addDecorations(editor: IEditor, range: IRange): void;
	clearDecorations(editor: IEditor): void;
	private createAnythingPick;
	private openAnything;
}
export {};
