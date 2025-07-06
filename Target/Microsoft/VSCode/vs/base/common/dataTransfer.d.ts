declare const l: Readonly<{
    create: (e: any) => any;
    split: (e: any) => any;
    parse: (e: any) => any;
}>;
declare function d(e: any, t: any): {
    id: any;
    asString: () => Promise<any>;
    asFile: () => void;
    value: string | undefined;
};
declare function g(e: any, t: any, s: any, r: any): {
    id: any;
    asString: () => Promise<string>;
    asFile: () => {
        id: string;
        name: any;
        uri: any;
        data: any;
    };
    value: undefined;
};
declare class $ {
    a: Map<any, any>;
    get size(): number;
    has(t: any): boolean;
    matches(t: any): any;
    get(t: any): any;
    append(t: any, s: any): void;
    replace(t: any, s: any): void;
    delete(t: any): void;
    b(t: any): any;
    [Symbol.iterator](): Generator<any[], void, unknown>;
}
declare function y(e: any, t: any): any;
export { l as $0C, d as $6C, g as $7C, $ as $8C, y as $9C };
//# sourceMappingURL=dataTransfer.d.ts.map