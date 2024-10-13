import { URI } from "../../../../base/common/uri.js";
import {
	IBulkEditService,
	ResourceFileEdit,
} from "../../../../editor/browser/services/bulkEditService.js";
import { IClipboardService } from "../../../../platform/clipboard/common/clipboardService.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import {
	IProgressService,
	ProgressLocation,
} from "../../../../platform/progress/common/progress.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { UndoRedoSource } from "../../../../platform/undoRedo/common/undoRedo.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IEditableData } from "../../../common/views.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IFilesConfigurationService } from "../../../services/filesConfiguration/common/filesConfigurationService.js";
import { IHostService } from "../../../services/host/browser/host.js";
import { ExplorerItem } from "../common/explorerModel.js";
import { ISortOrderConfiguration } from "../common/files.js";
import { IExplorerService, IExplorerView } from "./files.js";

export declare const UNDO_REDO_SOURCE: UndoRedoSource;
export declare class ExplorerService implements IExplorerService {
	private fileService;
	private configurationService;
	private contextService;
	private clipboardService;
	private editorService;
	private readonly uriIdentityService;
	private readonly bulkEditService;
	private readonly progressService;
	private readonly filesConfigurationService;
	private readonly telemetryService;
	readonly _serviceBrand: undefined;
	private static readonly EXPLORER_FILE_CHANGES_REACT_DELAY;
	private readonly disposables;
	private editable;
	private config;
	private cutItems;
	private view;
	private model;
	private onFileChangesScheduler;
	private fileChangeEvents;
	private revealExcludeMatcher;
	constructor(
		fileService: IFileService,
		configurationService: IConfigurationService,
		contextService: IWorkspaceContextService,
		clipboardService: IClipboardService,
		editorService: IEditorService,
		uriIdentityService: IUriIdentityService,
		bulkEditService: IBulkEditService,
		progressService: IProgressService,
		hostService: IHostService,
		filesConfigurationService: IFilesConfigurationService,
		telemetryService: ITelemetryService,
	);
	get roots(): ExplorerItem[];
	get sortOrderConfiguration(): ISortOrderConfiguration;
	registerView(contextProvider: IExplorerView): void;
	getContext(
		respectMultiSelection: boolean,
		ignoreNestedChildren?: boolean,
	): ExplorerItem[];
	applyBulkEdit(
		edit: ResourceFileEdit[],
		options: {
			undoLabel: string;
			progressLabel: string;
			confirmBeforeUndo?: boolean;
			progressLocation?:
				| ProgressLocation.Explorer
				| ProgressLocation.Window;
		},
	): Promise<void>;
	hasViewFocus(): boolean;
	findClosest(resource: URI): ExplorerItem | null;
	findClosestRoot(resource: URI): ExplorerItem | null;
	setEditable(stat: ExplorerItem, data: IEditableData | null): Promise<void>;
	setToCopy(items: ExplorerItem[], cut: boolean): Promise<void>;
	isCut(item: ExplorerItem): boolean;
	getEditable():
		| {
				stat: ExplorerItem;
				data: IEditableData;
		  }
		| undefined;
	getEditableData(stat: ExplorerItem): IEditableData | undefined;
	isEditable(stat: ExplorerItem | undefined): boolean;
	select(resource: URI, reveal?: boolean | string): Promise<void>;
	refresh(reveal?: boolean): Promise<void>;
	private onDidRunOperation;
	private shouldAutoRevealItem;
	private onConfigurationUpdated;
	dispose(): void;
}
