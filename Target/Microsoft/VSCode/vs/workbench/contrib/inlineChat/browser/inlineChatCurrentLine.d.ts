declare class te extends O {
    constructor();
    runEditorCommand(n: any, e: any): Promise<void>;
}
declare class ee extends O {
    constructor();
    runEditorCommand(n: any, e: any, ...r: any[]): Promise<void>;
}
declare let k: {
    new (n: any, e: any, r: any, i: any, o: any, s: any, a: any, u: any): {
        f: any;
        g: any;
        c: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        a: any;
        b: any;
        h(n: any, e: any): void;
        show(): void;
        hide(): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    get(n: any): any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class ie extends O {
    constructor();
    runEditorCommand(n: any, e: any): Promise<void>;
}
declare const T: Q;
import { $Gab as O } from "../../../../editor/browser/editorExtensions.js";
import { $Wn as Q } from "../../../../platform/contextkey/common/contextkey.js";
export { te as $1hc, ee as $2hc, k as $3hc, ie as $4hc, T as $Zhc };
//# sourceMappingURL=inlineChatCurrentLine.d.ts.map