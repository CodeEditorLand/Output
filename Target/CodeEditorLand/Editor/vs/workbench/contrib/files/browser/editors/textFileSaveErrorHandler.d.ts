import { Disposable } from "../../../../../base/common/lifecycle.js";
import { URI } from "../../../../../base/common/uri.js";
import { ITextModelService } from "../../../../../editor/common/services/resolverService.js";
import { IContextKeyService } from "../../../../../platform/contextkey/common/contextkey.js";
import {
	IInstantiationService,
	ServicesAccessor,
} from "../../../../../platform/instantiation/common/instantiation.js";
import { INotificationService } from "../../../../../platform/notification/common/notification.js";
import { IStorageService } from "../../../../../platform/storage/common/storage.js";
import { IWorkbenchContribution } from "../../../../common/contributions.js";
import { IEditorService } from "../../../../services/editor/common/editorService.js";
import {
	ISaveErrorHandler,
	ITextFileEditorModel,
	ITextFileSaveOptions,
	ITextFileService,
} from "../../../../services/textfile/common/textfiles.js";

export declare const CONFLICT_RESOLUTION_CONTEXT =
	"saveConflictResolutionContext";
export declare const CONFLICT_RESOLUTION_SCHEME = "conflictResolution";
export declare class TextFileSaveErrorHandler
	extends Disposable
	implements ISaveErrorHandler, IWorkbenchContribution
{
	private readonly notificationService;
	private readonly textFileService;
	private contextKeyService;
	private readonly editorService;
	private readonly instantiationService;
	private readonly storageService;
	static readonly ID = "workbench.contrib.textFileSaveErrorHandler";
	private readonly messages;
	private readonly conflictResolutionContext;
	private activeConflictResolutionResource;
	constructor(
		notificationService: INotificationService,
		textFileService: ITextFileService,
		contextKeyService: IContextKeyService,
		editorService: IEditorService,
		textModelService: ITextModelService,
		instantiationService: IInstantiationService,
		storageService: IStorageService,
	);
	private registerListeners;
	private onActiveEditorChanged;
	private onFileSavedOrReverted;
	onSaveError(
		error: unknown,
		model: ITextFileEditorModel,
		options: ITextFileSaveOptions,
	): void;
	dispose(): void;
}
export declare const acceptLocalChangesCommand: (
	accessor: ServicesAccessor,
	resource: URI,
) => Promise<boolean | undefined>;
export declare const revertLocalChangesCommand: (
	accessor: ServicesAccessor,
	resource: URI,
) => Promise<boolean | undefined>;
