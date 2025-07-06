declare let b: {
    new (i: any, e: any, t: any, s: boolean | undefined, o: any, f: any, u: any, c: any, g: any): {
        readonly resource: any;
        readonly capabilities: number;
        readonly typeId: any;
        getName(): string;
        readonly editorId: string;
        getIcon(): any;
        multiDiffSource: any;
        label: any;
        initialResources: any;
        isTransient: boolean;
        c: any;
        m: any;
        s: any;
        t: any;
        u: any;
        b: string;
        w: P;
        z: W;
        resources: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        C: ai;
        D: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        F: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        onDidChangeDirty: any;
        closeHandler: {
            confirm(): Promise<number>;
            showConfirm(): boolean;
        };
        serialize(): {
            label: any;
            multiDiffSourceUri: any;
            resources: any;
        };
        setLanguageId(i: any, e: any): void;
        getViewModel(): Promise<any>;
        y(): Promise<{
            dispose: () => any;
            documents: K;
            contextKeys: any;
        }>;
        matches(i: any): boolean;
        isDirty(): any;
        save(i: any, e: any): Promise</*elided*/ any>;
        revert(i: any, e: any): Promise<void>;
        G(i: any, e: any, t: any): Promise<void>;
        f: any;
        g: any;
        j: any;
        n: any;
        onDidChangeLabel: any;
        onDidChangeCapabilities: any;
        onWillDispose: any;
        hasCapability(e: any): boolean;
        isReadonly(): boolean;
        getDescription(e: any): void;
        getTitle(e: any): string;
        getLabelExtraClasses(): never[];
        getAriaLabel(): string;
        getTelemetryDescriptor(): {
            typeId: any;
        };
        isModified(): boolean;
        isSaving(): boolean;
        resolve(): Promise<null>;
        saveAs(e: any, t: any): Promise</*elided*/ any>;
        rename(e: any, t: any): Promise<void>;
        copy(): /*elided*/ any;
        canMove(e: any, t: any): boolean;
        prefersEditorPane(e: any): any;
        toUntyped(e: any): void;
        isDisposed(): boolean;
        dispose(): void;
        q: L;
        B(t: any): any;
    };
    fromResourceMultiDiffEditorInput(i: any, e: any): any;
    fromSerialized(i: any, e: any): any;
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let I: {
    new (i: any, e: any): {
        q: L;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class xi {
    canSerialize(i: any): boolean;
    serialize(i: any): string | undefined;
    deserialize(i: any, e: any): any;
}
import { $ai as P } from "../../../../base/common/async.js";
import { ObservableLazyPromise as W } from "../../../../base/common/observable.js";
declare class ai {
    constructor(i: any, e: any, t: any);
    f: any;
    g: any;
    j: any;
    b: number;
    c: Map<any, any>;
    k: (s: any) => void;
    filteredEvent(i: any): (e: any) => {
        dispose: () => void;
    };
    d: any;
}
import { ValueWithChangeEventFromObservable as K } from "../../../../base/common/observable.js";
import { $ud as L } from "../../../../base/common/lifecycle.js";
export { b as $oYb, I as $pYb, xi as $qYb };
//# sourceMappingURL=multiDiffEditorInput.d.ts.map