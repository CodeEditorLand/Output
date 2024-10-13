import { RawContextKey } from "../../../../platform/contextkey/common/contextkey.js";
import { TestExplorerViewMode, TestExplorerViewSorting } from "./constants.js";
import { TestRunProfileBitset } from "./testTypes.js";

export declare namespace TestingContextKeys {
	const providerCount: RawContextKey<0>;
	const canRefreshTests: RawContextKey<false>;
	const isRefreshingTests: RawContextKey<false>;
	const isContinuousModeOn: RawContextKey<false>;
	const hasDebuggableTests: RawContextKey<false>;
	const hasRunnableTests: RawContextKey<false>;
	const hasCoverableTests: RawContextKey<false>;
	const hasNonDefaultProfile: RawContextKey<false>;
	const hasConfigurableProfile: RawContextKey<false>;
	const supportsContinuousRun: RawContextKey<false>;
	const isParentRunningContinuously: RawContextKey<false>;
	const activeEditorHasTests: RawContextKey<false>;
	const cursorInsideTestRange: RawContextKey<false>;
	const isTestCoverageOpen: RawContextKey<false>;
	const hasPerTestCoverage: RawContextKey<false>;
	const isCoverageFilteredToTest: RawContextKey<false>;
	const coverageToolbarEnabled: RawContextKey<true>;
	const inlineCoverageEnabled: RawContextKey<false>;
	const canGoToRelatedCode: RawContextKey<false>;
	const canGoToRelatedTest: RawContextKey<false>;
	const peekHasStack: RawContextKey<false>;
	const capabilityToContextKey: {
		[K in TestRunProfileBitset]: RawContextKey<boolean>;
	};
	const hasAnyResults: RawContextKey<boolean>;
	const viewMode: RawContextKey<TestExplorerViewMode>;
	const viewSorting: RawContextKey<TestExplorerViewSorting>;
	const isRunning: RawContextKey<boolean>;
	const isInPeek: RawContextKey<boolean>;
	const isPeekVisible: RawContextKey<boolean>;
	const peekItemType: RawContextKey<string | undefined>;
	const controllerId: RawContextKey<string | undefined>;
	const testItemExtId: RawContextKey<string | undefined>;
	const testItemHasUri: RawContextKey<boolean>;
	const testItemIsHidden: RawContextKey<boolean>;
	const testMessageContext: RawContextKey<string>;
	const testResultOutdated: RawContextKey<boolean>;
	const testResultState: RawContextKey<string>;
	const testProfileContextGroup: RawContextKey<string>;
}
