import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { ResourceMap } from "../../../../base/common/map.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import {
	IActiveCodeEditor,
	ICodeEditor,
} from "../../../browser/editorBrowser.js";
import { ICodeEditorService } from "../../../browser/services/codeEditorService.js";
import { Position } from "../../../common/core/position.js";
import { IEditorContribution } from "../../../common/editorCommon.js";
import { LanguageFeatureRegistry } from "../../../common/languageFeatureRegistry.js";
import {
	DocumentHighlight,
	DocumentHighlightProvider,
	MultiDocumentHighlightProvider,
} from "../../../common/languages.js";
import { ITextModel } from "../../../common/model.js";
import { ILanguageFeaturesService } from "../../../common/services/languageFeatures.js";
import { ITextModelService } from "../../../common/services/resolverService.js";

export declare function getOccurrencesAtPosition(
	registry: LanguageFeatureRegistry<DocumentHighlightProvider>,
	model: ITextModel,
	position: Position,
	token: CancellationToken,
): Promise<ResourceMap<DocumentHighlight[]> | null | undefined>;
export declare function getOccurrencesAcrossMultipleModels(
	registry: LanguageFeatureRegistry<MultiDocumentHighlightProvider>,
	model: ITextModel,
	position: Position,
	token: CancellationToken,
	otherModels: ITextModel[],
): Promise<ResourceMap<DocumentHighlight[]> | null | undefined>;
declare class WordHighlighter {
	private readonly editor;
	private readonly providers;
	private readonly multiDocumentProviders;
	private readonly model;
	private readonly decorations;
	private readonly toUnhook;
	private readonly textModelService;
	private readonly codeEditorService;
	private readonly configurationService;
	private readonly logService;
	private occurrencesHighlightEnablement;
	private occurrencesHighlightDelay;
	private workerRequestTokenId;
	private workerRequest;
	private workerRequestCompleted;
	private workerRequestValue;
	private lastCursorPositionChangeTime;
	private renderDecorationsTimer;
	private readonly _hasWordHighlights;
	private _ignorePositionChangeEvent;
	private readonly runDelayer;
	private static storedDecorationIDs;
	private static query;
	constructor(
		editor: IActiveCodeEditor,
		providers: LanguageFeatureRegistry<DocumentHighlightProvider>,
		multiProviders: LanguageFeatureRegistry<MultiDocumentHighlightProvider>,
		contextKeyService: IContextKeyService,
		textModelService: ITextModelService,
		codeEditorService: ICodeEditorService,
		configurationService: IConfigurationService,
		logService: ILogService,
	);
	hasDecorations(): boolean;
	restore(): void;
	trigger(): void;
	stop(): void;
	private _getSortedHighlights;
	moveNext(): void;
	moveBack(): void;
	private _removeSingleDecorations;
	private _removeAllDecorations;
	private _stopSingular;
	private _stopAll;
	private _onPositionChanged;
	private _getWord;
	private getOtherModelsToHighlight;
	private _run;
	private computeWithModel;
	private _beginRenderDecorations;
	private renderDecorations;
	dispose(): void;
}
export declare class WordHighlighterContribution
	extends Disposable
	implements IEditorContribution
{
	static readonly ID = "editor.contrib.wordHighlighter";
	static get(editor: ICodeEditor): WordHighlighterContribution | null;
	private _wordHighlighter;
	constructor(
		editor: ICodeEditor,
		contextKeyService: IContextKeyService,
		languageFeaturesService: ILanguageFeaturesService,
		codeEditorService: ICodeEditorService,
		textModelService: ITextModelService,
		configurationService: IConfigurationService,
		logService: ILogService,
	);
	get wordHighlighter(): WordHighlighter | null;
	saveViewState(): boolean;
	moveNext(): void;
	moveBack(): void;
	restoreViewState(state: boolean | undefined): void;
	stopHighlighting(): void;
	dispose(): void;
}
export {};
