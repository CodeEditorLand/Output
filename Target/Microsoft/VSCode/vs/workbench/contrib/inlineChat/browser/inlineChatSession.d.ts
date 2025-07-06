declare class p {
    constructor(e: any, s: any);
    g: any;
    d: A;
    onDidChange: any;
    f: any;
    dispose(): void;
    fixup(e: any): void;
    get trackedInitialRange(): any;
    get value(): any;
}
declare class Y {
    constructor(e: any, s: any, n: any, r: any, t: any, i: any, o: any, h: any, c: any);
    headless: any;
    targetUri: any;
    textModel0: any;
    textModelN: any;
    agent: any;
    wholeRange: any;
    hunkData: any;
    chatModel: any;
    c: boolean;
    d: Date;
    g: Map<any, any>;
    f: {
        extension: any;
        startTime: string;
        endTime: string;
        edits: number;
        finishedByEdit: boolean;
        rounds: string;
        undos: string;
        unstashed: number;
        acceptedHunks: number;
        discardedHunks: number;
        responseTypes: string;
    };
    get isUnstashed(): boolean;
    markUnstashed(): void;
    markModelVersion(e: any): void;
    get versionsByRequest(): [any, any][];
    undoChangesUntil(e: any): Promise<boolean>;
    get hasChangedText(): boolean;
    asChangedText(e: any): any;
    recordExternalEditOccurred(e: any): void;
    asTelemetryData(): {
        extension: any;
        startTime: string;
        endTime: string;
        edits: number;
        finishedByEdit: boolean;
        rounds: string;
        undos: string;
        unstashed: number;
        acceptedHunks: number;
        discardedHunks: number;
        responseTypes: string;
    };
}
declare let x: {
    new (e: any, s: any, n: any, r: any, t: any, i: any): {
        g: any;
        h: any;
        j: any;
        d: any;
        f: any;
        c: any;
        dispose(): void;
        unstash(): any;
    };
};
declare let E: {
    new (e: any, s: any, n: any): {
        j: any;
        k: any;
        l: any;
        f: S;
        g: Map<any, any>;
        h: boolean;
        dispose(): void;
        ignoreTextModelNChanges: boolean;
        m(e: any): void;
        recompute(e: any, s: any): Promise<void>;
        readonly size: number;
        readonly pending: any;
        n(e: any): {
            range: any;
            text: any;
        }[];
        discardAll(): any[];
        getInfo(): {
            getState: () => any;
            isInsertion: () => any;
            getRangesN: () => any;
            getRanges0: () => any;
            discardChanges: () => void;
            acceptChanges: () => void;
        }[];
    };
    c: k | undefined;
    d: number | undefined;
};
declare var R: any;
import { $ef as A } from "../../../../base/common/event.js";
import { $ud as S } from "../../../../base/common/lifecycle.js";
import { $oI as k } from "../../../../editor/common/model/textModel.js";
export { p as $jDb, Y as $kDb, x as $lDb, E as $mDb, R as HunkState };
//# sourceMappingURL=inlineChatSession.d.ts.map