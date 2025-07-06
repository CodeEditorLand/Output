declare function k(o: any, e?: string, i?: boolean): any;
declare let u: {
    new (e: any, i: any, t: any, r: any, n: any, h: any): {
        readonly editor: any;
        a: any;
        b: any;
        m: any;
        h: any;
        j: any;
        n: any;
        r: any;
        f: K;
        c: any;
        g: te | null;
        dispose(): void;
        s(): void;
        t(e: any): void;
        u(e: any): void;
        w(): void;
        isFindInputFocused(): boolean;
        getState(): any;
        closeFindWidget(): void;
        toggleCaseSensitive(): void;
        toggleWholeWords(): void;
        toggleRegex(): void;
        togglePreserveCase(): void;
        toggleSearchScope(): void;
        setSearchString(e: any): void;
        highlightFindOptions(e?: boolean): void;
        y(e: any, i: any): Promise<void>;
        start(e: any, i: any): Promise<void>;
        moveToNextMatch(): boolean;
        moveToPrevMatch(): boolean;
        goToMatch(e: any): boolean;
        replace(): boolean;
        replaceAll(): boolean;
        selectAllMatches(): boolean;
        getGlobalBufferTerm(): Promise<any>;
        setGlobalBufferTerm(e: any): void;
        q: Q;
        B(t: any): any;
    };
    ID: string | undefined;
    get(e: any): any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let E: {
    new (e: any, i: any, t: any, r: any, n: any, h: any, l: any, d: any): {
        G: any;
        H: any;
        z: any;
        C: any;
        D: any;
        F: any;
        y(e: any, i: any): Promise<void>;
        highlightFindOptions(e?: boolean): void;
        J(): void;
        saveViewState(): any;
        restoreViewState(e: any): void;
        readonly editor: any;
        a: any;
        b: any;
        m: any;
        h: any;
        j: any;
        n: any;
        r: any;
        f: K;
        c: any;
        g: te | null;
        dispose(): void;
        s(): void;
        t(e: any): void;
        u(e: any): void;
        w(): void;
        isFindInputFocused(): boolean;
        getState(): any;
        closeFindWidget(): void;
        toggleCaseSensitive(): void;
        toggleWholeWords(): void;
        toggleRegex(): void;
        togglePreserveCase(): void;
        toggleSearchScope(): void;
        setSearchString(e: any): void;
        start(e: any, i: any): Promise<void>;
        moveToNextMatch(): boolean;
        moveToPrevMatch(): boolean;
        goToMatch(e: any): boolean;
        replace(): boolean;
        replaceAll(): boolean;
        selectAllMatches(): boolean;
        getGlobalBufferTerm(): Promise<any>;
        setGlobalBufferTerm(e: any): void;
        q: Q;
        B(t: any): any;
    };
    ID: string | undefined;
    get(e: any): any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare const ue: any;
declare class fe extends v {
    constructor();
    run(e: any, i: any, t: any): Promise<void>;
}
declare class me extends v {
    constructor();
    run(e: any, i: any): Promise<void>;
}
declare class V extends v {
    run(e: any, i: any): Promise<void>;
}
declare class Se extends V {
    constructor();
    d(e: any): boolean;
}
declare class be extends V {
    constructor();
    d(e: any): any;
}
declare class Fe extends v {
    constructor();
    d: any[];
    run(e: any, i: any, t: any): void;
    h(e: any): void;
    j(e: any, i: any): void;
}
declare class J extends v {
    run(e: any, i: any): Promise<void>;
}
declare class xe extends J {
    constructor();
    d(e: any): any;
}
declare class we extends J {
    constructor();
    d(e: any): any;
}
declare const ve: any;
declare var W: any;
import { $Jh as K } from "../../../../base/common/async.js";
import { $sob as te } from "./findModel.js";
import { $ud as Q } from "../../../../base/common/lifecycle.js";
import { $Eab as v } from "../../../browser/editorExtensions.js";
export { k as $Hob, u as $Iob, E as $Job, ue as $Kob, fe as $Lob, me as $Mob, V as $Nob, Se as $Oob, be as $Pob, Fe as $Qob, J as $Rob, xe as $Sob, we as $Tob, ve as $Uob, W as FindStartFocusAction };
//# sourceMappingURL=findController.d.ts.map