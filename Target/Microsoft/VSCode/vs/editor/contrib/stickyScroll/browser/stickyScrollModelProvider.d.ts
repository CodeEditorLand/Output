export { D as $_pb };
declare let D: {
    new (e: any, t: any, n: any, r: any): {
        g: any;
        a: ({
            m: any;
            h(e: any): any;
            j(e: any, t: any): M;
            f(e: any): any;
            t(e: any, t: any): {
                stickyOutlineElement: b;
                providerID: any;
            };
            u(e: any, t: any): any;
            w(e: any, t: any): number;
            y(e: any): number;
            b: any;
            a: any;
            readonly stickyModel: any;
            c(): any;
            computeStickyModel(e: any): {
                statusPromise: any;
                modelPromise: null;
            } | {
                statusPromise: Promise<any>;
                modelPromise: {
                    cancel(): void;
                    then(r: any, h: any): Promise<any>;
                    catch(r: any): Promise<any>;
                    finally(r: any): Promise<any>;
                };
            };
            g(): boolean;
            q: $;
            dispose(): void;
            B(t: any): any;
        } | {
            u: any;
            t: any;
            w(e: any, t: any): void;
            g(): boolean;
            h(e: any): Promise<any>;
            m: any;
            j(e: any, t: any): M;
            f(e: any): boolean;
            s(e: any): b;
            b: any;
            a: any;
            readonly stickyModel: any;
            c(): any;
            computeStickyModel(e: any): {
                statusPromise: any;
                modelPromise: null;
            } | {
                statusPromise: Promise<any>;
                modelPromise: {
                    cancel(): void;
                    then(r: any, h: any): Promise<any>;
                    catch(r: any): Promise<any>;
                    finally(r: any): Promise<any>;
                };
            };
            q: $;
            dispose(): void;
            B(t: any): any;
        } | {
            u: any;
            t: any;
            h(e: any): Promise<any>;
            m: any;
            j(e: any, t: any): M;
            f(e: any): boolean;
            s(e: any): b;
            b: any;
            a: any;
            readonly stickyModel: any;
            c(): any;
            computeStickyModel(e: any): {
                statusPromise: any;
                modelPromise: null;
            } | {
                statusPromise: Promise<any>;
                modelPromise: {
                    cancel(): void;
                    then(r: any, h: any): Promise<any>;
                    catch(r: any): Promise<any>;
                    finally(r: any): Promise<any>;
                };
            };
            g(): boolean;
            q: $;
            dispose(): void;
            B(t: any): any;
        })[];
        b: {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        } | null;
        c: any;
        f: any;
        dispose(): void;
        h(): void;
        update(e: any): Promise<any>;
        q: $;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $$pb as M } from "./stickyScrollElement.js";
import { $0pb as b } from "./stickyScrollElement.js";
import { $ud as $ } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=stickyScrollModelProvider.d.ts.map