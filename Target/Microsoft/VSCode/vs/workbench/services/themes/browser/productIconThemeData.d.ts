declare const F: "";
declare class l {
    static fromExtensionTheme(t: any, e: any, n: any): l;
    static createUnloadedTheme(t: any): l;
    static get defaultTheme(): any;
    static fromStorageData(t: any): l | undefined;
    constructor(t: any, e: any, n: any);
    iconThemeDocument: {
        iconDefinitions: Map<any, any>;
    };
    id: any;
    label: any;
    settingsId: any;
    isLoaded: boolean;
    getIcon(t: any): any;
    ensureLoaded(t: any, e: any): Promise<any>;
    reload(t: any, e: any): Promise<any>;
    a(t: any, e: any): Promise<any>;
    toStorage(t: any): void;
}
export { F as $s6b, l as $t6b };
//# sourceMappingURL=productIconThemeData.d.ts.map