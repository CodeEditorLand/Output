export var CustomTitleBarVisibility: any;
export namespace DEFAULT_AUX_WINDOW_SIZE {
    let width: number;
    let height: number;
}
export const DEFAULT_CUSTOM_TITLEBAR_HEIGHT: 35;
export namespace DEFAULT_EMPTY_WINDOW_SIZE {
    let width_1: number;
    export { width_1 as width };
    let height_1: number;
    export { height_1 as height };
}
export namespace DEFAULT_WORKSPACE_WINDOW_SIZE {
    let width_2: number;
    export { width_2 as width };
    let height_2: number;
    export { height_2 as height };
}
export var MenuSettings: any;
export var MenuStyleConfiguration: any;
export var TitleBarSetting: any;
export var TitlebarStyle: any;
export var WindowControlsStyle: any;
export namespace WindowMinimumSize {
    let WIDTH: number;
    let WIDTH_WITH_VERTICAL_PANEL: number;
    let HEIGHT: number;
}
export function getMenuBarVisibility(configurationService: any): any;
export function getTitleBarStyle(configurationService: any): any;
export function getWindowControlsStyle(configurationService: any): any;
export function hasCustomTitlebar(configurationService: any, titleBarStyle: any): boolean;
export function hasNativeContextMenu(configurationService: any, titleBarStyle: any): boolean;
export function hasNativeMenu(configurationService: any, titleBarStyle: any): boolean;
export function hasNativeTitlebar(configurationService: any, titleBarStyle: any): boolean;
export function isFileToOpen(uriToOpen: any): boolean;
export function isFolderToOpen(uriToOpen: any): boolean;
export function isOpenedAuxiliaryWindow(candidate: any): boolean;
export function isWorkspaceToOpen(uriToOpen: any): boolean;
export function useNativeFullScreen(configurationService: any): boolean;
export function useWindowControlsOverlay(configurationService: any): boolean;
export function zoomLevelToZoomFactor(zoomLevel?: number): number;
//# sourceMappingURL=window.d.ts.map