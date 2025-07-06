declare const I: any;
declare const O: any;
declare let g: {
    new (e: any, t: any, r: any): {
        f: any;
        g: any;
        h: any;
        a: w;
        b: Map<any, any>;
        c: Set<any>;
        d: any;
        onDidChangeLanguageModels: any;
        e: any;
        dispose(): void;
        getLanguageModelIds(): any[];
        lookupLanguageModel(e: any): any;
        selectLanguageModels(e: any): Promise<any[]>;
        registerLanguageModelChat(e: any, t: any): any;
        i(): void;
        sendChatRequest(e: any, t: any, r: any, n: any, i: any): Promise<any>;
        computeTokenLength(e: any, t: any, r: any): any;
    };
};
declare var f: any;
declare var h: any;
declare var c: any;
declare var u: any;
import { $ud as w } from "../../../../base/common/lifecycle.js";
export { I as $eP, O as $fP, g as $gP, f as ChatImageMimeType, h as ChatMessageRole, c as ILanguageModelChatMetadata, u as ImageDetailLevel };
//# sourceMappingURL=languageModels.d.ts.map