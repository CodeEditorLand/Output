declare let z: {
    new (t: any, e: any, i: any, r: any, o: any, n: any, d: any, h: any, s: any): {
        n: any;
        s: any;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        h: boolean;
        j: Map<any, any>;
        m: any;
        g: P;
        dispose(): void;
        C(t: any): void;
        clearEditorCache(): void;
        D(t: any): any;
        F(t: any): M;
        G(): void;
        get(t: any): any;
        add(t: any, e?: boolean): any;
        getContributedNotebook(t: any): any[];
        q: M;
        B(t: any): any;
    };
    c: string | undefined;
    f: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let B: {
    new (t: any): {
        c: Map<any, any>;
        f: ot;
        d: P;
        clear(): void;
        get(t: any): any;
        getAll(): any[];
        add(t: any): void;
        setPreferred(t: any, e: any, i: any): void;
        findBestRenderers(t: any, e: any, i: any): {
            mimeType: any;
            rendererId: any;
            isTrusted: boolean;
        }[];
    };
};
declare let V: {
    new (t: any, e: any, i: any, r: any, o: any, n: any): {
        readonly m: any;
        j: any;
        L: any;
        M: any;
        N: any;
        O: any;
        P: any;
        Q: any;
        h: Map<any, any>;
        n: any;
        s: any;
        onDidChangeOutputRenderers: any;
        t: Set<any>;
        u: rt;
        w: any;
        y: any;
        z: any;
        C: any;
        onWillAddNotebookDocument: any;
        onDidAddNotebookDocument: any;
        onDidRemoveNotebookDocument: any;
        onWillRemoveNotebookDocument: any;
        D: any;
        onAddViewType: any;
        F: any;
        onWillRemoveViewType: any;
        G: any;
        onDidChangeEditorTypes: any;
        I: boolean;
        J: mt;
        f: P;
        g: any;
        getEditorTypes(): {
            id: any;
            displayName: any;
            providerDisplayName: any;
        }[];
        clearEditorCache(): void;
        R(t: any): void;
        canResolve(t: any): Promise<boolean>;
        registerContributedNotebookType(t: any, e: any): any;
        S(t: any, e: any): any;
        registerNotebookSerializer(t: any, e: any, i: any): any;
        withNotebookDataProvider(t: any): Promise<any>;
        tryGetDataProviderSync(t: any): any;
        U(): void;
        getViewTypeProvider(t: any): any;
        getRendererInfo(t: any): any;
        updateMimePreferredRenderer(t: any, e: any, i: any, r: any): void;
        saveMimeDisplayOrder(t: any): void;
        getRenderers(): any;
        getStaticPreloads(t: any): Generator<any, void, unknown>;
        createNotebookTextModel(t: any, e: any, i: any): Promise<any>;
        createNotebookTextDocumentSnapshot(t: any, e: any, i: any): Promise<{
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
        }>;
        restoreNotebookTextModelFromSnapshot(t: any, e: any, i: any): Promise<any>;
        getNotebookTextModel(t: any): any;
        getNotebookTextModels(): any;
        listNotebookDocuments(): any[];
        W(t: any): void;
        getOutputMimeTypeInfo(t: any, e: any, i: any): any[];
        getContributedNotebookTypes(t: any): any;
        hasSupportedNotebooks(t: any): any;
        getContributedNotebookType(t: any): any;
        getNotebookProviderResourceRoots(): any[];
        setToCopy(t: any, e: any): void;
        H: any;
        getToCopy(): {
            items: any;
            isCopy: boolean;
        } | undefined;
        q: M;
        dispose(): void;
        B(t: any): any;
    };
    c: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Dub as P } from "../../../../common/memento.js";
import { $ud as M } from "../../../../../base/common/lifecycle.js";
import { $wf as ot } from "../../../../../base/common/lazy.js";
import { $Ic as rt } from "../../../../../base/common/map.js";
import { $WL as mt } from "../../common/notebookCommon.js";
export { z as $x$b, B as $y$b, V as $z$b };
//# sourceMappingURL=notebookServiceImpl.d.ts.map