var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { ExtHostSecretStateShape, MainContext, MainThreadSecretStateShape } from "./extHost.protocol.js";
import { Emitter } from "../../../base/common/event.js";
import { IExtHostRpcService } from "./extHostRpcService.js";
import { createDecorator } from "../../../platform/instantiation/common/instantiation.js";
class ExtHostSecretState {
  static {
    __name(this, "ExtHostSecretState");
  }
  _proxy;
  _onDidChangePassword = new Emitter();
  onDidChangePassword = this._onDidChangePassword.event;
  constructor(mainContext) {
    this._proxy = mainContext.getProxy(MainContext.MainThreadSecretState);
  }
  async $onDidChangePassword(e) {
    this._onDidChangePassword.fire(e);
  }
  get(extensionId, key) {
    return this._proxy.$getPassword(extensionId, key);
  }
  store(extensionId, key, value) {
    return this._proxy.$setPassword(extensionId, key, value);
  }
  delete(extensionId, key) {
    return this._proxy.$deletePassword(extensionId, key);
  }
}
const IExtHostSecretState = createDecorator("IExtHostSecretState");
export {
  ExtHostSecretState,
  IExtHostSecretState
};
//# sourceMappingURL=extHostSecretState.js.map
