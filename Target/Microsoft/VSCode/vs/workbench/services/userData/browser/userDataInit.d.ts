declare const R: any;
declare class $ {
    constructor(i?: any[]);
    a: any[];
    whenInitializationFinished(): Promise<void>;
    requiresInitialization(): Promise<boolean>;
    initializeRequiredResources(): Promise<void>;
    initializeOtherResources(i: any): Promise<void>;
    initializeInstalledExtensions(i: any): Promise<void>;
}
export { R as $v6b, $ as $w6b };
//# sourceMappingURL=userDataInit.d.ts.map