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
import { MarkdownString } from "../../../../../../base/common/htmlContent.js";
import { Disposable } from "../../../../../../base/common/lifecycle.js";
import { ILanguageFeaturesService } from "../../../../../../editor/common/services/languageFeatures.js";
import { localize } from "../../../../../../nls.js";
import { ILanguageModelsService } from "../../languageModels.js";
import { ILanguageModelToolsService } from "../../languageModelToolsService.js";
import { InstructionsHeader } from "../parsers/promptHeader/instructionsHeader.js";
import { ModeHeader } from "../parsers/promptHeader/modeHeader.js";
import { ALL_PROMPTS_LANGUAGE_SELECTOR, getPromptsTypeForLanguageId } from "../promptTypes.js";
import { IPromptsService } from "../service/promptsService.js";
let PromptHeaderHoverProvider = class PromptHeaderHoverProvider2 extends Disposable {
  static {
    __name(this, "PromptHeaderHoverProvider");
  }
  constructor(promptsService, languageService, languageModelToolsService, languageModelsService) {
    super();
    this.promptsService = promptsService;
    this.languageService = languageService;
    this.languageModelToolsService = languageModelToolsService;
    this.languageModelsService = languageModelsService;
    this._debugDisplayName = "PromptHeaderHoverProvider";
    this._register(this.languageService.hoverProvider.register(ALL_PROMPTS_LANGUAGE_SELECTOR, this));
  }
  createHover(contents, range) {
    return {
      contents: [new MarkdownString(contents)],
      range
    };
  }
  async provideHover(model, position, token, _context) {
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
    if (header instanceof InstructionsHeader) {
      const descriptionRange = header.metadataUtility.description?.range;
      if (descriptionRange?.containsPosition(position)) {
        return this.createHover(localize("promptHeader.instructions.description", "The description of the instruction file. It can be used to provide additional context or information about the instructions and is passed to the language model as part of the prompt."), descriptionRange);
      }
      const applyToRange = header.metadataUtility.applyTo?.range;
      if (applyToRange?.containsPosition(position)) {
        return this.createHover(localize("promptHeader.instructions.applyToRange", "One or more glob pattern (separated by comma) that describe for which files the instructions apply to. Based on these patterns, the file is automatically included in the prompt, when the context contains a file that matches one or more of these patterns. Use `**` when you want this file to always be added.\nExample: **/*.ts, **/*.js, client/**"), applyToRange);
      }
    } else if (header instanceof ModeHeader) {
      const descriptionRange = header.metadataUtility.description?.range;
      if (descriptionRange?.containsPosition(position)) {
        return this.createHover(localize("promptHeader.mode.description", "The description of the mode file. It can be used to provide additional context or information about the mode to the mode author."), descriptionRange);
      }
      const model2 = header.metadataUtility.model;
      if (model2?.range.containsPosition(position)) {
        return this.getModelHover(model2, model2.range, localize("promptHeader.mode.model", "The model to use in this mode."));
      }
      const tools = header.metadataUtility.tools;
      if (tools?.range?.containsPosition(position)) {
        return this.getToolHover(tools, position, localize("promptHeader.mode.tools", "The tools to use in this mode."));
      }
    } else {
      const descriptionRange = header.metadataUtility.description?.range;
      if (descriptionRange?.containsPosition(position)) {
        return this.createHover(localize("promptHeader.prompt.description", "The description of the prompt file. It can be used to provide additional context or information about the prompt to the prompt author."), descriptionRange);
      }
      const model2 = header.metadataUtility.model;
      if (model2?.range.containsPosition(position)) {
        return this.getModelHover(model2, model2.range, localize("promptHeader.prompt.model", "The model to use in this prompt."));
      }
      const tools = header.metadataUtility.tools;
      if (tools?.range?.containsPosition(position)) {
        return this.getToolHover(tools, position, localize("promptHeader.prompt.tools", "The tools to use in this prompt."));
      }
      const modeRange = header.metadataUtility.mode?.range;
      if (modeRange?.containsPosition(position)) {
        return this.createHover(localize("promptHeader.prompt.mode", "The mode (ask, edit or agent) to use when running this prompt."), modeRange);
      }
    }
    return void 0;
  }
  getToolHover(node, position, baseMessage) {
    if (node.value) {
      for (const toolName of node.value) {
        const toolRange = node.getToolRange(toolName);
        if (toolRange?.containsPosition(position)) {
          const tool = this.languageModelToolsService.getToolByName(toolName);
          if (tool) {
            return this.createHover(tool.displayName, toolRange);
          }
          const toolSet = this.languageModelToolsService.getToolSetByName(toolName);
          if (toolSet) {
            return this.getToolsetHover(toolSet, toolRange);
          }
        }
      }
    }
    return this.createHover(baseMessage, node.range);
  }
  getToolsetHover(toolSet, range) {
    const lines = [];
    lines.push(localize("toolSetName", "ToolSet: {0}\n\n", toolSet.referenceName));
    if (toolSet.description) {
      lines.push(toolSet.description);
    }
    for (const tool of toolSet.getTools()) {
      lines.push(`- ${tool.toolReferenceName ?? tool.displayName} (${tool.displayName})`);
    }
    return this.createHover(lines.join("\n"), range);
  }
  getModelHover(node, range, baseMessage) {
    if (node.value) {
      for (const id of this.languageModelsService.getLanguageModelIds()) {
        const meta = this.languageModelsService.lookupLanguageModel(id);
        if (meta) {
          const lines = [];
          lines.push(baseMessage + "\n");
          lines.push(localize("modelName", "{0}", meta.description ?? meta.name));
          lines.push(localize("modelFamily", "- Family: {0}", meta.family));
          lines.push(localize("modelVendor", "- Vendor: {0}", meta.vendor));
          return this.createHover(lines.join("\n"), range);
        }
      }
    }
    return this.createHover(baseMessage, range);
  }
};
PromptHeaderHoverProvider = __decorate([
  __param(0, IPromptsService),
  __param(1, ILanguageFeaturesService),
  __param(2, ILanguageModelToolsService),
  __param(3, ILanguageModelsService)
], PromptHeaderHoverProvider);
export {
  PromptHeaderHoverProvider
};
//# sourceMappingURL=promptHeaderHovers.js.map
