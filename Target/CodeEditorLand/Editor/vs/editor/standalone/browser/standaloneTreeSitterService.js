var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Event } from "../../../base/common/event.js";
import { ITextModel } from "../../common/model.js";
import { ITreeSitterParseResult, ITreeSitterParserService } from "../../common/services/treeSitterParserService.js";
import { Range } from "../../common/core/range.js";
class StandaloneTreeSitterParserService {
  static {
    __name(this, "StandaloneTreeSitterParserService");
  }
  async getTree(content, languageId) {
    return void 0;
  }
  onDidUpdateTree = Event.None;
  _serviceBrand;
  onDidAddLanguage = Event.None;
  getOrInitLanguage(_languageId) {
    return void 0;
  }
  getParseResult(textModel) {
    return void 0;
  }
}
export {
  StandaloneTreeSitterParserService
};
//# sourceMappingURL=standaloneTreeSitterService.js.map
