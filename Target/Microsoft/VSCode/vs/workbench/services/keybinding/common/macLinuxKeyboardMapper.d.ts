declare class S {
    static q(e: any): any;
    static r(e: any): any;
    static getCharCode(e: any): any;
    constructor(e: any, t: any, s: any, r: any);
    g: any;
    h: any;
    l: any;
    e: any[];
    f: (string | null)[];
    c: any[];
    d: T;
    dumpDebugInfo(): string;
    m(e: any, t: any): any;
    keyCodeChordToScanCodeChord(e: any): U[];
    getUILabelForScanCodeChord(e: any): any;
    getAriaLabelForScanCodeChord(e: any): any;
    getDispatchStrForScanCodeChord(e: any): string | null;
    getUserSettingsLabelForScanCodeChord(e: any): any;
    getElectronAcceleratorLabelForScanCodeChord(e: any): any;
    n(e: any): any[];
    o(e: any, t: any, s: any, r: any): void;
    resolveKeyboardEvent(e: any): x;
    p(e: any): U[];
    resolveKeybinding(e: any): any[];
}
declare class x extends P {
    constructor(e: any, t: any, s: any);
    p: any;
    f(e: any): any;
    g(e: any): any;
    h(e: any): any;
    l(e: any): any;
    m(e: any): boolean;
    n(e: any): any;
    o(e: any): "ctrl" | "shift" | "alt" | "meta" | null;
}
declare class T {
    c: any[];
    d: any[];
    registrationComplete(): void;
    e(e: any): void;
    registerIfUnknown(e: any, t: any): void;
    lookupKeyCodeCombo(e: any): k[];
    lookupScanCodeCombo(e: any): I[];
    guessStableKeyCode(e: any): any;
    f(e: any): number;
    g(e: any): number;
    h(e: any, t: any, s: any, r: any): number;
}
import { $ox as U } from "../../../../base/common/keybindings.js";
import { $$0b as P } from "../../../../platform/keybinding/common/baseResolvedKeybinding.js";
declare class k {
    constructor(e: any, t: any, s: any, r: any);
    ctrlKey: any;
    shiftKey: any;
    altKey: any;
    scanCode: any;
    toString(): string;
    equals(e: any): boolean;
    c(e: any): any;
    getProducedChar(e: any): string;
}
declare class I {
    constructor(e: any, t: any, s: any, r: any);
    ctrlKey: any;
    shiftKey: any;
    altKey: any;
    keyCode: any;
    toString(): string;
}
export { S as $ABc, x as $zBc };
//# sourceMappingURL=macLinuxKeyboardMapper.d.ts.map