declare const w: T;
declare let d: {
    new (e: any, i: any, s: any, n: any): {
        n: any;
        r: any;
        s: any;
        t: any;
        c: any;
        onDidChangeProviders: any;
        f: any;
        onDidChangeTimeline: any;
        g: any;
        onDidChangeUri: any;
        j: Map<any, any>;
        m: any;
        h: any;
        getSources(): {
            id: any;
            label: any;
        }[];
        getTimeline(e: any, i: any, s: any, n: any): {
            result: any;
            options: any;
            source: any;
            tokenSource: any;
            uri: any;
        } | undefined;
        registerTimelineProvider(e: any): {
            dispose: () => void;
        };
        unregisterTimelineProvider(e: any): void;
        setUri(e: any): void;
        u(): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Wn as T } from "../../../../platform/contextkey/common/contextkey.js";
export { w as $Dyc, d as $Eyc };
//# sourceMappingURL=timelineService.d.ts.map