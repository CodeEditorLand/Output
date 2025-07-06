declare class r {
    constructor(o: any, t: any);
    key: any;
    data: any;
    incoming: Map<any, any>;
    outgoing: Map<any, any>;
}
declare class u {
    constructor(o: any);
    b: any;
    a: Map<any, any>;
    roots(): any[];
    insertEdge(o: any, t: any): void;
    removeNode(o: any): void;
    lookupOrInsertNode(o: any): any;
    lookup(o: any): any;
    isEmpty(): boolean;
    toString(): string;
    findCycleSlow(): any;
    c(o: any, t: any): any;
}
export { r as $bB, u as $cB };
//# sourceMappingURL=graph.d.ts.map