export let MainThreadAuthentication: {
    new (extHostContext: any, productService: any, authenticationService: any, authenticationExtensionsService: any, authenticationAccessService: any, authenticationUsageService: any, dialogService: any, notificationService: any, extensionService: any, telemetryService: any, openerService: any, logService: any, urlService: any, dynamicAuthProviderStorageService: any, clipboardService: any, quickInputService: any): {
        productService: any;
        authenticationService: any;
        authenticationExtensionsService: any;
        authenticationAccessService: any;
        authenticationUsageService: any;
        dialogService: any;
        notificationService: any;
        extensionService: any;
        telemetryService: any;
        openerService: any;
        logService: any;
        urlService: any;
        dynamicAuthProviderStorageService: any;
        clipboardService: any;
        quickInputService: any;
        _registrations: any;
        _sentProviderUsageEvents: Set<any>;
        _suppressUnregisterEvent: boolean;
        _sentClientIdUsageEvents: Set<any>;
        _proxy: any;
        $registerAuthenticationProvider({ id, label, supportsMultipleAccounts, resourceServer, supportedAuthorizationServers, supportsChallenges }: {
            id: any;
            label: any;
            supportsMultipleAccounts: any;
            resourceServer: any;
            supportedAuthorizationServers: any;
            supportsChallenges: any;
        }): Promise<void>;
        $unregisterAuthenticationProvider(id: any): Promise<void>;
        $ensureProvider(id: any): Promise<any>;
        $sendDidChangeSessions(providerId: any, event: any): Promise<void>;
        $removeSession(providerId: any, sessionId: any): any;
        $waitForUriHandler(expectedUri: any): Promise<any>;
        $showContinueNotification(message: any): Promise<any>;
        $registerDynamicAuthenticationProvider(details: any): Promise<void>;
        $setSessionsForDynamicAuthProvider(authProviderId: any, clientId: any, sessions: any): Promise<void>;
        $sendDidChangeDynamicProviderInfo({ providerId, clientId, authorizationServer, label, clientSecret }: {
            providerId: any;
            clientId: any;
            authorizationServer: any;
            label: any;
            clientSecret: any;
        }): Promise<void>;
        loginPrompt(provider: any, extensionName: any, recreatingSession: any, options: any): Promise<any>;
        continueWithIncorrectAccountPrompt(chosenAccountLabel: any, requestedAccountLabel: any): Promise<boolean>;
        doGetSession(providerId: any, scopeListOrRequest: any, extensionId: any, extensionName: any, options: any): Promise<any>;
        $getSession(providerId: any, scopeListOrRequest: any, extensionId: any, extensionName: any, options: any): Promise<any>;
        $getAccounts(providerId: any): Promise<any>;
        sendClientIdUsageTelemetry(extensionId: any, providerId: any, scopes: any): void;
        sendProviderUsageTelemetry(extensionId: any, providerId: any): void;
        _getAccountPreference(extensionId: any, providerId: any, sessions: any): any;
        $showDeviceCodeModal(userCode: any, verificationUri: any): Promise<any>;
        $promptForClientRegistration(authorizationServerUrl: any): Promise<{
            clientId: any;
            clientSecret: any;
        } | undefined>;
        _store: import("../../../base/common/lifecycle.js").DisposableStore;
        dispose(): void;
        _register(o: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=mainThreadAuthentication.d.ts.map