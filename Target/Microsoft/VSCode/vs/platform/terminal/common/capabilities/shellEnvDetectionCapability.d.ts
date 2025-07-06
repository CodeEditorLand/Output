export { l as $3Yb };
declare class l extends n {
    constructor(...args: any[]);
    type: number;
    b: {
        value: Map<any, any>;
        isTrusted: boolean;
    };
    c: any;
    onDidChangeEnv: any;
    get env(): {
        value: any;
        isTrusted: boolean;
    };
    setEnvironment(e: any, t: any): void;
    startEnvironmentSingleVar(e: any, t: any): void;
    a: {
        value: Map<any, any>;
        isTrusted: any;
    } | {
        value: Map<any, any>;
        isTrusted: any;
    } | undefined;
    setEnvironmentSingleVar(e: any, t: any, i: any): void;
    endEnvironmentSingleVar(e: any): void;
    deleteEnvironmentSingleVar(e: any, t: any, i: any): void;
    f(): void;
    g(): {
        value: any;
        isTrusted: boolean;
    };
}
import { $vd as n } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=shellEnvDetectionCapability.d.ts.map