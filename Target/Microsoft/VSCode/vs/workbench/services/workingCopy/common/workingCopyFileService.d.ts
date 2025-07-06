declare const b: any;
declare let m: {
    new (t: any, r: any, e: any, a: any): {
        g: any;
        h: any;
        j: any;
        a: any;
        onWillRunWorkingCopyFileOperation: any;
        b: any;
        onDidFailWorkingCopyFileOperation: any;
        c: any;
        onDidRunWorkingCopyFileOperation: any;
        f: number;
        t: any[];
        n: any;
        s: any;
        create(t: any, r: any, e: any): Promise<any>;
        createFolder(t: any, r: any, e: any): Promise<any>;
        doCreateFileOrFolder(t: any, r: any, e: any, a: any): Promise<any>;
        move(t: any, r: any, e: any): Promise<any[]>;
        copy(t: any, r: any, e: any): Promise<any[]>;
        m(t: any, r: any, e: any, a: any): Promise<any[]>;
        delete(t: any, r: any, e: any): Promise<void>;
        addFileOperationParticipant(t: any): any;
        r(t: any, r: any, e: any, a: any): any;
        readonly hasSaveParticipants: boolean;
        addSaveParticipant(t: any): any;
        runSaveParticipants(t: any, r: any, e: any, a: any): any;
        registerWorkingCopyProvider(t: any): any;
        getDirty(t: any): any[];
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { b as $FJ, m as $GJ };
//# sourceMappingURL=workingCopyFileService.d.ts.map