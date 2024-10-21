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
import { raceCancellation } from "../../../../base/common/async.js";
import { CancellationToken, CancellationTokenSource } from "../../../../base/common/cancellation.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IProgress, IProgressService, IProgressStep, ProgressLocation } from "../../../../platform/progress/common/progress.js";
import { IDisposable, Disposable, toDisposable } from "../../../../base/common/lifecycle.js";
import { IStoredFileWorkingCopySaveParticipant, IStoredFileWorkingCopySaveParticipantContext } from "./workingCopyFileService.js";
import { IStoredFileWorkingCopy, IStoredFileWorkingCopyModel } from "./storedFileWorkingCopy.js";
import { LinkedList } from "../../../../base/common/linkedList.js";
import { CancellationError, isCancellationError } from "../../../../base/common/errors.js";
import { NotificationPriority } from "../../../../platform/notification/common/notification.js";
import { localize } from "../../../../nls.js";
let StoredFileWorkingCopySaveParticipant = class extends Disposable {
  constructor(logService, progressService) {
    super();
    this.logService = logService;
    this.progressService = progressService;
  }
  static {
    __name(this, "StoredFileWorkingCopySaveParticipant");
  }
  saveParticipants = new LinkedList();
  get length() {
    return this.saveParticipants.size;
  }
  addSaveParticipant(participant) {
    const remove = this.saveParticipants.push(participant);
    return toDisposable(() => remove());
  }
  async participate(workingCopy, context, progress, token) {
    const cts = new CancellationTokenSource(token);
    workingCopy.model?.pushStackElement();
    progress.report({
      message: localize("saveParticipants1", "Running Code Actions and Formatters...")
    });
    let bubbleCancel = false;
    await this.progressService.withProgress({
      priority: NotificationPriority.URGENT,
      location: ProgressLocation.Notification,
      cancellable: localize("skip", "Skip"),
      delay: workingCopy.isDirty() ? 5e3 : 3e3
    }, async (progress2) => {
      for (const saveParticipant of this.saveParticipants) {
        if (cts.token.isCancellationRequested || workingCopy.isDisposed()) {
          break;
        }
        try {
          const promise = saveParticipant.participate(workingCopy, context, progress2, cts.token);
          await raceCancellation(promise, cts.token);
        } catch (err) {
          if (!isCancellationError(err)) {
            this.logService.error(err);
          } else if (!cts.token.isCancellationRequested) {
            cts.cancel();
            bubbleCancel = true;
          }
        }
      }
    }, () => {
      cts.cancel();
    });
    workingCopy.model?.pushStackElement();
    cts.dispose();
    if (bubbleCancel) {
      throw new CancellationError();
    }
  }
  dispose() {
    this.saveParticipants.clear();
    super.dispose();
  }
};
StoredFileWorkingCopySaveParticipant = __decorateClass([
  __decorateParam(0, ILogService),
  __decorateParam(1, IProgressService)
], StoredFileWorkingCopySaveParticipant);
export {
  StoredFileWorkingCopySaveParticipant
};
//# sourceMappingURL=storedFileWorkingCopySaveParticipant.js.map
