declare class y extends f {
    constructor(i: any, t: any);
    a: any;
    b: any;
    c(): void;
    show(i: any, t: any): Readonly<{
        total(): void;
        worked(): void;
        done(): void;
    }> | {
        total: (s: any) => void;
        worked: (s: any) => void;
        done: () => void;
    };
    f(i: any, t: any): {
        total: (s: any) => void;
        worked: (s: any) => void;
        done: () => void;
    };
    showWhile(i: any, t: any): Promise<void>;
    g(i: any, t: any): Promise<void>;
}
declare class d extends f {
    constructor(i: any, t: any);
    b: any;
    c: any;
    a: any;
    registerListeners(): void;
    f(): void;
    g(): void;
    show(i: any, t: any): {
        total: (s: any) => void;
        worked: (s: any) => void;
        done: () => void;
    };
    showWhile(i: any, t: any): Promise<void>;
    h(i: any): void;
}
declare class u extends f {
    constructor(i: any, t: any);
    get isActive(): any;
    b: any;
    c: any;
    a: any;
    onDidChangeActive: any;
    f(i: any): void;
    g(i: any): void;
}
import { $vd as f } from "../../../../base/common/lifecycle.js";
export { y as $Qxb, d as $Rxb, u as $Sxb };
//# sourceMappingURL=progressIndicator.d.ts.map