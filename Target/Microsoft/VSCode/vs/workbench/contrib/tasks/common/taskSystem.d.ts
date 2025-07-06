declare class a {
    constructor(t: any, i: any, n: any);
    task: any;
    resolver: any;
    trigger: any;
    verify(): boolean;
    getVerifiedTask(): {
        task: any;
        resolver: any;
        trigger: any;
        resolvedVariables: any;
        systemInfo: any;
        workspaceFolder: any;
        shellLaunchConfig: any;
    };
}
declare class h {
    constructor(t: any, i: any, n: any);
    severity: any;
    message: any;
    code: any;
}
declare var o: any;
declare var r: any;
declare var s: any;
export { a as $42b, h as $52b, o as TaskErrors, r as TaskExecuteKind, s as Triggers };
//# sourceMappingURL=taskSystem.d.ts.map