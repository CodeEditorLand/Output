declare const K: N;
declare const X: any;
declare let g: {
    new (t: any, e: any, i: any, s: any, o: any, h: any, u: any, l: any): {
        G: any;
        H: any;
        I: any;
        J: any;
        L: any;
        M: any;
        N: any;
        g: any;
        onDidChangeAutoSaveConfiguration: any;
        h: any;
        onDidChangeAutoSaveDisabled: any;
        j: any;
        onDidChangeFilesAssociation: any;
        m: any;
        onDidChangeReadonly: any;
        t: H;
        u: v;
        w: v;
        z: any;
        C: any;
        F: v;
        y: any;
        n: {
            autoSave: string | undefined;
            autoSaveDelay: any;
            autoSaveWorkspaceFilesOnly: boolean | undefined;
            autoSaveWhenNoErrors: boolean | undefined;
            isOutOfWorkspace: boolean | undefined;
            isShortAutoSaveDelay: boolean | undefined;
        };
        r: any;
        s: any;
        O(t: any): any;
        isReadonly(t: any, e: any): any;
        updateReadonly(t: any, e: any): Promise<void>;
        P(): void;
        Q(t: any, e: any): void;
        D: any;
        getAutoSaveConfiguration(t: any): any;
        R(t: any, e: any): {
            autoSave: string | undefined;
            autoSaveDelay: any;
            autoSaveWorkspaceFilesOnly: boolean | undefined;
            autoSaveWhenNoErrors: boolean | undefined;
            isOutOfWorkspace: boolean | undefined;
            isShortAutoSaveDelay: boolean | undefined;
        };
        S(t: any): any;
        hasShortAutoSaveDelay(t: any): boolean;
        getAutoSaveMode(t: any, e: any): {
            mode: number;
            reason?: never;
        } | {
            mode: number;
            reason: number;
        } | undefined;
        toggleAutoSave(): Promise<any>;
        enableAutoSaveAfterShortDelay(t: any): any;
        disableAutoSave(t: any): any;
        readonly isHotExitEnabled: boolean;
        readonly hotExitConfiguration: any;
        preventSaveConflicts(t: any, e: any): boolean;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    a: string | undefined;
    b: number | undefined;
    f: {
        providerReadonly: {
            value: any;
            isTrusted: boolean;
        };
        sessionReadonly: {
            value: any;
            isTrusted: boolean;
        };
        configuredReadonly: {
            value: any;
            isTrusted: boolean;
        };
        fileLocked: {
            value: any;
            isTrusted: boolean;
        };
        fileReadonly: {
            value: any;
            isTrusted: boolean;
        };
    } | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare var _: any;
declare var y: any;
import { $Wn as N } from "../../../../platform/contextkey/common/contextkey.js";
import { $Lc as H } from "../../../../base/common/map.js";
import { $Ic as v } from "../../../../base/common/map.js";
export { K as $vJ, X as $wJ, g as $xJ, _ as AutoSaveDisabledReason, y as AutoSaveMode };
//# sourceMappingURL=filesConfigurationService.d.ts.map