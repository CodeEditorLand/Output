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
import { Disposable } from "../../../../base/common/lifecycle.js";
import { registerSingleton } from "../../../../platform/instantiation/common/extensions.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { firstSessionDateStorageKey, ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { createDecorator } from "../../../../platform/instantiation/common/instantiation.js";
import { IContextKeyService, RawContextKey } from "../../../../platform/contextkey/common/contextkey.js";
const ICoreExperimentationService = createDecorator("coreExperimentationService");
const startupExpContext = new RawContextKey("coreExperimentation.startupExpGroup", "");
var StartupExperimentGroup;
(function(StartupExperimentGroup2) {
  StartupExperimentGroup2["Control"] = "control";
  StartupExperimentGroup2["MaximizedChat"] = "maximizedChat";
  StartupExperimentGroup2["SplitEmptyEditorChat"] = "splitEmptyEditorChat";
  StartupExperimentGroup2["SplitWelcomeChat"] = "splitWelcomeChat";
})(StartupExperimentGroup || (StartupExperimentGroup = {}));
const STARTUP_EXPERIMENT_NAME = "startup";
const EXPERIMENT_CONFIGURATIONS = {
  stable: {
    experimentName: STARTUP_EXPERIMENT_NAME,
    targetPercentage: 20,
    groups: [
      // Bump the iteration each time we change group allocations
      { name: StartupExperimentGroup.Control, min: 0, max: 0.25, iteration: 1 },
      { name: StartupExperimentGroup.MaximizedChat, min: 0.25, max: 0.5, iteration: 1 },
      { name: StartupExperimentGroup.SplitEmptyEditorChat, min: 0.5, max: 0.75, iteration: 1 },
      { name: StartupExperimentGroup.SplitWelcomeChat, min: 0.75, max: 1, iteration: 1 }
    ]
  },
  insider: {
    experimentName: STARTUP_EXPERIMENT_NAME,
    targetPercentage: 20,
    groups: [
      // Bump the iteration each time we change group allocations
      { name: StartupExperimentGroup.Control, min: 0, max: 0.25, iteration: 1 },
      { name: StartupExperimentGroup.MaximizedChat, min: 0.25, max: 0.5, iteration: 1 },
      { name: StartupExperimentGroup.SplitEmptyEditorChat, min: 0.5, max: 0.75, iteration: 1 },
      { name: StartupExperimentGroup.SplitWelcomeChat, min: 0.75, max: 1, iteration: 1 }
    ]
  }
};
let CoreExperimentationService = class CoreExperimentationService2 extends Disposable {
  static {
    __name(this, "CoreExperimentationService");
  }
  constructor(storageService, telemetryService, productService, contextKeyService) {
    super();
    this.storageService = storageService;
    this.telemetryService = telemetryService;
    this.productService = productService;
    this.contextKeyService = contextKeyService;
    this.experiments = /* @__PURE__ */ new Map();
    this.initializeExperiments();
  }
  initializeExperiments() {
    const firstSessionDateString = this.storageService.get(
      firstSessionDateStorageKey,
      -1
      /* StorageScope.APPLICATION */
    ) || (/* @__PURE__ */ new Date()).toUTCString();
    const daysSinceFirstSession = (+/* @__PURE__ */ new Date() - +new Date(firstSessionDateString)) / 1e3 / 60 / 60 / 24;
    if (daysSinceFirstSession > 1) {
      return;
    }
    const experimentConfig = this.getExperimentConfiguration();
    if (!experimentConfig) {
      return;
    }
    const storageKey = `coreExperimentation.${experimentConfig.experimentName}`;
    const storedExperiment = this.storageService.get(
      storageKey,
      -1
      /* StorageScope.APPLICATION */
    );
    if (storedExperiment) {
      return;
    }
    const experiment = this.createStartupExperiment(experimentConfig.experimentName, experimentConfig);
    if (experiment) {
      this.experiments.set(experimentConfig.experimentName, experiment);
      this.sendExperimentTelemetry(experimentConfig.experimentName, experiment);
      startupExpContext.bindTo(this.contextKeyService).set(experiment.experimentGroup);
      this.storageService.store(
        storageKey,
        JSON.stringify(experiment),
        -1,
        1
        /* StorageTarget.MACHINE */
      );
    }
  }
  getExperimentConfiguration() {
    const quality = this.productService.quality;
    if (!quality) {
      return void 0;
    }
    return EXPERIMENT_CONFIGURATIONS[quality];
  }
  createStartupExperiment(experimentName, experimentConfig) {
    const cohort = Math.random();
    if (cohort >= experimentConfig.targetPercentage / 100) {
      return void 0;
    }
    const normalizedCohort = cohort / (experimentConfig.targetPercentage / 100);
    for (const group of experimentConfig.groups) {
      if (normalizedCohort >= group.min && normalizedCohort < group.max) {
        return {
          cohort,
          subCohort: normalizedCohort,
          experimentGroup: group.name,
          iteration: group.iteration,
          isInExperiment: true
        };
      }
    }
    return void 0;
  }
  sendExperimentTelemetry(experimentName, experiment) {
    this.telemetryService.publicLog2(`coreExperimentation.experimentCohort`, {
      experimentName,
      cohort: experiment.cohort,
      subCohort: experiment.subCohort,
      experimentGroup: experiment.experimentGroup,
      iteration: experiment.iteration,
      isInExperiment: experiment.isInExperiment
    });
  }
  getExperiment() {
    return this.experiments.get(STARTUP_EXPERIMENT_NAME);
  }
};
CoreExperimentationService = __decorate([
  __param(0, IStorageService),
  __param(1, ITelemetryService),
  __param(2, IProductService),
  __param(3, IContextKeyService)
], CoreExperimentationService);
registerSingleton(
  ICoreExperimentationService,
  CoreExperimentationService,
  1
  /* InstantiationType.Delayed */
);
export {
  CoreExperimentationService,
  ICoreExperimentationService,
  STARTUP_EXPERIMENT_NAME,
  StartupExperimentGroup,
  startupExpContext
};
//# sourceMappingURL=coreExperimentationService.js.map
