declare namespace NativeModulePolyfill_default {
    export { installNativeModulePolyfill as install };
    export { createElectronModule };
    export { createWebFrame };
    export { createApp };
    export { createScreen };
    export { createShell };
    export { createDialog };
    export { createClipboard };
    export { createNativeTheme };
    export { createBrowserWindow };
}
export function installNativeModulePolyfill(): void;
declare function createElectronModule(): {
    ipcRenderer: any;
    webFrame: any;
    app: any;
    screen: any;
    shell: any;
    dialog: any;
    clipboard: any;
    nativeTheme: any;
    BrowserWindow: {
        id: number;
        isFocused(): boolean;
        focus(): void;
        show(): void;
        hide(): void;
        close(): void;
        isMaximizable(): boolean;
        isMinimizable(): boolean;
        getBounds(): {
            x: number;
            y: number;
            width: number;
            height: number;
        };
    };
};
declare function createWebFrame(): {
    setZoomLevel(level: any): void;
    setZoomFactor(factor: any): void;
    getZoomFactor(): number;
    getZoomLevel(): number;
    insertCSS(css: any): void;
    insertText(text: any): void;
};
declare function createApp(): {
    getName(): string;
    getVersion(): string;
    getLocale(): string;
    isReady(): boolean;
    whenReady(): Promise<void>;
};
declare function createScreen(): {
    getDisplayNearestPoint(point: any): {
        id: number;
        bounds: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
    };
    getPrimaryDisplay(): {
        id: number;
        bounds: {
            x: any;
            y: any;
            width: number;
            height: number;
        };
    };
    getAllDisplays(): {
        id: number;
        bounds: {
            x: any;
            y: any;
            width: number;
            height: number;
        };
    }[];
};
declare function createShell(): {
    openExternal(url: any): Promise<void>;
    openPath(path: any): Promise<never>;
    showItemInFolder(path: any): Promise<never>;
    trashItem(path: any): Promise<void>;
    beep(): void;
};
declare function createDialog(): {
    showOpenDialog(options: any): Promise<{
        filePaths: any[];
        canceled: boolean;
    }>;
    showSaveDialog(options: any): Promise<{
        filePath: any;
        canceled: boolean;
    }>;
    showMessage(message: any): void;
    showError(message: any): void;
};
declare function createClipboard(): {
    writeText(text: any): Promise<void>;
    readText(): Promise<any>;
    writeBuffer(format: any, buffer: any): Promise<never>;
    readBuffer(format: any): Promise<undefined>;
    clear(): void;
};
declare function createNativeTheme(): {
    readonly shouldUseDarkColors: boolean;
    readonly shouldUseInvertedColorScheme: boolean;
    readonly theme: any;
};
declare function createBrowserWindow(): {
    id: number;
    isFocused(): boolean;
    focus(): void;
    show(): void;
    hide(): void;
    close(): void;
    isMaximizable(): boolean;
    isMinimizable(): boolean;
    getBounds(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
};
export { NativeModulePolyfill_default as default };
//# sourceMappingURL=NativeModulePolyfill.d.ts.map