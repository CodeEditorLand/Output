export { m as $rCc };
declare const m_base: {
    new (e: any, t: any, i: any, r: any, a: any, l: any, o: any, c: any, S: any, p: any, h: any, w: any, m: any, b: any, F: any, x: any, U: any): {
        a: any;
        b: any;
        c: any;
        d: any;
        f: any;
        g: any;
        h: any;
        i: any;
        j: any;
        k: any;
        l: any;
        m: any;
        n: any;
        o: any;
        p: any;
        q: any;
        r: any;
        defaultFilePath(e?: any, t?: any): Promise<any>;
        defaultFolderPath(e?: any, t?: any): Promise<any>;
        preferredHome(e?: any): Promise<any>;
        defaultWorkspacePath(e?: any): Promise<any>;
        showSaveConfirm(e: any): Promise<any>;
        s(): boolean;
        t(e: any): Promise<any>;
        u(e: any, t: any): any[];
        v(e: any, t: any, i: any): Promise<void>;
        w(e: any, t: any, i: any): Promise<void>;
        x(e: any): void;
        y(e: any, t: any): Promise<any>;
        z(e: any, t: any): Promise<any>;
        A(e: any, t: any): Promise<any>;
        B(e: any, t: any): Promise<any>;
        C(e: any, t: any): Promise<any[] | undefined>;
        D(): any;
        E(e: any): any;
        F(e: any): any;
        G(e: any): any;
        H(): any;
        I(e: any): any;
        J(e: any): any;
        K(e: any, t: any): {
            defaultUri: any;
            title: any;
            availableFileSystems: any;
        };
    };
};
declare class m extends m_base {
    get L(): any;
    pickFileFolderAndOpen(e: any): Promise<void>;
    pickFileAndOpen(e: any): Promise<void>;
    pickFolderAndOpen(e: any): Promise<any>;
    pickWorkspaceAndOpen(e: any): Promise<any>;
    pickFileToSave(e: any, t: any): Promise<any>;
    N(e: any): any;
    showSaveDialog(e: any): Promise<any>;
    showOpenDialog(e: any): Promise<void | any[]>;
    O(e: any): Promise<void>;
    P(e: any): boolean;
}
//# sourceMappingURL=fileDialogService.d.ts.map