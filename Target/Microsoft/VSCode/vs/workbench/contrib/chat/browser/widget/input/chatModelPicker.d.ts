import { Event } from '../../../../../../base/common/event.js';
import { Disposable } from '../../../../../../base/common/lifecycle.js';
import { ICommandService } from '../../../../../../platform/commands/common/commands.js';
import { IInstantiationService } from '../../../../../../platform/instantiation/common/instantiation.js';
import { IOpenerService } from '../../../../../../platform/opener/common/opener.js';
import { IProductService } from '../../../../../../platform/product/common/productService.js';
import { ITelemetryService } from '../../../../../../platform/telemetry/common/telemetry.js';
import { ILanguageModelChatMetadataAndIdentifier, ILanguageModelsService } from '../../../common/languageModels.js';
import { IChatEntitlementService } from '../../../../../services/chat/common/chatEntitlementService.js';
export type ModelPickerBadge = 'info' | 'warning';
/**
 * A model selection dropdown widget.
 *
 * Renders a button showing the currently selected model name.
 * On click, opens a grouped picker popup with:
 * Auto → Promoted (recently used + curated) → Other Models (collapsed with search).
 *
 * The widget owns its state - set models, selection, and curated IDs via setters.
 * Listen for selection changes via `onDidChangeSelection`.
 */
export declare class ModelPickerWidget extends Disposable {
    private readonly _instantiationService;
    private readonly _commandService;
    private readonly _openerService;
    private readonly _telemetryService;
    private readonly _languageModelsService;
    private readonly _productService;
    private readonly _entitlementService;
    private readonly _onDidChangeSelection;
    readonly onDidChangeSelection: Event<ILanguageModelChatMetadataAndIdentifier>;
    private _models;
    private _selectedModel;
    private _badge;
    private _domNode;
    private _badgeIcon;
    private readonly _dropdown;
    get selectedModel(): ILanguageModelChatMetadataAndIdentifier | undefined;
    get domNode(): HTMLElement | undefined;
    constructor(_instantiationService: IInstantiationService, _commandService: ICommandService, _openerService: IOpenerService, _telemetryService: ITelemetryService, _languageModelsService: ILanguageModelsService, _productService: IProductService, _entitlementService: IChatEntitlementService);
    setModels(models: ILanguageModelChatMetadataAndIdentifier[]): void;
    setSelectedModel(model: ILanguageModelChatMetadataAndIdentifier | undefined): void;
    setBadge(badge: ModelPickerBadge | undefined): void;
    render(container: HTMLElement): void;
    show(anchor?: HTMLElement): void;
    private _updateBadge;
    private _renderLabel;
}
