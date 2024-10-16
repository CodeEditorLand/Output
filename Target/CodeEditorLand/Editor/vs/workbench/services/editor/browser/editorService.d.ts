import { Event } from "../../../../base/common/event.js";
import {
	Disposable,
	DisposableStore,
} from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import {
	ICodeEditor,
	IDiffEditor,
} from "../../../../editor/browser/editorBrowser.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import {
	IEditorOptions,
	IResourceEditorInput,
	IResourceEditorInputIdentifier,
	ITextResourceEditorInput,
} from "../../../../platform/editor/common/editor.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IWorkspaceTrustRequestService } from "../../../../platform/workspace/common/workspaceTrust.js";
import { EditorServiceImpl } from "../../../browser/parts/editor/editor.js";
import {
	EditorInputWithOptions,
	EditorsOrder,
	GroupIdentifier,
	IEditorCloseEvent,
	IEditorIdentifier,
	IEditorPane,
	IEditorWillOpenEvent,
	IFindEditorOptions,
	IResourceDiffEditorInput,
	IRevertOptions,
	ITextDiffEditorPane,
	IUntitledTextResourceEditorInput,
	IUntypedEditorInput,
	IVisibleEditorPane,
} from "../../../common/editor.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import { IHostService } from "../../host/browser/host.js";
import { ITextEditorService } from "../../textfile/common/textEditorService.js";
import {
	ICloseEditorOptions,
	IEditorGroup,
	IEditorGroupsContainer,
	IEditorGroupsService,
	IEditorReplacement,
} from "../common/editorGroupsService.js";
import { IEditorResolverService } from "../common/editorResolverService.js";
import {
	IEditorsChangeEvent,
	IEditorService,
	IOpenEditorsOptions,
	IRevertAllEditorsOptions,
	ISaveAllEditorsOptions,
	ISaveEditorsOptions,
	ISaveEditorsResult,
	IUntypedEditorReplacement,
	PreferredGroup,
} from "../common/editorService.js";

