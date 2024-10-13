import {
	IContextKeyService,
	RawContextKey,
} from "../../../../platform/contextkey/common/contextkey.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { ICodeEditor } from "../../../browser/editorBrowser.js";
import { Range } from "../../../common/core/range.js";
import { IEditorContribution } from "../../../common/editorCommon.js";
import { ILanguageConfigurationService } from "../../../common/languages/languageConfigurationRegistry.js";
import { ILanguageFeaturesService } from "../../../common/services/languageFeatures.js";
import { OvertypingCapturer } from "../../suggest/browser/suggestOvertypingCapturer.js";
import { ISnippetEdit } from "./snippetSession.js";

export interface ISnippetInsertOptions {
	overwriteBefore: number;
	overwriteAfter: number;
	adjustWhitespace: boolean;
	undoStopBefore: boolean;
	undoStopAfter: boolean;
	clipboardText: string | undefined;
	overtypingCapturer: OvertypingCapturer | undefined;
}
export declare class SnippetController2 implements IEditorContribution {
	private readonly _editor;
	private readonly _logService;
	private readonly _languageFeaturesService;
	private readonly _languageConfigurationService;
	static readonly ID = "snippetController2";
	static get(editor: ICodeEditor): SnippetController2 | null;
	static readonly InSnippetMode: RawContextKey<false>;
	static readonly HasNextTabstop: RawContextKey<false>;
	static readonly HasPrevTabstop: RawContextKey<false>;
	private readonly _inSnippet;
	private readonly _hasNextTabstop;
	private readonly _hasPrevTabstop;
	private _session?;
	private readonly _snippetListener;
	private _modelVersionId;
	private _currentChoice?;
	private _choiceCompletions?;
	constructor(
		_editor: ICodeEditor,
		_logService: ILogService,
		_languageFeaturesService: ILanguageFeaturesService,
		contextKeyService: IContextKeyService,
		_languageConfigurationService: ILanguageConfigurationService,
	);
	dispose(): void;
	apply(edits: ISnippetEdit[], opts?: Partial<ISnippetInsertOptions>): void;
	insert(template: string, opts?: Partial<ISnippetInsertOptions>): void;
	private _doInsert;
	private _updateState;
	private _handleChoice;
	finish(): void;
	cancel(resetSelection?: boolean): void;
	prev(): void;
	next(): void;
	isInSnippet(): boolean;
	getSessionEnclosingRange(): Range | undefined;
}
