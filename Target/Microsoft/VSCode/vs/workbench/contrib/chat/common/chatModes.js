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
var ChatModeService_1;
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Emitter } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { observableValue, transaction } from "../../../../base/common/observable.js";
import { URI } from "../../../../base/common/uri.js";
import { localize } from "../../../../nls.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { createDecorator } from "../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { IChatAgentService } from "./chatAgents.js";
import { ChatContextKeys } from "./chatContextKeys.js";
import { ChatModeKind } from "./constants.js";
import { IPromptsService } from "./promptSyntax/service/promptsService.js";
const IChatModeService = createDecorator("chatModeService");
let ChatModeService = class ChatModeService2 extends Disposable {
  static {
    __name(this, "ChatModeService");
  }
  static {
    ChatModeService_1 = this;
  }
  static {
    this.CUSTOM_MODES_STORAGE_KEY = "chat.customModes";
  }
  constructor(promptsService, chatAgentService, contextKeyService, logService, storageService) {
    super();
    this.promptsService = promptsService;
    this.chatAgentService = chatAgentService;
    this.logService = logService;
    this.storageService = storageService;
    this._customModeInstances = /* @__PURE__ */ new Map();
    this._onDidChangeChatModes = new Emitter();
    this.onDidChangeChatModes = this._onDidChangeChatModes.event;
    this.hasCustomModes = ChatContextKeys.Modes.hasCustomChatModes.bindTo(contextKeyService);
    this.loadCachedModes();
    void this.refreshCustomPromptModes(true);
    this._register(this.promptsService.onDidChangeCustomChatModes(() => {
      void this.refreshCustomPromptModes(true);
    }));
    this._register(this.storageService.onWillSaveState(() => this.saveCachedModes()));
    let didHaveToolsAgent = this.chatAgentService.hasToolsAgent;
    this._register(this.chatAgentService.onDidChangeAgents(() => {
      if (didHaveToolsAgent !== this.chatAgentService.hasToolsAgent) {
        didHaveToolsAgent = this.chatAgentService.hasToolsAgent;
        this._onDidChangeChatModes.fire();
      }
    }));
  }
  loadCachedModes() {
    try {
      const cachedCustomModes = this.storageService.getObject(
        ChatModeService_1.CUSTOM_MODES_STORAGE_KEY,
        1
        /* StorageScope.WORKSPACE */
      );
      if (cachedCustomModes) {
        this.deserializeCachedModes(cachedCustomModes);
      }
    } catch (error) {
      this.logService.error(error, "Failed to load cached custom chat modes");
    }
  }
  deserializeCachedModes(cachedCustomModes) {
    if (!Array.isArray(cachedCustomModes)) {
      this.logService.error("Invalid cached custom modes data: expected array");
      return;
    }
    for (const cachedMode of cachedCustomModes) {
      if (isCachedChatModeData(cachedMode) && cachedMode.uri) {
        try {
          const uri = URI.revive(cachedMode.uri);
          const customChatMode = {
            uri,
            name: cachedMode.name,
            description: cachedMode.description,
            tools: cachedMode.customTools,
            model: cachedMode.model,
            body: cachedMode.body || ""
          };
          const instance = new CustomChatMode(customChatMode);
          this._customModeInstances.set(uri.toString(), instance);
        } catch (error) {
          this.logService.error(error, "Failed to create custom chat mode instance from cached data");
        }
      }
    }
    this.hasCustomModes.set(this._customModeInstances.size > 0);
  }
  saveCachedModes() {
    try {
      const modesToCache = Array.from(this._customModeInstances.values());
      this.storageService.store(
        ChatModeService_1.CUSTOM_MODES_STORAGE_KEY,
        modesToCache,
        1,
        1
        /* StorageTarget.MACHINE */
      );
    } catch (error) {
      this.logService.warn("Failed to save cached custom chat modes", error);
    }
  }
  async refreshCustomPromptModes(fireChangeEvent) {
    try {
      const customModes = await this.promptsService.getCustomChatModes(CancellationToken.None);
      const seenUris = /* @__PURE__ */ new Set();
      for (const customMode of customModes) {
        const uriString = customMode.uri.toString();
        seenUris.add(uriString);
        let modeInstance = this._customModeInstances.get(uriString);
        if (modeInstance) {
          modeInstance.updateData(customMode);
        } else {
          modeInstance = new CustomChatMode(customMode);
          this._customModeInstances.set(uriString, modeInstance);
        }
      }
      for (const [uriString] of this._customModeInstances.entries()) {
        if (!seenUris.has(uriString)) {
          this._customModeInstances.delete(uriString);
        }
      }
      this.hasCustomModes.set(this._customModeInstances.size > 0);
      if (fireChangeEvent) {
        this._onDidChangeChatModes.fire();
      }
    } catch (error) {
      this.logService.error(error, "Failed to load custom chat modes");
      this._customModeInstances.clear();
      this.hasCustomModes.set(false);
    }
  }
  getModes() {
    return { builtin: this.getBuiltinModes(), custom: Array.from(this._customModeInstances.values()) };
  }
  getFlatModes() {
    const allModes = this.getModes();
    return [...allModes.builtin, ...allModes.custom];
  }
  findModeById(id) {
    const allModes = this.getFlatModes();
    return allModes.find((mode) => mode.id === id);
  }
  findModeByName(name) {
    const allModes = this.getFlatModes();
    return allModes.find((mode) => mode.name === name);
  }
  getBuiltinModes() {
    const builtinModes = [
      ChatMode.Ask
    ];
    if (this.chatAgentService.hasToolsAgent) {
      builtinModes.push(ChatMode.Agent);
    }
    builtinModes.push(ChatMode.Edit);
    return builtinModes;
  }
};
ChatModeService = ChatModeService_1 = __decorate([
  __param(0, IPromptsService),
  __param(1, IChatAgentService),
  __param(2, IContextKeyService),
  __param(3, ILogService),
  __param(4, IStorageService)
], ChatModeService);
function isCachedChatModeData(data) {
  if (typeof data !== "object" || data === null) {
    return false;
  }
  const mode = data;
  return typeof mode.id === "string" && typeof mode.name === "string" && typeof mode.kind === "string" && (mode.description === void 0 || typeof mode.description === "string") && (mode.customTools === void 0 || Array.isArray(mode.customTools)) && (mode.body === void 0 || typeof mode.body === "string") && (mode.model === void 0 || typeof mode.model === "string") && (mode.uri === void 0 || typeof mode.uri === "object" && mode.uri !== null);
}
__name(isCachedChatModeData, "isCachedChatModeData");
class CustomChatMode {
  static {
    __name(this, "CustomChatMode");
  }
  get description() {
    return this._descriptionObservable;
  }
  get customTools() {
    return this._customToolsObservable;
  }
  get model() {
    return this._modelObservable;
  }
  get body() {
    return this._bodyObservable;
  }
  get uri() {
    return this._uriObservable;
  }
  constructor(customChatMode) {
    this.kind = ChatModeKind.Agent;
    this.id = customChatMode.uri.toString();
    this.name = customChatMode.name;
    this._descriptionObservable = observableValue("description", customChatMode.description);
    this._customToolsObservable = observableValue("customTools", customChatMode.tools);
    this._modelObservable = observableValue("model", customChatMode.model);
    this._bodyObservable = observableValue("body", customChatMode.body);
    this._uriObservable = observableValue("uri", customChatMode.uri);
  }
  /**
   * Updates the underlying data and triggers observable changes
   */
  updateData(newData) {
    transaction((tx) => {
      this._descriptionObservable.set(newData.description, tx);
      this._customToolsObservable.set(newData.tools, tx);
      this._modelObservable.set(newData.model, tx);
      this._bodyObservable.set(newData.body, tx);
      this._uriObservable.set(newData.uri, tx);
    });
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description.get(),
      kind: this.kind,
      customTools: this.customTools.get(),
      model: this.model.get(),
      body: this.body.get(),
      uri: this.uri.get()
    };
  }
}
class BuiltinChatMode {
  static {
    __name(this, "BuiltinChatMode");
  }
  constructor(kind, name, description) {
    this.kind = kind;
    this.name = name;
    this.description = observableValue("description", description);
  }
  get id() {
    return this.kind;
  }
  /**
   * Getters are not json-stringified
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description.get(),
      kind: this.kind
    };
  }
}
var ChatMode;
(function(ChatMode2) {
  ChatMode2.Ask = new BuiltinChatMode(ChatModeKind.Ask, "Ask", localize("chatDescription", "Ask Copilot"));
  ChatMode2.Edit = new BuiltinChatMode(ChatModeKind.Edit, "Edit", localize("editsDescription", "Edit files in your workspace"));
  ChatMode2.Agent = new BuiltinChatMode(ChatModeKind.Agent, "Agent", localize("agentDescription", "Edit files in your workspace in agent mode"));
})(ChatMode || (ChatMode = {}));
function isBuiltinChatMode(mode) {
  return mode.id === ChatMode.Ask.id || mode.id === ChatMode.Edit.id || mode.id === ChatMode.Agent.id;
}
__name(isBuiltinChatMode, "isBuiltinChatMode");
export {
  BuiltinChatMode,
  ChatMode,
  ChatModeService,
  CustomChatMode,
  IChatModeService,
  isBuiltinChatMode
};
//# sourceMappingURL=chatModes.js.map
