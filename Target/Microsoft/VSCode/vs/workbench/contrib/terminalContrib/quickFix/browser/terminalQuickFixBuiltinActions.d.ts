declare function Q(): {
    id: string;
    type: string;
    commandLineMatcher: RegExp;
    outputMatcher: {
        lineMatcher: RegExp;
        anchor: string;
        offset: number;
        length: number;
    };
    commandExitResult: string;
    getQuickFixes: (n: any) => {
        id: string;
        label: any;
        enabled: boolean;
        type: any;
        uri: {
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
        source: string;
    } | undefined;
};
declare function L(): {
    id: string;
    type: string;
    commandLineMatcher: RegExp;
    outputMatcher: {
        lineMatcher: RegExp;
        anchor: string;
        offset: number;
        length: number;
    };
    commandExitResult: string;
    getQuickFixes: (n: any) => {
        type: any;
        id: string;
        terminalCommand: string;
        shouldExecute: boolean;
        source: string;
    }[] | undefined;
};
declare const $: RegExp;
declare const C: RegExp;
declare const y: RegExp;
declare const l: RegExp;
declare const d: RegExp;
declare function P(): {
    id: string;
    type: string;
    commandLineMatcher: RegExp;
    outputMatcher: {
        lineMatcher: RegExp;
        anchor: string;
        offset: number;
        length: number;
    };
    commandExitResult: string;
    getQuickFixes: (n: any) => {
        id: string;
        type: any;
        terminalCommand: any;
        shouldExecute: boolean;
        source: string;
    }[] | undefined;
};
declare function T(): {
    id: string;
    type: string;
    commandLineMatcher: RegExp;
    outputMatcher: {
        lineMatcher: RegExp;
        anchor: string;
        offset: number;
        length: number;
    };
    commandExitResult: string;
    getQuickFixes: (n: any) => {
        type: any;
        id: string;
        terminalCommand: string;
        shouldExecute: boolean;
        source: string;
    };
};
declare function w(): {
    id: string;
    type: string;
    commandLineMatcher: RegExp;
    outputMatcher: {
        lineMatcher: RegExp;
        anchor: string;
        offset: number;
        length: number;
    };
    commandExitResult: string;
    getQuickFixes: (n: any) => {
        type: any;
        id: string;
        terminalCommand: any;
        shouldExecute: boolean;
        source: string;
    } | undefined;
};
declare function G(n: any): {
    id: string;
    type: string;
    commandLineMatcher: RegExp;
    outputMatcher: {
        lineMatcher: RegExp;
        anchor: string;
        offset: number;
        length: number;
    };
    commandExitResult: string;
    getQuickFixes: (t: any) => {
        type: any;
        class: undefined;
        tooltip: any;
        id: string;
        label: any;
        enabled: boolean;
        source: string;
        run: () => any;
    } | undefined;
};
declare const s: RegExp;
declare const x: RegExp;
declare const f: RegExp;
declare const M: RegExp;
declare const b: RegExp;
declare function v(): {
    id: string;
    type: string;
    commandLineMatcher: RegExp;
    outputMatcher: {
        lineMatcher: RegExp;
        anchor: string;
        offset: number;
        length: number;
    };
    commandExitResult: string;
    getQuickFixes: (n: any) => {
        id: string;
        type: any;
        terminalCommand: any;
        source: string;
    }[] | undefined;
};
declare function S(): {
    id: string;
    type: string;
    commandLineMatcher: RegExp;
    outputMatcher: {
        lineMatcher: RegExp;
        anchor: string;
        offset: number;
        length: number;
    };
    commandExitResult: string;
    getQuickFixes: (n: any) => {
        id: string;
        type: any;
        terminalCommand: any;
        source: string;
    }[] | undefined;
};
declare var p: any;
export { Q as $$tc, L as $0tc, $ as $1tc, C as $2tc, y as $3tc, l as $4tc, d as $5tc, P as $6tc, T as $7tc, w as $8tc, G as $9tc, s as $Vtc, x as $Wtc, f as $Xtc, M as $Ytc, b as $Ztc, v as $_tc, S as $auc, p as QuickFixSource };
//# sourceMappingURL=terminalQuickFixBuiltinActions.d.ts.map