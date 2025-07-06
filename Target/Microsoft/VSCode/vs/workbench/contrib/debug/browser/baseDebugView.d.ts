declare function ee(r: any): HTMLElement;
declare function te(r: any, t: any): {
    name: {
        start: any;
        end: number;
    }[];
    value: {
        start: number;
        end: number;
    }[];
};
declare namespace se {
    function getKeyboardNavigationLabel(r: any): string;
}
declare let b: {
    new (t: any, n: any): {
        a: any;
        b: any;
        getChildren(t: any): Promise<any>;
    };
};
declare let h: {
    new (t: any, n: any, e: any): {
        a: any;
        b: any;
        c: any;
        renderTemplate(t: any): {
            expression: any;
            name: any;
            type: any;
            value: any;
            label: any;
            inputBoxContainer: any;
            actionBar: any;
            elementDisposable: $;
            templateDisposable: $;
            lazyButton: any;
            currentElement: undefined;
        };
        d(t: any, n: any, e: any): void;
        renderInputBox(t: any, n: any, e: any, o: any): any;
        disposeElement(t: any, n: any, e: any): void;
        disposeTemplate(t: any): void;
    };
};
import { $ud as $ } from "../../../../base/common/lifecycle.js";
export { ee as $u_b, te as $v_b, se as $w_b, b as $x_b, h as $y_b };
//# sourceMappingURL=baseDebugView.d.ts.map