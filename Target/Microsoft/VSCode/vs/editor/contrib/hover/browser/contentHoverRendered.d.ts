export { I as $Knb };
declare let I: {
    new (e: any, t: any, o: any, r: any, n: any, s: any): {
        a: any;
        shouldAppearBeforeContent: any;
        showAtPosition: any;
        showAtSecondaryPosition: any;
        initialMousePosX: any;
        initialMousePosY: any;
        shouldFocus: any;
        source: any;
        readonly domNode: any;
        readonly domNodeHasChildren: any;
        readonly focusedHoverPartIndex: any;
        readonly hoverPartsCount: any;
        focusHoverPartWithIndex(e: any): void;
        getAccessibleWidgetContent(): any;
        getAccessibleWidgetContentAtIndex(e: any): any;
        updateHoverVerbosityLevel(e: any, t: any, o: any): Promise<void>;
        doesHoverAtIndexSupportVerbosityAction(e: any, t: any): any;
        isColorPickerVisible(): any;
        q: w;
        dispose(): void;
        B(t: any): any;
    };
    computeHoverPositions(e: any, t: any, o: any): {
        showAtPosition: any;
        showAtSecondaryPosition: any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as w } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=contentHoverRendered.d.ts.map