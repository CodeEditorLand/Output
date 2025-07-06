declare class G {
    static executeCommands(t: any, s: any, e: any, n?: import("../textModelEditReason.js").$ME): any;
    static c(t: any, s: any, e: any): any;
    static d(t: any): boolean;
    static f(t: any, s: any): {
        operations: any[];
        hadTrackedEditOperation: boolean;
    };
    static g(t: any, s: any, e: any): {
        operations: any[];
        hadTrackedEditOperation: boolean;
    };
    static h(t: any): {};
}
declare class it extends j {
    constructor(t: any, s: any, e: any, n: any);
    c: any;
    f: any;
    g: any;
    h: any;
    context: P;
    n: I;
    t: boolean;
    u: boolean;
    w: k | null;
    y: any;
    z: any[];
    C: number;
    updateConfiguration(t: any): void;
    onLineMappingChanged(t: any): void;
    setHasFocus(t: any): void;
    D(): void;
    getPrimaryCursorState(): E;
    getLastAddedCursorIndex(): number;
    getCursorStates(): E[];
    setStates(t: any, s: any, e: any, n: any): boolean;
    setCursorColumnSelectData(t: any): void;
    revealAll(t: any, s: any, e: any, n: any, i: any, o: any): void;
    revealPrimary(t: any, s: any, e: any, n: any, i: any, o: any): void;
    saveState(): {
        inSelectionMode: boolean;
        selectionStart: {
            lineNumber: any;
            column: any;
        };
        position: {
            lineNumber: any;
            column: any;
        };
    }[];
    restoreState(t: any, s: any): void;
    onModelContentChanged(t: any, s: any): void;
    getSelection(): any;
    getTopMostViewPosition(): any;
    getBottomMostViewPosition(): any;
    getCursorColumnSelectData(): any;
    getSelections(): any[];
    getPosition(): any;
    setSelections(t: any, s: any, e: any, n: any): void;
    getPrevEditOperationType(): number;
    setPrevEditOperationType(t: any): void;
    F(t: any, s: any): void;
    G(t: any, s: any): void;
    H(t: any): void;
    I(t: any, s: any, e: any, n: any, i: any): boolean;
    J(t: any): any[][] | null;
    executeEdits(t: any, s: any, e: any, n: any, i: any): void;
    L(t: any, s: any, e: any, n?: number): void;
    getAutoClosedCharacters(): any[];
    startComposition(t: any): void;
    endComposition(t: any, s: any): void;
    type(t: any, s: any, e: any): void;
    compositionType(t: any, s: any, e: any, n: any, i: any, o: any): void;
    paste(t: any, s: any, e: any, n: any, i: any): void;
    cut(t: any, s: any): void;
    executeCommand(t: any, s: any, e: any): void;
    executeCommands(t: any, s: any, e: any): void;
}
import { $vd as j } from "../../../base/common/lifecycle.js";
import { $Odb as P } from "./cursorContext.js";
import { $Qdb as I } from "./cursorCollection.js";
declare class k {
    static d(t: any, s: any): q[] | null;
    static f(t: any, s: any): $;
    constructor(t: any, s: any);
    c: q[] | null;
    deduceOutcome(t: any, s: any): $[] | null;
}
import { $V_ as E } from "../cursorCommon.js";
declare class q {
    constructor(t: any, s: any, e: any, n: any);
    text: any;
    lineNumber: any;
    startSelectionOffset: any;
    endSelectionOffset: any;
}
import { $ybb as $ } from "./cursorTypeOperations.js";
export { G as $$db, it as $0db };
//# sourceMappingURL=cursor.d.ts.map