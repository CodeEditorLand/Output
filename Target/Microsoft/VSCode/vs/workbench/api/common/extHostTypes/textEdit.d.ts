export var EndOfLine: any;
export let TextEdit: {
    new (range: any, newText: any): {
        get range(): any;
        set range(value: any);
        _range: any;
        get newText(): any;
        set newText(value: any);
        _newText: any;
        get newEol(): any;
        set newEol(value: any);
        _newEol: any;
        toJSON(): {
            range: any;
            newText: any;
            newEol: any;
        };
    };
    isTextEdit(thing: any): boolean;
    replace(range: any, newText: any): any;
    insert(position: any, newText: any): any;
    delete(range: any): any;
    setEndOfLine(eol: any): any;
};
//# sourceMappingURL=textEdit.d.ts.map