import { IHoverService } from '../../../../../../platform/hover/browser/hover.js';
import { IChatHookPart } from '../../../common/chatService/chatService.js';
import { IChatRendererContent } from '../../../common/model/chatViewModel.js';
import { ChatTreeItem } from '../../chat.js';
import { ChatCollapsibleContentPart } from './chatCollapsibleContentPart.js';
import { IChatContentPart, IChatContentPartRenderContext } from './chatContentParts.js';
import './media/chatHookContentPart.css';
export declare class ChatHookContentPart extends ChatCollapsibleContentPart implements IChatContentPart {
    private readonly hookPart;
    constructor(hookPart: IChatHookPart, context: IChatContentPartRenderContext, hoverService: IHoverService);
    protected initContent(): HTMLElement;
    hasSameContent(other: IChatRendererContent, _followingContent: IChatRendererContent[], _element: ChatTreeItem): boolean;
}
