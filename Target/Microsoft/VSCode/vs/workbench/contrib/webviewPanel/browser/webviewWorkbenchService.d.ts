declare const D: any;
declare let h: {
    new (e: any, t: any, i: any): {
        y: any;
        u: boolean;
        dispose(): void;
        resolve(): Promise<null>;
        w: {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        } | undefined;
        t(e: any): any;
        readonly typeId: string | undefined;
        readonly editorId: any;
        readonly capabilities: number;
        readonly resource: {
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
        s: any;
        a: string;
        r: boolean;
        viewType: any;
        providedId: any;
        b: any;
        m: any;
        getName(): any;
        getTitle(e: any): any;
        getDescription(): void;
        setName(e: any): void;
        readonly webview: any;
        readonly extension: any;
        iconPath: any;
        c: any;
        matches(e: any): boolean;
        readonly group: any;
        updateGroup(e: any): void;
        h: any;
        claim(e: any, t: any, i: any): any;
        f: any;
        g: any;
        j: any;
        n: any;
        onDidChangeDirty: any;
        onDidChangeLabel: any;
        onDidChangeCapabilities: any;
        onWillDispose: any;
        hasCapability(e: any): boolean;
        isReadonly(): boolean;
        getLabelExtraClasses(): never[];
        getAriaLabel(): string;
        getIcon(): void;
        getTelemetryDescriptor(): {
            typeId: any;
        };
        isDirty(): boolean;
        isModified(): boolean;
        isSaving(): boolean;
        save(e: any, t: any): Promise</*elided*/ any>;
        saveAs(e: any, t: any): Promise</*elided*/ any>;
        revert(e: any, t: any): Promise<void>;
        rename(e: any, t: any): Promise<void>;
        copy(): /*elided*/ any;
        canMove(e: any, t: any): boolean;
        prefersEditorPane(e: any): any;
        toUntyped(e: any): void;
        isDisposed(): boolean;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    typeId: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let l: {
    new (e: any, t: any, i: any, r: any): {
        f: any;
        g: any;
        h: any;
        a: Set<any>;
        b: V;
        m: any;
        onDidChangeActiveWebviewEditor: any;
        c: any;
        readonly iconManager: any;
        n(e: any): any;
        r(): void;
        j: any;
        openWebview(e: any, t: any, i: any, r: any): any;
        revealWebview(e: any, t: any, i: any): void;
        s(e: any): any;
        openRevivedWebview(e: any): any;
        registerResolver(e: any): any;
        shouldPersist(e: any): any;
        t(e: any, t: any): Promise<boolean>;
        resolveWebview(e: any, t: any): Promise<any>;
        setIcons(e: any, t: any): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class V {
    a: any[];
    enqueueForRestoration(e: any, t: any): Promise<any>;
    reviveFor(e: any, t: any): void;
}
export { D as $6Xb, h as $7Xb, l as $8Xb };
//# sourceMappingURL=webviewWorkbenchService.d.ts.map