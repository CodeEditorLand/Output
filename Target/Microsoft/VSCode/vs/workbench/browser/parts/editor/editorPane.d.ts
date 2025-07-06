declare class c extends w {
    constructor(t: any, e: any, n: any, i: any, o: any);
    get minimumWidth(): any;
    get maximumWidth(): any;
    get minimumHeight(): any;
    get maximumHeight(): any;
    get input(): any;
    get options(): any;
    get window(): any;
    get scopedContextKeyService(): void;
    group: any;
    onDidChangeSizeConstraints: any;
    S: any;
    onDidChangeControl: any;
    setInput(t: any, e: any, n: any, i: any): Promise<void>;
    W: any;
    X: any;
    clearInput(): void;
    setOptions(t: any): void;
    Z(t: any): void;
    setBoundarySashes(t: any): void;
    ab(t: any, e: any, n: any, i?: number): any;
    getViewState(): void;
}
declare class r extends $ {
    constructor(t: any, e: any, n: any, i: any, o: any, s: any);
    id: any;
    h: any;
    j: any;
    m: any;
    n: any;
    r: any;
    c: boolean;
    g: boolean;
    s(): void;
    t(t: any): void;
    saveEditorState(t: any, e: any, n: any): void;
    loadEditorState(t: any, e: any): any;
    clearEditorState(t: any, e: any): void;
    clearEditorStateOnDispose(t: any, e: any): void;
    f: Map<any, any> | undefined;
    moveEditorState(t: any, e: any, n: any): void;
    u(t: any): any;
    w(): S;
    b: S | undefined;
    saveState(): void;
    y(): void;
}
import { $ixb as w } from "../../composite.js";
import { $vd as $ } from "../../../../base/common/lifecycle.js";
import { $Lc as S } from "../../../../base/common/map.js";
export { c as $aEb, r as $bEb };
//# sourceMappingURL=editorPane.d.ts.map