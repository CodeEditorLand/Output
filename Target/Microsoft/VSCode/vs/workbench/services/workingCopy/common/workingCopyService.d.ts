declare const y: any;
declare class i extends g {
    constructor(...args: any[]);
    a: any;
    onDidRegister: any;
    b: any;
    onDidUnregister: any;
    f: any;
    onDidChangeDirty: any;
    g: any;
    onDidChangeContent: any;
    h: any;
    onDidSave: any;
    j: Set<any>;
    m: j;
    n: any;
    w: Map<any, any>;
    get workingCopies(): any[];
    registerWorkingCopy(t: any): any;
    r(t: any): void;
    has(t: any): any;
    get(t: any): any;
    getAll(t: any): any[] | undefined;
    y(t: any): string | undefined;
    z(t: any): void;
    get hasDirty(): boolean;
    get dirtyCount(): number;
    get dirtyWorkingCopies(): any[];
    get modifiedCount(): number;
    get modifiedWorkingCopies(): any[];
    isDirty(t: any, e: any): any;
}
import { $vd as g } from "../../../../base/common/lifecycle.js";
import { $Ic as j } from "../../../../base/common/map.js";
export { y as $pI, i as $qI };
//# sourceMappingURL=workingCopyService.d.ts.map