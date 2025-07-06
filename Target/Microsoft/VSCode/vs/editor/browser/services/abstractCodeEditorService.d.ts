declare let S: {
    new (t: any): {
        z: any;
        a: any;
        onWillCreateCodeEditor: any;
        b: any;
        onCodeEditorAdd: any;
        c: any;
        onCodeEditorRemove: any;
        f: any;
        onWillCreateDiffEditor: any;
        g: any;
        onDiffEditorAdd: any;
        h: any;
        onDiffEditorRemove: any;
        j: any;
        onDidChangeTransientModelProperty: any;
        m: any;
        onDecorationTypeRegistered: any;
        t: Map<any, any>;
        u: Map<any, any>;
        y: R;
        G: any;
        H: Map<any, any>;
        n: any;
        r: any;
        s: P | null;
        willCreateCodeEditor(): void;
        addCodeEditor(t: any): void;
        removeCodeEditor(t: any): void;
        listCodeEditors(): any[];
        willCreateDiffEditor(): void;
        addDiffEditor(t: any): void;
        removeDiffEditor(t: any): void;
        listDiffEditors(): any[];
        getFocusedCodeEditor(): any;
        C(): P;
        D(): P;
        F(t: any): any;
        _removeEditorStyleSheets(t: any): void;
        registerDecorationType(t: any, e: any, i: any, s: any, n: any): {
            dispose: () => void;
        };
        listDecorationTypes(): any[];
        removeDecorationType(t: any): void;
        resolveDecorationOptions(t: any, e: any): any;
        resolveDecorationCSSRules(t: any): any;
        setModelProperty(t: any, e: any, i: any): void;
        getModelProperty(t: any, e: any): any;
        setTransientModelProperty(t: any, e: any, i: any): void;
        getTransientModelProperty(t: any, e: any): any;
        getTransientModelProperties(t: any): any;
        _removeWatcher(t: any): void;
        openCodeEditor(t: any, e: any, i: any): Promise<any>;
        registerCodeEditorOpenHandler(t: any): any;
        q: k;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class O extends N {
    constructor(t: any, e: any, i: any);
    uri: any;
    a: {};
    set(t: any, e: any): void;
    get(t: any): any;
    keys(): string[];
}
declare class P {
    constructor(t: any);
    get sheet(): any;
    a: any;
    ref(): void;
    unref(): void;
    insertRule(t: any, e: any): void;
    removeRulesContainingSelector(t: any): void;
}
declare namespace g {
    let color: string;
    let opacity: string;
    let backgroundColor: string;
    let outline: string;
    let outlineColor: string;
    let outlineStyle: string;
    let outlineWidth: string;
    let border: string;
    let borderColor: string;
    let borderRadius: string;
    let borderSpacing: string;
    let borderStyle: string;
    let borderWidth: string;
    let fontStyle: string;
    let fontWeight: string;
    let fontSize: string;
    let fontFamily: string;
    let textDecoration: string;
    let cursor: string;
    let letterSpacing: string;
    let gutterIconPath: string;
    let gutterIconSize: string;
    let contentText: string;
    let contentIconPath: string;
    let margin: string;
    let padding: string;
    let width: string;
    let height: string;
    let verticalAlign: string;
}
import { $Gd as R } from "../../../base/common/linkedList.js";
import { $ud as k } from "../../../base/common/lifecycle.js";
import { $vd as N } from "../../../base/common/lifecycle.js";
export { S as $R5b, O as $S5b, P as $T5b, g as $U5b };
//# sourceMappingURL=abstractCodeEditorService.d.ts.map