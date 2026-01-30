export class NotebookCellData {
    static validate(data: any): void;
    static isNotebookCellDataArray(value: any): boolean;
    static isNotebookCellData(value: any): boolean;
    constructor(kind: any, value: any, languageId: any, mime: any, outputs: any, metadata: any, executionSummary: any);
    kind: any;
    value: any;
    languageId: any;
    mime: any;
    outputs: any;
    metadata: any;
    executionSummary: any;
}
export var NotebookCellKind: any;
export class NotebookCellOutput {
    static isNotebookCellOutput(candidate: any): boolean;
    static ensureUniqueMimeTypes(items: any, warn?: boolean): any;
    constructor(items: any, idOrMetadata: any, metadata: any);
    items: any;
    id: any;
    metadata: any;
}
export class NotebookCellOutputItem {
    static isNotebookCellOutputItem(obj: any): boolean;
    static error(err: any): NotebookCellOutputItem;
    static stdout(value: any): NotebookCellOutputItem;
    static stderr(value: any): NotebookCellOutputItem;
    static bytes(value: any, mime?: string): NotebookCellOutputItem;
    static "__#private@#encoder": TextEncoder;
    static text(value: any, mime?: "text/plain"): NotebookCellOutputItem;
    static json(value: any, mime?: string): NotebookCellOutputItem;
    constructor(data: any, mime: any);
    data: any;
    mime: string;
}
export class NotebookData {
    constructor(cells: any);
    cells: any;
}
export let NotebookEdit: {
    new (range: any, newCells: any): {
        range: any;
        newCells: any;
    };
    isNotebookCellEdit(thing: any): boolean;
    replaceCells(range: any, newCells: any): any;
    insertCells(index: any, newCells: any): any;
    deleteCells(range: any): any;
    updateCellMetadata(index: any, newMetadata: any): any;
    updateNotebookMetadata(newMetadata: any): any;
};
export class NotebookRange {
    static isNotebookRange(thing: any): boolean;
    constructor(start: any, end: any);
    get start(): any;
    get end(): any;
    get isEmpty(): boolean;
    _start: any;
    _end: any;
    with(change: any): NotebookRange;
}
//# sourceMappingURL=notebooks.d.ts.map