import { Disposable } from '../../../base/common/lifecycle.js';
import { ILogService } from '../../log/common/log.js';
import { IPlaywrightService } from '../common/playwrightService.js';
import { IBrowserViewGroupRemoteService } from '../node/browserViewGroupRemoteService.js';
/**
 * Shared-process implementation of {@link IPlaywrightService}.
 */
export declare class PlaywrightService extends Disposable implements IPlaywrightService {
    private readonly browserViewGroupRemoteService;
    private readonly logService;
    readonly _serviceBrand: undefined;
    private _browser;
    private _pages;
    private _initPromise;
    constructor(browserViewGroupRemoteService: IBrowserViewGroupRemoteService, logService: ILogService);
    /**
     * Ensure the Playwright browser connection and page map are initialized.
     */
    initialize(): Promise<void>;
    dispose(): void;
}
