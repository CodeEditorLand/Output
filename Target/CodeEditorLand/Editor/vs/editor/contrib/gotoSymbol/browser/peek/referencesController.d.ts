import { CancelablePromise } from "../../../../../base/common/async.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import {
	IContextKeyService,
	RawContextKey,
} from "../../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { INotificationService } from "../../../../../platform/notification/common/notification.js";
import { IStorageService } from "../../../../../platform/storage/common/storage.js";
import { ICodeEditor } from "../../../../browser/editorBrowser.js";
import { ICodeEditorService } from "../../../../browser/services/codeEditorService.js";
import { Range } from "../../../../common/core/range.js";
import { IEditorContribution } from "../../../../common/editorCommon.js";
import { Location } from "../../../../common/languages.js";
import { OneReference, ReferencesModel } from "../referencesModel.js";

export declare const ctxReferenceSearchVisible: RawContextKey<boolean>;
export declare abstract class ReferencesController
	implements IEditorContribution
{
	private readonly _defaultTreeKeyboardSupport;
	private readonly _editor;
	private readonly _editorService;
	private readonly _notificationService;
	private readonly _instantiationService;
	private readonly _storageService;
	private readonly _configurationService;
	static readonly ID = "editor.contrib.referencesController";
	private readonly _disposables;
	private _widget?;
	private _model?;
	private _peekMode?;
	private _requestIdPool;
	private _ignoreModelChangeEvent;
	private readonly _referenceSearchVisible;
	static get(editor: ICodeEditor): ReferencesController | null;
	constructor(
		_defaultTreeKeyboardSupport: boolean,
		_editor: ICodeEditor,
		contextKeyService: IContextKeyService,
		_editorService: ICodeEditorService,
		_notificationService: INotificationService,
		_instantiationService: IInstantiationService,
		_storageService: IStorageService,
		_configurationService: IConfigurationService,
	);
	dispose(): void;
	toggleWidget(
		range: Range,
		modelPromise: CancelablePromise<ReferencesModel>,
		peekMode: boolean,
	): void;
	changeFocusBetweenPreviewAndReferences(): void;
	goToNextOrPreviousReference(fwd: boolean): Promise<void>;
	revealReference(reference: OneReference): Promise<void>;
	closeWidget(focusEditor?: boolean): void;
	private _gotoReference;
	openReference(ref: Location, sideBySide: boolean, pinned: boolean): void;
}
