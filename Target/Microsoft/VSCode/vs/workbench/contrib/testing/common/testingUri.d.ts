declare const m: "vscode-test-data";
declare function g(t: any): {
    resultId: any;
    taskIndex: number;
    testExtId: any;
    messageIndex: number;
    type: number;
} | {
    resultId: any;
    taskIndex: number;
    testExtId: any;
    type: number;
    messageIndex?: never;
} | {
    resultId: any;
    taskIndex: number;
    type: number;
    testExtId?: never;
    messageIndex?: never;
} | undefined;
declare function O(t: any): {
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
declare var l: any;
export { m as $7lc, g as $8lc, O as $9lc, l as TestUriType };
//# sourceMappingURL=testingUri.d.ts.map