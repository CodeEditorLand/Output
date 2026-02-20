export declare const IPlaywrightService: import("../../instantiation/common/instantiation.js").ServiceIdentifier<IPlaywrightService>;
/**
 * A service for using Playwright to connect to and automate the integrated browser.
 */
export interface IPlaywrightService {
    readonly _serviceBrand: undefined;
    initialize(): Promise<void>;
}
