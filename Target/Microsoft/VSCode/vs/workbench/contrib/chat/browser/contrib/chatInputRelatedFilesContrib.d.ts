declare let f: {
    new (t: any, e: any): {
        c: any;
        f: any;
        a: Map<any, any>;
        g(t: any, e: any): void;
        b: any;
        h(t: any, e: any): void;
        dispose(): void;
        q: D;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class W extends d {
    constructor(...args: any[]);
    a: any;
    onDidChange: any;
    b: p;
    c: any[];
    get removedFiles(): p;
    set value(t: any[]);
    get value(): any[];
    remove(t: any): void;
    clearRemovedFiles(): void;
    clear(): void;
}
import { $ud as D } from "../../../../../base/common/lifecycle.js";
import { $vd as d } from "../../../../../base/common/lifecycle.js";
import { $Jc as p } from "../../../../../base/common/map.js";
export { f as $5Mb, W as $6Mb };
//# sourceMappingURL=chatInputRelatedFilesContrib.d.ts.map