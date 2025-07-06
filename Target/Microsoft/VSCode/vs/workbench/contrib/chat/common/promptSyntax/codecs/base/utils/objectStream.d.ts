declare class e extends h {
    static fromArray(t: any, s: any): e;
    constructor(t: any, s: any);
    g: any;
    h: any;
    b: boolean;
    c: {
        e: any;
        f: any;
        a: {
            flowing: boolean;
            ended: boolean;
            destroyed: boolean;
        };
        b: {
            data: never[];
            error: never[];
        };
        c: {
            data: never[];
            error: never[];
            end: never[];
        };
        d: any[];
        pause(): void;
        resume(): void;
        write(e: any): Promise<any> | undefined;
        error(e: any): void;
        end(e: any): void;
        g(e: any): void;
        h(e: any): void;
        i(): void;
        on(e: any, t: any): void;
        removeListener(e: any, t: any): void;
        j(): void;
        k(): void;
        l(): boolean;
        destroy(): void;
    };
    send(t?: boolean): void;
    f: NodeJS.Timeout | undefined;
    stopStream(): this;
    j(t?: number): Promise<void>;
    m(): this;
    pause(): void;
    resume(): void;
    destroy(): void;
    removeListener(t: any, s: any): void;
    on(t: any, s: any): void;
}
declare function o(i: any): Generator<any, void, unknown>;
import { $8Q as h } from "../../../utils/observableDisposable.js";
export { e as $yR, o as $zR };
//# sourceMappingURL=objectStream.d.ts.map