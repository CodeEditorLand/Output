declare class g {
    constructor(t: any);
    config: any;
    a: x;
    onConfigDidUpdate: any;
    updateConfig(t: any): void;
}
declare class V {
    constructor(t: any);
    a: any;
    resolve(): Promise<any>;
}
declare const I: S;
import { $ef as x } from "../../../../base/common/event.js";
declare class S {
    models: F;
    initializeModelFromExistingModel(t: any, e: any, n: any): void;
    initializeModelFromRawData(t: any, e: any, n: any, l: any): void;
    initializeModelFromExistingFile(t: any, e: any, n: any): void;
    a(t: any, e: any, n: any, l: any, r: any): Promise<{
        resultsModel: any;
        configurationModel: g;
    } | undefined>;
}
import { $Ic as F } from "../../../../base/common/map.js";
export { g as $hdc, V as $idc, I as $jdc };
//# sourceMappingURL=searchEditorModel.d.ts.map