export { M as $Goc };
declare let M: {
    new (e: any, o: any, i: any, l: any, s: any, r: any, n: any, u: any): {
        b: any;
        c: any;
        d: any;
        f: any;
        g: any;
        h: any;
        i: any;
        a: any;
        notebookSearch(e: any, o: any, i: any, l: any): {
            openFilesToScan: P;
            completeData: Promise<{
                messages: never[];
                limitHit: boolean;
                results: any;
            }>;
            allScannedFiles: Promise<P>;
        };
        j(e: any, o: any, i: any): Promise<any>;
        k(e: any, o: any, i: any): Promise<{
            results: x;
            limitHit: any;
        }>;
        l(e: any, o: any, i: any, l: any): Promise<{
            results: x;
            limitHit: boolean;
        }>;
        m(): any;
    };
};
import { $Jc as P } from "../../../../../base/common/map.js";
import { $Ic as x } from "../../../../../base/common/map.js";
//# sourceMappingURL=notebookSearchService.d.ts.map