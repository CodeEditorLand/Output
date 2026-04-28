export const DebugService: {
    service: any;
    ready: boolean;
    /**
     * Health check for the service
     */
    healthCheck(): Promise<any>;
    /**
     * Invoke a method on the service
     */
    invoke(method: any, ...args: any[]): Promise<any>;
    /**
     * Register event listener
     */
    on(event: any, handler: any): void;
    /**
     * Register one-time event listener
     */
    once(event: any, handler: any): void;
    /**
     * Remove event listener
     */
    removeListener(event: any, handler: any): void;
    /**
     * Remove all event listeners
     */
    removeAllListeners(event: any): void;
} & {
    /**
     * Start debug session
     */
    startSession(configuration: any): Promise<any>;
    /**
     * Stop debug session
     */
    stopSession(sessionId: any): Promise<any>;
    /**
     * Send debug command
     */
    sendCommand(sessionId: any, command: any, ...args: any[]): Promise<any>;
    /**
     * Get active debug sessions
     */
    getActiveSessions(): Promise<any>;
};
export const ExtensionHostService: {
    service: any;
    ready: boolean;
    /**
     * Health check for the service
     */
    healthCheck(): Promise<any>;
    /**
     * Invoke a method on the service
     */
    invoke(method: any, ...args: any[]): Promise<any>;
    /**
     * Register event listener
     */
    on(event: any, handler: any): void;
    /**
     * Register one-time event listener
     */
    once(event: any, handler: any): void;
    /**
     * Remove event listener
     */
    removeListener(event: any, handler: any): void;
    /**
     * Remove all event listeners
     */
    removeAllListeners(event: any): void;
} & {
    /**
     * Start extension host
     */
    start(extensionId: any): Promise<any>;
    /**
     * Stop extension host
     */
    stop(extensionId: any): Promise<any>;
    /**
     * Restart extension host
     */
    restart(extensionId: any): Promise<any>;
    /**
     * Call extension API
     */
    callExtensionAPI(extensionId: any, method: any, ...args: any[]): Promise<any>;
    /**
     * Get extension host status
     */
    getStatus(): Promise<any>;
};
export const SearchService: {
    service: any;
    ready: boolean;
    /**
     * Health check for the service
     */
    healthCheck(): Promise<any>;
    /**
     * Invoke a method on the service
     */
    invoke(method: any, ...args: any[]): Promise<any>;
    /**
     * Register event listener
     */
    on(event: any, handler: any): void;
    /**
     * Register one-time event listener
     */
    once(event: any, handler: any): void;
    /**
     * Remove event listener
     */
    removeListener(event: any, handler: any): void;
    /**
     * Remove all event listeners
     */
    removeAllListeners(event: any): void;
} & {
    /**
     * Perform search
     */
    search(query: any, options: any): Promise<any>;
    /**
     * Get search index status
     */
    getIndexStatus(): Promise<any>;
    /**
     * Clear search index
     */
    clearIndex(): Promise<any>;
};
export const StorageService: {
    service: any;
    ready: boolean;
    /**
     * Health check for the service
     */
    healthCheck(): Promise<any>;
    /**
     * Invoke a method on the service
     */
    invoke(method: any, ...args: any[]): Promise<any>;
    /**
     * Register event listener
     */
    on(event: any, handler: any): void;
    /**
     * Register one-time event listener
     */
    once(event: any, handler: any): void;
    /**
     * Remove event listener
     */
    removeListener(event: any, handler: any): void;
    /**
     * Remove all event listeners
     */
    removeAllListeners(event: any): void;
} & {
    /**
     * Get item from storage
     */
    getItem(key: any): Promise<any>;
    /**
     * Set item in storage
     */
    setItem(key: any, value: any): Promise<any>;
    /**
     * Remove item from storage
     */
    removeItem(key: any): Promise<any>;
    /**
     * Get all items in storage
     */
    getAllItems(): Promise<any>;
    /**
     * Clear all storage
     */
    clear(): Promise<any>;
};
export const UpdateService: {
    service: any;
    ready: boolean;
    /**
     * Health check for the service
     */
    healthCheck(): Promise<any>;
    /**
     * Invoke a method on the service
     */
    invoke(method: any, ...args: any[]): Promise<any>;
    /**
     * Register event listener
     */
    on(event: any, handler: any): void;
    /**
     * Register one-time event listener
     */
    once(event: any, handler: any): void;
    /**
     * Remove event listener
     */
    removeListener(event: any, handler: any): void;
    /**
     * Remove all event listeners
     */
    removeAllListeners(event: any): void;
} & {
    /**
     * Check for updates
     */
    checkForUpdates(): Promise<any>;
    /**
     * Download update
     */
    downloadUpdate(): Promise<any>;
    /**
     * Install update
     */
    installUpdate(): Promise<any>;
    /**
     * Get update status
     */
    getStatus(): Promise<any>;
};
declare namespace SharedProcessProxy_default {
    export { installSharedProcessProxy as install };
    export { getSharedProcessManager as getManager };
    export { ExtensionHostService };
    export { SearchService };
    export { DebugService };
    export { StorageService };
    export { UpdateService };
    export { SharedProcessManager };
}
export function getSharedProcessManager(): any;
export function installSharedProcessProxy(): Promise<void>;
declare class SharedProcessManager {
    services: Map<any, any>;
    healthCheckInterval: null;
    /**
     * Register a service proxy
     */
    registerService(proxy: any): void;
    /**
     * Get service proxy
     */
    getService(service: any): any;
    /**
     * Get all services
     */
    getAllServices(): Map<any, any>;
    /**
     * Start health checks
     */
    startHealthChecks(intervalMs?: number): void;
    /**
     * Stop health checks
     */
    stopHealthChecks(): void;
    /**
     * Initialize all services
     */
    initialize(): Promise<void>;
    /**
     * Shutdown all services
     */
    shutdown(): Promise<void>;
}
export { SharedProcessProxy_default as default };
//# sourceMappingURL=SharedProcessProxy.d.ts.map