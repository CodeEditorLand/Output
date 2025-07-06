export { d as $Ddb };
declare let d: {
    new (t: any, e: any, i: any, s: any): {
        l: any;
        m: any;
        n: any;
        o: any;
        a: number;
        b: number;
        c: number;
        d: number;
        g: number;
        h: number;
        i: c;
        j: any;
        setIgnoreSelectionChangeTime(t: any): void;
        getIgnoreSelectionChangeTime(): number;
        resetSelectionChangeTime(): void;
        onConfigurationChanged(t: any): void;
        p(): void;
        f: any;
        q(): void;
        onCursorStateChanged(t: any): void;
        prepareRender(t: any): void;
        render(t: any): void;
        r(): void;
        s(t: any, e: any, i: any, s: any, o: any): void;
        setAriaOptions(t: any): void;
        writeScreenReaderContent(): void;
        k: {
            value: any;
            selection: any;
            selectionStart: any;
            selectionEnd: any;
            startPositionWithinEditor: import("../../../../common/core/position.js").$dC;
            newlineCountBeforeSelection: number;
        } | undefined;
        readonly screenReaderContentState: {
            value: any;
            selection: any;
            selectionStart: any;
            selectionEnd: any;
            startPositionWithinEditor: import("../../../../common/core/position.js").$dC;
            newlineCountBeforeSelection: number;
        } | undefined;
        t(): {
            value: any;
            selection: any;
            selectionStart: any;
            selectionEnd: any;
            startPositionWithinEditor: import("../../../../common/core/position.js").$dC;
            newlineCountBeforeSelection: number;
        };
        u(t: any, e: any): void;
    };
};
import { $UC as c } from "../../../../common/core/selection.js";
//# sourceMappingURL=screenReaderSupport.d.ts.map