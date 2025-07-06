declare class z extends Error {
    static is(e: any): boolean;
    constructor(e: any);
}
declare const W: "views";
declare const _: any;
declare const I: any;
declare const P: number[];
declare function H(s: any): "sidebar" | "panel" | "auxiliarybar" | undefined;
declare const U: any;
declare class q {
    constructor(e: any, t: any);
    c: boolean;
    d: boolean;
    resolve: (i: any) => Promise<void>;
    tooltip: any;
    command: any;
    get hasResolve(): boolean;
    resetResolve(): void;
    asTreeItem(): {
        handle: any;
        parentHandle: any;
        collapsibleState: any;
        label: any;
        description: any;
        icon: any;
        iconDark: any;
        themeIcon: any;
        resourceUri: any;
        tooltip: any;
        contextValue: any;
        command: any;
        children: any;
        accessibilityInformation: any;
    };
}
declare var c: any;
declare var g: any;
declare var u: any;
declare var a: any;
declare var d: any;
export { z as $0M, W as $3M, _ as $4M, I as $5M, P as $6M, H as $7M, U as $8M, q as $9M, c as Extensions, g as TreeItemCollapsibleState, u as ViewContainerLocation, a as ViewContentGroups, d as ViewVisibilityState };
//# sourceMappingURL=views.d.ts.map