declare function V(i: any): boolean;
declare function me(i: any): {
    pattern: string;
    uri?: never;
} | {
    pattern: any;
    uri: any;
};
declare let E: {
    new (e: any, r: any, n: any, t: any, s: any, o: any): {
        a: any;
        b: any;
        c: any;
        d: any;
        f: any;
        g: any;
        aiText(e: any, r: any, n?: {}): {
            type: number;
            contentPattern: any;
            _reason: any;
            folderQueries: any;
            usingSearchPaths: boolean;
            extraFileResources: any;
            excludePattern: any;
            includePattern: any;
            onlyOpenEditors: any;
            maxResults: any;
            onlyFileScheme: any;
        };
        text(e: any, r: any, n?: {}): {
            type: number;
            contentPattern: any;
            previewOptions: any;
            maxFileSize: any;
            usePCRE2: any;
            surroundingContext: any;
            userDisabledExcludesAndIgnoreFiles: any;
            _reason: any;
            folderQueries: any;
            usingSearchPaths: boolean;
            extraFileResources: any;
            excludePattern: any;
            includePattern: any;
            onlyOpenEditors: any;
            maxResults: any;
            onlyFileScheme: any;
        };
        h(e: any, r: any): any;
        file(e: any, r?: {}): {
            type: number;
            filePattern: any;
            exists: any;
            sortByScore: any;
            cacheKey: any;
            shouldGlobMatchFilePattern: any;
            _reason: any;
            folderQueries: any;
            usingSearchPaths: boolean;
            extraFileResources: any;
            excludePattern: any;
            includePattern: any;
            onlyOpenEditors: any;
            maxResults: any;
            onlyFileScheme: any;
        };
        i(e: any, r: any): {
            searchPaths: any[];
            pattern: any;
        } | {
            pattern?: never;
        } | {
            pattern: any;
        };
        j(e?: any[], r?: {}): {
            _reason: any;
            folderQueries: any;
            usingSearchPaths: boolean;
            extraFileResources: any;
            excludePattern: any;
            includePattern: any;
            onlyOpenEditors: any;
            maxResults: any;
            onlyFileScheme: any;
        };
        k(e: any): {
            folderQueries: any[];
            includePattern: {};
            usingSearchPaths: boolean;
            excludePattern: {
                "**/*": boolean;
            } | undefined;
        };
        l(e: any, r: any): boolean;
        m(e: any): boolean;
        parseSearchPaths(e: any): {
            searchPaths: any[];
            pattern: any;
        };
        n(e: any, r: any): any;
        o(e: any): any[];
        q(e: any): any;
        r(e: any, r: any): {
            searchPath: any;
            pattern: any;
        }[];
        t(e: any, r: any, n: any): {
            includePattern: any;
            folder: any;
            folderName: any;
            excludePattern: any;
            fileEncoding: any;
            disregardIgnoreFiles: any;
            disregardGlobalIgnoreFiles: any;
            disregardParentIgnoreFiles: any;
            ignoreSymlinks: any;
        } | null;
        u(e: any, r: any, n: any, t: any): {
            folder: any;
            folderName: any;
            excludePattern: any;
            fileEncoding: any;
            disregardIgnoreFiles: any;
            disregardGlobalIgnoreFiles: any;
            disregardParentIgnoreFiles: any;
            ignoreSymlinks: any;
        } | null;
    };
};
declare function ge(i: any, e: any): any[];
export { V as $EY, me as $FY, E as $GY, ge as $HY };
//# sourceMappingURL=queryBuilder.d.ts.map