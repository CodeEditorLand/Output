declare function m(t: any, o: any, u: any): {
    local: {
        added: {};
        updated: {};
        removed: any[];
    };
    remote: {
        added: any;
        updated: {};
        removed: never[];
    };
    conflicts: never[];
} | {
    local: {
        added: {};
        removed: any[];
        updated: {};
    };
    remote: {
        added: {};
        removed: any[];
        updated: {};
    };
    conflicts: any[];
};
declare function h(t: any, o: any): boolean;
export { m as $8Ac, h as $9Ac };
//# sourceMappingURL=snippetsMerge.d.ts.map