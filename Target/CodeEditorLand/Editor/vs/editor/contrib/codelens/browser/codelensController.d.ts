import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { ICodeEditor } from "../../../browser/editorBrowser.js";
import { IEditorContribution } from "../../../common/editorCommon.js";
import { ILanguageFeatureDebounceService } from "../../../common/services/languageFeatureDebounce.js";
import { ILanguageFeaturesService } from "../../../common/services/languageFeatures.js";
import { CodeLensModel } from "./codelens.js";
import { ICodeLensCache } from "./codeLensCache.js";

export declare class CodeLensContribution implements IEditorContribution {
	private readonly _editor;
	private readonly _languageFeaturesService;
	private readonly _commandService;
	private readonly _notificationService;
	private readonly _codeLensCache;
	static readonly ID: string;
	private readonly _disposables;
	private readonly _localToDispose;
	private readonly _lenses;
	private readonly _provideCodeLensDebounce;
	private readonly _resolveCodeLensesDebounce;
	private readonly _resolveCodeLensesScheduler;
	private _getCodeLensModelPromise;
	private readonly _oldCodeLensModels;
	private _currentCodeLensModel;
	private _resolveCodeLensesPromise;
	constructor(
		_editor: ICodeEditor,
		_languageFeaturesService: ILanguageFeaturesService,
		debounceService: ILanguageFeatureDebounceService,
		_commandService: ICommandService,
		_notificationService: INotificationService,
		_codeLensCache: ICodeLensCache,
	);
	dispose(): void;
	private _getLayoutInfo;
	private _updateLensStyle;
	private _localDispose;
	private _onModelChange;
	private _disposeAllLenses;
	private _renderCodeLensSymbols;
	private _resolveCodeLensesInViewportSoon;
	private _resolveCodeLensesInViewport;
	getModel(): Promise<CodeLensModel | undefined>;
}
