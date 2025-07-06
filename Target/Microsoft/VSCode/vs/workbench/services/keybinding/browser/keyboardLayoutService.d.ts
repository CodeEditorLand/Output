declare class N extends p {
    static t(t: any, e: any): x | m | M;
    constructor(t: any);
    get activeKeymap(): any;
    get keymapInfos(): any[];
    get activeKeyboardLayout(): any;
    get activeKeyMapping(): any;
    get keyboardLayouts(): any[];
    n: any;
    c: d;
    onDidChangeKeyboardMapper: any;
    j: boolean;
    b: I | null;
    a: boolean;
    f: any[];
    g: any[];
    h: any;
    registerKeyboardLayout(t: any): void;
    removeKeyboardLayout(t: any): void;
    getMatchedKeymapInfo(t: any): {
        result: any;
        score: any;
    } | null;
    getUSStandardLayout(): any;
    isKeyMappingActive(t: any): any;
    setUSKeyboardLayout(): void;
    setActiveKeyMapping(t: any): void;
    setActiveKeymapInfo(t: any): void;
    setLayoutFromBrowserAPI(): void;
    r(t: any, e: any): void;
    getKeyboardMapper(): I | m;
    validateCurrentKeyboardMapping(t: any): void;
    setKeyboardLayout(t: any): void;
    s(t: any): void;
    u(t: any): boolean;
    w(t: any): Promise<any>;
}
declare class w extends N {
    constructor(t: any, e: any, i: any, r: any);
}
declare let l: {
    new (t: any, e: any, i: any, r: any, s: any, o: any): {
        g: any;
        a: d;
        onDidChangeKeyboardLayout: any;
        f: any;
        c: w;
        b: T;
        setUserKeyboardLayoutIfMatched(): void;
        getKeyboardMapper(): I | m;
        getCurrentKeyboardLayout(): any;
        getAllKeyboardLayouts(): any[];
        getRawKeyboardMapping(): any;
        validateCurrentKeyboardMapping(t: any): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $vd as p } from "../../../../base/common/lifecycle.js";
import { $ef as d } from "../../../../base/common/event.js";
import { $xx as I } from "../../../../platform/keyboardLayout/common/keyboardMapper.js";
import { $yBc as m } from "../common/fallbackKeyboardMapper.js";
import { $a$b as x } from "../common/windowsKeyboardMapper.js";
import { $ABc as M } from "../common/macLinuxKeyboardMapper.js";
declare class T extends p {
    constructor(t: any, e: any);
    get keyboardLayout(): K | null;
    f: any;
    g: any;
    b: any;
    onDidChange: any;
    c: K | null;
    a: any;
    initialize(): Promise<void>;
    h(): Promise<boolean>;
}
import { $vBc as K } from "../common/keymapInfo.js";
export { N as $BBc, w as $CBc, l as $DBc };
//# sourceMappingURL=keyboardLayoutService.d.ts.map