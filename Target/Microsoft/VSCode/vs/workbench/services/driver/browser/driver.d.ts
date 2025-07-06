declare let d: {
    new (t: any, r: any, e: any, n: any): {
        a: any;
        b: any;
        d: any;
        e: any;
        getLogs(): Promise<any[]>;
        whenWorkbenchRestored(): Promise<void>;
        setValue(t: any, r: any): Promise<undefined>;
        isActiveElement(t: any): Promise<boolean>;
        getElements(t: any, r: any): Promise<any[]>;
        f(t: any, r: any): any;
        getElementXY(t: any, r: any, e: any): Promise<{
            x: number;
            y: number;
        }>;
        typeInEditor(t: any, r: any): Promise<void>;
        getEditorSelection(t: any): Promise<{
            selectionStart: any;
            selectionEnd: any;
        }>;
        getTerminalBuffer(t: any): Promise<any[]>;
        writeInTerminal(t: any, r: any): Promise<void>;
        getLocaleInfo(): Promise<{
            language: string;
            locale: any;
        }>;
        getLocalizedStrings(): Promise<{
            open: any;
            close: any;
            find: any;
        }>;
        g(t: any, r: any): Promise<{
            x: number;
            y: number;
        }>;
    };
};
declare function B(l: any): void;
export { d as $Cxb, B as $Dxb };
//# sourceMappingURL=driver.d.ts.map