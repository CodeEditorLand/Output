var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { WorkbenchActionExecutedClassification, WorkbenchActionExecutedEvent } from "../../../base/common/actions.js";
import * as arrays from "../../../base/common/arrays.js";
import { IntervalTimer, TimeoutTimer } from "../../../base/common/async.js";
import { illegalState } from "../../../base/common/errors.js";
import { Emitter, Event } from "../../../base/common/event.js";
import { IME } from "../../../base/common/ime.js";
import { KeyCode } from "../../../base/common/keyCodes.js";
import { Keybinding, ResolvedChord, ResolvedKeybinding, SingleModifierChord } from "../../../base/common/keybindings.js";
import { Disposable, IDisposable } from "../../../base/common/lifecycle.js";
import * as nls from "../../../nls.js";
import { ICommandService } from "../../commands/common/commands.js";
import { IContextKeyService, IContextKeyServiceTarget } from "../../contextkey/common/contextkey.js";
import { IKeybindingService, IKeyboardEvent, KeybindingsSchemaContribution } from "./keybinding.js";
import { ResolutionResult, KeybindingResolver, ResultKind, NoMatchingKb } from "./keybindingResolver.js";
import { ResolvedKeybindingItem } from "./resolvedKeybindingItem.js";
import { ILogService } from "../../log/common/log.js";
import { INotificationService } from "../../notification/common/notification.js";
import { ITelemetryService } from "../../telemetry/common/telemetry.js";
const HIGH_FREQ_COMMANDS = /^(cursor|delete|undo|redo|tab|editor\.action\.clipboard)/;
class AbstractKeybindingService extends Disposable {
  constructor(_contextKeyService, _commandService, _telemetryService, _notificationService, _logService) {
    super();
    this._contextKeyService = _contextKeyService;
    this._commandService = _commandService;
    this._telemetryService = _telemetryService;
    this._notificationService = _notificationService;
    this._logService = _logService;
    this._currentChords = [];
    this._currentChordChecker = new IntervalTimer();
    this._currentChordStatusMessage = null;
    this._ignoreSingleModifiers = KeybindingModifierSet.EMPTY;
    this._currentSingleModifier = null;
    this._currentSingleModifierClearTimeout = new TimeoutTimer();
    this._currentlyDispatchingCommandId = null;
    this._logging = false;
  }
  static {
    __name(this, "AbstractKeybindingService");
  }
  _serviceBrand;
  _onDidUpdateKeybindings = this._register(new Emitter());
  get onDidUpdateKeybindings() {
    return this._onDidUpdateKeybindings ? this._onDidUpdateKeybindings.event : Event.None;
  }
  /** recently recorded keypresses that can trigger a keybinding;
   *
   * example: say, there's "cmd+k cmd+i" keybinding;
   * the user pressed "cmd+k" (before they press "cmd+i")
   * "cmd+k" would be stored in this array, when on pressing "cmd+i", the service
   * would invoke the command bound by the keybinding
   */
  _currentChords;
  _currentChordChecker;
  _currentChordStatusMessage;
  _ignoreSingleModifiers;
  _currentSingleModifier;
  _currentSingleModifierClearTimeout;
  _currentlyDispatchingCommandId;
  _logging;
  get inChordMode() {
    return this._currentChords.length > 0;
  }
  dispose() {
    super.dispose();
  }
  getDefaultKeybindingsContent() {
    return "";
  }
  toggleLogging() {
    this._logging = !this._logging;
    return this._logging;
  }
  _log(str) {
    if (this._logging) {
      this._logService.info(`[KeybindingService]: ${str}`);
    }
  }
  getDefaultKeybindings() {
    return this._getResolver().getDefaultKeybindings();
  }
  getKeybindings() {
    return this._getResolver().getKeybindings();
  }
  customKeybindingsCount() {
    return 0;
  }
  lookupKeybindings(commandId) {
    return arrays.coalesce(
      this._getResolver().lookupKeybindings(commandId).map((item) => item.resolvedKeybinding)
    );
  }
  lookupKeybinding(commandId, context) {
    const result = this._getResolver().lookupPrimaryKeybinding(commandId, context || this._contextKeyService);
    if (!result) {
      return void 0;
    }
    return result.resolvedKeybinding;
  }
  dispatchEvent(e, target) {
    return this._dispatch(e, target);
  }
  // TODO@ulugbekna: update namings to align with `_doDispatch`
  // TODO@ulugbekna: this fn doesn't seem to take into account single-modifier keybindings, eg `shift shift`
  softDispatch(e, target) {
    this._log(`/ Soft dispatching keyboard event`);
    const keybinding = this.resolveKeyboardEvent(e);
    if (keybinding.hasMultipleChords()) {
      console.warn("keyboard event should not be mapped to multiple chords");
      return NoMatchingKb;
    }
    const [firstChord] = keybinding.getDispatchChords();
    if (firstChord === null) {
      this._log(`\\ Keyboard event cannot be dispatched`);
      return NoMatchingKb;
    }
    const contextValue = this._contextKeyService.getContext(target);
    const currentChords = this._currentChords.map(({ keypress }) => keypress);
    return this._getResolver().resolve(contextValue, currentChords, firstChord);
  }
  _scheduleLeaveChordMode() {
    const chordLastInteractedTime = Date.now();
    this._currentChordChecker.cancelAndSet(() => {
      if (!this._documentHasFocus()) {
        this._leaveChordMode();
        return;
      }
      if (Date.now() - chordLastInteractedTime > 5e3) {
        this._leaveChordMode();
      }
    }, 500);
  }
  _expectAnotherChord(firstChord, keypressLabel) {
    this._currentChords.push({ keypress: firstChord, label: keypressLabel });
    switch (this._currentChords.length) {
      case 0:
        throw illegalState("impossible");
      case 1:
        this._currentChordStatusMessage = this._notificationService.status(nls.localize("first.chord", "({0}) was pressed. Waiting for second key of chord...", keypressLabel));
        break;
      default: {
        const fullKeypressLabel = this._currentChords.map(({ label }) => label).join(", ");
        this._currentChordStatusMessage = this._notificationService.status(nls.localize("next.chord", "({0}) was pressed. Waiting for next key of chord...", fullKeypressLabel));
      }
    }
    this._scheduleLeaveChordMode();
    if (IME.enabled) {
      IME.disable();
    }
  }
  _leaveChordMode() {
    if (this._currentChordStatusMessage) {
      this._currentChordStatusMessage.dispose();
      this._currentChordStatusMessage = null;
    }
    this._currentChordChecker.cancel();
    this._currentChords = [];
    IME.enable();
  }
  dispatchByUserSettingsLabel(userSettingsLabel, target) {
    this._log(`/ Dispatching keybinding triggered via menu entry accelerator - ${userSettingsLabel}`);
    const keybindings = this.resolveUserBinding(userSettingsLabel);
    if (keybindings.length === 0) {
      this._log(`\\ Could not resolve - ${userSettingsLabel}`);
    } else {
      this._doDispatch(
        keybindings[0],
        target,
        /*isSingleModiferChord*/
        false
      );
    }
  }
  _dispatch(e, target) {
    return this._doDispatch(
      this.resolveKeyboardEvent(e),
      target,
      /*isSingleModiferChord*/
      false
    );
  }
  _singleModifierDispatch(e, target) {
    const keybinding = this.resolveKeyboardEvent(e);
    const [singleModifier] = keybinding.getSingleModifierDispatchChords();
    if (singleModifier) {
      if (this._ignoreSingleModifiers.has(singleModifier)) {
        this._log(`+ Ignoring single modifier ${singleModifier} due to it being pressed together with other keys.`);
        this._ignoreSingleModifiers = KeybindingModifierSet.EMPTY;
        this._currentSingleModifierClearTimeout.cancel();
        this._currentSingleModifier = null;
        return false;
      }
      this._ignoreSingleModifiers = KeybindingModifierSet.EMPTY;
      if (this._currentSingleModifier === null) {
        this._log(`+ Storing single modifier for possible chord ${singleModifier}.`);
        this._currentSingleModifier = singleModifier;
        this._currentSingleModifierClearTimeout.cancelAndSet(() => {
          this._log(`+ Clearing single modifier due to 300ms elapsed.`);
          this._currentSingleModifier = null;
        }, 300);
        return false;
      }
      if (singleModifier === this._currentSingleModifier) {
        this._log(`/ Dispatching single modifier chord ${singleModifier} ${singleModifier}`);
        this._currentSingleModifierClearTimeout.cancel();
        this._currentSingleModifier = null;
        return this._doDispatch(
          keybinding,
          target,
          /*isSingleModiferChord*/
          true
        );
      }
      this._log(`+ Clearing single modifier due to modifier mismatch: ${this._currentSingleModifier} ${singleModifier}`);
      this._currentSingleModifierClearTimeout.cancel();
      this._currentSingleModifier = null;
      return false;
    }
    const [firstChord] = keybinding.getChords();
    this._ignoreSingleModifiers = new KeybindingModifierSet(firstChord);
    if (this._currentSingleModifier !== null) {
      this._log(`+ Clearing single modifier due to other key up.`);
    }
    this._currentSingleModifierClearTimeout.cancel();
    this._currentSingleModifier = null;
    return false;
  }
  _doDispatch(userKeypress, target, isSingleModiferChord = false) {
    let shouldPreventDefault = false;
    if (userKeypress.hasMultipleChords()) {
      console.warn("Unexpected keyboard event mapped to multiple chords");
      return false;
    }
    let userPressedChord = null;
    let currentChords = null;
    if (isSingleModiferChord) {
      const [dispatchKeyname] = userKeypress.getSingleModifierDispatchChords();
      userPressedChord = dispatchKeyname;
      currentChords = dispatchKeyname ? [dispatchKeyname] : [];
    } else {
      [userPressedChord] = userKeypress.getDispatchChords();
      currentChords = this._currentChords.map(({ keypress }) => keypress);
    }
    if (userPressedChord === null) {
      this._log(`\\ Keyboard event cannot be dispatched in keydown phase.`);
      return shouldPreventDefault;
    }
    const contextValue = this._contextKeyService.getContext(target);
    const keypressLabel = userKeypress.getLabel();
    const resolveResult = this._getResolver().resolve(contextValue, currentChords, userPressedChord);
    switch (resolveResult.kind) {
      case ResultKind.NoMatchingKb: {
        this._logService.trace("KeybindingService#dispatch", keypressLabel, `[ No matching keybinding ]`);
        if (this.inChordMode) {
          const currentChordsLabel = this._currentChords.map(({ label }) => label).join(", ");
          this._log(`+ Leaving multi-chord mode: Nothing bound to "${currentChordsLabel}, ${keypressLabel}".`);
          this._notificationService.status(nls.localize("missing.chord", "The key combination ({0}, {1}) is not a command.", currentChordsLabel, keypressLabel), {
            hideAfter: 10 * 1e3
            /* 10s */
          });
          this._leaveChordMode();
          shouldPreventDefault = true;
        }
        return shouldPreventDefault;
      }
      case ResultKind.MoreChordsNeeded: {
        this._logService.trace("KeybindingService#dispatch", keypressLabel, `[ Several keybindings match - more chords needed ]`);
        shouldPreventDefault = true;
        this._expectAnotherChord(userPressedChord, keypressLabel);
        this._log(this._currentChords.length === 1 ? `+ Entering multi-chord mode...` : `+ Continuing multi-chord mode...`);
        return shouldPreventDefault;
      }
      case ResultKind.KbFound: {
        this._logService.trace("KeybindingService#dispatch", keypressLabel, `[ Will dispatch command ${resolveResult.commandId} ]`);
        if (resolveResult.commandId === null || resolveResult.commandId === "") {
          if (this.inChordMode) {
            const currentChordsLabel = this._currentChords.map(({ label }) => label).join(", ");
            this._log(`+ Leaving chord mode: Nothing bound to "${currentChordsLabel}, ${keypressLabel}".`);
            this._notificationService.status(nls.localize("missing.chord", "The key combination ({0}, {1}) is not a command.", currentChordsLabel, keypressLabel), {
              hideAfter: 10 * 1e3
              /* 10s */
            });
            this._leaveChordMode();
            shouldPreventDefault = true;
          }
        } else {
          if (this.inChordMode) {
            this._leaveChordMode();
          }
          if (!resolveResult.isBubble) {
            shouldPreventDefault = true;
          }
          this._log(`+ Invoking command ${resolveResult.commandId}.`);
          this._currentlyDispatchingCommandId = resolveResult.commandId;
          try {
            if (typeof resolveResult.commandArgs === "undefined") {
              this._commandService.executeCommand(resolveResult.commandId).then(void 0, (err) => this._notificationService.warn(err));
            } else {
              this._commandService.executeCommand(resolveResult.commandId, resolveResult.commandArgs).then(void 0, (err) => this._notificationService.warn(err));
            }
          } finally {
            this._currentlyDispatchingCommandId = null;
          }
          if (!HIGH_FREQ_COMMANDS.test(resolveResult.commandId)) {
            this._telemetryService.publicLog2("workbenchActionExecuted", { id: resolveResult.commandId, from: "keybinding", detail: userKeypress.getUserSettingsLabel() ?? void 0 });
          }
        }
        return shouldPreventDefault;
      }
    }
  }
  mightProducePrintableCharacter(event) {
    if (event.ctrlKey || event.metaKey) {
      return false;
    }
    if (event.keyCode >= KeyCode.KeyA && event.keyCode <= KeyCode.KeyZ || event.keyCode >= KeyCode.Digit0 && event.keyCode <= KeyCode.Digit9) {
      return true;
    }
    return false;
  }
}
class KeybindingModifierSet {
  static {
    __name(this, "KeybindingModifierSet");
  }
  static EMPTY = new KeybindingModifierSet(null);
  _ctrlKey;
  _shiftKey;
  _altKey;
  _metaKey;
  constructor(source) {
    this._ctrlKey = source ? source.ctrlKey : false;
    this._shiftKey = source ? source.shiftKey : false;
    this._altKey = source ? source.altKey : false;
    this._metaKey = source ? source.metaKey : false;
  }
  has(modifier) {
    switch (modifier) {
      case "ctrl":
        return this._ctrlKey;
      case "shift":
        return this._shiftKey;
      case "alt":
        return this._altKey;
      case "meta":
        return this._metaKey;
    }
  }
}
export {
  AbstractKeybindingService
};
//# sourceMappingURL=abstractKeybindingService.js.map
