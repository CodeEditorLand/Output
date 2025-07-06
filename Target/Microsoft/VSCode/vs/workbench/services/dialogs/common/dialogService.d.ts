export { l as $O5b };
declare let l: {
    new (t: any, e: any): {
        a: any;
        b: any;
        model: any;
        onWillShowDialog: any;
        onDidShowDialog: any;
        c(): boolean;
        confirm(t: any): Promise<any>;
        prompt(t: any): Promise<{
            result: any;
            checkboxChecked: any;
        }>;
        input(t: any): Promise<any>;
        info(t: any, e: any): Promise<void>;
        warn(t: any, e: any): Promise<void>;
        error(t: any, e: any): Promise<void>;
        about(): Promise<void>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=dialogService.d.ts.map