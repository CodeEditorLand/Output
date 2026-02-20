import { Extensions } from "../../../../platform/configuration/common/configurationRegistry.js";
import { Registry } from "../../../../platform/registry/common/platform.js";
Registry.as(Extensions.Configuration).registerDefaultConfigurations([{
  overrides: {
    "chat.agentsControl.enabled": true,
    "chat.agent.maxRequests": 1e3,
    "chat.restoreLastPanelSession": true,
    "chat.unifiedAgentsBar.enabled": true,
    "chat.viewSessions.enabled": false,
    "diffEditor.renderSideBySide": false,
    "diffEditor.hideUnchangedRegions.enabled": true,
    "files.autoSave": "afterDelay",
    "git.showProgress": false,
    "github.copilot.chat.claudeCode.enabled": true,
    "github.copilot.chat.cli.branchSupport.enabled": true,
    "github.copilot.chat.languageContext.typescript.enabled": true,
    "inlineChat.affordance": "editor",
    "inlineChat.renderMode": "hover",
    "workbench.editor.restoreEditors": false,
    "workbench.editor.showTabs": "single",
    "workbench.startupEditor": "none",
    "workbench.tips.enabled": false,
    "workbench.layoutControl.type": "toggles",
    "workbench.editor.allowOpenInModalEditor": false
  },
  donotCache: true
}]);
//# sourceMappingURL=configuration.contribution.js.map
