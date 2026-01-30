export let AuthenticationService: {
    new (_extensionService: any, authenticationAccessService: any, _environmentService: any, _logService: any): {
        _extensionService: any;
        _environmentService: any;
        _logService: any;
        _onDidRegisterAuthenticationProvider: any;
        onDidRegisterAuthenticationProvider: any;
        _onDidUnregisterAuthenticationProvider: any;
        onDidUnregisterAuthenticationProvider: any;
        _onDidChangeSessions: any;
        onDidChangeSessions: any;
        _onDidChangeDeclaredProviders: any;
        onDidChangeDeclaredProviders: any;
        _authenticationProviders: Map<any, any>;
        _authenticationProviderDisposables: any;
        _dynamicAuthenticationProviderIds: Set<any>;
        _delegates: any[];
        _disposedSource: CancellationTokenSource;
        _declaredProviders: any[];
        get declaredProviders(): any[];
        _registerEnvContributedAuthenticationProviders(): void;
        _registerAuthenticationExtensionPointHandler(): void;
        registerDeclaredAuthenticationProvider(provider: any): void;
        unregisterDeclaredAuthenticationProvider(id: any): void;
        isAuthenticationProviderRegistered(id: any): boolean;
        isDynamicAuthenticationProvider(id: any): boolean;
        registerAuthenticationProvider(id: any, authenticationProvider: any): void;
        unregisterAuthenticationProvider(id: any): void;
        getProviderIds(): any[];
        getProvider(id: any): any;
        getAccounts(id: any): Promise<any[]>;
        getSessions(id: any, scopeListOrRequest: any, options: any, activateImmediate?: boolean): Promise<any>;
        createSession(id: any, scopeListOrRequest: any, options: any): Promise<any>;
        removeSession(id: any, sessionId: any): Promise<any>;
        getOrActivateProviderIdForServer(authorizationServer: any, resourceServer: any): Promise<any>;
        createDynamicAuthenticationProvider(authorizationServer: any, serverMetadata: any, resource: any): Promise<any>;
        registerAuthenticationProviderHostDelegate(delegate: any): {
            dispose: any;
        };
        matchesProvider(provider: any, authorizationServer: any, resourceServer: any): boolean;
        tryActivateProvider(providerId: any, activateImmediate: any): Promise<any>;
        _store: DisposableStore;
        dispose(): void;
        _register(o: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export function getAuthenticationProviderActivationEvent(id: any): string;
export function getCurrentAuthenticationSessionInfo(secretStorageService: any, productService: any): Promise<any>;
import { CancellationTokenSource } from "../../../../base/common/cancellation.js";
import { DisposableStore } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=authenticationService.d.ts.map