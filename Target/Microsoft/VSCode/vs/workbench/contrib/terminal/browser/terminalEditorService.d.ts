export { v as $psc };
declare let v: {
    new (t: any, i: any, e: any, s: any, n: any, u: any): {
        t: any;
        u: any;
        w: any;
        y: any;
        instances: any[];
        a: number;
        b: boolean;
        g: Map<any, any>;
        h: Map<any, any>;
        j: any;
        onDidDisposeInstance: any;
        m: any;
        onDidFocusInstance: any;
        n: any;
        onDidChangeInstanceCapability: any;
        r: any;
        onDidChangeActiveInstance: any;
        s: any;
        onDidChangeInstances: any;
        f: any;
        z(): any;
        readonly activeInstance: any;
        setActiveInstance(t: any): void;
        focusInstance(t: any): Promise<any>;
        focusActiveInstance(): Promise<any>;
        openEditor(t: any, i: any): Promise<void>;
        c: {
            instanceId: any;
            promise: any;
        } | undefined;
        resolveResource(t: any): any;
        getInputFromResource(t: any): any;
        C(t: any, i: any, e: any): void;
        D(t: any): void;
        getInstanceFromResource(t: any): any;
        splitInstance(t: any, i?: {}): any;
        reviveInput(t: any): any;
        detachInstance(t: any): void;
        revealActiveEditor(t: any): Promise<void>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=terminalEditorService.d.ts.map