declare const M: any;
declare function C(i: any, t: any): any;
declare function U(i: any): any[][];
declare let p: {
    new (t: any, e: any): {
        h: any;
        j: Map<any, any>;
        onDidChange: any;
        f: any;
        g: {
            2: any;
            4: any;
            8: any;
            16: any;
            32: any;
            64: any;
        };
        addProfile(t: any, e: any): void;
        updateProfile(t: any, e: any, r: any): void;
        configure(t: any, e: any): void;
        removeProfile(t: any, e: any): void;
        capabilitiesForTest(t: any): number;
        all(): MapIterator<any>;
        getControllerProfiles(t: any): any;
        getGroupDefaultProfiles(t: any, e: any): any;
        setGroupDefaultProfiles(t: any, e: any): void;
        getDefaultProfileForTest(t: any, e: any): any;
        m(): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { M as $G3b, C as $H3b, U as $I3b, p as $J3b };
//# sourceMappingURL=testProfileService.d.ts.map