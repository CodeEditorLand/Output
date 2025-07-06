export { p as $lCc };
declare let p: {
    new (t: any, e: any, r: any, i: any, s: any, o: any): {
        b: any;
        c: any;
        f: any;
        g: any;
        h: any;
        j: any;
        a: any;
        onDidChangeRecentlyOpened: any;
        m(): void;
        n(t: any): void;
        r(): void;
        getRecentlyOpened(): Promise<{
            workspaces: never[];
            files: never[];
        }>;
        addRecentlyOpened(t: any): Promise<any>;
        removeRecentlyOpened(t: any): Promise<any>;
        s(t: any, e: any): void;
        t(t: any): Promise<any>;
        clearRecentlyOpened(): Promise<void>;
        enterWorkspace(t: any): Promise<{
            workspace: {
                id: any;
                configPath: any;
            };
        }>;
        createUntitledWorkspace(t: any, e: any): Promise<{
            id: any;
            configPath: any;
        }>;
        deleteUntitledWorkspace(t: any): Promise<void>;
        getWorkspaceIdentifier(t: any): Promise<{
            id: any;
            configPath: any;
        }>;
        getDirtyWorkspaces(): Promise<never[]>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    RECENTLY_OPENED_KEY: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=workspacesService.d.ts.map