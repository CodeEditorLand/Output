var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { assertNever } from "../../../../../../base/common/assert.js";
import { BaseDecoder } from "../../../../../../base/common/codecs/baseDecoder.js";
import {
  MarkdownDecoder
} from "../../../../../../editor/common/codecs/markdownCodec/markdownDecoder.js";
import { MarkdownLink } from "../../../../../../editor/common/codecs/markdownCodec/tokens/markdownLink.js";
import { Hash } from "../../../../../../editor/common/codecs/simpleCodec/tokens/hash.js";
import {
  PartialPromptVariableName,
  PartialPromptVariableWithData
} from "./parsers/promptVariableParser.js";
import { PromptToken } from "./tokens/promptToken.js";
class ChatPromptDecoder extends BaseDecoder {
  static {
    __name(this, "ChatPromptDecoder");
  }
  /**
   * Currently active parser object that is used to parse a well-known sequence of
   * tokens, for instance, a `#file:/path/to/file.md` link that consists of `hash`,
   * `word`, and `colon` tokens sequence plus the `file path` part that follows.
   */
  current;
  constructor(stream) {
    super(new MarkdownDecoder(stream));
  }
  onStreamData(token) {
    if (token instanceof Hash && !this.current) {
      this.current = new PartialPromptVariableName(token);
      return;
    }
    if (!this.current) {
      if (token instanceof MarkdownLink) {
        this._onData.fire(token);
      }
      return;
    }
    const parseResult = this.current.accept(token);
    switch (parseResult.result) {
      // in the case of success there might be 2 cases:
      //   1) parsing fully completed and an instance of `PromptToken` is returned back,
      //      in this case, emit the parsed token (e.g., a `link`) and reset the current
      //      parser object reference so a new parsing process can be initiated next
      //   2) parsing is still in progress and the next parser object is returned, hence
      //      we need to replace the current parser object with a new one and continue
      case "success": {
        const { nextParser } = parseResult;
        if (nextParser instanceof PromptToken) {
          this._onData.fire(nextParser);
          this.current = void 0;
        } else {
          this.current = nextParser;
        }
        break;
      }
      // in the case of failure, reset the current parser object
      case "failure": {
        this.current = void 0;
        break;
      }
    }
    if (!parseResult.wasTokenConsumed) {
      this.onStreamData(token);
    }
  }
  onStreamEnd() {
    try {
      if (!this.current) {
        return;
      }
      if (this.current instanceof PartialPromptVariableName) {
        return this._onData.fire(this.current.asPromptVariable());
      }
      if (this.current instanceof PartialPromptVariableWithData) {
        return this._onData.fire(
          this.current.asPromptVariableWithData()
        );
      }
      assertNever(
        this.current,
        `Unknown parser object '${this.current}'`
      );
    } catch (error) {
    } finally {
      this.current = void 0;
      super.onStreamEnd();
    }
  }
}
export {
  ChatPromptDecoder
};
//# sourceMappingURL=chatPromptDecoder.js.map
