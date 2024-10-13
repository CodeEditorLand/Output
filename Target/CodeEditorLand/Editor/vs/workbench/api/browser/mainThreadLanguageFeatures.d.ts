import { VSBuffer } from "../../../base/common/buffer.js";
import { CancellationToken } from "../../../base/common/cancellation.js";
import { Event } from "../../../base/common/event.js";
import { Disposable } from "../../../base/common/lifecycle.js";
import { Range as EditorRange } from "../../../editor/common/core/range.js";
import * as languages from "../../../editor/common/languages.js";
import { ILanguageService } from "../../../editor/common/languages/language.js";
import { ILanguageConfigurationService } from "../../../editor/common/languages/languageConfigurationRegistry.js";
import { ITextModel } from "../../../editor/common/model.js";
import { ILanguageFeaturesService } from "../../../editor/common/services/languageFeatures.js";
import { ExtensionIdentifier } from "../../../platform/extensions/common/extensions.js";
import { IUriIdentityService } from "../../../platform/uriIdentity/common/uriIdentity.js";
import { IExtHostContext } from "../../services/extensions/common/extHostCustomers.js";
import {
	ExtHostLanguageFeaturesShape,
	ICodeActionProviderMetadataDto,
	IDocumentDropEditProviderMetadata,
	IDocumentFilterDto,
	ILanguageConfigurationDto,
	IPasteEditProviderMetadataDto,
	ISignatureHelpProviderMetadataDto,
	MainThreadLanguageFeaturesShape,
} from "../common/extHost.protocol.js";

