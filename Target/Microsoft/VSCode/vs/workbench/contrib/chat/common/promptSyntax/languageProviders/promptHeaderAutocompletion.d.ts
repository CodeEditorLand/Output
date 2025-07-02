import { CancellationToken } from '../../../../../../base/common/cancellation.js';
import { Disposable } from '../../../../../../base/common/lifecycle.js';
import { Position } from '../../../../../../editor/common/core/position.js';
import { CompletionContext, CompletionItemProvider, CompletionList } from '../../../../../../editor/common/languages.js';
import { ITextModel } from '../../../../../../editor/common/model.js';
import { ILanguageFeaturesService } from '../../../../../../editor/common/services/languageFeatures.js';
import { ILanguageModelsService } from '../../languageModels.js';
import { ILanguageModelToolsService } from '../../languageModelToolsService.js';
import { IPromptsService } from '../service/promptsService.js';
export declare class PromptHeaderAutocompletion extends Disposable implements CompletionItemProvider {
    private readonly promptsService;
    private readonly languageService;
    private readonly languageModelsService;
    private readonly languageModelToolsService;
    /**
     * Debug display name for this provider.
     */
    readonly _debugDisplayName: string;
    /**
     * List of trigger characters handled by this provider.
     */
    readonly triggerCharacters: string[];
    constructor(promptsService: IPromptsService, languageService: ILanguageFeaturesService, languageModelsService: ILanguageModelsService, languageModelToolsService: ILanguageModelToolsService);
    /**
     * The main function of this provider that calculates
     * completion items based on the provided arguments.
     */
    provideCompletionItems(model: ITextModel, position: Position, context: CompletionContext, token: CancellationToken): Promise<CompletionList | undefined>;
    private providePropertyCompletions;
    private provideValueCompletions;
    private getSupportedProperties;
    private removeUsedProperties;
    private getValueSuggestions;
    private getModelNames;
    private provideToolCompletions;
}
