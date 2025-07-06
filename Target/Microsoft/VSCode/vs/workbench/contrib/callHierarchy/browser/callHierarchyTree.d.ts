declare class T {
    constructor(e: any);
    getDirection: any;
    hasChildren(): boolean;
    getChildren(e: any): Promise<any>;
}
declare class R {
    compare(e: any, t: any): number;
}
declare class k {
    constructor(e: any);
    getDirection: any;
    getId(e: any): any;
}
declare class l {
    templateId: string | undefined;
    renderTemplate(e: any): x;
    renderElement(e: any, t: any, r: any): void;
    disposeTemplate(e: any): void;
}
declare class v {
    getHeight(e: any): number;
    getTemplateId(e: any): string | undefined;
}
declare class A {
    constructor(e: any);
    getDirection: any;
    getWidgetAriaLabel(): any;
    getAriaLabel(e: any): any;
}
declare class n {
    static compare(e: any, t: any): number;
    constructor(e: any, t: any, r: any, i: any);
    item: any;
    locations: any;
    model: any;
    parent: any;
}
declare class x {
    constructor(e: any, t: any);
    icon: any;
    label: any;
}
export { T as $fxc, R as $gxc, k as $hxc, l as $ixc, v as $jxc, A as $kxc, n as Call };
//# sourceMappingURL=callHierarchyTree.d.ts.map