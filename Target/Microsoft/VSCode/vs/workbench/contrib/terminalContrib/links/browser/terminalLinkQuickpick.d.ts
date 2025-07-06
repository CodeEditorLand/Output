export { I as $Ptc };
declare let I: {
    new (i: any, e: any, r: any, l: any): {
        j: any;
        m: any;
        n: any;
        a: j;
        h: any;
        onDidRequestMoreLinks: any;
        u: boolean;
        b: any;
        show(i: any, e: any): Promise<any>;
        c: any;
        q(i: any, e: any): Promise<{
            label: any;
            link: any;
            description: any;
        }[] | undefined>;
        s(i: any): void;
        t(i: any): void;
        w(i: any): void;
        f: Set<any>;
        g: boolean;
        dispose(): void;
        readonly isDisposed: boolean;
        clear(): void;
        add(t: any): any;
        delete(t: any): void;
        deleteAndLeak(t: any): void;
    };
    DISABLE_DISPOSED_WARNING: boolean | undefined;
};
import { $Hh as j } from "../../../../../base/common/async.js";
//# sourceMappingURL=terminalLinkQuickpick.d.ts.map