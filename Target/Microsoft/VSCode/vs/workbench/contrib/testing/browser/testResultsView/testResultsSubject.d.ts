declare function x(t: any, e: any): {
    $mid: number;
    test: any;
    message: any;
};
declare function y(t: any): boolean;
declare class o {
    constructor(e: any, s: any, i: any, n: any);
    get controllerId(): any;
    get isDiffable(): any;
    get contextValue(): any;
    get stack(): any;
    result: any;
    taskIndex: any;
    messageIndex: any;
    test: any;
    expectedUri: {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    } | undefined;
    actualUri: {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    } | undefined;
    messageUri: {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    } | undefined;
    message: any;
    context: {
        $mid: number;
        test: any;
        message: any;
    };
    revealLocation: any;
}
declare class m {
    constructor(e: any, s: any);
    get controllerId(): any;
    result: any;
    taskIndex: any;
    outputUri: {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    } | undefined;
}
declare class h {
    constructor(e: any, s: any, i: any);
    get controllerId(): any;
    result: any;
    taskIndex: any;
    test: any;
    outputUri: {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    } | undefined;
    task: any;
}
declare function U(t: any, e: any): boolean;
declare function T(t: any, e: any): any;
declare function z(t: any): any;
export { x as $amc, y as $bmc, o as $cmc, m as $dmc, h as $emc, U as $fmc, T as $gmc, z as $hmc };
//# sourceMappingURL=testResultsSubject.d.ts.map