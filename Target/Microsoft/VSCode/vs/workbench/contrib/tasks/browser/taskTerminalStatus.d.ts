declare namespace A {
    export { a as id };
    export { T as icon };
    export let severity: any;
    export let tooltip: any;
}
declare namespace L {
    export { a as id };
    export let icon: {
        id: any;
    };
    let severity_1: any;
    export { severity_1 as severity };
    let tooltip_1: any;
    export { tooltip_1 as tooltip };
}
declare namespace E {
    export { a as id };
    let icon_1: {
        id: any;
    };
    export { icon_1 as icon };
    let severity_2: any;
    export { severity_2 as severity };
    let tooltip_2: any;
    export { tooltip_2 as tooltip };
}
declare let S: {
    new (e: any, t: any): {
        c: any;
        a: Map<any, any>;
        addTerminal(e: any, t: any, i: any): void;
        b: any;
        f(e: any): any;
        g(e: any): void;
        h(e: any): void;
        j(e: any): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare const a: "task_terminal_status";
import { $Nt as T } from "../../../../platform/theme/common/iconRegistry.js";
export { A as $jvc, L as $kvc, E as $lvc, S as $mvc };
//# sourceMappingURL=taskTerminalStatus.d.ts.map