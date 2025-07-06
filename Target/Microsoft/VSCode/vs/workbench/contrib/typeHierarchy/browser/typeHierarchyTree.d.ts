declare class N {
    constructor(e: any);
    getDirection: any;
    hasChildren(): boolean;
    getChildren(e: any): Promise<any>;
}
declare class k {
    compare(e: any, t: any): number;
}
declare class v {
    constructor(e: any);
    getDirection: any;
    getId(e: any): any;
}
declare class a {
    templateId: string | undefined;
    renderTemplate(e: any): x;
    renderElement(e: any, t: any, r: any): void;
    disposeTemplate(e: any): void;
}
declare class A {
    getHeight(e: any): number;
    getTemplateId(e: any): string | undefined;
}
declare class E {
    constructor(e: any);
    getDirection: any;
    getWidgetAriaLabel(): any;
    getAriaLabel(e: any): any;
}
declare class n {
    static compare(e: any, t: any): number;
    constructor(e: any, t: any, r: any);
    item: any;
    model: any;
    parent: any;
}
declare class x {
    constructor(e: any, t: any);
    icon: any;
    label: any;
}
export { N as $nxc, k as $oxc, v as $pxc, a as $qxc, A as $rxc, E as $sxc, n as Type };
//# sourceMappingURL=typeHierarchyTree.d.ts.map