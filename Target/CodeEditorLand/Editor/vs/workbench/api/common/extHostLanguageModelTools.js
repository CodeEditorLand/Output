var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { raceCancellation } from "../../../base/common/async.js";
import { CancellationToken } from "../../../base/common/cancellation.js";
import { CancellationError } from "../../../base/common/errors.js";
import { IDisposable, toDisposable } from "../../../base/common/lifecycle.js";
import { revive } from "../../../base/common/marshalling.js";
import { generateUuid } from "../../../base/common/uuid.js";
import { IExtensionDescription } from "../../../platform/extensions/common/extensions.js";
import { IPreparedToolInvocation, isToolInvocationContext, IToolInvocation, IToolInvocationContext, IToolResult } from "../../contrib/chat/common/languageModelToolsService.js";
import { ExtHostLanguageModelToolsShape, IMainContext, IToolDataDto, MainContext, MainThreadLanguageModelToolsShape } from "./extHost.protocol.js";
import * as typeConvert from "./extHostTypeConverters.js";
class ExtHostLanguageModelTools {
  static {
    __name(this, "ExtHostLanguageModelTools");
  }
  /** A map of tools that were registered in this EH */
  _registeredTools = /* @__PURE__ */ new Map();
  _proxy;
  _tokenCountFuncs = /* @__PURE__ */ new Map();
  /** A map of all known tools, from other EHs or registered in vscode core */
  _allTools = /* @__PURE__ */ new Map();
  constructor(mainContext) {
    this._proxy = mainContext.getProxy(MainContext.MainThreadLanguageModelTools);
    this._proxy.$getTools().then((tools) => {
      for (const tool of tools) {
        this._allTools.set(tool.id, revive(tool));
      }
    });
  }
  async $countTokensForInvocation(callId, input, token) {
    const fn = this._tokenCountFuncs.get(callId);
    if (!fn) {
      throw new Error(`Tool invocation call ${callId} not found`);
    }
    return await fn(input, token);
  }
  async invokeTool(toolId, options, token) {
    const callId = generateUuid();
    if (options.tokenizationOptions) {
      this._tokenCountFuncs.set(callId, options.tokenizationOptions.countTokens);
    }
    if (options.toolInvocationToken && !isToolInvocationContext(options.toolInvocationToken)) {
      throw new Error(`Invalid tool invocation token`);
    }
    try {
      const result = await this._proxy.$invokeTool({
        toolId,
        callId,
        parameters: options.input ?? options.parameters,
        tokenBudget: options.tokenizationOptions?.tokenBudget,
        context: options.toolInvocationToken
      }, token);
      return typeConvert.LanguageModelToolResult.to(result);
    } finally {
      this._tokenCountFuncs.delete(callId);
    }
  }
  $onDidChangeTools(tools) {
    this._allTools.clear();
    for (const tool of tools) {
      this._allTools.set(tool.id, tool);
    }
  }
  get tools() {
    return Array.from(this._allTools.values()).map((tool) => typeConvert.LanguageModelToolDescription.to(tool));
  }
  async $invokeTool(dto, token) {
    const item = this._registeredTools.get(dto.toolId);
    if (!item) {
      throw new Error(`Unknown tool ${dto.toolId}`);
    }
    const options = { input: dto.parameters, parameters: dto.parameters, toolInvocationToken: dto.context };
    if (dto.tokenBudget !== void 0) {
      options.tokenizationOptions = {
        tokenBudget: dto.tokenBudget,
        countTokens: this._tokenCountFuncs.get(dto.callId) || ((value, token2 = CancellationToken.None) => this._proxy.$countTokensForInvocation(dto.callId, value, token2))
      };
    }
    const extensionResult = await raceCancellation(Promise.resolve(item.tool.invoke(options, token)), token);
    if (!extensionResult) {
      throw new CancellationError();
    }
    return typeConvert.LanguageModelToolResult.from(extensionResult);
  }
  async $prepareToolInvocation(toolId, parameters, token) {
    const item = this._registeredTools.get(toolId);
    if (!item) {
      throw new Error(`Unknown tool ${toolId}`);
    }
    if (!item.tool.prepareInvocation) {
      return void 0;
    }
    const options = { parameters, input: parameters };
    const result = await item.tool.prepareInvocation(options, token);
    if (!result) {
      return void 0;
    }
    return {
      confirmationMessages: result.confirmationMessages ? {
        title: result.confirmationMessages.title,
        message: typeof result.confirmationMessages.message === "string" ? result.confirmationMessages.message : typeConvert.MarkdownString.from(result.confirmationMessages.message)
      } : void 0,
      invocationMessage: result.invocationMessage
    };
  }
  registerTool(extension, id, tool) {
    this._registeredTools.set(id, { extension, tool });
    this._proxy.$registerTool(id);
    return toDisposable(() => {
      this._registeredTools.delete(id);
      this._proxy.$unregisterTool(id);
    });
  }
}
export {
  ExtHostLanguageModelTools
};
//# sourceMappingURL=extHostLanguageModelTools.js.map
