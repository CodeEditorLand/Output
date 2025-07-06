declare let d: {
    new (t: any, e: any): {
        a: b;
        onDidChangeEnablement: any;
        b: any;
        enableExtension(t: any, e: any): Promise<boolean>;
        disableExtension(t: any, e: any): Promise<boolean>;
        getDisabledExtensions(): any;
        getDisabledExtensionsAsync(): Promise<any>;
        c(t: any): boolean;
        f(t: any): boolean;
        g(t: any): void;
        h(t: any): any;
        j(t: any, e: any): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class D extends m {
    constructor(t: any);
    c: any;
    a: any;
    b: any;
    onDidChange: any;
    get(t: any, e: any): any;
    set(t: any, e: any, i: any): void;
    f(t: any): void;
    g(t: any, e: any): any;
    h(t: any, e: any, i: any): void;
}
import { $ef as b } from "../../../base/common/event.js";
import { $vd as m } from "../../../base/common/lifecycle.js";
export { d as $C6b, D as $D6b };
//# sourceMappingURL=extensionEnablementService.d.ts.map