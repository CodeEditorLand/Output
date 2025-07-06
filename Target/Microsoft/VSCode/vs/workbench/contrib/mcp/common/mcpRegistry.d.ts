export { $ as $kic };
declare let $: {
    new (e: any, i: any, n: any, t: any, r: any, s: any, o: any, d: any): {
        readonly delegates: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        w: any;
        y: any;
        z: any;
        C: any;
        D: any;
        F: any;
        G: any;
        f: Map<any, any>;
        g: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        h: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        collections: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        m: m;
        n: m;
        r: m;
        t: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        lazyCollectionState: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        u: any;
        onDidChangeInputs: any;
        j: import("../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
        registerDelegate(e: any): {
            dispose: () => void;
        };
        registerCollection(e: any): {
            dispose: () => void;
        };
        getServerDefinition(e: any, i: any): any;
        discoverCollections(): Promise<any[]>;
        H(e: any): any;
        I(e: any): any;
        clearSavedInputs(e: any, i: any): Promise<void>;
        editSavedInput(e: any, i: any, n: any, t: any): Promise<void>;
        setSavedInput(e: any, i: any, n: any): Promise<void>;
        getSavedInputs(e: any): any;
        resetTrust(): void;
        getTrust(e: any): import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        J(e: any): any;
        L(e: any): Promise<any>;
        M(e: any, i: any): Promise<void>;
        N(e: any, i: any): Promise<any>;
        resolveConnection({ collectionRef: e, definitionRef: i, forceTrust: n, logger: t, debug: r }: {
            collectionRef: any;
            definitionRef: any;
            forceTrust: any;
            logger: any;
            debug: any;
        }): Promise<any>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $wf as m } from "../../../../base/common/lazy.js";
//# sourceMappingURL=mcpRegistry.d.ts.map