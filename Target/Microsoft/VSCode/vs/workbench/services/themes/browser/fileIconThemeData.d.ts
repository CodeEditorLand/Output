declare class p {
    static fromExtensionTheme(o: any, s: any, t: any): p;
    static get noIconTheme(): any;
    static createUnloadedTheme(o: any): p;
    static fromStorageData(o: any): p | undefined;
    constructor(o: any, s: any, t: any);
    id: any;
    label: any;
    settingsId: any;
    isLoaded: boolean;
    hasFileIcons: boolean;
    hasFolderIcons: boolean;
    hidesExplorerArrows: boolean;
    ensureLoaded(o: any): any;
    reload(o: any): any;
    a(o: any): any;
    toStorage(o: any): void;
}
declare class _ {
    constructor(o: any, s: any);
    a: any;
    b: any;
    load(o: any): any;
    c(o: any): any;
    d(o: any, s: any, t: any): {
        content: string;
        hasFileIcons: boolean;
        hasFolderIcons: boolean;
        hidesExplorerArrows: boolean;
    };
    f(o: any): any;
}
export { p as $m6b, _ as $n6b };
//# sourceMappingURL=fileIconThemeData.d.ts.map