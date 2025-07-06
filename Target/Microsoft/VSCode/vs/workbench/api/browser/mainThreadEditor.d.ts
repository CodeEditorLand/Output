declare class o {
    static readFromEditor(e: any, t: any, i: any): o;
    static c(e: any, t: any): any;
    static d(e: any, t: any, i: any): any;
    static f(e: any, t: any): any;
    static g(e: any, t: any): boolean;
    static h(e: any, t: any): boolean;
    static j(e: any, t: any): boolean;
    constructor(e: any, t: any, i: any);
    selections: any;
    options: any;
    visibleRanges: any;
    generateDelta(e: any, t: any): {
        options: null;
        selections: null;
        visibleRanges: null;
    } | null;
}
declare class M {
    constructor(e: any, t: any, i: any, s: any, n: any, r: any, l: any);
    j: c;
    m: c;
    c: any;
    d: any;
    k: any;
    n: any;
    l: any;
    f: any;
    g: any;
    h: any;
    o: S;
    dispose(): void;
    p(e: any): void;
    q(e: any, t: any): void;
    getId(): any;
    getModel(): any;
    getCodeEditor(): any;
    hasCodeEditor(e: any): boolean;
    setCodeEditor(e: any): void;
    isVisible(): boolean;
    getProperties(): any;
    get onPropertiesChanged(): any;
    setSelections(e: any): void;
    r(e: any): void;
    setConfiguration(e: any): void;
    setDecorations(e: any, t: any): void;
    setDecorationsFast(e: any, t: any): void;
    revealRange(e: any, t: any): void;
    isFocused(): any;
    matches(e: any): boolean;
    applyEdits(e: any, t: any, i: any): boolean;
    insertSnippet(e: any, t: any, i: any, s: any): Promise<boolean>;
}
import { $ud as c } from "../../../base/common/lifecycle.js";
import { $ef as S } from "../../../base/common/event.js";
export { o as $CXb, M as $DXb };
//# sourceMappingURL=mainThreadEditor.d.ts.map