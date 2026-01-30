export var COI: any;
export const CacheControlheaders: Readonly<{
    "Cache-Control": "no-cache, no-store";
}>;
export const DocumentPolicyheaders: Readonly<{
    "Document-Policy": "include-js-call-stacks-in-crash-reports";
}>;
export const FileAccess: FileAccessImpl;
export const RemoteAuthorities: RemoteAuthoritiesImpl;
export var Schemas: any;
export const VSCODE_AUTHORITY: "vscode-app";
export const builtinExtensionsPath: "vs/../../extensions";
export const connectionTokenCookieName: "vscode-tkn";
export const connectionTokenQueryName: "tkn";
export function getServerProductSegment(product: any): string;
export function matchesScheme(target: any, scheme: any): boolean;
export function matchesSomeScheme(target: any, ...schemes: any[]): boolean;
export const nodeModulesAsarPath: "vs/../../node_modules.asar";
export const nodeModulesAsarUnpackedPath: "vs/../../node_modules.asar.unpacked";
export const nodeModulesPath: "vs/../../node_modules";
declare class FileAccessImpl {
    /**
     * Returns a URI to use in contexts where the browser is responsible
     * for loading (e.g. fetch()) or when used within the DOM.
     *
     * **Note:** use `dom.ts#asCSSUrl` whenever the URL is to be used in CSS context.
     */
    asBrowserUri(resourcePath: any): any;
    /**
     * Returns a URI to use in contexts where the browser is responsible
     * for loading (e.g. fetch()) or when used within the DOM.
     *
     * **Note:** use `dom.ts#asCSSUrl` whenever the URL is to be used in CSS context.
     */
    uriToBrowserUri(uri: any): any;
    /**
     * Returns the `file` URI to use in contexts where node.js
     * is responsible for loading.
     */
    asFileUri(resourcePath: any): any;
    /**
     * Returns the `file` URI to use in contexts where node.js
     * is responsible for loading.
     */
    uriToFileUri(uri: any): any;
    toUri(uriOrModule: any): any;
}
declare class RemoteAuthoritiesImpl {
    _hosts: any;
    _ports: any;
    _connectionTokens: any;
    _preferredWebSchema: string;
    _delegate: any;
    _serverRootPath: string;
    setPreferredWebSchema(schema: any): void;
    setDelegate(delegate: any): void;
    setServerRootPath(product: any, serverBasePath: any): void;
    getServerRootPath(): string;
    get _remoteResourcesPath(): any;
    set(authority: any, host: any, port: any): void;
    setConnectionToken(authority: any, connectionToken: any): void;
    getPreferredWebSchema(): string;
    rewrite(uri: any): any;
}
export {};
//# sourceMappingURL=network.d.ts.map