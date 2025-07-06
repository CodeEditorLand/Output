declare let f: {
    new (e: any, t: any): {
        readonly actions: any[];
        readonly secondaryActions: any[];
        c: any[];
        d: any[];
        f: $;
        onDidChangeTitle: any;
        g: d;
        menu: any;
        h(): void;
        dispose(): void;
    };
};
declare let l: {
    new (e: any, t: any, s: any, i: any): {
        readonly repositoryContextMenu: any;
        f: any;
        h: any;
        i: any;
        d: Map<any, any>;
        g: d;
        c: any;
        titleMenu: any;
        repositoryMenu: any;
        getResourceGroupMenu(e: any): any;
        getResourceMenu(e: any): any;
        getResourceFolderMenu(e: any): any;
        j(e: any): any;
        k(): void;
        dispose(): void;
    };
};
declare let R: {
    new (e: any, t: any): {
        g: any;
        c: d;
        d: d;
        f: Map<any, any>;
        titleMenu: any;
        h(e: any): void;
        getRepositoryMenus(e: any): any;
        dispose(): void;
    };
};
import { $ef as $ } from "../../../../base/common/event.js";
import { $ud as d } from "../../../../base/common/lifecycle.js";
export { f as $Woc, l as $Xoc, R as $Yoc };
//# sourceMappingURL=menus.d.ts.map