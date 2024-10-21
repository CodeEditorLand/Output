var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { CharCode } from "../../../../base/common/charCode.js";
import { IDisposable } from "../../../../base/common/lifecycle.js";
import { ResourceMap } from "../../../../base/common/map.js";
import { splitLinesIncludeSeparators } from "../../../../base/common/strings.js";
import { isString } from "../../../../base/common/types.js";
import { URI } from "../../../../base/common/uri.js";
import { DocumentContextItem, isLocation, TextEdit } from "../../../../editor/common/languages.js";
import { createDecorator } from "../../../../platform/instantiation/common/instantiation.js";
import { IChatAgentResult } from "./chatAgents.js";
import { IChatResponseModel } from "./chatModel.js";
import { IChatContentReference } from "./chatService.js";
const ICodeMapperService = createDecorator("codeMapperService");
class CodeMapperService {
  static {
    __name(this, "CodeMapperService");
  }
  _serviceBrand;
  providers = [];
  registerCodeMapperProvider(handle, provider) {
    this.providers.push(provider);
    return {
      dispose: /* @__PURE__ */ __name(() => {
        const index = this.providers.indexOf(provider);
        if (index >= 0) {
          this.providers.splice(index, 1);
        }
      }, "dispose")
    };
  }
  async mapCode(request, response, token) {
    for (const provider of this.providers) {
      const result = await provider.mapCode(request, response, token);
      if (result) {
        return result;
      }
    }
    return void 0;
  }
  async mapCodeFromResponse(responseModel, response, token) {
    const fenceLanguageRegex = /^`{3,}/;
    const codeBlocks = [];
    const currentBlock = [];
    const markdownBeforeBlock = [];
    let currentBlockUri = void 0;
    let fence = void 0;
    for (const lineOrUri of iterateLinesOrUris(responseModel)) {
      if (isString(lineOrUri)) {
        const fenceLanguageIdMatch = lineOrUri.match(fenceLanguageRegex);
        if (fenceLanguageIdMatch) {
          if (fence !== void 0 && fenceLanguageIdMatch[0] === fence) {
            fence = void 0;
            if (currentBlockUri) {
              codeBlocks.push({ code: currentBlock.join(""), resource: currentBlockUri, markdownBeforeBlock: markdownBeforeBlock.join("") });
              currentBlock.length = 0;
              markdownBeforeBlock.length = 0;
              currentBlockUri = void 0;
            }
          } else {
            fence = fenceLanguageIdMatch[0];
          }
        } else {
          if (fence !== void 0) {
            currentBlock.push(lineOrUri);
          } else {
            markdownBeforeBlock.push(lineOrUri);
          }
        }
      } else {
        currentBlockUri = lineOrUri;
      }
    }
    const conversation = [];
    for (const request of responseModel.session.getRequests()) {
      const response2 = request.response;
      if (!response2 || response2 === responseModel) {
        break;
      }
      conversation.push({
        type: "request",
        message: request.message.text
      });
      conversation.push({
        type: "response",
        message: response2.response.getMarkdown(),
        result: response2.result,
        references: getReferencesAsDocumentContext(response2.contentReferences)
      });
    }
    return this.mapCode({ codeBlocks, conversation }, response, token);
  }
}
function iterateLinesOrUris(responseModel) {
  return {
    *[Symbol.iterator]() {
      let lastIncompleteLine = void 0;
      for (const part of responseModel.response.value) {
        if (part.kind === "markdownContent" || part.kind === "markdownVuln") {
          const lines = splitLinesIncludeSeparators(part.content.value);
          if (lines.length > 0) {
            if (lastIncompleteLine !== void 0) {
              lines[0] = lastIncompleteLine + lines[0];
            }
            lastIncompleteLine = isLineIncomplete(lines[lines.length - 1]) ? lines.pop() : void 0;
            for (const line of lines) {
              yield line;
            }
          }
        } else if (part.kind === "codeblockUri") {
          yield part.uri;
        }
      }
      if (lastIncompleteLine !== void 0) {
        yield lastIncompleteLine;
      }
    }
  };
}
__name(iterateLinesOrUris, "iterateLinesOrUris");
function isLineIncomplete(line) {
  const lastChar = line.charCodeAt(line.length - 1);
  return lastChar !== CharCode.LineFeed && lastChar !== CharCode.CarriageReturn;
}
__name(isLineIncomplete, "isLineIncomplete");
function getReferencesAsDocumentContext(res) {
  const map = new ResourceMap();
  for (const r of res) {
    let uri;
    let range;
    if (URI.isUri(r.reference)) {
      uri = r.reference;
    } else if (isLocation(r.reference)) {
      uri = r.reference.uri;
      range = r.reference.range;
    }
    if (uri) {
      const item = map.get(uri);
      if (item) {
        if (range) {
          item.ranges.push(range);
        }
      } else {
        map.set(uri, { uri, version: -1, ranges: range ? [range] : [] });
      }
    }
  }
  return [...map.values()];
}
__name(getReferencesAsDocumentContext, "getReferencesAsDocumentContext");
export {
  CodeMapperService,
  ICodeMapperService,
  getReferencesAsDocumentContext
};
//# sourceMappingURL=chatCodeMapperService.js.map
