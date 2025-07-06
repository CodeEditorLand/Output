declare class A {
    constructor(t: any);
    value: any;
    isTrustedTelemetryValue: boolean;
}
declare class I {
    telemetryLevel: number;
    sessionId: string;
    machineId: string;
    sqmId: string;
    devDeviceId: string;
    firstSessionDate: string;
    sendErrorTelemetry: boolean;
    publicLog(): void;
    publicLog2(): void;
    publicLogError(): void;
    publicLogError2(): void;
    setExperimentProperty(): void;
}
declare const L: I;
declare class R {
    publicLog(t: any, r: any, n: any): Promise<void>;
    publicLogError(t: any, r: any, n: any): Promise<void>;
}
declare const _: "telemetry";
declare namespace O {
    export { _ as id };
    export let name: any;
}
declare namespace G {
    function log(): null;
    function flush(): Promise<undefined>;
}
declare function J(e: any, t: any): boolean;
declare function K(e: any, t: any): boolean;
declare function N(e: any): 0 | 1 | 2 | 3 | undefined;
declare function v(e: any): {
    properties: {};
    measurements: {};
};
declare function B(e: any): any;
declare function H(e: any, t: any): any;
declare function M(e: any): any[];
declare function Q(e: any, t: any): any;
export { A as $Cu, I as $Du, L as $Eu, R as $Fu, _ as $Gu, O as $Hu, G as $Iu, J as $Ju, K as $Ku, N as $Lu, v as $Mu, B as $Nu, H as $Ou, M as $Pu, Q as $Qu };
//# sourceMappingURL=telemetryUtils.d.ts.map