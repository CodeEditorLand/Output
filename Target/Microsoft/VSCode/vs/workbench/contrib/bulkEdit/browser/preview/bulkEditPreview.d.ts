declare class X {
    c: WeakMap<WeakKey, any>;
    d: number;
    f: N;
    onDidChange: any;
    dispose(): void;
    get checkedCount(): number;
    isChecked(t: any): any;
    updateChecked(t: any, e: any): void;
}
declare class G {
    constructor(t: any, e: any);
    parent: any;
    textEdit: any;
}
declare class H {
    constructor(t: any, e: any);
    uri: any;
    parent: any;
    type: number;
    textEdits: any[];
    originalEdits: Map<any, any>;
    addEdit(t: any, e: any, s: any): void;
    newUri: any;
    needsConfirmation(): boolean;
}
declare class p {
    static keyOf(t: any): any;
    constructor(t?: Readonly<{
        label: any;
        icon: {
            id: any;
        };
        needsConfirmation: false;
    }> | undefined);
    metadata: Readonly<{
        label: any;
        icon: {
            id: any;
        };
        needsConfirmation: false;
    }> | undefined;
    operationByResource: Map<any, any>;
    get fileOperations(): MapIterator<any>;
}
declare let M: {
    new (t: any, e: any, s: any): {
        c: any;
        d: any;
        checked: X;
        fileOperations: any[];
        categories: any[];
        conflicts: any;
        dispose(): void;
        _init(): Promise</*elided*/ any>;
        getWorkspaceEdit(): any;
        f(t: any): Promise<{
            range: any;
            text: any;
            forceMoveMarkers: boolean;
        } | undefined>;
        getFileEdits(t: any): Promise<{
            range: any;
            text: any;
            forceMoveMarkers: boolean;
        }[]>;
        getUriOfEdit(t: any): any;
    };
    create(t: any, e: any): Promise<any>;
};
declare let b: {
    new (t: any, e: any, s: any, o: any): {
        j: any;
        k: any;
        l: any;
        m: any;
        d: U;
        g: Map<any, any>;
        h: string;
        f: Promise<void>;
        dispose(): void;
        asPreviewUri(t: any): {
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
        n(): Promise<void>;
        o(t: any): Promise<void>;
        p(t: any): Promise<any>;
        provideTextContent(t: any): Promise<any>;
    };
    c: string | undefined;
    emptyPreview: {
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
    fromPreviewUri(t: any): {
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
declare var R: any;
import { $ef as N } from "../../../../../base/common/event.js";
import { $ud as U } from "../../../../../base/common/lifecycle.js";
export { X as $ioc, G as $joc, H as $koc, p as $loc, M as $moc, b as $noc, R as BulkFileOperationType };
//# sourceMappingURL=bulkEditPreview.d.ts.map