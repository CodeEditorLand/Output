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
import { Disposable } from "../../../../../base/common/lifecycle.js";
import { generateUuid } from "../../../../../base/common/uuid.js";
import { isITextModel } from "../../../../../editor/common/model.js";
import { ILanguageFeaturesService } from "../../../../../editor/common/services/languageFeatures.js";
import { localize } from "../../../../../nls.js";
import { CommandsRegistry } from "../../../../../platform/commands/common/commands.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { showToolsPicker } from "../actions/chatToolPicker.js";
import { ILanguageModelToolsService } from "../../common/languageModelToolsService.js";
import { ALL_PROMPTS_LANGUAGE_SELECTOR } from "../../common/promptSyntax/promptTypes.js";
import { PromptToolsMetadata } from "../../common/promptSyntax/parsers/promptHeader/metadata/tools.js";
import { IPromptsService } from "../../common/promptSyntax/service/promptsService.js";
import { registerEditorFeature } from "../../../../../editor/common/editorFeatures.js";
import { PromptFileRewriter } from "./promptFileRewriter.js";
let PromptToolsCodeLensProvider = class PromptToolsCodeLensProvider2 extends Disposable {
  static {
    __name(this, "PromptToolsCodeLensProvider");
  }
  constructor(promptsService, languageService, languageModelToolsService, instantiationService) {
    super();
    this.promptsService = promptsService;
    this.languageService = languageService;
    this.languageModelToolsService = languageModelToolsService;
    this.instantiationService = instantiationService;
    this.cmdId = `_configure/${generateUuid()}`;
    this._register(this.languageService.codeLensProvider.register(ALL_PROMPTS_LANGUAGE_SELECTOR, this));
    this._register(CommandsRegistry.registerCommand(this.cmdId, (_accessor, ...args) => {
      const [first, second] = args;
      if (isITextModel(first) && second instanceof PromptToolsMetadata) {
        this.updateTools(first, second);
      }
    }));
  }
  async provideCodeLenses(model, token) {
    const parser = this.promptsService.getSyntaxParserFor(model);
    const { header } = await parser.start(token).settled();
    if (header === void 0 || token.isCancellationRequested) {
      return void 0;
    }
    if ("tools" in header.metadataUtility === false) {
      return void 0;
    }
    const { tools } = header.metadataUtility;
    if (tools === void 0) {
      return void 0;
    }
    const codeLens = {
      range: tools.range.collapseToStart(),
      command: {
        title: localize("configure-tools.capitalized.ellipsis", "Configure Tools..."),
        id: this.cmdId,
        arguments: [model, tools]
      }
    };
    return { lenses: [codeLens] };
  }
  async updateTools(model, tools) {
    const selectedToolsNow = tools.value ? this.languageModelToolsService.toToolAndToolSetEnablementMap(new Set(tools.value)) : /* @__PURE__ */ new Map();
    const newSelectedAfter = await this.instantiationService.invokeFunction(showToolsPicker, localize("placeholder", "Select tools"), void 0, selectedToolsNow);
    if (!newSelectedAfter) {
      return;
    }
    await this.instantiationService.createInstance(PromptFileRewriter).rewriteTools(model, newSelectedAfter, tools.range);
  }
};
PromptToolsCodeLensProvider = __decorate([
  __param(0, IPromptsService),
  __param(1, ILanguageFeaturesService),
  __param(2, ILanguageModelToolsService),
  __param(3, IInstantiationService)
], PromptToolsCodeLensProvider);
registerEditorFeature(PromptToolsCodeLensProvider);
//# sourceMappingURL=promptToolsCodeLensProvider.js.map
