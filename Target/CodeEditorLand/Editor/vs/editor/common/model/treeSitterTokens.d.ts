import { StandardTokenType } from "../encodedTokenAttributes.js";
import { ILanguageIdCodec } from "../languages.js";
import { ITreeSitterParserService } from "../services/treeSitterParserService.js";
import { IModelContentChangedEvent } from "../textModelEvents.js";
import {
	ITokenizeLineWithEditResult,
	LineEditWithAdditionalLines,
} from "../tokenizationTextModelPart.js";
import { LineTokens } from "../tokens/lineTokens.js";
import { TextModel } from "./textModel.js";
import { AbstractTokens } from "./tokens.js";

export declare class TreeSitterTokens extends AbstractTokens {
	private readonly _treeSitterService;
	private _tokenizationSupport;
	private _lastLanguageId;
	private readonly _tokensChangedListener;
	constructor(
		_treeSitterService: ITreeSitterParserService,
		languageIdCodec: ILanguageIdCodec,
		textModel: TextModel,
		languageId: () => string,
	);
	private _initialize;
	getLineTokens(lineNumber: number): LineTokens;
	resetTokenization(fireTokenChangeEvent?: boolean): void;
	handleDidChangeAttached(): void;
	handleDidChangeContent(e: IModelContentChangedEvent): void;
	forceTokenization(lineNumber: number): void;
	hasAccurateTokensForLine(lineNumber: number): boolean;
	isCheapToTokenize(lineNumber: number): boolean;
	getTokenTypeIfInsertingCharacter(
		lineNumber: number,
		column: number,
		character: string,
	): StandardTokenType;
	tokenizeLineWithEdit(
		lineNumber: number,
		edit: LineEditWithAdditionalLines,
	): ITokenizeLineWithEditResult;
	get hasTokens(): boolean;
}
