declare let w: {
    new (i: any, e: any, s: any, o: any): {
        b: any;
        c: any;
        d: any;
        f: any;
        a: {
            label: any;
            description: any;
            repository: string;
        };
        pickRepository(): Promise<any>;
    };
};
declare let b: {
    new (i: any, e: any, s: any, o: any, t: any, n: any, d: any, u: any): {
        readonly repositories: any[];
        visibleRepositories: any[];
        readonly focusedRepository: any;
        q: any;
        s: any;
        t: any;
        u: any;
        v: any;
        a: boolean;
        b: boolean;
        d: O;
        f: any[];
        g: v;
        onDidChangeRepositories: any;
        h: v;
        onDidChangeVisibleRepositories: any;
        i: v;
        onDidFocusRepository: any;
        menus: any;
        n: import("../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
        j: import("../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
        k: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        m: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        l: import("../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
        activeRepository: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        c: any;
        o: any;
        p: any;
        w(i: any): void;
        x(i: any): void;
        isVisible(i: any): boolean;
        toggleVisibility(i: any, e: any): void;
        toggleSortKey(i: any): void;
        focus(i: any): void;
        pinActiveRepository(i: any): void;
        y(i: any, e: any): any;
        z(): number;
        A(): "path" | "name" | "discoveryTime";
        B(i: any, e: any): void;
        C(): void;
        D(): void;
        E(): void;
        dispose(): void;
    };
};
declare namespace L {
    let RepositorySortKey: z;
}
import { $ud as O } from "../../../../base/common/lifecycle.js";
import { $ef as v } from "../../../../base/common/event.js";
import { $Wn as z } from "../../../../platform/contextkey/common/contextkey.js";
export { w as $1oc, b as $2oc, L as $Zoc };
//# sourceMappingURL=scmViewService.d.ts.map