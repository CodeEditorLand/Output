import { Event } from "../../../../base/common/event.js";
import { IMarkdownString } from "../../../../base/common/htmlContent.js";
import { Disposable, IReference } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { IResolvedTextEditorModel } from "../../../../editor/common/services/resolverService.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { IExtensionService } from "../../../../workbench/services/extensions/common/extensions.js";
import { IRevertOptions, ISaveOptions } from "../../../common/editor.js";
import { ITextFileService } from "../../../services/textfile/common/textfiles.js";
import { ICustomEditorModel } from "./customEditor.js";

export declare class CustomTextEditorModel
	extends Disposable
	implements ICustomEditorModel
{
	readonly viewType: string;
	private readonly _resource;
	private readonly _model;
	private readonly textFileService;
	private readonly _labelService;
	static create(
		instantiationService: IInstantiationService,
		viewType: string,
		resource: URI,
	): Promise<CustomTextEditorModel>;
	private readonly _textFileModel;
	private readonly _onDidChangeOrphaned;
	readonly onDidChangeOrphaned: Event<void>;
	private readonly _onDidChangeReadonly;
	readonly onDidChangeReadonly: Event<void>;
	constructor(
		viewType: string,
		_resource: URI,
		_model: IReference<IResolvedTextEditorModel>,
		textFileService: ITextFileService,
		_labelService: ILabelService,
		extensionService: IExtensionService,
	);
	get resource(): URI;
	get name(): string;
	isReadonly(): boolean | IMarkdownString;
	get backupId(): undefined;
	get canHotExit(): boolean;
	isDirty(): boolean;
	isOrphaned(): boolean;
	private readonly _onDidChangeDirty;
	readonly onDidChangeDirty: Event<void>;
	private readonly _onDidChangeContent;
	readonly onDidChangeContent: Event<void>;
	revert(options?: IRevertOptions): Promise<void>;
	saveCustomEditor(options?: ISaveOptions): Promise<URI | undefined>;
	saveCustomEditorAs(
		resource: URI,
		targetResource: URI,
		options?: ISaveOptions,
	): Promise<boolean>;
}
