export class CanceledLazyPromise extends LazyPromise {
    _err: CancellationError;
}
export class LazyPromise {
    _actual: Promise<any> | null;
    _actualOk: ((value: any) => void) | null;
    _actualErr: ((reason?: any) => void) | null;
    _hasValue: boolean;
    _value: any;
    _hasErr: boolean;
    _err: any;
    _ensureActual(): Promise<any>;
    resolveOk(value: any): void;
    resolveErr(err: any): void;
    then(success: any, error: any): Promise<any>;
    catch(error: any): Promise<any>;
    finally(callback: any): Promise<any>;
    get [Symbol.toStringTag](): string;
}
import { CancellationError } from "../../../../base/common/errors.js";
//# sourceMappingURL=lazyPromise.d.ts.map