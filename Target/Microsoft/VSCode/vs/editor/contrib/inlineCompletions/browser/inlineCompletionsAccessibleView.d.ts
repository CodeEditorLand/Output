export { E as $erb };
declare class E {
    type: string;
    priority: number;
    name: string;
    when: any;
    getProvider(e: any): g | undefined;
}
declare class g extends d {
    constructor(e: any, t: any);
    b: any;
    c: any;
    a: any;
    onDidChangeContent: any;
    id: string;
    verbositySettingKey: string;
    options: {
        language: any;
        type: string;
    };
    provideContent(): any;
    provideNextContent(): void;
    providePreviousContent(): void;
    onClose(): void;
}
import { $vd as d } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=inlineCompletionsAccessibleView.d.ts.map