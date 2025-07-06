export { b as $tcb };
declare let b: {
    new (o: any, r: any, a: any, i: any): {
        readonly atlas: any;
        f: any;
        g: any;
        h: any;
        maxGpuCols: number;
        canvas: import("../../../base/browser/fastDomNode.js").$N7;
        ctx: any;
        devicePixelRatio: import("../../../base/common/observableInternal/observables/observableValue.js").$De;
        canvasDevicePixelDimensions: import("../../../base/common/observableInternal/observables/observableValue.js").$De;
        contentLeft: import("../../../base/common/observableInternal/observables/observableValue.js").$De;
        rectangleRenderer: any;
        canRender(o: any, r: any, a: any): boolean;
        canRenderDetailed(o: any, r: any, a: any): string[];
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    a: O | undefined;
    readonly decorationCssRuleExtractor: any;
    b: A | undefined;
    readonly decorationStyleCache: any;
    readonly atlas: any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $scb as O } from "./css/decorationCssRuleExtractor.js";
import { $ccb as A } from "./css/decorationStyleCache.js";
//# sourceMappingURL=viewGpuContext.d.ts.map