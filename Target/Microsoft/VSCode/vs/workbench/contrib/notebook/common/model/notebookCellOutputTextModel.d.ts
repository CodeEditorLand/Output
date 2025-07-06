export { d as $ZK };
declare class d extends r {
    constructor(t: any);
    get outputs(): any;
    get metadata(): any;
    get outputId(): any;
    get alternativeOutputId(): any;
    get versionId(): number;
    f: any;
    a: any;
    onDidChangeData: any;
    c: number;
    h: {};
    b: any;
    replaceData(t: any): void;
    appendData(t: any): void;
    g(): void;
    appendedSinceVersion(t: any, e: any): any;
    j(): void;
    asDto(): {
        metadata: any;
        outputs: any;
        outputId: any;
    };
    bumpVersion(): void;
}
import { $vd as r } from "../../../../../base/common/lifecycle.js";
//# sourceMappingURL=notebookCellOutputTextModel.d.ts.map