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
import { Disposable } from "../../../../base/common/lifecycle.js";
import { localize } from "../../../../nls.js";
import { registerAction2 } from "../../../../platform/actions/common/actions.js";
import { CommandsRegistry } from "../../../../platform/commands/common/commands.js";
import { SyncDescriptor } from "../../../../platform/instantiation/common/descriptors.js";
import { Registry } from "../../../../platform/registry/common/platform.js";
import { registerWorkbenchContribution2 } from "../../../common/contributions.js";
import { SignOutOfAccountAction } from "./actions/signOutOfAccountAction.js";
import { IBrowserWorkbenchEnvironmentService } from "../../../services/environment/browser/environmentService.js";
import { Extensions } from "../../../services/extensionManagement/common/extensionFeatures.js";
import { ManageTrustedExtensionsForAccountAction } from "./actions/manageTrustedExtensionsForAccountAction.js";
import { ManageAccountPreferencesForExtensionAction } from "./actions/manageAccountPreferencesForExtensionAction.js";
import { IAuthenticationUsageService } from "../../../services/authentication/browser/authenticationUsageService.js";
import { ManageAccountPreferencesForMcpServerAction } from "./actions/manageAccountPreferencesForMcpServerAction.js";
import { ManageTrustedMcpServersForAccountAction } from "./actions/manageTrustedMcpServersForAccountAction.js";
import { RemoveDynamicAuthenticationProvidersAction } from "./actions/manageDynamicAuthenticationProvidersAction.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { IAuthenticationQueryService } from "../../../services/authentication/common/authenticationQuery.js";
import { IMcpRegistry } from "../../mcp/common/mcpRegistryTypes.js";
import { autorun } from "../../../../base/common/observable.js";
import { IAuthenticationService } from "../../../services/authentication/common/authentication.js";
import { Event } from "../../../../base/common/event.js";
const codeExchangeProxyCommand = CommandsRegistry.registerCommand("workbench.getCodeExchangeProxyEndpoints", function(accessor, _) {
  const environmentService = accessor.get(IBrowserWorkbenchEnvironmentService);
  return environmentService.options?.codeExchangeProxyEndpoints;
});
class AuthenticationDataRenderer extends Disposable {
  static {
    __name(this, "AuthenticationDataRenderer");
  }
  constructor() {
    super(...arguments);
    this.type = "table";
  }
  shouldRender(manifest) {
    return !!manifest.contributes?.authentication;
  }
  render(manifest) {
    const authentication = manifest.contributes?.authentication || [];
    if (!authentication.length) {
      return { data: { headers: [], rows: [] }, dispose: /* @__PURE__ */ __name(() => {
      }, "dispose") };
    }
    const headers = [
      localize("authenticationlabel", "Label"),
      localize("authenticationid", "ID"),
      localize("authenticationMcpAuthorizationServers", "MCP Authorization Servers")
    ];
    const rows = authentication.sort((a, b) => a.label.localeCompare(b.label)).map((auth) => {
      return [
        auth.label,
        auth.id,
        (auth.authorizationServerGlobs ?? []).join(",\n")
      ];
    });
    return {
      data: {
        headers,
        rows
      },
      dispose: /* @__PURE__ */ __name(() => {
      }, "dispose")
    };
  }
}
const extensionFeature = Registry.as(Extensions.ExtensionFeaturesRegistry).registerExtensionFeature({
  id: "authentication",
  label: localize("authentication", "Authentication"),
  access: {
    canToggle: false
  },
  renderer: new SyncDescriptor(AuthenticationDataRenderer)
});
class AuthenticationContribution extends Disposable {
  static {
    __name(this, "AuthenticationContribution");
  }
  static {
    this.ID = "workbench.contrib.authentication";
  }
  constructor() {
    super();
    this._register(codeExchangeProxyCommand);
    this._register(extensionFeature);
    this._registerActions();
  }
  _registerActions() {
    this._register(registerAction2(SignOutOfAccountAction));
    this._register(registerAction2(ManageTrustedExtensionsForAccountAction));
    this._register(registerAction2(ManageAccountPreferencesForExtensionAction));
    this._register(registerAction2(ManageTrustedMcpServersForAccountAction));
    this._register(registerAction2(ManageAccountPreferencesForMcpServerAction));
    this._register(registerAction2(RemoveDynamicAuthenticationProvidersAction));
  }
}
let AuthenticationUsageContribution = class AuthenticationUsageContribution2 {
  static {
    __name(this, "AuthenticationUsageContribution");
  }
  static {
    this.ID = "workbench.contrib.authenticationUsage";
  }
  constructor(_authenticationUsageService) {
    this._authenticationUsageService = _authenticationUsageService;
    this._initializeExtensionUsageCache();
  }
  async _initializeExtensionUsageCache() {
    await this._authenticationUsageService.initializeExtensionUsageCache();
  }
};
AuthenticationUsageContribution = __decorate([
  __param(0, IAuthenticationUsageService)
], AuthenticationUsageContribution);
let AuthenticationExtensionsContribution = class AuthenticationExtensionsContribution2 extends Disposable {
  static {
    __name(this, "AuthenticationExtensionsContribution");
  }
  static {
    this.ID = "workbench.contrib.authenticationExtensions";
  }
  constructor(_extensionService, _authenticationQueryService, _authenticationService) {
    super();
    this._extensionService = _extensionService;
    this._authenticationQueryService = _authenticationQueryService;
    this._authenticationService = _authenticationService;
    void this.run();
    this._register(this._extensionService.onDidChangeExtensions(this._onDidChangeExtensions, this));
    this._register(Event.any(this._authenticationService.onDidChangeDeclaredProviders, this._authenticationService.onDidRegisterAuthenticationProvider)(() => this._cleanupRemovedExtensions()));
  }
  async run() {
    await this._extensionService.whenInstalledExtensionsRegistered();
    this._cleanupRemovedExtensions();
  }
  _onDidChangeExtensions(delta) {
    if (delta.removed.length > 0) {
      this._cleanupRemovedExtensions(delta.removed);
    }
  }
  _cleanupRemovedExtensions(removedExtensions) {
    const extensionIdsToRemove = removedExtensions ? new Set(removedExtensions.map((e) => e.identifier.value)) : new Set(this._extensionService.extensions.map((e) => e.identifier.value));
    const isTargetedCleanup = !!removedExtensions;
    const providerIds = this._authenticationQueryService.getProviderIds();
    for (const providerId of providerIds) {
      this._authenticationQueryService.provider(providerId).forEachAccount((account) => {
        account.extensions().forEach((extension) => {
          const shouldRemove = isTargetedCleanup ? extensionIdsToRemove.has(extension.extensionId) : !extensionIdsToRemove.has(extension.extensionId);
          if (shouldRemove) {
            extension.removeUsage();
            extension.setAccessAllowed(false);
          }
        });
      });
    }
  }
};
AuthenticationExtensionsContribution = __decorate([
  __param(0, IExtensionService),
  __param(1, IAuthenticationQueryService),
  __param(2, IAuthenticationService)
], AuthenticationExtensionsContribution);
let AuthenticationMcpContribution = class AuthenticationMcpContribution2 extends Disposable {
  static {
    __name(this, "AuthenticationMcpContribution");
  }
  static {
    this.ID = "workbench.contrib.authenticationMcp";
  }
  constructor(_mcpRegistry, _authenticationQueryService, _authenticationService) {
    super();
    this._mcpRegistry = _mcpRegistry;
    this._authenticationQueryService = _authenticationQueryService;
    this._authenticationService = _authenticationService;
    this._cleanupRemovedMcpServers();
    this._register(autorun((reader) => {
      this._mcpRegistry.collections.read(reader);
      queueMicrotask(() => this._cleanupRemovedMcpServers());
    }));
    this._register(Event.any(this._authenticationService.onDidChangeDeclaredProviders, this._authenticationService.onDidRegisterAuthenticationProvider)(() => this._cleanupRemovedMcpServers()));
  }
  _cleanupRemovedMcpServers() {
    const currentServerIds = new Set(this._mcpRegistry.collections.get().flatMap((c) => c.serverDefinitions.get()).map((s) => s.id));
    const providerIds = this._authenticationQueryService.getProviderIds();
    for (const providerId of providerIds) {
      this._authenticationQueryService.provider(providerId).forEachAccount((account) => {
        account.mcpServers().forEach((server) => {
          if (!currentServerIds.has(server.mcpServerId)) {
            server.removeUsage();
            server.setAccessAllowed(false);
          }
        });
      });
    }
  }
};
AuthenticationMcpContribution = __decorate([
  __param(0, IMcpRegistry),
  __param(1, IAuthenticationQueryService),
  __param(2, IAuthenticationService)
], AuthenticationMcpContribution);
registerWorkbenchContribution2(
  AuthenticationContribution.ID,
  AuthenticationContribution,
  3
  /* WorkbenchPhase.AfterRestored */
);
registerWorkbenchContribution2(
  AuthenticationUsageContribution.ID,
  AuthenticationUsageContribution,
  4
  /* WorkbenchPhase.Eventually */
);
registerWorkbenchContribution2(
  AuthenticationExtensionsContribution.ID,
  AuthenticationExtensionsContribution,
  4
  /* WorkbenchPhase.Eventually */
);
registerWorkbenchContribution2(
  AuthenticationMcpContribution.ID,
  AuthenticationMcpContribution,
  4
  /* WorkbenchPhase.Eventually */
);
//# sourceMappingURL=authentication.contribution.js.map
