import { IPromptsService } from '../service/promptsService.js';
import { ProviderInstanceBase } from './providerInstanceBase.js';
import { ITextModel } from '../../../../../../editor/common/model.js';
import { CancellationToken } from '../../../../../../base/common/cancellation.js';
import { ProviderInstanceManagerBase, TProviderClass } from './providerInstanceManagerBase.js';
import { IMarkerData, IMarkerService } from '../../../../../../platform/markers/common/markers.js';
import { PromptToolsMetadata } from '../parsers/promptHeader/metadata/tools.js';
import { PromptModelMetadata } from '../parsers/promptHeader/metadata/model.js';
import { ILanguageModelChatMetadata, ILanguageModelsService } from '../../languageModels.js';
import { ILanguageModelToolsService } from '../../languageModelToolsService.js';
import { ChatModeKind } from '../../constants.js';
/**
 * Prompt header diagnostics provider for an individual text model
 * of a prompt file.
 */
declare class PromptHeaderDiagnosticsProvider extends ProviderInstanceBase {
    private readonly markerService;
    private readonly languageModelsService;
    private readonly languageModelToolsService;
    constructor(model: ITextModel, promptsService: IPromptsService, markerService: IMarkerService, languageModelsService: ILanguageModelsService, languageModelToolsService: ILanguageModelToolsService);
    /**
     * Update diagnostic markers for the current editor.
     */
    protected onPromptSettled(_error: Error | undefined, token: CancellationToken): Promise<void>;
    validateModel(modelNode: PromptModelMetadata | undefined, modeKind: ChatModeKind | undefined, markers: IMarkerData[]): void;
    findModelByName(languageModes: string[], modelName: string): ILanguageModelChatMetadata | undefined;
    validateTools(tools: PromptToolsMetadata | undefined, modeKind: ChatModeKind | undefined, markers: IMarkerData[]): void;
    /**
     * Returns a string representation of this object.
     */
    toString(): string;
}
/**
 * The class that manages creation and disposal of {@link PromptHeaderDiagnosticsProvider}
 * classes for each specific editor text model.
 */
export declare class PromptHeaderDiagnosticsInstanceManager extends ProviderInstanceManagerBase<PromptHeaderDiagnosticsProvider> {
    protected get InstanceClass(): TProviderClass<PromptHeaderDiagnosticsProvider>;
}
export {};
