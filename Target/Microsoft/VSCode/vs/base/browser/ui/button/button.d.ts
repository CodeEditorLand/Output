declare namespace st {
    let buttonBackground: string;
    let buttonHoverBackground: string;
    let buttonSeparator: any;
    let buttonForeground: any;
    let buttonBorder: undefined;
    let buttonSecondaryBackground: undefined;
    let buttonSecondaryForeground: undefined;
    let buttonSecondaryHoverBackground: undefined;
}
declare class l extends E {
    constructor(t: any, e: any);
    get onDidClick(): any;
    get onDidEscape(): any;
    c: string;
    j: any;
    m: any;
    a: any;
    b: HTMLAnchorElement;
    g: HTMLDivElement | undefined;
    f: HTMLDivElement | undefined;
    set enabled(t: boolean);
    get enabled(): boolean;
    n: any;
    r(t: any): any[];
    s(t: any): void;
    get element(): HTMLAnchorElement;
    set label(t: string);
    get label(): string;
    set labelShort(t: any);
    t(): void;
    set icon(t: any);
    set checked(t: boolean);
    get checked(): boolean;
    setTitle(t: any): void;
    h: any;
    focus(): void;
    hasFocus(): boolean;
}
declare class M extends E {
    constructor(t: any, e: any);
    f: any;
    onDidClick: any;
    element: HTMLDivElement;
    primaryButton: any;
    a: any;
    b: HTMLDivElement;
    c: HTMLDivElement;
    dropdownButton: any;
    set label(t: any);
    set icon(t: any);
    set enabled(t: any);
    get enabled(): any;
    set checked(t: any);
    get checked(): any;
    focus(): void;
    hasFocus(): any;
}
declare class N {
    constructor(t: any, e: any);
    d: any;
    b: HTMLDivElement;
    a: l;
    c: HTMLDivElement;
    get onDidClick(): any;
    get element(): HTMLDivElement;
    set label(t: any);
    set icon(t: any);
    set enabled(t: boolean);
    get enabled(): boolean;
    set checked(t: boolean);
    get checked(): boolean;
    focus(): void;
    hasFocus(): boolean;
    dispose(): void;
    set description(t: any);
}
declare class it {
    constructor(t: any, e: any);
    c: any;
    d: any;
    a: any[];
    b: F;
    dispose(): void;
    get buttons(): any[];
    clear(): void;
    addButton(t: any): any;
    addButtonWithDescription(t: any): any;
    addButtonWithDropdown(t: any): any;
    f(t: any): void;
}
declare class nt extends l {
    get labelElement(): HTMLElement;
    u: HTMLElement;
    w: HTMLElement;
    set label(t: any);
}
declare var u: any;
import { $vd as E } from "../../../common/lifecycle.js";
import { $ud as F } from "../../../common/lifecycle.js";
export { st as $P9, l as $Q9, M as $R9, N as $S9, it as $T9, nt as $U9, u as ButtonBarAlignment };
//# sourceMappingURL=button.d.ts.map