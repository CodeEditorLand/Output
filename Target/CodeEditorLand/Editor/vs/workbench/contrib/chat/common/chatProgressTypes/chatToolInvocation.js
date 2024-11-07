var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { DeferredPromise } from "../../../../../base/common/async.js";
import { IChatToolInvocation, IChatToolInvocationSerialized } from "../chatService.js";
import { IToolConfirmationMessages } from "../languageModelToolsService.js";
class ChatToolInvocation {
  constructor(invocationMessage, _confirmationMessages) {
    this.invocationMessage = invocationMessage;
    this._confirmationMessages = _confirmationMessages;
    if (!_confirmationMessages) {
      this._isConfirmed = true;
      this._confirmDeferred.complete(true);
    }
    this._confirmDeferred.p.then((confirmed) => {
      this._isConfirmed = confirmed;
      this._confirmationMessages = void 0;
      if (!confirmed) {
        this._isCompleteDeferred.complete();
      }
    });
    this._isCompleteDeferred.p.then(() => {
      this._isComplete = true;
    });
  }
  static {
    __name(this, "ChatToolInvocation");
  }
  kind = "toolInvocation";
  _isComplete = false;
  get isComplete() {
    return this._isComplete;
  }
  _isCompleteDeferred = new DeferredPromise();
  get isCompleteDeferred() {
    return this._isCompleteDeferred;
  }
  _isCanceled;
  get isCanceled() {
    return this._isCanceled;
  }
  _confirmDeferred = new DeferredPromise();
  get confirmed() {
    return this._confirmDeferred;
  }
  _isConfirmed;
  get isConfirmed() {
    return this._isConfirmed;
  }
  get confirmationMessages() {
    return this._confirmationMessages;
  }
  toJSON() {
    return {
      kind: "toolInvocationSerialized",
      invocationMessage: this.invocationMessage,
      isConfirmed: this._isConfirmed ?? false,
      isComplete: this._isComplete
    };
  }
}
export {
  ChatToolInvocation
};
//# sourceMappingURL=chatToolInvocation.js.map
