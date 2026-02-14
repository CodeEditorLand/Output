var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { CancellationToken } from "../../../../../base/common/cancellation.js";
import { Schemas } from "../../../../../base/common/network.js";
import { localize2 } from "../../../../../nls.js";
import { Action2, MenuId, registerAction2 } from "../../../../../platform/actions/common/actions.js";
import { ContextKeyExpr } from "../../../../../platform/contextkey/common/contextkey.js";
import { ICommandService } from "../../../../../platform/commands/common/commands.js";
import { IPromptsService, AgentFileType } from "../../common/promptSyntax/service/promptsService.js";
import { PromptsConfig } from "../../common/promptSyntax/config/config.js";
import { PromptsType } from "../../common/promptSyntax/promptTypes.js";
import { basename, dirname, relativePath } from "../../../../../base/common/resources.js";
import { IFileService } from "../../../../../platform/files/common/files.js";
import * as nls from "../../../../../nls.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import { COPILOT_CUSTOM_INSTRUCTIONS_FILENAME } from "../../common/promptSyntax/config/promptFileLocations.js";
import { IUntitledTextEditorService } from "../../../../services/untitled/common/untitledTextEditorService.js";
import { CHAT_CATEGORY, CHAT_CONFIG_MENU_ID } from "./chatActions.js";
import { ChatViewId } from "../chat.js";
import { ChatContextKeys } from "../../common/actions/chatContextKeys.js";
import { IWorkspaceContextService } from "../../../../../platform/workspace/common/workspace.js";
import { IPathService } from "../../../../services/path/common/pathService.js";
import { parseAllHookFiles } from "../promptSyntax/hookUtils.js";
import { ILabelService } from "../../../../../platform/label/common/label.js";
import { IRemoteAgentService } from "../../../../services/remote/common/remoteAgentService.js";
import { OS } from "../../../../../base/common/platform.js";
function encodePathForMarkdown(path) {
  return path.split("/").map((segment) => encodeURIComponent(segment)).join("/");
}
__name(encodePathForMarkdown, "encodePathForMarkdown");
function getRelativePath(uri, workspaceFolders) {
  const normalizedUri = uri.scheme === Schemas.vscodeUserData ? uri.with({ scheme: Schemas.file }) : uri;
  for (const folder of workspaceFolders) {
    const relative = relativePath(folder.uri, normalizedUri);
    if (relative) {
      return encodePathForMarkdown(relative);
    }
  }
  return encodePathForMarkdown(normalizedUri.fsPath.replace(/\\/g, "/"));
}
__name(getRelativePath, "getRelativePath");
const TREE_BRANCH = "\u251C\u2500";
const TREE_END = "\u2514\u2500";
const ICON_ERROR = "\u274C";
const ICON_WARN = "\u26A0\uFE0F";
const ICON_MANUAL = "\u{1F527}";
const ICON_HIDDEN = "\u{1F441}\uFE0F\u200D\u{1F5E8}\uFE0F";
function registerChatCustomizationDiagnosticsAction() {
  registerAction2(class DiagnosticsAction extends Action2 {
    static {
      __name(this, "DiagnosticsAction");
    }
    constructor() {
      super({
        id: "workbench.action.chat.diagnostics",
        title: localize2("chat.diagnostics.label", "Diagnostics"),
        f1: false,
        category: CHAT_CATEGORY,
        menu: [{
          id: MenuId.ChatContext,
          group: "z_clear",
          order: -1
        }, {
          id: CHAT_CONFIG_MENU_ID,
          when: ContextKeyExpr.and(ChatContextKeys.enabled, ContextKeyExpr.equals("view", ChatViewId)),
          order: 14,
          group: "3_configure"
        }, {
          id: MenuId.ChatWelcomeContext,
          group: "2_settings",
          order: 0,
          when: ChatContextKeys.inChatEditor.negate()
        }]
      });
    }
    async run(accessor) {
      const promptsService = accessor.get(IPromptsService);
      const configurationService = accessor.get(IConfigurationService);
      const fileService = accessor.get(IFileService);
      const untitledTextEditorService = accessor.get(IUntitledTextEditorService);
      const commandService = accessor.get(ICommandService);
      const workspaceContextService = accessor.get(IWorkspaceContextService);
      const labelService = accessor.get(ILabelService);
      const remoteAgentService = accessor.get(IRemoteAgentService);
      const token = CancellationToken.None;
      const workspaceFolders = workspaceContextService.getWorkspace().folders;
      const pathService = accessor.get(IPathService);
      const statusInfos = [];
      const agentsStatus = await collectAgentsStatus(promptsService, fileService, token);
      statusInfos.push(agentsStatus);
      const instructionsStatus = await collectInstructionsStatus(promptsService, fileService, token);
      statusInfos.push(instructionsStatus);
      const promptsStatus = await collectPromptsStatus(promptsService, fileService, token);
      statusInfos.push(promptsStatus);
      const skillsStatus = await collectSkillsStatus(promptsService, configurationService, fileService, token);
      statusInfos.push(skillsStatus);
      const hooksStatus = await collectHooksStatus(promptsService, fileService, labelService, pathService, workspaceContextService, remoteAgentService, token);
      statusInfos.push(hooksStatus);
      const specialFilesStatus = await collectSpecialFilesStatus(promptsService, configurationService, token);
      const output = formatStatusOutput(statusInfos, specialFilesStatus, workspaceFolders);
      const untitledModel = untitledTextEditorService.create({
        initialValue: output,
        languageId: "markdown"
      });
      await commandService.executeCommand("vscode.open", untitledModel.resource);
    }
  });
}
__name(registerChatCustomizationDiagnosticsAction, "registerChatCustomizationDiagnosticsAction");
async function collectAgentsStatus(promptsService, fileService, token) {
  const type = PromptsType.agent;
  const enabled = true;
  const resolvedFolders = await promptsService.getResolvedSourceFolders(type);
  const paths = await convertResolvedFoldersToPathInfo(resolvedFolders, fileService);
  const discoveryInfo = await promptsService.getPromptDiscoveryInfo(type, token);
  const files = discoveryInfo.files.map(convertDiscoveryResultToFileStatus);
  return { type, paths, files, enabled };
}
__name(collectAgentsStatus, "collectAgentsStatus");
async function collectInstructionsStatus(promptsService, fileService, token) {
  const type = PromptsType.instructions;
  const enabled = true;
  const resolvedFolders = await promptsService.getResolvedSourceFolders(type);
  const paths = await convertResolvedFoldersToPathInfo(resolvedFolders, fileService);
  const discoveryInfo = await promptsService.getPromptDiscoveryInfo(type, token);
  const files = discoveryInfo.files.filter((f) => basename(f.uri) !== COPILOT_CUSTOM_INSTRUCTIONS_FILENAME).map(convertDiscoveryResultToFileStatus);
  return { type, paths, files, enabled };
}
__name(collectInstructionsStatus, "collectInstructionsStatus");
async function collectPromptsStatus(promptsService, fileService, token) {
  const type = PromptsType.prompt;
  const enabled = true;
  const resolvedFolders = await promptsService.getResolvedSourceFolders(type);
  const paths = await convertResolvedFoldersToPathInfo(resolvedFolders, fileService);
  const discoveryInfo = await promptsService.getPromptDiscoveryInfo(type, token);
  const files = discoveryInfo.files.map(convertDiscoveryResultToFileStatus);
  return { type, paths, files, enabled };
}
__name(collectPromptsStatus, "collectPromptsStatus");
async function collectSkillsStatus(promptsService, configurationService, fileService, token) {
  const type = PromptsType.skill;
  const enabled = configurationService.getValue(PromptsConfig.USE_AGENT_SKILLS) ?? false;
  const resolvedFolders = await promptsService.getResolvedSourceFolders(type);
  const paths = await convertResolvedFoldersToPathInfo(resolvedFolders, fileService);
  const discoveryInfo = await promptsService.getPromptDiscoveryInfo(type, token);
  const files = discoveryInfo.files.map(convertDiscoveryResultToFileStatus);
  return { type, paths, files, enabled };
}
__name(collectSkillsStatus, "collectSkillsStatus");
async function collectHooksStatus(promptsService, fileService, labelService, pathService, workspaceContextService, remoteAgentService, token) {
  const type = PromptsType.hook;
  const enabled = true;
  const resolvedFolders = await promptsService.getResolvedSourceFolders(type);
  const paths = await convertResolvedFoldersToPathInfo(resolvedFolders, fileService);
  const discoveryInfo = await promptsService.getPromptDiscoveryInfo(type, token);
  const files = discoveryInfo.files.map(convertDiscoveryResultToFileStatus);
  const disabledFileUris = discoveryInfo.files.filter((f) => f.status === "skipped" && f.skipReason === "all-hooks-disabled").map((f) => f.uri);
  const parsedHooks = await parseHookFiles(promptsService, fileService, labelService, pathService, workspaceContextService, remoteAgentService, token, disabledFileUris);
  return { type, paths, files, enabled, parsedHooks };
}
__name(collectHooksStatus, "collectHooksStatus");
async function parseHookFiles(promptsService, fileService, labelService, pathService, workspaceContextService, remoteAgentService, token, additionalDisabledFileUris) {
  const workspaceFolder = workspaceContextService.getWorkspace().folders[0];
  const workspaceRootUri = workspaceFolder?.uri;
  const userHomeUri = await pathService.userHome();
  const userHome = userHomeUri.fsPath ?? userHomeUri.path;
  const remoteEnv = await remoteAgentService.getEnvironment();
  const targetOS = remoteEnv?.os ?? OS;
  return parseAllHookFiles(promptsService, fileService, labelService, workspaceRootUri, userHome, targetOS, token, { additionalDisabledFileUris });
}
__name(parseHookFiles, "parseHookFiles");
async function collectSpecialFilesStatus(promptsService, configurationService, token) {
  const useAgentMd = configurationService.getValue(PromptsConfig.USE_AGENT_MD) ?? false;
  const useClaudeMd = configurationService.getValue(PromptsConfig.USE_CLAUDE_MD) ?? false;
  const useCopilotInstructions = configurationService.getValue(PromptsConfig.USE_COPILOT_INSTRUCTION_FILES) ?? false;
  const allFiles = await promptsService.listAgentInstructions(token);
  return {
    agentsMd: {
      enabled: useAgentMd,
      files: allFiles.filter((f) => f.type === AgentFileType.agentsMd).map((f) => f.uri)
    },
    claudeMd: {
      enabled: useClaudeMd,
      files: allFiles.filter((f) => f.type === AgentFileType.claudeMd).map((f) => f.uri)
    },
    copilotInstructions: {
      enabled: useCopilotInstructions,
      files: allFiles.filter((f) => f.type === AgentFileType.copilotInstructionsMd).map((f) => f.uri)
    }
  };
}
__name(collectSpecialFilesStatus, "collectSpecialFilesStatus");
async function checkDirectoryExists(fileService, uri) {
  try {
    const stat = await fileService.stat(uri);
    return stat.isDirectory;
  } catch {
    return false;
  }
}
__name(checkDirectoryExists, "checkDirectoryExists");
async function convertResolvedFoldersToPathInfo(resolvedFolders, fileService) {
  const paths = [];
  let scanOrder = 1;
  for (const folder of resolvedFolders) {
    const exists = await checkDirectoryExists(fileService, folder.uri);
    paths.push({
      uri: folder.uri,
      exists,
      storage: folder.storage,
      scanOrder: scanOrder++,
      displayPath: folder.displayPath ?? folder.uri.path,
      isDefault: folder.isDefault ?? false
    });
  }
  return paths;
}
__name(convertResolvedFoldersToPathInfo, "convertResolvedFoldersToPathInfo");
function getSkipReasonMessage(skipReason, errorMessage) {
  switch (skipReason) {
    case "missing-name":
      return nls.localize("status.missingName", "Missing name attribute");
    case "missing-description":
      return nls.localize("status.skillMissingDescription", "Missing description attribute");
    case "name-mismatch":
      return errorMessage ?? nls.localize("status.skillNameMismatch2", "Name does not match folder");
    case "duplicate-name":
      return nls.localize("status.overwrittenByHigherPriority", "Overwritten by higher priority file");
    case "parse-error":
      return errorMessage ?? nls.localize("status.parseError", "Parse error");
    case "disabled":
      return nls.localize("status.typeDisabled", "Disabled");
    case "all-hooks-disabled":
      return nls.localize("status.allHooksDisabled", "All hooks disabled via disableAllHooks");
    case "claude-hooks-disabled":
      return nls.localize("status.claudeHooksDisabled", "Claude hooks disabled via chat.useClaudeHooks setting");
    default:
      return errorMessage ?? nls.localize("status.unknownError", "Unknown error");
  }
}
__name(getSkipReasonMessage, "getSkipReasonMessage");
function convertDiscoveryResultToFileStatus(result) {
  if (result.status === "loaded") {
    return {
      uri: result.uri,
      status: "loaded",
      name: result.name,
      storage: result.storage,
      extensionId: result.extensionId,
      userInvocable: result.userInvocable,
      disableModelInvocation: result.disableModelInvocation
    };
  }
  if (result.skipReason === "duplicate-name" && result.duplicateOf) {
    return {
      uri: result.uri,
      status: "overwritten",
      name: result.name,
      storage: result.storage,
      overwrittenBy: result.name,
      extensionId: result.extensionId
    };
  }
  return {
    uri: result.uri,
    status: "skipped",
    name: result.name,
    reason: getSkipReasonMessage(result.skipReason, result.errorMessage),
    storage: result.storage,
    extensionId: result.extensionId
  };
}
__name(convertDiscoveryResultToFileStatus, "convertDiscoveryResultToFileStatus");
function formatStatusOutput(statusInfos, specialFiles, workspaceFolders) {
  const lines = [];
  lines.push(`## ${nls.localize("status.title", "Chat Customization Diagnostics")}`);
  lines.push(`*${nls.localize("status.sensitiveWarning", "WARNING: This file may contain sensitive information.")}*`);
  lines.push("");
  for (const info of statusInfos) {
    const typeName = getTypeName(info.type);
    if (info.type === PromptsType.skill && !info.enabled) {
      lines.push(`**${typeName}**`);
      lines.push(`*${nls.localize("status.skillsDisabled", "Skills are disabled. Enable them by setting `chat.useAgentSkills` to `true` in your settings.")}*`);
      lines.push("");
      continue;
    }
    const enabledStatus = info.enabled ? "" : ` *(${nls.localize("status.disabled", "disabled")})*`;
    let loadedCount = info.files.filter((f) => f.status === "loaded").length;
    const skippedCount = info.files.filter((f) => f.status === "skipped" || f.status === "overwritten").length;
    if (info.type === PromptsType.instructions) {
      if (specialFiles.agentsMd.enabled) {
        loadedCount += specialFiles.agentsMd.files.length;
      }
      if (specialFiles.copilotInstructions.enabled) {
        loadedCount += specialFiles.copilotInstructions.files.length;
      }
      if (specialFiles.claudeMd.enabled) {
        loadedCount += specialFiles.claudeMd.files.length;
      }
    }
    lines.push(`**${typeName}**${enabledStatus}<br>`);
    const statsParts = [];
    if (info.type === PromptsType.hook) {
      if (loadedCount > 0) {
        statsParts.push(loadedCount === 1 ? nls.localize("status.fileLoaded", "1 file loaded") : nls.localize("status.filesLoaded", "{0} files loaded", loadedCount));
      }
      if (info.parsedHooks && info.parsedHooks.length > 0) {
        const hookCount = info.parsedHooks.length;
        statsParts.push(hookCount === 1 ? nls.localize("status.hookLoaded", "1 hook loaded") : nls.localize("status.hooksLoaded", "{0} hooks loaded", hookCount));
      }
    } else if (loadedCount > 0) {
      if (info.type === PromptsType.skill) {
        statsParts.push(loadedCount === 1 ? nls.localize("status.skillLoaded", "1 skill loaded") : nls.localize("status.skillsLoaded", "{0} skills loaded", loadedCount));
      } else {
        statsParts.push(loadedCount === 1 ? nls.localize("status.fileLoaded", "1 file loaded") : nls.localize("status.filesLoaded", "{0} files loaded", loadedCount));
      }
    }
    if (skippedCount > 0) {
      statsParts.push(nls.localize("status.skippedCount", "{0} skipped", skippedCount));
    }
    if (statsParts.length > 0) {
      lines.push(`*${statsParts.join(", ")}*`);
    }
    lines.push("");
    const allPaths = info.paths;
    const allFiles = info.files;
    const filesByPath = /* @__PURE__ */ new Map();
    const unmatchedFiles = [];
    for (const file of allFiles) {
      let matched = false;
      for (const path of allPaths) {
        if (isFileUnderPath(file.uri, path.uri)) {
          const key = path.uri.toString();
          if (!filesByPath.has(key)) {
            filesByPath.set(key, []);
          }
          filesByPath.get(key).push(file);
          matched = true;
          break;
        }
      }
      if (!matched) {
        unmatchedFiles.push(file);
      }
    }
    let hasContent = false;
    if (info.type !== PromptsType.hook) {
      for (const path of allPaths) {
        const pathFiles = filesByPath.get(path.uri.toString()) || [];
        if (path.exists) {
          lines.push(`${path.displayPath}<br>`);
        } else if (path.isDefault) {
          lines.push(`${path.displayPath}<br>`);
        } else {
          lines.push(`${ICON_ERROR} ${path.displayPath} - *${nls.localize("status.folderNotFound", "Folder does not exist")}*<br>`);
        }
        if (path.exists && pathFiles.length > 0) {
          for (let i = 0; i < pathFiles.length; i++) {
            const file = pathFiles[i];
            let fileName;
            if (info.type === PromptsType.skill) {
              fileName = file.name || `${basename(dirname(file.uri))}`;
            } else {
              fileName = basename(file.uri);
            }
            const isLast = i === pathFiles.length - 1;
            const prefix = isLast ? TREE_END : TREE_BRANCH;
            const filePath = getRelativePath(file.uri, workspaceFolders);
            if (file.status === "loaded") {
              const flags = getSkillFlags(file, info.type);
              lines.push(`${prefix} [\`${fileName}\`](${filePath})${flags}<br>`);
            } else if (file.status === "overwritten") {
              lines.push(`${prefix} ${ICON_WARN} [\`${fileName}\`](${filePath}) - *${nls.localize("status.overwrittenByHigherPriority", "Overwritten by higher priority file")}*<br>`);
            } else {
              lines.push(`${prefix} ${ICON_ERROR} [\`${fileName}\`](${filePath}) - *${file.reason}*<br>`);
            }
          }
        }
        hasContent = true;
      }
    }
    if (info.type !== PromptsType.hook && unmatchedFiles.length > 0) {
      const filesByExtension = /* @__PURE__ */ new Map();
      for (const file of unmatchedFiles) {
        const extId = file.extensionId || "unknown";
        if (!filesByExtension.has(extId)) {
          filesByExtension.set(extId, []);
        }
        filesByExtension.get(extId).push(file);
      }
      for (const [extId, extFiles] of filesByExtension) {
        lines.push(`${nls.localize("status.extension", "Extension")}: ${extId}<br>`);
        for (let i = 0; i < extFiles.length; i++) {
          const file = extFiles[i];
          let fileName;
          if (info.type === PromptsType.skill) {
            fileName = file.name || `${basename(dirname(file.uri))}`;
          } else {
            fileName = basename(file.uri);
          }
          const isLast = i === extFiles.length - 1;
          const prefix = isLast ? TREE_END : TREE_BRANCH;
          const filePath = getRelativePath(file.uri, workspaceFolders);
          if (file.status === "loaded") {
            const flags = getSkillFlags(file, info.type);
            lines.push(`${prefix} [\`${fileName}\`](${filePath})${flags}<br>`);
          } else if (file.status === "overwritten") {
            lines.push(`${prefix} ${ICON_WARN} [\`${fileName}\`](${filePath}) - *${nls.localize("status.overwrittenByHigherPriority", "Overwritten by higher priority file")}*<br>`);
          } else {
            lines.push(`${prefix} ${ICON_ERROR} [\`${fileName}\`](${filePath}) - *${file.reason}*<br>`);
          }
        }
      }
      hasContent = true;
    }
    if (info.type === PromptsType.instructions) {
      if (specialFiles.agentsMd.enabled && specialFiles.agentsMd.files.length > 0) {
        lines.push(`AGENTS.md<br>`);
        for (let i = 0; i < specialFiles.agentsMd.files.length; i++) {
          const file = specialFiles.agentsMd.files[i];
          const fileName = basename(file);
          const isLast = i === specialFiles.agentsMd.files.length - 1;
          const prefix = isLast ? TREE_END : TREE_BRANCH;
          const filePath = getRelativePath(file, workspaceFolders);
          lines.push(`${prefix} [\`${fileName}\`](${filePath})<br>`);
        }
        hasContent = true;
      } else if (!specialFiles.agentsMd.enabled) {
        lines.push(`AGENTS.md -<br>`);
        hasContent = true;
      }
      if (specialFiles.copilotInstructions.enabled && specialFiles.copilotInstructions.files.length > 0) {
        lines.push(`${COPILOT_CUSTOM_INSTRUCTIONS_FILENAME}<br>`);
        for (let i = 0; i < specialFiles.copilotInstructions.files.length; i++) {
          const file = specialFiles.copilotInstructions.files[i];
          const fileName = basename(file);
          const isLast = i === specialFiles.copilotInstructions.files.length - 1;
          const prefix = isLast ? TREE_END : TREE_BRANCH;
          const filePath = getRelativePath(file, workspaceFolders);
          lines.push(`${prefix} [\`${fileName}\`](${filePath})<br>`);
        }
        hasContent = true;
      } else if (!specialFiles.copilotInstructions.enabled) {
        lines.push(`${COPILOT_CUSTOM_INSTRUCTIONS_FILENAME} -<br>`);
        hasContent = true;
      }
    }
    if (info.type === PromptsType.hook && info.parsedHooks && info.parsedHooks.length > 0) {
      const hooksByFile = /* @__PURE__ */ new Map();
      for (const hook of info.parsedHooks) {
        const fileKey = hook.fileUri.toString();
        const existing = hooksByFile.get(fileKey) ?? [];
        existing.push(hook);
        hooksByFile.set(fileKey, existing);
      }
      const fileUris = Array.from(hooksByFile.keys());
      for (let fileIdx = 0; fileIdx < fileUris.length; fileIdx++) {
        const fileKey = fileUris[fileIdx];
        const fileHooks = hooksByFile.get(fileKey);
        const firstHook = fileHooks[0];
        const filePath = getRelativePath(firstHook.fileUri, workspaceFolders);
        const fileDisabled = fileHooks[0].disabled;
        if (fileDisabled) {
          lines.push(`[${firstHook.filePath}](${filePath}) - *${nls.localize("status.allHooksDisabledLabel", "all hooks disabled via disableAllHooks")}*<br>`);
        } else {
          lines.push(`[${firstHook.filePath}](${filePath})<br>`);
        }
        for (let i = 0; i < fileHooks.length; i++) {
          const hook = fileHooks[i];
          const isLast = i === fileHooks.length - 1;
          const prefix = isLast ? TREE_END : TREE_BRANCH;
          const disabledPrefix = hook.disabled ? `${ICON_ERROR} ` : "";
          lines.push(`${prefix} ${disabledPrefix}${hook.hookTypeLabel}: \`${hook.commandLabel}\`<br>`);
        }
      }
      hasContent = true;
    }
    if (!hasContent && info.enabled) {
      lines.push(`*${nls.localize("status.noFilesLoaded", "No files loaded")}*`);
    }
    lines.push("");
  }
  return lines.join("\n");
}
__name(formatStatusOutput, "formatStatusOutput");
function getSkillFlags(file, type) {
  if (type !== PromptsType.skill) {
    return "";
  }
  const flags = [];
  if (file.disableModelInvocation) {
    flags.push(`${ICON_MANUAL} *${nls.localize("status.skill.manualOnly", "manual only")}*`);
  }
  if (file.userInvocable === false) {
    flags.push(`${ICON_HIDDEN} *${nls.localize("status.skill.hiddenFromMenu", "hidden from menu")}*`);
  }
  if (flags.length === 0) {
    return "";
  }
  return ` - ${flags.join(", ")}`;
}
__name(getSkillFlags, "getSkillFlags");
function isFileUnderPath(fileUri, pathUri) {
  const filePath = fileUri.toString();
  const folderPath = pathUri.toString();
  return filePath.startsWith(folderPath + "/") || filePath.startsWith(folderPath + "\\");
}
__name(isFileUnderPath, "isFileUnderPath");
function getTypeName(type) {
  switch (type) {
    case PromptsType.agent:
      return nls.localize("status.type.agents", "Custom Agents");
    case PromptsType.instructions:
      return nls.localize("status.type.instructions", "Instructions");
    case PromptsType.prompt:
      return nls.localize("status.type.prompts", "Prompt Files");
    case PromptsType.skill:
      return nls.localize("status.type.skills", "Skills");
    case PromptsType.hook:
      return nls.localize("status.type.hooks", "Hooks");
    default:
      return type;
  }
}
__name(getTypeName, "getTypeName");
export {
  formatStatusOutput,
  registerChatCustomizationDiagnosticsAction
};
//# sourceMappingURL=chatCustomizationDiagnosticsAction.js.map
