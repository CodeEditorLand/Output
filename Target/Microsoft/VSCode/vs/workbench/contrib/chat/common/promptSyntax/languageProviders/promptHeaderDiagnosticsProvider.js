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
import { IPromptsService } from "../service/promptsService.js";
import { ProviderInstanceBase } from "./providerInstanceBase.js";
import { assertNever } from "../../../../../../base/common/assert.js";
import { CancellationToken } from "../../../../../../base/common/cancellation.js";
import { ProviderInstanceManagerBase } from "./providerInstanceManagerBase.js";
import { PromptMetadataError, PromptMetadataWarning } from "../parsers/promptHeader/diagnostics.js";
import { IMarkerService, MarkerSeverity } from "../../../../../../platform/markers/common/markers.js";
import { PromptHeader } from "../parsers/promptHeader/promptHeader.js";
import { ModeHeader } from "../parsers/promptHeader/modeHeader.js";
import { ILanguageModelChatMetadata, ILanguageModelsService } from "../../languageModels.js";
import { ILanguageModelToolsService } from "../../languageModelToolsService.js";
import { localize } from "../../../../../../nls.js";
import { ChatModeKind } from "../../constants.js";
const MARKERS_OWNER_ID = "prompts-header-diagnostics-provider";
let PromptHeaderDiagnosticsProvider = class PromptHeaderDiagnosticsProvider2 extends ProviderInstanceBase {
  static {
    __name(this, "PromptHeaderDiagnosticsProvider");
  }
  constructor(model, promptsService, markerService, languageModelsService, languageModelToolsService) {
    super(model, promptsService);
    this.markerService = markerService;
    this.languageModelsService = languageModelsService;
    this.languageModelToolsService = languageModelToolsService;
    this._register(languageModelsService.onDidChangeLanguageModels(() => {
      this.onPromptSettled(void 0, CancellationToken.None);
    }));
    this._register(languageModelToolsService.onDidChangeTools(() => {
      this.onPromptSettled(void 0, CancellationToken.None);
    }));
  }
  /**
   * Update diagnostic markers for the current editor.
   */
  async onPromptSettled(_error, token) {
    this.markerService.remove(MARKERS_OWNER_ID, [this.model.uri]);
    const { header } = this.parser;
    if (header === void 0) {
      return;
    }
    await header.settled;
    if (token.isCancellationRequested) {
      return;
    }
    const markers = [];
    for (const diagnostic of header.diagnostics) {
      markers.push(toMarker(diagnostic));
    }
    if (header instanceof PromptHeader) {
      this.validateTools(header.metadataUtility.tools, header.metadata.mode, markers);
      this.validateModel(header.metadataUtility.model, header.metadata.mode, markers);
    } else if (header instanceof ModeHeader) {
      this.validateTools(header.metadataUtility.tools, ChatModeKind.Agent, markers);
      this.validateModel(header.metadataUtility.model, ChatModeKind.Agent, markers);
    }
    this.markerService.changeOne(MARKERS_OWNER_ID, this.model.uri, markers);
    return;
  }
  validateModel(modelNode, modeKind, markers) {
    if (!modelNode || modelNode.value === void 0) {
      return;
    }
    const languageModes = this.languageModelsService.getLanguageModelIds();
    if (languageModes.length === 0) {
      return;
    }
    const modelMetadata = this.findModelByName(languageModes, modelNode.value);
    if (!modelMetadata) {
      markers.push({
        message: localize("promptHeaderDiagnosticsProvider.modelNotFound", "Unknown model '{0}'", modelNode.value),
        severity: MarkerSeverity.Warning,
        ...modelNode.range
      });
    } else if (modeKind === ChatModeKind.Agent && !ILanguageModelChatMetadata.suitableForAgentMode(modelMetadata)) {
      markers.push({
        message: localize("promptHeaderDiagnosticsProvider.modelNotSuited", "Model '{0}' is not suited for agent mode", modelNode.value),
        severity: MarkerSeverity.Warning,
        ...modelNode.range
      });
    }
  }
  findModelByName(languageModes, modelName) {
    for (const model of languageModes) {
      const metadata = this.languageModelsService.lookupLanguageModel(model);
      if (metadata && metadata.isUserSelectable !== false && metadata.name === modelName) {
        return metadata;
      }
    }
    return void 0;
  }
  validateTools(tools, modeKind, markers) {
    if (!tools || tools.value === void 0 || modeKind === ChatModeKind.Ask || modeKind === ChatModeKind.Edit) {
      return;
    }
    const toolNames = new Set(tools.value);
    if (toolNames.size === 0) {
      return;
    }
    for (const tool of this.languageModelToolsService.getTools()) {
      toolNames.delete(tool.toolReferenceName ?? tool.displayName);
    }
    for (const toolSet of this.languageModelToolsService.toolSets.get()) {
      toolNames.delete(toolSet.referenceName);
    }
    for (const toolName of toolNames) {
      const range = tools.getToolRange(toolName);
      if (range) {
        markers.push({
          message: localize("promptHeaderDiagnosticsProvider.toolNotFound", "Unknown tool '{0}'", toolName),
          severity: MarkerSeverity.Warning,
          ...range
        });
      }
    }
  }
  /**
   * Returns a string representation of this object.
   */
  toString() {
    return `prompt-header-diagnostics:${this.model.uri.path}`;
  }
};
PromptHeaderDiagnosticsProvider = __decorate([
  __param(1, IPromptsService),
  __param(2, IMarkerService),
  __param(3, ILanguageModelsService),
  __param(4, ILanguageModelToolsService)
], PromptHeaderDiagnosticsProvider);
function toMarker(diagnostic) {
  if (diagnostic instanceof PromptMetadataWarning) {
    return {
      message: diagnostic.message,
      severity: MarkerSeverity.Warning,
      ...diagnostic.range
    };
  }
  if (diagnostic instanceof PromptMetadataError) {
    return {
      message: diagnostic.message,
      severity: MarkerSeverity.Error,
      ...diagnostic.range
    };
  }
  assertNever(diagnostic, `Unknown prompt metadata diagnostic type '${diagnostic}'.`);
}
__name(toMarker, "toMarker");
class PromptHeaderDiagnosticsInstanceManager extends ProviderInstanceManagerBase {
  static {
    __name(this, "PromptHeaderDiagnosticsInstanceManager");
  }
  get InstanceClass() {
    return PromptHeaderDiagnosticsProvider;
  }
}
export {
  PromptHeaderDiagnosticsInstanceManager
};
//# sourceMappingURL=promptHeaderDiagnosticsProvider.js.map
