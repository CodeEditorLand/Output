declare class I extends B {
    a: d;
    hasBackups(): Promise<boolean>;
    hasBackupSync(t: any, e: any): boolean;
    backup(t: any, e: any, s: any, r: any, a: any): Promise<void>;
    resolve(t: any): Promise<{
        value: {
            e: any;
            f: any;
            a: {
                flowing: boolean;
                ended: boolean;
                destroyed: boolean;
            };
            b: {
                data: never[];
                error: never[];
            };
            c: {
                data: never[];
                error: never[];
                end: never[];
            };
            d: any[];
            pause(): void;
            resume(): void;
            write(e: any): Promise<any> | undefined;
            error(e: any): void;
            end(e: any): void;
            g(e: any): void;
            h(e: any): void;
            i(): void;
            on(e: any, t: any): void;
            removeListener(e: any, t: any): void;
            j(): void;
            k(): void;
            l(): boolean;
            destroy(): void;
        };
        meta: any;
    } | undefined>;
    getBackups(): Promise<{
        typeId: any;
        resource: any;
    }[]>;
    discardBackup(t: any): Promise<void>;
    discardBackups(t: any): Promise<void>;
    toBackupResource(t: any): {
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
    joinBackups(): Promise<void>;
}
declare function q(i: any): any;
declare class w {
    static create(t: any, e: any): Promise<w>;
    constructor(t: any, e: any);
    b: any;
    c: any;
    a: d;
    d(): Promise<void>;
    add(t: any, e: number | undefined, s: any): void;
    update(t: any, e: any): void;
    count(): number;
    has(t: any, e: any, s: any): boolean;
    get(): any[];
    remove(t: any): void;
    clear(): void;
}
declare let R: {
    new (t: any, e: any, s: any): {
        b: any;
        g: any;
        a: any;
        h(t: any): I | {
            m: any;
            n: any;
            r: any;
            g: any;
            initialize(t: any): void;
            h: Promise<w> | undefined;
            s(): Promise<w>;
            j: w | undefined;
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
import { $vd as B } from "../../../../base/common/lifecycle.js";
import { $Ic as d } from "../../../../base/common/map.js";
export { I as $ACc, q as $BCc, w as $yCc, R as $zCc };
//# sourceMappingURL=workingCopyBackupService.d.ts.map