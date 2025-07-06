declare namespace t {
    let Uninitialized: any;
    function Disabled(i: any): {
        type: string;
        reason: any;
    };
    function Idle(i: any, a: any): {
        type: string;
        updateType: any;
        error: any;
    };
    function CheckingForUpdates(i: any): {
        type: string;
        explicit: any;
    };
    function AvailableForDownload(i: any): {
        type: string;
        update: any;
    };
    let Downloading: any;
    function Downloaded(i: any): {
        type: string;
        update: any;
    };
    function Updating(i: any): {
        type: string;
        update: any;
    };
    function Ready(i: any): {
        type: string;
        update: any;
    };
}
declare const c: any;
declare var l: any;
declare var n: any;
declare var o: any;
export { t as $Xx, c as $Yx, l as DisablementReason, n as StateType, o as UpdateType };
//# sourceMappingURL=update.d.ts.map