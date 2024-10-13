import { Disposable } from "../../../../base/common/lifecycle.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ICodeEditor } from "../../../browser/editorBrowser.js";
import { IEditorContribution } from "../../../common/editorCommon.js";
import { ILanguageConfigurationService } from "../../../common/languages/languageConfigurationRegistry.js";
import { ILanguageFeatureDebounceService } from "../../../common/services/languageFeatureDebounce.js";
import { ILanguageFeaturesService } from "../../../common/services/languageFeatures.js";
import { IStickyLineCandidateProvider } from "./stickyScrollProvider.js";
import { StickyScrollWidgetState } from "./stickyScrollWidget.js";

export interface IStickyScrollController {
	get stickyScrollCandidateProvider(): IStickyLineCandidateProvider;
	get stickyScrollWidgetState(): StickyScrollWidgetState;
	focus(): void;
	focusNext(): void;
	focusPrevious(): void;
	goToFocused(): void;
	findScrollWidgetState(): StickyScrollWidgetState;
	dispose(): void;
	selectEditor(): void;
}
export declare class StickyScrollController
	extends Disposable
	implements IEditorContribution, IStickyScrollController
{
	private readonly _editor;
	private readonly _contextMenuService;
	private readonly _languageFeaturesService;
	private readonly _instaService;
	private readonly _contextKeyService;
	static readonly ID = "store.contrib.stickyScrollController";
	private readonly _stickyScrollWidget;
	private readonly _stickyLineCandidateProvider;
	private readonly _sessionStore;
	private _widgetState;
	private _foldingModel;
	private _maxStickyLines;
	private _stickyRangeProjectedOnEditor;
	private _candidateDefinitionsLength;
	private _stickyScrollFocusedContextKey;
	private _stickyScrollVisibleContextKey;
	private _focusDisposableStore;
	private _focusedStickyElementIndex;
	private _enabled;
	private _focused;
	private _positionRevealed;
	private _onMouseDown;
	private _endLineNumbers;
	private _showEndForLine;
	private _minRebuildFromLine;
	constructor(
		_editor: ICodeEditor,
		_contextMenuService: IContextMenuService,
		_languageFeaturesService: ILanguageFeaturesService,
		_instaService: IInstantiationService,
		_languageConfigurationService: ILanguageConfigurationService,
		_languageFeatureDebounceService: ILanguageFeatureDebounceService,
		_contextKeyService: IContextKeyService,
	);
	get stickyScrollCandidateProvider(): IStickyLineCandidateProvider;
	get stickyScrollWidgetState(): StickyScrollWidgetState;
	static get(editor: ICodeEditor): IStickyScrollController | null;
	private _disposeFocusStickyScrollStore;
	focus(): void;
	focusNext(): void;
	focusPrevious(): void;
	selectEditor(): void;
	private _focusNav;
	goToFocused(): void;
	private _revealPosition;
	private _revealLineInCenterIfOutsideViewport;
	private _reveaInEditor;
	private _registerMouseListeners;
	private _onContextMenu;
	private _toggleFoldingRegionForLine;
	private _readConfiguration;
	private _readConfigurationChange;
	private _needsUpdate;
	private _onTokensChange;
	private _onDidResize;
	private _renderStickyScroll;
	private _updateAndGetMinRebuildFromLine;
	private _updateState;
	private _resetState;
	findScrollWidgetState(): StickyScrollWidgetState;
	dispose(): void;
}
