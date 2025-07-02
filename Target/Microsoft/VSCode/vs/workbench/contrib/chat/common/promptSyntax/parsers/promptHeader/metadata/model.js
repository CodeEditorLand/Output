var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { FrontMatterRecord } from "../../../codecs/base/frontMatterCodec/tokens/index.js";
import { PromptStringMetadata } from "./base/string.js";
const RECORD_NAME = "model";
class PromptModelMetadata extends PromptStringMetadata {
  static {
    __name(this, "PromptModelMetadata");
  }
  get recordName() {
    return RECORD_NAME;
  }
  constructor(recordToken, languageId) {
    super(RECORD_NAME, recordToken, languageId);
  }
  /**
   * Check if a provided front matter token is a metadata record
   * with name equal to `description`.
   */
  static isModelRecord(token) {
    if (token instanceof FrontMatterRecord === false) {
      return false;
    }
    if (token.nameToken.text === RECORD_NAME) {
      return true;
    }
    return false;
  }
}
export {
  PromptModelMetadata
};
//# sourceMappingURL=model.js.map
