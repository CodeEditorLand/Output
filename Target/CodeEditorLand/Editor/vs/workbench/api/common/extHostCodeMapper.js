var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { CancellationToken } from "../../../base/common/cancellation.js";
import { IExtensionDescription } from "../../../platform/extensions/common/extensions.js";
import { ICodeMapperResult } from "../../contrib/chat/common/chatCodeMapperService.js";
import * as extHostProtocol from "./extHost.protocol.js";
import { ChatAgentResult, DocumentContextItem, TextEdit } from "./extHostTypeConverters.js";
import { URI } from "../../../base/common/uri.js";
class ExtHostCodeMapper {
  static {
    __name(this, "ExtHostCodeMapper");
  }
  static _providerHandlePool = 0;
  _proxy;
  providers = /* @__PURE__ */ new Map();
  constructor(mainContext) {
    this._proxy = mainContext.getProxy(extHostProtocol.MainContext.MainThreadCodeMapper);
  }
  async $mapCode(handle, internalRequest, token) {
    const provider = this.providers.get(handle);
    if (!provider) {
      throw new Error(`Received request to map code for unknown provider handle ${handle}`);
    }
    const stream = {
      textEdit: /* @__PURE__ */ __name((target, edits) => {
        edits = Array.isArray(edits) ? edits : [edits];
        this._proxy.$handleProgress(internalRequest.requestId, {
          uri: target,
          edits: edits.map(TextEdit.from)
        });
      }, "textEdit")
    };
    const request = {
      codeBlocks: internalRequest.codeBlocks.map((block) => {
        return {
          code: block.code,
          resource: URI.revive(block.resource),
          markdownBeforeBlock: block.markdownBeforeBlock
        };
      }),
      conversation: internalRequest.conversation.map((item) => {
        if (item.type === "request") {
          return {
            type: "request",
            message: item.message
          };
        } else {
          return {
            type: "response",
            message: item.message,
            result: item.result ? ChatAgentResult.to(item.result) : void 0,
            references: item.references?.map(DocumentContextItem.to)
          };
        }
      })
    };
    const result = await provider.provideMappedEdits(request, stream, token);
    return result ?? null;
  }
  registerMappedEditsProvider(extension, provider) {
    const handle = ExtHostCodeMapper._providerHandlePool++;
    this._proxy.$registerCodeMapperProvider(handle);
    this.providers.set(handle, provider);
    return {
      dispose: /* @__PURE__ */ __name(() => {
        return this._proxy.$unregisterCodeMapperProvider(handle);
      }, "dispose")
    };
  }
}
export {
  ExtHostCodeMapper
};
//# sourceMappingURL=extHostCodeMapper.js.map
