import './media/chatTipContent.css';
import { Disposable } from '../../../../../../base/common/lifecycle.js';
import { IMenuService } from '../../../../../../platform/actions/common/actions.js';
import { IContextKeyService } from '../../../../../../platform/contextkey/common/contextkey.js';
import { IContextMenuService } from '../../../../../../platform/contextview/browser/contextView.js';
import { IInstantiationService } from '../../../../../../platform/instantiation/common/instantiation.js';
import { IMarkdownRenderer } from '../../../../../../platform/markdown/browser/markdownRenderer.js';
import { IChatTip, IChatTipService } from '../../chatTipService.js';
export declare class ChatTipContentPart extends Disposable {
    private readonly _renderer;
    private readonly _chatTipService;
    private readonly _contextMenuService;
    private readonly _menuService;
    private readonly _contextKeyService;
    private readonly _instantiationService;
    readonly domNode: HTMLElement;
    private readonly _onDidHide;
    readonly onDidHide: import("../../../../../../base/common/event.js").Event<void>;
    private readonly _renderedContent;
    private readonly _toolbar;
    private readonly _inChatTipContextKey;
    constructor(tip: IChatTip, _renderer: IMarkdownRenderer, _chatTipService: IChatTipService, _contextMenuService: IContextMenuService, _menuService: IMenuService, _contextKeyService: IContextKeyService, _instantiationService: IInstantiationService);
    hasFocus(): boolean;
    focus(): void;
    private _renderTip;
}
