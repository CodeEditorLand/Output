declare class b extends x {
    static w(t: any, e: any): any;
    static getProducedChar(t: any, e: any): string;
    b: any;
    f(t: any): any;
    k(t: any): any;
    getUSLabel(): string | null;
    g(t: any): any;
    h(t: any): any;
    l(t: any): any;
    m(t: any): boolean;
    t(t: any): boolean;
    n(t: any): string | null;
    o(t: any): "ctrl" | "shift" | "alt" | "meta" | null;
}
declare class P {
    constructor(t: any, e: any, o: any);
    f: any;
    g: any;
    d: any[];
    c: any[];
    e: boolean[];
    b: {
        scanCode: any;
        keyCode: any;
        value: any;
        withShift: any;
        withAltGr: any;
        withShiftAltGr: any;
    }[];
    dumpDebugInfo(): string;
    h(t: any, e: any): any;
    getUILabelForKeyCode(t: any): any;
    getAriaLabelForKeyCode(t: any): any;
    getUserSettingsLabelForKeyCode(t: any): any;
    getElectronAcceleratorForKeyBinding(t: any): any;
    i(t: any): any;
    resolveKeyboardEvent(t: any): b;
    j(t: any): $ | null;
    resolveKeybinding(t: any): b[];
}
import { $$0b as x } from "../../../../platform/keybinding/common/baseResolvedKeybinding.js";
import { $nx as $ } from "../../../../base/common/keybindings.js";
export { b as $_0b, P as $a$b };
//# sourceMappingURL=windowsKeyboardMapper.d.ts.map