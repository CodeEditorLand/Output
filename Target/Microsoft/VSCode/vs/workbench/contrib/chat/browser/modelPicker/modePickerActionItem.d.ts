import { IDisposable } from '../../../../../base/common/lifecycle.js';
import { IObservable } from '../../../../../base/common/observable.js';
import { ActionWidgetDropdownActionViewItem } from '../../../../../platform/actions/browser/actionWidgetDropdownActionViewItem.js';
import { IMenuService, MenuItemAction } from '../../../../../platform/actions/common/actions.js';
import { IActionWidgetService } from '../../../../../platform/actionWidget/browser/actionWidget.js';
import { IContextKeyService } from '../../../../../platform/contextkey/common/contextkey.js';
import { IKeybindingService } from '../../../../../platform/keybinding/common/keybinding.js';
import { IChatAgentService } from '../../common/chatAgents.js';
import { IChatMode, IChatModeService } from '../../common/chatModes.js';
export interface IModePickerDelegate {
    readonly currentMode: IObservable<IChatMode>;
}
export declare class ModePickerActionItem extends ActionWidgetDropdownActionViewItem {
    private readonly delegate;
    private readonly contextKeyService;
    private readonly menuService;
    constructor(action: MenuItemAction, delegate: IModePickerDelegate, actionWidgetService: IActionWidgetService, chatAgentService: IChatAgentService, keybindingService: IKeybindingService, contextKeyService: IContextKeyService, chatModeService: IChatModeService, menuService: IMenuService);
    private getModePickerActionBarActions;
    protected renderLabel(element: HTMLElement, mode?: IChatMode): IDisposable | null;
    render(container: HTMLElement): void;
}
