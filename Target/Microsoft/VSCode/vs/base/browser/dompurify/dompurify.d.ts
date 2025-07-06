export { sn as default };
declare function sn(i: any): {
    (i: any): /*elided*/ any;
    version: string;
    removed: any[];
    isSupported: any;
    sanitize(i: any, ...args: any[]): any;
    setConfig(...args: any[]): void;
    clearConfig(): void;
    isValidAttribute(i: any, e: any, t: any): boolean;
    addHook(i: any, e: any): void;
    removeHook(i: any): any;
    removeHooks(i: any): void;
    removeAllHooks(): void;
};
declare namespace sn {
    let version: string;
    let removed: any[];
    let isSupported: any;
    function sanitize(i: any, ...args: any[]): any;
    function setConfig(...args: any[]): void;
    function clearConfig(): void;
    function isValidAttribute(i: any, e: any, t: any): boolean;
    function addHook(i: any, e: any): void;
    function removeHook(i: any): any;
    function removeHooks(i: any): void;
    function removeAllHooks(): void;
}
//# sourceMappingURL=dompurify.d.ts.map