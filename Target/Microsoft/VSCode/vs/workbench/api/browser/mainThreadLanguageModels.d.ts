export { v as $JAb };
declare let v: {
    new (e: any, s: any, t: any, o: any, i: any, a: any, n: any, h: any): {
        g: any;
        h: any;
        i: any;
        j: any;
        k: any;
        l: any;
        m: any;
        b: f;
        c: $;
        d: Map<any, any>;
        f: $;
        a: any;
        dispose(): void;
        $registerLanguageModelProvider(e: any, s: any, t: any): void;
        $reportResponsePart(e: any, s: any): Promise<void>;
        $reportResponseDone(e: any, s: any): Promise<void>;
        $unregisterProvider(e: any): void;
        $selectChatModels(e: any): any;
        $whenLanguageModelChatRequestMade(e: any, s: any, t: any, o: any): void;
        $tryStartChatRequest(e: any, s: any, t: any, o: any, i: any, a: any): Promise<void>;
        $countTokens(e: any, s: any, t: any): any;
        n(e: any, s: any): Readonly<{
            dispose(): void;
        }> | undefined;
        $fileIsIgnored(e: any, s: any): any;
        $registerFileIgnoreProvider(e: any): void;
        $unregisterFileIgnoreProvider(e: any): void;
    };
};
import { $ud as f } from "../../../base/common/lifecycle.js";
import { $Ed as $ } from "../../../base/common/lifecycle.js";
//# sourceMappingURL=mainThreadLanguageModels.d.ts.map