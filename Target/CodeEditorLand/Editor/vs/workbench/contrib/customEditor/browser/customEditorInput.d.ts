import { CodeWindow } from "../../../../base/browser/window.js";
import { VSBuffer } from "../../../../base/common/buffer.js";
import { IMarkdownString } from "../../../../base/common/htmlContent.js";
import { URI } from "../../../../base/common/uri.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IFileDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { IResourceEditorInput } from "../../../../platform/editor/common/editor.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { IUndoRedoService } from "../../../../platform/undoRedo/common/undoRedo.js";
import {
	EditorInputCapabilities,
	GroupIdentifier,
	IMoveResult,
	IRevertOptions,
	ISaveOptions,
	IUntypedEditorInput,
	Verbosity,
} from "../../../common/editor.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import { ICustomEditorLabelService } from "../../../services/editor/common/customEditorLabelService.js";
import { IEditorGroupsService } from "../../../services/editor/common/editorGroupsService.js";
import { IFilesConfigurationService } from "../../../services/filesConfiguration/common/filesConfigurationService.js";
import { IWorkbenchLayoutService } from "../../../services/layout/browser/layoutService.js";
import { IOverlayWebview } from "../../webview/browser/webview.js";
import {
	IWebviewWorkbenchService,
	LazilyResolvedWebviewEditorInput,
} from "../../webviewPanel/browser/webviewWorkbenchService.js";
import { ICustomEditorService } from "../common/customEditor.js";

interface CustomEditorInputInitInfo {
	readonly resource: URI;
	readonly viewType: string;
}
export declare class CustomEditorInput extends LazilyResolvedWebviewEditorInput {
	private readonly instantiationService;
	private readonly labelService;
	private readonly customEditorService;
	private readonly fileDialogService;
	private readonly undoRedoService;
	private readonly fileService;
	private readonly filesConfigurationService;
	private readonly editorGroupsService;
	private readonly layoutService;
	private readonly customEditorLabelService;
	static create(
		instantiationService: IInstantiationService,
		resource: URI,
		viewType: string,
		group: GroupIdentifier | undefined,
		options?: {
			readonly customClasses?: string;
			readonly oldResource?: URI;
		},
	): EditorInput;
	static readonly typeId = "workbench.editors.webviewEditor";
	private readonly _editorResource;
	readonly oldResource?: URI;
	private _defaultDirtyState;
	private readonly _backupId;
	private readonly _untitledDocumentData;
	get resource(): URI;
	private _modelRef?;
	constructor(
		init: CustomEditorInputInitInfo,
		webview: IOverlayWebview,
		options: {
			startsDirty?: boolean;
			backupId?: string;
			untitledDocumentData?: VSBuffer;
			readonly oldResource?: URI;
		},
		webviewWorkbenchService: IWebviewWorkbenchService,
		instantiationService: IInstantiationService,
		labelService: ILabelService,
		customEditorService: ICustomEditorService,
		fileDialogService: IFileDialogService,
		undoRedoService: IUndoRedoService,
		fileService: IFileService,
		filesConfigurationService: IFilesConfigurationService,
		editorGroupsService: IEditorGroupsService,
		layoutService: IWorkbenchLayoutService,
		customEditorLabelService: ICustomEditorLabelService,
	);
	private registerListeners;
	private onLabelEvent;
	private updateLabel;
	get typeId(): string;
	get editorId(): string;
	get capabilities(): EditorInputCapabilities;
	private _editorName;
	getName(): string;
	getDescription(verbosity?: Verbosity): string | undefined;
	private _shortDescription;
	private get shortDescription();
	private _mediumDescription;
	private get mediumDescription();
	private _longDescription;
	private get longDescription();
	private _shortTitle;
	private get shortTitle();
	private _mediumTitle;
	private get mediumTitle();
	private _longTitle;
	private get longTitle();
	getTitle(verbosity?: Verbosity): string;
	matches(other: EditorInput | IUntypedEditorInput): boolean;
	copy(): EditorInput;
	isReadonly(): boolean | IMarkdownString;
	isDirty(): boolean;
	save(
		groupId: GroupIdentifier,
		options?: ISaveOptions,
	): Promise<EditorInput | IUntypedEditorInput | undefined>;
	saveAs(
		groupId: GroupIdentifier,
		options?: ISaveOptions,
	): Promise<EditorInput | IUntypedEditorInput | undefined>;
	revert(group: GroupIdentifier, options?: IRevertOptions): Promise<void>;
	resolve(): Promise<null>;
	rename(
		group: GroupIdentifier,
		newResource: URI,
	): Promise<IMoveResult | undefined>;
	undo(): void | Promise<void>;
	redo(): void | Promise<void>;
	private _moveHandler?;
	onMove(handler: (newResource: URI) => void): void;
	protected transfer(other: CustomEditorInput): CustomEditorInput | undefined;
	get backupId(): string | undefined;
	get untitledDocumentData(): VSBuffer | undefined;
	toUntyped(): IResourceEditorInput;
	claim(
		claimant: unknown,
		targetWindow: CodeWindow,
		scopedContextKeyService: IContextKeyService | undefined,
	): void;
	canMove(
		sourceGroup: GroupIdentifier,
		targetGroup: GroupIdentifier,
	): true | string;
	private doCanMove;
}
export {};
