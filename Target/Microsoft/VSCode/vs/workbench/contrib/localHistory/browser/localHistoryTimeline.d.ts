export { l as $Yyc };
declare let l: {
    new (t: any, e: any, s: any, o: any, i: any, r: any, h: any): {
        f: any;
        g: any;
        h: any;
        j: any;
        m: any;
        n: any;
        r: any;
        id: string;
        label: any;
        scheme: string;
        b: any;
        onDidChange: any;
        c: any;
        s(): void;
        t(): void;
        u(): void;
        w(t: any): void;
        provideTimeline(t: any, e: any, s: any): Promise<{
            source: string;
            items: {
                handle: any;
                label: any;
                tooltip: S;
                source: string;
                timestamp: any;
                themeIcon: any;
                contextValue: string;
                command: {
                    id: string;
                    title: any;
                    arguments: any[];
                };
            }[];
        }>;
        y(t: any): {
            handle: any;
            label: any;
            tooltip: S;
            source: string;
            timestamp: any;
            themeIcon: any;
            contextValue: string;
            command: {
                id: string;
                title: any;
                arguments: any[];
            };
        };
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    a: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Vj as S } from "../../../../base/common/htmlContent.js";
//# sourceMappingURL=localHistoryTimeline.d.ts.map