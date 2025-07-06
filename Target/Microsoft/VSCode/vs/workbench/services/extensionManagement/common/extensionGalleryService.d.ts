export { $ as $B6b };
declare let $: {
    new (o: any, m: any, f: any, p: any, t: any, e: any, n: any, c: any, l: any, u: any, _: any): {
        k: any;
        l: any;
        n: any;
        o: any;
        q: any;
        u: any;
        w: any;
        x: any;
        y: any;
        z: any;
        d: any;
        g: any;
        j: any;
        h: Promise<{
            "X-Market-Client-Id": string;
            "User-Agent": string;
        }>;
        isEnabled(): any;
        getExtensions(e: any, t: any, s: any): Promise<any>;
        A(e: any, t: any): Promise<{
            uri: any;
            fallback: any;
        } | {
            uri: any;
            fallback?: never;
        } | undefined>;
        B(e: any, t: any, s: any, i: any): Promise<any>;
        C(e: any, t: any, s: any, i: any, n: any): Promise<any[]>;
        D(e: any, t: any, s: any, i: any, n: any): Promise<{
            type: string;
            identifier: {
                id: any;
                uuid: any;
            };
            name: any;
            version: any;
            displayName: any;
            publisherId: any;
            publisher: any;
            publisherDisplayName: any;
            publisherDomain: {
                link: any;
                verified: boolean;
            } | undefined;
            publisherSponsorLink: any;
            description: any;
            installCount: any;
            rating: any;
            ratingCount: any;
            categories: any;
            tags: any;
            releaseDate: number;
            lastUpdated: number;
            allTargetPlatforms: any;
            assets: {
                manifest: {
                    uri: string;
                    fallbackUri: string;
                } | null;
                readme: {
                    uri: string;
                    fallbackUri: string;
                } | null;
                changelog: {
                    uri: string;
                    fallbackUri: string;
                } | null;
                license: {
                    uri: string;
                    fallbackUri: string;
                } | null;
                repository: {
                    uri: any;
                    fallbackUri: any;
                } | null;
                download: {
                    uri: string;
                    fallbackUri: string;
                };
                icon: {
                    uri: string;
                    fallbackUri: string;
                } | null;
                signature: {
                    uri: string;
                    fallbackUri: string;
                } | null;
                coreTranslations: any;
            };
            properties: {
                dependencies: any;
                extensionPack: any;
                engine: any;
                enabledApiProposals: any;
                localizedLanguages: any;
                targetPlatform: string;
                isPreReleaseVersion: boolean;
                executesCode: boolean | undefined;
            };
            hasPreReleaseVersion: any;
            hasReleaseVersion: boolean;
            private: boolean;
            preview: boolean;
            isSigned: boolean;
            queryContext: any;
            supportLink: any;
            detailsLink: any;
            publisherLink: any;
            ratingLink: any;
        } | "NOT_FOUND" | null>;
        getCompatibleExtension(e: any, t: any, s: any, i?: {
            version: any;
            date: any;
        }): Promise<any>;
        isExtensionCompatible(e: any, t: any, s: any, i?: {
            version: any;
            date: any;
        }): Promise<boolean>;
        E(e: any, { targetPlatform: t, compatible: s, productVersion: i, version: n }: {
            targetPlatform: any;
            compatible: any;
            productVersion: any;
            version: any;
        }, a: any, c: any): Promise<boolean>;
        F(e: any, t: any): boolean;
        G(e: any, t: any, s: any, i: any, n: any): Promise<boolean>;
        query(e: any, t: any): Promise<{
            firstPage: any;
            total: any;
            pageSize: number;
            getPage: (l: any, h: any) => Promise<any>;
        }>;
        H(e: any, t: any, s: any, i: any): any;
        I(e: any, t: any, s: any, i: any): any;
        J(e: any, t: any, s: any, i: any): Promise<{
            extensions: {
                type: string;
                identifier: {
                    id: any;
                    uuid: any;
                };
                name: any;
                version: any;
                displayName: any;
                publisherId: any;
                publisher: any;
                publisherDisplayName: any;
                publisherDomain: {
                    link: any;
                    verified: boolean;
                } | undefined;
                publisherSponsorLink: any;
                description: any;
                installCount: any;
                rating: any;
                ratingCount: any;
                categories: any;
                tags: any;
                releaseDate: number;
                lastUpdated: number;
                allTargetPlatforms: any;
                assets: {
                    manifest: {
                        uri: string;
                        fallbackUri: string;
                    } | null;
                    readme: {
                        uri: string;
                        fallbackUri: string;
                    } | null;
                    changelog: {
                        uri: string;
                        fallbackUri: string;
                    } | null;
                    license: {
                        uri: string;
                        fallbackUri: string;
                    } | null;
                    repository: {
                        uri: any;
                        fallbackUri: any;
                    } | null;
                    download: {
                        uri: string;
                        fallbackUri: string;
                    };
                    icon: {
                        uri: string;
                        fallbackUri: string;
                    } | null;
                    signature: {
                        uri: string;
                        fallbackUri: string;
                    } | null;
                    coreTranslations: any;
                };
                properties: {
                    dependencies: any;
                    extensionPack: any;
                    engine: any;
                    enabledApiProposals: any;
                    localizedLanguages: any;
                    targetPlatform: string;
                    isPreReleaseVersion: boolean;
                    executesCode: boolean | undefined;
                };
                hasPreReleaseVersion: any;
                hasReleaseVersion: boolean;
                private: boolean;
                preview: boolean;
                isSigned: boolean;
                queryContext: any;
                supportLink: any;
                detailsLink: any;
                publisherLink: any;
                ratingLink: any;
            }[];
            total: number;
        }>;
        K(e: any, t: any, s: any): Promise<any>;
        L(e: any, t: any, s: any): Promise<{
            galleryExtensions: never[];
            total: number;
            context?: never;
        } | {
            galleryExtensions: any;
            total: number;
            context: {
                "X-Market-Search-Activity-Id": any;
            } | {
                "X-Market-Search-Activity-Id"?: never;
            };
        }>;
        M(e: any, t: any): import("../../../../platform/telemetry/common/telemetryUtils.js").$Cu | undefined;
        N(e: any, t: any, s: any): Promise<any>;
        reportStatistic(e: any, t: any, s: any, i: any): Promise<void>;
        download(e: any, t: any, s: any): Promise<void>;
        downloadSignatureArchive(e: any, t: any): Promise<void>;
        getReadme(e: any, t: any): Promise<any>;
        getManifest(e: any, t: any): Promise<any>;
        getCoreTranslation(e: any, t: any): Promise<any>;
        getChangelog(e: any, t: any): Promise<any>;
        getAllVersions(e: any): Promise<{
            version: any;
            date: any;
            isPreReleaseVersion: boolean;
        }[]>;
        getAllCompatibleVersions(e: any, t: any, s: any): Promise<{
            version: any;
            date: any;
            isPreReleaseVersion: boolean;
        }[]>;
        O(e: any, t: any): Promise<{
            version: any;
            date: any;
            isPreReleaseVersion: boolean;
        }[]>;
        P(e: any, t: any, s: any, i: any, n?: {}, a?: any): Promise<any>;
        getExtensionsControlManifest(): Promise<{
            malicious: {
                extensionOrPublisher: string | {
                    id: string;
                };
                learnMoreLink: any;
            }[];
            deprecated: {};
            search: any[];
            autoUpdate: any;
        }>;
    };
};
//# sourceMappingURL=extensionGalleryService.d.ts.map