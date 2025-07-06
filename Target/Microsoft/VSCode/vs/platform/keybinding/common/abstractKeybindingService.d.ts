export { E as $e6b };
declare class E extends k {
    constructor(t: any, i: any, s: any, e: any, r: any);
    get onDidUpdateKeybindings(): any;
    get inChordMode(): boolean;
    t: any;
    u: any;
    w: any;
    y: any;
    z: any;
    a: any;
    b: any[];
    f: b;
    g: any;
    h: d | undefined;
    j: any;
    m: p;
    n: any;
    s: boolean;
    getDefaultKeybindingsContent(): string;
    toggleLogging(): boolean;
    G(t: any): void;
    getDefaultKeybindings(): any;
    getKeybindings(): any;
    customKeybindingsCount(): number;
    lookupKeybindings(t: any): any;
    lookupKeybinding(t: any, i: any, s?: boolean): any;
    dispatchEvent(t: any, i: any): boolean | undefined;
    softDispatch(t: any, i: any): any;
    H(): void;
    I(t: any, i: any): void;
    J(): void;
    dispatchByUserSettingsLabel(t: any, i: any): void;
    L(t: any, i: any): boolean | undefined;
    M(t: any, i: any): boolean | undefined;
    N(t: any, i: any, s?: boolean): boolean | undefined;
    mightProducePrintableCharacter(t: any): boolean;
}
import { $vd as k } from "../../../base/common/lifecycle.js";
import { $Yh as b } from "../../../base/common/async.js";
declare class d {
    constructor(t: any);
    a: any;
    b: any;
    c: any;
    d: any;
    has(t: any): any;
}
import { $Xh as p } from "../../../base/common/async.js";
//# sourceMappingURL=abstractKeybindingService.d.ts.map