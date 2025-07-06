declare function P(n: any): boolean;
declare function K(n: any): boolean;
declare class t {
    static for(e: any): any;
    constructor(e: any);
    id: any;
}
declare const J: any;
declare const C: {
    a: Map<any, any>;
    b: Map<any, any>;
    c: g;
    onDidChangeMenu: any;
    addCommand(n: any): any;
    getCommand(n: any): any;
    getCommands(): Map<any, any>;
    appendMenuItem(n: any, e: any): any;
    appendMenuItems(n: any): k;
    getMenuItems(n: any): any[];
    d(n: any): void;
};
declare class q extends E {
    constructor(e: any, i: any, s: any);
    item: any;
    hideActions: any;
}
declare let f: {
    new (e: any, i: any, s: any, c: any, a: any, o: any, r: any): {
        hideActions: any;
        menuKeybinding: any;
        b: any;
        id: any;
        label: any;
        tooltip: any;
        enabled: any;
        checked: any;
        item: any;
        alt: any;
        a: any;
        class: any;
        run(...e: any[]): any;
    };
    label(e: any, i: any): any;
};
declare class Z {
    constructor(e: any);
    desc: any;
}
declare function U(n: any): {
    dispose(): void;
};
import { $jf as g } from "../../../base/common/event.js";
import { $ud as k } from "../../../base/common/lifecycle.js";
import { $em as E } from "../../../base/common/actions.js";
export { P as $DI, K as $EI, t as $FI, J as $GI, C as $HI, q as $II, f as $JI, Z as $KI, U as $LI };
//# sourceMappingURL=actions.d.ts.map