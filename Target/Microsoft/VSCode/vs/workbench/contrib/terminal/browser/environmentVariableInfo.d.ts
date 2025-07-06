declare let m: {
    new (t: any, e: any, n: any, o: any, r: any): {
        a: any;
        b: any;
        c: any;
        d: any;
        f: any;
        requiresAction: boolean;
        g(t: any): any;
        h(): {
            label: any;
            run: () => any;
            commandId: string;
        }[];
        getStatus(t: any): {
            id: string;
            severity: any;
            icon: {
                id: any;
            };
            tooltip: any;
            hoverActions: {
                label: any;
                run: () => any;
                commandId: string;
            }[];
        };
    };
};
declare let p: {
    new (t: any, e: any, n: any): {
        a: any;
        b: any;
        c: any;
        requiresAction: boolean;
        d(t: any): any;
        f(t: any): {
            label: any;
            run: () => any;
            commandId: string;
        }[];
        getStatus(t: any): {
            id: string;
            severity: any;
            tooltip: undefined;
            detailedTooltip: any;
            hoverActions: {
                label: any;
                run: () => any;
                commandId: string;
            }[];
        };
    };
};
export { m as $wsc, p as $xsc };
//# sourceMappingURL=environmentVariableInfo.d.ts.map