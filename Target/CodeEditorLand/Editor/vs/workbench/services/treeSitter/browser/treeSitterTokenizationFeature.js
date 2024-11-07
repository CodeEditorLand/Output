var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
import { Emitter, Event } from "../../../../base/common/event.js";
import { Disposable, DisposableMap, DisposableStore, IDisposable } from "../../../../base/common/lifecycle.js";
import { AppResourcePath, FileAccess } from "../../../../base/common/network.js";
import { ILanguageIdCodec, ITreeSitterTokenizationSupport, LazyTokenizationSupport, TreeSitterTokenizationRegistry } from "../../../../editor/common/languages.js";
import { ITextModel } from "../../../../editor/common/model.js";
import { EDITOR_EXPERIMENTAL_PREFER_TREESITTER, ITreeSitterParserService, ITreeSitterParseResult } from "../../../../editor/common/services/treeSitterParserService.js";
import { IModelTokensChangedEvent } from "../../../../editor/common/textModelEvents.js";
import { ColumnRange } from "../../../../editor/contrib/inlineCompletions/browser/utils.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { InstantiationType, registerSingleton } from "../../../../platform/instantiation/common/extensions.js";
import { createDecorator, IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { ColorThemeData, findMetadata } from "../../themes/common/colorThemeData.js";
import { ILanguageService } from "../../../../editor/common/languages/language.js";
const ALLOWED_SUPPORT = ["typescript"];
const ITreeSitterTokenizationFeature = createDecorator("treeSitterTokenizationFeature");
let TreeSitterTokenizationFeature = class extends Disposable {
  constructor(_languageService, _configurationService, _instantiationService, _fileService) {
    super();
    this._languageService = _languageService;
    this._configurationService = _configurationService;
    this._instantiationService = _instantiationService;
    this._fileService = _fileService;
    this._handleGrammarsExtPoint();
    this._register(this._configurationService.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(EDITOR_EXPERIMENTAL_PREFER_TREESITTER)) {
        this._handleGrammarsExtPoint();
      }
    }));
  }
  static {
    __name(this, "TreeSitterTokenizationFeature");
  }
  _serviceBrand;
  _tokenizersRegistrations = new DisposableMap();
  _getSetting() {
    return this._configurationService.getValue(EDITOR_EXPERIMENTAL_PREFER_TREESITTER) || [];
  }
  _handleGrammarsExtPoint() {
    const setting = this._getSetting();
    for (const languageId of setting) {
      if (ALLOWED_SUPPORT.includes(languageId) && !this._tokenizersRegistrations.has(languageId)) {
        const lazyTokenizationSupport = new LazyTokenizationSupport(() => this._createTokenizationSupport(languageId));
        const disposableStore = new DisposableStore();
        disposableStore.add(lazyTokenizationSupport);
        disposableStore.add(TreeSitterTokenizationRegistry.registerFactory(languageId, lazyTokenizationSupport));
        this._tokenizersRegistrations.set(languageId, disposableStore);
        TreeSitterTokenizationRegistry.getOrCreate(languageId);
      }
    }
    const languagesToUnregister = [...this._tokenizersRegistrations.keys()].filter((languageId) => !setting.includes(languageId));
    for (const languageId of languagesToUnregister) {
      this._tokenizersRegistrations.deleteAndDispose(languageId);
    }
  }
  async _fetchQueries(newLanguage) {
    const languageLocation = `vs/editor/common/languages/highlights/${newLanguage}.scm`;
    const query = await this._fileService.readFile(FileAccess.asFileUri(languageLocation));
    return query.value.toString();
  }
  async _createTokenizationSupport(languageId) {
    const queries = await this._fetchQueries(languageId);
    return this._instantiationService.createInstance(TreeSitterTokenizationSupport, queries, languageId, this._languageService.languageIdCodec);
  }
};
TreeSitterTokenizationFeature = __decorateClass([
  __decorateParam(0, ILanguageService),
  __decorateParam(1, IConfigurationService),
  __decorateParam(2, IInstantiationService),
  __decorateParam(3, IFileService)
], TreeSitterTokenizationFeature);
let TreeSitterTokenizationSupport = class extends Disposable {
  constructor(_queries, _languageId, _languageIdCodec, _treeSitterService, _themeService) {
    super();
    this._queries = _queries;
    this._languageId = _languageId;
    this._languageIdCodec = _languageIdCodec;
    this._treeSitterService = _treeSitterService;
    this._themeService = _themeService;
    this._register(Event.runAndSubscribe(this._themeService.onDidColorThemeChange, () => this.reset()));
    this._register(this._treeSitterService.onDidUpdateTree((e) => {
      const maxLine = e.textModel.getLineCount();
      this._onDidChangeTokens.fire({
        textModel: e.textModel,
        changes: {
          semanticTokensApplied: false,
          ranges: e.ranges.map((range) => ({ fromLineNumber: range.startLineNumber, toLineNumber: range.endLineNumber < maxLine ? range.endLineNumber : maxLine }))
        }
      });
    }));
  }
  static {
    __name(this, "TreeSitterTokenizationSupport");
  }
  _query;
  _onDidChangeTokens = new Emitter();
  onDidChangeTokens = this._onDidChangeTokens.event;
  _colorThemeData;
  _languageAddedListener;
  _getTree(textModel) {
    return this._treeSitterService.getParseResult(textModel);
  }
  _ensureQuery() {
    if (!this._query) {
      const language = this._treeSitterService.getOrInitLanguage(this._languageId);
      if (!language) {
        if (!this._languageAddedListener) {
          this._languageAddedListener = this._register(Event.onceIf(this._treeSitterService.onDidAddLanguage, (e) => e.id === this._languageId)((e) => {
            this._query = e.language.query(this._queries);
          }));
        }
        return;
      }
      this._query = language.query(this._queries);
    }
    return this._query;
  }
  reset() {
    this._colorThemeData = this._themeService.getColorTheme();
  }
  captureAtPosition(lineNumber, column, textModel) {
    const tree = this._getTree(textModel);
    const captures = this._captureAtRange(lineNumber, new ColumnRange(column, column), tree?.tree);
    return captures;
  }
  captureAtPositionTree(lineNumber, column, tree) {
    const captures = this._captureAtRange(lineNumber, new ColumnRange(column, column), tree);
    return captures;
  }
  _captureAtRange(lineNumber, columnRange, tree) {
    const query = this._ensureQuery();
    if (!tree || !query) {
      return [];
    }
    return query.captures(tree.rootNode, { startPosition: { row: lineNumber - 1, column: columnRange.startColumn - 1 }, endPosition: { row: lineNumber - 1, column: columnRange.endColumnExclusive } });
  }
  /**
   * Gets the tokens for a given line.
   * Each token takes 2 elements in the array. The first element is the offset of the end of the token *in the line, not in the document*, and the second element is the metadata.
   *
   * @param lineNumber
   * @returns
   */
  tokenizeEncoded(lineNumber, textModel) {
    const lineLength = textModel.getLineMaxColumn(lineNumber);
    const tree = this._getTree(textModel);
    const captures = this._captureAtRange(lineNumber, new ColumnRange(1, lineLength), tree?.tree);
    if (captures.length === 0) {
      return void 0;
    }
    const endOffsetsAndScopes = Array(captures.length);
    endOffsetsAndScopes.fill({ endOffset: 0, scopes: [] });
    let tokenIndex = 0;
    const lineStartOffset = textModel.getOffsetAt({ lineNumber, column: 1 });
    const increaseSizeOfTokensByOneToken = /* @__PURE__ */ __name(() => {
      endOffsetsAndScopes.push({ endOffset: 0, scopes: [] });
    }, "increaseSizeOfTokensByOneToken");
    const encodedLanguageId = this._languageIdCodec.encodeLanguageId(this._languageId);
    for (let captureIndex = 0; captureIndex < captures.length; captureIndex++) {
      const capture = captures[captureIndex];
      const tokenEndIndex = capture.node.endIndex < lineStartOffset + lineLength ? capture.node.endIndex : lineStartOffset + lineLength;
      const tokenStartIndex = capture.node.startIndex < lineStartOffset ? lineStartOffset : capture.node.startIndex;
      const lineRelativeOffset = tokenEndIndex - lineStartOffset;
      let previousTokenEnd;
      const currentTokenLength = tokenEndIndex - tokenStartIndex;
      if (captureIndex > 0) {
        previousTokenEnd = endOffsetsAndScopes[tokenIndex - 1].endOffset;
      } else {
        previousTokenEnd = tokenStartIndex - lineStartOffset - 1;
      }
      const intermediateTokenOffset = lineRelativeOffset - currentTokenLength;
      if (previousTokenEnd >= 0 && previousTokenEnd < intermediateTokenOffset) {
        endOffsetsAndScopes[tokenIndex] = { endOffset: intermediateTokenOffset, scopes: [] };
        tokenIndex++;
        increaseSizeOfTokensByOneToken();
      }
      const addCurrentTokenToArray = /* @__PURE__ */ __name(() => {
        endOffsetsAndScopes[tokenIndex] = { endOffset: lineRelativeOffset, scopes: [capture.name] };
        tokenIndex++;
      }, "addCurrentTokenToArray");
      if (previousTokenEnd >= lineRelativeOffset) {
        const previousTokenStartOffset = tokenIndex >= 2 ? endOffsetsAndScopes[tokenIndex - 2].endOffset : 0;
        const originalPreviousTokenEndOffset = endOffsetsAndScopes[tokenIndex - 1].endOffset;
        if (previousTokenStartOffset + currentTokenLength === originalPreviousTokenEndOffset) {
          endOffsetsAndScopes[tokenIndex - 1].scopes[endOffsetsAndScopes[tokenIndex - 1].scopes.length - 1] = capture.name;
        } else {
          endOffsetsAndScopes[tokenIndex - 1].endOffset = intermediateTokenOffset;
          addCurrentTokenToArray();
          increaseSizeOfTokensByOneToken();
          endOffsetsAndScopes[tokenIndex].endOffset = originalPreviousTokenEndOffset;
          endOffsetsAndScopes[tokenIndex].scopes = endOffsetsAndScopes[tokenIndex - 2].scopes;
          tokenIndex++;
        }
      } else {
        addCurrentTokenToArray();
      }
    }
    if (captures[captures.length - 1].node.endPosition.column + 1 < lineLength) {
      increaseSizeOfTokensByOneToken();
      endOffsetsAndScopes[tokenIndex].endOffset = lineLength - 1;
      tokenIndex++;
    }
    const tokens = new Uint32Array(tokenIndex * 2);
    for (let i = 0; i < tokenIndex; i++) {
      const token = endOffsetsAndScopes[i];
      if (token.endOffset === 0 && token.scopes.length === 0) {
        break;
      }
      tokens[i * 2] = token.endOffset;
      tokens[i * 2 + 1] = findMetadata(this._colorThemeData, token.scopes, encodedLanguageId);
    }
    return tokens;
  }
  dispose() {
    super.dispose();
    this._query?.delete();
    this._query = void 0;
  }
};
TreeSitterTokenizationSupport = __decorateClass([
  __decorateParam(3, ITreeSitterParserService),
  __decorateParam(4, IThemeService)
], TreeSitterTokenizationSupport);
registerSingleton(ITreeSitterTokenizationFeature, TreeSitterTokenizationFeature, InstantiationType.Eager);
export {
  ITreeSitterTokenizationFeature
};
//# sourceMappingURL=treeSitterTokenizationFeature.js.map
