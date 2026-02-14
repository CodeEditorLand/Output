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
var TipEligibilityTracker_1, ChatTipService_1;
import { Emitter } from "../../../../base/common/event.js";
import { MarkdownString } from "../../../../base/common/htmlContent.js";
import { ContextKeyExpr } from "../../../../platform/contextkey/common/contextkey.js";
import { createDecorator, IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import { ChatContextKeys } from "../common/actions/chatContextKeys.js";
import { ChatAgentLocation, ChatModeKind } from "../common/constants.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { Disposable, MutableDisposable } from "../../../../base/common/lifecycle.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { AgentFileType, IPromptsService } from "../common/promptSyntax/service/promptsService.js";
import { PromptsType } from "../common/promptSyntax/promptTypes.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { localize } from "../../../../nls.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { ILanguageModelToolsService } from "../common/tools/languageModelToolsService.js";
const IChatTipService = createDecorator("chatTipService");
const TIP_CATALOG = [
  {
    id: "tip.agentMode",
    message: localize("tip.agentMode", "Tip: Try [Agents](command:workbench.action.chat.openEditSession) to make edits across your project and run commands."),
    when: ChatContextKeys.chatModeKind.notEqualsTo(ChatModeKind.Agent),
    enabledCommands: ["workbench.action.chat.openEditSession"],
    excludeWhenModesUsed: [ChatModeKind.Agent]
  },
  {
    id: "tip.planMode",
    message: localize("tip.planMode", "Tip: Try the [Plan agent](command:workbench.action.chat.openPlan) to research and plan before implementing changes."),
    when: ChatContextKeys.chatModeName.notEqualsTo("Plan"),
    enabledCommands: ["workbench.action.chat.openPlan"],
    excludeWhenModesUsed: ["Plan"]
  },
  {
    id: "tip.attachFiles",
    message: localize("tip.attachFiles", "Tip: Reference files or folders with # to give the agent more context about the task."),
    excludeWhenCommandsExecuted: ["workbench.action.chat.attachContext", "workbench.action.chat.attachFile", "workbench.action.chat.attachFolder", "workbench.action.chat.attachSelection"]
  },
  {
    id: "tip.codeActions",
    message: localize("tip.codeActions", "Tip: Select a code block in the editor and right-click to access more AI actions."),
    excludeWhenCommandsExecuted: ["inlineChat.start"]
  },
  {
    id: "tip.undoChanges",
    message: localize("tip.undoChanges", "Tip: Select Restore Checkpoint to undo changes until that point in the chat conversation."),
    when: ContextKeyExpr.or(ChatContextKeys.chatModeKind.isEqualTo(ChatModeKind.Agent), ChatContextKeys.chatModeKind.isEqualTo(ChatModeKind.Edit)),
    excludeWhenCommandsExecuted: ["workbench.action.chat.restoreCheckpoint", "workbench.action.chat.restoreLastCheckpoint"]
  },
  {
    id: "tip.customInstructions",
    message: localize("tip.customInstructions", "Tip: [Generate workspace instructions](command:workbench.action.chat.generateInstructions) to give the agent relevant project-specific context when starting a task."),
    enabledCommands: ["workbench.action.chat.generateInstructions"],
    excludeWhenPromptFilesExist: { promptType: PromptsType.instructions, agentFileType: AgentFileType.copilotInstructionsMd, excludeUntilChecked: true }
  },
  {
    id: "tip.customAgent",
    message: localize("tip.customAgent", "Tip: [Create a custom agent](command:workbench.command.new.agent) to define reusable personas with tailored instructions and tools for your workflow."),
    when: ChatContextKeys.chatModeKind.isEqualTo(ChatModeKind.Agent),
    enabledCommands: ["workbench.command.new.agent"],
    excludeWhenCommandsExecuted: ["workbench.command.new.agent"],
    excludeWhenPromptFilesExist: { promptType: PromptsType.agent, excludeUntilChecked: true }
  },
  {
    id: "tip.skill",
    message: localize("tip.skill", "Tip: [Create a skill](command:workbench.command.new.skill) to apply domain-specific workflows and instructions, only when needed."),
    when: ChatContextKeys.chatModeKind.isEqualTo(ChatModeKind.Agent),
    enabledCommands: ["workbench.command.new.skill"],
    excludeWhenCommandsExecuted: ["workbench.command.new.skill"],
    excludeWhenPromptFilesExist: { promptType: PromptsType.skill, excludeUntilChecked: true }
  },
  {
    id: "tip.messageQueueing",
    message: localize("tip.messageQueueing", "Tip: Send follow-up and steering messages while the agent is working. They'll be queued and processed in order."),
    when: ChatContextKeys.chatModeKind.isEqualTo(ChatModeKind.Agent),
    excludeWhenCommandsExecuted: ["workbench.action.chat.queueMessage", "workbench.action.chat.steerWithMessage"]
  },
  {
    id: "tip.yoloMode",
    message: localize("tip.yoloMode", "Tip: Enable [auto approve](command:workbench.action.openSettings?%5B%22chat.tools.global.autoApprove%22%5D) to give the agent full control without manual confirmation."),
    when: ContextKeyExpr.and(ChatContextKeys.chatModeKind.isEqualTo(ChatModeKind.Agent), ContextKeyExpr.notEquals("config.chat.tools.global.autoApprove", true)),
    enabledCommands: ["workbench.action.openSettings"]
  },
  {
    id: "tip.mermaid",
    message: localize("tip.mermaid", "Tip: Ask the agent to draw an architectural diagram or flow chart; it can render Mermaid diagrams directly in chat."),
    when: ChatContextKeys.chatModeKind.isEqualTo(ChatModeKind.Agent),
    excludeWhenToolsInvoked: ["renderMermaidDiagram"]
  },
  {
    id: "tip.subagents",
    message: localize("tip.subagents", "Tip: Ask the agent to work in parallel to complete large tasks faster."),
    when: ChatContextKeys.chatModeKind.isEqualTo(ChatModeKind.Agent),
    excludeWhenToolsInvoked: ["runSubagent"]
  },
  {
    id: "tip.contextUsage",
    message: localize("tip.contextUsage", "Tip: [View your context window usage](command:workbench.action.chat.showContextUsage) to see how many tokens are used and what's consuming them."),
    when: ContextKeyExpr.and(ChatContextKeys.chatModeKind.isEqualTo(ChatModeKind.Agent), ChatContextKeys.contextUsageHasBeenOpened.negate(), ChatContextKeys.chatSessionIsEmpty.negate()),
    enabledCommands: ["workbench.action.chat.showContextUsage"],
    excludeWhenCommandsExecuted: ["workbench.action.chat.showContextUsage"]
  },
  {
    id: "tip.sendToNewChat",
    message: localize("tip.sendToNewChat", "Tip: Use [Send to New Chat](command:workbench.action.chat.sendToNewChat) to start a new conversation with a clean context window."),
    when: ChatContextKeys.chatSessionIsEmpty.negate(),
    enabledCommands: ["workbench.action.chat.sendToNewChat"],
    excludeWhenCommandsExecuted: ["workbench.action.chat.sendToNewChat"]
  }
];
let TipEligibilityTracker = class TipEligibilityTracker2 extends Disposable {
  static {
    __name(this, "TipEligibilityTracker");
  }
  static {
    TipEligibilityTracker_1 = this;
  }
  static {
    this._COMMANDS_STORAGE_KEY = "chat.tips.executedCommands";
  }
  static {
    this._MODES_STORAGE_KEY = "chat.tips.usedModes";
  }
  static {
    this._TOOLS_STORAGE_KEY = "chat.tips.invokedTools";
  }
  constructor(tips, commandService, _storageService, _promptsService, _languageModelToolsService, _logService) {
    super();
    this._storageService = _storageService;
    this._promptsService = _promptsService;
    this._languageModelToolsService = _languageModelToolsService;
    this._logService = _logService;
    this._commandListener = this._register(new MutableDisposable());
    this._toolListener = this._register(new MutableDisposable());
    this._excludedByFiles = /* @__PURE__ */ new Set();
    this._fileCheckGeneration = /* @__PURE__ */ new Map();
    const storedCmds = this._storageService.get(
      TipEligibilityTracker_1._COMMANDS_STORAGE_KEY,
      1
      /* StorageScope.WORKSPACE */
    );
    this._executedCommands = new Set(storedCmds ? JSON.parse(storedCmds) : []);
    const storedModes = this._storageService.get(
      TipEligibilityTracker_1._MODES_STORAGE_KEY,
      1
      /* StorageScope.WORKSPACE */
    );
    this._usedModes = new Set(storedModes ? JSON.parse(storedModes) : []);
    const storedTools = this._storageService.get(
      TipEligibilityTracker_1._TOOLS_STORAGE_KEY,
      1
      /* StorageScope.WORKSPACE */
    );
    this._invokedTools = new Set(storedTools ? JSON.parse(storedTools) : []);
    this._pendingCommands = /* @__PURE__ */ new Set();
    for (const tip of tips) {
      for (const cmd of tip.excludeWhenCommandsExecuted ?? []) {
        if (!this._executedCommands.has(cmd)) {
          this._pendingCommands.add(cmd);
        }
      }
    }
    this._pendingModes = /* @__PURE__ */ new Set();
    for (const tip of tips) {
      for (const mode of tip.excludeWhenModesUsed ?? []) {
        if (!this._usedModes.has(mode)) {
          this._pendingModes.add(mode);
        }
      }
    }
    this._pendingTools = /* @__PURE__ */ new Set();
    for (const tip of tips) {
      for (const toolId of tip.excludeWhenToolsInvoked ?? []) {
        if (!this._invokedTools.has(toolId)) {
          this._pendingTools.add(toolId);
        }
      }
    }
    if (this._pendingCommands.size > 0) {
      this._commandListener.value = commandService.onDidExecuteCommand((e) => {
        if (this._pendingCommands.has(e.commandId)) {
          this._executedCommands.add(e.commandId);
          this._persistSet(TipEligibilityTracker_1._COMMANDS_STORAGE_KEY, this._executedCommands);
          this._pendingCommands.delete(e.commandId);
          if (this._pendingCommands.size === 0) {
            this._commandListener.clear();
          }
        }
      });
    }
    if (this._pendingTools.size > 0) {
      this._toolListener.value = this._languageModelToolsService.onDidInvokeTool((e) => {
        if (this._pendingTools.has(e.toolId)) {
          this._invokedTools.add(e.toolId);
          this._pendingTools.delete(e.toolId);
          this._persistSet(TipEligibilityTracker_1._TOOLS_STORAGE_KEY, this._invokedTools);
        }
        if (this._pendingTools.size === 0) {
          this._toolListener.clear();
        }
      });
    }
    this._tipsWithFileExclusions = tips.filter((t) => t.excludeWhenPromptFilesExist);
    for (const tip of this._tipsWithFileExclusions) {
      if (tip.excludeWhenPromptFilesExist.excludeUntilChecked) {
        this._excludedByFiles.add(tip.id);
      }
      this._checkForPromptFiles(tip);
    }
    this._register(this._promptsService.onDidChangeCustomAgents(() => {
      for (const tip of this._tipsWithFileExclusions) {
        if (tip.excludeWhenPromptFilesExist.promptType === PromptsType.agent) {
          this._checkForPromptFiles(tip);
        }
      }
    }));
  }
  /**
   * Records the current chat mode (kind + name) so future tip eligibility
   * checks can exclude mode-related tips. No-ops once all tracked modes
   * have been observed.
   */
  recordCurrentMode(contextKeyService) {
    if (this._pendingModes.size === 0) {
      return;
    }
    let changed = false;
    const kind = contextKeyService.getContextKeyValue(ChatContextKeys.chatModeKind.key);
    if (kind && !this._usedModes.has(kind)) {
      this._usedModes.add(kind);
      this._pendingModes.delete(kind);
      changed = true;
    }
    const name = contextKeyService.getContextKeyValue(ChatContextKeys.chatModeName.key);
    if (name && !this._usedModes.has(name)) {
      this._usedModes.add(name);
      this._pendingModes.delete(name);
      changed = true;
    }
    if (changed) {
      this._persistSet(TipEligibilityTracker_1._MODES_STORAGE_KEY, this._usedModes);
    }
  }
  /**
   * Returns `true` when the tip should be **excluded** from the eligible set.
   */
  isExcluded(tip) {
    if (tip.excludeWhenCommandsExecuted) {
      for (const cmd of tip.excludeWhenCommandsExecuted) {
        if (this._executedCommands.has(cmd)) {
          this._logService.debug("#ChatTips: tip excluded because command was executed", tip.id, cmd);
          return true;
        }
      }
    }
    if (tip.excludeWhenModesUsed) {
      for (const mode of tip.excludeWhenModesUsed) {
        if (this._usedModes.has(mode)) {
          this._logService.debug("#ChatTips: tip excluded because mode was used", tip.id, mode);
          return true;
        }
      }
    }
    if (tip.excludeWhenToolsInvoked) {
      for (const toolId of tip.excludeWhenToolsInvoked) {
        if (this._invokedTools.has(toolId)) {
          this._logService.debug("#ChatTips: tip excluded because tool was invoked", tip.id, toolId);
          return true;
        }
      }
    }
    if (tip.excludeWhenPromptFilesExist && this._excludedByFiles.has(tip.id)) {
      this._logService.debug("#ChatTips: tip excluded because prompt files exist", tip.id);
      return true;
    }
    return false;
  }
  async _checkForPromptFiles(tip) {
    const config = tip.excludeWhenPromptFilesExist;
    const generation = (this._fileCheckGeneration.get(tip.id) ?? 0) + 1;
    this._fileCheckGeneration.set(tip.id, generation);
    try {
      const [promptFiles, agentInstructions] = await Promise.all([
        this._promptsService.listPromptFiles(config.promptType, CancellationToken.None),
        config.agentFileType ? this._promptsService.listAgentInstructions(CancellationToken.None) : Promise.resolve([])
      ]);
      if (this._fileCheckGeneration.get(tip.id) !== generation) {
        return;
      }
      const hasPromptFiles = promptFiles.length > 0;
      const hasAgentFile = config.agentFileType ? agentInstructions.some((f) => f.type === config.agentFileType) : false;
      if (hasPromptFiles || hasAgentFile) {
        this._excludedByFiles.add(tip.id);
      } else {
        this._excludedByFiles.delete(tip.id);
      }
    } catch {
      if (this._fileCheckGeneration.get(tip.id) !== generation) {
        return;
      }
      if (config.excludeUntilChecked) {
        this._excludedByFiles.add(tip.id);
      }
    }
  }
  _persistSet(key, set) {
    this._storageService.store(
      key,
      JSON.stringify([...set]),
      1,
      1
      /* StorageTarget.MACHINE */
    );
  }
};
TipEligibilityTracker = TipEligibilityTracker_1 = __decorate([
  __param(1, ICommandService),
  __param(2, IStorageService),
  __param(3, IPromptsService),
  __param(4, ILanguageModelToolsService),
  __param(5, ILogService)
], TipEligibilityTracker);
let ChatTipService = class ChatTipService2 extends Disposable {
  static {
    __name(this, "ChatTipService");
  }
  static {
    ChatTipService_1 = this;
  }
  static {
    this._DISMISSED_TIP_KEY = "chat.tip.dismissed";
  }
  static {
    this._LAST_TIP_ID_KEY = "chat.tip.lastTipId";
  }
  constructor(_productService, _configurationService, _storageService, instantiationService, _logService) {
    super();
    this._productService = _productService;
    this._configurationService = _configurationService;
    this._storageService = _storageService;
    this._logService = _logService;
    this._onDidDismissTip = this._register(new Emitter());
    this.onDidDismissTip = this._onDidDismissTip.event;
    this._onDidNavigateTip = this._register(new Emitter());
    this.onDidNavigateTip = this._onDidNavigateTip.event;
    this._onDidHideTip = this._register(new Emitter());
    this.onDidHideTip = this._onDidHideTip.event;
    this._onDidDisableTips = this._register(new Emitter());
    this.onDidDisableTips = this._onDidDisableTips.event;
    this._sessionStartedAt = Date.now();
    this._hasShownRequestTip = false;
    this._tracker = this._register(instantiationService.createInstance(TipEligibilityTracker, TIP_CATALOG));
  }
  resetSession() {
    this._hasShownRequestTip = false;
    this._shownTip = void 0;
    this._tipRequestId = void 0;
    this._sessionStartedAt = Date.now();
  }
  dismissTip() {
    if (this._shownTip) {
      const dismissed = this._getDismissedTipIds();
      dismissed.push(this._shownTip.id);
      this._storageService.store(
        ChatTipService_1._DISMISSED_TIP_KEY,
        JSON.stringify(dismissed),
        0,
        1
        /* StorageTarget.MACHINE */
      );
    }
    this._hasShownRequestTip = false;
    this._shownTip = void 0;
    this._tipRequestId = void 0;
    this._onDidDismissTip.fire();
  }
  _getDismissedTipIds() {
    const raw = this._storageService.get(
      ChatTipService_1._DISMISSED_TIP_KEY,
      0
      /* StorageScope.PROFILE */
    );
    if (!raw) {
      return [];
    }
    try {
      const parsed = JSON.parse(raw);
      this._logService.debug("#ChatTips dismissed:", parsed);
      if (!Array.isArray(parsed)) {
        return [];
      }
      if (parsed.length >= TIP_CATALOG.length) {
        return [];
      }
      return parsed;
    } catch {
      return [];
    }
  }
  hideTip() {
    this._hasShownRequestTip = false;
    this._shownTip = void 0;
    this._tipRequestId = void 0;
    this._onDidHideTip.fire();
  }
  async disableTips() {
    this._hasShownRequestTip = false;
    this._shownTip = void 0;
    this._tipRequestId = void 0;
    await this._configurationService.updateValue("chat.tips.enabled", false);
    this._onDidDisableTips.fire();
  }
  getNextTip(requestId, requestTimestamp, contextKeyService) {
    if (!this._configurationService.getValue("chat.tips.enabled")) {
      return void 0;
    }
    if (!this._isCopilotEnabled()) {
      return void 0;
    }
    if (!this._isChatLocation(contextKeyService)) {
      return void 0;
    }
    if (this._tipRequestId === requestId && this._shownTip) {
      return this._createTip(this._shownTip);
    }
    if (this._hasShownRequestTip && this._tipRequestId && this._tipRequestId !== requestId) {
      this._shownTip = void 0;
      this._tipRequestId = void 0;
      this._onDidDismissTip.fire();
      return void 0;
    }
    if (this._hasShownRequestTip) {
      return void 0;
    }
    if (requestTimestamp < this._sessionStartedAt) {
      return void 0;
    }
    return this._pickTip(requestId, contextKeyService);
  }
  getWelcomeTip(contextKeyService) {
    if (!this._configurationService.getValue("chat.tips.enabled")) {
      return void 0;
    }
    if (!this._isCopilotEnabled()) {
      return void 0;
    }
    if (!this._isChatLocation(contextKeyService)) {
      return void 0;
    }
    if (this._tipRequestId === "welcome" && this._shownTip) {
      return this._createTip(this._shownTip);
    }
    const tip = this._pickTip("welcome", contextKeyService);
    return tip;
  }
  _pickTip(sourceId, contextKeyService) {
    this._tracker.recordCurrentMode(contextKeyService);
    const dismissedIds = new Set(this._getDismissedTipIds());
    let selectedTip;
    const lastTipId = this._storageService.get(
      ChatTipService_1._LAST_TIP_ID_KEY,
      0
      /* StorageScope.PROFILE */
    );
    const lastCatalogIndex = lastTipId ? TIP_CATALOG.findIndex((tip) => tip.id === lastTipId) : -1;
    const startIndex = lastCatalogIndex === -1 ? 0 : (lastCatalogIndex + 1) % TIP_CATALOG.length;
    for (let i = 0; i < TIP_CATALOG.length; i++) {
      const idx = (startIndex + i) % TIP_CATALOG.length;
      const candidate = TIP_CATALOG[idx];
      if (!dismissedIds.has(candidate.id) && this._isEligible(candidate, contextKeyService)) {
        selectedTip = candidate;
        break;
      }
    }
    if (!selectedTip) {
      for (let i = 0; i < TIP_CATALOG.length; i++) {
        const idx = (startIndex + i) % TIP_CATALOG.length;
        const candidate = TIP_CATALOG[idx];
        if (!dismissedIds.has(candidate.id)) {
          selectedTip = candidate;
          break;
        }
      }
    }
    if (!selectedTip) {
      selectedTip = TIP_CATALOG[startIndex];
    }
    this._storageService.store(
      ChatTipService_1._LAST_TIP_ID_KEY,
      selectedTip.id,
      0,
      0
      /* StorageTarget.USER */
    );
    this._hasShownRequestTip = sourceId !== "welcome";
    this._tipRequestId = sourceId;
    this._shownTip = selectedTip;
    return this._createTip(selectedTip);
  }
  navigateToNextTip(contextKeyService) {
    return this._navigateTip(1, contextKeyService);
  }
  navigateToPreviousTip(contextKeyService) {
    return this._navigateTip(-1, contextKeyService);
  }
  _navigateTip(direction, contextKeyService) {
    if (!this._shownTip) {
      return void 0;
    }
    const currentIndex = TIP_CATALOG.findIndex((t) => t.id === this._shownTip.id);
    if (currentIndex === -1) {
      return void 0;
    }
    const dismissedIds = new Set(this._getDismissedTipIds());
    for (let i = 1; i < TIP_CATALOG.length; i++) {
      const idx = ((currentIndex + direction * i) % TIP_CATALOG.length + TIP_CATALOG.length) % TIP_CATALOG.length;
      const candidate = TIP_CATALOG[idx];
      if (!dismissedIds.has(candidate.id) && this._isEligible(candidate, contextKeyService)) {
        this._shownTip = candidate;
        this._storageService.store(
          ChatTipService_1._LAST_TIP_ID_KEY,
          candidate.id,
          0,
          0
          /* StorageTarget.USER */
        );
        const tip = this._createTip(candidate);
        this._onDidNavigateTip.fire(tip);
        return tip;
      }
    }
    return void 0;
  }
  _isEligible(tip, contextKeyService) {
    if (tip.when && !contextKeyService.contextMatchesRules(tip.when)) {
      this._logService.debug("#ChatTips: tip is not eligible due to when clause", tip.id, tip.when.serialize());
      return false;
    }
    if (this._tracker.isExcluded(tip)) {
      return false;
    }
    this._logService.debug("#ChatTips: tip is eligible", tip.id);
    return true;
  }
  _isChatLocation(contextKeyService) {
    const location = contextKeyService.getContextKeyValue(ChatContextKeys.location.key);
    return !location || location === ChatAgentLocation.Chat;
  }
  _isCopilotEnabled() {
    const defaultChatAgent = this._productService.defaultChatAgent;
    return !!defaultChatAgent?.chatExtensionId;
  }
  _createTip(tipDef) {
    const markdown = new MarkdownString(tipDef.message, {
      isTrusted: tipDef.enabledCommands ? { enabledCommands: tipDef.enabledCommands } : false
    });
    return {
      id: tipDef.id,
      content: markdown,
      enabledCommands: tipDef.enabledCommands
    };
  }
};
ChatTipService = ChatTipService_1 = __decorate([
  __param(0, IProductService),
  __param(1, IConfigurationService),
  __param(2, IStorageService),
  __param(3, IInstantiationService),
  __param(4, ILogService)
], ChatTipService);
export {
  ChatTipService,
  IChatTipService,
  TipEligibilityTracker
};
//# sourceMappingURL=chatTipService.js.map
