var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { HeaderBase } from "./headerBase.js";
import { PromptModelMetadata } from "./metadata/model.js";
import { PromptToolsMetadata } from "./metadata/tools.js";
class ModeHeader extends HeaderBase {
  static {
    __name(this, "ModeHeader");
  }
  handleToken(token) {
    if (PromptToolsMetadata.isToolsRecord(token)) {
      const metadata = new PromptToolsMetadata(token, this.languageId);
      this.issues.push(...metadata.validate());
      this.meta.tools = metadata;
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
}
export {
  ModeHeader
};
//# sourceMappingURL=modeHeader.js.map
