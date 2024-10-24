var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
import { CancellationTokenSource } from "../../../../base/common/cancellation.js";
import { Disposable, DisposableStore, IDisposable, toDisposable } from "../../../../base/common/lifecycle.js";
import { IContextKey, IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { createDecorator } from "../../../../platform/instantiation/common/instantiation.js";
import { IStorageService, StorageScope, StorageTarget } from "../../../../platform/storage/common/storage.js";
import { StoredValue } from "./storedValue.js";
import { TestingContextKeys } from "./testingContextKeys.js";
import { ITestService } from "./testService.js";
import { TestService } from "./testServiceImpl.js";
import { ITestRunProfile, TestRunProfileBitset } from "./testTypes.js";
import { Emitter, Event } from "../../../../base/common/event.js";
import { TestId } from "./testId.js";
import { WellDefinedPrefixTree } from "../../../../base/common/prefixTree.js";
import { ITestProfileService } from "./testProfileService.js";
import * as arrays from "../../../../base/common/arrays.js";
const ITestingContinuousRunService = createDecorator("testingContinuousRunService");
let TestingContinuousRunService = class extends Disposable {
  constructor(testService, storageService, contextKeyService, testProfileService) {
    super();
    this.testService = testService;
    this.testProfileService = testProfileService;
    this.isGloballyOn = TestingContextKeys.isContinuousModeOn.bindTo(contextKeyService);
    this.lastRun = this._register(new StoredValue({
      key: "lastContinuousRunProfileIds",
      scope: StorageScope.WORKSPACE,
      target: StorageTarget.MACHINE,
      serialization: {
        deserialize: /* @__PURE__ */ __name((v) => new Set(JSON.parse(v)), "deserialize"),
        serialize: /* @__PURE__ */ __name((v) => JSON.stringify([...v]), "serialize")
      }
    }, storageService));
    this._register(toDisposable(() => {
      this.globallyRunning?.dispose();
      for (const cts of this.running.values()) {
        cts.dispose();
      }
    }));
  }
  static {
    __name(this, "TestingContinuousRunService");
  }
  changeEmitter = new Emitter();
  globallyRunning;
  running = new WellDefinedPrefixTree();
  lastRun;
  isGloballyOn;
  onDidChange = this.changeEmitter.event;
  get lastRunProfileIds() {
    return this.lastRun.get(/* @__PURE__ */ new Set());
  }
  /** @inheritdoc */
  isSpecificallyEnabledFor(testId) {
    return this.running.size > 0 && this.running.hasKey(TestId.fromString(testId).path);
  }
  /** @inheritdoc */
  isEnabledForAParentOf(testId) {
    if (this.globallyRunning) {
      return true;
    }
    return this.running.size > 0 && this.running.hasKeyOrParent(TestId.fromString(testId).path);
  }
  /** @inheritdoc */
  isEnabledForAChildOf(testId) {
    return this.running.size > 0 && this.running.hasKeyOrChildren(TestId.fromString(testId).path);
  }
  /** @inheritdoc */
  isEnabled() {
    return !!this.globallyRunning || this.running.size > 0;
  }
  /** @inheritdoc */
  start(profiles, testId) {
    const store = new DisposableStore();
    const cts = new CancellationTokenSource();
    store.add(toDisposable(() => cts.dispose(true)));
    if (testId === void 0) {
      this.isGloballyOn.set(true);
    }
    if (!testId) {
      this.globallyRunning?.dispose();
      this.globallyRunning = store;
    } else {
      this.running.mutate(TestId.fromString(testId).path, (c) => {
        c?.dispose();
        return store;
      });
    }
    let actualProfiles;
    if (profiles instanceof Array) {
      actualProfiles = profiles;
    } else {
      const getRelevant = /* @__PURE__ */ __name(() => this.testProfileService.getGroupDefaultProfiles(profiles).filter((p) => p.supportsContinuousRun && (!testId || TestId.root(testId) === p.controllerId)), "getRelevant");
      actualProfiles = getRelevant();
      store.add(this.testProfileService.onDidChange(() => {
        if (!arrays.equals(getRelevant(), actualProfiles)) {
          this.start(profiles, testId);
        }
      }));
    }
    this.lastRun.store(new Set(actualProfiles.map((p) => p.profileId)));
    if (actualProfiles.length) {
      this.testService.startContinuousRun({
        continuous: true,
        group: actualProfiles[0].group,
        targets: actualProfiles.map((p) => ({
          testIds: [testId ?? p.controllerId],
          controllerId: p.controllerId,
          profileId: p.profileId
        }))
      }, cts.token);
    }
    this.changeEmitter.fire(testId);
  }
  /** @inheritdoc */
  stop(testId) {
    if (!testId) {
      this.globallyRunning?.dispose();
      this.globallyRunning = void 0;
    } else {
      const cancellations = [...this.running.deleteRecursive(TestId.fromString(testId).path)];
      for (let i = cancellations.length - 1; i >= 0; i--) {
        cancellations[i].dispose();
      }
    }
    if (testId === void 0) {
      this.isGloballyOn.set(false);
    }
    this.changeEmitter.fire(testId);
  }
};
TestingContinuousRunService = __decorateClass([
  __decorateParam(0, ITestService),
  __decorateParam(1, IStorageService),
  __decorateParam(2, IContextKeyService),
  __decorateParam(3, ITestProfileService)
], TestingContinuousRunService);
export {
  ITestingContinuousRunService,
  TestingContinuousRunService
};
//# sourceMappingURL=testingContinuousRunService.js.map
