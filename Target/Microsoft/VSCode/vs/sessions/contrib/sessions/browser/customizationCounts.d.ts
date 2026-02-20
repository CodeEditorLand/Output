import { PromptsType } from '../../../../workbench/contrib/chat/common/promptSyntax/promptTypes.js';
import { IPromptsService } from '../../../../workbench/contrib/chat/common/promptSyntax/service/promptsService.js';
import { IMcpService } from '../../../../workbench/contrib/mcp/common/mcpTypes.js';
export interface ISourceCounts {
    readonly workspace: number;
    readonly user: number;
    readonly extension: number;
}
export declare function getSourceCountsTotal(counts: ISourceCounts): number;
export declare function getPromptSourceCounts(promptsService: IPromptsService, promptType: PromptsType): Promise<ISourceCounts>;
export declare function getSkillSourceCounts(promptsService: IPromptsService): Promise<ISourceCounts>;
export declare function getCustomizationTotalCount(promptsService: IPromptsService, mcpService: IMcpService): Promise<number>;
