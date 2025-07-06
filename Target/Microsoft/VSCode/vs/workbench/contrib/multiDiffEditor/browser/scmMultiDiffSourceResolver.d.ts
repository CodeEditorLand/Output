declare let l: {
    new (t: any, e: any): {
        d: any;
        f: any;
        canHandleUri(t: any): boolean;
        resolveDiffSource(t: any): Promise<E>;
    };
    b: string | undefined;
    getMultiDiffSourceUri(t: any, e: any): {
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
    c(t: any): {
        repositoryUri: {
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
        groupId: string;
    } | undefined;
};
declare let g: {
    new (t: any): {
        b: any;
        canHandleUri(t: any): boolean;
        resolveDiffSource(t: any): Promise<{
            resources: {
                value: any;
                onDidChange: any;
            };
        }>;
    };
    scheme: string | undefined;
    getMultiDiffSourceUri(t: any, e: any): {
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
    parseUri(t: any): {
        repositoryId: string;
        historyItemId: string;
        historyItemParentId: any;
    } | undefined;
};
declare let b: {
    new (t: any, e: any): {
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class w extends R {
    static openMultiFileDiffEditor(t: any, e: any, r: any, i: any, o: any): Promise<any>;
    constructor();
    run(t: any, e: any): Promise<void>;
}
declare class E {
    constructor(t: any, e: any);
    c: any;
    d: any;
    b: import("../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
    resources: S;
    contextKeys: {
        scmResourceGroup: any;
        scmProvider: any;
    };
}
import { $KI as R } from "../../../../platform/actions/common/actions.js";
import { ValueWithChangeEventFromObservable as S } from "../../../../base/common/observable.js";
export { l as $3oc, g as $4oc, b as $5oc, w as $6oc };
//# sourceMappingURL=scmMultiDiffSourceResolver.d.ts.map