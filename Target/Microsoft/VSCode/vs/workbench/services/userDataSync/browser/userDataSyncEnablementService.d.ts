export { r as $NCc };
declare const r_base: {
    new (e: any, t: any, n: any): {
        c: any;
        f: any;
        g: any;
        a: import("../../../workbench.web.main.internal.js").Emitter;
        onDidChangeEnablement: any;
        b: import("../../../workbench.web.main.internal.js").Emitter;
        onDidChangeResourceEnablement: any;
        isEnabled(): any;
        canToggleEnablement(): boolean;
        setEnablement(e: any): void;
        isResourceEnabled(e: any, t: any): any;
        isResourceEnablementConfigured(e: any): boolean;
        setResourceEnablement(e: any, t: any): void;
        getResourceSyncStateVersion(e: any): void;
        h(e: any, t: any): void;
        j(e: any): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class r extends r_base {
    get m(): any;
    getResourceSyncStateVersion(e: any): any;
}
//# sourceMappingURL=userDataSyncEnablementService.d.ts.map