declare function M(h: any, r: any, e: any): any;
declare class l {
    constructor(r: any, e: any, t: any, i: any, n?: boolean);
    i: any;
    j: any;
    k: boolean;
    f: any;
    g: p;
    d: m;
    h: any;
    c: string;
    id(): string;
    parent(): any;
    text(): any;
    range(): m;
    preview(): {
        before: any;
        fullBefore: any;
        inside: any;
        after: any;
    };
    get replaceString(): any;
    fullMatchText(r?: boolean): any;
    rangeInPreview(): any;
    fullPreviewLines(): any;
    getMatchString(): any;
    get isReadonly(): boolean;
}
import { $AP as p } from "../../../../services/search/common/search.js";
import { $eC as m } from "../../../../../editor/common/core/range.js";
export { M as $Scc, l as $Tcc };
//# sourceMappingURL=match.d.ts.map