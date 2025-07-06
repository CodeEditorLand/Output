export { Q as $ofc };
declare let Q: {
    new (e: any, t: any, n: any, s: any, i: any, a: any, r: any, o: any, l: any, c: any, u: any, h: any): {
        readonly transferredSessionData: {
            sessionId: any;
            inputValue: any;
            location: any;
            mode: any;
        } | undefined;
        readonly y: any;
        readonly edits2Enabled: any;
        readonly z: boolean;
        C: any;
        D: any;
        F: any;
        G: any;
        H: any;
        I: any;
        J: any;
        L: any;
        M: any;
        N: any;
        O: any;
        P: any;
        c: any;
        f: any;
        h: Set<any>;
        m: any;
        onDidSubmitRequest: any;
        n: any;
        onDidPerformUserAction: any;
        s: any;
        onDidDisposeSession: any;
        t: any;
        u: any;
        g: any;
        j: {
            sessionId: any;
            inputValue: any;
            location: any;
            mode: any;
        } | undefined;
        w: any;
        isEnabled(e: any): boolean;
        Q(): void;
        R(e: any): void;
        notifyUserAction(e: any): void;
        setChatSessionTitle(e: any, t: any): Promise<void>;
        S(e: any, t: any): void;
        U(e: any, t: any): void;
        W(e: any): any;
        X(): any;
        getHistory(): Promise<any[]>;
        removeHistoryEntry(e: any): Promise<void>;
        clearAllHistoryEntries(): Promise<void>;
        startSession(e: any, t: any, n?: boolean): any;
        Y(e: any, t: any, n: any, s: any): any;
        Z(e: any, t: any): void;
        activateDefaultAgent(e: any): Promise<void>;
        getSession(e: any): any;
        getOrRestoreSession(e: any): Promise<any>;
        isPersistedSessionEmpty(e: any): any;
        loadSessionFromContent(e: any): any;
        resendRequest(e: any, t: any): Promise<void>;
        sendRequest(e: any, t: any, n: any): Promise<{
            agent: any;
            slashCommand: any;
            responseCreatedPromise: Promise<any>;
            responseCompletePromise: Promise<void>;
        } | undefined>;
        $(e: any, t: any, n: any, s: any): any;
        ab(e: any): any;
        bb(e: any, t: any, n: any, s: any, i: any, a: any, r: any, o: any): {
            responseCreatedPromise: Promise<any>;
            responseCompletePromise: Promise<void>;
        };
        cb(e: any): any;
        db(e: any): any;
        eb(e: any): Promise<void>;
        fb(e: any): any;
        gb(e: any, t: any, n: any, s: any): {
            request: {
                sessionId: any;
                requestId: any;
                agentId: any;
                message: any;
                command: any;
                variables: {
                    variables: any;
                };
                location: any;
                editedFileEvents: any;
            };
            response: any;
            result: any;
        }[];
        removeRequest(e: any, t: any): Promise<void>;
        adoptRequest(e: any, t: any): Promise<void>;
        addCompleteRequest(e: any, t: any, n: any, s: any, i: any): Promise<void>;
        cancelCurrentRequestForSession(e: any): void;
        clearSession(e: any): Promise<void>;
        hasSessions(): any;
        transferChatSession(e: any, t: any): void;
        getChatStorageFolder(): any;
        logChatIndex(): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=chatServiceImpl.d.ts.map