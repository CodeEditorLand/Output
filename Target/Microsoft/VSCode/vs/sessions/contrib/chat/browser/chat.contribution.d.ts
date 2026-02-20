import { ServicesAccessor } from '../../../../editor/browser/editorExtensions.js';
import { Action2 } from '../../../../platform/actions/common/actions.js';
export declare class OpenSessionWorktreeInVSCodeAction extends Action2 {
    static readonly ID = "chat.openSessionWorktreeInVSCode";
    constructor();
    run(accessor: ServicesAccessor): Promise<void>;
}
export declare class OpenSessionInTerminalAction extends Action2 {
    constructor();
    run(accessor: ServicesAccessor): Promise<void>;
}
