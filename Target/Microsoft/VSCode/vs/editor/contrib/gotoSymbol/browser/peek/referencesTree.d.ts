declare let $: {
    new (e: any): {
        a: any;
        hasChildren(e: any): e is h | g;
        getChildren(e: any): Promise<any[]> | h[];
    };
};
declare class V {
    getHeight(): number;
    getTemplateId(e: any): string | undefined;
}
declare let v: {
    new (e: any): {
        a: any;
        getKeyboardNavigationLabel(e: any): any;
        mightProducePrintableCharacter(e: any): any;
    };
};
declare class Y {
    getId(e: any): any;
}
declare let d: {
    new (e: any): {
        a: any;
        templateId: any;
        renderTemplate(e: any): any;
        renderElement(e: any, t: any, r: any): void;
        disposeTemplate(e: any): void;
    };
    id: string | undefined;
};
declare class m {
    templateId: string | undefined;
    renderTemplate(e: any): D;
    renderElement(e: any, t: any, r: any): void;
    disposeTemplate(e: any): void;
}
declare class ee {
    getWidgetAriaLabel(): any;
    getAriaLabel(e: any): any;
}
import { $inb as h } from "../referencesModel.js";
import { $jnb as g } from "../referencesModel.js";
declare class D extends x {
    constructor(e: any);
    label: any;
    set(e: any, t: any): void;
}
import { $vd as x } from "../../../../../base/common/lifecycle.js";
export { $ as $knb, V as $lnb, v as $mnb, Y as $nnb, d as $onb, m as $pnb, ee as $qnb };
//# sourceMappingURL=referencesTree.d.ts.map