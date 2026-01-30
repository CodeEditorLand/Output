export const ALL_EXTENSION_KINDS: string[];
export const BUILTIN_MANIFEST_CACHE_FILE: "extensions.builtin.cache";
export const EXTENSION_CATEGORIES: string[];
export class ExtensionError extends Error {
    constructor(extensionIdentifier: any, cause: any, message: any);
    extension: any;
}
export class ExtensionIdentifier {
    static equals(a: any, b: any): boolean;
    /**
     * Gives the value by which to index (for equality).
     */
    static toKey(id: any): any;
    constructor(value: any);
    value: any;
    _lower: any;
}
export class ExtensionIdentifierMap {
    _map: Map<any, any>;
    clear(): void;
    delete(id: any): void;
    get(id: any): any;
    has(id: any): boolean;
    set(id: any, value: any): void;
    values(): MapIterator<any>;
    forEach(callbackfn: any): void;
    [Symbol.iterator](): MapIterator<[any, any]>;
}
export class ExtensionIdentifierSet {
    constructor(iterable: any);
    get size(): number;
    _set: Set<any>;
    add(id: any): void;
    delete(extensionId: any): boolean;
    has(id: any): boolean;
}
export var ExtensionType: any;
export const IBuiltinExtensionsScannerService: any;
export var TargetPlatform: any;
export const UNDEFINED_PUBLISHER: "undefined_publisher";
export const USER_MANIFEST_CACHE_FILE: "extensions.user.cache";
export function getWorkspaceSupportTypeMessage(supportType: any): any;
export function isApplicationScopedExtension(manifest: any): boolean;
export function isAuthenticationProviderExtension(manifest: any): boolean;
export function isLanguagePackExtension(manifest: any): boolean;
export function isResolverExtension(manifest: any, remoteAuthority: any): boolean;
export function parseApiProposals(enabledApiProposals: any): any;
export function parseEnabledApiProposalNames(enabledApiProposals: any): any;
//# sourceMappingURL=extensions.d.ts.map