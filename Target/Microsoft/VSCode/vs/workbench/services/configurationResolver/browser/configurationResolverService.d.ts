export { c as $RCc };
declare let c: {
    new (r: any, t: any, m: any, i: any, o: any, n: any, p: any, l: any, $: any): {
        e: any;
        k: any;
        n: any;
        o: any;
        p: any;
        q: any;
        d: import("../../../../base/common/async.js").$Th;
        resolveWithInteractionReplace(u: any, r: any, c: any, o: any, t: any): Promise<any>;
        resolveWithInteraction(u: any, r: any, c: any, o: any, t: any): Promise<Map<any, any> | undefined>;
        s(u: any, r: any, c: any): Promise<any>;
        t(): import("../../../../base/common/map.js").$Lc;
        u(u: any): void;
        w(u: any, r: any, c: any, o: any): Promise<{
            value: any;
            input: any;
        } | undefined>;
        h: Map<any, any>;
        resolvableVariables: Set<string>;
        a: any;
        b: any;
        g: any;
        c: any;
        i(t: any): any;
        resolveWithEnvironment(t: any, n: any, o: any): Promise<any>;
        resolveAsync(t: any, n: any): Promise<any>;
        contributeVariable(t: any, n: any): void;
        j(t: any): any;
        l(t: any, n: any, o: any, s: any): Promise<any>;
        m(t: any, n: any, o: any, s: any, l: any): any;
    };
    INPUT_OR_COMMAND_VARIABLES_PATTERN: RegExp | undefined;
};
//# sourceMappingURL=configurationResolverService.d.ts.map