import { Event } from "../../../../base/common/event.js";
import { Disposable, IDisposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { ILanguageSelection } from "../../../../editor/common/languages/language.js";
import { ITextModel } from "../../../../editor/common/model.js";
import { IEditorWorkerService } from "../../../../editor/common/services/editorWorker.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { OutputChannelUpdateMode } from "../../../services/output/common/output.js";

export interface IOutputChannelModel extends IDisposable {
	readonly onDispose: Event<void>;
	append(output: string): void;
	update(
		mode: OutputChannelUpdateMode,
		till: number | undefined,
		immediate: boolean,
	): void;
	loadModel(): Promise<ITextModel>;
	clear(): void;
	replace(value: string): void;
}
export declare class FileOutputChannelModel
	extends Disposable
	implements IOutputChannelModel
{
	private readonly modelUri;
	private readonly language;
	private readonly file;
	private readonly fileService;
	private readonly modelService;
	private readonly editorWorkerService;
	private readonly _onDispose;
	readonly onDispose: Event<void>;
	private readonly fileHandler;
	private etag;
	private loadModelPromise;
	private model;
	private modelUpdateInProgress;
	private readonly modelUpdateCancellationSource;
	private readonly appendThrottler;
	private replacePromise;
	private startOffset;
	private endOffset;
	constructor(
		modelUri: URI,
		language: ILanguageSelection,
		file: URI,
		fileService: IFileService,
		modelService: IModelService,
		logService: ILogService,
		editorWorkerService: IEditorWorkerService,
	);
	append(message: string): void;
	replace(message: string): void;
	clear(): void;
	update(
		mode: OutputChannelUpdateMode,
		till: number | undefined,
		immediate: boolean,
	): void;
	loadModel(): Promise<ITextModel>;
	private createModel;
	private doUpdate;
	private clearContent;
	private appendContent;
	private replaceContent;
	private getReplaceEdits;
	private doUpdateModel;
	protected cancelModelUpdate(): void;
	private getContentToUpdate;
	private onDidContentChange;
	protected isVisible(): boolean;
	dispose(): void;
}
export declare class DelegatedOutputChannelModel
	extends Disposable
	implements IOutputChannelModel
{
	private readonly instantiationService;
	private readonly fileService;
	private readonly _onDispose;
	readonly onDispose: Event<void>;
	private readonly outputChannelModel;
	constructor(
		id: string,
		modelUri: URI,
		language: ILanguageSelection,
		outputDir: Promise<URI>,
		instantiationService: IInstantiationService,
		fileService: IFileService,
	);
	private createOutputChannelModel;
	append(output: string): void;
	update(
		mode: OutputChannelUpdateMode,
		till: number | undefined,
		immediate: boolean,
	): void;
	loadModel(): Promise<ITextModel>;
	clear(): void;
	replace(value: string): void;
}
