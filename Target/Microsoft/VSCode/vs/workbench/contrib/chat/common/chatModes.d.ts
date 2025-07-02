import { Event } from '../../../../base/common/event.js';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { IObservable } from '../../../../base/common/observable.js';
import { URI } from '../../../../base/common/uri.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { ILogService } from '../../../../platform/log/common/log.js';
import { IStorageService } from '../../../../platform/storage/common/storage.js';
import { IChatAgentService } from './chatAgents.js';
import { ChatModeKind } from './constants.js';
import { ICustomChatMode, IPromptsService } from './promptSyntax/service/promptsService.js';
export declare const IChatModeService: import("../../../../platform/instantiation/common/instantiation.js").ServiceIdentifier<IChatModeService>;
export interface IChatModeService {
    readonly _serviceBrand: undefined;
    onDidChangeChatModes: Event<void>;
    getModes(): {
        builtin: readonly IChatMode[];
        custom: readonly IChatMode[];
    };
    findModeById(id: string): IChatMode | undefined;
    findModeByName(name: string): IChatMode | undefined;
}
export declare class ChatModeService extends Disposable implements IChatModeService {
    private readonly promptsService;
    private readonly chatAgentService;
    private readonly logService;
    private readonly storageService;
    readonly _serviceBrand: undefined;
    private static readonly CUSTOM_MODES_STORAGE_KEY;
    private readonly hasCustomModes;
    private readonly _customModeInstances;
    private readonly _onDidChangeChatModes;
    readonly onDidChangeChatModes: Event<void>;
    constructor(promptsService: IPromptsService, chatAgentService: IChatAgentService, contextKeyService: IContextKeyService, logService: ILogService, storageService: IStorageService);
    private loadCachedModes;
    private deserializeCachedModes;
    private saveCachedModes;
    private refreshCustomPromptModes;
    getModes(): {
        builtin: readonly IChatMode[];
        custom: readonly IChatMode[];
    };
    private getFlatModes;
    findModeById(id: string | ChatModeKind): IChatMode | undefined;
    findModeByName(name: string): IChatMode | undefined;
    private getBuiltinModes;
}
export interface IChatModeData {
    readonly id: string;
    readonly name: string;
    readonly description?: string;
    readonly kind: ChatModeKind;
    readonly customTools?: readonly string[];
    readonly model?: string;
    readonly body?: string;
    readonly uri?: URI;
}
export interface IChatMode {
    readonly id: string;
    readonly name: string;
    readonly description: IObservable<string | undefined>;
    readonly kind: ChatModeKind;
    readonly customTools?: IObservable<readonly string[] | undefined>;
    readonly model?: IObservable<string | undefined>;
    readonly body?: IObservable<string>;
    readonly uri?: IObservable<URI>;
}
export declare class CustomChatMode implements IChatMode {
    private readonly _descriptionObservable;
    private readonly _customToolsObservable;
    private readonly _bodyObservable;
    private readonly _uriObservable;
    private readonly _modelObservable;
    readonly id: string;
    readonly name: string;
    get description(): IObservable<string | undefined>;
    get customTools(): IObservable<readonly string[] | undefined>;
    get model(): IObservable<string | undefined>;
    get body(): IObservable<string>;
    get uri(): IObservable<URI>;
    readonly kind = ChatModeKind.Agent;
    constructor(customChatMode: ICustomChatMode);
    /**
     * Updates the underlying data and triggers observable changes
     */
    updateData(newData: ICustomChatMode): void;
    toJSON(): IChatModeData;
}
export declare class BuiltinChatMode implements IChatMode {
    readonly kind: ChatModeKind;
    readonly name: string;
    readonly description: IObservable<string>;
    constructor(kind: ChatModeKind, name: string, description: string);
    get id(): string;
    /**
     * Getters are not json-stringified
     */
    toJSON(): IChatModeData;
}
export declare namespace ChatMode {
    const Ask: BuiltinChatMode;
    const Edit: BuiltinChatMode;
    const Agent: BuiltinChatMode;
}
export declare function isBuiltinChatMode(mode: IChatMode): boolean;
