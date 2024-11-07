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
import { IWorkbenchContribution, registerWorkbenchContribution2, WorkbenchPhase } from "../../../common/contributions.js";
import { Disposable, toDisposable } from "../../../../base/common/lifecycle.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { AuthenticationSession, IAuthenticationService } from "../../../services/authentication/common/authentication.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import { IExtensionManagementService } from "../../../../platform/extensionManagement/common/extensionManagement.js";
import { ExtensionIdentifier } from "../../../../platform/extensions/common/extensions.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { IRequestService, asText } from "../../../../platform/request/common/request.js";
import { CancellationTokenSource } from "../../../../base/common/cancellation.js";
import { ChatContextKeys } from "./chatContextKeys.js";
import { IStorageService, StorageScope, StorageTarget } from "../../../../platform/storage/common/storage.js";
import { IRequestContext } from "../../../../base/parts/request/common/request.js";
let ChatInstallEntitlementContribution = class extends Disposable {
  constructor(contextService, telemetryService, authenticationService, productService, extensionManagementService, extensionService, requestService, storageService) {
    super();
    this.contextService = contextService;
    this.telemetryService = telemetryService;
    this.authenticationService = authenticationService;
    this.productService = productService;
    this.extensionManagementService = extensionManagementService;
    this.extensionService = extensionService;
    this.requestService = requestService;
    this.storageService = storageService;
    if (!this.productService.gitHubEntitlement) {
      return;
    }
    this.checkExtensionInstallation();
    this.registerListeners();
  }
  static {
    __name(this, "ChatInstallEntitlementContribution");
  }
  static CHAT_EXTENSION_INSTALLED_KEY = "chat.extensionInstalled";
  chatInstallEntitledContextKey = ChatContextKeys.installEntitled.bindTo(this.contextService);
  resolvedEntitlement = void 0;
  async checkExtensionInstallation() {
    const extensions = await this.extensionManagementService.getInstalled();
    const installed = extensions.find((value) => ExtensionIdentifier.equals(value.identifier.id, this.productService.gitHubEntitlement?.extensionId));
    this.updateExtensionInstalled(installed ? true : false);
  }
  registerListeners() {
    this._register(this.extensionService.onDidChangeExtensions((result) => {
      for (const extension of result.removed) {
        if (ExtensionIdentifier.equals(this.productService.gitHubEntitlement?.extensionId, extension.identifier)) {
          this.updateExtensionInstalled(false);
          break;
        }
      }
      for (const extension of result.added) {
        if (ExtensionIdentifier.equals(this.productService.gitHubEntitlement?.extensionId, extension.identifier)) {
          this.updateExtensionInstalled(true);
          break;
        }
      }
    }));
    this._register(this.authenticationService.onDidChangeSessions(async (e) => {
      if (e.providerId === this.productService.gitHubEntitlement?.providerId) {
        if (e.event.added?.length) {
          this.resolveEntitlement(e.event.added[0]);
        } else if (e.event.removed?.length) {
          this.chatInstallEntitledContextKey.set(false);
        }
      }
    }));
    this._register(this.authenticationService.onDidRegisterAuthenticationProvider(async (e) => {
      if (e.id === this.productService.gitHubEntitlement?.providerId) {
        this.resolveEntitlement((await this.authenticationService.getSessions(e.id))[0]);
      }
    }));
  }
  async resolveEntitlement(session) {
    if (!session) {
      return;
    }
    const entitled = await this.doResolveEntitlement(session);
    this.chatInstallEntitledContextKey.set(entitled);
  }
  async doResolveEntitlement(session) {
    if (typeof this.resolvedEntitlement === "boolean") {
      return this.resolvedEntitlement;
    }
    const cts = new CancellationTokenSource();
    this._register(toDisposable(() => cts.dispose(true)));
    let context;
    try {
      context = await this.requestService.request({
        type: "GET",
        url: this.productService.gitHubEntitlement.entitlementUrl,
        headers: {
          "Authorization": `Bearer ${session.accessToken}`
        }
      }, cts.token);
    } catch (error) {
      return false;
    }
    if (context.res.statusCode && context.res.statusCode !== 200) {
      return false;
    }
    const result = await asText(context);
    if (!result) {
      return false;
    }
    let parsedResult;
    try {
      parsedResult = JSON.parse(result);
    } catch (err) {
      return false;
    }
    this.resolvedEntitlement = Boolean(parsedResult[this.productService.gitHubEntitlement.enablementKey]);
    this.telemetryService.publicLog2("chatInstallEntitlement", { entitled: this.resolvedEntitlement });
    return this.resolvedEntitlement;
  }
  updateExtensionInstalled(isExtensionInstalled) {
    this.storageService.store(ChatInstallEntitlementContribution.CHAT_EXTENSION_INSTALLED_KEY, isExtensionInstalled, StorageScope.PROFILE, StorageTarget.MACHINE);
  }
};
ChatInstallEntitlementContribution = __decorateClass([
  __decorateParam(0, IContextKeyService),
  __decorateParam(1, ITelemetryService),
  __decorateParam(2, IAuthenticationService),
  __decorateParam(3, IProductService),
  __decorateParam(4, IExtensionManagementService),
  __decorateParam(5, IExtensionService),
  __decorateParam(6, IRequestService),
  __decorateParam(7, IStorageService)
], ChatInstallEntitlementContribution);
registerWorkbenchContribution2("workbench.chat.installEntitlement", ChatInstallEntitlementContribution, WorkbenchPhase.BlockRestore);
//# sourceMappingURL=chatInstallEntitlement.contribution.js.map
