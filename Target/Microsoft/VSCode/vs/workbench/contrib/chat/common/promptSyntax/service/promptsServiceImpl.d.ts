declare let w: {
    new (t: any, e: any, s: any, r: any, o: any, i: any, a: any): {
        logger: any;
        g: any;
        h: any;
        j: any;
        m: any;
        n: any;
        r: any;
        b: any;
        a: any;
        readonly onDidChangeCustomChatModes: any;
        f: any;
        getPromptFileType(t: any): any;
        getSyntaxParserFor(t: any): any;
        listPromptFiles(t: any, e: any): Promise<any[]>;
        getSourceFolders(t: any): {
            uri: any;
            storage: string;
            type: any;
        }[];
        asPromptSlashCommand(t: any): {
            command: any;
            detail: any;
        } | undefined;
        resolvePromptSlashCommand(t: any, e: any): Promise<{
            uri: any;
            metadata: any;
            topError: any;
            references: any;
        } | undefined>;
        s(t: any): Promise<any>;
        findPromptSlashCommands(): Promise<{
            command: any;
            detail: any;
            promptPath: any;
        }[]>;
        getCustomChatModes(t: any): Promise<{
            uri: any;
            name: any;
            description: any;
            tools: any;
            model: any;
            body: any;
        }[]>;
        c: Promise<{
            uri: any;
            name: any;
            description: any;
            tools: any;
            model: any;
            body: any;
        }[]> | undefined;
        t(t: any): Promise<{
            uri: any;
            name: any;
            description: any;
            tools: any;
            model: any;
            body: any;
        }[]>;
        parse(t: any, e: any, s: any): Promise<{
            uri: any;
            metadata: any;
            topError: any;
            references: any;
        }>;
        q: import("../../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function f(n: any): any;
export { w as $ffc, f as $gfc };
//# sourceMappingURL=promptsServiceImpl.d.ts.map