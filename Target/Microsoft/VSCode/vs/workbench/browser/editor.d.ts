declare class a {
    static didInstantiateEditorPane(e: any): boolean;
    static create(e: any, t: any, i: any): a;
    constructor(e: any, t: any, i: any);
    c: any;
    typeId: any;
    name: any;
    instantiate(e: any, t: any): any;
    describes(e: any): boolean;
}
declare class k {
    a: Map<any, any>;
    registerEditorPane(e: any, t: any): any;
    getEditorPane(e: any): any;
    b(e: any, t: any): any;
    getEditorPaneByType(e: any): any;
    getEditorPanes(): any[];
    getEditors(): any[];
}
declare function T(n: any, e: any): Promise<any>;
declare function V(n: any, e: any, t: any, i: any): any;
export { a as $4Gb, k as $5Gb, T as $6Gb, V as $7Gb };
//# sourceMappingURL=editor.d.ts.map