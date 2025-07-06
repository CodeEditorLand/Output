declare function d(s: any, t: any): c | null;
declare function i(s: any, t: any): a;
declare class a {
    constructor(t: any, e: any, h: any, r: any, o: any);
    ctrlKey: any;
    shiftKey: any;
    altKey: any;
    metaKey: any;
    keyCode: any;
    equals(t: any): boolean;
    getHashCode(): string;
    isModifierKey(): boolean;
    toKeybinding(): c;
    isDuplicateModifierCase(): any;
}
declare class K {
    constructor(t: any, e: any, h: any, r: any, o: any);
    ctrlKey: any;
    shiftKey: any;
    altKey: any;
    metaKey: any;
    scanCode: any;
    equals(t: any): boolean;
    getHashCode(): string;
    isDuplicateModifierCase(): any;
}
declare class c {
    constructor(t: any);
    chords: any;
    getHashCode(): string;
    equals(t: any): boolean;
}
declare class m {
    constructor(t: any, e: any, h: any, r: any, o: any, l: any);
    ctrlKey: any;
    shiftKey: any;
    altKey: any;
    metaKey: any;
    keyLabel: any;
    keyAriaLabel: any;
}
declare class $ {
}
export { d as $lx, i as $mx, a as $nx, K as $ox, c as $px, m as $qx, $ as $rx };
//# sourceMappingURL=keybindings.d.ts.map