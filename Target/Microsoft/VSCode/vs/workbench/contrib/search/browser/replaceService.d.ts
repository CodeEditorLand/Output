declare let b: {
    new (e: any, o: any): {
        c: any;
        d: any;
        provideTextContent(e: any): any;
    };
    ID: string | undefined;
};
declare let w: {
    new (e: any, o: any, s: any, r: any, t: any, i: any): {
        d: any;
        f: any;
        g: any;
        h: any;
        i: any;
        j: any;
        replace(e: any, o?: undefined, s?: null): Promise<any>;
        openReplacePreview(e: any, o: any, s: any, r: any): Promise<void>;
        updateReplacePreview(e: any, o?: boolean): Promise<void>;
        k(e: any, o: any): void;
        l(e: any, o?: null): B[];
        m(e: any, o: any, s?: null): B;
    };
    c: any;
};
import { $Ahb as B } from "../../../../editor/browser/services/bulkEditService.js";
export { b as $Doc, w as $Eoc };
//# sourceMappingURL=replaceService.d.ts.map