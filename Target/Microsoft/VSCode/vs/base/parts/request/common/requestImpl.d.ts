export { y as $_$ };
declare function y(e: any, r: any, a: any): Promise<{
    res: {
        statusCode: number;
        headers: any;
    };
    stream: {
        e: any;
        f: any;
        a: {
            flowing: boolean;
            ended: boolean;
            destroyed: boolean;
        };
        b: {
            data: never[];
            error: never[];
        };
        c: {
            data: never[];
            error: never[];
            end: never[];
        };
        d: any[];
        pause(): void;
        resume(): void;
        write(e: any): Promise<any> | undefined;
        error(e: any): void;
        end(e: any): void;
        g(e: any): void;
        h(e: any): void;
        i(): void;
        on(e: any, t: any): void;
        removeListener(e: any, t: any): void;
        j(): void;
        k(): void;
        l(): boolean;
        destroy(): void;
    };
}>;
//# sourceMappingURL=requestImpl.d.ts.map