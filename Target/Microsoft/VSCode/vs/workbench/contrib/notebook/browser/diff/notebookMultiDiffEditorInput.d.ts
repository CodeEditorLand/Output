declare const x: "multi-cell-notebook-diff-editor";
declare const l_base: {
    new (i: any, e: any, o: any, s: any, r: any, t: any): {
        readonly resource: any;
        readonly editorId: any;
        original: any;
        modified: any;
        viewType: any;
        D: any;
        F: any;
        readonly typeId: any;
        resolve(): Promise<any>;
        G: any;
        toUntyped(): {
            original: {
                resource: any;
            };
            modified: {
                resource: any;
            };
            primary: {
                resource: any;
            };
            secondary: {
                resource: any;
            };
            options: {
                override: any;
            };
        };
        matches(i: any): any;
        dispose(): void;
        readonly capabilities: any;
        w: any;
        u: {
            name: any;
            shortDescription: any;
            mediumDescription: any;
            longDescription: any;
            forceDescription: boolean;
            shortTitle: any;
            mediumTitle: any;
            longTitle: any;
        };
        y(): {
            name: any;
            shortDescription: any;
            mediumDescription: any;
            longDescription: any;
            forceDescription: boolean;
            shortTitle: any;
            mediumTitle: any;
            longTitle: any;
        };
        z(i: any, t: any, e?: string): any;
        getName(): any;
        getDescription(i?: number): any;
        getTitle(i: any): any;
        t: any;
        prefersEditorPane(i: any): any;
        C(): Promise<import("../../../../common/editor/diffEditorModel.js").$aHb>;
        b: any;
        c: any;
        secondary: any;
        primary: any;
        h: any;
        a: any;
        m(): void;
        getPreferredName(): any;
        getPreferredDescription(): any;
        r(): any;
        getLabelExtraClasses(): any;
        getAriaLabel(): any;
        getTelemetryDescriptor(): any;
        isDirty(): any;
        isSaving(): any;
        save(e: any, r: any): Promise<any>;
        saveAs(e: any, r: any): Promise<any>;
        s(e: any): any;
        revert(e: any, r: any): any;
        rename(e: any, r: any): Promise<{
            editor: any;
            options: any;
        } | {
            editor: {
                label: any;
                description: any;
                primary: any;
                secondary: any;
                options: any;
            };
            options?: never;
        } | undefined>;
        isReadonly(): any;
        f: any;
        g: any;
        j: any;
        n: any;
        onDidChangeDirty: any;
        onDidChangeLabel: any;
        onDidChangeCapabilities: any;
        onWillDispose: any;
        hasCapability(e: any): boolean;
        getIcon(): void;
        isModified(): boolean;
        copy(): /*elided*/ any;
        canMove(e: any, t: any): boolean;
        isDisposed(): boolean;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    create(i: any, e: any, o: any, s: any, r: any, t: any): any;
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class l extends l_base {
}
declare let a: {
    new (t: any, r: any, e: any, i: any, o: any, n: any, f: any): {
        H: any;
        canHandleUri(t: any): boolean;
        resolveDiffSource(t: any): Promise<{
            resources: any;
        }>;
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
        w: import("../../../../../base/common/async.js").$ai;
        z: import("../../../../../base/common/observable.js").ObservableLazyPromise;
        resources: import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        C: {
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
        };
        D: import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        F: import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
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
            documents: import("../../../../../base/common/observable.js").ValueWithChangeEventFromObservable;
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
        q: import("../../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    createInput(t: any, r: any): any;
    fromResourceMultiDiffEditorInput(i: any, e: any): any;
    fromSerialized(i: any, e: any): any;
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { x as $u$b, l as $v$b, a as $w$b };
//# sourceMappingURL=notebookMultiDiffEditorInput.d.ts.map