declare const K: "editor.changeDropType";
declare const V: "editor.dropIntoEditor.preferences";
declare const N: j;
declare let w: {
    new (t: any, r: any, o: any, i: any, e: any): {
        h: any;
        j: any;
        m: any;
        g: A | undefined;
        c: any;
        f: any;
        clearWidgets(): void;
        changeDropType(): void;
        n(t: any, r: any, o: any): Promise<void>;
        r(t: any, r: any, o: any, i: any, e: any): Promise<{
            edits: any;
            dispose: () => void;
        }>;
        s(t: any, r: any): any;
        t(t: any): Promise<x>;
        q: $;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    get(t: any): any;
    setConfigureDefaultAction(t: any): void;
    a: any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Wn as j } from "../../../../platform/contextkey/common/contextkey.js";
import { $phb as A } from "../../../../platform/dnd/browser/dnd.js";
import { $8C as x } from "../../../../base/common/dataTransfer.js";
import { $ud as $ } from "../../../../base/common/lifecycle.js";
export { K as $$nb, V as $0nb, N as $_nb, w as $aob };
//# sourceMappingURL=dropIntoEditorController.d.ts.map