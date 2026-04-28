declare namespace ChildProcessPolyfill_default {
    export { installChildProcessPolyfill as install };
    export { childProcess as module };
    export { spawn };
    export { exec };
    export { execPromise };
    export { fork };
    export { ChildProcess };
}
export function installChildProcessPolyfill(): void;
declare namespace childProcess {
    export { spawn };
    export { exec };
    export let execSync: any;
    export { fork };
    export { exec as execFile };
}
declare function spawn(command: any, args: any, options: any): ChildProcess;
declare function exec(command: any, options: any, callback: any): ChildProcess;
declare function execPromise(command: any, options: any): Promise<any>;
declare function fork(modulePath: any, args: any, options: any): ChildProcess;
declare class ChildProcess {
    constructor(spawnId: any);
    pid: number;
    killed: boolean;
    exitCode: null;
    signalCode: null;
    stdin: {
        write(data: any): boolean;
        end(data: any): void;
        on(event: any, listener: any): void;
        removeAllListeners(event: any): void;
        emit(event: any, ...args: any[]): void;
    };
    stdout: {
        write(data: any): boolean;
        end(data: any): void;
        on(event: any, listener: any): void;
        removeAllListeners(event: any): void;
        emit(event: any, ...args: any[]): void;
    };
    stderr: {
        write(data: any): boolean;
        end(data: any): void;
        on(event: any, listener: any): void;
        removeAllListeners(event: any): void;
        emit(event: any, ...args: any[]): void;
    };
    stdio: {
        write(data: any): boolean;
        end(data: any): void;
        on(event: any, listener: any): void;
        removeAllListeners(event: any): void;
        emit(event: any, ...args: any[]): void;
    }[];
    listeners: Map<any, any>;
    _sPid: any;
    /**
     * Set up Tauri event listeners for this process
     */
    setupEventListeners(): void;
    _unlistenFunctions: any[];
    /**
     * Add event listener
     */
    on(event: any, listener: any): this;
    /**
     * Add one-time event listener
     */
    once(event: any, listener: any): this;
    /**
     * Remove event listener
     */
    removeListener(event: any, listener: any): this;
    /**
     * Remove all listeners for an event
     */
    removeAllListeners(event: any): this;
    /**
     * Emit event to all listeners
     */
    emit(event: any, ...args: any[]): boolean;
    /**
     * Kill the process
     */
    kill(signal?: string): boolean;
    /**
     * Send a message to the process (IPC)
     */
    send(message: any, sendHandle: any, options: any): boolean;
    /**
     * Disconnect from the process
     */
    disconnect(): void;
    /**
     * Ref the process (keep it alive)
     */
    ref(): this;
    /**
     * Unref the process (allow it to exit)
     */
    unref(): this;
    /**
     * Cleanup resources
     */
    cleanup(): void;
}
export { ChildProcessPolyfill_default as default };
//# sourceMappingURL=ChildProcessPolyfill.d.ts.map