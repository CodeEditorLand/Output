export { I as $05b };
declare let I: {
    new (t: any, i: any, s: any, r: any, e: any, o: any, n: any, d: any, a: any, c: any, h: any): {
        n: any;
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        C: any;
        D: any;
        a: any;
        onDidActiveEditorChange: any;
        b: any;
        onDidVisibleEditorsChange: any;
        c: any;
        onDidEditorsChange: any;
        f: any;
        onWillOpenEditor: any;
        g: any;
        onDidCloseEditor: any;
        h: any;
        onDidOpenEditorFail: any;
        j: any;
        onDidMostRecentlyActiveEditorsChange: any;
        M: j;
        R: boolean;
        m: any;
        X: any;
        createScoped(t: any, i: any): any;
        F(): void;
        H(): void;
        I(t: any): void;
        J(): void;
        G: any;
        L(t: any): void;
        N(): void;
        O(t: any): Promise<void>;
        P(t: any): void;
        Q(t: any, i: any): Promise<void>;
        S(t: any): void;
        U(t: any, i: any, s: any): void;
        W(t: any): any[];
        readonly activeEditorPane: any;
        readonly activeTextEditorControl: any;
        readonly activeTextEditorLanguageId: any;
        readonly count: any;
        readonly editors: any;
        getEditors(t: any, i: any): any;
        readonly activeEditor: any;
        readonly visibleEditorPanes: any;
        readonly visibleTextEditorControls: any[];
        Y(t: any): any[];
        getVisibleTextEditorControls(t: any): any[];
        readonly visibleEditors: any;
        openEditor(t: any, i: any, s: any): Promise<any>;
        openEditors(t: any, i: any, s: any): Promise<any>;
        Z(t: any): Promise<boolean | undefined>;
        $(t: any): {
            resources: any[];
            diffMode: boolean;
            mergeMode: boolean;
        };
        isOpened(t: any): any;
        isVisible(t: any): boolean;
        closeEditor({ editor: t, groupId: i }: {
            editor: any;
            groupId: any;
        }, s: any): Promise<void>;
        closeEditors(t: any, i: any): Promise<void>;
        findEditors(t: any, i: any, s: any): any;
        replaceEditors(t: any, i: any): Promise<any>;
        save(t: any, i: any): Promise<{
            success: any;
            editors: any;
        }>;
        saveAll(t: any): Promise<{
            success: any;
            editors: any;
        }>;
        revert(t: any, i: any): Promise<boolean>;
        revertAll(t: any): Promise<boolean>;
        ab(t: any): {
            groupId: any;
            editor: any;
        }[];
        bb(t: any): {
            editor: any;
            groupId: any;
        }[];
        dispose(): void;
        q: z;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Ic as j } from "../../../../base/common/map.js";
import { $ud as z } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=editorService.d.ts.map