declare class IPCRendererImpl {
    listeners: Map<any, any>;
    replyHandlers: Map<any, any>;
    replyCounter: number;
    onceListeners: Map<any, any>;
    /**
     * Emit a vscode:message event to registered listeners (loopback)
     */
    emitMessage(Data: any): void;
    /**
     * Handle the VS Code binary IPC protocol (loopback responder).
     * Parses incoming binary requests and sends back stub responses.
     *
     * Three response paths:
     * 1. Routable channel (`localFilesystem`, `storage`, `configuration`):
     *    invoke Tauri asynchronously, emit PromiseSuccess/PromiseError
     *    from the callback with the real result.
     * 2. Sync stub with data: emit PromiseSuccess with the stub value.
     * 3. Sync stub with `__IPC_ERROR__<msg>` sentinel: emit PromiseError.
     */
    handleBinaryIPC(Buffer2: any): void;
    /**
     * Get a stub response for a channel method call.
     * These stubs allow the workbench to initialize without a real main process.
     */
    getStubResponse(Channel: any, Method: any, _Args: any): "" | {
        keyboardLayoutInfo?: never;
        keyboardMapping?: never;
    } | {
        keyboardLayoutInfo: {
            model: string;
            layout: string;
            variant: string;
            options: string;
            rules: string;
        };
        keyboardMapping: {};
    } | undefined;
    /**
     * Send message to main process
     */
    send(channel: any, ...args: any[]): void;
    /**
     * Synchronous send - polyfilled as async with warning
     */
    sendSync(_channel: any, ..._args: any[]): undefined;
    /**
     * Invoke main process and get response
     */
    invoke(channel: any, ...args: any[]): Promise<any>;
    /**
     * Register event listener
     */
    on(channel: any, listener: any): this;
    /**
     * Register one-time event listener
     */
    once(channel: any, listener: any): this;
    /**
     * Remove specific listener
     */
    removeListener(channel: any, listener: any): this;
    /**
     * Remove all listeners for a channel
     */
    removeAllListeners(channel: any): this;
    /**
     * Client-side request-reply pattern (sendTo + onReply)
     */
    sendTo(channel: any, args: any, callback: any): void;
    /**
     * Register reply handler for sendTo pattern
     */
    onReply(channel: any, handler: any): void;
    /**
     * Helper method to register listener with Tauri
     */
    registerTauriListener(_channel: any, _listener: any): void;
    /**
     * Cleanup method to remove all listeners
     */
    cleanup(): void;
}
declare namespace IPCRendererShim_default {
    export { installIPCRendererShim as install };
    export { getIPCRenderer as get };
}
export function getIPCRenderer(): any;
export function installIPCRendererShim(): void;
export { IPCRendererImpl as IPCRendererClass, IPCRendererShim_default as default };
//# sourceMappingURL=IPCRendererShim.d.ts.map