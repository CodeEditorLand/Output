import { Disposable } from "../../../../base/common/lifecycle.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import {
	IContextKeyService,
	RawContextKey,
} from "../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ICodeEditor } from "../../../browser/editorBrowser.js";
import { IDiffProviderFactoryService } from "../../../browser/widget/diffEditor/diffProviderFactoryService.js";
import { Range } from "../../../common/core/range.js";
import { ILanguageFeaturesService } from "../../../common/services/languageFeatures.js";
import { IModelService } from "../../../common/services/model.js";

export declare class InlineEditController extends Disposable {
	readonly editor: ICodeEditor;
	private readonly instantiationService;
	private readonly contextKeyService;
	private readonly languageFeaturesService;
	private readonly _commandService;
	private readonly _configurationService;
	private readonly _diffProviderFactoryService;
	private readonly _modelService;
	static ID: string;
	static readonly inlineEditVisibleKey = "inlineEditVisible";
	static readonly inlineEditVisibleContext: RawContextKey<boolean>;
	private _isVisibleContext;
	static readonly cursorAtInlineEditKey = "cursorAtInlineEdit";
	static readonly cursorAtInlineEditContext: RawContextKey<boolean>;
	private _isCursorAtInlineEditContext;
	static get(editor: ICodeEditor): InlineEditController | null;
	private _currentEdit;
	private _currentWidget;
	private _currentRequestCts;
	private _jumpBackPosition;
	private _isAccepting;
	private readonly _inlineCompletionInlineEdits;
	private readonly _inlineEditEnabled;
	private readonly _enabled;
	private readonly _fontFamily;
	constructor(
		editor: ICodeEditor,
		instantiationService: IInstantiationService,
		contextKeyService: IContextKeyService,
		languageFeaturesService: ILanguageFeaturesService,
		_commandService: ICommandService,
		_configurationService: IConfigurationService,
		_diffProviderFactoryService: IDiffProviderFactoryService,
		_modelService: IModelService,
	);
	private checkCursorPosition;
	private validateInlineEdit;
	private fetchInlineEdit;
	private getInlineEdit;
	trigger(): Promise<void>;
	jumpBack(): Promise<void>;
	accept(): Promise<void>;
	jumpToCurrent(): void;
	clear(sendRejection?: boolean): Promise<void>;
	private freeEdit;
	shouldShowHoverAt(range: Range): boolean;
	shouldShowHoverAtViewZone(viewZoneId: string): boolean;
}
