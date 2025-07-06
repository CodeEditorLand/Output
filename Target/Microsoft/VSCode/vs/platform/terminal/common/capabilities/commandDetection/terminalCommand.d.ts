declare class h {
    static deserialize(t: any, e: any, r: any): h | undefined;
    constructor(t: any, e: any);
    get command(): any;
    get commandLineConfidence(): any;
    get isTrusted(): any;
    get timestamp(): any;
    get duration(): any;
    get promptStartMarker(): any;
    get marker(): any;
    set endMarker(t: any);
    get endMarker(): any;
    get executedMarker(): any;
    get aliases(): any;
    get wasReplayed(): any;
    get cwd(): any;
    get exitCode(): any;
    get commandStartLineContent(): any;
    get markProperties(): any;
    get executedX(): any;
    get startX(): any;
    a: any;
    b: any;
    serialize(t: any): {
        promptStartLine: any;
        startLine: any;
        startX: undefined;
        endLine: any;
        executedLine: any;
        executedX: any;
        command: any;
        commandLineConfidence: any;
        isTrusted: any;
        cwd: any;
        exitCode: any;
        commandStartLineContent: any;
        timestamp: any;
        duration: any;
        markProperties: any;
    };
    extractCommandLine(): string;
    getOutput(): string | undefined;
    getOutputMatch(t: any): {
        regexMatch: RegExpMatchArray;
        outputLines: string[];
    } | undefined;
    hasOutput(): boolean;
    getPromptRowCount(): number;
    getCommandRowCount(): number;
}
declare class M {
    constructor(t: any);
    c: any;
    serialize(t: any): {
        promptStartLine: any;
        startLine: any;
        startX: any;
        endLine: undefined;
        executedLine: undefined;
        executedX: undefined;
        command: string;
        commandLineConfidence: string;
        isTrusted: boolean;
        cwd: any;
        exitCode: undefined;
        commandStartLineContent: undefined;
        timestamp: number;
        duration: number;
        markProperties: undefined;
    } | undefined;
    promoteToFullCommand(t: any, e: any, r: any, n: any): h | undefined;
    command: string | undefined;
    markExecutedTime(): void;
    a: number | undefined;
    markFinishedTime(): void;
    b: number | undefined;
    extractCommandLine(): string;
    getPromptRowCount(): number;
    getCommandRowCount(): number;
}
export { h as $Dw, M as $Ew };
//# sourceMappingURL=terminalCommand.d.ts.map