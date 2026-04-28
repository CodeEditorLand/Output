export namespace FileProtocolShim {
    export { installFileProtocolShim as install };
    export { PROTOCOL_HANDLERS as handlers };
    export { parseProtocolURL };
    export { inferMimeType };
}
export function installFileProtocolShim(): void;
declare const PROTOCOL_HANDLERS: ({
    matches(req: any): boolean;
    handle(req: any): Promise<{
        content: string | Uint8Array<ArrayBufferLike>;
        metadata: {
            mime: any;
            lastModified: string;
        };
        error?: never;
    } | {
        content: string;
        error: undefined;
        metadata?: never;
    }>;
} | {
    matches(req: any): boolean;
    handle(req: any): Promise<{
        content: any;
        metadata: {
            mime: any;
        };
        error?: never;
    } | {
        content: null;
        error: Error;
        metadata?: never;
    }>;
})[];
declare function parseProtocolURL(url: any): {
    protocol: string;
    path: string;
    query: {};
};
declare function inferMimeType(path: any): any;
export {};
//# sourceMappingURL=FileProtocolShim.d.ts.map