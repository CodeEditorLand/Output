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
import "./media/gettingStarted.css";
import { localize } from "../../../../nls.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import { URI } from "../../../../base/common/uri.js";
import { Schemas } from "../../../../base/common/network.js";
import { IUntypedEditorInput } from "../../../common/editor.js";
import { IEditorOptions } from "../../../../platform/editor/common/editor.js";
import { IWalkthroughsService } from "./gettingStartedService.js";
const gettingStartedInputTypeId = "workbench.editors.gettingStartedInput";
let GettingStartedInput = class extends EditorInput {
  constructor(options, walkthroughService) {
    super();
    this.walkthroughService = walkthroughService;
    this._selectedCategory = options.selectedCategory;
    this._selectedStep = options.selectedStep;
    this._showTelemetryNotice = !!options.showTelemetryNotice;
    this._showWelcome = options.showWelcome ?? true;
  }
  static {
    __name(this, "GettingStartedInput");
  }
  static ID = gettingStartedInputTypeId;
  static RESOURCE = URI.from({ scheme: Schemas.walkThrough, authority: "vscode_getting_started_page" });
  _selectedCategory;
  _selectedStep;
  _showTelemetryNotice;
  _showWelcome;
  get typeId() {
    return GettingStartedInput.ID;
  }
  get editorId() {
    return this.typeId;
  }
  toUntyped() {
    return {
      resource: GettingStartedInput.RESOURCE,
      options: {
        override: GettingStartedInput.ID,
        pinned: false
      }
    };
  }
  get resource() {
    return GettingStartedInput.RESOURCE;
  }
  matches(other) {
    if (super.matches(other)) {
      return true;
    }
    if (other instanceof GettingStartedInput) {
      return other.selectedCategory === this.selectedCategory;
    }
    return false;
  }
  getName() {
    return this.selectedCategory ? this.walkthroughService.getWalkthrough(this.selectedCategory).walkthroughPageTitle : localize("getStarted", "Welcome");
  }
  get selectedCategory() {
    return this._selectedCategory;
  }
  set selectedCategory(selectedCategory) {
    this._selectedCategory = selectedCategory;
    this._onDidChangeLabel.fire();
  }
  get selectedStep() {
    return this._selectedStep;
  }
  set selectedStep(selectedStep) {
    this._selectedStep = selectedStep;
  }
  get showTelemetryNotice() {
    return this._showTelemetryNotice;
  }
  set showTelemetryNotice(value) {
    this._showTelemetryNotice = value;
  }
  get showWelcome() {
    return this._showWelcome;
  }
  set showWelcome(value) {
    this._showWelcome = value;
  }
};
GettingStartedInput = __decorateClass([
  __decorateParam(1, IWalkthroughsService)
], GettingStartedInput);
export {
  GettingStartedInput,
  gettingStartedInputTypeId
};
//# sourceMappingURL=gettingStartedInput.js.map
