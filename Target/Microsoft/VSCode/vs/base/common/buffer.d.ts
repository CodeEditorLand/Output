export class VSBuffer {
    /**
     * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
     * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
     */
    static alloc(byteLength: any): VSBuffer;
    /**
     * When running in a nodejs context, if `actual` is not a nodejs Buffer, the backing store for
     * the returned `VSBuffer` instance might use a nodejs Buffer allocated from node's Buffer pool,
     * which is not transferrable.
     */
    static wrap(actual: any): VSBuffer;
    /**
     * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
     * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
     */
    static fromString(source: any, options: any): VSBuffer;
    /**
     * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
     * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
     */
    static fromByteArray(source: any): VSBuffer;
    /**
     * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
     * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
     */
    static concat(buffers: any, totalLength: any): VSBuffer;
    static isNativeBuffer(buffer: any): boolean;
    constructor(buffer: any);
    buffer: any;
    byteLength: any;
    /**
     * When running in a nodejs context, the backing store for the returned `VSBuffer` instance
     * might use a nodejs Buffer allocated from node's Buffer pool, which is not transferrable.
     */
    clone(): VSBuffer;
    toString(): any;
    slice(start: any, end: any): VSBuffer;
    set(array: any, offset: any): void;
    readUInt32BE(offset: any): any;
    writeUInt32BE(value: any, offset: any): void;
    readUInt32LE(offset: any): number;
    writeUInt32LE(value: any, offset: any): void;
    readUInt8(offset: any): any;
    writeUInt8(value: any, offset: any): void;
    indexOf(subarray: any, offset?: number): any;
    equals(other: any): any;
}
export function binaryIndexOf(haystack: any, needle: any, offset?: number): any;
export function bufferToReadable(buffer: any): {
    read: any;
};
export function bufferToStream(buffer: any): {
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
};
export function bufferedStreamToBuffer(bufferedStream: any): Promise<VSBuffer>;
export function decodeBase64(encoded: any): VSBuffer;
export function decodeHex(hex: any): VSBuffer;
export function encodeBase64({ buffer }: {
    buffer: any;
}, padded?: boolean, urlSafe?: boolean): string;
export function encodeHex({ buffer }: {
    buffer: any;
}): string;
export function newWriteableBufferStream(options: any): {
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
};
export function prefixedBufferReadable(prefix: any, readable: any): {
    read: any;
};
export function prefixedBufferStream(prefix: any, stream: any): {
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
};
export function readUInt16LE(source: any, offset: any): number;
export function readUInt32BE(source: any, offset: any): any;
export function readUInt32LE(source: any, offset: any): number;
export function readUInt8(source: any, offset: any): any;
export function readableToBuffer(readable: any): any;
export function streamToBuffer(stream: any): Promise<any>;
export function streamToBufferReadableStream(stream: any): {
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
};
export function writeUInt16LE(destination: any, value: any, offset: any): void;
export function writeUInt32BE(destination: any, value: any, offset: any): void;
export function writeUInt32LE(destination: any, value: any, offset: any): void;
export function writeUInt8(destination: any, value: any, offset: any): void;
//# sourceMappingURL=buffer.d.ts.map