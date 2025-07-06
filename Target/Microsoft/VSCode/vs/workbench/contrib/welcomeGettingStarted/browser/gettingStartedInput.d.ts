declare const o: "workbench.editors.gettingStartedInput";
declare class t extends s {
    constructor(e: any);
    get typeId(): string | undefined;
    get editorId(): string | undefined;
    toUntyped(): {
        resource: {
            _formatted: string | null;
            _fsPath: any;
            readonly fsPath: any;
            toString(e?: boolean): string;
            toJSON(): {
                $mid: number;
            };
            scheme: any;
            authority: any;
            path: any;
            query: any;
            fragment: any;
            with(e: any): /*elided*/ any;
        } | undefined;
        options: {
            override: string | undefined;
            pinned: boolean;
        };
    };
    get resource(): {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    } | undefined;
    a: any;
    b: any;
    c: boolean;
    h: any;
    m: any;
    getName(): any;
    set selectedCategory(e: any);
    get selectedCategory(): any;
    set selectedStep(e: any);
    get selectedStep(): any;
    set showTelemetryNotice(e: boolean);
    get showTelemetryNotice(): boolean;
    set showWelcome(e: any);
    get showWelcome(): any;
    set walkthroughPageTitle(e: any);
    get walkthroughPageTitle(): any;
}
import { $DF as s } from "../../../common/editor/editorInput.js";
export { o as $Mvc, t as $Nvc };
//# sourceMappingURL=gettingStartedInput.d.ts.map