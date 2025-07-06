declare class M extends m {
    getProvider(t: any): S | undefined;
    priority: number;
    name: string;
    when: import("../../../../platform/contextkey/common/contextkey.js").$Wn;
    type: string;
}
declare class D extends m {
    getProvider(t: any): {
        b: any;
        c: any;
        f: any;
        id: string;
        verbositySettingKey: string;
        options: {
            type: string;
        };
        readonly g: any;
        a: any;
        provideContent(): string;
        onClose(): void;
        provideNextContent(): string | undefined;
        providePreviousContent(): string | undefined;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    } | undefined;
    priority: number;
    name: string;
    when: any;
    type: string;
}
import { $vd as m } from "../../../../base/common/lifecycle.js";
declare class S extends m {
    constructor(t: any, e: any, o: any);
    a: any;
    b: any;
    c: any;
    id: string;
    verbositySettingKey: string;
    options: {
        type: string;
    };
    actions: any[];
    provideContent(): any;
    onClose(): void;
    provideNextContent(): any;
    providePreviousContent(): any;
}
export { M as $lrc, D as $mrc };
//# sourceMappingURL=commentsAccessibleView.d.ts.map