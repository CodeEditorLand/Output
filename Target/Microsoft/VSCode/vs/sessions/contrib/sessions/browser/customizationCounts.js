var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { PromptsType } from "../../../../workbench/contrib/chat/common/promptSyntax/promptTypes.js";
import { PromptsStorage } from "../../../../workbench/contrib/chat/common/promptSyntax/service/promptsService.js";
function getSourceCountsTotal(counts) {
  return counts.workspace + counts.user + counts.extension;
}
__name(getSourceCountsTotal, "getSourceCountsTotal");
async function getPromptSourceCounts(promptsService, promptType) {
  const [workspaceItems, userItems, extensionItems] = await Promise.all([
    promptsService.listPromptFilesForStorage(promptType, PromptsStorage.local, CancellationToken.None),
    promptsService.listPromptFilesForStorage(promptType, PromptsStorage.user, CancellationToken.None),
    promptsService.listPromptFilesForStorage(promptType, PromptsStorage.extension, CancellationToken.None)
  ]);
  return {
    workspace: workspaceItems.length,
    user: userItems.length,
    extension: extensionItems.length
  };
}
__name(getPromptSourceCounts, "getPromptSourceCounts");
async function getSkillSourceCounts(promptsService) {
  const skills = await promptsService.findAgentSkills(CancellationToken.None);
  if (!skills || skills.length === 0) {
    return { workspace: 0, user: 0, extension: 0 };
  }
  return {
    workspace: skills.filter((s) => s.storage === PromptsStorage.local).length,
    user: skills.filter((s) => s.storage === PromptsStorage.user).length,
    extension: skills.filter((s) => s.storage === PromptsStorage.extension).length
  };
}
__name(getSkillSourceCounts, "getSkillSourceCounts");
async function getCustomizationTotalCount(promptsService, mcpService) {
  const [agentCounts, skillCounts, instructionCounts, promptCounts, hookCounts] = await Promise.all([
    getPromptSourceCounts(promptsService, PromptsType.agent),
    getSkillSourceCounts(promptsService),
    getPromptSourceCounts(promptsService, PromptsType.instructions),
    getPromptSourceCounts(promptsService, PromptsType.prompt),
    getPromptSourceCounts(promptsService, PromptsType.hook)
  ]);
  return getSourceCountsTotal(agentCounts) + getSourceCountsTotal(skillCounts) + getSourceCountsTotal(instructionCounts) + getSourceCountsTotal(promptCounts) + getSourceCountsTotal(hookCounts) + mcpService.servers.get().length;
}
__name(getCustomizationTotalCount, "getCustomizationTotalCount");
export {
  getCustomizationTotalCount,
  getPromptSourceCounts,
  getSkillSourceCounts,
  getSourceCountsTotal
};
//# sourceMappingURL=customizationCounts.js.map
