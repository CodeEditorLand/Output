export class ProcessPolyfill {
    constructor(config: any);
    platform: any;
    arch: any;
    version: string;
    versions: {
        node: string;
        chrome: string | undefined;
        electron: string;
        v8: string;
        uv: string;
        zlib: string;
        brotli: string;
        ares: string;
        modules: string;
        nghttp2: string;
        napi: string;
        openssl: string;
    };
    pid: any;
    ppid: any;
    execPath: any;
    execArgv: any;
    env: any;
    title: string;
    listeners: Map<any, any>;
    _exitCode: null;
    _exited: boolean;
    /**
     * Set up additional process properties
     */
    setUpProcessProperties(): void;
    /**
     * High-resolution timer
     */
    hrtime: typeof hrtime;
    /**
     * Get current working directory
     */
    cwd(): any;
    /**
     * Get process memory info (Electron-specific)
     */
    getProcessMemoryInfo(): Promise<any>;
    /**
     * Get CPU usage
     */
    cpuUsage(previousValue: any): {
        user: number;
        system: number;
    };
    /**
     * Get shell environment variables
     */
    shellEnv(): Promise<any>;
    /**
     * Umask - not supported in browser
     */
    umask(mask: any): number;
    /**
     * Exit the process - not supported in browser
     */
    exit(code: any): void;
    /**
     * Kill a process
     */
    kill(pid: any, signal: any): boolean;
    /**
     * Next tick - schedules callback to run in next event loop iteration
     */
    nextTick(callback: any, ...args: any[]): void;
    /**
     * Set process title
     */
    setTitle(title: any): void;
    /**
     * Get process title
     */
    getTitle(): string;
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
    get exitCode(): null;
    get exited(): boolean;
    get connected(): boolean;
}
declare namespace ProcessPolyfill_default {
    export { installProcessPolyfill as install };
    export { installProcessPolyfillSync as installSync };
    export { getProcess as get };
    export { getProcessSync as getSync };
}
export function getProcess(): Promise<any>;
export function getProcessSync(): any;
export function installProcessPolyfill(): Promise<void>;
export function installProcessPolyfillSync(): void;
declare function hrtime(time: any): number[];
export { ProcessPolyfill_default as default };
//# sourceMappingURL=ProcessPolyfill.d.ts.map