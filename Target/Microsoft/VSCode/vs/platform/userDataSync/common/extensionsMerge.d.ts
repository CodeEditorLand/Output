export { X as $UAc };
declare function X(d: any, a: any, u: any, o: any, c: any, v: any): {
    local: {
        added: any[];
        removed: any[];
        updated: any[];
    };
    remote: {
        added: any;
        updated: never[];
        removed: never[];
        all: any;
    } | null;
} | {
    local: {
        added: any[];
        removed: any[];
        updated: any[];
    };
    remote: {
        added: any[];
        updated: any[];
        removed: any[];
        all: any[];
    } | null;
};
//# sourceMappingURL=extensionsMerge.d.ts.map