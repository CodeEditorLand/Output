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
import { Event } from "../../../../../base/common/event.js";
import { DisposableStore, IDisposable } from "../../../../../base/common/lifecycle.js";
import { localize, localize2 } from "../../../../../nls.js";
import { Action2 } from "../../../../../platform/actions/common/actions.js";
import { IInstantiationService, ServicesAccessor } from "../../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../../platform/log/common/log.js";
import { IQuickInputService, IQuickPick, IQuickPickItem, QuickPickInput } from "../../../../../platform/quickinput/common/quickInput.js";
import { IAccountUsage, IAuthenticationUsageService } from "../../../../services/authentication/browser/authenticationUsageService.js";
import { AuthenticationSessionAccount, IAuthenticationExtensionsService, IAuthenticationService } from "../../../../services/authentication/common/authentication.js";
import { IExtensionService } from "../../../../services/extensions/common/extensions.js";
class ManageAccountPreferencesForExtensionAction extends Action2 {
  static {
    __name(this, "ManageAccountPreferencesForExtensionAction");
  }
  constructor() {
    super({
      id: "_manageAccountPreferencesForExtension",
      title: localize2("manageAccountPreferenceForExtension", "Manage Extension Account Preferences"),
      category: localize2("accounts", "Accounts"),
      f1: false
    });
  }
  run(accessor, extensionId, providerId) {
    return accessor.get(IInstantiationService).createInstance(ManageAccountPreferenceForExtensionActionImpl).run(extensionId, providerId);
  }
}
let ManageAccountPreferenceForExtensionActionImpl = class {
  constructor(_authenticationService, _quickInputService, _authenticationUsageService, _authenticationExtensionsService, _extensionService, _logService) {
    this._authenticationService = _authenticationService;
    this._quickInputService = _quickInputService;
    this._authenticationUsageService = _authenticationUsageService;
    this._authenticationExtensionsService = _authenticationExtensionsService;
    this._extensionService = _extensionService;
    this._logService = _logService;
  }
  static {
    __name(this, "ManageAccountPreferenceForExtensionActionImpl");
  }
  async run(extensionId, providerId) {
    if (!extensionId) {
      return;
    }
    const extension = await this._extensionService.getExtension(extensionId);
    if (!extension) {
      throw new Error(`No extension with id ${extensionId}`);
    }
    const providerIds = new Array();
    const providerIdToAccounts = /* @__PURE__ */ new Map();
    if (providerId) {
      providerIds.push(providerId);
      providerIdToAccounts.set(providerId, await this._authenticationService.getAccounts(providerId));
    } else {
      for (const providerId2 of this._authenticationService.getProviderIds()) {
        const accounts2 = await this._authenticationService.getAccounts(providerId2);
        for (const account of accounts2) {
          const usage = this._authenticationUsageService.readAccountUsages(providerId2, account.label).find((u) => u.extensionId === extensionId.toLowerCase());
          if (usage) {
            providerIds.push(providerId2);
            providerIdToAccounts.set(providerId2, accounts2);
            break;
          }
        }
      }
    }
    let chosenProviderId = providerIds[0];
    if (providerIds.length > 1) {
      const result = await this._quickInputService.pick(
        providerIds.map((providerId2) => ({
          label: this._authenticationService.getProvider(providerId2).label,
          id: providerId2
        })),
        {
          placeHolder: localize("selectProvider", "Select an authentication provider to manage account preferences for"),
          title: localize("pickAProviderTitle", "Manage Extension Account Preferences")
        }
      );
      chosenProviderId = result?.id;
    }
    if (!chosenProviderId) {
      return;
    }
    const currentAccountNamePreference = this._authenticationExtensionsService.getAccountPreference(extensionId, chosenProviderId);
    const accounts = providerIdToAccounts.get(chosenProviderId);
    const items = this._getItems(accounts, chosenProviderId, currentAccountNamePreference);
    const provider = this._authenticationService.getProvider(chosenProviderId);
    if (provider.supportsMultipleAccounts) {
      const lastUsedScopes = accounts.flatMap((account) => this._authenticationUsageService.readAccountUsages(chosenProviderId, account.label).find((u) => u.extensionId === extensionId.toLowerCase())).filter((usage) => !!usage).sort((a, b) => b.lastUsed - a.lastUsed)?.[0]?.scopes;
      if (lastUsedScopes) {
        items.push({ type: "separator" });
        items.push({
          providerId: chosenProviderId,
          scopes: lastUsedScopes,
          label: localize("use new account", "Use a new account...")
        });
      }
    }
    const disposables = new DisposableStore();
    const picker = this._createQuickPick(disposables, extensionId, extension.displayName ?? extension.name);
    if (items.length === 0) {
      disposables.add(this._handleNoAccounts(picker));
      return;
    }
    picker.items = items;
    picker.show();
  }
  _createQuickPick(disposableStore, extensionId, extensionLabel) {
    const picker = disposableStore.add(this._quickInputService.createQuickPick({ useSeparators: true }));
    disposableStore.add(picker.onDidHide(() => {
      disposableStore.dispose();
    }));
    picker.placeholder = localize("placeholder", "Manage '{0}' account preferences...", extensionLabel);
    picker.title = localize("title", "'{0}' Account Preferences For This Workspace", extensionLabel);
    picker.sortByLabel = false;
    disposableStore.add(picker.onDidAccept(async () => {
      picker.hide();
      await this._accept(extensionId, picker.selectedItems);
    }));
    return picker;
  }
  _getItems(accounts, providerId, currentAccountNamePreference) {
    return accounts.map(
      (a) => currentAccountNamePreference === a.label ? {
        label: a.label,
        account: a,
        providerId,
        description: localize("currentAccount", "Current account"),
        picked: true
      } : {
        label: a.label,
        account: a,
        providerId
      }
    );
  }
  _handleNoAccounts(picker) {
    picker.validationMessage = localize("noAccounts", "No accounts are currently used by this extension.");
    picker.buttons = [this._quickInputService.backButton];
    picker.show();
    return Event.filter(picker.onDidTriggerButton, (e) => e === this._quickInputService.backButton)(() => this.run());
  }
  async _accept(extensionId, selectedItems) {
    for (const item of selectedItems) {
      let account;
      if (!item.account) {
        try {
          const session = await this._authenticationService.createSession(item.providerId, item.scopes);
          account = session.account;
        } catch (e) {
          this._logService.error(e);
          continue;
        }
      } else {
        account = item.account;
      }
      const providerId = item.providerId;
      const currentAccountName = this._authenticationExtensionsService.getAccountPreference(extensionId, providerId);
      if (currentAccountName === account.label) {
        continue;
      }
      this._authenticationExtensionsService.updateAccountPreference(extensionId, providerId, account);
    }
  }
};
ManageAccountPreferenceForExtensionActionImpl = __decorateClass([
  __decorateParam(0, IAuthenticationService),
  __decorateParam(1, IQuickInputService),
  __decorateParam(2, IAuthenticationUsageService),
  __decorateParam(3, IAuthenticationExtensionsService),
  __decorateParam(4, IExtensionService),
  __decorateParam(5, ILogService)
], ManageAccountPreferenceForExtensionActionImpl);
export {
  ManageAccountPreferencesForExtensionAction
};
//# sourceMappingURL=manageAccountPreferencesForExtensionAction.js.map
