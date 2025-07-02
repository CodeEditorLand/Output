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
import { assertDefined } from "../../../../../../base/common/types.js";
import { ProviderInstanceManagerBase } from "./providerInstanceManagerBase.js";
import { IMarkerService, MarkerSeverity } from "../../../../../../platform/markers/common/markers.js";
import { IFileService } from "../../../../../../platform/files/common/files.js";
import { localize } from "../../../../../../nls.js";
const MARKERS_OWNER_ID = "prompt-link-diagnostics-provider";
let PromptLinkDiagnosticsProvider = class PromptLinkDiagnosticsProvider2 extends ProviderInstanceBase {
  static {
    __name(this, "PromptLinkDiagnosticsProvider");
  }
  constructor(model, promptsService, markerService, fileService) {
    super(model, promptsService);
    this.markerService = markerService;
    this.fileService = fileService;
  }
  /**
   * Update diagnostic markers for the current editor.
   */
  async onPromptSettled() {
    this.markerService.remove(MARKERS_OWNER_ID, [this.model.uri]);
    const markers = [];
    const stats = await this.fileService.resolveAll(this.parser.references.map((ref) => ({ resource: ref.uri })));
    for (let i = 0; i < stats.length; i++) {
      if (!stats[i].success) {
        markers.push(toMarker(this.parser.references[i], localize("fileNotFound", "File not found.")));
      }
    }
    this.markerService.changeOne(MARKERS_OWNER_ID, this.model.uri, markers);
  }
  /**
   * Returns a string representation of this object.
   */
  toString() {
    return `prompt-link-diagnostics:${this.model.uri.path}`;
  }
};
PromptLinkDiagnosticsProvider = __decorate([
  __param(1, IPromptsService),
  __param(2, IMarkerService),
  __param(3, IFileService)
], PromptLinkDiagnosticsProvider);
function toMarker(link, message) {
  const { linkRange } = link;
  assertDefined(linkRange, "Link range must to be defined.");
  return {
    message,
    severity: MarkerSeverity.Warning,
    ...linkRange
  };
}
__name(toMarker, "toMarker");
class PromptLinkDiagnosticsInstanceManager extends ProviderInstanceManagerBase {
  static {
    __name(this, "PromptLinkDiagnosticsInstanceManager");
  }
  get InstanceClass() {
    return PromptLinkDiagnosticsProvider;
  }
}
export {
  PromptLinkDiagnosticsInstanceManager
};
//# sourceMappingURL=promptLinkDiagnosticsProvider.js.map
