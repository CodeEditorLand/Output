declare class f {
    static fromBaseColor(t: any, e: any): f;
    constructor(t: any, e: any, o: any, i: any);
    owner: any;
    range: any;
    model: any;
    provider: any;
}
declare class v extends $ {
    constructor(t: any, e: any, o: any, i: any);
    color: any;
    colorPicker: any;
}
declare let u: {
    new (t: any, e: any): {
        b: any;
        c: any;
        hoverOrdinal: number;
        createColorHover(t: any, e: any, o: any): Promise<{
            colorHover: f;
            foundInEditor: boolean;
        } | null>;
        updateEditorModel(t: any): Promise<void>;
        renderHoverParts(t: any, e: any): v | undefined;
        a: v | undefined;
        d(t: any): void;
        readonly f: any;
    };
};
import { $vd as $ } from "../../../../../base/common/lifecycle.js";
export { f as $Qnb, v as $Rnb, u as $Snb };
//# sourceMappingURL=standaloneColorPickerParticipant.d.ts.map