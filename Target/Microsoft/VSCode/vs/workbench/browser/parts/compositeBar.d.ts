declare class tt {
    constructor(t: any, i: any, e: any, n: any, s: any, h: any);
    a: any;
    b: any;
    d: any;
    f: any;
    g: any;
    h: any;
    drop(t: any, i: any, e: any, n: any): void;
    onDragEnter(t: any, i: any, e: any): boolean;
    onDragOver(t: any, i: any, e: any): boolean;
    j(t: any, i: any): any;
    k(t: any, i: any): boolean;
}
declare let p: {
    new (t: any, i: any, e: any, n: any, s: any): {
        H: any;
        I: any;
        J: any;
        L: any;
        a: any;
        onDidChange: any;
        t: k;
        w: any[];
        y: Map<any, any>;
        getCompositeBarItems(): any[];
        setCompositeBarItems(t: any): void;
        getPinnedComposites(): any[];
        getPinnedCompositeIds(): any[];
        getVisibleComposites(): any[];
        create(t: any): any;
        h: any;
        focus(t: any): void;
        recomputeSizes(): void;
        layout(t: any): void;
        g: any;
        addComposite({ id: t, name: i, order: e, requestedIndex: n }: {
            id: any;
            name: any;
            order: any;
            requestedIndex: any;
        }): void;
        removeComposite(t: any): void;
        hideComposite(t: any): void;
        activateComposite(t: any): void;
        deactivateComposite(t: any): void;
        pin(t: any, i: any): Promise<void>;
        unpin(t: any): void;
        areBadgesEnabled(t: any): any;
        toggleBadgeEnablement(t: any): void;
        M(t: any): void;
        isPinned(t: any): any;
        move(t: any, i: any, e: any): void;
        getAction(t: any): any;
        N(t: any): void;
        O(t: any): void;
        n: any;
        r: any;
        P(): {
            id: any;
            name: any;
        }[];
        Q(t: any, i: any): void;
        getContextMenuActions(t: any): {
            id: any;
            label: any;
            tooltip: any;
            class: any;
            enabled: any;
            checked: any;
            run: (...t: any[]) => Promise<any>;
        }[];
        b($: any, i: any): void;
        f($: any, i: any): void;
        j($: any, i: any): void;
        m($: any, i: any): void;
        s($: any, i: any): void;
        u($: any, i: any): void;
        z($: any, i: any): void;
        C($: any, i: any): void;
        D($: any, i: any): void;
        F($: any, i: any): void;
        G($: any): any;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class k {
    constructor(t: any, i: any);
    get items(): any[];
    a: any[];
    b: any;
    setItems(t: any): void;
    get visibleItems(): any[];
    get pinnedItems(): any[];
    d(t: any, i: any, e: any, n: any, s: any): {
        id: any;
        name: any;
        pinned: any;
        order: any;
        visible: any;
        activity: never[];
        readonly activityAction: any;
        readonly pinnedAction: any;
        readonly toggleBadgeAction: any;
    };
    add(t: any, i: any, e: any, n: any): boolean;
    remove(t: any): boolean;
    hide(t: any): boolean;
    move(t: any, i: any): boolean;
    setPinned(t: any, i: any): boolean;
    activate(t: any): boolean;
    activeItem: any;
    deactivate(): boolean;
    findItem(t: any): any;
    f(t: any): number;
}
export { tt as $t5b, p as $u5b };
//# sourceMappingURL=compositeBar.d.ts.map