export declare class MainThreadLanguageFeatures
	extends Disposable
	implements MainThreadLanguageFeaturesShape
{
	private readonly _languageService;
	private readonly _languageConfigurationService;
	private readonly _languageFeaturesService;
	private readonly _uriIdentService;
	private readonly _proxy;
	private readonly _registrations;
	constructor(
		extHostContext: IExtHostContext,
		_languageService: ILanguageService,
		_languageConfigurationService: ILanguageConfigurationService,
		_languageFeaturesService: ILanguageFeaturesService,
		_uriIdentService: IUriIdentityService,
	);
	$unregister(handle: number): void;
	private static _reviveLocationDto;
	private static _reviveLocationLinkDto;
	private static _reviveWorkspaceSymbolDto;
	private static _reviveCodeActionDto;
	private static _reviveLinkDTO;
	private static _reviveCallHierarchyItemDto;
	private static _reviveTypeHierarchyItemDto;
	$registerDocumentSymbolProvider(
		handle: number,
		selector: IDocumentFilterDto[],
		displayName: string,
	): void;
	$registerCodeLensSupport(
		handle: number,
		selector: IDocumentFilterDto[],
		eventHandle: number | undefined,
	): void;
	$emitCodeLensEvent(eventHandle: number, event?: any): void;
	$registerDefinitionSupport(
		handle: number,
		selector: IDocumentFilterDto[],
	): void;
	$registerDeclarationSupport(
		handle: number,
		selector: IDocumentFilterDto[],
	): void;
	$registerImplementationSupport(
		handle: number,
		selector: IDocumentFilterDto[],
	): void;
	$registerTypeDefinitionSupport(
		handle: number,
		selector: IDocumentFilterDto[],
	): void;
	$registerHoverProvider(
		handle: number,
		selector: IDocumentFilterDto[],
	): void;
	$registerEvaluatableExpressionProvider(
		handle: number,
		selector: IDocumentFilterDto[],
	): void;
	$registerInlineValuesProvider(
		handle: number,
		selector: IDocumentFilterDto[],
		eventHandle: number | undefined,
	): void;
	$emitInlineValuesEvent(eventHandle: number, event?: any): void;
	$registerDocumentHighlightProvider(
		handle: number,
		selector: IDocumentFilterDto[],
	): void;
	$registerMultiDocumentHighlightProvider(
		handle: number,
		selector: IDocumentFilterDto[],
	): void;
	$registerLinkedEditingRangeProvider(
		handle: number,
		selector: IDocumentFilterDto[],
	): void;
	$registerReferenceSupport(
		handle: number,
		selector: IDocumentFilterDto[],
	): void;
	$registerCodeActionSupport(
		handle: number,
		selector: IDocumentFilterDto[],
		metadata: ICodeActionProviderMetadataDto,
		displayName: string,
		extensionId: string,
		supportsResolve: boolean,
	): void;
	private readonly _pasteEditProviders;
	$registerPasteEditProvider(
		handle: number,
		selector: IDocumentFilterDto[],
		metadata: IPasteEditProviderMetadataDto,
	): void;
	$resolvePasteFileData(
		handle: number,
		requestId: number,
		dataId: string,
	): Promise<VSBuffer>;
	$registerDocumentFormattingSupport(
		handle: number,
		selector: IDocumentFilterDto[],
		extensionId: ExtensionIdentifier,
		displayName: string,
	): void;
	$registerRangeFormattingSupport(
		handle: number,
		selector: IDocumentFilterDto[],
		extensionId: ExtensionIdentifier,
		displayName: string,
		supportsRanges: boolean,
	): void;
	$registerOnTypeFormattingSupport(
		handle: number,
		selector: IDocumentFilterDto[],
		autoFormatTriggerCharacters: string[],
		extensionId: ExtensionIdentifier,
	): void;
	$registerNavigateTypeSupport(
		handle: number,
		supportsResolve: boolean,
	): void;
	$registerRenameSupport(
		handle: number,
		selector: IDocumentFilterDto[],
		supportResolveLocation: boolean,
	): void;
	$registerNewSymbolNamesProvider(
		handle: number,
		selector: IDocumentFilterDto[],
	): void;
	$registerDocumentSemanticTokensProvider(
		handle: number,
		selector: IDocumentFilterDto[],
		legend: languages.SemanticTokensLegend,
		eventHandle: number | undefined,
	): void;
	$emitDocumentSemanticTokensEvent(eventHandle: number): void;
	$registerDocumentRangeSemanticTokensProvider(
		handle: number,
		selector: IDocumentFilterDto[],
		legend: languages.SemanticTokensLegend,
	): void;
	private static _inflateSuggestDto;
	$registerCompletionsProvider(
		handle: number,
		selector: IDocumentFilterDto[],
		triggerCharacters: string[],
		supportsResolveDetails: boolean,
		extensionId: ExtensionIdentifier,
	): void;
	$registerInlineCompletionsSupport(
		handle: number,
		selector: IDocumentFilterDto[],
		supportsHandleEvents: boolean,
		extensionId: string,
		yieldsToExtensionIds: string[],
	): void;
	$registerInlineEditProvider(
		handle: number,
		selector: IDocumentFilterDto[],
		extensionId: ExtensionIdentifier,
	): void;
	$registerSignatureHelpProvider(
		handle: number,
		selector: IDocumentFilterDto[],
		metadata: ISignatureHelpProviderMetadataDto,
	): void;
	$registerInlayHintsProvider(
		handle: number,
		selector: IDocumentFilterDto[],
		supportsResolve: boolean,
		eventHandle: number | undefined,
		displayName: string | undefined,
	): void;
	$emitInlayHintsEvent(eventHandle: number): void;
	$registerDocumentLinkProvider(
		handle: number,
		selector: IDocumentFilterDto[],
		supportsResolve: boolean,
	): void;
	$registerDocumentColorProvider(
		handle: number,
		selector: IDocumentFilterDto[],
	): void;
	$registerFoldingRangeProvider(
		handle: number,
		selector: IDocumentFilterDto[],
		extensionId: ExtensionIdentifier,
		eventHandle: number | undefined,
	): void;
	$emitFoldingRangeEvent(eventHandle: number, event?: any): void;
	$registerSelectionRangeProvider(
		handle: number,
		selector: IDocumentFilterDto[],
	): void;
	$registerCallHierarchyProvider(
		handle: number,
		selector: IDocumentFilterDto[],
	): void;
	private static _reviveRegExp;
	private static _reviveIndentationRule;
	private static _reviveOnEnterRule;
	private static _reviveOnEnterRules;
	$setLanguageConfiguration(
		handle: number,
		languageId: string,
		_configuration: ILanguageConfigurationDto,
	): void;
	$registerTypeHierarchyProvider(
		handle: number,
		selector: IDocumentFilterDto[],
	): void;
	private readonly _documentOnDropEditProviders;
	$registerDocumentOnDropEditProvider(
		handle: number,
		selector: IDocumentFilterDto[],
		metadata: IDocumentDropEditProviderMetadata,
	): void;
	$resolveDocumentOnDropFileData(
		handle: number,
		requestId: number,
		dataId: string,
	): Promise<VSBuffer>;
	$registerMappedEditsProvider(
		handle: number,
		selector: IDocumentFilterDto[],
		displayName: string,
	): void;
}
export declare class MainThreadDocumentSemanticTokensProvider
	implements languages.DocumentSemanticTokensProvider
{
	private readonly _proxy;
	private readonly _handle;
	private readonly _legend;
	readonly onDidChange: Event<void> | undefined;
	constructor(
		_proxy: ExtHostLanguageFeaturesShape,
		_handle: number,
		_legend: languages.SemanticTokensLegend,
		onDidChange: Event<void> | undefined,
	);
	releaseDocumentSemanticTokens(resultId: string | undefined): void;
	getLegend(): languages.SemanticTokensLegend;
	provideDocumentSemanticTokens(
		model: ITextModel,
		lastResultId: string | null,
		token: CancellationToken,
	): Promise<languages.SemanticTokens | languages.SemanticTokensEdits | null>;
}
export declare class MainThreadDocumentRangeSemanticTokensProvider
	implements languages.DocumentRangeSemanticTokensProvider
{
	private readonly _proxy;
	private readonly _handle;
	private readonly _legend;
	constructor(
		_proxy: ExtHostLanguageFeaturesShape,
		_handle: number,
		_legend: languages.SemanticTokensLegend,
	);
	getLegend(): languages.SemanticTokensLegend;
	provideDocumentRangeSemanticTokens(
		model: ITextModel,
		range: EditorRange,
		token: CancellationToken,
	): Promise<languages.SemanticTokens | null>;
}
export declare class MainThreadMappedEditsProvider
	implements languages.MappedEditsProvider
{
	readonly displayName: string;
	private readonly _handle;
	private readonly _proxy;
	private readonly _uriService;
	constructor(
		displayName: string,
		_handle: number,
		_proxy: ExtHostLanguageFeaturesShape,
		_uriService: IUriIdentityService,
	);
	provideMappedEdits(
		document: ITextModel,
		codeBlocks: string[],
		context: languages.MappedEditsContext,
		token: CancellationToken,
	): Promise<languages.WorkspaceEdit | null>;
}
