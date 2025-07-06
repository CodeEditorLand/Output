declare const U: "task.quickOpen.detail";
declare const B: "task.quickOpen.skip";
declare function ae(f: any): boolean;
declare const S: any;
declare let C: {
    new (e: any, t: any, i: any, o: any, s: any, n: any, r: any): {
        g: any;
        h: any;
        m: any;
        n: any;
        r: any;
        s: any;
        u: any;
        c: any;
        w(): boolean;
        y(e: any): any;
        z(e: any, t?: any[]): {
            label: any;
            description: any;
            task: any;
            detail: any;
            buttons: any[];
        };
        C(e: any, t: any, i: any, o?: any[]): void;
        D(e: any, t: any): void;
        F(e: any): any[];
        G(e: any, t: any): {
            configuredTasks: any[];
            recentTasks: any[];
        };
        getTopLevelEntries(e: any): Promise<{
            entries: any[];
            isSingleConfigured?: never;
        } | {
            entries: any[];
            isSingleConfigured: any;
        }>;
        f: any[] | undefined;
        handleSettingOption(e: any): any;
        show(e: any, t: any, i: any, o: any): any;
        H(e: any, t: any, i: any): Promise<any>;
        doPickerSecondLevel(e: any, t: any, i: any, o: any): Promise<any>;
        I(e: any): Promise<({
            label: any;
            description: any;
            task: any;
            detail: any;
            buttons: any[];
        } | {
            type: string;
            label?: never;
            task?: never;
            alwaysShow?: never;
        } | {
            label: any;
            task: null;
            alwaysShow: boolean;
            type?: never;
        })[]>;
        J(e: any): Promise<any>;
        q: j;
        dispose(): void;
        B(t: any): any;
    };
    getTaskLabelWithIcon(e: any, t: any): string;
    applyColorStyles(e: any, t: any, i: any): j | undefined;
    allSettingEntries(e: any): any[];
    getSettingEntry(e: any, t: any): {
        label: any;
        task: null;
        settingType: any;
        alwaysShow: boolean;
    } | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as j } from "../../../../base/common/lifecycle.js";
export { U as $qvc, B as $rvc, ae as $svc, S as $tvc, C as $uvc };
//# sourceMappingURL=taskQuickPick.d.ts.map