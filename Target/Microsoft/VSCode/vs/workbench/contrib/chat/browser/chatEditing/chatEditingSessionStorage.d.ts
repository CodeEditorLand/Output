export { F as $bhc };
declare let F: {
    new (n: any, s: any, a: any, d: any, o: any): {
        a: any;
        b: any;
        c: any;
        d: any;
        f: any;
        g(): any;
        restoreState(): Promise<{
            initialFileContents: b;
            pendingSnapshot: {
                stopId: any;
                entries: b;
            } | undefined;
            recentSnapshot: {
                stopId: any;
                entries: b;
            };
            linearHistoryIndex: any;
            linearHistory: any[];
        } | undefined>;
        storeState(n: any): Promise<void>;
        clearState(): Promise<void>;
    };
};
import { $Ic as b } from "../../../../../base/common/map.js";
//# sourceMappingURL=chatEditingSessionStorage.d.ts.map