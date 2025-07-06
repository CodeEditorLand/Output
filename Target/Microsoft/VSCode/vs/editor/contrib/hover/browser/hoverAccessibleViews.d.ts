declare class Q {
    type: string;
    priority: number;
    name: string;
    when: any;
    getProvider(e: any): any;
}
declare class X {
    priority: number;
    name: string;
    type: string;
    when: any;
    getProvider(e: any): any;
}
declare class m extends l {
    options: {
        type: string;
    };
    provideContent(): string;
}
declare class O extends l {
    constructor(e: any, o: any, t: any);
    h: any;
    j: any;
    options: {
        type: string;
    };
    provideContent(): string;
    get actions(): I[];
    m(e: any, o: any): I;
    n(e: any, o: any): void;
}
declare class Y {
    type: string;
    priority: number;
    name: string;
    getProvider(e: any): C | undefined;
}
declare class l extends j {
    constructor(e: any);
    c: any;
    id: string;
    verbositySettingKey: string;
    a: any;
    onDidChangeContent: any;
    b: number;
    onOpen(): void;
    onClose(): void;
    provideContentAtIndex(e: any, o: any): string;
    f(e: any): any[];
    g(e: any, o: any): any;
}
import { $bm as I } from "../../../../base/common/actions.js";
import { $Ipb as C } from "../../../../platform/accessibility/browser/accessibleView.js";
import { $vd as j } from "../../../../base/common/lifecycle.js";
export { Q as $Erb, X as $Frb, m as $Grb, O as $Hrb, Y as $Irb };
//# sourceMappingURL=hoverAccessibleViews.d.ts.map