import { Disposable } from "../../../../../base/common/lifecycle.js";
import { ITransaction } from "../../../../../base/common/observable.js";
import { IAccessibilityService } from "../../../../../platform/accessibility/common/accessibility.js";
import { IAccessibilitySignalService } from "../../../../../platform/accessibilitySignal/browser/accessibilitySignalService.js";
import { ICommandService } from "../../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../../platform/keybinding/common/keybinding.js";
import { ICodeEditor } from "../../../../browser/editorBrowser.js";
import { Range } from "../../../../common/core/range.js";
import { ILanguageFeatureDebounceService } from "../../../../common/services/languageFeatureDebounce.js";
import { ILanguageFeaturesService } from "../../../../common/services/languageFeatures.js";
import { InlineCompletionsModel } from "../model/inlineCompletionsModel.js";
import { InlineEditsViewAndDiffProducer } from "../view/inlineEdits/inlineEditsView.js";

export declare class InlineCompletionsController extends Disposable {
	readonly editor: ICodeEditor;
	private readonly _instantiationService;
	private readonly _contextKeyService;
	private readonly _configurationService;
	private readonly _commandService;
	private readonly _debounceService;
	private readonly _languageFeaturesService;
	private readonly _accessibilitySignalService;
	private readonly _keybindingService;
	private readonly _accessibilityService;
	static hot: import("../../../../../base/common/observable.js").IObservable<
		typeof InlineCompletionsController,
		unknown
	>;
	static ID: string;
	static get(editor: ICodeEditor): InlineCompletionsController | null;
	private readonly _editorObs;
	private readonly _positions;
	private readonly _suggestWidgetAdaptor;
	private readonly _suggestWidgetSelectedItem;
	private readonly _enabledInConfig;
	private readonly _isScreenReaderEnabled;
	private readonly _editorDictationInProgress;
	private readonly _enabled;
	private readonly _debounceValue;
	readonly model: import("../../../../../base/common/observable.js").IObservable<
		InlineCompletionsModel | undefined,
		unknown
	>;
	private readonly _ghostTexts;
	private readonly _stablizedGhostTexts;
	private readonly _ghostTextWidgets;
	private readonly _inlineEdit;
	private readonly _everHadInlineEdit;
	protected readonly _inlineEditWidget: import("../../../../../base/common/observable.js").IObservable<
		InlineEditsViewAndDiffProducer | undefined,
		unknown
	>;
	private readonly _playAccessibilitySignal;
	private readonly _fontFamily;
	constructor(
		editor: ICodeEditor,
		_instantiationService: IInstantiationService,
		_contextKeyService: IContextKeyService,
		_configurationService: IConfigurationService,
		_commandService: ICommandService,
		_debounceService: ILanguageFeatureDebounceService,
		_languageFeaturesService: ILanguageFeaturesService,
		_accessibilitySignalService: IAccessibilitySignalService,
		_keybindingService: IKeybindingService,
		_accessibilityService: IAccessibilityService,
	);
	private readonly _cursorIsInIndentation;
	playAccessibilitySignal(tx: ITransaction): void;
	private _provideScreenReaderUpdate;
	shouldShowHoverAt(range: Range): boolean;
	shouldShowHoverAtViewZone(viewZoneId: string): boolean;
	hide(): void;
	jump(): void;
}
