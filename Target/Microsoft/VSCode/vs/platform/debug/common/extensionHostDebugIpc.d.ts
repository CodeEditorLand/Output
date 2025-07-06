declare class c {
    a: n;
    b: n;
    c: n;
    d: n;
    call(e: any, t: any, s: any): Promise<void>;
    listen(e: any, t: any, s: any): any;
}
declare class l extends i {
    constructor(e: any);
    b: any;
    reload(e: any): void;
    get onReload(): any;
    close(e: any): void;
    get onClose(): any;
    attachSession(e: any, t: any, s: any): void;
    get onAttachSession(): any;
    terminateSession(e: any, t: any): void;
    get onTerminateSession(): any;
    openExtensionDevelopmentHostWindow(e: any, t: any): any;
}
import { $ef as n } from "../../../base/common/event.js";
import { $vd as i } from "../../../base/common/lifecycle.js";
export { c as $3v, l as $4v };
//# sourceMappingURL=extensionHostDebugIpc.d.ts.map