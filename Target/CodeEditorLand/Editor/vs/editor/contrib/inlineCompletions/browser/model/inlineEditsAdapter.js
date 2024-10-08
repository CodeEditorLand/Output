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
import { CancellationToken } from "../../../../../base/common/cancellation.js";
import { Disposable } from "../../../../../base/common/lifecycle.js";
import { autorunWithStore, observableSignalFromEvent } from "../../../../../base/common/observable.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { observableConfigValue } from "../../../../../platform/observable/common/platformObservableUtils.js";
import { ICodeEditor } from "../../../../browser/editorBrowser.js";
import { Position } from "../../../../common/core/position.js";
import { IInlineEdit, InlineCompletionContext, InlineCompletions, InlineCompletionsProvider, InlineEditProvider, InlineEditTriggerKind } from "../../../../common/languages.js";
import { ITextModel } from "../../../../common/model.js";
import { ILanguageFeaturesService } from "../../../../common/services/languageFeatures.js";
let InlineEditsAdapterContribution = class extends Disposable {
  constructor(_editor, instantiationService) {
    super();
    this.instantiationService = instantiationService;
    if (InlineEditsAdapterContribution.isFirst) {
      InlineEditsAdapterContribution.isFirst = false;
      this.instantiationService.createInstance(InlineEditsAdapter);
    }
  }
  static {
    __name(this, "InlineEditsAdapterContribution");
  }
  static ID = "editor.contrib.inlineEditsAdapter";
  static isFirst = true;
};
InlineEditsAdapterContribution = __decorateClass([
  __decorateParam(1, IInstantiationService)
], InlineEditsAdapterContribution);
let InlineEditsAdapter = class extends Disposable {
  constructor(_languageFeaturesService, _configurationService) {
    super();
    this._languageFeaturesService = _languageFeaturesService;
    this._configurationService = _configurationService;
    const didChangeSignal = observableSignalFromEvent("didChangeSignal", this._languageFeaturesService.inlineEditProvider.onDidChange);
    this._register(autorunWithStore((reader, store) => {
      if (!this._inlineCompletionInlineEdits.read(reader)) {
        return;
      }
      didChangeSignal.read(reader);
      store.add(this._languageFeaturesService.inlineCompletionsProvider.register("*", new class {
        async provideInlineCompletions(model, position, context, token) {
          const allInlineEditProvider = _languageFeaturesService.inlineEditProvider.all(model);
          const inlineEdits = await Promise.all(allInlineEditProvider.map(async (provider) => {
            const result = await provider.provideInlineEdit(model, {
              triggerKind: InlineEditTriggerKind.Automatic
            }, token);
            if (!result) {
              return void 0;
            }
            return { result, provider };
          }));
          const definedEdits = inlineEdits.filter((e) => !!e);
          return {
            edits: definedEdits,
            items: definedEdits.map((e) => {
              return {
                range: e.result.range,
                insertText: e.result.text,
                command: e.result.accepted,
                isInlineEdit: true
              };
            })
          };
        }
        freeInlineCompletions(c) {
          for (const e of c.edits) {
            e.provider.freeInlineEdit(e.result);
          }
        }
      }()));
    }));
  }
  static {
    __name(this, "InlineEditsAdapter");
  }
  static experimentalInlineEditsEnabled = "editor.inlineSuggest.experimentalInlineEditsEnabled";
  _inlineCompletionInlineEdits = observableConfigValue(InlineEditsAdapter.experimentalInlineEditsEnabled, false, this._configurationService);
};
InlineEditsAdapter = __decorateClass([
  __decorateParam(0, ILanguageFeaturesService),
  __decorateParam(1, IConfigurationService)
], InlineEditsAdapter);
export {
  InlineEditsAdapter,
  InlineEditsAdapterContribution
};
//# sourceMappingURL=inlineEditsAdapter.js.map
