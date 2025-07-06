declare let a: {
    new (t: any, e: any): {
        a: any;
        b: any;
        provideTextContent(t: any): Promise<any>;
    };
    scheme: string | undefined;
    getFileURI(t: any, e: any, s: any): {
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
    };
};
declare let u: {
    new (t: any, e: any): {
        a: any;
        b: any;
        provideTextContent(t: any): Promise<any>;
    };
    getSnapshotFileURI(t: any, e: any, s: any, i: any): {
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
    };
};
export { a as $Jgc, u as $Kgc };
//# sourceMappingURL=chatEditingTextModelContentProviders.d.ts.map