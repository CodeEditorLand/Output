var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
import { Disposable } from "../../../base/common/lifecycle.js";
import { DeferredPromise } from "../../../base/common/async.js";
import { ILogService } from "../../log/common/log.js";
import { IBrowserViewGroupRemoteService } from "../node/browserViewGroupRemoteService.js";
let PlaywrightService = class PlaywrightService2 extends Disposable {
  static {
    __name(this, "PlaywrightService");
  }
  constructor(browserViewGroupRemoteService, logService) {
    super();
    this.browserViewGroupRemoteService = browserViewGroupRemoteService;
    this.logService = logService;
  }
  /**
   * Ensure the Playwright browser connection and page map are initialized.
   */
  async initialize() {
    if (this._pages) {
      return;
    }
    if (this._initPromise) {
      return this._initPromise;
    }
    this._initPromise = (async () => {
      try {
        this.logService.debug("[PlaywrightService] Creating browser view group");
        const group = this._register(await this.browserViewGroupRemoteService.createGroup());
        this.logService.debug("[PlaywrightService] Connecting to browser via CDP");
        const playwright = await import("playwright-core");
        const endpoint = await group.getDebugWebSocketEndpoint();
        const browser = await playwright.chromium.connectOverCDP(endpoint);
        this.logService.debug("[PlaywrightService] Connected to browser");
        if (this._initPromise === void 0) {
          browser.close().catch(() => {
          });
          throw new Error("PlaywrightService was disposed during initialization");
        }
        const pageManager = this._register(new PlaywrightPageManager(group, browser, this.logService));
        browser.on("disconnected", () => {
          this.logService.debug("[PlaywrightService] Browser disconnected");
          if (this._browser === browser) {
            group.dispose();
            pageManager.dispose();
            this._browser = void 0;
            this._pages = void 0;
            this._initPromise = void 0;
          }
        });
        this._browser = browser;
        this._pages = pageManager;
      } catch (e) {
        this._initPromise = void 0;
        throw e;
      }
    })();
    return this._initPromise;
  }
  dispose() {
    if (this._browser) {
      this._browser.close().catch(() => {
      });
      this._browser = void 0;
    }
    this._initPromise = void 0;
    super.dispose();
  }
};
PlaywrightService = __decorate([
  __param(0, IBrowserViewGroupRemoteService),
  __param(1, ILogService)
], PlaywrightService);
class PlaywrightPageManager extends Disposable {
  static {
    __name(this, "PlaywrightPageManager");
  }
  constructor(_group, _browser, logService) {
    super();
    this._group = _group;
    this._browser = _browser;
    this.logService = logService;
    this._viewIdToPage = /* @__PURE__ */ new Map();
    this._pageToViewId = /* @__PURE__ */ new WeakMap();
    this._viewIdQueue = [];
    this._pageQueue = [];
    this._watchedContexts = /* @__PURE__ */ new WeakSet();
    this._register(_group.onDidAddView((e) => this.onViewAdded(e.viewId)));
    this._register(_group.onDidRemoveView((e) => this.onViewRemoved(e.viewId)));
    this.scanForNewContexts();
  }
  /**
   * Create a new page in the browser and return its associated page and view ID.
   */
  async newPage() {
    const page = await this._browser.newPage();
    const viewId = await this.onPageAdded(page);
    return { viewId, page };
  }
  /**
   * Explicitly add an existing browser view to the CDP group.
   */
  async addPage(viewId) {
    if (this._viewIdToPage.has(viewId)) {
      return;
    }
    if (this._viewIdQueue.some((item) => item.viewId === viewId)) {
      return;
    }
    this.onViewAdded(viewId);
    try {
      await this._group.addView(viewId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logService.error("[PlaywrightPageMap] Failed to add view:", errorMessage);
      this.onViewRemoved(viewId);
    }
  }
  /**
   * Remove a browser view from the CDP group.
   */
  async removePage(viewId) {
    this.onViewRemoved(viewId);
    try {
      await this._group.removeView(viewId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logService.error("[PlaywrightPageMap] Failed to remove view:", errorMessage);
    }
  }
  /**
   * Get the Playwright {@link Page} for a browser view that has already been added.
   * Throws if the view has not been added.
   */
  async getPage(viewId) {
    const resolved = this._viewIdToPage.get(viewId);
    if (resolved) {
      return resolved;
    }
    const queued = this._viewIdQueue.find((item) => item.viewId === viewId);
    if (queued) {
      return queued.page.p;
    }
    throw new Error(`Page "${viewId}" has not been added to the Playwright service`);
  }
  /**
   * Called when the group fires onDidAddView. Creates a deferred entry in
   * the view ID queue and attempts to match it with a page.
   */
  onViewAdded(viewId, timeoutMs = 1e4) {
    const resolved = this._viewIdToPage.get(viewId);
    if (resolved) {
      return Promise.resolve(resolved);
    }
    const queued = this._viewIdQueue.find((item) => item.viewId === viewId);
    if (queued) {
      return queued.page.p;
    }
    const deferred = new DeferredPromise();
    const timeout = setTimeout(() => deferred.error(new Error(`Timed out waiting for page`)), timeoutMs);
    deferred.p.finally(() => {
      clearTimeout(timeout);
      this._viewIdQueue = this._viewIdQueue.filter((item) => item.viewId !== viewId);
      if (this._viewIdQueue.length === 0) {
        this.stopScanning();
      }
    });
    this._viewIdQueue.push({ viewId, page: deferred });
    this.tryMatch();
    this.ensureScanning();
    return deferred.p;
  }
  onViewRemoved(viewId) {
    this._viewIdQueue = this._viewIdQueue.filter((item) => item.viewId !== viewId);
    const page = this._viewIdToPage.get(viewId);
    if (page) {
      this._pageToViewId.delete(page);
    }
    this._viewIdToPage.delete(viewId);
  }
  onPageAdded(page, timeoutMs = 1e4) {
    const resolved = this._pageToViewId.get(page);
    if (resolved) {
      return Promise.resolve(resolved);
    }
    const queued = this._pageQueue.find((item) => item.page === page);
    if (queued) {
      return queued.viewId.p;
    }
    this.onContextAdded(page.context());
    page.once("close", () => this.onPageRemoved(page));
    const deferred = new DeferredPromise();
    const timeout = setTimeout(() => deferred.error(new Error(`Timed out waiting for browser view`)), timeoutMs);
    deferred.p.finally(() => {
      clearTimeout(timeout);
      this._pageQueue = this._pageQueue.filter((item) => item.page !== page);
    });
    this._pageQueue.push({ page, viewId: deferred });
    this.tryMatch();
    return deferred.p;
  }
  onPageRemoved(page) {
    this._pageQueue = this._pageQueue.filter((item) => item.page !== page);
    const viewId = this._pageToViewId.get(page);
    if (viewId) {
      this._viewIdToPage.delete(viewId);
    }
    this._pageToViewId.delete(page);
  }
  onContextAdded(context) {
    if (this._watchedContexts.has(context)) {
      return;
    }
    this._watchedContexts.add(context);
    context.on("page", (page) => this.onPageAdded(page));
    context.on("close", () => this.onContextRemoved(context));
    for (const page of context.pages()) {
      this.onPageAdded(page);
    }
  }
  onContextRemoved(context) {
    this._watchedContexts.delete(context);
  }
  // --- Matching ---
  /**
   * Pair up queued view IDs with queued pages in FIFO order and resolve
   * any callers waiting for the matched view IDs.
   */
  tryMatch() {
    while (this._viewIdQueue.length > 0 && this._pageQueue.length > 0) {
      const viewIdItem = this._viewIdQueue.shift();
      const pageItem = this._pageQueue.shift();
      this._viewIdToPage.set(viewIdItem.viewId, pageItem.page);
      this._pageToViewId.set(pageItem.page, viewIdItem.viewId);
      viewIdItem.page.complete(pageItem.page);
      pageItem.viewId.complete(viewIdItem.viewId);
      this.logService.debug(`[PlaywrightPageMap] Matched view ${viewIdItem.viewId} \u2192 page`);
    }
    if (this._viewIdQueue.length === 0) {
      this.stopScanning();
    }
  }
  // --- Context scanning ---
  /**
   * Watch all current {@link BrowserContext BrowserContexts} for new pages.
   * Also processes any existing pages in newly discovered contexts.
   */
  scanForNewContexts() {
    for (const context of this._browser.contexts()) {
      this.onContextAdded(context);
    }
  }
  ensureScanning() {
    if (this._scanTimer === void 0) {
      this._scanTimer = setInterval(() => this.scanForNewContexts(), 100);
    }
  }
  stopScanning() {
    if (this._scanTimer !== void 0) {
      clearInterval(this._scanTimer);
      this._scanTimer = void 0;
    }
  }
  dispose() {
    this.stopScanning();
    for (const { page } of this._viewIdQueue) {
      page.error(new Error("PlaywrightPageMap disposed"));
    }
    for (const { viewId } of this._pageQueue) {
      viewId.error(new Error("PlaywrightPageMap disposed"));
    }
    this._viewIdQueue = [];
    this._pageQueue = [];
    super.dispose();
  }
}
export {
  PlaywrightService
};
//# sourceMappingURL=playwrightService.js.map
