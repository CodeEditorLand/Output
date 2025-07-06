declare const ei: "notification.clear";
declare const z: "notifications.clearAll";
declare const P: "notifications.toggleDoNotDisturbMode";
declare const M: "notifications.toggleDoNotDisturbModeBySource";
declare function T(a: any, i: any): import("../../../common/notifications.js").$O6b | undefined;
declare function Oi(a: any, i: any, o: any): void;
declare let A: {
    new (i: any, o: any): {
        c: any;
        g: any;
        u(i: any, o: any): Promise<void>;
        f: any;
        onWillRun: any;
        m: any;
        onDidRun: any;
        run(t: any, s: any): Promise<void>;
        q: H;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare const R: "notifications.showList";
declare const S: "notifications.hideList";
declare const I: "notifications.hideToasts";
declare const Y: "notification.collapse";
declare const Z: "notification.expand";
declare const x: "notification.acceptPrimaryAction";
import { $ud as H } from "../../../../base/common/lifecycle.js";
export { ei as $1zc, z as $2zc, P as $3zc, M as $4zc, T as $5zc, Oi as $6zc, A as $7zc, R as $Uzc, S as $Vzc, I as $Wzc, Y as $Xzc, Z as $Yzc, x as $Zzc };
//# sourceMappingURL=notificationsCommands.d.ts.map