export { S as $99 };
declare class S {
    constructor(t: any, i: any, h?: {
        targetWidth: number;
        leftMarginRatio: number;
        rightMarginRatio: number;
    }, s?: boolean);
    h: any;
    i: any;
    state: {
        targetWidth: number;
        leftMarginRatio: number;
        rightMarginRatio: number;
    };
    j: boolean;
    b: {
        width: number;
        height: number;
        left: number;
        top: number;
    };
    d: boolean;
    g: g;
    k: {};
    get minimumWidth(): any;
    get maximumWidth(): any;
    get minimumHeight(): any;
    get maximumHeight(): any;
    get onDidChange(): any;
    set boundarySashes(t: {});
    get boundarySashes(): {};
    layout(t: any, i: any, h: any, s: any): void;
    l(): void;
    setFixedWidth(t: any): void;
    m(): void;
    isActive(): boolean;
    styles(t: any): void;
    c: any;
    activate(t: any): void;
    a: m | undefined;
    f: {
        element: HTMLElement;
        layout: () => void;
        minimumSize: number;
        maximumSize: number;
        onDidChange: any;
    }[] | undefined;
    isDefault(t: any): boolean;
    dispose(): void;
}
import { $ud as g } from "../../../common/lifecycle.js";
import { $Y9 as m } from "../splitview/splitview.js";
//# sourceMappingURL=centeredViewLayout.d.ts.map