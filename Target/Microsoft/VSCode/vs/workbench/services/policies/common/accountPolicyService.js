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
import { equals } from "../../../../base/common/objects.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { AbstractPolicyService } from "../../../../platform/policy/common/policy.js";
import { IDefaultAccountService } from "../../accounts/common/defaultAccount.js";
let AccountPolicyService = class AccountPolicyService2 extends AbstractPolicyService {
  static {
    __name(this, "AccountPolicyService");
  }
  constructor(logService, defaultAccountService) {
    super();
    this.logService = logService;
    this.defaultAccountService = defaultAccountService;
    this.accountPolicy = {
      chatPreviewFeaturesEnabled: true,
      mcpEnabled: true
    };
    this.defaultAccountService.getDefaultAccount().then((account) => {
      this._update({
        chatPreviewFeaturesEnabled: account?.chat_preview_features_enabled ?? true,
        mcpEnabled: account?.mcp ?? true
      });
      this._register(this.defaultAccountService.onDidChangeDefaultAccount((account2) => this._update({
        chatPreviewFeaturesEnabled: account2?.chat_preview_features_enabled ?? true,
        mcpEnabled: account2?.mcp ?? true
      })));
    });
  }
  _update(updatedPolicy) {
    if (!equals(this.accountPolicy, updatedPolicy)) {
      this.accountPolicy = updatedPolicy;
      this._updatePolicyDefinitions(this.policyDefinitions);
    }
  }
  async _updatePolicyDefinitions(policyDefinitions) {
    this.logService.trace(`AccountPolicyService#_updatePolicyDefinitions: Got ${Object.keys(policyDefinitions).length} policy definitions`);
    const updated = [];
    const updateIfNeeded = /* @__PURE__ */ __name((key, policy, isFeatureEnabled) => {
      if (isFeatureEnabled) {
        if (this.policies.has(key)) {
          this.policies.delete(key);
          updated.push(key);
        }
      } else {
        const updatedValue = policy.defaultValue === void 0 ? false : policy.defaultValue;
        if (this.policies.get(key) !== updatedValue) {
          this.policies.set(key, updatedValue);
          updated.push(key);
        }
      }
    }, "updateIfNeeded");
    for (const key in policyDefinitions) {
      const policy = policyDefinitions[key];
      if (policy.previewFeature) {
        updateIfNeeded(key, policy, this.accountPolicy?.chatPreviewFeaturesEnabled);
      } else if (key === "ChatMCP") {
        updateIfNeeded(key, policy, this.accountPolicy?.mcpEnabled);
      }
    }
    if (updated.length) {
      this._onDidChange.fire(updated);
    }
  }
};
AccountPolicyService = __decorate([
  __param(0, ILogService),
  __param(1, IDefaultAccountService)
], AccountPolicyService);
export {
  AccountPolicyService
};
//# sourceMappingURL=accountPolicyService.js.map
