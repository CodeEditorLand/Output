import "./media/searchEditor.css";

import { Event } from "../../../../base/common/event.js";
import { ThemeIcon } from "../../../../base/common/themables.js";
import { URI } from "../../../../base/common/uri.js";
import { Range } from "../../../../editor/common/core/range.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import { IFileDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { IResourceEditorInput } from "../../../../platform/editor/common/editor.js";
import {
	IInstantiationService,
	ServicesAccessor,
} from "../../../../platform/instantiation/common/instantiation.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import {
	EditorInputCapabilities,
	GroupIdentifier,
	IMoveResult,
	IRevertOptions,
	IUntypedEditorInput,
} from "../../../common/editor.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import { IPathService } from "../../../services/path/common/pathService.js";
import { ISearchComplete } from "../../../services/search/common/search.js";
import {
	ITextFileSaveOptions,
	ITextFileService,
} from "../../../services/textfile/common/textfiles.js";
import { IWorkingCopySaveEvent } from "../../../services/workingCopy/common/workingCopy.js";
import { IWorkingCopyService } from "../../../services/workingCopy/common/workingCopyService.js";
import { SearchEditorModel } from "./searchEditorModel.js";

export type SearchConfiguration = {
	query: string;
	filesToInclude: string;
	filesToExclude: string;
	contextLines: number;
	matchWholeWord: boolean;
	isCaseSensitive: boolean;
	isRegexp: boolean;
	useExcludeSettingsAndIgnoreFiles: boolean;
	showIncludesExcludes: boolean;
	onlyOpenEditors: boolean;
	notebookSearchConfig: {
		includeMarkupInput: boolean;
		includeMarkupPreview: boolean;
		includeCodeInput: boolean;
		includeOutput: boolean;
	};
};
export declare const SEARCH_EDITOR_EXT = ".code-search";
export declare class SearchEditorInput extends EditorInput {
	readonly modelUri: URI;
	readonly backingUri: URI | undefined;
	private readonly modelService;
	protected readonly textFileService: ITextFileService;
	private readonly fileDialogService;
	private readonly instantiationService;
	private readonly workingCopyService;
	private readonly telemetryService;
	private readonly pathService;
	static readonly ID: string;
	get typeId(): string;
	get editorId(): string | undefined;
	getIcon(): ThemeIcon;
	get capabilities(): EditorInputCapabilities;
	private memento;
	private dirty;
	private lastLabel;
	private readonly _onDidChangeContent;
	readonly onDidChangeContent: Event<void>;
	private readonly _onDidSave;
	readonly onDidSave: Event<IWorkingCopySaveEvent>;
	private oldDecorationsIDs;
	get resource(): URI;
	ongoingSearchOperation: Promise<ISearchComplete> | undefined;
	model: SearchEditorModel;
	private _cachedResultsModel;
	private _cachedConfigurationModel;
	constructor(
		modelUri: URI,
		backingUri: URI | undefined,
		modelService: IModelService,
		textFileService: ITextFileService,
		fileDialogService: IFileDialogService,
		instantiationService: IInstantiationService,
		workingCopyService: IWorkingCopyService,
		telemetryService: ITelemetryService,
		pathService: IPathService,
		storageService: IStorageService,
	);
	save(
		group: GroupIdentifier,
		options?: ITextFileSaveOptions,
	): Promise<EditorInput | undefined>;
	tryReadConfigSync(): SearchConfiguration | undefined;
	private serializeForDisk;
	private configChangeListenerDisposable;
	private registerConfigChangeListeners;
	resolveModels(): Promise<import("./searchEditorModel.js").SearchEditorData>;
	saveAs(
		group: GroupIdentifier,
		options?: ITextFileSaveOptions,
	): Promise<EditorInput | undefined>;
	getName(maxLength?: number): string;
	setDirty(dirty: boolean): void;
	isDirty(): boolean;
	rename(
		group: GroupIdentifier,
		target: URI,
	): Promise<IMoveResult | undefined>;
	dispose(): void;
	matches(other: EditorInput | IUntypedEditorInput): boolean;
	getMatchRanges(): Range[];
	setMatchRanges(ranges: Range[]): Promise<void>;
	revert(group: GroupIdentifier, options?: IRevertOptions): Promise<void>;
	private backup;
	private suggestFileName;
	toUntyped(): IResourceEditorInput | undefined;
}
export declare const getOrMakeSearchEditorInput: (
	accessor: ServicesAccessor,
	existingData:
		| {
				from: "model";
				config?: Partial<SearchConfiguration>;
				modelUri: URI;
				backupOf?: URI;
		  }
		| {
				from: "rawData";
				resultsContents: string | undefined;
				config: Partial<SearchConfiguration>;
		  }
		| {
				from: "existingFile";
				fileUri: URI;
		  },
) => SearchEditorInput;
