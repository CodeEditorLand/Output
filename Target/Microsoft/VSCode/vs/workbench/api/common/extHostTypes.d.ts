declare class No {
    constructor(e: any, s: any, r: any);
    document: any;
    selection: any;
    wholeRange: any;
}
declare let St: {
    new (e: any, s: any): {
        title: any;
        kind: any;
    };
};
declare class Zn {
    constructor(e: any, s?: any[]);
    tokenTypes: any;
    tokenModifiers: any[];
}
declare class yo {
    constructor(e: any, s: any, r: any, i: any);
    response: any;
    result: any;
    participant: any;
    command: any;
}
declare const Mr_base: {
    new (e: any, s: any, r: any, i: any, n: any): {
        name: any;
        kind: any;
        containerName: any;
        location: {
            uri: any;
            range: any;
            toJSON(): {
                uri: any;
                range: any;
            };
        } | undefined;
        toJSON(): {
            name: any;
            kind: any;
            location: {
                uri: any;
                range: any;
                toJSON(): {
                    uri: any;
                    range: any;
                };
            } | undefined;
            containerName: any;
        };
    };
    validate(e: any): void;
};
declare class Mr extends Mr_base {
    constructor(e: any, s: any, r: any, i: any, n: any, u: any, h: any, l: any);
    detail: any;
    range: any;
    selectionRange: any;
    children: any;
}
declare let ps: {
    new (e: any, s: any, r: any): {
        start: any;
        end: any;
        kind: any;
    };
};
declare class lo {
    constructor(e: any, s: any, r: any);
    value: any;
    iconPath: any;
    options: any;
}
declare let G: {
    new (e: any, s: any): {
        uri: any;
        range: any;
        toJSON(): {
            uri: any;
            range: any;
        };
    };
    isLocation(e: any): boolean;
};
declare class pn {
    constructor(e: any, s: any, r: any);
    session: any;
    threadId: any;
    frameId: any;
}
declare class xo {
    constructor(e: any, s: any);
    value: any;
    isEdit: any;
}
declare let xt: {
    new (e: any, s: any): {
        location: any;
        message: any;
    };
    is(e: any): any;
    isEqual(e: any, s: any): any;
};
declare class ln {
    constructor(e: any, s: any);
    session: any;
    threadId: any;
}
declare class $o {
    constructor(e: any, s: any, r: any);
    value: any;
    license: any;
    snippet: any;
}
declare let zt: {
    new (e: any, s: any, r?: any): {
        range: any;
        message: any;
        severity: any;
        toJSON(): {
            severity: any;
            message: any;
            range: any;
            source: any;
            code: any;
        };
    };
    isEqual(e: any, s: any): any;
};
declare let es: {
    new (e: any, s: any): {
        range: any;
        expression: any;
    };
};
declare class wo {
    constructor(e: any, s: any);
    uri: any;
    range: any;
}
declare let $t: {
    new (e: any, s: any): {
        contents: any[];
        range: any;
    };
};
declare let is: {
    new (e: any, s: any): {
        range: any;
        text: any;
    };
};
declare class go {
    constructor(e: any);
    extensions: any;
}
declare let Gt: {
    new (e: any, s: any, r: any, i: any): {
        canIncreaseVerbosity: any;
        canDecreaseVerbosity: any;
        contents: any[];
        range: any;
    };
};
declare let ns: {
    new (e: any, s: any, r?: boolean): {
        range: any;
        variableName: any;
        caseSensitiveLookup: boolean;
    };
};
declare class vo {
    constructor(e: any, s: any);
    uri: any;
    isDone: boolean | undefined;
    edits: any[];
}
declare let Ht: {
    new (e: any, s?: any): {
        range: any;
        kind: any;
        toJSON(): {
            range: any;
            kind: any;
        };
    };
};
declare let os: {
    new (e: any, s: any): {
        range: any;
        expression: any;
    };
};
declare class mo {
    constructor(e: any, s: any);
    uri: any;
    isDone: boolean | undefined;
    edits: any[];
}
declare let _t: {
    new (e: any, s: any): {
        uri: any;
        highlights: any;
        toJSON(): {
            uri: any;
            highlights: any;
        };
    };
};
declare let cs: {
    new (e: any, s: any): {
        frameId: any;
        stoppedLocation: any;
    };
};
declare class bo {
    constructor(e: any);
    toolName: any;
}
declare let gt: {
    new (e: any, s: any, r: any, i: any, n: any): {
        name: any;
        kind: any;
        containerName: any;
        location: {
            uri: any;
            range: any;
            toJSON(): {
                uri: any;
                range: any;
            };
        } | undefined;
        toJSON(): {
            name: any;
            kind: any;
            location: {
                uri: any;
                range: any;
                toJSON(): {
                    uri: any;
                    range: any;
                };
            } | undefined;
            containerName: any;
        };
    };
    validate(e: any): void;
};
declare class vn {
    constructor(e: any, s: any);
    newSymbolName: any;
    tags: any;
}
declare class Zo {
    constructor(e: any, s: any, r: any, i: any, n: any, u: any);
    prompt: any;
    command: any;
    references: any;
    participant: any;
    toolReferences: any;
    editedFileEvents: any;
}
declare let Rt: {
    new (e: any, s: any, r: any, i: any, n: any): {
        name: any;
        detail: any;
        kind: any;
        range: any;
        selectionRange: any;
        children: any[];
    };
    validate(e: any): void;
    [Symbol.hasInstance](e: any): e is Mr | Vt;
};
declare let fs: {
    new (e: any, s: any, r: any): {
        code: any;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    FileExists(e: any): any;
    FileNotFound(e: any): any;
    FileNotADirectory(e: any): any;
    FileIsADirectory(e: any): any;
    NoPermissions(e: any): any;
    Unavailable(e: any): any;
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
declare class gr {
    static fromDetails(e: any, s: any): gr;
    constructor(e: any, s: any, r: any, i: any, n?: any[]);
    uri: any;
    statementCoverage: any;
    branchCoverage: any;
    declarationCoverage: any;
    includesTests: any[];
}
declare let We: {
    new (e: any, s: any): {
        label: any;
        c: string;
        readonly id: string;
    };
    Clean: {
        label: any;
        c: string;
        readonly id: string;
    } | undefined;
    Build: {
        label: any;
        c: string;
        readonly id: string;
    } | undefined;
    Rebuild: {
        label: any;
        c: string;
        readonly id: string;
    } | undefined;
    Test: {
        label: any;
        c: string;
        readonly id: string;
    } | undefined;
    from(e: any): any;
};
declare class Gn {
    constructor(e: any, s: any, r?: any[]);
    set executionCount(e: number);
    get executionCount(): number;
    executed: any;
    location: any;
    branches: any[];
}
declare let bt: {
    new (e: any, s: any, r: any): {
        e: any[];
        c: string;
        f: any;
        process: string;
        args: any[];
        options: any;
        computeId(): string;
    };
};
declare class Ln {
    constructor(e: any, s: any, r: any);
    set executionCount(e: number);
    get executionCount(): number;
    executed: any;
    location: any;
    label: any;
}
declare let Zt: {
    new (e: any, s: any, r: any): {
        f: any[];
        e: any;
        g: any;
        c: string | undefined;
        commandLine: string | undefined;
        command: any;
        args: any[];
        options: any;
        computeId(): string;
    };
};
declare class Hn {
    constructor(e: any, s: any, r: any);
    set executionCount(e: number);
    get executionCount(): number;
    executed: any;
    name: any;
    location: any;
}
declare class Pr {
    constructor(e: any);
    c: any;
    computeId(): string;
    set callback(e: any);
    get callback(): any;
}
declare class _n {
    constructor(e: any, s: any, r: any, i: any, n: any, u: any);
    kind: any;
    name: any;
    detail: any;
    uri: any;
    range: any;
    selectionRange: any;
}
declare let je: {
    new (e: any, s: any, r: any, i: any, n: any, u: any): {
        k: boolean;
        l: any;
        definition: any;
        o: any;
        name: any;
        w: any;
        source: any;
        execution: any;
        target: any;
        r: any[];
        t: boolean;
        u: boolean;
        y: any;
        z: any;
        _id: any;
        j: any;
        readonly _deprecated: boolean;
        B(): void;
        C(): void;
        readonly scope: any;
        m: any;
        q: any;
        problemMatchers: any[];
        readonly hasDefinedMatchers: boolean;
        isBackground: boolean;
        group: any;
        x: any;
        detail: any;
        A: any;
        presentationOptions: any;
        runOptions: any;
    };
    c: string | undefined;
    e: string | undefined;
    f: string | undefined;
    g: string | undefined;
};
declare class Xn {
    constructor(e: any);
    uri: any;
}
declare let ze: {
    new (e: any, s?: any): {
        collapsibleState: any;
        resourceUri: any;
        label: any;
    };
    isTreeItem(e: any, s: any): boolean;
};
declare class Vn {
    constructor(e: any, s: any);
    original: any;
    modified: any;
}
declare let yt: {
    new (e: any): {
        asString(): Promise<string>;
        asFile(): void;
        value: any;
    };
};
declare class Rn {
    constructor(e: any, s: any, r: any, i: any);
    base: any;
    input1: any;
    input2: any;
    result: any;
}
declare const Yr_base: {
    new (e: any): {
        asString(): Promise<string>;
        asFile(): void;
        value: any;
    };
};
declare class Yr extends Yr_base {
}
declare class Qn {
    constructor(e: any, s: any);
    uri: any;
    viewType: any;
}
declare class Ri extends Yr {
    asFile(): any;
    #private;
}
declare class Sn {
    constructor(e: any);
    viewType: any;
}
declare class Qi {
    constructor(e: any, s: any, r: any, i: any);
    name: any;
    uri: any;
    _itemId: any;
    c: any;
    data(): any;
}
declare class Cn {
    constructor(e: any, s: any);
    uri: any;
    notebookType: any;
}
declare let Ge: {
    new (e: any): {
        "__#7@#t": Map<any, any>;
        get(e: any): any;
        set(e: any, s: any): void;
        forEach(e: any, s: any): void;
        "__#7@#e"(e: any): any;
        [Symbol.iterator](): Generator<any[], void, unknown>;
    };
};
declare class Tn {
    constructor(e: any, s: any, r: any);
    original: any;
    modified: any;
    notebookType: any;
}
declare let Le: {
    new (e: any, s: any, r: any): {
        insertText: any;
        title: any;
        kind: any;
    };
};
declare class Kn {
}
declare let Ot: {
    new (e: any): {
        "__#4@#t": any;
        dispose(): void;
    };
    from(...e: any[]): any;
};
declare class N {
    constructor(e: any);
    value: any;
    append(...e: any[]): N;
    intersects(e: any): any;
    contains(e: any): any;
}
declare namespace N {
    let c: string | undefined;
    let Empty: N;
    let Text: N;
    let TextUpdateImports: N;
}
declare class to {
    constructor(e: any, s: any);
    uri: any;
    inputBoxUri: any;
}
declare let f: {
    new (e: any, s: any): {
        readonly line: any;
        readonly character: any;
        c: any;
        e: any;
        isBefore(e: any): boolean;
        isBeforeOrEqual(e: any): boolean;
        isAfter(e: any): boolean;
        isAfterOrEqual(e: any): boolean;
        isEqual(e: any): boolean;
        compareTo(e: any): 0 | 1 | -1;
        translate(e: any, s?: number): any;
        with(e: any, s?: any): any;
        toJSON(): {
            line: any;
            character: any;
        };
    };
    Min(...e: any[]): any;
    Max(...e: any[]): any;
    isPosition(e: any): boolean;
    of(e: any): any;
};
declare class Ti {
    constructor(e: any, s: any, r: any);
    title: any;
    insertText: any;
    kind: any;
}
declare class eo {
}
declare let d: {
    new (e: any, s: any, r: any, i: any): {
        readonly start: any;
        readonly end: any;
        c: any;
        e: any;
        contains(e: any): any;
        isEqual(e: any): any;
        intersection(e: any): any;
        union(e: any): any;
        readonly isEmpty: any;
        readonly isSingleLine: boolean;
        with(e: any, s?: any): any;
        toJSON(): any[];
    };
    isRange(e: any): boolean;
    of(e: any): any;
};
declare let M: {
    new (e: any, s: any): {
        id: any;
        color: any;
    };
    isThemeIcon(e: any): boolean;
    File: {
        id: any;
        color: any;
    };
    Folder: {
        id: any;
        color: any;
    };
};
declare class so {
    constructor(e: any);
    textDiffs: any;
}
declare let Dt: {
    new (e: any, s: any, r: any, i: any): {
        readonly anchor: any;
        readonly active: any;
        f: any;
        g: any;
        readonly isReversed: boolean;
        toJSON(): {
            start: any;
            end: any;
            active: any;
            anchor: any;
        };
        readonly start: any;
        readonly end: any;
        c: any;
        e: any;
        contains(e: any): any;
        isEqual(e: any): any;
        intersection(e: any): any;
        union(e: any): any;
        readonly isEmpty: any;
        readonly isSingleLine: boolean;
        with(e: any, s?: any): any;
    };
    isSelection(e: any): boolean;
    isRange(e: any): boolean;
    of(e: any): any;
};
declare let _e: {
    new (e: any): {
        id: any;
    };
};
declare class ro {
    constructor(e: any, s: any, r: any);
    id: any;
    label: any;
    values: any;
}
declare function lr(t: any): string;
declare let Ve: {
    new (e: any, s: any): {
        base: any;
        c: any;
        e: any;
        baseUri: any;
        pattern: string;
        toJSON(): {
            pattern: string;
            base: any;
            baseUri: any;
        };
    };
};
declare class io {
    constructor(e: any);
    value: any;
}
declare function Er(t: any): string;
declare function sn(t: any, e: any): void;
declare class no {
    constructor(e: any, s: any);
    value: any;
    vulnerabilities: any;
}
declare class Kr {
    static isResolvedAuthority(e: any): any;
    constructor(e: any, s: any, r: any);
    host: string;
    port: number;
    connectionToken: any;
}
declare let L: {
    new (e: any, s: any, r: any, i: any, n: any): {
        enabled: boolean;
        condition: string | undefined;
        hitCondition: string | undefined;
        logMessage: string | undefined;
        mode: string | undefined;
        readonly id: any;
        c: any;
    };
};
declare class oo {
    constructor(e: any, s: any, r: any, i: any);
    title: any;
    message: any;
    data: any;
    buttons: any;
}
declare class ti {
    static isManagedResolvedAuthority(e: any): any;
    constructor(e: any, s: any);
    makeConnection: any;
    connectionToken: any;
}
declare let Re: {
    new (e: any, s: any, r: any, i: any, n: any, u: any): {
        location: any;
        enabled: boolean;
        condition: string | undefined;
        hitCondition: string | undefined;
        logMessage: string | undefined;
        mode: string | undefined;
        readonly id: any;
        c: any;
    };
};
declare class co {
    constructor(e: any, s: any);
    value: any;
    baseUri: any;
}
declare class X extends Error {
    static NotAvailable(e: any, s: any): X;
    static TemporarilyNotAvailable(e: any): X;
    constructor(e: any, s: any, r: any);
    _message: any;
    _code: any;
    _detail: any;
}
declare let Qe: {
    new (e: any, s: any, r: any, i: any, n: any, u: any): {
        functionName: any;
        enabled: boolean;
        condition: string | undefined;
        hitCondition: string | undefined;
        logMessage: string | undefined;
        mode: string | undefined;
        readonly id: any;
        c: any;
    };
};
declare class uo {
    constructor(e: any, s: any);
    value: any;
    value2: any;
    title: any;
}
declare let pt: {
    new (e: any, s: any): {
        range: any;
        c: any;
        newText: any;
        e: any;
        newEol: any;
        f: any;
        toJSON(): {
            range: any;
            newText: any;
            newEol: any;
        };
    };
    isTextEdit(e: any): boolean;
    replace(e: any, s: any): any;
    insert(e: any, s: any): any;
    delete(e: any): any;
    setEndOfLine(e: any): any;
};
declare let Se: {
    new (e: any, s: any, r: any, i: any, n: any, u: any, h: any, l: any): {
        label: any;
        dataId: any;
        canPersist: any;
        enabled: boolean;
        condition: string | undefined;
        hitCondition: string | undefined;
        logMessage: string | undefined;
        mode: string | undefined;
        readonly id: any;
        c: any;
    };
};
declare class ho {
    constructor(e: any);
    value: any;
}
declare let lt: {
    new (e: any, s: any): {
        range: any;
        newCells: any;
    };
    isNotebookCellEdit(e: any): boolean;
    replaceCells(e: any, s: any): any;
    insertCells(e: any, s: any): any;
    deleteCells(e: any): any;
    updateCellMetadata(e: any, s: any): any;
    updateNotebookMetadata(e: any): any;
};
declare let Ce: {
    new (e: any, s: any, r: any): {
        command: any;
        args: any;
        options: any;
    };
};
declare class ao {
    constructor(e: any, s: any);
    value: any;
    task: any;
}
declare class J {
    static isSnippetTextEdit(e: any): boolean;
    static replace(e: any, s: any): J;
    static insert(e: any, s: any): J;
    constructor(e: any, s: any);
    range: any;
    snippet: any;
}
declare let Te: {
    new (e: any, s: any): {
        port: any;
        host: any;
    };
};
declare class fo {
    constructor(e: any);
    value: any;
}
declare let qt: {
    new (): {
        c: any[];
        _allEntries(): any[];
        renameFile(e: any, s: any, r: any, i: any): void;
        createFile(e: any, s: any, r: any): void;
        deleteFile(e: any, s: any, r: any): void;
        e(e: any, s: any, r: any): void;
        f(e: any, s: any, r: any, i: any): void;
        g(e: any, s: any, r: any, i: any): void;
        replace(e: any, s: any, r: any, i: any): void;
        insert(e: any, s: any, r: any, i: any): void;
        delete(e: any, s: any, r: any): void;
        has(e: any): boolean;
        set(e: any, s: any): void;
        get(e: any): any[];
        entries(): any[];
        readonly size: number;
        toJSON(): any[];
    };
};
declare let Ke: {
    new (e: any): {
        path: any;
    };
};
declare class po {
    constructor(e: any);
    value: any;
}
declare let dt: {
    new (e: any): {
        e: number;
        value: any;
        appendText(e: any): /*elided*/ any;
        appendTabstop(e?: number): /*elided*/ any;
        appendPlaceholder(e: any, s?: number): /*elided*/ any;
        appendChoice(e: any, s?: number): /*elided*/ any;
        appendVariable(e: any, s: any): /*elided*/ any;
    };
    isSnippetString(e: any): boolean;
    c(e: any): any;
};
declare let ts: {
    new (e: any): {
        implementation: any;
    };
};
declare class ko {
    constructor(e: any);
    cell: any;
}
declare let p: {
    new (e: any): {
        value: any;
        append(e: any): any;
        intersects(e: any): any;
        contains(e: any): any;
    };
    c: string | undefined;
    Empty: {
        value: any;
        append(e: any): any;
        intersects(e: any): any;
        contains(e: any): any;
    };
    QuickFix: any;
    Refactor: any;
    RefactorExtract: any;
    RefactorInline: any;
    RefactorMove: any;
    RefactorRewrite: any;
    Source: any;
    SourceOrganizeImports: any;
    SourceFixAll: any;
    Notebook: any;
};
declare class wr {
    static r(e: any): Uint32Array<any>;
    constructor(e: any);
    c: number;
    e: number;
    f: boolean;
    g: any[];
    j: number;
    k: Map<any, any>;
    l: Map<any, any>;
    m: boolean;
    push(e: any, s: any, r: any, i: any, n: any): void;
    o(e: any, s: any, r: any): void;
    q(e: any, s: any, r: any, i: any, n: any): void;
    build(e: any): ms;
}
declare class ms {
    constructor(e: any, s: any);
    resultId: any;
    data: any;
}
declare class Uo {
    constructor(e: any, s: any, r: any);
    mimeType: any;
    data: any;
    reference: any;
}
declare let Ct: {
    new (e: any, s: any): {
        range: any;
        parent: any;
    };
};
declare class yn {
    constructor(e: any, s: any, r: any);
    start: any;
    deleteCount: any;
    data: any;
}
declare class Ao {
    constructor(e: any);
    diagnostics: any;
}
declare class wi {
    constructor(e: any, s: any, r: any, i: any, n: any, u: any);
    kind: any;
    name: any;
    detail: any;
    uri: any;
    range: any;
    selectionRange: any;
}
declare class Nn {
    constructor(e: any, s: any);
    resultId: any;
    edits: any;
}
declare class Eo {
    constructor(e: any, s: any, r: any);
    callId: any;
    content: any;
    isError: any;
}
declare class gi {
    constructor(e: any, s: any);
    fromRanges: any;
    from: any;
}
declare class kn {
    constructor(e: any);
    name: any;
}
declare class Mo {
    constructor(e: any, s: any, r: any);
    callId: any;
    content: any;
    isError: any;
}
declare class vi {
    constructor(e: any, s: any);
    fromRanges: any;
    to: any;
}
declare let ys: {
    new (): {};
    Back: {
        iconPath: {
            id: any;
            color: any;
        };
    } | undefined;
};
declare class Po {
    constructor(e: any, s: any, r: any, i: any);
    command: any;
    language: any;
    confirmationMessages: any;
    presentation: any;
}
declare let Kt: {
    new (e: any, s: any): {
        range: any;
        command: any;
        readonly isResolved: boolean;
    };
};
declare class An {
    static validate(e: any): boolean;
    constructor(e: any, s: any, r: any);
    badge: any;
    tooltip: any;
    color: any;
}
declare class Ut {
    static User(e: any, s: any): Ut;
    static Assistant(e: any, s: any): Ut;
    constructor(e: any, s: any, r: any);
    set content(e: any[]);
    get content(): any[];
    c: any[];
    role: any;
    name: any;
}
declare let D: {
    new (e: any, s?: boolean): {
        "__#5@#t": Zr;
        value: string;
        isTrusted: any;
        supportThemeIcons: any;
        supportHtml: any;
        baseUri: any;
        appendText(e: any): /*elided*/ any;
        appendMarkdown(e: any): /*elided*/ any;
        appendCodeblock(e: any, s: any): /*elided*/ any;
    };
    isMarkdownString(e: any): any;
};
declare let As: {
    new (e: any): {
        kind: any;
    };
};
declare class At {
    static User(e: any, s: any): At;
    static Assistant(e: any, s: any): At;
    constructor(e: any, s: any, r: any);
    set content(e: any[]);
    get content(): any[];
    c: any[];
    set content2(e: any[]);
    get content2(): any[];
    role: any;
    name: any;
}
declare let te: {
    new (e: any, s: any): {
        label: any;
        documentation: any;
    };
};
declare class O {
    static isNotebookRange(e: any): boolean;
    constructor(e: any, s: any);
    get start(): any;
    get end(): any;
    get isEmpty(): boolean;
    c: any;
    e: any;
    with(e: any): O;
}
declare class Yo {
    constructor(e: any, s: any, r: any);
    callId: any;
    name: any;
    input: any;
}
declare let ee: {
    new (e: any, s: any): {
        label: any;
        documentation: any;
        parameters: any[];
    };
};
declare class Nt {
    static validate(e: any): void;
    static isNotebookCellDataArray(e: any): boolean;
    static isNotebookCellData(e: any): boolean;
    constructor(e: any, s: any, r: any, i: any, n: any, u: any, h: any);
    kind: any;
    value: any;
    languageId: any;
    mime: any;
    outputs: any;
    metadata: any;
    executionSummary: any;
}
declare class V {
    constructor(e: any);
    value: any;
    toJSON(): {
        $mid: number;
        value: any;
    };
}
declare let se: {
    new (): {
        activeSignature: number;
        activeParameter: number;
        signatures: any[];
    };
};
declare class Mn {
    constructor(e: any);
    cells: any;
}
declare class R {
    static image(e: any, s: any): R;
    static json(e: any, s?: string): R;
    static text(e: any, s?: "text/plain"): R;
    constructor(e: any, s: any);
    mimeType: any;
    data: any;
    toJSON(): {
        $mid: number;
        mimeType: any;
        data: any;
    };
}
declare let ne: {
    new (e: any): {
        value: any;
    };
};
declare class A {
    static isNotebookCellOutputItem(e: any): boolean;
    static error(e: any): A;
    static stdout(e: any): A;
    static stderr(e: any): A;
    static bytes(e: any, s?: string): A;
    static "__#8@#t": TextEncoder;
    static text(e: any, s?: "text/plain"): A;
    static json(e: any, s?: string): A;
    constructor(e: any, s: any);
    data: any;
    mime: any;
}
declare class Io {
    constructor(e: any);
    value: any;
    toJSON(): {
        $mid: number;
        value: any;
    };
}
declare let oe: {
    new (e: any, s: any, r: any): {
        position: any;
        label: any;
        kind: any;
    };
};
declare class kt {
    static isNotebookCellOutput(e: any): boolean;
    static ensureUniqueMimeTypes(e: any, s?: boolean): any;
    constructor(e: any, s: any, r: any);
    items: any;
    id: string;
    metadata: any;
}
declare class Bo {
    constructor(e: any);
    content: any;
}
declare let he: {
    new (e: any, s: any): {
        label: any;
        kind: any;
        toJSON(): {
            label: any;
            kind: any;
            detail: any;
            documentation: any;
            sortText: any;
            filterText: any;
            preselect: any;
            insertText: any;
            textEdit: any;
        };
    };
};
declare class Pn {
    constructor(e: any, s: any, r: any);
    label: any;
    uri: any;
    position: any;
}
declare class Oo {
    constructor(e: any, s: any);
    content: any;
    name: any;
}
declare let ae: {
    new (e?: any[], s?: boolean): {
        items: any[];
        isIncomplete: boolean;
    };
};
declare class Yn {
    constructor(e: any, s: any);
    text: any;
    alignment: any;
}
declare class Do {
    constructor(e: any, s: any);
    content: any;
    name: any;
}
declare let fe: {
    new (e: any, s: any, r: any): {
        insertText: any;
        range: any;
        command: any;
    };
};
declare class In {
    constructor(e: any, s?: any[]);
    uri: any;
    provides: any[];
}
declare class y extends Error {
    static "__#9@#t": string;
    static NotFound(e: any): y;
    static NoPermissions(e: any): y;
    static Blocked(e: any): y;
    static tryDeserialize(e: any): y | undefined;
    constructor(e: any, s: any, r: any);
    code: any;
}
declare let pe: {
    new (e: any): {
        items: any;
    };
};
declare class Bn {
    constructor(e: any);
    label: any;
}
declare class Or {
    constructor(e: any);
    content: any;
    toJSON(): {
        $mid: number;
        content: any;
    };
}
declare function Yi(t: any, e: any): string;
declare let Ws: {
    new (e: any, s: any): {
        label: any;
        timestamp: any;
    };
};
declare class Wo {
    constructor(e: any);
    content: any;
    toJSON(): {
        $mid: number;
        content: any;
    };
}
declare let ye: {
    new (e: any, s: any): {
        range: any;
        target: any;
    };
};
declare class Dn {
    constructor(e: any, s: any);
    ranges: any;
    wordPattern: any;
}
declare class Fo extends Or {
}
declare let mt: {
    new (e: any, s: any, r: any, i: any): {
        red: any;
        green: any;
        blue: any;
        alpha: any;
    };
};
declare class Wn {
    constructor(e: any);
    c: any;
    get autoForwardAction(): any;
}
declare class jo {
    constructor(e: any, s: any, r: any, i: {} | undefined, n: any);
    label: any;
    command: any;
    args: any;
    env: {};
    version: any;
}
declare let Ne: {
    new (e: any, s: any): {
        range: any;
        color: any;
    };
};
declare class Fn {
    constructor(e: any, s: any, r: any);
    controllerId: any;
    profileId: any;
    kind: any;
}
declare class qo {
    constructor(e: any, s: any, r: {} | undefined, i: any);
    label: any;
    uri: any;
    headers: {};
    version: any;
}
declare let ke: {
    new (e: any): {
        label: string;
    };
};
declare let Gs: {
    new (e?: undefined, s?: undefined, r?: undefined, i?: boolean, n?: boolean): {
        include: any;
        exclude: any;
        profile: any;
        continuous: boolean;
        preserveFocus: boolean;
    };
};
declare class Wi {
    constructor(e: any, s: any, r: any);
    startIndex: any;
    length: any;
    tooltip: any;
}
declare let Ls: {
    new (e: any): {
        message: any;
    };
    diff(e: any, s: any, r: any): any;
};
declare class Fi {
    constructor(e: any);
    uri: any;
}
declare let Hs: {
    new (e: any): {
        id: any;
    };
};
declare class ji {
    constructor(e: any);
    terminalCommand: any;
}
declare class zn {
    constructor(e: any, s: any, r: any);
    label: any;
    uri: any;
    position: any;
}
declare class qi {
    constructor(e: any);
    options: any;
}
declare class rt {
    constructor(e: any, s: any);
    covered: any;
    total: any;
}
declare class Ji {
    constructor(e: any, s: any, r: any, i: any, n: any, u: any, h: any, l: any, $: any);
    label: any;
    icon: any;
    detail: any;
    documentation: any;
    isFile: any;
    isDirectory: any;
    isKeyword: any;
    replacementIndex: any;
    replacementLength: any;
}
declare function Br(t: any): void;
declare class zi {
    constructor(e: any, s: any);
    items: any;
    resourceRequestConfig: any;
}
declare var Qs: any;
declare var Cs: any;
declare var rr: any;
declare var ir: any;
declare var er: any;
declare var Ts: any;
declare var sr: any;
declare var tr: any;
declare var Ss: any;
declare var Qt: any;
declare var Ue: any;
declare var Es: any;
declare var xs: any;
declare var $s: any;
declare var gs: any;
declare var ds: any;
declare var vs: any;
declare var ws: any;
declare var vt: any;
declare var ue: any;
declare var ce: any;
declare var Xe: any;
declare var bs: any;
declare var Ze: any;
declare var Q: any;
declare var Jt: any;
declare var S: any;
declare var He: any;
declare var Wt: any;
declare var Ft: any;
declare var Us: any;
declare var Fs: any;
declare var js: any;
declare var _s: any;
declare var as: any;
declare var jt: any;
declare var ls: any;
declare var Lt: any;
declare var ie: any;
declare var de: any;
declare var ss: any;
declare var rs: any;
declare var ks: any;
declare var Ks: any;
declare var Rs: any;
declare var ar: any;
declare var W: any;
declare var nr: any;
declare var Tt: any;
declare var us: any;
declare var hs: any;
declare var Ps: any;
declare var Ms: any;
declare var Ys: any;
declare var Bs: any;
declare var Os: any;
declare var Is: any;
declare var Ds: any;
declare var le: any;
declare var Vs: any;
declare var qe: any;
declare var Zs: any;
declare var Ns: any;
declare var or: any;
declare var cr: any;
declare var Fe: any;
declare var re: any;
declare var Ae: any;
declare var ur: any;
declare var qs: any;
declare var $e: any;
declare var wt: any;
declare var Xt: any;
declare var T: any;
declare var Oe: any;
declare var De: any;
declare var Be: any;
declare var K: any;
declare var Ie: any;
declare var Ee: any;
declare var Ye: any;
declare var It: any;
declare var Bt: any;
declare var Me: any;
declare var Pe: any;
declare var Js: any;
declare var zs: any;
declare var be: any;
declare var ge: any;
declare var me: any;
declare var we: any;
declare var ve: any;
declare var C: any;
declare var hr: any;
declare var tt: any;
declare var z: any;
declare var Je: any;
declare var xe: any;
declare var Xs: any;
declare class Vt {
    constructor(e: any, s: any, r: any, i: any, n: any);
    name: any;
    detail: any;
    kind: any;
    range: any;
    selectionRange: any;
    children: any[];
}
import { $Vj as Zr } from "../../../base/common/htmlContent.js";
export { No as $$1, St as $$Y, Zn as $$Z, yo as $01, Mr as $0Y, ps as $0Z, lo as $11, G as $1Y, pn as $1Z, xo as $21, xt as $2Y, ln as $2Z, $o as $31, zt as $3Y, es as $3Z, wo as $41, $t as $4Y, is as $4Z, go as $51, Gt as $5Y, ns as $5Z, vo as $61, Ht as $6Y, os as $6Z, mo as $71, _t as $7Y, cs as $7Z, bo as $81, gt as $8Y, vn as $8Z, Zo as $91, Rt as $9Y, fs as $9Z, gr as $A1, We as $AZ, Gn as $B1, bt as $BZ, Ln as $C1, Zt as $CZ, Hn as $D1, Pr as $DZ, _n as $E1, je as $EZ, Xn as $F1, ze as $FZ, Vn as $G1, yt as $GZ, Rn as $H1, Yr as $HZ, Qn as $I1, Ri as $IZ, Sn as $J1, Qi as $JZ, Cn as $K1, Ge as $KZ, Tn as $L1, Le as $LZ, Kn as $M1, Ot as $MY, N as $MZ, to as $N1, f as $NY, Ti as $NZ, eo as $O1, d as $OY, M as $OZ, so as $P1, Dt as $PY, _e as $PZ, ro as $Q1, lr as $QY, Ve as $QZ, io as $R1, Er as $RY, sn as $RZ, no as $S1, Kr as $SY, L as $SZ, oo as $T1, ti as $TY, Re as $TZ, co as $U1, X as $UY, Qe as $UZ, uo as $V1, pt as $VY, Se as $VZ, ho as $W1, lt as $WY, Ce as $WZ, ao as $X1, J as $XY, Te as $XZ, fo as $Y1, qt as $YY, Ke as $YZ, po as $Z1, dt as $ZY, ts as $ZZ, ko as $_1, p as $_Y, wr as $_Z, ms as $a1, Uo as $a2, Ct as $aZ, yn as $b1, Ao as $b2, wi as $bZ, Nn as $c1, Eo as $c2, gi as $cZ, kn as $d1, Mo as $d2, vi as $dZ, ys as $e1, Po as $e2, Kt as $eZ, An as $f1, Ut as $f2, D as $fZ, As as $g1, At as $g2, te as $gZ, O as $h1, Yo as $h2, ee as $hZ, Nt as $i1, V as $i2, se as $iZ, Mn as $j1, R as $j2, ne as $jZ, A as $k1, Io as $k2, oe as $kZ, kt as $l1, Bo as $l2, he as $lZ, Pn as $m1, Oo as $m2, ae as $mZ, Yn as $n1, Do as $n2, fe as $nZ, In as $o1, y as $o2, pe as $oZ, Bn as $p1, Or as $p2, Yi as $pZ, Ws as $q1, Wo as $q2, ye as $qZ, Dn as $r1, Fo as $r2, mt as $rZ, Wn as $s1, jo as $s2, Ne as $sZ, Fn as $t1, qo as $t2, ke as $tZ, Gs as $u1, Wi as $uZ, Ls as $v1, Fi as $vZ, Hs as $w1, ji as $wZ, zn as $x1, qi as $xZ, rt as $y1, Ji as $yZ, Br as $z1, zi as $zZ, Qs as ChatCopyKind, Cs as ChatEditingSessionActionOutcome, rr as ChatErrorLevel, ir as ChatImageMimeType, er as ChatLocation, Ts as ChatRequestEditedFileEventKind, sr as ChatResponseReferencePartStatusKind, tr as ChatResultFeedbackKind, Ss as ChatVariableLevel, Qt as CodeActionTriggerKind, Ue as ColorFormat, Es as ColorThemeKind, xs as CommentMode, $s as CommentState, gs as CommentThreadApplicability, ds as CommentThreadCollapsibleState, vs as CommentThreadFocus, ws as CommentThreadState, vt as CompletionItemKind, ue as CompletionItemTag, ce as CompletionTriggerKind, Xe as ConfigurationTarget, bs as DebugConsoleMode, Ze as DecorationRangeBehavior, Q as DiagnosticSeverity, Jt as DiagnosticTag, S as DocumentHighlightKind, He as DocumentPasteTriggerKind, Wt as EndOfLine, Ft as EnvironmentVariableMutatorType, Us as ExtensionKind, Fs as ExtensionMode, js as ExtensionRuntime, _s as ExternalUriOpenerPriority, as as FileChangeType, jt as FileEditType, ls as FoldingRangeKind, Lt as HoverVerbosityAction, ie as InlayHintKind, de as InlineCompletionEndOfLifeReasonKind, ss as InlineCompletionTriggerKind, rs as InlineCompletionsDisposeReasonKind, ks as InputBoxValidationSeverity, Ks as InteractiveEditorResponseFeedbackKind, Rs as InteractiveSessionVoteDirection, ar as KeywordRecognitionStatus, W as LanguageModelChatMessageRole, nr as LanguageModelChatToolMode, Tt as LanguageStatusSeverity, us as NewSymbolNameTag, hs as NewSymbolNameTriggerKind, Ps as NotebookCellExecutionState, Ms as NotebookCellKind, Ys as NotebookCellStatusBarAlignment, Bs as NotebookControllerAffinity, Os as NotebookControllerAffinity2, Is as NotebookEditorRevealType, Ds as NotebookVariablesRequestKind, le as PartialAcceptTriggerKind, Vs as PortAutoForwardAction, qe as ProgressLocation, Zs as QuickInputButtonLocation, Ns as QuickPickItemKind, or as RelatedInformationType, cr as SettingsSearchResultKind, Fe as ShellQuoting, re as SignatureHelpTriggerKind, Ae as SourceControlInputBoxValidationType, ur as SpeechToTextStatus, qs as StandardTokenType, $e as StatusBarAlignment, wt as SymbolKind, Xt as SymbolTag, T as SyntaxTokenType, Oe as TaskEventKind, De as TaskPanelKind, Be as TaskRevealKind, K as TaskScope, Ie as TerminalCompletionItemKind, Ee as TerminalExitReason, Ye as TerminalLocation, It as TerminalOutputAnchor, Bt as TerminalQuickFixType, Me as TerminalShellExecutionCommandLineConfidence, Pe as TerminalShellType, Js as TestResultState, zs as TestRunProfileKind, be as TextDocumentChangeReason, ge as TextDocumentSaveReason, me as TextEditorChangeKind, we as TextEditorLineNumbersStyle, ve as TextEditorRevealType, C as TextEditorSelectionChangeKind, hr as TextToSpeechStatus, tt as TreeItemCheckboxState, z as TreeItemCollapsibleState, Je as ViewBadge, xe as ViewColumn, Xs as WorkspaceTrustState };
//# sourceMappingURL=extHostTypes.d.ts.map