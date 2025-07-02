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
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { derived, observableFromEvent, ObservableMap } from "../../../../base/common/observable.js";
import { isObject } from "../../../../base/common/types.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { observableMemento } from "../../../../platform/observable/common/observableMemento.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ChatModeKind } from "../common/constants.js";
import { ILanguageModelToolsService, ToolSet } from "../common/languageModelToolsService.js";
import { PromptFileRewriter } from "./promptSyntax/promptFileRewriter.js";
var ToolsScope;
(function(ToolsScope2) {
  ToolsScope2[ToolsScope2["Global"] = 0] = "Global";
  ToolsScope2[ToolsScope2["Session"] = 1] = "Session";
  ToolsScope2[ToolsScope2["Mode"] = 2] = "Mode";
})(ToolsScope || (ToolsScope = {}));
let ChatSelectedTools = class ChatSelectedTools2 extends Disposable {
  static {
    __name(this, "ChatSelectedTools");
  }
  constructor(_mode, _toolsService, _storageService, _instantiationService) {
    super();
    this._mode = _mode;
    this._toolsService = _toolsService;
    this._instantiationService = _instantiationService;
    this._sessionStates = new ObservableMap();
    this.entries = this.entriesMap.map(function(value) {
      const result = /* @__PURE__ */ new Set();
      for (const [item, enabled] of value) {
        if (enabled) {
          result.add(item);
        }
      }
      return result;
    });
    const storedTools = observableMemento({
      defaultValue: /* @__PURE__ */ new Map(),
      toStorage: /* @__PURE__ */ __name((value) => {
        const data = {
          disabledToolSets: [],
          disabledTools: []
        };
        for (const [item, enabled] of value) {
          if (!enabled) {
            if (item instanceof ToolSet) {
              data.disabledToolSets.push(item.id);
            } else {
              data.disabledTools.push(item.id);
            }
          }
        }
        return JSON.stringify(data);
      }, "toStorage"),
      fromStorage: /* @__PURE__ */ __name((value) => {
        const obj = JSON.parse(value);
        const map = /* @__PURE__ */ new Map();
        if (!obj || !isObject(obj)) {
          return map;
        }
        if (Array.isArray(obj.disabledToolSets)) {
          for (const toolSetId of obj.disabledToolSets) {
            const toolset = this._toolsService.getToolSet(toolSetId);
            if (toolset) {
              map.set(toolset, false);
            }
          }
        }
        if (Array.isArray(obj.disabledTools)) {
          for (const toolId of obj.disabledTools) {
            const tool = this._toolsService.getTool(toolId);
            if (tool) {
              map.set(tool, false);
            }
          }
        }
        return map;
      }, "fromStorage"),
      key: "chat/selectedTools"
    });
    this._selectedTools = this._store.add(storedTools(1, 1, _storageService));
    this._allTools = observableFromEvent(_toolsService.onDidChangeTools, () => Array.from(_toolsService.getTools()));
  }
  /**
   * All tools and tool sets with their enabled state.
   */
  get entriesMap() {
    return derived((r) => {
      const currentMode = this._mode.read(r);
      let currentMap = this._sessionStates.get(currentMode.id);
      let defaultEnablement = false;
      if (!currentMap && currentMode.kind === ChatModeKind.Agent && currentMode.customTools) {
        currentMap = this._toolsService.toToolAndToolSetEnablementMap(new Set(currentMode.customTools.read(r)));
      }
      if (!currentMap) {
        currentMap = this._selectedTools.read(r);
        defaultEnablement = true;
      }
      const map = /* @__PURE__ */ new Map();
      const tools = this._allTools.read(r).filter((t) => t.canBeReferencedInPrompt);
      for (const tool of tools) {
        map.set(tool, currentMap.get(tool) ?? defaultEnablement);
      }
      const toolSets = this._toolsService.toolSets.read(r);
      for (const toolSet of toolSets) {
        map.set(toolSet, currentMap.get(toolSet) ?? defaultEnablement);
      }
      return map;
    });
  }
  get entriesScope() {
    const mode = this._mode.get();
    if (this._sessionStates.has(mode.id)) {
      return ToolsScope.Session;
    }
    if (mode.kind === ChatModeKind.Agent && mode.customTools && mode.uri) {
      return ToolsScope.Mode;
    }
    return ToolsScope.Global;
  }
  get currentMode() {
    return this._mode.get();
  }
  resetSessionEnablementState() {
    const mode = this._mode.get();
    this._sessionStates.delete(mode.id);
  }
  set(enablementMap, sessionOnly) {
    const mode = this._mode.get();
    if (sessionOnly) {
      this._sessionStates.set(mode.id, enablementMap);
      return;
    }
    if (this._sessionStates.has(mode.id)) {
      this._sessionStates.set(mode.id, enablementMap);
      return;
    }
    if (mode.kind === ChatModeKind.Agent && mode.customTools && mode.uri) {
      this.updateCustomModeTools(mode.uri.get(), enablementMap);
      return;
    }
    this._selectedTools.set(enablementMap, void 0);
  }
  async updateCustomModeTools(uri, enablementMap) {
    await this._instantiationService.createInstance(PromptFileRewriter).openAndRewriteTools(uri, enablementMap, CancellationToken.None);
  }
  asEnablementMap() {
    const result = /* @__PURE__ */ new Map();
    const map = this.entriesMap.get();
    const _set = /* @__PURE__ */ __name((tool, enabled) => {
      const enabledNow = result.get(tool);
      if (enabled || !enabledNow) {
        result.set(tool, enabled);
      }
    }, "_set");
    for (const [item, enabled] of map) {
      if (item instanceof ToolSet) {
        for (const tool of item.getTools()) {
          const toolEnabled = item.source.type === "mcp" ? map.get(tool) ?? enabled : enabled;
          _set(tool, toolEnabled);
        }
      } else {
        if (item.canBeReferencedInPrompt) {
          _set(item, enabled);
        }
      }
    }
    return result;
  }
};
ChatSelectedTools = __decorate([
  __param(1, ILanguageModelToolsService),
  __param(2, IStorageService),
  __param(3, IInstantiationService)
], ChatSelectedTools);
export {
  ChatSelectedTools,
  ToolsScope
};
//# sourceMappingURL=chatSelectedTools.js.map
