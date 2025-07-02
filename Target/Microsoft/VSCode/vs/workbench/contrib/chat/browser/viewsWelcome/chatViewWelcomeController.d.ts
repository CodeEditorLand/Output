import { Event } from '../../../../../base/common/event.js';
import { IMarkdownString } from '../../../../../base/common/htmlContent.js';
import { Disposable, DisposableStore } from '../../../../../base/common/lifecycle.js';
import { ThemeIcon } from '../../../../../base/common/themables.js';
import { IContextKeyService } from '../../../../../platform/contextkey/common/contextkey.js';
import { IInstantiationService } from '../../../../../platform/instantiation/common/instantiation.js';
import { ILogService } from '../../../../../platform/log/common/log.js';
import { IOpenerService } from '../../../../../platform/opener/common/opener.js';
import { ChatAgentLocation } from '../../common/constants.js';
import { IChatWidgetService } from '../chat.js';
import { ITelemetryService } from '../../../../../platform/telemetry/common/telemetry.js';
export interface IViewWelcomeDelegate {
    readonly onDidChangeViewWelcomeState: Event<void>;
    shouldShowWelcome(): boolean;
}
export declare class ChatViewWelcomeController extends Disposable {
    private readonly container;
    private readonly delegate;
    private readonly location;
    private contextKeyService;
    private instantiationService;
    private element;
    private enabled;
    private readonly enabledDisposables;
    private readonly renderDisposables;
    constructor(container: HTMLElement, delegate: IViewWelcomeDelegate, location: ChatAgentLocation, contextKeyService: IContextKeyService, instantiationService: IInstantiationService);
    private update;
    private render;
}
export interface IChatViewWelcomeContent {
    icon?: ThemeIcon;
    title: string;
    message: IMarkdownString | ((disposables: DisposableStore) => HTMLElement);
    additionalMessage?: string | IMarkdownString;
    tips?: IMarkdownString;
    inputPart?: HTMLElement;
    suggestedPrompts?: IChatSuggestedPrompts[];
}
export interface IChatSuggestedPrompts {
    icon?: ThemeIcon;
    label: string;
    prompt: string;
}
export interface IChatViewWelcomeRenderOptions {
    firstLinkToButton?: boolean;
    location: ChatAgentLocation;
    isWidgetAgentWelcomeViewContent?: boolean;
}
export declare class ChatViewWelcomePart extends Disposable {
    readonly content: IChatViewWelcomeContent;
    private openerService;
    private instantiationService;
    private logService;
    private chatWidgetService;
    private telemetryService;
    readonly element: HTMLElement;
    constructor(content: IChatViewWelcomeContent, options: IChatViewWelcomeRenderOptions | undefined, openerService: IOpenerService, instantiationService: IInstantiationService, logService: ILogService, chatWidgetService: IChatWidgetService, telemetryService: ITelemetryService);
    private renderMarkdownMessageContent;
}
