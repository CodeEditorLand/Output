import { createDecorator } from "../../../platform/instantiation/common/instantiation.js";
import {
  LanguageFeatureRegistry,
  NotebookInfoResolver
} from "../languageFeatureRegistry.js";
import {
  CodeActionProvider,
  CodeLensProvider,
  CompletionItemProvider,
  DeclarationProvider,
  DefinitionProvider,
  DocumentColorProvider,
  DocumentDropEditProvider,
  DocumentFormattingEditProvider,
  DocumentHighlightProvider,
  DocumentPasteEditProvider,
  DocumentRangeFormattingEditProvider,
  DocumentRangeSemanticTokensProvider,
  DocumentSemanticTokensProvider,
  DocumentSymbolProvider,
  EvaluatableExpressionProvider,
  FoldingRangeProvider,
  HoverProvider,
  ImplementationProvider,
  InlayHintsProvider,
  InlineCompletionsProvider,
  InlineEditProvider,
  InlineValuesProvider,
  LinkedEditingRangeProvider,
  LinkProvider,
  MultiDocumentHighlightProvider,
  NewSymbolNamesProvider,
  OnTypeFormattingEditProvider,
  ReferenceProvider,
  RenameProvider,
  SelectionRangeProvider,
  SignatureHelpProvider,
  TypeDefinitionProvider
} from "../languages.js";
const ILanguageFeaturesService = createDecorator("ILanguageFeaturesService");
export {
  ILanguageFeaturesService
};
//# sourceMappingURL=languageFeatures.js.map
