declare const h: number;
declare const c: "workerTextModelSync";
declare class m extends f {
    static create(t: any, n: any): m;
    constructor(t: any, n: any, e?: boolean);
    c: any;
    f: any;
    a: any;
    b: any;
    ensureSyncedResources(t: any, n?: boolean): void;
    g(): void;
    h(t: any, n: any): void;
    j(t: any): void;
}
declare class A {
    a: any;
    bindToServer(t: any): void;
    getModel(t: any): any;
    getModels(): any[];
    $acceptNewModel(t: any): void;
    $acceptModelChanged(t: any, n: any): void;
    $acceptRemovedModel(t: any): void;
}
declare class $ extends L {
    get uri(): any;
    get eol(): any;
    getValue(): any;
    findMatches(t: any): any[];
    getLinesContent(): any;
    getLineCount(): any;
    getLineContent(t: any): any;
    getWordAtPosition(t: any, n: any): N | null;
    getWordUntilPosition(t: any, n: any): {
        word: any;
        startColumn: any;
        endColumn: any;
    };
    words(t: any): {
        [Symbol.iterator](): Generator<string, void, unknown>;
    };
    getLineWords(t: any, n: any): {
        word: any;
        startColumn: any;
        endColumn: any;
    }[];
    m(t: any, n: any): {
        start: any;
        end: any;
    }[];
    getValueInRange(t: any): any;
    offsetAt(t: any): number;
    positionAt(t: any): {
        lineNumber: any;
        column: number;
    };
    n(t: any): any;
    o(t: any): any;
}
import { $vd as f } from "../../../../base/common/lifecycle.js";
import { $J2 as L } from "../../model/mirrorTextModel.js";
import { $eC as N } from "../../core/range.js";
export { h as $qfb, c as $rfb, m as $sfb, A as $tfb, $ as $ufb };
//# sourceMappingURL=textModelSync.impl.d.ts.map