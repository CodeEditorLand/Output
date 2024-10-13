import type * as vscode from "vscode";

import { VSBuffer } from "../../../base/common/buffer.js";
import { CancellationToken } from "../../../base/common/cancellation.js";
import { URI, UriComponents } from "../../../base/common/uri.js";
import { IURITransformer } from "../../../base/common/uriIpc.js";
import { IPosition } from "../../../editor/common/core/position.js";
import { IRange } from "../../../editor/common/core/range.js";
import { ISelection } from "../../../editor/common/core/selection.js";
import * as languages from "../../../editor/common/languages.js";
import {
	ExtensionIdentifier,
	IExtensionDescription,
} from "../../../platform/extensions/common/extensions.js";
import { ILogService } from "../../../platform/log/common/log.js";
import * as extHostProtocol from "./extHost.protocol.js";
import { IExtHostApiDeprecationService } from "./extHostApiDeprecationService.js";
import { ExtHostCommands } from "./extHostCommands.js";
import { ExtHostDiagnostics } from "./extHostDiagnostics.js";
import { ExtHostDocuments } from "./extHostDocuments.js";
import { IExtHostTelemetry } from "./extHostTelemetry.js";
import { Disposable } from "./extHostTypes.js";

export interface CustomCodeAction extends extHostProtocol.ICodeActionDto {
	_isSynthetic?: boolean;
}
export declare class ExtHostLanguageFeatures
	implements extHostProtocol.ExtHostLanguageFeaturesShape
{
	private readonly _uriTransformer;
	private readonly _documents;
	private readonly _commands;
	private readonly _diagnostics;
	private readonly _logService;
	private readonly _apiDeprecation;
	private readonly _extensionTelemetry;
	private static _handlePool;
	private readonly _proxy;
	private readonly _adapter;
	constructor(
		mainContext: extHostProtocol.IMainContext,
		_uriTransformer: IURITransformer,
		_documents: ExtHostDocuments,
		_commands: ExtHostCommands,
		_diagnostics: ExtHostDiagnostics,
		_logService: ILogService,
		_apiDeprecation: IExtHostApiDeprecationService,
		_extensionTelemetry: IExtHostTelemetry,
	);
	private _transformDocumentSelector;
	private _createDisposable;
	private _nextHandle;
	private _withAdapter;
	private _addNewAdapter;
	private static _extLabel;
	private static _extId;
	registerDocumentSymbolProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.DocumentSymbolProvider,
		metadata?: vscode.DocumentSymbolProviderMetadata,
	): vscode.Disposable;
	$provideDocumentSymbols(
		handle: number,
		resource: UriComponents,
		token: CancellationToken,
	): Promise<languages.DocumentSymbol[] | undefined>;
	registerCodeLensProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.CodeLensProvider,
	): vscode.Disposable;
	$provideCodeLenses(
		handle: number,
		resource: UriComponents,
		token: CancellationToken,
	): Promise<extHostProtocol.ICodeLensListDto | undefined>;
	$resolveCodeLens(
		handle: number,
		symbol: extHostProtocol.ICodeLensDto,
		token: CancellationToken,
	): Promise<extHostProtocol.ICodeLensDto | undefined>;
	$releaseCodeLenses(handle: number, cacheId: number): void;
	registerDefinitionProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.DefinitionProvider,
	): vscode.Disposable;
	$provideDefinition(
		handle: number,
		resource: UriComponents,
		position: IPosition,
		token: CancellationToken,
	): Promise<languages.LocationLink[]>;
	registerDeclarationProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.DeclarationProvider,
	): vscode.Disposable;
	$provideDeclaration(
		handle: number,
		resource: UriComponents,
		position: IPosition,
		token: CancellationToken,
	): Promise<languages.LocationLink[]>;
	registerImplementationProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.ImplementationProvider,
	): vscode.Disposable;
	$provideImplementation(
		handle: number,
		resource: UriComponents,
		position: IPosition,
		token: CancellationToken,
	): Promise<languages.LocationLink[]>;
	registerTypeDefinitionProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.TypeDefinitionProvider,
	): vscode.Disposable;
	$provideTypeDefinition(
		handle: number,
		resource: UriComponents,
		position: IPosition,
		token: CancellationToken,
	): Promise<languages.LocationLink[]>;
	registerHoverProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.HoverProvider,
		extensionId?: ExtensionIdentifier,
	): vscode.Disposable;
	$provideHover(
		handle: number,
		resource: UriComponents,
		position: IPosition,
		context:
			| languages.HoverContext<{
					id: number;
			  }>
			| undefined,
		token: CancellationToken,
	): Promise<extHostProtocol.HoverWithId | undefined>;
	$releaseHover(handle: number, id: number): void;
	registerEvaluatableExpressionProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.EvaluatableExpressionProvider,
		extensionId?: ExtensionIdentifier,
	): vscode.Disposable;
	$provideEvaluatableExpression(
		handle: number,
		resource: UriComponents,
		position: IPosition,
		token: CancellationToken,
	): Promise<languages.EvaluatableExpression | undefined>;
	registerInlineValuesProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.InlineValuesProvider,
		extensionId?: ExtensionIdentifier,
	): vscode.Disposable;
	$provideInlineValues(
		handle: number,
		resource: UriComponents,
		range: IRange,
		context: extHostProtocol.IInlineValueContextDto,
		token: CancellationToken,
	): Promise<languages.InlineValue[] | undefined>;
	registerDocumentHighlightProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.DocumentHighlightProvider,
	): vscode.Disposable;
	registerMultiDocumentHighlightProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.MultiDocumentHighlightProvider,
	): vscode.Disposable;
	$provideDocumentHighlights(
		handle: number,
		resource: UriComponents,
		position: IPosition,
		token: CancellationToken,
	): Promise<languages.DocumentHighlight[] | undefined>;
	$provideMultiDocumentHighlights(
		handle: number,
		resource: UriComponents,
		position: IPosition,
		otherModels: UriComponents[],
		token: CancellationToken,
	): Promise<languages.MultiDocumentHighlight[] | undefined>;
	registerLinkedEditingRangeProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.LinkedEditingRangeProvider,
	): vscode.Disposable;
	$provideLinkedEditingRanges(
		handle: number,
		resource: UriComponents,
		position: IPosition,
		token: CancellationToken,
	): Promise<extHostProtocol.ILinkedEditingRangesDto | undefined>;
	registerReferenceProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.ReferenceProvider,
	): vscode.Disposable;
	$provideReferences(
		handle: number,
		resource: UriComponents,
		position: IPosition,
		context: languages.ReferenceContext,
		token: CancellationToken,
	): Promise<languages.Location[] | undefined>;
	registerCodeActionProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.CodeActionProvider,
		metadata?: vscode.CodeActionProviderMetadata,
	): vscode.Disposable;
	$provideCodeActions(
		handle: number,
		resource: UriComponents,
		rangeOrSelection: IRange | ISelection,
		context: languages.CodeActionContext,
		token: CancellationToken,
	): Promise<extHostProtocol.ICodeActionListDto | undefined>;
	$resolveCodeAction(
		handle: number,
		id: extHostProtocol.ChainedCacheId,
		token: CancellationToken,
	): Promise<{
		edit?: extHostProtocol.IWorkspaceEditDto;
		command?: extHostProtocol.ICommandDto;
	}>;
	$releaseCodeActions(handle: number, cacheId: number): void;
	registerDocumentFormattingEditProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.DocumentFormattingEditProvider,
	): vscode.Disposable;
	$provideDocumentFormattingEdits(
		handle: number,
		resource: UriComponents,
		options: languages.FormattingOptions,
		token: CancellationToken,
	): Promise<languages.TextEdit[] | undefined>;
	registerDocumentRangeFormattingEditProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.DocumentRangeFormattingEditProvider,
	): vscode.Disposable;
	$provideDocumentRangeFormattingEdits(
		handle: number,
		resource: UriComponents,
		range: IRange,
		options: languages.FormattingOptions,
		token: CancellationToken,
	): Promise<languages.TextEdit[] | undefined>;
	$provideDocumentRangesFormattingEdits(
		handle: number,
		resource: UriComponents,
		ranges: IRange[],
		options: languages.FormattingOptions,
		token: CancellationToken,
	): Promise<languages.TextEdit[] | undefined>;
	registerOnTypeFormattingEditProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.OnTypeFormattingEditProvider,
		triggerCharacters: string[],
	): vscode.Disposable;
	$provideOnTypeFormattingEdits(
		handle: number,
		resource: UriComponents,
		position: IPosition,
		ch: string,
		options: languages.FormattingOptions,
		token: CancellationToken,
	): Promise<languages.TextEdit[] | undefined>;
	registerWorkspaceSymbolProvider(
		extension: IExtensionDescription,
		provider: vscode.WorkspaceSymbolProvider,
	): vscode.Disposable;
	$provideWorkspaceSymbols(
		handle: number,
		search: string,
		token: CancellationToken,
	): Promise<extHostProtocol.IWorkspaceSymbolsDto>;
	$resolveWorkspaceSymbol(
		handle: number,
		symbol: extHostProtocol.IWorkspaceSymbolDto,
		token: CancellationToken,
	): Promise<extHostProtocol.IWorkspaceSymbolDto | undefined>;
	$releaseWorkspaceSymbols(handle: number, id: number): void;
	registerRenameProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.RenameProvider,
	): vscode.Disposable;
	$provideRenameEdits(
		handle: number,
		resource: UriComponents,
		position: IPosition,
		newName: string,
		token: CancellationToken,
	): Promise<extHostProtocol.IWorkspaceEditDto | undefined>;
	$resolveRenameLocation(
		handle: number,
		resource: URI,
		position: IPosition,
		token: CancellationToken,
	): Promise<languages.RenameLocation | undefined>;
	registerNewSymbolNamesProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.NewSymbolNamesProvider,
	): vscode.Disposable;
	$supportsAutomaticNewSymbolNamesTriggerKind(
		handle: number,
	): Promise<boolean | undefined>;
	$provideNewSymbolNames(
		handle: number,
		resource: UriComponents,
		range: IRange,
		triggerKind: languages.NewSymbolNameTriggerKind,
		token: CancellationToken,
	): Promise<languages.NewSymbolName[] | undefined>;
	registerDocumentSemanticTokensProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.DocumentSemanticTokensProvider,
		legend: vscode.SemanticTokensLegend,
	): vscode.Disposable;
	$provideDocumentSemanticTokens(
		handle: number,
		resource: UriComponents,
		previousResultId: number,
		token: CancellationToken,
	): Promise<VSBuffer | null>;
	$releaseDocumentSemanticTokens(
		handle: number,
		semanticColoringResultId: number,
	): void;
	registerDocumentRangeSemanticTokensProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.DocumentRangeSemanticTokensProvider,
		legend: vscode.SemanticTokensLegend,
	): vscode.Disposable;
	$provideDocumentRangeSemanticTokens(
		handle: number,
		resource: UriComponents,
		range: IRange,
		token: CancellationToken,
	): Promise<VSBuffer | null>;
	registerCompletionItemProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.CompletionItemProvider,
		triggerCharacters: string[],
	): vscode.Disposable;
	$provideCompletionItems(
		handle: number,
		resource: UriComponents,
		position: IPosition,
		context: languages.CompletionContext,
		token: CancellationToken,
	): Promise<extHostProtocol.ISuggestResultDto | undefined>;
	$resolveCompletionItem(
		handle: number,
		id: extHostProtocol.ChainedCacheId,
		token: CancellationToken,
	): Promise<extHostProtocol.ISuggestDataDto | undefined>;
	$releaseCompletionItems(handle: number, id: number): void;
	registerInlineCompletionsProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.InlineCompletionItemProvider,
		metadata: vscode.InlineCompletionItemProviderMetadata | undefined,
	): vscode.Disposable;
	$provideInlineCompletions(
		handle: number,
		resource: UriComponents,
		position: IPosition,
		context: languages.InlineCompletionContext,
		token: CancellationToken,
	): Promise<extHostProtocol.IdentifiableInlineCompletions | undefined>;
	$provideInlineEditsForRange(
		handle: number,
		resource: UriComponents,
		range: IRange,
		context: languages.InlineCompletionContext,
		token: CancellationToken,
	): Promise<extHostProtocol.IdentifiableInlineCompletions | undefined>;
	$handleInlineCompletionDidShow(
		handle: number,
		pid: number,
		idx: number,
		updatedInsertText: string,
	): void;
	$handleInlineCompletionPartialAccept(
		handle: number,
		pid: number,
		idx: number,
		acceptedCharacters: number,
		info: languages.PartialAcceptInfo,
	): void;
	$freeInlineCompletionsList(handle: number, pid: number): void;
	registerInlineEditProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.InlineEditProvider,
	): vscode.Disposable;
	$provideInlineEdit(
		handle: number,
		resource: UriComponents,
		context: languages.IInlineEditContext,
		token: CancellationToken,
	): Promise<extHostProtocol.IdentifiableInlineEdit | undefined>;
	$freeInlineEdit(handle: number, pid: number): void;
	registerSignatureHelpProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.SignatureHelpProvider,
		metadataOrTriggerChars: string[] | vscode.SignatureHelpProviderMetadata,
	): vscode.Disposable;
	$provideSignatureHelp(
		handle: number,
		resource: UriComponents,
		position: IPosition,
		context: extHostProtocol.ISignatureHelpContextDto,
		token: CancellationToken,
	): Promise<extHostProtocol.ISignatureHelpDto | undefined>;
	$releaseSignatureHelp(handle: number, id: number): void;
	registerInlayHintsProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.InlayHintsProvider,
	): vscode.Disposable;
	$provideInlayHints(
		handle: number,
		resource: UriComponents,
		range: IRange,
		token: CancellationToken,
	): Promise<extHostProtocol.IInlayHintsDto | undefined>;
	$resolveInlayHint(
		handle: number,
		id: extHostProtocol.ChainedCacheId,
		token: CancellationToken,
	): Promise<extHostProtocol.IInlayHintDto | undefined>;
	$releaseInlayHints(handle: number, id: number): void;
	registerDocumentLinkProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.DocumentLinkProvider,
	): vscode.Disposable;
	$provideDocumentLinks(
		handle: number,
		resource: UriComponents,
		token: CancellationToken,
	): Promise<extHostProtocol.ILinksListDto | undefined>;
	$resolveDocumentLink(
		handle: number,
		id: extHostProtocol.ChainedCacheId,
		token: CancellationToken,
	): Promise<extHostProtocol.ILinkDto | undefined>;
	$releaseDocumentLinks(handle: number, id: number): void;
	registerColorProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.DocumentColorProvider,
	): vscode.Disposable;
	$provideDocumentColors(
		handle: number,
		resource: UriComponents,
		token: CancellationToken,
	): Promise<extHostProtocol.IRawColorInfo[]>;
	$provideColorPresentations(
		handle: number,
		resource: UriComponents,
		colorInfo: extHostProtocol.IRawColorInfo,
		token: CancellationToken,
	): Promise<languages.IColorPresentation[] | undefined>;
	registerFoldingRangeProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.FoldingRangeProvider,
	): vscode.Disposable;
	$provideFoldingRanges(
		handle: number,
		resource: UriComponents,
		context: vscode.FoldingContext,
		token: CancellationToken,
	): Promise<languages.FoldingRange[] | undefined>;
	registerSelectionRangeProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.SelectionRangeProvider,
	): vscode.Disposable;
	$provideSelectionRanges(
		handle: number,
		resource: UriComponents,
		positions: IPosition[],
		token: CancellationToken,
	): Promise<languages.SelectionRange[][]>;
	registerCallHierarchyProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.CallHierarchyProvider,
	): vscode.Disposable;
	$prepareCallHierarchy(
		handle: number,
		resource: UriComponents,
		position: IPosition,
		token: CancellationToken,
	): Promise<extHostProtocol.ICallHierarchyItemDto[] | undefined>;
	$provideCallHierarchyIncomingCalls(
		handle: number,
		sessionId: string,
		itemId: string,
		token: CancellationToken,
	): Promise<extHostProtocol.IIncomingCallDto[] | undefined>;
	$provideCallHierarchyOutgoingCalls(
		handle: number,
		sessionId: string,
		itemId: string,
		token: CancellationToken,
	): Promise<extHostProtocol.IOutgoingCallDto[] | undefined>;
	$releaseCallHierarchy(handle: number, sessionId: string): void;
	registerTypeHierarchyProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.TypeHierarchyProvider,
	): vscode.Disposable;
	$prepareTypeHierarchy(
		handle: number,
		resource: UriComponents,
		position: IPosition,
		token: CancellationToken,
	): Promise<extHostProtocol.ITypeHierarchyItemDto[] | undefined>;
	$provideTypeHierarchySupertypes(
		handle: number,
		sessionId: string,
		itemId: string,
		token: CancellationToken,
	): Promise<extHostProtocol.ITypeHierarchyItemDto[] | undefined>;
	$provideTypeHierarchySubtypes(
		handle: number,
		sessionId: string,
		itemId: string,
		token: CancellationToken,
	): Promise<extHostProtocol.ITypeHierarchyItemDto[] | undefined>;
	$releaseTypeHierarchy(handle: number, sessionId: string): void;
	registerDocumentOnDropEditProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.DocumentDropEditProvider,
		metadata?: vscode.DocumentDropEditProviderMetadata,
	): Disposable;
	$provideDocumentOnDropEdits(
		handle: number,
		requestId: number,
		resource: UriComponents,
		position: IPosition,
		dataTransferDto: extHostProtocol.DataTransferDTO,
		token: CancellationToken,
	): Promise<extHostProtocol.IDocumentDropEditDto[] | undefined>;
	$resolveDropEdit(
		handle: number,
		id: extHostProtocol.ChainedCacheId,
		token: CancellationToken,
	): Promise<{
		additionalEdit?: extHostProtocol.IWorkspaceEditDto;
	}>;
	$releaseDocumentOnDropEdits(handle: number, cacheId: number): void;
	registerMappedEditsProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.MappedEditsProvider,
	): vscode.Disposable;
	$provideMappedEdits(
		handle: number,
		document: UriComponents,
		codeBlocks: string[],
		context: extHostProtocol.IMappedEditsContextDto,
		token: CancellationToken,
	): Promise<extHostProtocol.IWorkspaceEditDto | null>;
	registerDocumentPasteEditProvider(
		extension: IExtensionDescription,
		selector: vscode.DocumentSelector,
		provider: vscode.DocumentPasteEditProvider,
		metadata: vscode.DocumentPasteProviderMetadata,
	): vscode.Disposable;
	$prepareDocumentPaste(
		handle: number,
		resource: UriComponents,
		ranges: IRange[],
		dataTransfer: extHostProtocol.DataTransferDTO,
		token: CancellationToken,
	): Promise<extHostProtocol.DataTransferDTO | undefined>;
	$providePasteEdits(
		handle: number,
		requestId: number,
		resource: UriComponents,
		ranges: IRange[],
		dataTransferDto: extHostProtocol.DataTransferDTO,
		context: extHostProtocol.IDocumentPasteContextDto,
		token: CancellationToken,
	): Promise<extHostProtocol.IPasteEditDto[] | undefined>;
	$resolvePasteEdit(
		handle: number,
		id: extHostProtocol.ChainedCacheId,
		token: CancellationToken,
	): Promise<{
		additionalEdit?: extHostProtocol.IWorkspaceEditDto;
	}>;
	$releasePasteEdits(handle: number, cacheId: number): void;
	private static _serializeRegExp;
	private static _serializeIndentationRule;
	private static _serializeOnEnterRule;
	private static _serializeOnEnterRules;
	private static _serializeAutoClosingPair;
	private static _serializeAutoClosingPairs;
	setLanguageConfiguration(
		extension: IExtensionDescription,
		languageId: string,
		configuration: vscode.LanguageConfiguration,
	): vscode.Disposable;
	$setWordDefinitions(
		wordDefinitions: extHostProtocol.ILanguageWordDefinitionDto[],
	): void;
}
