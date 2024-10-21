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
import { createHotClass } from "../../../../base/common/hotReloadHelpers.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { autorunWithStore } from "../../../../base/common/observable.js";
import Severity from "../../../../base/common/severity.js";
import { ICodeEditor } from "../../../../editor/browser/editorBrowser.js";
import { InlineCompletionsController } from "../../../../editor/contrib/inlineCompletions/browser/controller/inlineCompletionsController.js";
import { InlineEditsAdapter } from "../../../../editor/contrib/inlineCompletions/browser/model/inlineEditsAdapter.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { observableConfigValue } from "../../../../platform/observable/common/platformObservableUtils.js";
import { ILanguageStatusService } from "../../../services/languageStatus/common/languageStatusService.js";
let InlineCompletionLanguageStatusBarContribution = class extends Disposable {
  constructor(_editor, _languageStatusService, _configurationService) {
    super();
    this._editor = _editor;
    this._languageStatusService = _languageStatusService;
    this._configurationService = _configurationService;
    const c = InlineCompletionsController.get(this._editor);
    this._register(autorunWithStore((reader, store) => {
      if (!this._inlineCompletionInlineEdits.read(reader)) {
        return;
      }
      const model = c?.model.read(reader);
      if (!model) {
        return;
      }
      const status = model.status.read(reader);
      const statusMap = {
        loading: { shortLabel: "", label: "Loading", loading: true },
        ghostText: { shortLabel: "$(lightbulb)", label: "Inline Completion available", loading: false },
        inlineEdit: { shortLabel: "$(lightbulb-sparkle)", label: "Inline Edit available", loading: false },
        noSuggestion: { shortLabel: "$(circle-slash)", label: "No inline suggestion available", loading: false }
      };
      store.add(this._languageStatusService.addStatus({
        accessibilityInfo: void 0,
        busy: statusMap[status].loading,
        command: void 0,
        detail: "Inline Suggestions",
        id: "inlineSuggestions",
        label: { value: statusMap[status].label, shortValue: statusMap[status].shortLabel },
        name: "Inline Suggestions",
        selector: { pattern: model.textModel.uri.fsPath },
        severity: Severity.Info,
        source: "inlineSuggestions"
      }));
    }));
  }
  static {
    __name(this, "InlineCompletionLanguageStatusBarContribution");
  }
  static hot = createHotClass(InlineCompletionLanguageStatusBarContribution);
  static Id = "vs.editor.contrib.inlineCompletionLanguageStatusBarContribution";
  _inlineCompletionInlineEdits = observableConfigValue(InlineEditsAdapter.experimentalInlineEditsEnabled, false, this._configurationService);
};
InlineCompletionLanguageStatusBarContribution = __decorateClass([
  __decorateParam(1, ILanguageStatusService),
  __decorateParam(2, IConfigurationService)
], InlineCompletionLanguageStatusBarContribution);
export {
  InlineCompletionLanguageStatusBarContribution
};
//# sourceMappingURL=inlineCompletionLanguageStatusBarContribution.js.map
