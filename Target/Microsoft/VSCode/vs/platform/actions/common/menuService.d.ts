declare let E: {
    new (e: any, t: any, i: any): {
        d: any;
        f: any;
        c: {
            k: any;
            d: S;
            f: k;
            onDidChange: any;
            h: boolean;
            j: Map<any, any>;
            i: any;
            dispose(): void;
            l(e: any, t: any): any;
            setDefaultState(e: any, t: any, i: any): void;
            isHidden(e: any, t: any): any;
            updateHidden(e: any, t: any, i: any): void;
            reset(e: any): void;
            m(): void;
        };
        createMenu(e: any, t: any, i: any): {
            d: S;
            c: {
                o: any;
                p: any;
                q: any;
                r: any;
                createActionGroups(e: any): any[][];
                l(e: any): any;
                j: any;
                k: any;
                c: any[];
                d: Set<any>;
                f: Set<any>;
                h: Set<any>;
                i: Set<any>;
                readonly allMenuIds: Set<any>;
                readonly structureContextKeys: Set<any>;
                readonly preconditionContextKeys: Set<any>;
                readonly toggledContextKeys: Set<any>;
                refresh(): void;
                m(e: any): void;
            };
            f: P;
            onDidChange: any;
            getActions(e: any): any[][];
            dispose(): void;
        };
        getMenuActions(e: any, t: any, i: any): any[][];
        getMenuContexts(e: any): Set<any>;
        resetHiddenStates(e: any): void;
    };
};
declare function B(h: any, e: any, t: any, i?: undefined, s?: boolean): {
    id: any;
    label: any;
    tooltip: any;
    class: any;
    enabled: any;
    checked: any;
    run: (...t: any[]) => Promise<any>;
};
import { $ud as S } from "../../../base/common/lifecycle.js";
import { $ef as k } from "../../../base/common/event.js";
import { $if as P } from "../../../base/common/event.js";
export { E as $Lgb, B as $Mgb };
//# sourceMappingURL=menuService.d.ts.map