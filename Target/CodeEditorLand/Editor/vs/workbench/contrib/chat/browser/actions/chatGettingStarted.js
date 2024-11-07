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
import { IWorkbenchContribution } from "../../../../common/contributions.js";
import { Disposable } from "../../../../../base/common/lifecycle.js";
import { IProductService } from "../../../../../platform/product/common/productService.js";
import { ICommandService } from "../../../../../platform/commands/common/commands.js";
import { IExtensionService } from "../../../../services/extensions/common/extensions.js";
import { ExtensionIdentifier } from "../../../../../platform/extensions/common/extensions.js";
import { CHAT_OPEN_ACTION_ID } from "./chatActions.js";
import { IExtensionManagementService, InstallOperation } from "../../../../../platform/extensionManagement/common/extensionManagement.js";
let ChatGettingStartedContribution = class extends Disposable {
  constructor(productService, extensionService, commandService, extensionManagementService) {
    super();
    this.productService = productService;
    this.extensionService = extensionService;
    this.commandService = commandService;
    this.extensionManagementService = extensionManagementService;
    if (!this.productService.gitHubEntitlement) {
      return;
    }
    this.registerListeners();
  }
  static {
    __name(this, "ChatGettingStartedContribution");
  }
  static ID = "workbench.contrib.chatGettingStarted";
  recentlyInstalled = false;
  registerListeners() {
    this._register(this.extensionManagementService.onDidInstallExtensions(async (result) => {
      for (const e of result) {
        if (ExtensionIdentifier.equals(this.productService.gitHubEntitlement.extensionId, e.identifier.id) && e.operation === InstallOperation.Install) {
          this.recentlyInstalled = true;
          return;
        }
      }
    }));
    this._register(this.extensionService.onDidChangeExtensionsStatus(async (event) => {
      for (const ext of event) {
        if (ExtensionIdentifier.equals(this.productService.gitHubEntitlement.extensionId, ext.value)) {
          const extensionStatus = this.extensionService.getExtensionsStatus();
          if (extensionStatus[ext.value].activationTimes && this.recentlyInstalled) {
            await this.commandService.executeCommand(CHAT_OPEN_ACTION_ID);
            this.recentlyInstalled = false;
            return;
          }
        }
      }
    }));
  }
};
ChatGettingStartedContribution = __decorateClass([
  __decorateParam(0, IProductService),
  __decorateParam(1, IExtensionService),
  __decorateParam(2, ICommandService),
  __decorateParam(3, IExtensionManagementService)
], ChatGettingStartedContribution);
export {
  ChatGettingStartedContribution
};
//# sourceMappingURL=chatGettingStarted.js.map
