import { CancellationTokenSource } from "../../../../base/common/cancellation.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { ITextModelService } from "../../../../editor/common/services/resolverService.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IProgressService } from "../../../../platform/progress/common/progress.js";
import { IEditorGroupsService } from "../../../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IMultiDiffSourceResolverService } from "../../multiDiffEditor/browser/multiDiffSourceResolverService.js";
import { ICodeMapperService } from "../common/chatCodeMapperService.js";
import {
	IChatEditingService,
	IChatEditingSession,
} from "../common/chatEditingService.js";
import { IChatResponseModel } from "../common/chatModel.js";
import { IChatService } from "../common/chatService.js";

export declare class ChatEditingService
	extends Disposable
	implements IChatEditingService
{
	private readonly _editorGroupsService;
	private readonly _instantiationService;
	private readonly _chatService;
	private readonly _progressService;
	private readonly _codeMapperService;
	private readonly _editorService;
	_serviceBrand: undefined;
	private readonly _currentSessionObs;
	private readonly _currentSessionDisposables;
	private readonly _currentAutoApplyOperationObs;
	get currentAutoApplyOperation(): CancellationTokenSource | null;
	get currentEditingSession(): IChatEditingSession | null;
	private readonly _onDidCreateEditingSession;
	get onDidCreateEditingSession(): import("../../../workbench.web.main.internal.js").Event<IChatEditingSession>;
	private readonly _onDidChangeEditingSession;
	readonly onDidChangeEditingSession: import("../../../workbench.web.main.internal.js").Event<void>;
	constructor(
		_editorGroupsService: IEditorGroupsService,
		_instantiationService: IInstantiationService,
		multiDiffSourceResolverService: IMultiDiffSourceResolverService,
		textModelService: ITextModelService,
		contextKeyService: IContextKeyService,
		_chatService: IChatService,
		_progressService: IProgressService,
		_codeMapperService: ICodeMapperService,
		_editorService: IEditorService,
	);
	getEditingSession(resource: URI): IChatEditingSession | null;
	addFileToWorkingSet(resource: URI): Promise<void>;
	dispose(): void;
	startOrContinueEditingSession(
		chatSessionId: string,
		options?: {
			silent: boolean;
		},
	): Promise<IChatEditingSession>;
	private _createEditingSession;
	triggerEditComputation(responseModel: IChatResponseModel): Promise<void>;
	private installAutoApplyObserver;
	private _continueEditingSession;
	private _findGroupedEditors;
}
