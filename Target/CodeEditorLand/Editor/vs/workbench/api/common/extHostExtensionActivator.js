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
import * as errors from "../../../base/common/errors.js";
import { Disposable, IDisposable } from "../../../base/common/lifecycle.js";
import { ExtensionDescriptionRegistry } from "../../services/extensions/common/extensionDescriptionRegistry.js";
import { ExtensionIdentifier, ExtensionIdentifierMap } from "../../../platform/extensions/common/extensions.js";
import { ExtensionActivationReason, MissingExtensionDependency } from "../../services/extensions/common/extensions.js";
import { ILogService } from "../../../platform/log/common/log.js";
import { Barrier } from "../../../base/common/async.js";
class ExtensionActivationTimes {
  static {
    __name(this, "ExtensionActivationTimes");
  }
  static NONE = new ExtensionActivationTimes(false, -1, -1, -1);
  startup;
  codeLoadingTime;
  activateCallTime;
  activateResolvedTime;
  constructor(startup, codeLoadingTime, activateCallTime, activateResolvedTime) {
    this.startup = startup;
    this.codeLoadingTime = codeLoadingTime;
    this.activateCallTime = activateCallTime;
    this.activateResolvedTime = activateResolvedTime;
  }
}
class ExtensionActivationTimesBuilder {
  static {
    __name(this, "ExtensionActivationTimesBuilder");
  }
  _startup;
  _codeLoadingStart;
  _codeLoadingStop;
  _activateCallStart;
  _activateCallStop;
  _activateResolveStart;
  _activateResolveStop;
  constructor(startup) {
    this._startup = startup;
    this._codeLoadingStart = -1;
    this._codeLoadingStop = -1;
    this._activateCallStart = -1;
    this._activateCallStop = -1;
    this._activateResolveStart = -1;
    this._activateResolveStop = -1;
  }
  _delta(start, stop) {
    if (start === -1 || stop === -1) {
      return -1;
    }
    return stop - start;
  }
  build() {
    return new ExtensionActivationTimes(
      this._startup,
      this._delta(this._codeLoadingStart, this._codeLoadingStop),
      this._delta(this._activateCallStart, this._activateCallStop),
      this._delta(this._activateResolveStart, this._activateResolveStop)
    );
  }
  codeLoadingStart() {
    this._codeLoadingStart = Date.now();
  }
  codeLoadingStop() {
    this._codeLoadingStop = Date.now();
  }
  activateCallStart() {
    this._activateCallStart = Date.now();
  }
  activateCallStop() {
    this._activateCallStop = Date.now();
  }
  activateResolveStart() {
    this._activateResolveStart = Date.now();
  }
  activateResolveStop() {
    this._activateResolveStop = Date.now();
  }
}
class ActivatedExtension {
  static {
    __name(this, "ActivatedExtension");
  }
  activationFailed;
  activationFailedError;
  activationTimes;
  module;
  exports;
  disposable;
  constructor(activationFailed, activationFailedError, activationTimes, module, exports, disposable) {
    this.activationFailed = activationFailed;
    this.activationFailedError = activationFailedError;
    this.activationTimes = activationTimes;
    this.module = module;
    this.exports = exports;
    this.disposable = disposable;
  }
}
class EmptyExtension extends ActivatedExtension {
  static {
    __name(this, "EmptyExtension");
  }
  constructor(activationTimes) {
    super(false, null, activationTimes, { activate: void 0, deactivate: void 0 }, void 0, Disposable.None);
  }
}
class HostExtension extends ActivatedExtension {
  static {
    __name(this, "HostExtension");
  }
  constructor() {
    super(false, null, ExtensionActivationTimes.NONE, { activate: void 0, deactivate: void 0 }, void 0, Disposable.None);
  }
}
class FailedExtension extends ActivatedExtension {
  static {
    __name(this, "FailedExtension");
  }
  constructor(activationError) {
    super(true, activationError, ExtensionActivationTimes.NONE, { activate: void 0, deactivate: void 0 }, void 0, Disposable.None);
  }
}
let ExtensionsActivator = class {
  constructor(registry, globalRegistry, host, _logService) {
    this._logService = _logService;
    this._registry = registry;
    this._globalRegistry = globalRegistry;
    this._host = host;
    this._operations = new ExtensionIdentifierMap();
    this._alreadyActivatedEvents = /* @__PURE__ */ Object.create(null);
  }
  static {
    __name(this, "ExtensionsActivator");
  }
  _registry;
  _globalRegistry;
  _host;
  _operations;
  /**
   * A map of already activated events to speed things up if the same activation event is triggered multiple times.
   */
  _alreadyActivatedEvents;
  dispose() {
    for (const [_, op] of this._operations) {
      op.dispose();
    }
  }
  async waitForActivatingExtensions() {
    const res = [];
    for (const [_, op] of this._operations) {
      res.push(op.wait());
    }
    await Promise.all(res);
  }
  isActivated(extensionId) {
    const op = this._operations.get(extensionId);
    return Boolean(op && op.value);
  }
  getActivatedExtension(extensionId) {
    const op = this._operations.get(extensionId);
    if (!op || !op.value) {
      throw new Error(`Extension '${extensionId.value}' is not known or not activated`);
    }
    return op.value;
  }
  async activateByEvent(activationEvent, startup) {
    if (this._alreadyActivatedEvents[activationEvent]) {
      return;
    }
    const activateExtensions = this._registry.getExtensionDescriptionsForActivationEvent(activationEvent);
    await this._activateExtensions(activateExtensions.map((e) => ({
      id: e.identifier,
      reason: { startup, extensionId: e.identifier, activationEvent }
    })));
    this._alreadyActivatedEvents[activationEvent] = true;
  }
  activateById(extensionId, reason) {
    const desc = this._registry.getExtensionDescription(extensionId);
    if (!desc) {
      throw new Error(`Extension '${extensionId.value}' is not known`);
    }
    return this._activateExtensions([{ id: desc.identifier, reason }]);
  }
  async _activateExtensions(extensions) {
    const operations = extensions.filter((p) => !this.isActivated(p.id)).map((ext) => this._handleActivationRequest(ext));
    await Promise.all(operations.map((op) => op.wait()));
  }
  /**
   * Handle semantics related to dependencies for `currentExtension`.
   * We don't need to worry about dependency loops because they are handled by the registry.
   */
  _handleActivationRequest(currentActivation) {
    if (this._operations.has(currentActivation.id)) {
      return this._operations.get(currentActivation.id);
    }
    if (this._isHostExtension(currentActivation.id)) {
      return this._createAndSaveOperation(currentActivation, null, [], null);
    }
    const currentExtension = this._registry.getExtensionDescription(currentActivation.id);
    if (!currentExtension) {
      const error = new Error(`Cannot activate unknown extension '${currentActivation.id.value}'`);
      const result = this._createAndSaveOperation(currentActivation, null, [], new FailedExtension(error));
      this._host.onExtensionActivationError(
        currentActivation.id,
        error,
        new MissingExtensionDependency(currentActivation.id.value)
      );
      return result;
    }
    const deps = [];
    const depIds = typeof currentExtension.extensionDependencies === "undefined" ? [] : currentExtension.extensionDependencies;
    for (const depId of depIds) {
      if (this._isResolvedExtension(depId)) {
        continue;
      }
      const dep = this._operations.get(depId);
      if (dep) {
        deps.push(dep);
        continue;
      }
      if (this._isHostExtension(depId)) {
        deps.push(this._handleActivationRequest({
          id: this._globalRegistry.getExtensionDescription(depId).identifier,
          reason: currentActivation.reason
        }));
        continue;
      }
      const depDesc = this._registry.getExtensionDescription(depId);
      if (depDesc) {
        if (!depDesc.main && !depDesc.browser) {
          continue;
        }
        deps.push(this._handleActivationRequest({
          id: depDesc.identifier,
          reason: currentActivation.reason
        }));
        continue;
      }
      const currentExtensionFriendlyName = currentExtension.displayName || currentExtension.identifier.value;
      const error = new Error(`Cannot activate the '${currentExtensionFriendlyName}' extension because it depends on unknown extension '${depId}'`);
      const result = this._createAndSaveOperation(currentActivation, currentExtension.displayName, [], new FailedExtension(error));
      this._host.onExtensionActivationError(
        currentExtension.identifier,
        error,
        new MissingExtensionDependency(depId)
      );
      return result;
    }
    return this._createAndSaveOperation(currentActivation, currentExtension.displayName, deps, null);
  }
  _createAndSaveOperation(activation, displayName, deps, value) {
    const operation = new ActivationOperation(activation.id, displayName, activation.reason, deps, value, this._host, this._logService);
    this._operations.set(activation.id, operation);
    return operation;
  }
  _isHostExtension(extensionId) {
    return ExtensionDescriptionRegistry.isHostExtension(extensionId, this._registry, this._globalRegistry);
  }
  _isResolvedExtension(extensionId) {
    const extensionDescription = this._globalRegistry.getExtensionDescription(extensionId);
    if (!extensionDescription) {
      return false;
    }
    return !extensionDescription.main && !extensionDescription.browser;
  }
};
ExtensionsActivator = __decorateClass([
  __decorateParam(3, ILogService)
], ExtensionsActivator);
let ActivationOperation = class {
  constructor(_id, _displayName, _reason, _deps, _value, _host, _logService) {
    this._id = _id;
    this._displayName = _displayName;
    this._reason = _reason;
    this._deps = _deps;
    this._value = _value;
    this._host = _host;
    this._logService = _logService;
    this._initialize();
  }
  static {
    __name(this, "ActivationOperation");
  }
  _barrier = new Barrier();
  _isDisposed = false;
  get value() {
    return this._value;
  }
  get friendlyName() {
    return this._displayName || this._id.value;
  }
  dispose() {
    this._isDisposed = true;
  }
  wait() {
    return this._barrier.wait();
  }
  async _initialize() {
    await this._waitForDepsThenActivate();
    this._barrier.open();
  }
  async _waitForDepsThenActivate() {
    if (this._value) {
      return;
    }
    while (this._deps.length > 0) {
      for (let i = 0; i < this._deps.length; i++) {
        const dep = this._deps[i];
        if (dep.value && !dep.value.activationFailed) {
          this._deps.splice(i, 1);
          i--;
          continue;
        }
        if (dep.value && dep.value.activationFailed) {
          const error = new Error(`Cannot activate the '${this.friendlyName}' extension because its dependency '${dep.friendlyName}' failed to activate`);
          error.detail = dep.value.activationFailedError;
          this._value = new FailedExtension(error);
          this._host.onExtensionActivationError(this._id, error, null);
          return;
        }
      }
      if (this._deps.length > 0) {
        await Promise.race(this._deps.map((dep) => dep.wait()));
      }
    }
    await this._activate();
  }
  async _activate() {
    try {
      this._value = await this._host.actualActivateExtension(this._id, this._reason);
    } catch (err) {
      const error = new Error();
      if (err && err.name) {
        error.name = err.name;
      }
      if (err && err.message) {
        error.message = `Activating extension '${this._id.value}' failed: ${err.message}.`;
      } else {
        error.message = `Activating extension '${this._id.value}' failed: ${err}.`;
      }
      if (err && err.stack) {
        error.stack = err.stack;
      }
      this._value = new FailedExtension(error);
      if (this._isDisposed && errors.isCancellationError(err)) {
        return;
      }
      this._host.onExtensionActivationError(this._id, error, null);
      this._logService.error(`Activating extension ${this._id.value} failed due to an error:`);
      this._logService.error(err);
    }
  }
};
ActivationOperation = __decorateClass([
  __decorateParam(6, ILogService)
], ActivationOperation);
export {
  ActivatedExtension,
  EmptyExtension,
  ExtensionActivationTimes,
  ExtensionActivationTimesBuilder,
  ExtensionsActivator,
  HostExtension
};
//# sourceMappingURL=extHostExtensionActivator.js.map
