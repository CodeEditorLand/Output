export let SnippetString: {
    new (value: any): {
        _tabstop: number;
        value: any;
        appendText(string: any): /*elided*/ any;
        appendTabstop(number?: number): /*elided*/ any;
        appendPlaceholder(value: any, number?: number): /*elided*/ any;
        appendChoice(values: any, number?: number): /*elided*/ any;
        appendVariable(name: any, defaultValue: any): /*elided*/ any;
    };
    isSnippetString(thing: any): boolean;
    _escape(value: any): any;
};
//# sourceMappingURL=snippetString.d.ts.map