export { A as $qjc };
declare let A: {
    new (e: any, t: any, n: any, i: any, s: any, o: any, r: any, l: any, p: any, h: any, u: any): {
        readonly ignoredRecommendations: any;
        j: any;
        m: any;
        n: any;
        s: any;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        C: any;
        D: any;
        a: any[];
        b: any[];
        h: any[];
        hasToIgnoreRecommendationNotifications(): any;
        promptImportantExtensionsInstallNotification(e: any): Promise<any>;
        promptWorkspaceRecommendations(e: any): Promise<void>;
        F({ extensions: e, source: t, name: n, searchValue: i }: {
            extensions: any;
            source: any;
            name: any;
            searchValue: any;
        }, s: any): Promise<any>;
        G(e: any, t: any, n: any, i: any, s: any, { onDidInstallRecommendedExtensions: o, onDidShowRecommendedExtensions: r, onDidCancelRecommendedExtensions: l, onDidNeverShowRecommendedExtensionsAgain: p }: {
            onDidInstallRecommendedExtensions: any;
            onDidShowRecommendedExtensions: any;
            onDidCancelRecommendedExtensions: any;
            onDidNeverShowRecommendedExtensionsAgain: any;
        }): {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        };
        H(e: any): {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        };
        I(e: any, t: any, n: any, i: any, s: any): Promise<boolean>;
        g: {
            recommendationsNotification: any;
            source: any;
            from: number;
        } | {
            recommendationsNotification: any;
            source: any;
            from: number;
        } | undefined;
        J(): void;
        L(): number;
        M(e: any): void;
        f: Promise<any> | {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        } | undefined;
        N(): void;
        O(e: any): Promise<any[]>;
        P(e: any): void;
        Q(e: any): void;
        R(e: any): any;
        q: S;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as S } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=extensionRecommendationNotificationService.d.ts.map