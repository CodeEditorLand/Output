declare class c extends f {
    constructor(t: any);
    set ariaHeaderLabel(t: any);
    get ariaHeaderLabel(): any;
    M: any;
    get draggableElement(): HTMLElement | undefined;
    get dropTargetElement(): HTMLElement;
    get dropBackground(): undefined;
    set minimumBodySize(t: any);
    get minimumBodySize(): any;
    I: any;
    set maximumBodySize(t: any);
    get maximumBodySize(): any;
    J: any;
    get R(): number | undefined;
    get minimumSize(): any;
    get maximumSize(): any;
    S(t: any): any;
    F: boolean;
    G: boolean;
    H: boolean;
    N: {
        dropBackground: undefined;
        headerBackground: undefined;
        headerBorder: undefined;
        headerForeground: undefined;
        leftBorder: undefined;
    };
    P: any;
    onDidChange: any;
    Q: any;
    onDidChangeExpansionState: any;
    orthogonalSize: number;
    z: boolean;
    C: any;
    element: HTMLElement;
    isExpanded(): boolean;
    setExpanded(t: any): boolean;
    O: any;
    set headerVisible(t: boolean);
    get headerVisible(): boolean;
    set collapsible(t: boolean);
    get collapsible(): boolean;
    set orientation(t: any);
    get orientation(): any;
    render(): void;
    w: HTMLElement | undefined;
    y: any;
    layout(t: any): void;
    D: any;
    style(t: any): void;
    U(): void;
}
declare class Y {
    canDrag(t: any): boolean;
    canDrop(t: any, e: any): boolean;
}
declare class W extends f {
    constructor(t: any, e?: {});
    b: {
        draggable: null;
    };
    c: any[];
    f: number;
    g: number;
    m: any;
    onDidDrop: any;
    a: any;
    orientation: any;
    element: any;
    h: any;
    onDidSashReset: any;
    onDidSashChange: any;
    onDidScroll: any;
    addPane(t: any, e: any, s?: any): void;
    removePane(t: any): void;
    movePane(t: any, e: any): void;
    resizePane(t: any, e: any): void;
    getPaneSize(t: any): any;
    layout(t: any, e: any): void;
    setBoundarySashes(t: any): void;
    n: any;
    r(t: any): void;
    flipOrientation(t: any, e: any): void;
    s(): void;
    j: any;
    t(): any[];
    u(): void;
    w(): void;
}
import { $vd as f } from "../../../common/lifecycle.js";
export { c as $H0, Y as $I0, W as $J0 };
//# sourceMappingURL=paneview.d.ts.map