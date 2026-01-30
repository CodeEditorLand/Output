export let Location: {
    new (uri: any, rangeOrPosition: any): {
        uri: any;
        range: any;
        toJSON(): {
            uri: any;
            range: any;
        };
    };
    isLocation(thing: any): boolean;
};
//# sourceMappingURL=location.d.ts.map