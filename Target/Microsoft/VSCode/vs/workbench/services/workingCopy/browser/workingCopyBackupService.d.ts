export { n as $ECc };
declare let n: {
    new (r: any, o: any, t: any, f: any): {
        b: any;
        g: any;
        a: any;
        h(t: any): import("../common/workingCopyBackupService.js").$ACc | {
            m: any;
            n: any;
            r: any;
            g: any;
            initialize(t: any): void;
            h: Promise<import("../common/workingCopyBackupService.js").$yCc> | undefined;
            s(): Promise<import("../common/workingCopyBackupService.js").$yCc>;
            j: import("../common/workingCopyBackupService.js").$yCc | undefined;
            hasBackups(): Promise<boolean>;
            hasBackupSync(t: any, e: any, s: any): boolean;
            backup(t: any, e: any, s: any, r: any, a: any): Promise<any>;
            t(t: any, e: any): string;
            discardBackups(t: any): Promise<void>;
            discardBackup(t: any, e: any): Promise<any>;
            u(t: any, e: any): Promise<any>;
            w(t: any): Promise<void>;
            getBackups(): Promise<any>;
            y(t: any, e: any): Promise<undefined>;
            z(t: any, e: any, s: any): Promise<any>;
            resolve(t: any): Promise<undefined>;
            C(t: any): {
                typeId: any;
                meta: any;
            };
            toBackupResource(t: any): any;
            joinBackups(): any;
            q: import("../../../../base/common/lifecycle.js").$ud;
            dispose(): void;
            B(t: any): any;
        };
        reinitialize(t: any): void;
        hasBackups(): any;
        hasBackupSync(t: any, e: any, s: any): any;
        backup(t: any, e: any, s: any, r: any, a: any): any;
        discardBackup(t: any, e: any): any;
        discardBackups(t: any): any;
        getBackups(): any;
        resolve(t: any): any;
        toBackupResource(t: any): any;
        joinBackups(): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=workingCopyBackupService.d.ts.map