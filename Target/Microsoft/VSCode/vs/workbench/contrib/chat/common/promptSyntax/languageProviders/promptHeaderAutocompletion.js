var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
import { Disposable } from "../../../../../../base/common/lifecycle.js";
import { Position } from "../../../../../../editor/common/core/position.js";
import { Range } from "../../../../../../editor/common/core/range.js";
import { ILanguageFeaturesService } from "../../../../../../editor/common/services/languageFeatures.js";
import { ILanguageModelChatMetadata, ILanguageModelsService } from "../../languageModels.js";
import { ILanguageModelToolsService } from "../../languageModelToolsService.js";
import { ModeHeader } from "../parsers/promptHeader/modeHeader.js";
import { PromptHeader } from "../parsers/promptHeader/promptHeader.js";
import { ALL_PROMPTS_LANGUAGE_SELECTOR, getPromptsTypeForLanguageId, PromptsType } from "../promptTypes.js";
import { IPromptsService } from "../service/promptsService.js";
let PromptHeaderAutocompletion = class PromptHeaderAutocompletion2 extends Disposable {
  static {
    __name(this, "PromptHeaderAutocompletion");
  }
  constructor(promptsService, languageService, languageModelsService, languageModelToolsService) {
    super();
    this.promptsService = promptsService;
    this.languageService = languageService;
    this.languageModelsService = languageModelsService;
    this.languageModelToolsService = languageModelToolsService;
    this._debugDisplayName = "PromptHeaderAutocompletion";
    this.triggerCharacters = [":"];
    this._register(this.languageService.completionProvider.register(ALL_PROMPTS_LANGUAGE_SELECTOR, this));
  }
  /**
   * The main function of this provider that calculates
   * completion items based on the provided arguments.
   */
  async provideCompletionItems(model, position, context, token) {
    const promptType = getPromptsTypeForLanguageId(model.getLanguageId());
    if (!promptType) {
      return void 0;
    }
    const parser = this.promptsService.getSyntaxParserFor(model);
    await parser.start(token).settled();
    if (token.isCancellationRequested) {
      return void 0;
    }
    const header = parser.header;
    if (!header) {
      return void 0;
    }
    await header.settled;
    const fullHeaderRange = parser.header.range;
    const headerRange = new Range(fullHeaderRange.startLineNumber + 1, 0, fullHeaderRange.endLineNumber - 1, model.getLineMaxColumn(fullHeaderRange.endLineNumber - 1));
    if (!headerRange.containsPosition(position)) {
      return void 0;
    }
    const lineText = model.getLineContent(position.lineNumber);
    const colonIndex = lineText.indexOf(":");
    const colonPosition = colonIndex !== -1 ? new Position(position.lineNumber, colonIndex + 1) : void 0;
    if (!colonPosition || position.isBeforeOrEqual(colonPosition)) {
      return this.providePropertyCompletions(model, position, headerRange, colonPosition, promptType);
    } else if (colonPosition && colonPosition.isBefore(position)) {
      return this.provideValueCompletions(model, position, header, colonPosition, promptType);
    }
    return void 0;
  }
  async providePropertyCompletions(model, position, headerRange, colonPosition, promptType) {
    const suggestions = [];
    const supportedProperties = this.getSupportedProperties(promptType);
    this.removeUsedProperties(supportedProperties, model, headerRange, position);
    const getInsertText = /* @__PURE__ */ __name((property) => {
      if (colonPosition) {
        return property;
      }
      const valueSuggestions = this.getValueSuggestions(promptType, property);
      if (valueSuggestions.length > 0) {
        return `${property}: \${0:${valueSuggestions[0]}}`;
      } else {
        return `${property}: $0`;
      }
    }, "getInsertText");
    for (const property of supportedProperties) {
      const item = {
        label: property,
        kind: 9,
        insertText: getInsertText(property),
        insertTextRules: 4,
        range: new Range(position.lineNumber, 1, position.lineNumber, !colonPosition ? model.getLineMaxColumn(position.lineNumber) : colonPosition.column)
      };
      suggestions.push(item);
    }
    return { suggestions };
  }
  async provideValueCompletions(model, position, header, colonPosition, promptType) {
    const suggestions = [];
    const lineContent = model.getLineContent(position.lineNumber);
    const property = lineContent.substring(0, colonPosition.column - 1).trim();
    if (!this.getSupportedProperties(promptType).has(property)) {
      return void 0;
    }
    if (header instanceof PromptHeader || header instanceof ModeHeader) {
      const tools = header.metadataUtility.tools;
      if (tools) {
        const result = this.provideToolCompletions(model, position, tools);
        if (result) {
          return result;
        }
      }
    }
    const bracketIndex = lineContent.indexOf("[");
    if (bracketIndex !== -1 && bracketIndex <= position.column - 1) {
      return void 0;
    }
    const whilespaceAfterColon = lineContent.substring(colonPosition.column).match(/^\s*/)?.[0].length ?? 0;
    const values = this.getValueSuggestions(promptType, property);
    for (const value of values) {
      const item = {
        label: value,
        kind: 13,
        insertText: value,
        range: new Range(position.lineNumber, colonPosition.column + whilespaceAfterColon + 1, position.lineNumber, model.getLineMaxColumn(position.lineNumber))
      };
      suggestions.push(item);
    }
    return { suggestions };
  }
  getSupportedProperties(promptType) {
    switch (promptType) {
      case PromptsType.instructions:
        return /* @__PURE__ */ new Set(["applyTo", "description"]);
      case PromptsType.prompt:
        return /* @__PURE__ */ new Set(["mode", "tools", "description", "model"]);
      default:
        return /* @__PURE__ */ new Set(["tools", "description", "model"]);
    }
  }
  removeUsedProperties(properties, model, headerRange, position) {
    for (let i = headerRange.startLineNumber; i <= headerRange.endLineNumber; i++) {
      if (i !== position.lineNumber) {
        const lineText = model.getLineContent(i);
        const colonIndex = lineText.indexOf(":");
        if (colonIndex !== -1) {
          const property = lineText.substring(0, colonIndex).trim();
          properties.delete(property);
        }
      }
    }
  }
  getValueSuggestions(promptType, property) {
    if (promptType === PromptsType.instructions && property === "applyTo") {
      return ["**", "**/*.ts, **/*.js", "**/*.php", "**/*.py"];
    }
    if (promptType === PromptsType.prompt && property === "mode") {
      return ["agent", "edit", "ask"];
    }
    if (property === "tools" && (promptType === PromptsType.prompt || promptType === PromptsType.mode)) {
      return ["[]", `['codebase', 'editFiles', 'fetch']`];
    }
    if (property === "model" && (promptType === PromptsType.prompt || promptType === PromptsType.mode)) {
      return this.getModelNames(promptType === PromptsType.mode);
    }
    return [];
  }
  getModelNames(agentModeOnly) {
    const result = [];
    for (const model of this.languageModelsService.getLanguageModelIds()) {
      const metadata = this.languageModelsService.lookupLanguageModel(model);
      if (metadata && metadata.isUserSelectable !== false) {
        if (!agentModeOnly || ILanguageModelChatMetadata.suitableForAgentMode(metadata)) {
          result.push(metadata.name);
        }
      }
    }
    return result;
  }
  provideToolCompletions(model, position, node) {
    const tools = node.value;
    if (!tools || !node.range.containsPosition(position)) {
      return void 0;
    }
    const getSuggestions = /* @__PURE__ */ __name((toolRange) => {
      const suggestions = [];
      const addSuggestion = /* @__PURE__ */ __name((toolName, toolRange2) => {
        let insertText;
        if (!toolRange2.isEmpty()) {
          const firstChar = model.getValueInRange(toolRange2).charCodeAt(0);
          insertText = firstChar === 39 ? `'${toolName}'` : firstChar === 34 ? `"${toolName}"` : toolName;
        } else {
          insertText = `'${toolName}'`;
        }
        suggestions.push({
          label: toolName,
          kind: 13,
          filterText: insertText,
          insertText,
          range: toolRange2
        });
      }, "addSuggestion");
      for (const tool of this.languageModelToolsService.getTools()) {
        if (tool.canBeReferencedInPrompt) {
          addSuggestion(tool.toolReferenceName ?? tool.displayName, toolRange);
        }
      }
      for (const toolSet of this.languageModelToolsService.toolSets.get()) {
        addSuggestion(toolSet.referenceName, toolRange);
      }
      return { suggestions };
    }, "getSuggestions");
    for (const tool of tools) {
      const toolRange = node.getToolRange(tool);
      if (toolRange?.containsPosition(position)) {
        return getSuggestions(toolRange);
      }
    }
    const prefix = model.getValueInRange(new Range(position.lineNumber, 1, position.lineNumber, position.column));
    if (prefix.match(/[,[]\s*$/)) {
      return getSuggestions(new Range(position.lineNumber, position.column, position.lineNumber, position.column));
    }
    return void 0;
  }
};
PromptHeaderAutocompletion = __decorate([
  __param(0, IPromptsService),
  __param(1, ILanguageFeaturesService),
  __param(2, ILanguageModelsService),
  __param(3, ILanguageModelToolsService)
], PromptHeaderAutocompletion);
export {
  PromptHeaderAutocompletion
};
//# sourceMappingURL=promptHeaderAutocompletion.js.map
