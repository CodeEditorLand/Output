export let Diagnostic: {
    new (range: any, message: any, severity?: any): {
        range: any;
        message: any;
        severity: any;
        toJSON(): {
            severity: any;
            message: any;
            range: any;
            source: any;
            code: any;
        };
    };
    isEqual(a: any, b: any): any;
};
export let DiagnosticRelatedInformation: {
    new (location: any, message: any): {
        location: any;
        message: any;
    };
    is(thing: any): any;
    isEqual(a: any, b: any): any;
};
export var DiagnosticSeverity: any;
export var DiagnosticTag: any;
//# sourceMappingURL=diagnostic.d.ts.map