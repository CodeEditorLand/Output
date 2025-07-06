declare class S extends ce {
    b: Map<any, any>;
    condition: any;
    hitCondition: any;
    logMessage: any;
    mode: any;
    modeLabel: any;
    setSessionData(e: any, t: any): void;
    f: any;
    get message(): any;
    get verified(): any;
    get sessionsThatVerified(): any[];
    getIdFromAdapter(e: any): any;
    getDebugProtocolBreakpoint(e: any): {
        id: any;
        verified: any;
        message: any;
        source: any;
        line: any;
        column: any;
        endLine: any;
        endColumn: any;
        instructionReference: any;
        offset: any;
    } | undefined;
    toJSON(): {
        id: any;
        enabled: any;
        condition: any;
        hitCondition: any;
        logMessage: any;
        mode: any;
        modeLabel: any;
    };
}
declare class ce {
    constructor(e: any, t: any);
    enabled: any;
    a: any;
    getId(): any;
}
declare class Ne {
    constructor(e: any, t: any, i: any, s: any, n: any);
    evaluateLazy(): Promise<void>;
    getChildren(): any;
    getId(): string;
    get name(): any;
    get value(): any;
    get hasChildren(): boolean;
    b: any;
    f: any;
    treeId: any;
    treeItem: any;
    original: any;
    a: string;
    getSession(): any;
    edit(e: any): Promise<boolean>;
    errorMessage: any;
}
declare class m extends u {
    constructor(e: any, t?: string);
    name: any;
    t: g;
    onDidChangeValue: any;
    available: boolean;
    value: any;
    evaluate(e: any, t: any, i: any, s: any, n: any): Promise<void>;
    setExpression(e: any, t: any): Promise<void>;
}
declare class C extends u {
    constructor(e: any, t: any, i: any, s: any, n: any, a: any, r: any, h: any, d: any, l: any, k: any, b?: undefined, p?: undefined, z?: boolean, A?: number, U?: string, j?: undefined, H?: undefined);
    parent: any;
    name: any;
    evaluateName: any;
    variableMenuContext: any;
    available: boolean;
    declarationLocationReference: any;
    value: any;
    getThreadId(): any;
    setVariable(e: any, t: any): Promise<void>;
    errorMessage: any;
    setExpression(e: any, t: any): Promise<void>;
    toString(): any;
    toDebugProtocolObject(): {
        name: any;
        variablesReference: any;
        memoryReference: any;
        value: any;
        evaluateName: any;
    };
}
declare class F extends u {
    constructor(e: any, t: any, i: any, s: any, n: any, a: any, r: any, h: any);
    stackFrame: any;
    name: any;
    expensive: any;
    range: any;
    toString(): any;
    toDebugProtocolObject(): {
        name: any;
        variablesReference: any;
        expensive: any;
    };
}
declare class de extends F {
    constructor(e: any, t: any, i: any);
}
declare class ue {
    constructor(e: any, t: any, i: any, s: any, n: any, a: any, r: any, h: any, d: any);
    thread: any;
    frameId: any;
    source: any;
    name: any;
    presentationHint: any;
    range: any;
    b: any;
    canRestart: any;
    instructionPointerReference: any;
    getId(): string;
    getScopes(): any;
    a: any;
    getMostSpecificScopes(e: any): Promise<any>;
    restart(): any;
    forgetScopes(): void;
    toString(): any;
    openInEditor(e: any, t: any, i: any, s: any): Promise<any>;
    equals(e: any): boolean;
}
declare class Ve {
    constructor(e: any, t: any, i: any);
    session: any;
    name: any;
    threadId: any;
    f: any[];
    reachedEndOfCallStack: boolean;
    a: any[];
    b: any[];
    stopped: boolean;
    getId(): string;
    clearCallStack(): void;
    getCallStack(): any[];
    getStaleCallStack(): any[];
    getTopStackFrame(): any;
    get stateLabel(): any;
    fetchCallStack(e?: number): Promise<void>;
    g(e: any, t: any): Promise<any>;
    get exceptionInfo(): any;
    next(e: any): any;
    stepIn(e: any): any;
    stepOut(e: any): any;
    stepBack(e: any): any;
    continue(): any;
    pause(): any;
    terminate(): any;
    reverseContinue(): any;
}
declare function Te(o: any, e: any, t: any, i?: string): {
    _formatted: string | null;
    _fsPath: any;
    readonly fsPath: any;
    toString(e?: boolean): string;
    toJSON(): {
        $mid: number;
    };
    scheme: any;
    authority: any;
    path: any;
    query: any;
    fragment: any;
    with(e: any): /*elided*/ any;
};
declare class Pe extends M {
    constructor(e: any, t: any);
    b: any;
    f: any;
    a: any;
    onDidInvalidate: any;
    writable: boolean;
    read(e: any, t: any): Promise<{
        type: number;
        offset: any;
        length: number;
        error: string;
    }[] | ({
        type: number;
        offset: any;
        length: number;
        data: R;
    } | {
        type: number;
        offset: any;
        length: any;
        data?: never;
    })[]>;
    write(e: any, t: any): Promise<any>;
    g(e: any, t: any): void;
}
declare class u {
    constructor(e: any, t: any, i: any, s: any, n?: number, a?: number, r?: undefined, h?: number, d?: undefined, l?: undefined);
    g: any;
    h: any;
    j: any;
    k: any;
    namedVariables: number;
    indexedVariables: number;
    memoryReference: any;
    l: number;
    presentationHint: any;
    valueLocationReference: any;
    valueChanged: boolean;
    b: string;
    set reference(e: any);
    get reference(): any;
    evaluateLazy(): Promise<void>;
    m(e: any): void;
    getChildren(): Promise<any>;
    f: Promise<any> | undefined;
    n(): Promise<any>;
    getId(): any;
    getSession(): any;
    set value(e: string);
    get value(): string;
    get hasChildren(): boolean;
    o(e: any, t: any, i: any): Promise<any>;
    get q(): boolean;
    toString(): string;
    evaluateExpression(e: any, t: any, i: any, s: any, n: boolean | undefined, a: any): Promise<boolean>;
    type: any;
}
declare class I extends S {
    constructor(e: any, t: any, i: any, s: any, n?: string);
    m: any;
    n: any;
    o: any;
    h: any;
    k: any;
    l: any;
    j: any;
    triggeredBy: any;
    toDAP(): {
        line: any;
        column: any;
        condition: any;
        hitCondition: any;
        logMessage: any;
        mode: any;
    };
    get originalUri(): any;
    get lineNumber(): any;
    get pending(): boolean;
    get uri(): any;
    get column(): any;
    get adapterData(): any;
    get endLineNumber(): any;
    get endColumn(): any;
    get sessionAgnosticData(): {
        lineNumber: any;
        column: any;
    };
    get supported(): boolean;
    toJSON(): {
        uri: any;
        lineNumber: any;
        column: any;
        adapterData: any;
        triggeredBy: any;
        id: any;
        enabled: any;
        condition: any;
        hitCondition: any;
        logMessage: any;
        mode: any;
        modeLabel: any;
    };
    setSessionDidTrigger(e: any, t?: boolean): void;
    getSessionDidTrigger(e: any): boolean;
    update(e: any): void;
}
declare class $ extends S {
    constructor(e: any, t?: string);
    name: any;
    toDAP(): {
        name: any;
        condition: any;
        hitCondition: any;
    };
    toJSON(): {
        name: any;
        id: any;
        enabled: any;
        condition: any;
        hitCondition: any;
        logMessage: any;
        mode: any;
        modeLabel: any;
    };
    get supported(): any;
    toString(): any;
}
declare class x extends S {
    constructor(e: any, t?: string);
    g: WeakMap<WeakKey, any>;
    description: any;
    src: any;
    canPersist: any;
    accessTypes: any;
    accessType: any;
    toDAP(e: any): Promise<{
        dataId: any;
        accessType: any;
        condition: any;
        hitCondition: any;
    } | undefined>;
    toJSON(): {
        description: any;
        src: any;
        accessTypes: any;
        accessType: any;
        canPersist: any;
        id: any;
        enabled: any;
        condition: any;
        hitCondition: any;
        logMessage: any;
        mode: any;
        modeLabel: any;
    };
    get supported(): any;
    toString(): any;
}
declare class V extends S {
    constructor(e: any, t?: string);
    g: Set<any>;
    h: any;
    filter: any;
    label: any;
    supportsCondition: any;
    description: any;
    conditionDescription: any;
    toJSON(): {
        filter: any;
        label: any;
        enabled: any;
        supportsCondition: any;
        conditionDescription: any;
        condition: any;
        fallback: any;
        description: any;
        id: any;
        hitCondition: any;
        logMessage: any;
        mode: any;
        modeLabel: any;
    };
    setSupportedSession(e: any, t: any): void;
    setFallback(e: any): void;
    get supported(): boolean;
    isSupportedSession(e: any): any;
    matches(e: any): boolean;
    toString(): any;
}
declare class w extends S {
    constructor(e: any, t?: string);
    instructionReference: any;
    offset: any;
    canPersist: any;
    address: any;
    toDAP(): {
        instructionReference: any;
        condition: any;
        hitCondition: any;
        mode: any;
        offset: any;
    };
    toJSON(): {
        instructionReference: any;
        offset: any;
        canPersist: any;
        address: any;
        id: any;
        enabled: any;
        condition: any;
        hitCondition: any;
        logMessage: any;
        mode: any;
        modeLabel: any;
    };
    get supported(): any;
    toString(): any;
}
declare class Me {
    constructor(e: any, t: any);
    sessionId: any;
    threadId: any;
    getId(): string;
}
declare let T: {
    new (e: any, t: any, i: any, s: any): {
        D: any;
        F: any;
        G: any;
        b: Map<any, any>;
        f: boolean;
        g: any;
        h: any;
        j: any;
        m: any;
        n: Map<any, any>;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        C: any[];
        a: any[];
        getId(): string;
        getSession(e: any, t?: boolean): any;
        getSessions(e?: boolean): any[];
        addSession(e: any): void;
        readonly onDidChangeBreakpoints: any;
        readonly onDidChangeCallStack: any;
        readonly onDidChangeWatchExpressions: any;
        readonly onDidChangeWatchExpressionValue: any;
        rawUpdate(e: any): void;
        clearThreads(e: any, t: any, i?: undefined): void;
        fetchCallstack(e: any, t: any): Promise<void>;
        refreshTopOfCallstack(e: any, t?: boolean): {
            wholeCallStack: any;
            topCallStack: any;
        };
        getBreakpoints(e: any): any;
        getFunctionBreakpoints(): any;
        getDataBreakpoints(): any;
        getExceptionBreakpoints(): any;
        getExceptionBreakpointsForSession(e: any): any;
        getInstructionBreakpoints(): any[];
        setExceptionBreakpointsForSession(e: any, t: any): void;
        removeExceptionBreakpointsForSession(e: any): void;
        setExceptionBreakpointFallbackSession(e: any): void;
        setExceptionBreakpointCondition(e: any, t: any): void;
        areBreakpointsActivated(): boolean;
        setBreakpointsActivated(e: any): void;
        addBreakpoints(e: any, t: any, i?: boolean): any;
        removeBreakpoints(e: any): void;
        updateBreakpoints(e: any): void;
        setBreakpointSessionData(e: any, t: any, i: any): void;
        getDebugProtocolBreakpoint(e: any, t: any): any;
        getBreakpointModes(e: any): any[];
        registerBreakpointModes(e: any, t: any): void;
        H(): void;
        setEnablement(e: any, t: any): void;
        enableOrDisableAllBreakpoints(e: any): void;
        addFunctionBreakpoint(e: any, t: any): $;
        updateFunctionBreakpoint(e: any, t: any): void;
        removeFunctionBreakpoints(e: any): void;
        addDataBreakpoint(e: any, t: any): void;
        updateDataBreakpoint(e: any, t: any): void;
        removeDataBreakpoints(e: any): void;
        addInstructionBreakpoint(e: any): void;
        removeInstructionBreakpoints(e: any, t: any): void;
        getWatchExpressions(): any;
        addWatchExpression(e: any): m;
        renameWatchExpression(e: any, t: any): void;
        removeWatchExpressions(e?: null): void;
        moveWatchExpression(e: any, t: any): void;
        sourceIsNotAvailable(e: any): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ef as g } from "../../../../base/common/event.js";
import { $vd as M } from "../../../../base/common/lifecycle.js";
import { $Ki as R } from "../../../../base/common/buffer.js";
export { S as $$T, ce as $0T, Ne as $1T, m as $2T, C as $3T, F as $4T, de as $5T, ue as $6T, Ve as $7T, Te as $8T, Pe as $9T, u as $ZT, I as $_T, $ as $aU, x as $bU, V as $cU, w as $dU, Me as $eU, T as $fU };
//# sourceMappingURL=debugModel.d.ts.map