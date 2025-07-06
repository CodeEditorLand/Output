export { $ as $nCc };
declare let $: {
    new (o: any, t: any, i: any, e: any, m: any, p: any, n: any, c: any, l: any, s: any, u: any, a: any, _: any, h: any, b: any, d: any): {
        enterWorkspace(o: any): Promise<void>;
        a: any;
        b: any;
        c: any;
        f: any;
        g: any;
        h: any;
        j: any;
        m: any;
        n: any;
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        pickNewWorkspacePath(): Promise<any>;
        C(): any;
        updateFolders(t: any, e: any, r: any, s: any): Promise<any>;
        D(t: any, e: any, r: any, s?: boolean): Promise<void>;
        addFolders(t: any, e?: boolean): Promise<any>;
        F(t: any, e: any, r?: boolean): Promise<any>;
        removeFolders(t: any, e?: boolean): Promise<any>;
        G(t: any): any;
        createAndEnterWorkspace(t: any, e: any): Promise<any>;
        saveAndEnterWorkspace(t: any): Promise<any>;
        isValidTargetWorkspacePath(t: any): Promise<boolean>;
        H(t: any, e: any): Promise<void>;
        I(t: any): Promise<void>;
        J(t: any): void;
        L(): void;
        M(t: any): void;
        N(t: any): Promise<any>;
        O(t: any): any;
        copyWorkspaceSettings(t: any): any;
        P(t: any, e: any): any;
        Q(t: any): Promise<void>;
        R(): {
            id: any;
            configPath?: never;
            uri?: never;
        } | {
            id: any;
            configPath: any;
            uri?: never;
        } | {
            id: any;
            uri: any;
            configPath?: never;
        } | undefined;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=workspaceEditingService.d.ts.map