export declare class EditorService
	extends Disposable
	implements EditorServiceImpl
{
	private readonly editorGroupService;
	private readonly instantiationService;
	private readonly fileService;
	private readonly configurationService;
	private readonly contextService;
	private readonly uriIdentityService;
	private readonly editorResolverService;
	private readonly workspaceTrustRequestService;
	private readonly hostService;
	private readonly textEditorService;
	readonly _serviceBrand: undefined;
	private readonly _onDidActiveEditorChange;
	readonly onDidActiveEditorChange: Event<void>;
	private readonly _onDidVisibleEditorsChange;
	readonly onDidVisibleEditorsChange: Event<void>;
	private readonly _onDidEditorsChange;
	readonly onDidEditorsChange: Event<IEditorsChangeEvent>;
	private readonly _onWillOpenEditor;
	readonly onWillOpenEditor: Event<IEditorWillOpenEvent>;
	private readonly _onDidCloseEditor;
	readonly onDidCloseEditor: Event<IEditorCloseEvent>;
	private readonly _onDidOpenEditorFail;
	readonly onDidOpenEditorFail: Event<IEditorIdentifier>;
	private readonly _onDidMostRecentlyActiveEditorsChange;
	readonly onDidMostRecentlyActiveEditorsChange: Event<void>;
	private readonly editorGroupsContainer;
	constructor(
		editorGroupsContainer: IEditorGroupsContainer | undefined,
		editorGroupService: IEditorGroupsService,
		instantiationService: IInstantiationService,
		fileService: IFileService,
		configurationService: IConfigurationService,
		contextService: IWorkspaceContextService,
		uriIdentityService: IUriIdentityService,
		editorResolverService: IEditorResolverService,
		workspaceTrustRequestService: IWorkspaceTrustRequestService,
		hostService: IHostService,
		textEditorService: ITextEditorService,
	);
	createScoped(
		editorGroupsContainer: IEditorGroupsContainer | "main",
		disposables: DisposableStore,
	): IEditorService;
	private registerListeners;
	private lastActiveEditor;
	private onEditorGroupsReady;
	private handleActiveEditorChange;
	private doHandleActiveEditorChangeEvent;
	private registerGroupListeners;
	private readonly activeOutOfWorkspaceWatchers;
	private handleVisibleEditorsChange;
	private onDidRunFileOperation;
	private onDidFilesChange;
	private handleMovedFile;
	private closeOnFileDelete;
	private onConfigurationUpdated;
	private handleDeletedFile;
	private getAllNonDirtyEditors;
	private readonly editorsObserver;
	get activeEditorPane(): IVisibleEditorPane | undefined;
	get activeTextEditorControl(): ICodeEditor | IDiffEditor | undefined;
	get activeTextEditorLanguageId(): string | undefined;
	get count(): number;
	get editors(): EditorInput[];
	getEditors(
		order: EditorsOrder,
		options?: {
			excludeSticky?: boolean;
		},
	): IEditorIdentifier[];
	get activeEditor(): EditorInput | undefined;
	get visibleEditorPanes(): IVisibleEditorPane[];
	get visibleTextEditorControls(): Array<ICodeEditor | IDiffEditor>;
	get visibleEditors(): EditorInput[];
	openEditor(
		editor: EditorInput,
		options?: IEditorOptions,
		group?: PreferredGroup,
	): Promise<IEditorPane | undefined>;
	openEditor(
		editor: IUntypedEditorInput,
		group?: PreferredGroup,
	): Promise<IEditorPane | undefined>;
	openEditor(
		editor: IResourceEditorInput,
		group?: PreferredGroup,
	): Promise<IEditorPane | undefined>;
	openEditor(
		editor: ITextResourceEditorInput | IUntitledTextResourceEditorInput,
		group?: PreferredGroup,
	): Promise<IEditorPane | undefined>;
	openEditor(
		editor: IResourceDiffEditorInput,
		group?: PreferredGroup,
	): Promise<ITextDiffEditorPane | undefined>;
	openEditor(
		editor: EditorInput | IUntypedEditorInput,
		optionsOrPreferredGroup?: IEditorOptions | PreferredGroup,
		preferredGroup?: PreferredGroup,
	): Promise<IEditorPane | undefined>;
	openEditors(
		editors: EditorInputWithOptions[],
		group?: PreferredGroup,
		options?: IOpenEditorsOptions,
	): Promise<IEditorPane[]>;
	openEditors(
		editors: IUntypedEditorInput[],
		group?: PreferredGroup,
		options?: IOpenEditorsOptions,
	): Promise<IEditorPane[]>;
	openEditors(
		editors: Array<EditorInputWithOptions | IUntypedEditorInput>,
		group?: PreferredGroup,
		options?: IOpenEditorsOptions,
	): Promise<IEditorPane[]>;
	private handleWorkspaceTrust;
	private extractEditorResources;
	isOpened(editor: IResourceEditorInputIdentifier): boolean;
	isVisible(editor: EditorInput): boolean;
	closeEditor(
		{ editor, groupId }: IEditorIdentifier,
		options?: ICloseEditorOptions,
	): Promise<void>;
	closeEditors(
		editors: IEditorIdentifier[],
		options?: ICloseEditorOptions,
	): Promise<void>;
	findEditors(
		resource: URI,
		options?: IFindEditorOptions,
	): readonly IEditorIdentifier[];
	findEditors(
		editor: IResourceEditorInputIdentifier,
		options?: IFindEditorOptions,
	): readonly IEditorIdentifier[];
	findEditors(
		resource: URI,
		options: IFindEditorOptions | undefined,
		group: IEditorGroup | GroupIdentifier,
	): readonly EditorInput[];
	findEditors(
		editor: IResourceEditorInputIdentifier,
		options: IFindEditorOptions | undefined,
		group: IEditorGroup | GroupIdentifier,
	): EditorInput | undefined;
	findEditors(
		arg1: URI | IResourceEditorInputIdentifier,
		options: IFindEditorOptions | undefined,
		arg2?: IEditorGroup | GroupIdentifier,
	):
		| readonly IEditorIdentifier[]
		| readonly EditorInput[]
		| EditorInput
		| undefined;
	replaceEditors(
		replacements: IUntypedEditorReplacement[],
		group: IEditorGroup | GroupIdentifier,
	): Promise<void>;
	replaceEditors(
		replacements: IEditorReplacement[],
		group: IEditorGroup | GroupIdentifier,
	): Promise<void>;
	save(
		editors: IEditorIdentifier | IEditorIdentifier[],
		options?: ISaveEditorsOptions,
	): Promise<ISaveEditorsResult>;
	saveAll(options?: ISaveAllEditorsOptions): Promise<ISaveEditorsResult>;
	revert(
		editors: IEditorIdentifier | IEditorIdentifier[],
		options?: IRevertOptions,
	): Promise<boolean>;
	revertAll(options?: IRevertAllEditorsOptions): Promise<boolean>;
	private getAllModifiedEditors;
	private getUniqueEditors;
	dispose(): void;
}
