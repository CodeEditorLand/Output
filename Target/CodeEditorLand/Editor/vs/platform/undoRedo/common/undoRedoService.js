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
import { onUnexpectedError } from "../../../base/common/errors.js";
import { Disposable, IDisposable, isDisposable } from "../../../base/common/lifecycle.js";
import { Schemas } from "../../../base/common/network.js";
import Severity from "../../../base/common/severity.js";
import { URI } from "../../../base/common/uri.js";
import * as nls from "../../../nls.js";
import { IDialogService } from "../../dialogs/common/dialogs.js";
import { InstantiationType, registerSingleton } from "../../instantiation/common/extensions.js";
import { INotificationService } from "../../notification/common/notification.js";
import { IPastFutureElements, IResourceUndoRedoElement, IUndoRedoElement, IUndoRedoService, IWorkspaceUndoRedoElement, ResourceEditStackSnapshot, UndoRedoElementType, UndoRedoGroup, UndoRedoSource, UriComparisonKeyComputer } from "./undoRedo.js";
const DEBUG = false;
function getResourceLabel(resource) {
  return resource.scheme === Schemas.file ? resource.fsPath : resource.path;
}
__name(getResourceLabel, "getResourceLabel");
let stackElementCounter = 0;
class ResourceStackElement {
  static {
    __name(this, "ResourceStackElement");
  }
  id = ++stackElementCounter;
  type = UndoRedoElementType.Resource;
  actual;
  label;
  confirmBeforeUndo;
  resourceLabel;
  strResource;
  resourceLabels;
  strResources;
  groupId;
  groupOrder;
  sourceId;
  sourceOrder;
  isValid;
  constructor(actual, resourceLabel, strResource, groupId, groupOrder, sourceId, sourceOrder) {
    this.actual = actual;
    this.label = actual.label;
    this.confirmBeforeUndo = actual.confirmBeforeUndo || false;
    this.resourceLabel = resourceLabel;
    this.strResource = strResource;
    this.resourceLabels = [this.resourceLabel];
    this.strResources = [this.strResource];
    this.groupId = groupId;
    this.groupOrder = groupOrder;
    this.sourceId = sourceId;
    this.sourceOrder = sourceOrder;
    this.isValid = true;
  }
  setValid(isValid) {
    this.isValid = isValid;
  }
  toString() {
    return `[id:${this.id}] [group:${this.groupId}] [${this.isValid ? "  VALID" : "INVALID"}] ${this.actual.constructor.name} - ${this.actual}`;
  }
}
var RemovedResourceReason = /* @__PURE__ */ ((RemovedResourceReason2) => {
  RemovedResourceReason2[RemovedResourceReason2["ExternalRemoval"] = 0] = "ExternalRemoval";
  RemovedResourceReason2[RemovedResourceReason2["NoParallelUniverses"] = 1] = "NoParallelUniverses";
  return RemovedResourceReason2;
})(RemovedResourceReason || {});
class ResourceReasonPair {
  constructor(resourceLabel, reason) {
    this.resourceLabel = resourceLabel;
    this.reason = reason;
  }
  static {
    __name(this, "ResourceReasonPair");
  }
}
class RemovedResources {
  static {
    __name(this, "RemovedResources");
  }
  elements = /* @__PURE__ */ new Map();
  createMessage() {
    const externalRemoval = [];
    const noParallelUniverses = [];
    for (const [, element] of this.elements) {
      const dest = element.reason === 0 /* ExternalRemoval */ ? externalRemoval : noParallelUniverses;
      dest.push(element.resourceLabel);
    }
    const messages = [];
    if (externalRemoval.length > 0) {
      messages.push(
        nls.localize(
          { key: "externalRemoval", comment: ["{0} is a list of filenames"] },
          "The following files have been closed and modified on disk: {0}.",
          externalRemoval.join(", ")
        )
      );
    }
    if (noParallelUniverses.length > 0) {
      messages.push(
        nls.localize(
          { key: "noParallelUniverses", comment: ["{0} is a list of filenames"] },
          "The following files have been modified in an incompatible way: {0}.",
          noParallelUniverses.join(", ")
        )
      );
    }
    return messages.join("\n");
  }
  get size() {
    return this.elements.size;
  }
  has(strResource) {
    return this.elements.has(strResource);
  }
  set(strResource, value) {
    this.elements.set(strResource, value);
  }
  delete(strResource) {
    return this.elements.delete(strResource);
  }
}
class WorkspaceStackElement {
  static {
    __name(this, "WorkspaceStackElement");
  }
  id = ++stackElementCounter;
  type = UndoRedoElementType.Workspace;
  actual;
  label;
  confirmBeforeUndo;
  resourceLabels;
  strResources;
  groupId;
  groupOrder;
  sourceId;
  sourceOrder;
  removedResources;
  invalidatedResources;
  constructor(actual, resourceLabels, strResources, groupId, groupOrder, sourceId, sourceOrder) {
    this.actual = actual;
    this.label = actual.label;
    this.confirmBeforeUndo = actual.confirmBeforeUndo || false;
    this.resourceLabels = resourceLabels;
    this.strResources = strResources;
    this.groupId = groupId;
    this.groupOrder = groupOrder;
    this.sourceId = sourceId;
    this.sourceOrder = sourceOrder;
    this.removedResources = null;
    this.invalidatedResources = null;
  }
  canSplit() {
    return typeof this.actual.split === "function";
  }
  removeResource(resourceLabel, strResource, reason) {
    if (!this.removedResources) {
      this.removedResources = new RemovedResources();
    }
    if (!this.removedResources.has(strResource)) {
      this.removedResources.set(strResource, new ResourceReasonPair(resourceLabel, reason));
    }
  }
  setValid(resourceLabel, strResource, isValid) {
    if (isValid) {
      if (this.invalidatedResources) {
        this.invalidatedResources.delete(strResource);
        if (this.invalidatedResources.size === 0) {
          this.invalidatedResources = null;
        }
      }
    } else {
      if (!this.invalidatedResources) {
        this.invalidatedResources = new RemovedResources();
      }
      if (!this.invalidatedResources.has(strResource)) {
        this.invalidatedResources.set(strResource, new ResourceReasonPair(resourceLabel, 0 /* ExternalRemoval */));
      }
    }
  }
  toString() {
    return `[id:${this.id}] [group:${this.groupId}] [${this.invalidatedResources ? "INVALID" : "  VALID"}] ${this.actual.constructor.name} - ${this.actual}`;
  }
}
class ResourceEditStack {
  static {
    __name(this, "ResourceEditStack");
  }
  resourceLabel;
  strResource;
  _past;
  _future;
  locked;
  versionId;
  constructor(resourceLabel, strResource) {
    this.resourceLabel = resourceLabel;
    this.strResource = strResource;
    this._past = [];
    this._future = [];
    this.locked = false;
    this.versionId = 1;
  }
  dispose() {
    for (const element of this._past) {
      if (element.type === UndoRedoElementType.Workspace) {
        element.removeResource(this.resourceLabel, this.strResource, 0 /* ExternalRemoval */);
      }
    }
    for (const element of this._future) {
      if (element.type === UndoRedoElementType.Workspace) {
        element.removeResource(this.resourceLabel, this.strResource, 0 /* ExternalRemoval */);
      }
    }
    this.versionId++;
  }
  toString() {
    const result = [];
    result.push(`* ${this.strResource}:`);
    for (let i = 0; i < this._past.length; i++) {
      result.push(`   * [UNDO] ${this._past[i]}`);
    }
    for (let i = this._future.length - 1; i >= 0; i--) {
      result.push(`   * [REDO] ${this._future[i]}`);
    }
    return result.join("\n");
  }
  flushAllElements() {
    this._past = [];
    this._future = [];
    this.versionId++;
  }
  setElementsIsValid(isValid) {
    for (const element of this._past) {
      if (element.type === UndoRedoElementType.Workspace) {
        element.setValid(this.resourceLabel, this.strResource, isValid);
      } else {
        element.setValid(isValid);
      }
    }
    for (const element of this._future) {
      if (element.type === UndoRedoElementType.Workspace) {
        element.setValid(this.resourceLabel, this.strResource, isValid);
      } else {
        element.setValid(isValid);
      }
    }
  }
  _setElementValidFlag(element, isValid) {
    if (element.type === UndoRedoElementType.Workspace) {
      element.setValid(this.resourceLabel, this.strResource, isValid);
    } else {
      element.setValid(isValid);
    }
  }
  setElementsValidFlag(isValid, filter) {
    for (const element of this._past) {
      if (filter(element.actual)) {
        this._setElementValidFlag(element, isValid);
      }
    }
    for (const element of this._future) {
      if (filter(element.actual)) {
        this._setElementValidFlag(element, isValid);
      }
    }
  }
  pushElement(element) {
    for (const futureElement of this._future) {
      if (futureElement.type === UndoRedoElementType.Workspace) {
        futureElement.removeResource(this.resourceLabel, this.strResource, 1 /* NoParallelUniverses */);
      }
    }
    this._future = [];
    this._past.push(element);
    this.versionId++;
  }
  createSnapshot(resource) {
    const elements = [];
    for (let i = 0, len = this._past.length; i < len; i++) {
      elements.push(this._past[i].id);
    }
    for (let i = this._future.length - 1; i >= 0; i--) {
      elements.push(this._future[i].id);
    }
    return new ResourceEditStackSnapshot(resource, elements);
  }
  restoreSnapshot(snapshot) {
    const snapshotLength = snapshot.elements.length;
    let isOK = true;
    let snapshotIndex = 0;
    let removePastAfter = -1;
    for (let i = 0, len = this._past.length; i < len; i++, snapshotIndex++) {
      const element = this._past[i];
      if (isOK && (snapshotIndex >= snapshotLength || element.id !== snapshot.elements[snapshotIndex])) {
        isOK = false;
        removePastAfter = 0;
      }
      if (!isOK && element.type === UndoRedoElementType.Workspace) {
        element.removeResource(this.resourceLabel, this.strResource, 0 /* ExternalRemoval */);
      }
    }
    let removeFutureBefore = -1;
    for (let i = this._future.length - 1; i >= 0; i--, snapshotIndex++) {
      const element = this._future[i];
      if (isOK && (snapshotIndex >= snapshotLength || element.id !== snapshot.elements[snapshotIndex])) {
        isOK = false;
        removeFutureBefore = i;
      }
      if (!isOK && element.type === UndoRedoElementType.Workspace) {
        element.removeResource(this.resourceLabel, this.strResource, 0 /* ExternalRemoval */);
      }
    }
    if (removePastAfter !== -1) {
      this._past = this._past.slice(0, removePastAfter);
    }
    if (removeFutureBefore !== -1) {
      this._future = this._future.slice(removeFutureBefore + 1);
    }
    this.versionId++;
  }
  getElements() {
    const past = [];
    const future = [];
    for (const element of this._past) {
      past.push(element.actual);
    }
    for (const element of this._future) {
      future.push(element.actual);
    }
    return { past, future };
  }
  getClosestPastElement() {
    if (this._past.length === 0) {
      return null;
    }
    return this._past[this._past.length - 1];
  }
  getSecondClosestPastElement() {
    if (this._past.length < 2) {
      return null;
    }
    return this._past[this._past.length - 2];
  }
  getClosestFutureElement() {
    if (this._future.length === 0) {
      return null;
    }
    return this._future[this._future.length - 1];
  }
  hasPastElements() {
    return this._past.length > 0;
  }
  hasFutureElements() {
    return this._future.length > 0;
  }
  splitPastWorkspaceElement(toRemove, individualMap) {
    for (let j = this._past.length - 1; j >= 0; j--) {
      if (this._past[j] === toRemove) {
        if (individualMap.has(this.strResource)) {
          this._past[j] = individualMap.get(this.strResource);
        } else {
          this._past.splice(j, 1);
        }
        break;
      }
    }
    this.versionId++;
  }
  splitFutureWorkspaceElement(toRemove, individualMap) {
    for (let j = this._future.length - 1; j >= 0; j--) {
      if (this._future[j] === toRemove) {
        if (individualMap.has(this.strResource)) {
          this._future[j] = individualMap.get(this.strResource);
        } else {
          this._future.splice(j, 1);
        }
        break;
      }
    }
    this.versionId++;
  }
  moveBackward(element) {
    this._past.pop();
    this._future.push(element);
    this.versionId++;
  }
  moveForward(element) {
    this._future.pop();
    this._past.push(element);
    this.versionId++;
  }
}
class EditStackSnapshot {
  static {
    __name(this, "EditStackSnapshot");
  }
  editStacks;
  _versionIds;
  constructor(editStacks) {
    this.editStacks = editStacks;
    this._versionIds = [];
    for (let i = 0, len = this.editStacks.length; i < len; i++) {
      this._versionIds[i] = this.editStacks[i].versionId;
    }
  }
  isValid() {
    for (let i = 0, len = this.editStacks.length; i < len; i++) {
      if (this._versionIds[i] !== this.editStacks[i].versionId) {
        return false;
      }
    }
    return true;
  }
}
const missingEditStack = new ResourceEditStack("", "");
missingEditStack.locked = true;
let UndoRedoService = class {
  constructor(_dialogService, _notificationService) {
    this._dialogService = _dialogService;
    this._notificationService = _notificationService;
    this._editStacks = /* @__PURE__ */ new Map();
    this._uriComparisonKeyComputers = [];
  }
  static {
    __name(this, "UndoRedoService");
  }
  _editStacks;
  _uriComparisonKeyComputers;
  registerUriComparisonKeyComputer(scheme, uriComparisonKeyComputer) {
    this._uriComparisonKeyComputers.push([scheme, uriComparisonKeyComputer]);
    return {
      dispose: /* @__PURE__ */ __name(() => {
        for (let i = 0, len = this._uriComparisonKeyComputers.length; i < len; i++) {
          if (this._uriComparisonKeyComputers[i][1] === uriComparisonKeyComputer) {
            this._uriComparisonKeyComputers.splice(i, 1);
            return;
          }
        }
      }, "dispose")
    };
  }
  getUriComparisonKey(resource) {
    for (const uriComparisonKeyComputer of this._uriComparisonKeyComputers) {
      if (uriComparisonKeyComputer[0] === resource.scheme) {
        return uriComparisonKeyComputer[1].getComparisonKey(resource);
      }
    }
    return resource.toString();
  }
  _print(label) {
    console.log(`------------------------------------`);
    console.log(`AFTER ${label}: `);
    const str = [];
    for (const element of this._editStacks) {
      str.push(element[1].toString());
    }
    console.log(str.join("\n"));
  }
  pushElement(element, group = UndoRedoGroup.None, source = UndoRedoSource.None) {
    if (element.type === UndoRedoElementType.Resource) {
      const resourceLabel = getResourceLabel(element.resource);
      const strResource = this.getUriComparisonKey(element.resource);
      this._pushElement(new ResourceStackElement(element, resourceLabel, strResource, group.id, group.nextOrder(), source.id, source.nextOrder()));
    } else {
      const seen = /* @__PURE__ */ new Set();
      const resourceLabels = [];
      const strResources = [];
      for (const resource of element.resources) {
        const resourceLabel = getResourceLabel(resource);
        const strResource = this.getUriComparisonKey(resource);
        if (seen.has(strResource)) {
          continue;
        }
        seen.add(strResource);
        resourceLabels.push(resourceLabel);
        strResources.push(strResource);
      }
      if (resourceLabels.length === 1) {
        this._pushElement(new ResourceStackElement(element, resourceLabels[0], strResources[0], group.id, group.nextOrder(), source.id, source.nextOrder()));
      } else {
        this._pushElement(new WorkspaceStackElement(element, resourceLabels, strResources, group.id, group.nextOrder(), source.id, source.nextOrder()));
      }
    }
    if (DEBUG) {
      this._print("pushElement");
    }
  }
  _pushElement(element) {
    for (let i = 0, len = element.strResources.length; i < len; i++) {
      const resourceLabel = element.resourceLabels[i];
      const strResource = element.strResources[i];
      let editStack;
      if (this._editStacks.has(strResource)) {
        editStack = this._editStacks.get(strResource);
      } else {
        editStack = new ResourceEditStack(resourceLabel, strResource);
        this._editStacks.set(strResource, editStack);
      }
      editStack.pushElement(element);
    }
  }
  getLastElement(resource) {
    const strResource = this.getUriComparisonKey(resource);
    if (this._editStacks.has(strResource)) {
      const editStack = this._editStacks.get(strResource);
      if (editStack.hasFutureElements()) {
        return null;
      }
      const closestPastElement = editStack.getClosestPastElement();
      return closestPastElement ? closestPastElement.actual : null;
    }
    return null;
  }
  _splitPastWorkspaceElement(toRemove, ignoreResources) {
    const individualArr = toRemove.actual.split();
    const individualMap = /* @__PURE__ */ new Map();
    for (const _element of individualArr) {
      const resourceLabel = getResourceLabel(_element.resource);
      const strResource = this.getUriComparisonKey(_element.resource);
      const element = new ResourceStackElement(_element, resourceLabel, strResource, 0, 0, 0, 0);
      individualMap.set(element.strResource, element);
    }
    for (const strResource of toRemove.strResources) {
      if (ignoreResources && ignoreResources.has(strResource)) {
        continue;
      }
      const editStack = this._editStacks.get(strResource);
      editStack.splitPastWorkspaceElement(toRemove, individualMap);
    }
  }
  _splitFutureWorkspaceElement(toRemove, ignoreResources) {
    const individualArr = toRemove.actual.split();
    const individualMap = /* @__PURE__ */ new Map();
    for (const _element of individualArr) {
      const resourceLabel = getResourceLabel(_element.resource);
      const strResource = this.getUriComparisonKey(_element.resource);
      const element = new ResourceStackElement(_element, resourceLabel, strResource, 0, 0, 0, 0);
      individualMap.set(element.strResource, element);
    }
    for (const strResource of toRemove.strResources) {
      if (ignoreResources && ignoreResources.has(strResource)) {
        continue;
      }
      const editStack = this._editStacks.get(strResource);
      editStack.splitFutureWorkspaceElement(toRemove, individualMap);
    }
  }
  removeElements(resource) {
    const strResource = typeof resource === "string" ? resource : this.getUriComparisonKey(resource);
    if (this._editStacks.has(strResource)) {
      const editStack = this._editStacks.get(strResource);
      editStack.dispose();
      this._editStacks.delete(strResource);
    }
    if (DEBUG) {
      this._print("removeElements");
    }
  }
  setElementsValidFlag(resource, isValid, filter) {
    const strResource = this.getUriComparisonKey(resource);
    if (this._editStacks.has(strResource)) {
      const editStack = this._editStacks.get(strResource);
      editStack.setElementsValidFlag(isValid, filter);
    }
    if (DEBUG) {
      this._print("setElementsValidFlag");
    }
  }
  hasElements(resource) {
    const strResource = this.getUriComparisonKey(resource);
    if (this._editStacks.has(strResource)) {
      const editStack = this._editStacks.get(strResource);
      return editStack.hasPastElements() || editStack.hasFutureElements();
    }
    return false;
  }
  createSnapshot(resource) {
    const strResource = this.getUriComparisonKey(resource);
    if (this._editStacks.has(strResource)) {
      const editStack = this._editStacks.get(strResource);
      return editStack.createSnapshot(resource);
    }
    return new ResourceEditStackSnapshot(resource, []);
  }
  restoreSnapshot(snapshot) {
    const strResource = this.getUriComparisonKey(snapshot.resource);
    if (this._editStacks.has(strResource)) {
      const editStack = this._editStacks.get(strResource);
      editStack.restoreSnapshot(snapshot);
      if (!editStack.hasPastElements() && !editStack.hasFutureElements()) {
        editStack.dispose();
        this._editStacks.delete(strResource);
      }
    }
    if (DEBUG) {
      this._print("restoreSnapshot");
    }
  }
  getElements(resource) {
    const strResource = this.getUriComparisonKey(resource);
    if (this._editStacks.has(strResource)) {
      const editStack = this._editStacks.get(strResource);
      return editStack.getElements();
    }
    return { past: [], future: [] };
  }
  _findClosestUndoElementWithSource(sourceId) {
    if (!sourceId) {
      return [null, null];
    }
    let matchedElement = null;
    let matchedStrResource = null;
    for (const [strResource, editStack] of this._editStacks) {
      const candidate = editStack.getClosestPastElement();
      if (!candidate) {
        continue;
      }
      if (candidate.sourceId === sourceId) {
        if (!matchedElement || candidate.sourceOrder > matchedElement.sourceOrder) {
          matchedElement = candidate;
          matchedStrResource = strResource;
        }
      }
    }
    return [matchedElement, matchedStrResource];
  }
  canUndo(resourceOrSource) {
    if (resourceOrSource instanceof UndoRedoSource) {
      const [, matchedStrResource] = this._findClosestUndoElementWithSource(resourceOrSource.id);
      return matchedStrResource ? true : false;
    }
    const strResource = this.getUriComparisonKey(resourceOrSource);
    if (this._editStacks.has(strResource)) {
      const editStack = this._editStacks.get(strResource);
      return editStack.hasPastElements();
    }
    return false;
  }
  _onError(err, element) {
    onUnexpectedError(err);
    for (const strResource of element.strResources) {
      this.removeElements(strResource);
    }
    this._notificationService.error(err);
  }
  _acquireLocks(editStackSnapshot) {
    for (const editStack of editStackSnapshot.editStacks) {
      if (editStack.locked) {
        throw new Error("Cannot acquire edit stack lock");
      }
    }
    for (const editStack of editStackSnapshot.editStacks) {
      editStack.locked = true;
    }
    return () => {
      for (const editStack of editStackSnapshot.editStacks) {
        editStack.locked = false;
      }
    };
  }
  _safeInvokeWithLocks(element, invoke, editStackSnapshot, cleanup, continuation) {
    const releaseLocks = this._acquireLocks(editStackSnapshot);
    let result;
    try {
      result = invoke();
    } catch (err) {
      releaseLocks();
      cleanup.dispose();
      return this._onError(err, element);
    }
    if (result) {
      return result.then(
        () => {
          releaseLocks();
          cleanup.dispose();
          return continuation();
        },
        (err) => {
          releaseLocks();
          cleanup.dispose();
          return this._onError(err, element);
        }
      );
    } else {
      releaseLocks();
      cleanup.dispose();
      return continuation();
    }
  }
  async _invokeWorkspacePrepare(element) {
    if (typeof element.actual.prepareUndoRedo === "undefined") {
      return Disposable.None;
    }
    const result = element.actual.prepareUndoRedo();
    if (typeof result === "undefined") {
      return Disposable.None;
    }
    return result;
  }
  _invokeResourcePrepare(element, callback) {
    if (element.actual.type !== UndoRedoElementType.Workspace || typeof element.actual.prepareUndoRedo === "undefined") {
      return callback(Disposable.None);
    }
    const r = element.actual.prepareUndoRedo();
    if (!r) {
      return callback(Disposable.None);
    }
    if (isDisposable(r)) {
      return callback(r);
    }
    return r.then((disposable) => {
      return callback(disposable);
    });
  }
  _getAffectedEditStacks(element) {
    const affectedEditStacks = [];
    for (const strResource of element.strResources) {
      affectedEditStacks.push(this._editStacks.get(strResource) || missingEditStack);
    }
    return new EditStackSnapshot(affectedEditStacks);
  }
  _tryToSplitAndUndo(strResource, element, ignoreResources, message) {
    if (element.canSplit()) {
      this._splitPastWorkspaceElement(element, ignoreResources);
      this._notificationService.warn(message);
      return new WorkspaceVerificationError(this._undo(strResource, 0, true));
    } else {
      for (const strResource2 of element.strResources) {
        this.removeElements(strResource2);
      }
      this._notificationService.warn(message);
      return new WorkspaceVerificationError();
    }
  }
  _checkWorkspaceUndo(strResource, element, editStackSnapshot, checkInvalidatedResources) {
    if (element.removedResources) {
      return this._tryToSplitAndUndo(
        strResource,
        element,
        element.removedResources,
        nls.localize(
          { key: "cannotWorkspaceUndo", comment: ["{0} is a label for an operation. {1} is another message."] },
          "Could not undo '{0}' across all files. {1}",
          element.label,
          element.removedResources.createMessage()
        )
      );
    }
    if (checkInvalidatedResources && element.invalidatedResources) {
      return this._tryToSplitAndUndo(
        strResource,
        element,
        element.invalidatedResources,
        nls.localize(
          { key: "cannotWorkspaceUndo", comment: ["{0} is a label for an operation. {1} is another message."] },
          "Could not undo '{0}' across all files. {1}",
          element.label,
          element.invalidatedResources.createMessage()
        )
      );
    }
    const cannotUndoDueToResources = [];
    for (const editStack of editStackSnapshot.editStacks) {
      if (editStack.getClosestPastElement() !== element) {
        cannotUndoDueToResources.push(editStack.resourceLabel);
      }
    }
    if (cannotUndoDueToResources.length > 0) {
      return this._tryToSplitAndUndo(
        strResource,
        element,
        null,
        nls.localize(
          { key: "cannotWorkspaceUndoDueToChanges", comment: ["{0} is a label for an operation. {1} is a list of filenames."] },
          "Could not undo '{0}' across all files because changes were made to {1}",
          element.label,
          cannotUndoDueToResources.join(", ")
        )
      );
    }
    const cannotLockDueToResources = [];
    for (const editStack of editStackSnapshot.editStacks) {
      if (editStack.locked) {
        cannotLockDueToResources.push(editStack.resourceLabel);
      }
    }
    if (cannotLockDueToResources.length > 0) {
      return this._tryToSplitAndUndo(
        strResource,
        element,
        null,
        nls.localize(
          { key: "cannotWorkspaceUndoDueToInProgressUndoRedo", comment: ["{0} is a label for an operation. {1} is a list of filenames."] },
          "Could not undo '{0}' across all files because there is already an undo or redo operation running on {1}",
          element.label,
          cannotLockDueToResources.join(", ")
        )
      );
    }
    if (!editStackSnapshot.isValid()) {
      return this._tryToSplitAndUndo(
        strResource,
        element,
        null,
        nls.localize(
          { key: "cannotWorkspaceUndoDueToInMeantimeUndoRedo", comment: ["{0} is a label for an operation. {1} is a list of filenames."] },
          "Could not undo '{0}' across all files because an undo or redo operation occurred in the meantime",
          element.label
        )
      );
    }
    return null;
  }
  _workspaceUndo(strResource, element, undoConfirmed) {
    const affectedEditStacks = this._getAffectedEditStacks(element);
    const verificationError = this._checkWorkspaceUndo(
      strResource,
      element,
      affectedEditStacks,
      /*invalidated resources will be checked after the prepare call*/
      false
    );
    if (verificationError) {
      return verificationError.returnValue;
    }
    return this._confirmAndExecuteWorkspaceUndo(strResource, element, affectedEditStacks, undoConfirmed);
  }
  _isPartOfUndoGroup(element) {
    if (!element.groupId) {
      return false;
    }
    for (const [, editStack] of this._editStacks) {
      const pastElement = editStack.getClosestPastElement();
      if (!pastElement) {
        continue;
      }
      if (pastElement === element) {
        const secondPastElement = editStack.getSecondClosestPastElement();
        if (secondPastElement && secondPastElement.groupId === element.groupId) {
          return true;
        }
      }
      if (pastElement.groupId === element.groupId) {
        return true;
      }
    }
    return false;
  }
  async _confirmAndExecuteWorkspaceUndo(strResource, element, editStackSnapshot, undoConfirmed) {
    if (element.canSplit() && !this._isPartOfUndoGroup(element)) {
      let UndoChoice;
      ((UndoChoice2) => {
        UndoChoice2[UndoChoice2["All"] = 0] = "All";
        UndoChoice2[UndoChoice2["This"] = 1] = "This";
        UndoChoice2[UndoChoice2["Cancel"] = 2] = "Cancel";
      })(UndoChoice || (UndoChoice = {}));
      const { result } = await this._dialogService.prompt({
        type: Severity.Info,
        message: nls.localize("confirmWorkspace", "Would you like to undo '{0}' across all files?", element.label),
        buttons: [
          {
            label: nls.localize({ key: "ok", comment: ["{0} denotes a number that is > 1, && denotes a mnemonic"] }, "&&Undo in {0} Files", editStackSnapshot.editStacks.length),
            run: /* @__PURE__ */ __name(() => 0 /* All */, "run")
          },
          {
            label: nls.localize({ key: "nok", comment: ["&& denotes a mnemonic"] }, "Undo this &&File"),
            run: /* @__PURE__ */ __name(() => 1 /* This */, "run")
          }
        ],
        cancelButton: {
          run: /* @__PURE__ */ __name(() => 2 /* Cancel */, "run")
        }
      });
      if (result === 2 /* Cancel */) {
        return;
      }
      if (result === 1 /* This */) {
        this._splitPastWorkspaceElement(element, null);
        return this._undo(strResource, 0, true);
      }
      const verificationError1 = this._checkWorkspaceUndo(
        strResource,
        element,
        editStackSnapshot,
        /*invalidated resources will be checked after the prepare call*/
        false
      );
      if (verificationError1) {
        return verificationError1.returnValue;
      }
      undoConfirmed = true;
    }
    let cleanup;
    try {
      cleanup = await this._invokeWorkspacePrepare(element);
    } catch (err) {
      return this._onError(err, element);
    }
    const verificationError2 = this._checkWorkspaceUndo(
      strResource,
      element,
      editStackSnapshot,
      /*now also check that there are no more invalidated resources*/
      true
    );
    if (verificationError2) {
      cleanup.dispose();
      return verificationError2.returnValue;
    }
    for (const editStack of editStackSnapshot.editStacks) {
      editStack.moveBackward(element);
    }
    return this._safeInvokeWithLocks(element, () => element.actual.undo(), editStackSnapshot, cleanup, () => this._continueUndoInGroup(element.groupId, undoConfirmed));
  }
  _resourceUndo(editStack, element, undoConfirmed) {
    if (!element.isValid) {
      editStack.flushAllElements();
      return;
    }
    if (editStack.locked) {
      const message = nls.localize(
        { key: "cannotResourceUndoDueToInProgressUndoRedo", comment: ["{0} is a label for an operation."] },
        "Could not undo '{0}' because there is already an undo or redo operation running.",
        element.label
      );
      this._notificationService.warn(message);
      return;
    }
    return this._invokeResourcePrepare(element, (cleanup) => {
      editStack.moveBackward(element);
      return this._safeInvokeWithLocks(element, () => element.actual.undo(), new EditStackSnapshot([editStack]), cleanup, () => this._continueUndoInGroup(element.groupId, undoConfirmed));
    });
  }
  _findClosestUndoElementInGroup(groupId) {
    if (!groupId) {
      return [null, null];
    }
    let matchedElement = null;
    let matchedStrResource = null;
    for (const [strResource, editStack] of this._editStacks) {
      const candidate = editStack.getClosestPastElement();
      if (!candidate) {
        continue;
      }
      if (candidate.groupId === groupId) {
        if (!matchedElement || candidate.groupOrder > matchedElement.groupOrder) {
          matchedElement = candidate;
          matchedStrResource = strResource;
        }
      }
    }
    return [matchedElement, matchedStrResource];
  }
  _continueUndoInGroup(groupId, undoConfirmed) {
    if (!groupId) {
      return;
    }
    const [, matchedStrResource] = this._findClosestUndoElementInGroup(groupId);
    if (matchedStrResource) {
      return this._undo(matchedStrResource, 0, undoConfirmed);
    }
  }
  undo(resourceOrSource) {
    if (resourceOrSource instanceof UndoRedoSource) {
      const [, matchedStrResource] = this._findClosestUndoElementWithSource(resourceOrSource.id);
      return matchedStrResource ? this._undo(matchedStrResource, resourceOrSource.id, false) : void 0;
    }
    if (typeof resourceOrSource === "string") {
      return this._undo(resourceOrSource, 0, false);
    }
    return this._undo(this.getUriComparisonKey(resourceOrSource), 0, false);
  }
  _undo(strResource, sourceId = 0, undoConfirmed) {
    if (!this._editStacks.has(strResource)) {
      return;
    }
    const editStack = this._editStacks.get(strResource);
    const element = editStack.getClosestPastElement();
    if (!element) {
      return;
    }
    if (element.groupId) {
      const [matchedElement, matchedStrResource] = this._findClosestUndoElementInGroup(element.groupId);
      if (element !== matchedElement && matchedStrResource) {
        return this._undo(matchedStrResource, sourceId, undoConfirmed);
      }
    }
    const shouldPromptForConfirmation = element.sourceId !== sourceId || element.confirmBeforeUndo;
    if (shouldPromptForConfirmation && !undoConfirmed) {
      return this._confirmAndContinueUndo(strResource, sourceId, element);
    }
    try {
      if (element.type === UndoRedoElementType.Workspace) {
        return this._workspaceUndo(strResource, element, undoConfirmed);
      } else {
        return this._resourceUndo(editStack, element, undoConfirmed);
      }
    } finally {
      if (DEBUG) {
        this._print("undo");
      }
    }
  }
  async _confirmAndContinueUndo(strResource, sourceId, element) {
    const result = await this._dialogService.confirm({
      message: nls.localize("confirmDifferentSource", "Would you like to undo '{0}'?", element.label),
      primaryButton: nls.localize({ key: "confirmDifferentSource.yes", comment: ["&& denotes a mnemonic"] }, "&&Yes"),
      cancelButton: nls.localize("confirmDifferentSource.no", "No")
    });
    if (!result.confirmed) {
      return;
    }
    return this._undo(strResource, sourceId, true);
  }
  _findClosestRedoElementWithSource(sourceId) {
    if (!sourceId) {
      return [null, null];
    }
    let matchedElement = null;
    let matchedStrResource = null;
    for (const [strResource, editStack] of this._editStacks) {
      const candidate = editStack.getClosestFutureElement();
      if (!candidate) {
        continue;
      }
      if (candidate.sourceId === sourceId) {
        if (!matchedElement || candidate.sourceOrder < matchedElement.sourceOrder) {
          matchedElement = candidate;
          matchedStrResource = strResource;
        }
      }
    }
    return [matchedElement, matchedStrResource];
  }
  canRedo(resourceOrSource) {
    if (resourceOrSource instanceof UndoRedoSource) {
      const [, matchedStrResource] = this._findClosestRedoElementWithSource(resourceOrSource.id);
      return matchedStrResource ? true : false;
    }
    const strResource = this.getUriComparisonKey(resourceOrSource);
    if (this._editStacks.has(strResource)) {
      const editStack = this._editStacks.get(strResource);
      return editStack.hasFutureElements();
    }
    return false;
  }
  _tryToSplitAndRedo(strResource, element, ignoreResources, message) {
    if (element.canSplit()) {
      this._splitFutureWorkspaceElement(element, ignoreResources);
      this._notificationService.warn(message);
      return new WorkspaceVerificationError(this._redo(strResource));
    } else {
      for (const strResource2 of element.strResources) {
        this.removeElements(strResource2);
      }
      this._notificationService.warn(message);
      return new WorkspaceVerificationError();
    }
  }
  _checkWorkspaceRedo(strResource, element, editStackSnapshot, checkInvalidatedResources) {
    if (element.removedResources) {
      return this._tryToSplitAndRedo(
        strResource,
        element,
        element.removedResources,
        nls.localize(
          { key: "cannotWorkspaceRedo", comment: ["{0} is a label for an operation. {1} is another message."] },
          "Could not redo '{0}' across all files. {1}",
          element.label,
          element.removedResources.createMessage()
        )
      );
    }
    if (checkInvalidatedResources && element.invalidatedResources) {
      return this._tryToSplitAndRedo(
        strResource,
        element,
        element.invalidatedResources,
        nls.localize(
          { key: "cannotWorkspaceRedo", comment: ["{0} is a label for an operation. {1} is another message."] },
          "Could not redo '{0}' across all files. {1}",
          element.label,
          element.invalidatedResources.createMessage()
        )
      );
    }
    const cannotRedoDueToResources = [];
    for (const editStack of editStackSnapshot.editStacks) {
      if (editStack.getClosestFutureElement() !== element) {
        cannotRedoDueToResources.push(editStack.resourceLabel);
      }
    }
    if (cannotRedoDueToResources.length > 0) {
      return this._tryToSplitAndRedo(
        strResource,
        element,
        null,
        nls.localize(
          { key: "cannotWorkspaceRedoDueToChanges", comment: ["{0} is a label for an operation. {1} is a list of filenames."] },
          "Could not redo '{0}' across all files because changes were made to {1}",
          element.label,
          cannotRedoDueToResources.join(", ")
        )
      );
    }
    const cannotLockDueToResources = [];
    for (const editStack of editStackSnapshot.editStacks) {
      if (editStack.locked) {
        cannotLockDueToResources.push(editStack.resourceLabel);
      }
    }
    if (cannotLockDueToResources.length > 0) {
      return this._tryToSplitAndRedo(
        strResource,
        element,
        null,
        nls.localize(
          { key: "cannotWorkspaceRedoDueToInProgressUndoRedo", comment: ["{0} is a label for an operation. {1} is a list of filenames."] },
          "Could not redo '{0}' across all files because there is already an undo or redo operation running on {1}",
          element.label,
          cannotLockDueToResources.join(", ")
        )
      );
    }
    if (!editStackSnapshot.isValid()) {
      return this._tryToSplitAndRedo(
        strResource,
        element,
        null,
        nls.localize(
          { key: "cannotWorkspaceRedoDueToInMeantimeUndoRedo", comment: ["{0} is a label for an operation. {1} is a list of filenames."] },
          "Could not redo '{0}' across all files because an undo or redo operation occurred in the meantime",
          element.label
        )
      );
    }
    return null;
  }
  _workspaceRedo(strResource, element) {
    const affectedEditStacks = this._getAffectedEditStacks(element);
    const verificationError = this._checkWorkspaceRedo(
      strResource,
      element,
      affectedEditStacks,
      /*invalidated resources will be checked after the prepare call*/
      false
    );
    if (verificationError) {
      return verificationError.returnValue;
    }
    return this._executeWorkspaceRedo(strResource, element, affectedEditStacks);
  }
  async _executeWorkspaceRedo(strResource, element, editStackSnapshot) {
    let cleanup;
    try {
      cleanup = await this._invokeWorkspacePrepare(element);
    } catch (err) {
      return this._onError(err, element);
    }
    const verificationError = this._checkWorkspaceRedo(
      strResource,
      element,
      editStackSnapshot,
      /*now also check that there are no more invalidated resources*/
      true
    );
    if (verificationError) {
      cleanup.dispose();
      return verificationError.returnValue;
    }
    for (const editStack of editStackSnapshot.editStacks) {
      editStack.moveForward(element);
    }
    return this._safeInvokeWithLocks(element, () => element.actual.redo(), editStackSnapshot, cleanup, () => this._continueRedoInGroup(element.groupId));
  }
  _resourceRedo(editStack, element) {
    if (!element.isValid) {
      editStack.flushAllElements();
      return;
    }
    if (editStack.locked) {
      const message = nls.localize(
        { key: "cannotResourceRedoDueToInProgressUndoRedo", comment: ["{0} is a label for an operation."] },
        "Could not redo '{0}' because there is already an undo or redo operation running.",
        element.label
      );
      this._notificationService.warn(message);
      return;
    }
    return this._invokeResourcePrepare(element, (cleanup) => {
      editStack.moveForward(element);
      return this._safeInvokeWithLocks(element, () => element.actual.redo(), new EditStackSnapshot([editStack]), cleanup, () => this._continueRedoInGroup(element.groupId));
    });
  }
  _findClosestRedoElementInGroup(groupId) {
    if (!groupId) {
      return [null, null];
    }
    let matchedElement = null;
    let matchedStrResource = null;
    for (const [strResource, editStack] of this._editStacks) {
      const candidate = editStack.getClosestFutureElement();
      if (!candidate) {
        continue;
      }
      if (candidate.groupId === groupId) {
        if (!matchedElement || candidate.groupOrder < matchedElement.groupOrder) {
          matchedElement = candidate;
          matchedStrResource = strResource;
        }
      }
    }
    return [matchedElement, matchedStrResource];
  }
  _continueRedoInGroup(groupId) {
    if (!groupId) {
      return;
    }
    const [, matchedStrResource] = this._findClosestRedoElementInGroup(groupId);
    if (matchedStrResource) {
      return this._redo(matchedStrResource);
    }
  }
  redo(resourceOrSource) {
    if (resourceOrSource instanceof UndoRedoSource) {
      const [, matchedStrResource] = this._findClosestRedoElementWithSource(resourceOrSource.id);
      return matchedStrResource ? this._redo(matchedStrResource) : void 0;
    }
    if (typeof resourceOrSource === "string") {
      return this._redo(resourceOrSource);
    }
    return this._redo(this.getUriComparisonKey(resourceOrSource));
  }
  _redo(strResource) {
    if (!this._editStacks.has(strResource)) {
      return;
    }
    const editStack = this._editStacks.get(strResource);
    const element = editStack.getClosestFutureElement();
    if (!element) {
      return;
    }
    if (element.groupId) {
      const [matchedElement, matchedStrResource] = this._findClosestRedoElementInGroup(element.groupId);
      if (element !== matchedElement && matchedStrResource) {
        return this._redo(matchedStrResource);
      }
    }
    try {
      if (element.type === UndoRedoElementType.Workspace) {
        return this._workspaceRedo(strResource, element);
      } else {
        return this._resourceRedo(editStack, element);
      }
    } finally {
      if (DEBUG) {
        this._print("redo");
      }
    }
  }
};
UndoRedoService = __decorateClass([
  __decorateParam(0, IDialogService),
  __decorateParam(1, INotificationService)
], UndoRedoService);
class WorkspaceVerificationError {
  constructor(returnValue) {
    this.returnValue = returnValue;
  }
  static {
    __name(this, "WorkspaceVerificationError");
  }
}
registerSingleton(IUndoRedoService, UndoRedoService, InstantiationType.Delayed);
export {
  UndoRedoService
};
//# sourceMappingURL=undoRedoService.js.map
