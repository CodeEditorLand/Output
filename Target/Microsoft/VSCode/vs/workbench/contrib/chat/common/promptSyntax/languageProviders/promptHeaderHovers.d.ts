import { CancellationToken } from '../../../../../../base/common/cancellation.js';
import { Disposable } from '../../../../../../base/common/lifecycle.js';
import { Position } from '../../../../../../editor/common/core/position.js';
import { Hover, HoverContext, HoverProvider } from '../../../../../../editor/common/languages.js';
import { ITextModel } from '../../../../../../editor/common/model.js';
import { ILanguageFeaturesService } from '../../../../../../editor/common/services/languageFeatures.js';
import { ILanguageModelsService } from '../../languageModels.js';
import { ILanguageModelToolsService } from '../../languageModelToolsService.js';
import { IPromptsService } from '../service/promptsService.js';
export declare class PromptHeaderHoverProvider extends Disposable implements HoverProvider {
    private readonly promptsService;
    private readonly languageService;
    private readonly languageModelToolsService;
    private readonly languageModelsService;
    /**
     * Debug display name for this provider.
     */
    readonly _debugDisplayName: string;
    constructor(promptsService: IPromptsService, languageService: ILanguageFeaturesService, languageModelToolsService: ILanguageModelToolsService, languageModelsService: ILanguageModelsService);
    private createHover;
    provideHover(model: ITextModel, position: Position, token: CancellationToken, _context?: HoverContext): Promise<Hover | undefined>;
    private getToolHover;
    private getToolsetHover;
    private getModelHover;
}
