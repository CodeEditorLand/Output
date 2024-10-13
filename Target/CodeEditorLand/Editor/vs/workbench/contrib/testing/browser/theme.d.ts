import { TestResultState } from "../common/testTypes.js";

export declare const testingColorIconFailed: string;
export declare const testingColorIconErrored: string;
export declare const testingColorIconPassed: string;
export declare const testingColorRunAction: string;
export declare const testingColorIconQueued: string;
export declare const testingColorIconUnset: string;
export declare const testingColorIconSkipped: string;
export declare const testingPeekBorder: string;
export declare const testingMessagePeekBorder: string;
export declare const testingPeekHeaderBackground: string;
export declare const testingPeekMessageHeaderBackground: string;
export declare const testingCoveredBackground: string;
export declare const testingCoveredBorder: string;
export declare const testingCoveredGutterBackground: string;
export declare const testingUncoveredBranchBackground: string;
export declare const testingUncoveredBackground: string;
export declare const testingUncoveredBorder: string;
export declare const testingUncoveredGutterBackground: string;
export declare const testingCoverCountBadgeBackground: string;
export declare const testingCoverCountBadgeForeground: string;
export declare const testStatesToIconColors: {
	[K in TestResultState]?: string;
};
export declare const testingRetiredColorIconErrored: string;
export declare const testingRetiredColorIconFailed: string;
export declare const testingRetiredColorIconPassed: string;
export declare const testingRetiredColorIconQueued: string;
export declare const testingRetiredColorIconUnset: string;
export declare const testingRetiredColorIconSkipped: string;
export declare const testStatesToRetiredIconColors: {
	[K in TestResultState]?: string;
};
