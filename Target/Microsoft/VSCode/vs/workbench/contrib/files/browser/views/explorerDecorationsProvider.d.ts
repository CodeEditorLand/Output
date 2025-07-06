declare function w(r: any): {
    tooltip: any;
    letter: string;
    color: any;
} | {
    tooltip: any;
    letter: string;
    color?: never;
} | {
    color: any;
    tooltip?: never;
    letter?: never;
} | undefined;
declare let u: {
    new (o: any, t: any): {
        c: any;
        label: any;
        a: d;
        b: b;
        readonly onDidChange: any;
        provideDecorations(o: any): Promise<{
            tooltip: any;
            letter: string;
            color: any;
        } | {
            tooltip: any;
            letter: string;
            color?: never;
        } | {
            color: any;
            tooltip?: never;
            letter?: never;
        } | undefined>;
        dispose(): void;
    };
};
import { $ef as d } from "../../../../../base/common/event.js";
import { $ud as b } from "../../../../../base/common/lifecycle.js";
export { w as $kJb, u as $lJb };
//# sourceMappingURL=explorerDecorationsProvider.d.ts.map