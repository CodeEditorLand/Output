declare class k extends g {
    constructor(e: any, t: any, i?: {
        orientation: number;
    });
    w: any[];
    y: boolean;
    C: any;
    onDidChangeDropdownVisibility: any;
    D: any;
    f: {
        orientation: number;
    };
    t: any;
    z: HTMLDivElement;
    m: any;
    u: h;
    set actionRunner(e: any);
    get actionRunner(): any;
    set context(e: any);
    getElement(): HTMLDivElement;
    focus(): void;
    getItemsWidth(): number;
    getItemAction(e: any): any;
    getItemWidth(e: any): any;
    getItemsLength(): any;
    setAriaLabel(e: any): void;
    setActions(e: any, t: any): void;
    isEmpty(): any;
    F(e: any): any;
    G(): void;
}
declare class r extends a {
    constructor(e: any, t: any);
    a: any[];
    b: any;
    run(): Promise<void>;
    set menuActions(e: any[]);
    get menuActions(): any[];
}
import { $vd as g } from "../../../common/lifecycle.js";
import { $g0 as h } from "../dropdown/dropdownActionViewItem.js";
import { $bm as a } from "../../../common/actions.js";
export { k as $M0, r as $N0 };
//# sourceMappingURL=toolbar.d.ts.map