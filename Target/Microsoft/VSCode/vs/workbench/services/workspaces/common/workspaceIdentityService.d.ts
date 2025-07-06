declare const v: any;
declare let m: {
    new (t: any, r: any): {
        a: any;
        b: any;
        getWorkspaceStateFolders(t: any): Promise<{
            resourceUri: any;
            workspaceFolderIdentity: any;
        }[]>;
        matches(t: any, r: any): Promise<false | ((e: any, n?: number) => any)>;
    };
};
export { v as $vyc, m as $wyc };
//# sourceMappingURL=workspaceIdentityService.d.ts.map