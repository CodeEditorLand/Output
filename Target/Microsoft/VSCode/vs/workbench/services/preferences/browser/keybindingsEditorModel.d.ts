declare const E: "keybinding.entry.template";
declare function $t(c: any, t: any): string;
declare let W: {
    new (t: any, e: any, r: any): {
        n: any;
        r: any;
        c: any[];
        g: any[];
        j: {
            ui: null | undefined;
            aria: null | undefined;
            user: null | undefined;
        };
        fetch(t: any, e?: boolean): {
            id: any;
            keybindingItem: any;
            templateId: string;
        }[];
        s(t: any, e: any): any;
        t(t: any, e: any): any;
        u(t: any, e: any): {
            id: any;
            templateId: string;
            commandLabelMatches: any;
            commandDefaultLabelMatches: any;
            keybindingItem: any;
            keybindingMatches: {
                firstPart: {};
                chordPart: {};
            } | undefined;
            commandIdMatches: any;
            sourceMatches: any;
            whenMatches: any;
            extensionIdMatches: any;
            extensionLabelMatches: any;
        }[];
        w(t: any, e: any, r: any): any;
        y(t: any): any[];
        resolve(t?: Map<any, any>): Promise<void>;
        C(): tt;
        f: any;
        onWillDispose: any;
        h: boolean;
        isResolved(): boolean;
        isDisposed(): boolean;
        dispose(): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    z(t: any): any;
    D(t: any, e: any): any;
    F(t: any, e: any, r: any, n: any): {
        keybinding: any;
        keybindingItem: any;
        command: any;
        commandLabel: any;
        commandDefaultLabel: any;
        when: any;
        source: any;
    };
    G(t: any): any;
    H(t: any, e: any): any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Uy as tt } from "../../../../platform/extensions/common/extensions.js";
export { E as $X5b, $t as $Y5b, W as $Z5b };
//# sourceMappingURL=keybindingsEditorModel.d.ts.map