declare class r {
    a: Promise<any> | null;
    b: ((value: any) => void) | null;
    d: ((reason?: any) => void) | null;
    f: boolean;
    g: any;
    h: boolean;
    i: any;
    j(): Promise<any>;
    resolveOk(t: any): void;
    resolveErr(t: any): void;
    then(t: any, i: any): Promise<any>;
    catch(t: any): Promise<any>;
    finally(t: any): Promise<any>;
    get [Symbol.toStringTag](): string;
}
declare class l extends r {
    i: h;
}
import { $qb as h } from "../../../../base/common/errors.js";
export { r as $MBc, l as $NBc };
//# sourceMappingURL=lazyPromise.d.ts.map