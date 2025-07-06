declare function d(e: any, n: any): any;
declare function O(e: any, n: any): import("../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
declare namespace b {
    let id: string;
    let order: number;
    let title: any;
    let type: string;
    let properties: {
        "testing.automaticallyOpenPeekView": {
            description: any;
            enum: string[];
            default: string;
            enumDescriptions: any[];
        };
        "testing.showAllMessages": {
            description: any;
            type: string;
            default: boolean;
        };
        "testing.automaticallyOpenPeekViewDuringAutoRun": {
            description: any;
            type: string;
            default: boolean;
        };
        "testing.countBadge": {
            description: any;
            enum: string[];
            enumDescriptions: any[];
            default: string;
        };
        "testing.followRunningTest": {
            description: any;
            type: string;
            default: boolean;
        };
        "testing.defaultGutterClickAction": {
            description: any;
            enum: string[];
            enumDescriptions: any[];
            default: string;
        };
        "testing.gutterEnabled": {
            description: any;
            type: string;
            default: boolean;
        };
        "testing.saveBeforeTest": {
            description: any;
            type: string;
            default: boolean;
        };
        "testing.automaticallyOpenTestResults": {
            enum: string[];
            enumDescriptions: any[];
            default: string;
            description: any;
        };
        "testing.alwaysRevealTestOnStateChange": {
            markdownDescription: any;
            type: string;
            default: boolean;
        };
        "testing.showCoverageInExplorer": {
            description: any;
            type: string;
            default: boolean;
        };
        "testing.displayedCoveragePercent": {
            markdownDescription: any;
            default: string;
            enum: string[];
            enumDescriptions: any[];
        };
        "testing.coverageBarThresholds": {
            markdownDescription: any;
            default: {
                red: number;
                yellow: number;
                green: number;
            };
            properties: {
                red: {
                    type: string;
                    minimum: number;
                    maximum: number;
                    default: number;
                };
                yellow: {
                    type: string;
                    minimum: number;
                    maximum: number;
                    default: number;
                };
                green: {
                    type: string;
                    minimum: number;
                    maximum: number;
                    default: number;
                };
            };
        };
        "testing.coverageToolbarEnabled": {
            description: any;
            type: string;
            default: boolean;
        };
    };
}
declare var r: any;
declare var a: any;
declare var o: any;
declare var l: any;
declare var u: any;
declare var i: any;
export { d as $1kc, O as $2kc, b as $Zkc, r as AutoOpenPeekViewWhen, a as AutoOpenTesting, o as DefaultGutterClickAction, l as TestingConfigKeys, u as TestingCountBadge, i as TestingDisplayedCoveragePercent };
//# sourceMappingURL=configuration.d.ts.map