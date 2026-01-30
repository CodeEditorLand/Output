export class BranchCoverage {
    constructor(executed: any, location: any, label: any);
    set executionCount(n: number);
    get executionCount(): number;
    executed: any;
    location: any;
    label: any;
}
export let Breakpoint: {
    new (enabled: any, condition: any, hitCondition: any, logMessage: any, mode: any): {
        enabled: boolean;
        condition: string | undefined;
        hitCondition: string | undefined;
        logMessage: string | undefined;
        mode: string | undefined;
        get id(): any;
        _id: any;
    };
};
export class CallHierarchyIncomingCall {
    constructor(item: any, fromRanges: any);
    fromRanges: any;
    from: any;
}
export class CallHierarchyItem {
    constructor(kind: any, name: any, detail: any, uri: any, range: any, selectionRange: any);
    kind: any;
    name: any;
    detail: any;
    uri: any;
    range: any;
    selectionRange: any;
}
export class CallHierarchyOutgoingCall {
    constructor(item: any, fromRanges: any);
    fromRanges: any;
    to: any;
}
export class CellErrorStackFrame {
    /**
     * @param label The name of the stack frame
     * @param file The file URI of the stack frame
     * @param position The position of the stack frame within the file
     */
    constructor(label: any, uri: any, position: any);
    label: any;
    uri: any;
    position: any;
}
export class ChatCompletionItem {
    constructor(id: any, label: any, values: any);
    id: any;
    label: any;
    values: any;
}
export var ChatCopyKind: any;
export var ChatEditingSessionActionOutcome: any;
export class ChatEditorTabInput {
}
export var ChatErrorLevel: any;
export var ChatImageMimeType: any;
export var ChatLocation: any;
export class ChatReferenceBinaryData {
    constructor(mimeType: any, data: any, reference: any);
    mimeType: any;
    data: any;
    reference: any;
}
export class ChatReferenceDiagnostic {
    constructor(diagnostics: any);
    diagnostics: any;
}
export var ChatRequestEditedFileEventKind: any;
export class ChatRequestEditorData {
    constructor(editor: any, document: any, selection: any, wholeRange: any);
    editor: any;
    document: any;
    selection: any;
    wholeRange: any;
}
export class ChatRequestNotebookData {
    constructor(cell: any);
    cell: any;
}
export class ChatRequestTurn {
    constructor(prompt: any, command: any, references: any, participant: any, toolReferences: any, editedFileEvents: any, id: any);
    prompt: any;
    command: any;
    references: any;
    participant: any;
    toolReferences: any;
    editedFileEvents: any;
    id: any;
}
export class ChatResponseAnchorPart {
    constructor(value: any, title: any);
    value: any;
    value2: any;
    title: any;
}
export var ChatResponseClearToPreviousToolInvocationReason: any;
export class ChatResponseCodeCitationPart {
    constructor(value: any, license: any, snippet: any);
    value: any;
    license: any;
    snippet: any;
}
export class ChatResponseCodeblockUriPart {
    constructor(value: any, isEdit: any, undoStopId: any);
    value: any;
    isEdit: any;
    undoStopId: any;
}
export class ChatResponseCommandButtonPart {
    constructor(value: any);
    value: any;
}
export class ChatResponseConfirmationPart {
    constructor(title: any, message: any, data: any, buttons: any);
    title: any;
    message: any;
    data: any;
    buttons: any;
}
export class ChatResponseExtensionsPart {
    constructor(extensions: any);
    extensions: any;
}
export class ChatResponseExternalEditPart {
    constructor(uris: any, callback: any);
    uris: any;
    callback: any;
    applied: Promise<any>;
    didGetApplied: (value: any) => void;
}
export class ChatResponseFileTreePart {
    constructor(value: any, baseUri: any);
    value: any;
    baseUri: any;
}
export class ChatResponseMarkdownPart {
    constructor(value: any);
    value: any;
}
export class ChatResponseMarkdownWithVulnerabilitiesPart {
    constructor(value: any, vulnerabilities: any);
    value: any;
    vulnerabilities: any;
}
export class ChatResponseMovePart {
    constructor(uri: any, range: any);
    uri: any;
    range: any;
}
export class ChatResponseMultiDiffPart {
    constructor(value: any, title: any, readOnly: any);
    value: any;
    title: any;
    readOnly: any;
}
export class ChatResponseNotebookEditPart {
    constructor(uri: any, editsOrDone: any);
    uri: any;
    isDone: boolean | undefined;
    edits: any[];
}
export class ChatResponseProgressPart {
    constructor(value: any);
    value: any;
}
export class ChatResponseProgressPart2 {
    constructor(value: any, task: any);
    value: any;
    task: any;
}
export class ChatResponsePullRequestPart {
    constructor(uri: any, title: any, description: any, author: any, linkTag: any);
    uri: any;
    title: any;
    description: any;
    author: any;
    linkTag: any;
    toJSON(): {
        $mid: number;
        uri: any;
        title: any;
        description: any;
        author: any;
    };
}
export class ChatResponseReferencePart {
    constructor(value: any, iconPath: any, options: any);
    value: any;
    iconPath: any;
    options: any;
}
export var ChatResponseReferencePartStatusKind: any;
export class ChatResponseTextEditPart {
    constructor(uri: any, editsOrDone: any);
    uri: any;
    isDone: boolean | undefined;
    edits: any[];
}
export class ChatResponseThinkingProgressPart {
    constructor(value: any, id: any, metadata: any);
    value: any;
    id: any;
    metadata: any;
}
export class ChatResponseTurn {
    constructor(response: any, result: any, participant: any, command: any);
    response: any;
    result: any;
    participant: any;
    command: any;
}
export class ChatResponseTurn2 {
    constructor(response: any, result: any, participant: any, command: any);
    response: any;
    result: any;
    participant: any;
    command: any;
}
export class ChatResponseWarningPart {
    constructor(value: any);
    value: any;
}
export var ChatResultFeedbackKind: any;
export class ChatSessionChangedFile {
    constructor(modifiedUri: any, insertions: any, deletions: any, originalUri: any);
    modifiedUri: any;
    insertions: any;
    deletions: any;
    originalUri: any;
}
export var ChatSessionStatus: any;
export class ChatToolInvocationPart {
    constructor(toolName: any, toolCallId: any, isError: any);
    toolName: any;
    toolCallId: any;
    isError: any;
}
export var ChatVariableLevel: any;
export let CodeAction: {
    new (title: any, kind: any): {
        title: any;
        kind: any;
    };
};
import { CodeActionKind } from "./extHostTypes/codeActionKind.js";
export var CodeActionTriggerKind: any;
export let CodeLens: {
    new (range: any, command: any): {
        range: any;
        command: any;
        get isResolved(): boolean;
    };
};
export let Color: {
    new (red: any, green: any, blue: any, alpha: any): {
        red: any;
        green: any;
        blue: any;
        alpha: any;
    };
};
export var ColorFormat: any;
export let ColorInformation: {
    new (range: any, color: any): {
        range: any;
        color: any;
    };
};
export let ColorPresentation: {
    new (label: any): {
        label: string;
    };
};
export let ColorTheme: {
    new (kind: any): {
        kind: any;
    };
};
export var ColorThemeKind: any;
export var CommentMode: any;
export var CommentState: any;
export var CommentThreadApplicability: any;
export var CommentThreadCollapsibleState: any;
export var CommentThreadFocus: any;
export var CommentThreadState: any;
export let CompletionItem: {
    new (label: any, kind: any): {
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
export var CompletionItemKind: any;
export var CompletionItemTag: any;
export let CompletionList: {
    new (items?: any[], isIncomplete?: boolean): {
        items: any[];
        isIncomplete: boolean;
    };
};
export var CompletionTriggerKind: any;
export var ConfigurationTarget: any;
export let CustomAgentChatResource: {
    new (resource: any): {
        resource: any;
    };
};
export class CustomEditorTabInput {
    constructor(uri: any, viewType: any);
    uri: any;
    viewType: any;
}
export class CustomExecution {
    constructor(callback: any);
    _callback: any;
    computeId(): string;
    set callback(value: any);
    get callback(): any;
}
export let DataBreakpoint: {
    new (label: any, dataId: any, canPersist: any, enabled: any, condition: any, hitCondition: any, logMessage: any, mode: any): {
        label: any;
        dataId: any;
        canPersist: any;
        enabled: boolean;
        condition: string | undefined;
        hitCondition: string | undefined;
        logMessage: string | undefined;
        mode: string | undefined;
        get id(): any;
        _id: any;
    };
};
export let DataTransfer: {
    new (init: any): {
        "__#private@#items": Map<any, any>;
        get(mimeType: any): any;
        set(mimeType: any, value: any): void;
        forEach(callbackfn: any, thisArg: any): void;
        "__#private@#normalizeMime"(mimeType: any): any;
        [Symbol.iterator](): Generator<any[], void, unknown>;
    };
};
export class DataTransferFile {
    constructor(name: any, uri: any, itemId: any, getData: any);
    name: any;
    uri: any;
    _itemId: any;
    _getData: any;
    data(): any;
}
export let DataTransferItem: {
    new (value: any): {
        asString(): Promise<string>;
        asFile(): undefined;
        value: any;
    };
};
export let DebugAdapterExecutable: {
    new (command: any, args: any, options: any): {
        command: any;
        args: any;
        options: any;
    };
};
export let DebugAdapterInlineImplementation: {
    new (impl: any): {
        implementation: any;
    };
};
export let DebugAdapterNamedPipeServer: {
    new (path: any): {
        path: any;
    };
};
export let DebugAdapterServer: {
    new (port: any, host: any): {
        port: any;
        host: any;
    };
};
export var DebugConsoleMode: any;
export class DebugStackFrame {
    constructor(session: any, threadId: any, frameId: any);
    session: any;
    threadId: any;
    frameId: any;
}
export class DebugThread {
    constructor(session: any, threadId: any);
    session: any;
    threadId: any;
}
export class DebugVisualization {
    constructor(name: any);
    name: any;
}
export class DeclarationCoverage {
    constructor(name: any, executed: any, location: any);
    set executionCount(n: number);
    get executionCount(): number;
    executed: any;
    name: any;
    location: any;
}
export var DecorationRangeBehavior: any;
import { Diagnostic } from "./extHostTypes/diagnostic.js";
import { DiagnosticRelatedInformation } from "./extHostTypes/diagnostic.js";
import { DiagnosticSeverity } from "./extHostTypes/diagnostic.js";
import { DiagnosticTag } from "./extHostTypes/diagnostic.js";
export let Disposable: {
    new (callOnDispose: any): {
        "__#private@#callOnDispose": any;
        dispose(): void;
    };
    from(...inDisposables: any[]): any;
};
export let DocumentDropEdit: {
    new (insertText: any, title: any, kind: any): {
        insertText: any;
        title: any;
        kind: any;
    };
};
export class DocumentDropOrPasteEditKind {
    constructor(value: any);
    value: any;
    append(...parts: any[]): DocumentDropOrPasteEditKind;
    intersects(other: any): any;
    contains(other: any): any;
}
export namespace DocumentDropOrPasteEditKind {
    let sep: string | undefined;
    let Empty: DocumentDropOrPasteEditKind;
    let Text: DocumentDropOrPasteEditKind;
    let TextUpdateImports: DocumentDropOrPasteEditKind;
}
export let DocumentHighlight: {
    new (range: any, kind?: any): {
        range: any;
        kind: any;
        toJSON(): {
            range: any;
            kind: any;
        };
    };
};
export var DocumentHighlightKind: any;
export let DocumentLink: {
    new (range: any, target: any): {
        range: any;
        target: any;
    };
};
export class DocumentPasteEdit {
    constructor(insertText: any, title: any, kind: any);
    title: any;
    insertText: any;
    kind: any;
}
export var DocumentPasteTriggerKind: any;
export let DocumentSymbol: {
    new (name: any, detail: any, kind: any, range: any, selectionRange: any): {
        name: any;
        detail: any;
        kind: any;
        range: any;
        selectionRange: any;
        children: any[];
    };
    validate(candidate: any): void;
};
import { EndOfLine } from "./extHostTypes/textEdit.js";
export var EnvironmentVariableMutatorType: any;
export let EvaluatableExpression: {
    new (range: any, expression: any): {
        range: any;
        expression: any;
    };
};
export class ExtendedLanguageModelToolResult extends LanguageModelToolResult {
}
export var ExtensionKind: any;
export var ExtensionMode: any;
export var ExtensionRuntime: any;
export var ExternalUriOpenerPriority: any;
export var FileChangeType: any;
export class FileCoverage {
    static fromDetails(uri: any, details: any): FileCoverage;
    constructor(uri: any, statementCoverage: any, branchCoverage: any, declarationCoverage: any, includesTests?: any[]);
    uri: any;
    statementCoverage: any;
    branchCoverage: any;
    declarationCoverage: any;
    includesTests: any[];
}
export class FileDecoration {
    static validate(d: any): boolean;
    constructor(badge: any, tooltip: any, color: any);
    badge: any;
    tooltip: any;
    color: any;
}
import { FileEditType } from "./extHostTypes/workspaceEdit.js";
export let FileSystemError: {
    new (uriOrMessage: any, code: any, terminator: any): {
        code: any;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    FileExists(messageOrUri: any): any;
    FileNotFound(messageOrUri: any): any;
    FileNotADirectory(messageOrUri: any): any;
    FileIsADirectory(messageOrUri: any): any;
    NoPermissions(messageOrUri: any): any;
    Unavailable(messageOrUri: any): any;
    isError(error: unknown): error is Error;
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export let FoldingRange: {
    new (start: any, end: any, kind: any): {
        start: any;
        end: any;
        kind: any;
    };
};
export var FoldingRangeKind: any;
export let FunctionBreakpoint: {
    new (functionName: any, enabled: any, condition: any, hitCondition: any, logMessage: any, mode: any): {
        functionName: any;
        enabled: boolean;
        condition: string | undefined;
        hitCondition: string | undefined;
        logMessage: string | undefined;
        mode: string | undefined;
        get id(): any;
        _id: any;
    };
};
export let Hover: {
    new (contents: any, range: any): {
        contents: any[];
        range: any;
    };
};
export var HoverVerbosityAction: any;
export let InlayHint: {
    new (position: any, label: any, kind: any): {
        position: any;
        label: any;
        kind: any;
    };
};
export var InlayHintKind: any;
export let InlayHintLabelPart: {
    new (value: any): {
        value: any;
    };
};
export var InlineCompletionDisplayLocationKind: any;
export var InlineCompletionEndOfLifeReasonKind: any;
export var InlineCompletionTriggerKind: any;
export var InlineCompletionsDisposeReasonKind: any;
export let InlineSuggestion: {
    new (insertText: any, range: any, command: any): {
        insertText: any;
        range: any;
        command: any;
    };
};
export let InlineSuggestionList: {
    new (items: any): {
        items: any;
    };
};
export let InlineValueContext: {
    new (frameId: any, range: any): {
        frameId: any;
        stoppedLocation: any;
    };
};
export let InlineValueEvaluatableExpression: {
    new (range: any, expression: any): {
        range: any;
        expression: any;
    };
};
export let InlineValueText: {
    new (range: any, text: any): {
        range: any;
        text: any;
    };
};
export let InlineValueVariableLookup: {
    new (range: any, variableName: any, caseSensitiveLookup?: boolean): {
        range: any;
        variableName: any;
        caseSensitiveLookup: boolean;
    };
};
export var InputBoxValidationSeverity: any;
export let InstructionsChatResource: {
    new (resource: any): {
        resource: any;
    };
};
export var InteractiveEditorResponseFeedbackKind: any;
export var InteractiveSessionVoteDirection: any;
export class InteractiveWindowInput {
    constructor(uri: any, inputBoxUri: any);
    uri: any;
    inputBoxUri: any;
}
declare const InternalDataTransferItem_base: {
    new (value: any): {
        asString(): Promise<string>;
        asFile(): undefined;
        value: any;
    };
};
export class InternalDataTransferItem extends InternalDataTransferItem_base {
}
export class InternalFileDataTransferItem extends InternalDataTransferItem {
    asFile(): any;
    #private;
}
export var KeywordRecognitionStatus: any;
export class LanguageModelChatAssistantMessage {
    constructor(content: any, name: any);
    content: any;
    name: any;
}
export class LanguageModelChatMessage {
    static User(content: any, name: any): LanguageModelChatMessage;
    static Assistant(content: any, name: any): LanguageModelChatMessage;
    constructor(role: any, content: any, name: any);
    set content(value: any[]);
    get content(): any[];
    _content: any[];
    role: any;
    name: any;
}
export class LanguageModelChatMessage2 {
    static User(content: any, name: any): LanguageModelChatMessage2;
    static Assistant(content: any, name: any): LanguageModelChatMessage2;
    constructor(role: any, content: any, name: any);
    set content(value: any[]);
    get content(): any[];
    _content: any[];
    set content2(value: any[]);
    get content2(): any[];
    role: any;
    name: any;
}
export var LanguageModelChatMessageRole: any;
export class LanguageModelChatSystemMessage {
    constructor(content: any);
    content: any;
}
export var LanguageModelChatToolMode: any;
export class LanguageModelChatUserMessage {
    constructor(content: any, name: any);
    content: any;
    name: any;
}
export class LanguageModelDataPart {
    static image(data: any, mimeType: any): LanguageModelDataPart;
    static json(value: any, mime?: string): LanguageModelDataPart;
    static text(value: any, mime?: "text/plain"): LanguageModelDataPart;
    constructor(data: any, mimeType: any, audience: any);
    mimeType: any;
    data: any;
    audience: any;
    toJSON(): {
        $mid: number;
        mimeType: any;
        data: any;
        audience: any;
    };
}
export class LanguageModelError extends Error {
    static "__#private@#name": string;
    static NotFound(message: any): LanguageModelError;
    static NoPermissions(message: any): LanguageModelError;
    static Blocked(message: any): LanguageModelError;
    static tryDeserialize(data: any): LanguageModelError | undefined;
    constructor(message: any, code: any, cause: any);
    code: any;
}
export var LanguageModelPartAudience: any;
export class LanguageModelPromptTsxPart {
    constructor(value: any);
    value: any;
    toJSON(): {
        $mid: number;
        value: any;
    };
}
export class LanguageModelTextPart {
    constructor(value: any, audience: any);
    value: any;
    toJSON(): {
        $mid: number;
        value: any;
        audience: any;
    };
}
export class LanguageModelThinkingPart {
    constructor(value: any, id: any, metadata: any);
    value: any;
    id: any;
    metadata: any;
    toJSON(): {
        $mid: number;
        value: any;
        id: any;
        metadata: any;
    };
}
export class LanguageModelToolCallPart {
    constructor(callId: any, name: any, input: any);
    callId: any;
    name: any;
    input: any;
}
export class LanguageModelToolExtensionSource {
    constructor(id: any, label: any);
    id: any;
    label: any;
}
export class LanguageModelToolMCPSource {
    constructor(label: any, name: any, instructions: any);
    label: any;
    name: any;
    instructions: any;
}
export class LanguageModelToolResult {
    constructor(content: any);
    content: any;
    toJSON(): {
        $mid: number;
        content: any;
    };
}
export class LanguageModelToolResult2 {
    constructor(content: any);
    content: any;
    toJSON(): {
        $mid: number;
        content: any;
    };
}
export class LanguageModelToolResultPart {
    constructor(callId: any, content: any, isError: any);
    callId: any;
    content: any;
    isError: any;
}
export var LanguageStatusSeverity: any;
export class LinkedEditingRanges {
    constructor(ranges: any, wordPattern: any);
    ranges: any;
    wordPattern: any;
}
import { Location } from "./extHostTypes/location.js";
export class ManagedResolvedAuthority {
    static isManagedResolvedAuthority(resolvedAuthority: any): any;
    constructor(makeConnection: any, connectionToken: any);
    makeConnection: any;
    connectionToken: any;
}
import { MarkdownString as MarkdownString2 } from "./extHostTypes/markdownString.js";
export class McpHttpServerDefinition {
    constructor(label: any, uri: any, headers: {} | undefined, version: any, metadata: any, authentication: any);
    label: any;
    uri: any;
    headers: {};
    version: any;
    metadata: any;
    authentication: any;
}
export class McpStdioServerDefinition {
    constructor(label: any, command: any, args: any, env: {} | undefined, version: any, metadata: any);
    label: any;
    command: any;
    args: any;
    env: {};
    version: any;
    metadata: any;
}
export var McpToolAvailability: any;
export let MultiDocumentHighlight: {
    new (uri: any, highlights: any): {
        uri: any;
        highlights: any;
        toJSON(): {
            uri: any;
            highlights: any;
        };
    };
};
export class NewSymbolName {
    constructor(newSymbolName: any, tags: any);
    newSymbolName: any;
    tags: any;
}
export var NewSymbolNameTag: any;
export var NewSymbolNameTriggerKind: any;
import { NotebookCellData } from "./extHostTypes/notebooks.js";
export var NotebookCellExecutionState: any;
import { NotebookCellKind } from "./extHostTypes/notebooks.js";
import { NotebookCellOutput } from "./extHostTypes/notebooks.js";
import { NotebookCellOutputItem } from "./extHostTypes/notebooks.js";
export var NotebookCellStatusBarAlignment: any;
export class NotebookCellStatusBarItem {
    constructor(text: any, alignment: any);
    text: any;
    alignment: any;
}
export var NotebookControllerAffinity: any;
export var NotebookControllerAffinity2: any;
import { NotebookData } from "./extHostTypes/notebooks.js";
export class NotebookDiffEditorTabInput {
    constructor(original: any, modified: any, notebookType: any);
    original: any;
    modified: any;
    notebookType: any;
}
import { NotebookEdit } from "./extHostTypes/notebooks.js";
export var NotebookEditorRevealType: any;
export class NotebookEditorTabInput {
    constructor(uri: any, notebookType: any);
    uri: any;
    notebookType: any;
}
export class NotebookKernelSourceAction {
    constructor(label: any);
    label: any;
}
import { NotebookRange } from "./extHostTypes/notebooks.js";
export class NotebookRendererScript {
    constructor(uri: any, provides?: any[]);
    uri: any;
    provides: any[];
}
export var NotebookVariablesRequestKind: any;
export let ParameterInformation: {
    new (label: any, documentation: any): {
        label: any;
        documentation: any;
    };
};
export var PartialAcceptTriggerKind: any;
export class PortAttributes {
    constructor(autoForwardAction: any);
    _autoForwardAction: any;
    get autoForwardAction(): any;
}
export var PortAutoForwardAction: any;
import { Position } from "./extHostTypes/position.js";
export let ProcessExecution: {
    new (process: any, varg1: any, varg2: any): {
        _args: any[];
        _process: string;
        _options: any;
        get process(): string;
        set process(value: string);
        get args(): any[];
        set args(value: any[]);
        get options(): any;
        set options(value: any);
        computeId(): string;
    };
};
export var ProgressLocation: any;
export let PromptFileChatResource: {
    new (resource: any): {
        resource: any;
    };
};
export var QuickInputButtonLocation: any;
export let QuickInputButtons: {
    new (): {};
    Back: {
        iconPath: {
            id: any;
            color: any;
        };
    } | undefined;
};
export var QuickPickItemKind: any;
import { Range as Range2 } from "./extHostTypes/range.js";
export var RelatedInformationType: any;
export let RelativePattern: {
    new (base: any, pattern: any): {
        get base(): any;
        set base(base: any);
        _base: any;
        _baseUri: any;
        get baseUri(): any;
        set baseUri(baseUri: any);
        pattern: string;
        toJSON(): {
            pattern: string;
            base: any;
            baseUri: any;
        };
    };
};
export class RemoteAuthorityResolverError extends Error {
    static NotAvailable(message: any, handled: any): RemoteAuthorityResolverError;
    static TemporarilyNotAvailable(message: any): RemoteAuthorityResolverError;
    constructor(message: any, code: any, detail: any);
    _message: any;
    _code: any;
    _detail: any;
}
export class ResolvedAuthority {
    static isResolvedAuthority(resolvedAuthority: any): any;
    constructor(host: any, port: any, connectionToken: any);
    host: string;
    port: number;
    connectionToken: any;
}
import { Selection } from "./extHostTypes/selection.js";
export let SelectionRange: {
    new (range: any, parent: any): {
        range: any;
        parent: any;
    };
};
export class SemanticTokens {
    constructor(data: any, resultId: any);
    resultId: any;
    data: any;
}
export class SemanticTokensBuilder {
    static _sortAndDeltaEncode(data: any): Uint32Array<any>;
    constructor(legend: any);
    _prevLine: number;
    _prevChar: number;
    _dataIsSortedAndDeltaEncoded: boolean;
    _data: any[];
    _dataLen: number;
    _tokenTypeStrToInt: Map<any, any>;
    _tokenModifierStrToInt: Map<any, any>;
    _hasLegend: boolean;
    push(arg0: any, arg1: any, arg2: any, arg3: any, arg4: any): void;
    _push(range: any, tokenType: any, tokenModifiers: any): void;
    _pushEncoded(line: any, char: any, length: any, tokenType: any, tokenModifiers: any): void;
    build(resultId: any): SemanticTokens;
}
export class SemanticTokensEdit {
    constructor(start: any, deleteCount: any, data: any);
    start: any;
    deleteCount: any;
    data: any;
}
export class SemanticTokensEdits {
    constructor(edits: any, resultId: any);
    resultId: any;
    edits: any;
}
export class SemanticTokensLegend {
    constructor(tokenTypes: any, tokenModifiers?: any[]);
    tokenTypes: any;
    tokenModifiers: any[];
}
export var SettingsSearchResultKind: any;
export let ShellExecution: {
    new (arg0: any, arg1: any, arg2: any): {
        _args: any[];
        _command: any;
        _options: any;
        _commandLine: string | undefined;
        get commandLine(): string | undefined;
        set commandLine(value: string | undefined);
        get command(): any;
        set command(value: any);
        get args(): any[];
        set args(value: any[]);
        get options(): any;
        set options(value: any);
        computeId(): string;
    };
};
export var ShellQuoting: any;
export let SignatureHelp: {
    new (): {
        activeSignature: number;
        activeParameter: number;
        signatures: any[];
    };
};
export var SignatureHelpTriggerKind: any;
export let SignatureInformation: {
    new (label: any, documentation: any): {
        label: any;
        documentation: any;
        parameters: any[];
    };
};
export let SkillChatResource: {
    new (resource: any): {
        resource: any;
    };
};
import { SnippetString } from "./extHostTypes/snippetString.js";
import { SnippetTextEdit } from "./extHostTypes/snippetTextEdit.js";
export let SourceBreakpoint: {
    new (location: any, enabled: any, condition: any, hitCondition: any, logMessage: any, mode: any): {
        location: any;
        enabled: boolean;
        condition: string | undefined;
        hitCondition: string | undefined;
        logMessage: string | undefined;
        mode: string | undefined;
        get id(): any;
        _id: any;
    };
};
export var SourceControlInputBoxValidationType: any;
export var SpeechToTextStatus: any;
export var StandardTokenType: any;
export class StatementCoverage {
    constructor(executed: any, location: any, branches?: any[]);
    set executionCount(n: number);
    get executionCount(): number;
    executed: any;
    location: any;
    branches: any[];
}
export var StatusBarAlignment: any;
import { SymbolInformation } from "./extHostTypes/symbolInformation.js";
import { SymbolKind } from "./extHostTypes/symbolInformation.js";
import { SymbolTag } from "./extHostTypes/symbolInformation.js";
export var SyntaxTokenType: any;
export let Task: {
    new (definition: any, arg2: any, arg3: any, arg4: any, arg5: any, arg6: any): {
        __deprecated: boolean;
        _definition: any;
        get definition(): any;
        set definition(value: any);
        _name: any;
        get name(): any;
        set name(value: any);
        _source: any;
        get source(): any;
        set source(value: any);
        get execution(): any;
        set execution(value: any);
        set target(value: any);
        _problemMatchers: any[];
        _hasDefinedMatchers: boolean;
        _isBackground: boolean;
        _presentationOptions: any;
        _runOptions: any;
        get _id(): any;
        set _id(value: any);
        __id: any;
        get _deprecated(): boolean;
        clear(): void;
        computeDefinitionBasedOnExecution(): void;
        get scope(): any;
        _scope: any;
        _execution: any;
        get problemMatchers(): any[];
        set problemMatchers(value: any[]);
        get hasDefinedMatchers(): boolean;
        get isBackground(): boolean;
        set isBackground(value: boolean);
        get group(): any;
        set group(value: any);
        _group: any;
        get detail(): any;
        set detail(value: any);
        _detail: any;
        get presentationOptions(): any;
        set presentationOptions(value: any);
        get runOptions(): any;
        set runOptions(value: any);
    };
    ExtensionCallbackType: string | undefined;
    ProcessType: string | undefined;
    ShellType: string | undefined;
    EmptyType: string | undefined;
};
export var TaskEventKind: any;
export let TaskGroup: {
    new (id: any, label: any): {
        label: any;
        _id: string;
        get id(): string;
    };
    Clean: {
        label: any;
        _id: string;
        get id(): string;
    } | undefined;
    Build: {
        label: any;
        _id: string;
        get id(): string;
    } | undefined;
    Rebuild: {
        label: any;
        _id: string;
        get id(): string;
    } | undefined;
    Test: {
        label: any;
        _id: string;
        get id(): string;
    } | undefined;
    from(value: any): any;
};
export var TaskPanelKind: any;
export var TaskRevealKind: any;
export var TaskScope: any;
export class TerminalCompletionItem {
    constructor(label: any, replacementRange: any, kind: any, detail: any, documentation: any, isFile: any, isDirectory: any, isKeyword: any);
    label: any;
    replacementRange: any;
    kind: any;
    detail: any;
    documentation: any;
    isFile: any;
    isDirectory: any;
    isKeyword: any;
}
export var TerminalCompletionItemKind: any;
export class TerminalCompletionList {
    /**
     * Creates a new completion list.
     *
     * @param items The completion items.
     * @param isIncomplete The list is not complete.
     */
    constructor(items: any, resourceOptions: any);
    items: any;
    resourceOptions: any;
}
export class TerminalEditorTabInput {
}
export var TerminalExitReason: any;
export class TerminalLink {
    constructor(startIndex: any, length: any, tooltip: any);
    startIndex: any;
    length: any;
    tooltip: any;
}
export var TerminalLocation: any;
export var TerminalOutputAnchor: any;
export class TerminalProfile {
    constructor(options: any);
    options: any;
}
export class TerminalQuickFixCommand {
    constructor(terminalCommand: any);
    terminalCommand: any;
}
export class TerminalQuickFixOpener {
    constructor(uri: any);
    uri: any;
}
export var TerminalQuickFixType: any;
export var TerminalShellExecutionCommandLineConfidence: any;
export var TerminalShellType: any;
export class TestCoverageCount {
    constructor(covered: any, total: any);
    covered: any;
    total: any;
}
export let TestMessage: {
    new (message: any): {
        message: any;
    };
    diff(message: any, expected: any, actual: any): any;
};
export class TestMessageStackFrame {
    /**
     * @param label The name of the stack frame
     * @param file The file URI of the stack frame
     * @param position The position of the stack frame within the file
     */
    constructor(label: any, uri: any, position: any);
    label: any;
    uri: any;
    position: any;
}
export var TestResultState: any;
export class TestRunProfileBase {
    constructor(controllerId: any, profileId: any, kind: any);
    controllerId: any;
    profileId: any;
    kind: any;
}
export var TestRunProfileKind: any;
export let TestRunRequest: {
    new (include?: undefined, exclude?: undefined, profile?: undefined, continuous?: boolean, preserveFocus?: boolean): {
        include: any;
        exclude: any;
        profile: any;
        continuous: boolean;
        preserveFocus: boolean;
    };
};
export let TestTag: {
    new (id: any): {
        id: any;
    };
};
export class TextDiffTabInput {
    constructor(original: any, modified: any);
    original: any;
    modified: any;
}
export var TextDocumentChangeReason: any;
export var TextDocumentSaveReason: any;
import { TextEdit } from "./extHostTypes/textEdit.js";
export var TextEditorChangeKind: any;
export var TextEditorLineNumbersStyle: any;
export var TextEditorRevealType: any;
export var TextEditorSelectionChangeKind: any;
export class TextMergeTabInput {
    constructor(base: any, input1: any, input2: any, result: any);
    base: any;
    input1: any;
    input2: any;
    result: any;
}
export class TextMultiDiffTabInput {
    constructor(textDiffs: any);
    textDiffs: any;
}
export class TextTabInput {
    constructor(uri: any);
    uri: any;
}
export var TextToSpeechStatus: any;
export let ThemeColor: {
    new (id: any): {
        id: any;
    };
};
export let ThemeIcon: {
    new (id: any, color: any): {
        id: any;
        color: any;
    };
    isThemeIcon(thing: any): boolean;
    File: {
        id: any;
        color: any;
    };
    Folder: {
        id: any;
        color: any;
    };
};
export let TimelineItem: {
    new (label: any, timestamp: any): {
        label: any;
        timestamp: any;
    };
};
export let TreeItem: {
    new (arg1: any, collapsibleState?: any): {
        collapsibleState: any;
        resourceUri: any;
        label: any;
    };
    isTreeItem(thing: any, extension: any): boolean;
};
export var TreeItemCheckboxState: any;
export var TreeItemCollapsibleState: any;
export class TypeHierarchyItem {
    constructor(kind: any, name: any, detail: any, uri: any, range: any, selectionRange: any);
    kind: any;
    name: any;
    detail: any;
    uri: any;
    range: any;
    selectionRange: any;
}
export let VerboseHover: {
    new (contents: any, range: any, canIncreaseVerbosity: any, canDecreaseVerbosity: any): {
        canIncreaseVerbosity: any;
        canDecreaseVerbosity: any;
        contents: any[];
        range: any;
    };
};
export var ViewBadge: any;
export var ViewColumn: any;
export class WebviewEditorTabInput {
    constructor(viewType: any);
    viewType: any;
}
import { WorkspaceEdit } from "./extHostTypes/workspaceEdit.js";
export var WorkspaceTrustState: any;
export function asStatusBarItemIdentifier(extension: any, id: any): string;
export function setBreakpointId(bp: any, id: any): void;
export function validateTestCoverageCount(cc: any): void;
export { CodeActionKind, Diagnostic, DiagnosticRelatedInformation, DiagnosticSeverity, DiagnosticTag, EndOfLine, FileEditType, Location, MarkdownString2 as MarkdownString, NotebookCellData, NotebookCellKind, NotebookCellOutput, NotebookCellOutputItem, NotebookData, NotebookEdit, NotebookRange, Position, Range2 as Range, Selection, SnippetString, SnippetTextEdit, SymbolInformation, SymbolKind, SymbolTag, TextEdit, WorkspaceEdit };
//# sourceMappingURL=extHostTypes.d.ts.map