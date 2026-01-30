export let SymbolInformation: {
    new (name: any, kind: any, rangeOrContainer: any, locationOrUri: any, containerName: any): {
        name: any;
        kind: any;
        containerName: any;
        location: {
            uri: any;
            range: any;
            toJSON(): {
                uri: any;
                range: any;
            };
        } | undefined;
        toJSON(): {
            name: any;
            kind: any;
            location: {
                uri: any;
                range: any;
                toJSON(): {
                    uri: any;
                    range: any;
                };
            } | undefined;
            containerName: any;
        };
    };
    validate(candidate: any): void;
};
export var SymbolKind: any;
export var SymbolTag: any;
//# sourceMappingURL=symbolInformation.d.ts.map