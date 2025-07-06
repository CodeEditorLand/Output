declare class pe {
    getHeight(e: any): number | undefined;
    getTemplateId(e: any): string | undefined;
}
declare const Y: W;
declare let X: {
    new (e: any, t: any, r: any, n: any, s: any, o: any, i: any, l: any, c: any, h: any): {
        a: any;
        b: any;
        f: any;
        g: any;
        h: any;
        j: any;
        k: any;
        l: any;
        m: any;
        n: any;
        getParent(e: any): any;
        hasChildren(e: any): any;
        getChildren(e: any): any;
    };
};
declare class Z extends v {
    constructor(e: any, t: any, r: any, n: any, s: any, o: any);
}
declare let ee: {
    new (e: any, t: any, r: any, n: any, s: any, o: any, i: any, l: any, c: any): {
        readonly highlightTree: bt;
        k: any;
        l: any;
        m: any;
        n: any;
        o: any;
        p: any;
        q: any;
        t: any;
        a: number;
        h: Set<any>;
        j: bt;
        g: any;
        isShowingFilterResults(): boolean;
        isVisible(e: any): any;
        startSession(): void;
        endSession(): Promise<void>;
        find(e: any, t: any, r: any): Promise<any>;
        doFind(e: any, t: any, r: any): Promise<{
            isMatch: (i: any) => any;
            matchCount: any;
            warningMessage: any;
        } | undefined>;
        u(): void;
        b: {
            viewState: any;
            input: any;
            rootsWithProviders: Set<any>;
        } | undefined;
        doFilterFind(e: any, t: any, r: any): Promise<{
            isMatch: (l: any) => any;
            matchCount: any;
            warningMessage: any;
        } | undefined>;
        v(e: any, t: any, r: any): void;
        w(e: any, t: any, r: any): any[];
        endFilterSession(): Promise<void>;
        x(): void;
        y(): void;
        f: {
            rootsWithProviders: Set<any>;
        } | undefined;
        doHighlightFind(e: any, t: any, r: any): Promise<{
            isMatch: (i: any) => any;
            matchCount: any;
            warningMessage: any;
        } | undefined>;
        z(e: any, t: any): void;
        A(): void;
        B(): void;
        C(e: any): any;
        D(e: any, t: any, r: any, n: any): Promise<any[]>;
        E(e: any, t: any, r: any, n: any, s: any): Promise<{
            explorerRoot: any;
            files: any;
            directories: any[];
            hitMaxResults: boolean;
        }>;
    };
};
declare class te {
    constructor(e: any, t: any, r: any, n: any, s: any);
    get index(): number;
    get count(): any;
    get current(): any;
    get currentId(): string;
    get labels(): any[] | undefined;
    h: any;
    items: any;
    j: any;
    k: any;
    g: W;
    onDidChange: any;
    a: number;
    f: any;
    l(e: any): void;
    b: any[] | undefined;
    previous(): void;
    next(): void;
    first(): void;
    last(): void;
    setIndex(e: any): void;
    updateCollapsed(e: any): void;
    dispose(): void;
}
declare let J: {
    new (e: any, t: any, r: any, n: any, s: any, o: any, i: any, l: any, c: any, h: any, p: any, a: any): {
        h: any;
        j: any;
        k: any;
        l: any;
        m: any;
        n: any;
        o: any;
        p: any;
        q: any;
        t: any;
        u: any;
        f: Map<any, any>;
        g: Qe;
        onDidChangeActiveDescendant: any;
        a: any;
        b: any;
        getWidgetAriaLabel(): any;
        readonly templateId: any;
        renderTemplate(e: any): {
            templateDisposables: A;
            elementDisposables: any;
            label: any;
            container: any;
            contribs: any[];
        };
        renderElement(e: any, t: any, r: any): void;
        renderCompressedElements(e: any, t: any, r: any): void;
        v(e: any, t: any, r: any, n: any, s: any): void;
        w(e: any, t: any, r: any): any;
        disposeElement(e: any, t: any, r: any): void;
        disposeCompressedElements(e: any, t: any, r: any): void;
        disposeTemplate(e: any): void;
        getCompressedNavigationController(e: any): any;
        getAriaLabel(e: any): any;
        getAriaLevel(e: any): number;
        getActiveDescendantId(e: any): any;
        dispose(): void;
    };
    ID: string | undefined;
};
declare let re: {
    new (e: any, t: any, r: any, n: any, s: any, o: any): {
        k: any;
        l: any;
        m: any;
        n: any;
        o: any;
        p: any;
        a: Map<any, any>;
        b: Set<any>;
        f: W;
        g: any[];
        h: Map<any, any>;
        j: Map<any, any>;
        readonly onDidChange: any;
        q(): void;
        t(e: any, t: any, r: any): Promise<void>;
        filter(e: any, t: any): boolean;
        u(e: any, t: any): boolean;
        isIgnored(e: any, t: any, r: any): boolean;
        dispose(): void;
    };
};
declare let se: {
    new (e: any, t: any): {
        a: any;
        b: any;
        compare(e: any, t: any): any;
    };
};
declare let ie: {
    new (e: any, t: any, r: any, n: any, s: any, o: any, i: any, l: any, c: any, h: any): {
        j: any;
        k: any;
        l: any;
        m: any;
        n: any;
        o: any;
        p: any;
        q: any;
        t: any;
        u: any;
        f: Readonly<{
            dispose(): void;
        }> | undefined;
        g: A;
        h: boolean;
        onDragOver(e: any, t: any, r: any, n: any, s: any): false | {
            accept: boolean;
            bubble: number;
            effect: {
                type: number;
                position: string;
            };
            autoExpand: boolean;
        } | {
            accept: boolean;
            effect: {
                type: number;
                position: string | undefined;
            };
            bubble?: never;
            autoExpand?: never;
        } | {
            accept: boolean;
            bubble: number;
            effect: {
                type: number;
                position: string;
            };
            autoExpand?: never;
        } | {
            feedback: never[];
            accept: boolean;
            bubble: number;
            effect: {
                type: number;
                position: string;
            };
            autoExpand: boolean;
        } | {
            feedback: never[];
            accept: boolean;
            effect: {
                type: number;
                position: string | undefined;
            };
            bubble?: never;
            autoExpand?: never;
        } | {
            feedback: never[];
            accept: boolean;
            bubble: number;
            effect: {
                type: number;
                position: string;
            };
            autoExpand?: never;
        };
        b: any;
        v(e: any, t: any, r: any, n: any, s: any): false | {
            accept: boolean;
            bubble: number;
            effect: {
                type: number;
                position: string;
            };
            autoExpand: boolean;
        } | {
            accept: boolean;
            effect: {
                type: number;
                position: string | undefined;
            };
            bubble?: never;
            autoExpand?: never;
        } | {
            accept: boolean;
            bubble: number;
            effect: {
                type: number;
                position: string;
            };
            autoExpand?: never;
        };
        getDragURI(e: any): any;
        getDragLabel(e: any, t: any): any;
        onDragStart(e: any, t: any): void;
        drop(e: any, t: any, r: any, n: any, s: any): Promise<void>;
        w(e: any, t: any, r: any, n: any, s: any): Promise<void>;
        x(e: any, t: any, r: any): Promise<any>;
        y(e: any, t: any): Promise<void>;
        z(e: any, t: any): Promise<void>;
        onDragEnd(): void;
        dispose(): void;
    };
    a: string | undefined;
    A(e: any, t: any): any;
    B(e: any, t: any): any;
};
declare function Fr(u: any): boolean;
declare class Sr {
    isIncompressible(e: any): any;
}
import { $ef as W } from "../../../../../base/common/event.js";
import { $gIb as v } from "../../common/explorerModel.js";
declare class bt {
    a: Map<any, any>;
    b: Map<any, any>;
    get highlightedItems(): any[];
    get(e: any): any;
    f(e: any): {
        treeLayer: any;
        relPath: any;
    } | undefined;
    add(e: any, t: any): void;
    isMatch(e: any): any;
    clear(): void;
}
import { $kf as Qe } from "../../../../../base/common/event.js";
import { $ud as A } from "../../../../../base/common/lifecycle.js";
export { pe as $$Ib, Y as $_Ib, X as $aJb, Z as $bJb, ee as $cJb, te as $dJb, J as $eJb, re as $fJb, se as $gJb, ie as $hJb, Fr as $iJb, Sr as $jJb };
//# sourceMappingURL=explorerViewer.d.ts.map