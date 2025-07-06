declare const x: any;
declare let h: {
    new (t: any, e: any, o: any, i: any): {
        f: any;
        g: any;
        h: any;
        a: any;
        b: Set<any>;
        c: boolean;
        initializeExtensionUsageCache(): Promise<void>;
        extensionUsesAuth(t: any): Promise<boolean>;
        readAccountUsages(t: any, e: any): any;
        removeAccountUsage(t: any, e: any): void;
        addAccountUsage(t: any, e: any, o: any, i: any, s: any): void;
        j(t: any): Promise<void>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { x as $yOb, h as $zOb };
//# sourceMappingURL=authenticationUsageService.d.ts.map