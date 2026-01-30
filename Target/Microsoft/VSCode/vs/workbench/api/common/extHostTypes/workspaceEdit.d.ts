export var FileEditType: any;
export let WorkspaceEdit: {
    new (): {
        _edits: any[];
        _allEntries(): any[];
        renameFile(from: any, to: any, options: any, metadata: any): void;
        createFile(uri: any, options: any, metadata: any): void;
        deleteFile(uri: any, options: any, metadata: any): void;
        replaceNotebookMetadata(uri: any, value: any, metadata: any): void;
        replaceNotebookCells(uri: any, startOrRange: any, cellData: any, metadata: any): void;
        replaceNotebookCellMetadata(uri: any, index: any, cellMetadata: any, metadata: any): void;
        replace(uri: any, range: any, newText: any, metadata: any): void;
        insert(resource: any, position: any, newText: any, metadata: any): void;
        delete(resource: any, range: any, metadata: any): void;
        has(uri: any): boolean;
        set(uri: any, edits: any): void;
        get(uri: any): any[];
        entries(): any[];
        get size(): number;
        toJSON(): any[];
    };
};
//# sourceMappingURL=workspaceEdit.d.ts.map