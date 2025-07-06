declare const v: p;
declare const E: p;
declare namespace e {
    let showTabs: string;
    let highlightModifiedTabs: boolean;
    let tabActionLocation: string;
    let tabActionCloseVisibility: boolean;
    let tabActionUnpinVisibility: boolean;
    let alwaysShowEditorActions: boolean;
    let tabSizing: string;
    let tabSizingFixedMinWidth: number;
    let tabSizingFixedMaxWidth: number;
    let pinnedTabSizing: string;
    let pinnedTabsOnSeparateRow: boolean;
    let tabHeight: string;
    let preventPinnedEditorClose: string;
    let titleScrollbarSizing: string;
    let focusRecentEditorAfterClose: boolean;
    let showIcons: boolean;
    let hasIcons: boolean;
    let enablePreview: boolean;
    let openPositioning: string;
    let openSideBySideDirection: string;
    let closeEmptyGroups: boolean;
    let labelFormat: string;
    let splitSizing: string;
    let splitOnDragAndDrop: boolean;
    let dragToOpenWindow: boolean;
    let centeredLayoutFixedWidth: boolean;
    let doubleClickTabToToggleEditorGroupSizes: string;
    let editorActionsLocation: string;
    let wrapTabs: boolean;
    let enablePreviewFromQuickOpen: boolean;
    let scrollToSwitchTabs: boolean;
    let enablePreviewFromCodeNavigation: boolean;
    let closeOnFileDelete: boolean;
    let mouseBackForwardToNavigate: boolean;
    let restoreViewState: boolean;
    let splitInGroupLayout: string;
    let revealIfOpen: boolean;
    namespace limit {
        let enabled: boolean;
        let value: number;
        let perEditorGroup: boolean;
        let excludeDirty: boolean;
    }
    namespace decorations {
        let badges: boolean;
        let colors: boolean;
    }
    const autoLockGroups: Set<any>;
}
declare function F(t: any): any;
declare function I(t: any, l: any): any;
declare function O(t: any, l: any, n: any): any;
declare function z(t: any, l: any, n: any): {
    editor: any;
    options: {
        pinned: boolean;
        sticky: any;
        inactive: boolean;
        preserveFocus: any;
    };
}[];
import { $q6 as p } from "../../../../base/browser/dom.js";
export { v as $Jxb, E as $Kxb, e as $Lxb, F as $Mxb, I as $Nxb, O as $Oxb, z as $Pxb };
//# sourceMappingURL=editor.d.ts.map