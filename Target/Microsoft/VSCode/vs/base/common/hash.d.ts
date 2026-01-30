export class StringSHA1 {
    _h0: number;
    _h1: number;
    _h2: number;
    _h3: number;
    _h4: number;
    _buff: Uint8Array<ArrayBuffer>;
    _buffDV: DataView<ArrayBuffer>;
    _buffLen: number;
    _totalLen: number;
    _leftoverHighSurrogate: number;
    _finished: boolean;
    update(str: any): void;
    _push(buff: any, buffLen: any, codePoint: any): any;
    digest(): string;
    _wrapUp(): void;
    _step(): void;
}
export function doHash(obj: any, hashVal: any): any;
export function hash(obj: any): any;
export const hashAsync: any;
export function numberHash(val: any, initialHashVal: any): number;
export function stringHash(s: any, hashVal: any): any;
//# sourceMappingURL=hash.d.ts.map