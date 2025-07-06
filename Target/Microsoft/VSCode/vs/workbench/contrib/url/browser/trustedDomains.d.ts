declare const h: "http.linkProtectionTrustedDomains";
declare const v: "http.linkProtectionTrustedDomainsContent";
declare namespace R {
    let id: string;
    namespace description {
        let description_1: {
            value: any;
            original: any;
        };
        export { description_1 as description };
        export let args: never[];
    }
    function handler(t: any): Promise<void>;
}
declare function j(t: any, o: any, r: any, l: any, s: any, a: any, u: any): Promise<any>;
declare function U(t: any): Promise<{
    defaultTrustedDomains: any[];
    trustedDomains: any;
}>;
declare function $(t: any): {
    defaultTrustedDomains: any[];
    trustedDomains: any;
};
export { h as $D1b, v as $E1b, R as $F1b, j as $G1b, U as $H1b, $ as $I1b };
//# sourceMappingURL=trustedDomains.d.ts.map