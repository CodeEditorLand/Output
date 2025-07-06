declare function D(e: any, s: any, t: any): string;
declare const u: h;
declare function x(e: any, s: any, t: any, n: any, d: any): Promise<any>;
declare class B extends w {
    constructor(s: any, t: any);
    g: any;
    a: any;
    onData: (...n: any[]) => any;
    b: any;
    onDidDispose: any;
    f: boolean;
    onClose: any;
    onEnd: any;
    pauseData(): void;
    drain(): Promise<void>;
    end(): void;
    traceSocketEvent(s: any, t: any): void;
}
import { $Ki as h } from "../../../base/common/buffer.js";
import { $vd as w } from "../../../base/common/lifecycle.js";
export { D as $SZb, u as $TZb, x as $UZb, B as $VZb };
//# sourceMappingURL=managedSocket.d.ts.map