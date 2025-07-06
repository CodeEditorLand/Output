declare function i(a: any): {
    createChangeSummary: (e: any) => {
        changes: never[];
    };
    handleChange(e: any, r: any): boolean;
    beforeUpdate(e: any, r: any): void;
};
declare function c(a: any): {
    createChangeSummary: (r: any) => {
        changes: never[];
    };
    handleChange(r: any, n: any): boolean;
    beforeUpdate(r: any, n: any): void;
};
export { i as $Td, c as $Ud };
//# sourceMappingURL=changeTracker.d.ts.map