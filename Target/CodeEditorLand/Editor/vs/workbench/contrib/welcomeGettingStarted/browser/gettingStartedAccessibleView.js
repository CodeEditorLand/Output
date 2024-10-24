var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { AccessibleViewType, AccessibleContentProvider, ExtensionContentProvider, IAccessibleViewContentProvider, AccessibleViewProviderId } from "../../../../platform/accessibility/browser/accessibleView.js";
import { IAccessibleViewImplentation } from "../../../../platform/accessibility/browser/accessibleViewRegistry.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { ServicesAccessor } from "../../../../platform/instantiation/common/instantiation.js";
import { GettingStartedPage, inWelcomeContext } from "./gettingStarted.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { IResolvedWalkthrough, IResolvedWalkthroughStep, IWalkthroughsService } from "./gettingStartedService.js";
import { AccessibilityVerbositySettingId } from "../../accessibility/browser/accessibilityConfiguration.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { GettingStartedInput } from "./gettingStartedInput.js";
import { localize } from "../../../../nls.js";
class GettingStartedAccessibleView {
  static {
    __name(this, "GettingStartedAccessibleView");
  }
  type = AccessibleViewType.View;
  priority = 110;
  name = "walkthroughs";
  when = inWelcomeContext;
  getProvider = /* @__PURE__ */ __name((accessor) => {
    const editorService = accessor.get(IEditorService);
    const editorPane = editorService.activeEditorPane;
    if (!(editorPane instanceof GettingStartedPage)) {
      return;
    }
    const gettingStartedInput = editorPane.input;
    if (!(gettingStartedInput instanceof GettingStartedInput) || !gettingStartedInput.selectedCategory) {
      return;
    }
    const gettingStartedService = accessor.get(IWalkthroughsService);
    const currentWalkthrough = gettingStartedService.getWalkthrough(gettingStartedInput.selectedCategory);
    const currentStepIds = gettingStartedInput.selectedStep;
    if (currentWalkthrough) {
      return new GettingStartedAccessibleProvider(accessor.get(IContextKeyService), editorPane, currentWalkthrough, currentStepIds);
    }
    return;
  }, "getProvider");
}
class GettingStartedAccessibleProvider extends Disposable {
  constructor(contextService, _gettingStartedPage, _focusedItem, _focusedStep) {
    super();
    this.contextService = contextService;
    this._gettingStartedPage = _gettingStartedPage;
    this._focusedItem = _focusedItem;
    this._focusedStep = _focusedStep;
    this._activeWalkthroughSteps = _focusedItem.steps.filter((step) => !step.when || this.contextService.contextMatchesRules(step.when));
  }
  static {
    __name(this, "GettingStartedAccessibleProvider");
  }
  _currentStepIndex = 0;
  _activeWalkthroughSteps = [];
  id = AccessibleViewProviderId.Walkthrough;
  verbositySettingKey = AccessibilityVerbositySettingId.Walkthrough;
  options = { type: AccessibleViewType.View };
  provideContent() {
    if (this._focusedStep) {
      const stepIndex = this._activeWalkthroughSteps.findIndex((step) => step.id === this._focusedStep);
      if (stepIndex !== -1) {
        this._currentStepIndex = stepIndex;
      }
    }
    return this._getContent(this._currentStepIndex + 1, this._focusedItem, this._activeWalkthroughSteps[this._currentStepIndex]);
  }
  _getContent(index, waltkrough, step) {
    const stepsContent = localize("gettingStarted.step", "Step {0}: {1}\nDescription: {2}", index, step.title, step.description.join(" "));
    return [
      localize("gettingStarted.title", "Title: {0}", waltkrough.title),
      localize("gettingStarted.description", "Description: {0}", waltkrough.description),
      stepsContent
    ].join("\n\n");
  }
  provideNextContent() {
    if (++this._currentStepIndex >= this._activeWalkthroughSteps.length) {
      --this._currentStepIndex;
      return;
    }
    return this._getContent(this._currentStepIndex + 1, this._focusedItem, this._activeWalkthroughSteps[this._currentStepIndex]);
  }
  providePreviousContent() {
    if (--this._currentStepIndex < 0) {
      ++this._currentStepIndex;
      return;
    }
    return this._getContent(this._currentStepIndex + 1, this._focusedItem, this._activeWalkthroughSteps[this._currentStepIndex]);
  }
  onClose() {
    if (this._currentStepIndex > -1) {
      const currentStep = this._activeWalkthroughSteps[this._currentStepIndex];
      this._gettingStartedPage.makeCategoryVisibleWhenAvailable(this._focusedItem.id, currentStep.id);
    }
  }
}
export {
  GettingStartedAccessibleView
};
//# sourceMappingURL=gettingStartedAccessibleView.js.map
