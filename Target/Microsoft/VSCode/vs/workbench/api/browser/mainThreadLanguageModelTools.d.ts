export { l as $fXb };
declare let l: {
    new (e: any, t: any): {
        f: any;
        b: any;
        c: Map<any, any>;
        a: any;
        g(): {
            id: any;
            displayName: any;
            toolReferenceName: any;
            tags: any;
            userDescription: any;
            modelDescription: any;
            inputSchema: any;
        }[];
        $getTools(): Promise<{
            id: any;
            displayName: any;
            toolReferenceName: any;
            tags: any;
            userDescription: any;
            modelDescription: any;
            inputSchema: any;
        }[]>;
        $invokeTool(e: any, t: any): Promise<c | {
            content: any;
        }>;
        $acceptToolProgress(e: any, t: any): void;
        $countTokensForInvocation(e: any, t: any, o: any): any;
        $registerTool(e: any): void;
        $unregisterTool(e: any): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $XX as c } from "../../services/extensions/common/proxyIdentifier.js";
//# sourceMappingURL=mainThreadLanguageModelTools.d.ts.map