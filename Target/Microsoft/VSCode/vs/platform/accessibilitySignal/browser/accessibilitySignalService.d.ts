declare class x {
    constructor(n: any);
    randomOneOf: any;
    getSound(n?: boolean): any;
}
declare class l {
    static b(n: any): l;
    static get allAccessibilitySignals(): any[];
    constructor(n: any, i: any, o: any, s: any, a: any, d: any, u?: boolean);
    sound: any;
    name: any;
    legacySoundSettingsKey: any;
    settingsKey: any;
    legacyAnnouncementSettingsKey: any;
    announcementMessage: any;
    managesOwnEnablement: boolean;
}
declare const W: any;
declare const J: unique symbol;
declare let y: {
    new (n: any, i: any, o: any): {
        f: any;
        g: any;
        h: any;
        a: Map<any, any>;
        b: import("../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
        c: Set<any>;
        n: Set<any>;
        r: m;
        t: m;
        getEnabledState(n: any, i: any, o: any): M;
        playSignal(n: any, i?: {}): Promise<void>;
        playSignals(n: any): Promise<void>;
        j(n: any, i: any): void;
        m(): number;
        playSound(n: any, i?: boolean): Promise<void>;
        playSignalLoop(n: any, i: any): any;
        isAnnouncementEnabled(n: any, i: any): any;
        isSoundEnabled(n: any, i: any): any;
        onSoundEnabledChanged(n: any): any;
        getDelayMs(n: any, i: any, o: any): any;
        q: K;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class e {
    static a(n: any): e;
    constructor(n: any);
    fileName: any;
}
import { $vf as m } from "../../../base/common/cache.js";
import { ValueWithChangeEventFromObservable as M } from "../../../base/common/observable.js";
import { $ud as K } from "../../../base/common/lifecycle.js";
export { x as $Aeb, l as $Beb, W as $web, J as $xeb, y as $yeb, e as $zeb };
//# sourceMappingURL=accessibilitySignalService.d.ts.map