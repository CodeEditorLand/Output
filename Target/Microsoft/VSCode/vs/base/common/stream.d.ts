export function consumeReadable(readable: any, reducer: any): any;
export function consumeStream(stream: any, reducer: any): Promise<any>;
export function emptyStream(): WriteableStreamImpl;
export function isReadable(obj: any): boolean;
export function isReadableBufferedStream(obj: any): boolean;
export function isReadableStream(obj: any): boolean;
export function listenStream(stream: any, listener: any, token: any): void;
export function newWriteableStream(reducer: any, options: any): WriteableStreamImpl;
export function peekReadable(readable: any, reducer: any, maxChunks: any): any;
export function peekStream(stream: any, maxChunks: any): Promise<any>;
export function prefixedReadable(prefix: any, readable: any, reducer: any): {
    read: any;
};
export function prefixedStream(prefix: any, stream: any, reducer: any): WriteableStreamImpl;
export function toReadable(t: any): {
    read: any;
};
export function toStream(t: any, reducer: any): WriteableStreamImpl;
export function transform(stream: any, transformer: any, reducer: any): WriteableStreamImpl;
declare class WriteableStreamImpl {
    /**
     * @param reducer a function that reduces the buffered data into a single object;
     * 				  because some objects can be complex and non-reducible, we also
     * 				  allow passing the explicit `null` value to skip the reduce step
     * @param options stream options
     */
    constructor(reducer: any, options: any);
    reducer: any;
    options: any;
    state: {
        flowing: boolean;
        ended: boolean;
        destroyed: boolean;
    };
    buffer: {
        data: never[];
        error: never[];
    };
    listeners: {
        data: never[];
        error: never[];
        end: never[];
    };
    pendingWritePromises: any[];
    pause(): void;
    resume(): void;
    write(data: any): Promise<any> | undefined;
    error(error: any): void;
    end(result: any): void;
    emitData(data: any): void;
    emitError(error: any): void;
    emitEnd(): void;
    on(event: any, callback: any): void;
    removeListener(event: any, callback: any): void;
    flowData(): void;
    flowErrors(): void;
    flowEnd(): boolean;
    destroy(): void;
}
export {};
//# sourceMappingURL=stream.d.ts.map