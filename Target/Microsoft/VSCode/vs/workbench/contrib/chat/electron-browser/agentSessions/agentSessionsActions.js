var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { VSBuffer } from "../../../../../base/common/buffer.js";
import { localize2 } from "../../../../../nls.js";
import { Action2 } from "../../../../../platform/actions/common/actions.js";
import { ContextKeyExpr } from "../../../../../platform/contextkey/common/contextkey.js";
import { INativeEnvironmentService } from "../../../../../platform/environment/common/environment.js";
import { IFileService } from "../../../../../platform/files/common/files.js";
import { INativeHostService } from "../../../../../platform/native/common/native.js";
import { ChatEntitlementContextKeys } from "../../../../services/chat/common/chatEntitlementService.js";
import { IWorkbenchModeService } from "../../../../services/layout/common/workbenchModeService.js";
import { IsAgentSessionsWorkspaceContext, WorkbenchModeContext } from "../../../../common/contextkeys.js";
import { CHAT_CATEGORY } from "../../browser/actions/chatActions.js";
import { ProductQualityContext } from "../../../../../platform/contextkey/common/contextkeys.js";
class OpenAgentSessionsWindowAction extends Action2 {
  static {
    __name(this, "OpenAgentSessionsWindowAction");
  }
  constructor() {
    super({
      id: "workbench.action.openAgentSessionsWindow",
      title: localize2("openAgentSessionsWindow", "Open Agent Sessions Window"),
      category: CHAT_CATEGORY,
      precondition: ContextKeyExpr.and(ProductQualityContext.notEqualsTo("stable"), ChatEntitlementContextKeys.Setup.hidden.negate()),
      f1: true
    });
  }
  async run(accessor) {
    const environmentService = accessor.get(INativeEnvironmentService);
    const nativeHostService = accessor.get(INativeHostService);
    const fileService = accessor.get(IFileService);
    const workspaceUri = environmentService.agentSessionsWorkspace;
    if (!workspaceUri) {
      throw new Error("Agent Sessions workspace is not configured");
    }
    const workspaceExists = await fileService.exists(workspaceUri);
    if (!workspaceExists) {
      const emptyWorkspaceContent = JSON.stringify({ folders: [] }, null, "	");
      await fileService.writeFile(workspaceUri, VSBuffer.fromString(emptyWorkspaceContent));
    }
    await nativeHostService.openWindow([{ workspaceUri }], { forceNewWindow: true });
  }
}
class SwitchToAgentSessionsModeAction extends Action2 {
  static {
    __name(this, "SwitchToAgentSessionsModeAction");
  }
  constructor() {
    super({
      id: "workbench.action.switchToAgentSessionsMode",
      title: localize2("switchToAgentSessionsMode", "Switch to Agent Sessions Mode"),
      category: CHAT_CATEGORY,
      precondition: ContextKeyExpr.and(ProductQualityContext.notEqualsTo("stable"), ChatEntitlementContextKeys.Setup.hidden.negate(), IsAgentSessionsWorkspaceContext.toNegated(), WorkbenchModeContext.notEqualsTo("agent-sessions")),
      f1: true
    });
  }
  async run(accessor) {
    const workbenchModeService = accessor.get(IWorkbenchModeService);
    await workbenchModeService.setWorkbenchMode("agent-sessions");
  }
}
class SwitchToNormalModeAction extends Action2 {
  static {
    __name(this, "SwitchToNormalModeAction");
  }
  constructor() {
    super({
      id: "workbench.action.switchToNormalMode",
      title: localize2("switchToNormalMode", "Switch to Default Mode"),
      category: CHAT_CATEGORY,
      precondition: ContextKeyExpr.and(ProductQualityContext.notEqualsTo("stable"), ChatEntitlementContextKeys.Setup.hidden.negate(), IsAgentSessionsWorkspaceContext.toNegated(), WorkbenchModeContext.notEqualsTo("")),
      f1: true
    });
  }
  async run(accessor) {
    const workbenchModeService = accessor.get(IWorkbenchModeService);
    await workbenchModeService.setWorkbenchMode(void 0);
  }
}
export {
  OpenAgentSessionsWindowAction,
  SwitchToAgentSessionsModeAction,
  SwitchToNormalModeAction
};
//# sourceMappingURL=agentSessionsActions.js.map
