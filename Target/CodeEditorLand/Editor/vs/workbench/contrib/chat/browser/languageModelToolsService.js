var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
import { renderStringAsPlaintext } from "../../../../base/browser/markdownRenderer.js";
import { RunOnceScheduler } from "../../../../base/common/async.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { CancellationError } from "../../../../base/common/errors.js";
import { Emitter } from "../../../../base/common/event.js";
import { Iterable } from "../../../../base/common/iterator.js";
import { Disposable, IDisposable, toDisposable } from "../../../../base/common/lifecycle.js";
import { localize } from "../../../../nls.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { ChatModel } from "../common/chatModel.js";
import { ChatToolInvocation } from "../common/chatProgressTypes/chatToolInvocation.js";
import { IChatService } from "../common/chatService.js";
import { CountTokensCallback, ILanguageModelToolsService, IToolData, IToolImpl, IToolInvocation, IToolResult } from "../common/languageModelToolsService.js";
let LanguageModelToolsService = class extends Disposable {
  constructor(_extensionService, _contextKeyService, _chatService, _dialogService) {
    super();
    this._extensionService = _extensionService;
    this._contextKeyService = _contextKeyService;
    this._chatService = _chatService;
    this._dialogService = _dialogService;
    this._register(this._contextKeyService.onDidChangeContext((e) => {
      if (e.affectsSome(this._toolContextKeys)) {
        this._onDidChangeToolsScheduler.schedule();
      }
    }));
  }
  static {
    __name(this, "LanguageModelToolsService");
  }
  _serviceBrand;
  _onDidChangeTools = new Emitter();
  onDidChangeTools = this._onDidChangeTools.event;
  /** Throttle tools updates because it sends all tools and runs on context key updates */
  _onDidChangeToolsScheduler = new RunOnceScheduler(() => this._onDidChangeTools.fire(), 750);
  _tools = /* @__PURE__ */ new Map();
  _toolContextKeys = /* @__PURE__ */ new Set();
  registerToolData(toolData) {
    if (this._tools.has(toolData.id)) {
      throw new Error(`Tool "${toolData.id}" is already registered.`);
    }
    if (!toolData.supportedContentTypes.includes("text/plain")) {
      toolData.supportedContentTypes.push("text/plain");
    }
    this._tools.set(toolData.id, { data: toolData });
    this._onDidChangeToolsScheduler.schedule();
    toolData.when?.keys().forEach((key) => this._toolContextKeys.add(key));
    return toDisposable(() => {
      this._tools.delete(toolData.id);
      this._refreshAllToolContextKeys();
      this._onDidChangeToolsScheduler.schedule();
    });
  }
  _refreshAllToolContextKeys() {
    this._toolContextKeys.clear();
    for (const tool of this._tools.values()) {
      tool.data.when?.keys().forEach((key) => this._toolContextKeys.add(key));
    }
  }
  registerToolImplementation(id, tool) {
    const entry = this._tools.get(id);
    if (!entry) {
      throw new Error(`Tool "${id}" was not contributed.`);
    }
    if (entry.impl) {
      throw new Error(`Tool "${id}" already has an implementation.`);
    }
    entry.impl = tool;
    return toDisposable(() => {
      entry.impl = void 0;
    });
  }
  getTools() {
    const toolDatas = Iterable.map(this._tools.values(), (i) => i.data);
    return Iterable.filter(toolDatas, (toolData) => !toolData.when || this._contextKeyService.contextMatchesRules(toolData.when));
  }
  getTool(id) {
    return this._getToolEntry(id)?.data;
  }
  _getToolEntry(id) {
    const entry = this._tools.get(id);
    if (entry && (!entry.data.when || this._contextKeyService.contextMatchesRules(entry.data.when))) {
      return entry;
    } else {
      return void 0;
    }
  }
  getToolByName(name) {
    for (const toolData of this.getTools()) {
      if (toolData.name === name) {
        return toolData;
      }
    }
    return void 0;
  }
  async invokeTool(dto, countTokens, token) {
    let tool = this._tools.get(dto.toolId);
    if (!tool) {
      throw new Error(`Tool ${dto.toolId} was not contributed`);
    }
    if (!tool.impl) {
      await this._extensionService.activateByEvent(`onLanguageModelTool:${dto.toolId}`);
      tool = this._tools.get(dto.toolId);
      if (!tool?.impl) {
        throw new Error(`Tool ${dto.toolId} does not have an implementation registered.`);
      }
    }
    let toolInvocation;
    if (dto.context) {
      const model = this._chatService.getSession(dto.context?.sessionId);
      const request = model.getRequests().at(-1);
      const participantName = request.response?.agent?.fullName ?? "";
      const prepared = tool.impl.prepareToolInvocation ? await tool.impl.prepareToolInvocation(participantName, dto.parameters, token) : void 0;
      const confirmationMessages = tool.data.requiresConfirmation ? prepared?.confirmationMessages ?? {
        title: localize("toolConfirmTitle", "Use {0}?", `"${tool.data.displayName ?? tool.data.id}"`),
        message: localize("toolConfirmMessage", "{0} will use {1}.", participantName, `"${tool.data.displayName ?? tool.data.id}"`)
      } : void 0;
      const defaultMessage = localize("toolInvocationMessage", "Using {0}", `"${tool.data.displayName ?? tool.data.id}"`);
      const invocationMessage = prepared?.invocationMessage ?? defaultMessage;
      toolInvocation = new ChatToolInvocation(invocationMessage, confirmationMessages);
      token.onCancellationRequested(() => {
        toolInvocation.confirmed.complete(false);
      });
      model.acceptResponseProgress(request, toolInvocation);
      if (tool.data.requiresConfirmation) {
        const userConfirmed = await toolInvocation.confirmed.p;
        if (!userConfirmed) {
          throw new CancellationError();
        }
      }
    } else if (tool.data.requiresConfirmation) {
      const prepared = tool.impl.prepareToolInvocation ? await tool.impl.prepareToolInvocation("Some Extension", dto.parameters, token) : void 0;
      const confirmationMessages = prepared?.confirmationMessages ?? {
        title: localize("toolConfirmTitle", "Use {0}?", `"${tool.data.displayName ?? tool.data.id}"`),
        message: localize("toolConfirmMessage", "{0} will use {1}.", "Some Extension", `"${tool.data.displayName ?? tool.data.id}"`)
      };
      await this._dialogService.confirm({ message: confirmationMessages.title, detail: renderStringAsPlaintext(confirmationMessages.message) });
    }
    try {
      return await tool.impl.invoke(dto, countTokens, token);
    } finally {
      toolInvocation?.isCompleteDeferred.complete();
    }
  }
};
LanguageModelToolsService = __decorateClass([
  __decorateParam(0, IExtensionService),
  __decorateParam(1, IContextKeyService),
  __decorateParam(2, IChatService),
  __decorateParam(3, IDialogService)
], LanguageModelToolsService);
export {
  LanguageModelToolsService
};
//# sourceMappingURL=languageModelToolsService.js.map
