declare const v: "vscode_editFile_internal";
declare namespace D {
    export { v as id };
    export let displayName: string;
    export let modelDescription: string;
    export let source: any;
}
declare let R: {
    new (e: any, s: any, n: any): {
        a: any;
        b: any;
        c: any;
        invoke(e: any, s: any, n: any, a: any): Promise<{
            content: {
                kind: string;
                value: string;
            }[];
        }>;
        prepareToolInvocation(e: any, s: any): Promise<{
            presentation: string;
        }>;
    };
};
declare const z: "vscode_editFile";
export { v as $Afc, D as $Bfc, R as $Cfc, z as $zfc };
//# sourceMappingURL=editFileTool.d.ts.map