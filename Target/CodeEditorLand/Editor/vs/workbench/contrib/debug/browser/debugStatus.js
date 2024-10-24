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
import * as nls from "../../../../nls.js";
import { IDisposable, dispose } from "../../../../base/common/lifecycle.js";
import { IDebugService, State, IDebugConfiguration } from "../common/debug.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IStatusbarEntry, IStatusbarService, StatusbarAlignment, IStatusbarEntryAccessor } from "../../../services/statusbar/browser/statusbar.js";
import { IWorkbenchContribution } from "../../../common/contributions.js";
let DebugStatusContribution = class {
  constructor(statusBarService, debugService, configurationService) {
    this.statusBarService = statusBarService;
    this.debugService = debugService;
    const addStatusBarEntry = /* @__PURE__ */ __name(() => {
      this.entryAccessor = this.statusBarService.addEntry(
        this.entry,
        "status.debug",
        StatusbarAlignment.LEFT,
        30
        /* Low Priority */
      );
    }, "addStatusBarEntry");
    const setShowInStatusBar = /* @__PURE__ */ __name(() => {
      this.showInStatusBar = configurationService.getValue("debug").showInStatusBar;
      if (this.showInStatusBar === "always" && !this.entryAccessor) {
        addStatusBarEntry();
      }
    }, "setShowInStatusBar");
    setShowInStatusBar();
    this.toDispose.push(this.debugService.onDidChangeState((state) => {
      if (state !== State.Inactive && this.showInStatusBar === "onFirstSessionStart" && !this.entryAccessor) {
        addStatusBarEntry();
      }
    }));
    this.toDispose.push(configurationService.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("debug.showInStatusBar")) {
        setShowInStatusBar();
        if (this.entryAccessor && this.showInStatusBar === "never") {
          this.entryAccessor.dispose();
          this.entryAccessor = void 0;
        }
      }
    }));
    this.toDispose.push(this.debugService.getConfigurationManager().onDidSelectConfiguration((e) => {
      this.entryAccessor?.update(this.entry);
    }));
  }
  static {
    __name(this, "DebugStatusContribution");
  }
  showInStatusBar;
  toDispose = [];
  entryAccessor;
  get entry() {
    let text = "";
    const manager = this.debugService.getConfigurationManager();
    const name = manager.selectedConfiguration.name || "";
    const nameAndLaunchPresent = name && manager.selectedConfiguration.launch;
    if (nameAndLaunchPresent) {
      text = manager.getLaunches().length > 1 ? `${name} (${manager.selectedConfiguration.launch.name})` : name;
    }
    return {
      name: nls.localize("status.debug", "Debug"),
      text: "$(debug-alt-small) " + text,
      ariaLabel: nls.localize("debugTarget", "Debug: {0}", text),
      tooltip: nls.localize("selectAndStartDebug", "Select and Start Debug Configuration"),
      command: "workbench.action.debug.selectandstart"
    };
  }
  dispose() {
    this.entryAccessor?.dispose();
    dispose(this.toDispose);
  }
};
DebugStatusContribution = __decorateClass([
  __decorateParam(0, IStatusbarService),
  __decorateParam(1, IDebugService),
  __decorateParam(2, IConfigurationService)
], DebugStatusContribution);
export {
  DebugStatusContribution
};
//# sourceMappingURL=debugStatus.js.map
