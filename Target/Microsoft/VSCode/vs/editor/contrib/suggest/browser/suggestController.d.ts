declare let $: {
    new (e: any, o: any, r: any, a: any, c: any, s: any, g: any): {
        j: any;
        k: any;
        l: any;
        m: any;
        n: any;
        o: any;
        b: ne;
        d: se;
        g: Me;
        h: oe;
        onWillInsertSuggestItem: any;
        editor: any;
        model: any;
        widget: any;
        f: any;
        a: any;
        dispose(): void;
        p(e: any, o: any): void;
        q(e: any, o: any, r: any, a: any, c: any, s: any, g: any): void;
        getOverwriteInfo(e: any, o: any): {
            overwriteBefore: number;
            overwriteAfter: any;
        };
        r(e: any): void;
        triggerSuggest(e: any, o: any, r: any): void;
        triggerSuggestAndAcceptBest(e: any): void;
        acceptSelectedSuggestion(e: any, o: any): void;
        acceptNextSuggestion(): void;
        acceptPrevSuggestion(): void;
        cancelSuggestWidget(): void;
        focusSuggestion(): void;
        selectNextSuggestion(): void;
        selectNextPageSuggestion(): void;
        selectLastSuggestion(): void;
        selectPrevSuggestion(): void;
        selectPrevPageSuggestion(): void;
        selectFirstSuggestion(): void;
        toggleSuggestionDetails(): void;
        toggleExplainMode(): void;
        toggleSuggestionFocus(): void;
        resetWidgetSize(): void;
        forceRenderingAbove(): void;
        stopForceRenderingAbove(): void;
        registerSelector(e: any): {
            dispose: () => void;
        };
    };
    ID: string | undefined;
    get(e: any): any;
};
declare class F extends J {
    constructor();
    run(e: any, o: any, r: any): void;
}
import { $wd as ne } from "../../../../base/common/lifecycle.js";
import { $ud as se } from "../../../../base/common/lifecycle.js";
declare class Me {
    constructor(e: any);
    b: any;
    a: any[];
    register(e: any): {
        dispose: () => void;
    };
    get itemsOrderedByPriorityDesc(): any[];
}
import { $ef as oe } from "../../../../base/common/event.js";
import { $Eab as J } from "../../../browser/editorExtensions.js";
export { $ as $Klb, F as $Llb };
//# sourceMappingURL=suggestController.d.ts.map