import { Event } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { ICodeEditor } from "../../../browser/editorBrowser.js";
import { Position } from "../../../common/core/position.js";
import { IEditorContribution } from "../../../common/editorCommon.js";
import { IModelDecoration } from "../../../common/model.js";
import { ILanguageFeatureDebounceService } from "../../../common/services/languageFeatureDebounce.js";
import { ILanguageFeaturesService } from "../../../common/services/languageFeatures.js";
import { IColorData } from "./color.js";

export declare const ColorDecorationInjectedTextMarker: any;
export declare class ColorDetector
	extends Disposable
	implements IEditorContribution
{
	private readonly _editor;
	private readonly _configurationService;
	private readonly _languageFeaturesService;
	static readonly ID: string;
	static readonly RECOMPUTE_TIME = 1000;
	private readonly _localToDispose;
	private _computePromise;
	private _timeoutTimer;
	private _debounceInformation;
	private _decorationsIds;
	private _colorDatas;
	private readonly _colorDecoratorIds;
	private _isColorDecoratorsEnabled;
	private _isDefaultColorDecoratorsEnabled;
	private readonly _ruleFactory;
	private readonly _decoratorLimitReporter;
	constructor(
		_editor: ICodeEditor,
		_configurationService: IConfigurationService,
		_languageFeaturesService: ILanguageFeaturesService,
		languageFeatureDebounceService: ILanguageFeatureDebounceService,
	);
	isEnabled(): boolean;
	get limitReporter(): DecoratorLimitReporter;
	static get(editor: ICodeEditor): ColorDetector | null;
	dispose(): void;
	private updateColors;
	private beginCompute;
	private stop;
	private updateDecorations;
	private readonly _colorDecorationClassRefs;
	private updateColorDecorators;
	private removeAllDecorations;
	getColorData(position: Position): IColorData | null;
	isColorDecoration(decoration: IModelDecoration): boolean;
}
export declare class DecoratorLimitReporter {
	private _onDidChange;
	readonly onDidChange: Event<void>;
	private _computed;
	private _limited;
	get computed(): number;
	get limited(): number | false;
	update(computed: number, limited: number | false): void;
}
