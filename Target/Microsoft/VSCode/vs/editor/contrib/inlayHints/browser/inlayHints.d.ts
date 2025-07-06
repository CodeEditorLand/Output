declare class b {
    constructor(i: any, t: any);
    range: any;
    direction: any;
}
declare class u {
    constructor(i: any, t: any, n: any);
    hint: any;
    anchor: any;
    provider: any;
    c: boolean;
    with(i: any): u;
    resolve(i: any): any;
    d: any;
    e(i: any): Promise<void>;
}
declare class d {
    static create(i: any, t: any, n: any, h: any): Promise<d>;
    static e(i: any, t: any): f;
    constructor(i: any, t: any, n: any);
    d: w;
    ranges: any;
    provider: Set<any>;
    items: u[];
    dispose(): void;
}
declare function H(c: any): string;
import { $ud as w } from "../../../../base/common/lifecycle.js";
import { $eC as f } from "../../../common/core/range.js";
export { b as $smb, u as $tmb, d as $umb, H as $vmb };
//# sourceMappingURL=inlayHints.d.ts.map