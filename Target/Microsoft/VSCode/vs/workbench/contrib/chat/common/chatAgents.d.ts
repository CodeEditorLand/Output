declare const ot: any;
declare let A: {
    new (t: any): {
        t: any;
        b: Map<any, any>;
        f: R;
        onDidChangeAgents: any;
        g: Set<any>;
        r: boolean;
        s: Map<any, any>;
        y: Map<any, any>;
        h: any;
        j: any;
        m: any;
        n: any;
        registerAgent(t: any, e: any): any;
        u(): void;
        w(): void;
        registerAgentImplementation(t: any, e: any): any;
        registerDynamicAgent(t: any, e: any): any;
        registerAgentCompletionProvider(t: any, e: any): {
            dispose: () => void;
        };
        getAgentCompletionItems(t: any, e: any, i: any): Promise<any>;
        updateAgent(t: any, e: any): void;
        getDefaultAgent(t: any, e?: any): any;
        readonly hasToolsAgent: boolean;
        getContributedDefaultAgent(t: any): any;
        z(t: any): any;
        getAgent(t: any, e?: boolean): any;
        C(t: any): any;
        getAgentByFullyQualifiedId(t: any): any;
        getAgents(): any[];
        getActivatedAgents(): p[];
        getAgentsByName(t: any): any;
        D(t: any): any;
        agentHasDupeName(t: any): boolean;
        invokeAgent(t: any, e: any, i: any, s: any, n: any): Promise<any>;
        setRequestPaused(t: any, e: any, i: any): void;
        getFollowups(t: any, e: any, i: any, s: any, n: any): Promise<any>;
        getChatTitle(t: any, e: any, i: any): Promise<any>;
        getChatSummary(t: any, e: any, i: any): Promise<any>;
        registerChatParticipantDetectionProvider(t: any, e: any): any;
        hasChatParticipantDetectionProviders(): boolean;
        detectAgentOrCommand(t: any, e: any, i: any, s: any): Promise<{
            agent: any;
            command?: never;
        } | {
            agent: any;
            command: any;
        } | undefined>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    AGENT_LEADER: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class p {
    constructor(t: any, e: any);
    b: any;
    d: any;
    get id(): any;
    get name(): any;
    get fullName(): any;
    get description(): any;
    get extensionId(): any;
    get extensionPublisherId(): any;
    get extensionPublisherDisplayName(): any;
    get extensionDisplayName(): any;
    get isDefault(): any;
    get isCore(): any;
    get metadata(): any;
    get slashCommands(): any;
    get locations(): any;
    get modes(): any;
    get disambiguation(): any;
    invoke(t: any, e: any, i: any, s: any): Promise<any>;
    setRequestPaused(t: any, e: any): void;
    provideFollowups(t: any, e: any, i: any, s: any): Promise<any>;
    toJSON(): any;
}
declare const ht: any;
declare let x: {
    new (t: any, e: any, i: any, s: any): {
        h: any;
        i: any;
        j: any;
        f: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        g: boolean;
        d: any;
        k(): void;
        l(): Promise<void>;
        getAgentNameRestriction(t: any): any;
        m(t: any, e: any): any;
        dispose(): void;
    };
    b: string | undefined;
};
declare function M(r: any): string;
declare function lt(r: any): any;
import { $ef as R } from "../../../../base/common/event.js";
export { ot as $sT, A as $tT, p as $uT, ht as $vT, x as $wT, M as $xT, lt as $yT };
//# sourceMappingURL=chatAgents.d.ts.map