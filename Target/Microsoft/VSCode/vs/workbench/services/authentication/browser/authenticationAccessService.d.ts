export let AuthenticationAccessService: {
    new (_storageService: any, _productService: any): {
        _storageService: any;
        _productService: any;
        _onDidChangeExtensionSessionAccess: any;
        onDidChangeExtensionSessionAccess: any;
        isAccessAllowed(providerId: any, accountName: any, extensionId: any): any;
        readAllowedExtensions(providerId: any, accountName: any): any;
        updateAllowedExtensions(providerId: any, accountName: any, extensions: any): void;
        removeAllowedExtensions(providerId: any, accountName: any): void;
        _store: import("../../../../base/common/lifecycle.js").DisposableStore;
        dispose(): void;
        _register(o: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export const IAuthenticationAccessService: any;
//# sourceMappingURL=authenticationAccessService.d.ts.map