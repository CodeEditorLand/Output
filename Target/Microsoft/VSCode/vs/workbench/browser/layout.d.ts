declare const lt: string[];
declare class te extends ei {
    constructor(i: any, t: any);
    get activeContainer(): any;
    get containers(): any[];
    w(i: any): any;
    whenContainerStylesLoaded(i: any): any;
    get mainContainerDimension(): any;
    get activeContainerDimension(): any;
    C(i: any): any;
    get mainContainerOffset(): {
        top: number;
        quickPickTop: number;
    };
    get activeContainerOffset(): {
        top: number;
        quickPickTop: number;
    };
    D(i: any): {
        top: number;
        quickPickTop: number;
    };
    ob: any;
    pb: any;
    a: any;
    onDidChangeZenMode: any;
    b: any;
    onDidChangeMainEditorCenteredLayout: any;
    c: any;
    onDidChangePanelAlignment: any;
    f: any;
    onDidChangeWindowMaximized: any;
    g: any;
    onDidChangePanelPosition: any;
    h: any;
    onDidChangePartVisibility: any;
    j: any;
    onDidChangeNotificationsVisibility: any;
    m: any;
    onDidChangeAuxiliaryBarMaximized: any;
    n: any;
    onDidLayoutMainContainer: any;
    r: any;
    onDidLayoutActiveContainer: any;
    s: any;
    onDidLayoutContainer: any;
    t: any;
    onDidAddContainer: any;
    u: any;
    onDidChangeActiveContainer: any;
    mainContainer: HTMLDivElement;
    y: Map<any, any>;
    F: Map<any, any>;
    G: boolean;
    nb: boolean;
    Gb: boolean;
    Ib: Q;
    Jb: Promise<any>;
    Kb: Q;
    whenRestored: Promise<any>;
    Lb: boolean;
    dc: boolean;
    qb(i: any): void;
    R: any;
    U: any;
    X: any;
    db: any;
    W: any;
    eb: any;
    gb: any;
    S: any;
    ib: any;
    jb: any;
    kb: any;
    Y: any;
    $: any;
    Z: any;
    ab: any;
    cb: any;
    bb: any;
    fb: any;
    hb: any;
    rb(): void;
    sb(i: any): void;
    tb(i: any, t: any): void;
    ub(i: any): void;
    vb(): void;
    wb(i: any): void;
    xb(): any;
    yb(i: any): void;
    zb(i: any): void;
    Ab(i?: boolean): void;
    Bb(i: any, t: any, e: any): void;
    z: any;
    mb: P | undefined;
    lb: {
        initialization: {
            layout: {
                editors: any;
            };
            editor: {
                restoreEditors: boolean;
                editorsToOpen: Promise<{
                    editor: {
                        input1: {
                            resource: any;
                        };
                        input2: {
                            resource: any;
                        };
                        base: {
                            resource: any;
                        };
                        result: {
                            resource: any;
                        };
                        options: {
                            pinned: boolean;
                        };
                    };
                }[] | {
                    editor: {
                        original: {
                            resource: any;
                        };
                        modified: {
                            resource: any;
                        };
                        options: {
                            pinned: boolean;
                        };
                    };
                }[] | {
                    editor: any;
                    viewColumn: any;
                }[] | {
                    editor: {
                        resource: undefined;
                    };
                }[]>;
            };
            views: {
                defaults: any;
                containerToRestore: {};
            };
        };
        runtime: {
            activeContainerId: any;
            mainWindowFullscreen: boolean;
            hasFocus: any;
            maximized: Set<any>;
            mainWindowBorder: boolean;
            menuBar: {
                toggled: boolean;
            };
            zenMode: {
                transitionDisposables: hi;
            };
        };
    } | undefined;
    Cb(i: any, t: any): any;
    Db(i: any, t: any): boolean;
    Eb(): boolean;
    Fb(i: any, t: any): Promise<{
        editor: {
            input1: {
                resource: any;
            };
            input2: {
                resource: any;
            };
            base: {
                resource: any;
            };
            result: {
                resource: any;
            };
            options: {
                pinned: boolean;
            };
        };
    }[] | {
        editor: {
            original: {
                resource: any;
            };
            modified: {
                resource: any;
            };
            options: {
                pinned: boolean;
            };
        };
    }[] | {
        editor: any;
        viewColumn: any;
    }[] | {
        editor: {
            resource: undefined;
        };
    }[]>;
    get openedDefaultEditors(): boolean;
    Hb(): {
        layout: any;
        filesToOpenOrCreate: any;
        filesToDiff?: never;
        filesToMerge?: never;
    } | {
        filesToOpenOrCreate: any;
        filesToDiff: any;
        filesToMerge: any;
        layout?: never;
    } | undefined;
    isRestored(): boolean;
    Mb(): void;
    Nb(i: any, t: any, e: any): Promise<void>;
    registerPart(i: any): any;
    Ob(i: any): any;
    registerNotifications(i: any): void;
    hasFocus(i: any): boolean;
    Pb(): any;
    focusPart(i: any, t?: Window & typeof globalThis): void;
    getContainer(i: any, t: any): any;
    isVisible(i: any, t?: Window & typeof globalThis): any;
    Qb(): boolean;
    focus(): void;
    Rb(): void;
    getMaximumEditorDimensions(i: any): {
        width: any;
        height: number;
    };
    Sb(): any;
    Tb(i: any): void;
    toggleZenMode(i: any, t?: boolean): void;
    Ub(i: any): void;
    Vb(): void;
    I: any;
    J: any;
    M: any;
    L: any;
    P: any;
    N: any;
    O: any;
    Q: any;
    H: Ui | undefined;
    layout(): void;
    isMainEditorLayoutCentered(): any;
    centerMainEditorLayout(i: any, t: any): void;
    getSize(i: any): {
        width: any;
        height: any;
    };
    setSize(i: any, t: any): void;
    resizePart(i: any, t: any, e: any): void;
    Wb(i: any): void;
    Xb(i: any): void;
    Yb(i: any): void;
    getLayoutClasses(): any;
    Zb(i: any): void;
    $b(i: any): boolean;
    ac(i: any, t: any, e: any): void;
    setPanelAlignment(i: any): void;
    bc(i: any, t: any): void;
    isAuxiliaryBarMaximized(): boolean;
    toggleMaximizedAuxiliaryBar(): void;
    setAuxiliaryBarMaximized(i: any, t: any): boolean;
    cc: any;
    isPanelMaximized(): any;
    toggleMaximizedPanel(): void;
    ec(): any;
    fc(i: any, t: any): void;
    setPartHidden(i: any, t: any): void;
    hasMainWindowBorder(): boolean;
    getMainWindowBorderRadius(): "10px" | undefined;
    getSideBarPosition(): any;
    getPanelAlignment(): any;
    updateMenubarVisibility(i: any): void;
    updateCustomTitleBarVisibility(): void;
    toggleMenuBar(): void;
    getPanelPosition(): any;
    setPanelPosition(i: any): void;
    isWindowMaximized(i: any): boolean;
    updateWindowMaximizedState(i: any, t: any): void;
    getVisibleNeighborPart(i: any, t: any): string | undefined;
    gc(): void;
    hc(i: any, t: any, e: any): any;
    ic(i: any, t: any, e: any): any[];
    jc(): {
        root: {
            type: string;
            size: any;
            data: ({
                type: string;
                data: {
                    type: string;
                };
                size: any;
                visible: any;
            } | {
                type: string;
                data: any[];
                size: number;
            })[];
        };
        orientation: number;
        width: any;
        height: any;
    };
}
import { $vd as ei } from "../../base/common/lifecycle.js";
import { $$h as Q } from "../../base/common/async.js";
declare class P extends ei {
    constructor(i: any, t: any, e: any, a: any, o: any, n: any);
    c: any;
    f: any;
    g: any;
    h: any;
    j: any;
    m: any;
    a: any;
    onDidChangeState: any;
    b: Map<any, any>;
    n(i: any): void;
    r(i: any, t: any): void;
    load(i: any): void;
    s(i: any): void;
    save(i: any, t: any): void;
    getInitializationValue(i: any): any;
    setInitializationValue(i: any, t: any): void;
    getRuntimeValue(i: any, t: any): any;
    setRuntimeValue(i: any, t: any): void;
    t(): boolean;
    u(i: any, t: any): void;
    w(i: any): void;
    y(i: any): any;
}
import { $Ed as hi } from "../../base/common/lifecycle.js";
import { $69 as Ui } from "../../base/browser/ui/grid/grid.js";
export { lt as $pAc, te as $qAc };
//# sourceMappingURL=layout.d.ts.map