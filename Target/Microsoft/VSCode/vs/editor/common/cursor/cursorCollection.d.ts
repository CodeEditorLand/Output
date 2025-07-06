export { B as $Qdb };
declare class B {
    constructor(t: any);
    a: any;
    b: w[];
    d: number;
    dispose(): void;
    startTrackingSelections(): void;
    stopTrackingSelections(): void;
    updateContext(t: any): void;
    ensureValidState(): void;
    readSelectionFromMarkers(): L[];
    getAll(): C[];
    getViewPositions(): any[];
    getTopMostViewPosition(): any;
    getBottomMostViewPosition(): any;
    getSelections(): any[];
    getViewSelections(): any[];
    setSelections(t: any): void;
    getPrimaryCursor(): C;
    setStates(t: any): void;
    e(t: any): void;
    killSecondaryCursors(): void;
    f(): void;
    getLastAddedCursorIndex(): number;
    g(t: any): void;
    normalize(): void;
}
import { $Pdb as w } from "./oneCursor.js";
import { $UC as L } from "../core/selection.js";
import { $V_ as C } from "../cursorCommon.js";
//# sourceMappingURL=cursorCollection.d.ts.map