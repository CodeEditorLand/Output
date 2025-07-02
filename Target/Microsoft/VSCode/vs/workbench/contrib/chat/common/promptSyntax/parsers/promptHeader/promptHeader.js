var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { ChatModeKind } from "../../../constants.js";
import { localize } from "../../../../../../../nls.js";
import { PromptMetadataWarning } from "./diagnostics.js";
import { assert } from "../../../../../../../base/common/assert.js";
import { assertDefined } from "../../../../../../../base/common/types.js";
import { HeaderBase } from "./headerBase.js";
import { PromptModelMetadata } from "./metadata/model.js";
import { PromptToolsMetadata } from "./metadata/tools.js";
import { PromptModeMetadata } from "./metadata/mode.js";
class PromptHeader extends HeaderBase {
  static {
    __name(this, "PromptHeader");
  }
  handleToken(token) {
    if (PromptToolsMetadata.isToolsRecord(token)) {
      const metadata = new PromptToolsMetadata(token, this.languageId);
      this.issues.push(...metadata.validate());
      this.meta.tools = metadata;
      this.validateToolsAndModeCompatibility();
      return true;
    }
    if (PromptModeMetadata.isModeRecord(token)) {
      const metadata = new PromptModeMetadata(token, this.languageId);
      this.issues.push(...metadata.validate());
      this.meta.mode = metadata;
      this.validateToolsAndModeCompatibility();
      return true;
    }
    if (PromptModelMetadata.isModelRecord(token)) {
      const metadata = new PromptModelMetadata(token, this.languageId);
      this.issues.push(...metadata.validate());
      this.meta.model = metadata;
      return true;
    }
    return false;
  }
  /**
   * Check if value of `tools` and `mode` metadata
   * are compatible with each other.
   */
  get toolsAndModeCompatible() {
    const { tools, mode } = this.meta;
    if (tools === void 0) {
      return true;
    }
    if (mode?.value === void 0) {
      return true;
    }
    return mode.value === ChatModeKind.Agent;
  }
  /**
   * Validate that the `tools` and `mode` metadata are compatible
   * with each other. If not, add a warning diagnostic.
   */
  validateToolsAndModeCompatibility() {
    if (this.toolsAndModeCompatible === true) {
      return;
    }
    const { tools, mode } = this.meta;
    assertDefined(tools, "Tools metadata must have been present.");
    assertDefined(mode, "Mode metadata must have been present.");
    assert(mode.value !== ChatModeKind.Agent, "Mode metadata must not be agent mode.");
    this.issues.push(new PromptMetadataWarning(mode.range, localize("prompt.header.metadata.mode.diagnostics.incompatible-with-tools", "Tools can only be used when in 'agent' mode, but the mode is set to '{0}'. The tools will be ignored.", mode.value)));
  }
}
export {
  PromptHeader
};
//# sourceMappingURL=promptHeader.js.map
