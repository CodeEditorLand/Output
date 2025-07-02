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
var InlineCompletionsService_1;
import { WindowIntervalTimer } from "../../../base/browser/dom.js";
import { BugIndicatingError } from "../../../base/common/errors.js";
import { Emitter } from "../../../base/common/event.js";
import { Disposable } from "../../../base/common/lifecycle.js";
import { localize, localize2 } from "../../../nls.js";
import { Action2 } from "../../../platform/actions/common/actions.js";
import { ContextKeyExpr, IContextKeyService, RawContextKey } from "../../../platform/contextkey/common/contextkey.js";
import { registerSingleton } from "../../../platform/instantiation/common/extensions.js";
import { createDecorator } from "../../../platform/instantiation/common/instantiation.js";
import { IQuickInputService } from "../../../platform/quickinput/common/quickInput.js";
const IInlineCompletionsService = createDecorator("IInlineCompletionsService");
const InlineCompletionsSnoozing = new RawContextKey("inlineCompletions.snoozed", false, localize("inlineCompletions.snoozed", "Whether inline completions are currently snoozed"));
let InlineCompletionsService = class InlineCompletionsService2 extends Disposable {
  static {
    __name(this, "InlineCompletionsService");
  }
  static {
    InlineCompletionsService_1 = this;
  }
  static {
    this.SNOOZE_DURATION = 3e5;
  }
  // 5 minutes
  get snoozeTimeLeft() {
    if (this._snoozeTimeEnd === void 0) {
      return 0;
    }
    return Math.max(0, this._snoozeTimeEnd - Date.now());
  }
  constructor(_contextKeyService) {
    super();
    this._contextKeyService = _contextKeyService;
    this._onDidChangeIsSnoozing = this._register(new Emitter());
    this.onDidChangeIsSnoozing = this._onDidChangeIsSnoozing.event;
    this._snoozeTimeEnd = void 0;
    this._timer = this._register(new WindowIntervalTimer());
    const inlineCompletionsSnoozing = InlineCompletionsSnoozing.bindTo(this._contextKeyService);
    this._register(this.onDidChangeIsSnoozing(() => inlineCompletionsSnoozing.set(this.isSnoozing())));
  }
  snooze(durationMs = InlineCompletionsService_1.SNOOZE_DURATION) {
    this.setSnoozeDuration(durationMs + this.snoozeTimeLeft);
  }
  setSnoozeDuration(durationMs) {
    const wasSnoozing = this.isSnoozing();
    if (this._snoozeTimeEnd === void 0) {
      this._snoozeTimeEnd = Date.now() + durationMs;
    } else if (this.snoozeTimeLeft > 0) {
      this._snoozeTimeEnd += durationMs;
    } else {
      this._snoozeTimeEnd = Date.now() + durationMs;
    }
    const isSnoozing = this.isSnoozing();
    if (wasSnoozing !== isSnoozing) {
      this._onDidChangeIsSnoozing.fire(isSnoozing);
    }
    if (isSnoozing) {
      this._timer.cancelAndSet(() => {
        if (!this.isSnoozing()) {
          this._onDidChangeIsSnoozing.fire(false);
        } else {
          throw new BugIndicatingError("Snooze timer did not fire as expected");
        }
      }, this.snoozeTimeLeft + 1);
    }
  }
  isSnoozing() {
    return this.snoozeTimeLeft > 0;
  }
  cancelSnooze() {
    if (this.isSnoozing()) {
      this._snoozeTimeEnd = void 0;
      this._timer.cancel();
      this._onDidChangeIsSnoozing.fire(false);
    }
  }
};
InlineCompletionsService = InlineCompletionsService_1 = __decorate([
  __param(0, IContextKeyService)
], InlineCompletionsService);
registerSingleton(
  IInlineCompletionsService,
  InlineCompletionsService,
  1
  /* InstantiationType.Delayed */
);
const snoozeInlineSuggestId = "editor.action.inlineSuggest.snooze";
const cancelSnoozeInlineSuggestId = "editor.action.inlineSuggest.cancelSnooze";
class SnoozeInlineCompletion extends Action2 {
  static {
    __name(this, "SnoozeInlineCompletion");
  }
  static {
    this.ID = snoozeInlineSuggestId;
  }
  constructor() {
    super({
      id: SnoozeInlineCompletion.ID,
      title: localize2("action.inlineSuggest.snooze", "Snooze Inline Suggestions"),
      precondition: ContextKeyExpr.true(),
      f1: true
    });
  }
  async run(accessor) {
    const quickInputService = accessor.get(IQuickInputService);
    const inlineCompletionsService = accessor.get(IInlineCompletionsService);
    const items = [
      { label: "5 minutes", id: "5", picked: true },
      { label: "10 minutes", id: "10" },
      { label: "15 minutes", id: "15" },
      { label: "30 minutes", id: "30" },
      { label: "60 minutes", id: "60" }
    ];
    const picked = await quickInputService.pick(items, {
      placeHolder: localize("snooze.placeholder", "Select snooze duration")
    });
    if (picked) {
      const minutes = parseInt(picked.id, 10);
      const durationMs = minutes * 60 * 1e3;
      inlineCompletionsService.setSnoozeDuration(durationMs);
    }
  }
}
class CancelSnoozeInlineCompletion extends Action2 {
  static {
    __name(this, "CancelSnoozeInlineCompletion");
  }
  static {
    this.ID = cancelSnoozeInlineSuggestId;
  }
  constructor() {
    super({
      id: CancelSnoozeInlineCompletion.ID,
      title: localize2("action.inlineSuggest.cancelSnooze", "Cancel Snooze Inline Suggestions"),
      precondition: InlineCompletionsSnoozing,
      f1: true
    });
  }
  async run(accessor) {
    accessor.get(IInlineCompletionsService).cancelSnooze();
  }
}
export {
  CancelSnoozeInlineCompletion,
  IInlineCompletionsService,
  InlineCompletionsService,
  SnoozeInlineCompletion
};
//# sourceMappingURL=inlineCompletionsService.js.map
