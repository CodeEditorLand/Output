export { y as $_$b };
declare let y: {
    new (t: any, e: any, o: any, h: any): {
        j: any;
        k: any;
        a: number;
        b: $;
        c: Map<any, any>;
        d: Map<any, any>;
        f: I;
        g: I;
        onDidAddNotebookEditor: any;
        onDidRemoveNotebookEditor: any;
        i: Map<any, any>;
        h: any;
        dispose(): void;
        l(t: any): void;
        m(t: any, e: any, o: any): void;
        retrieveExistingWidgetFromURI(t: any): {
            readonly value: any;
        } | undefined;
        retrieveAllExistingWidgets(): {
            readonly value: any;
        }[];
        retrieveWidget(t: any, e: any, o: any, h: any, n: any, f: any): {
            readonly value: any;
        };
        n(t: any, e: any, o: any, h: any, n: any, f: any): any;
        o(t: any, e: any): {
            readonly value: any;
        };
        addNotebookEditor(t: any): void;
        removeNotebookEditor(t: any): void;
        getNotebookEditor(t: any): any;
        listNotebookEditors(): any[];
        updateReplContextKey(t: any): void;
    };
};
import { $ud as $ } from "../../../../../base/common/lifecycle.js";
import { $ef as I } from "../../../../../base/common/event.js";
//# sourceMappingURL=notebookEditorServiceImpl.d.ts.map