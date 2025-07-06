export { $ as $M5b };
declare let $: {
    new (t: any, s: any): {
        c: b;
        e: any;
        f: any;
        onDidChangeDecorations: any;
        g: O;
        h: G;
        i: C;
        dispose(): void;
        registerDecorationsProvider(t: any): any;
        j(t: any): any;
        getDecoration(t: any, s: any): {
            labelClassName: any;
            badgeClassName: any;
            iconClassName: any;
            strikethrough: any;
            tooltip: any;
            dispose: () => void;
        } | undefined;
        k(t: any, s: any, e: any): any;
        l(t: any, s: any, e: any, i: any): any;
    };
};
import { $ud as b } from "../../../../base/common/lifecycle.js";
import { $Gd as O } from "../../../../base/common/linkedList.js";
declare class G {
    constructor(t: any);
    g: any;
    c: b;
    e: HTMLStyleElement;
    f: Map<any, any>;
    dispose(): void;
    asDecoration(t: any, s: any): {
        labelClassName: any;
        badgeClassName: any;
        iconClassName: any;
        strikethrough: any;
        tooltip: any;
        dispose: () => void;
    };
}
import { $kj as C } from "../../../../base/common/ternarySearchTree.js";
//# sourceMappingURL=decorationsService.d.ts.map