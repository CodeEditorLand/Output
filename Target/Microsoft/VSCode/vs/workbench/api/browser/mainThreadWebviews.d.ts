declare let f: {
    new (t: any, e: any, r: any): {
        f: any;
        g: any;
        c: Map<any, any>;
        b: any;
        addWebview(t: any, e: any, r: any): void;
        $setHtml(t: any, e: any): void;
        $setOptions(t: any, e: any): void;
        $postMessage(t: any, e: any, ...r: any[]): Promise<any>;
        h(t: any, e: any, r: any): void;
        j(t: any, e: any): void;
        m(t: any, e: any): any;
        n(t: any): any;
        s(t: any): any;
        getWebviewResolvedFailedContent(t: any): string;
        q: d;
        dispose(): void;
        B(t: any): any;
    };
    a: Set<any> | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function F(o: any): {
    id: any;
    location: any;
};
declare function M(o: any): {
    allowScripts: any;
    allowForms: any;
    enableCommandUris: any;
    localResourceRoots: any;
    portMapping: any;
};
import { $ud as d } from "../../../base/common/lifecycle.js";
export { f as $jXb, F as $kXb, M as $lXb };
//# sourceMappingURL=mainThreadWebviews.d.ts.map