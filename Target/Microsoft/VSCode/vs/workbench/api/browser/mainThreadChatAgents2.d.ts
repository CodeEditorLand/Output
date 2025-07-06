declare class ee {
    constructor(e: any);
    get onDidAddProgress(): any;
    content: any;
    kind: string;
    deferred: N;
    a: E;
    progress: any[];
    task(): Promise<any>;
    isSettled(): boolean;
    complete(e: any): void;
    add(e: any): void;
    toJSON(): {
        kind: string;
        content: any;
        progress: any[];
    };
}
declare let P: {
    new (e: any, i: any, t: any, r: any, s: any, a: any, o: any, l: any, n: any, d: any): {
        s: any;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        C: any;
        D: any;
        F: any;
        a: any;
        b: any;
        f: any;
        g: any;
        h: any;
        j: Map<any, any>;
        n: Map<any, any>;
        r: Map<any, any>;
        m: any;
        $unregisterAgent(e: any): void;
        $transferActiveChatSession(e: any): void;
        $registerAgent(e: any, i: any, t: any, r: any, s: any): Promise<void>;
        $updateAgent(e: any, i: any): Promise<void>;
        $handleProgressChunk(e: any, i: any): Promise<void>;
        $handleAnchorResolve(e: any, i: any, t: any): void;
        $registerAgentCompletionsProvider(e: any, i: any, t: any): void;
        $unregisterAgentCompletionsProvider(e: any, i: any): void;
        $registerChatParticipantDetectionProvider(e: any): void;
        $unregisterChatParticipantDetectionProvider(e: any): void;
        $registerRelatedFilesProvider(e: any, i: any): void;
        $unregisterRelatedFilesProvider(e: any): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $$h as N } from "../../../base/common/async.js";
import { $ef as E } from "../../../base/common/event.js";
export { ee as $cXb, P as $dXb };
//# sourceMappingURL=mainThreadChatAgents2.d.ts.map