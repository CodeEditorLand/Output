var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import * as nls from "../../../../nls.js";
import { IWorkspaceFolder } from "../../../../platform/workspace/common/workspace.js";
import { ITaskSystem } from "../common/taskSystem.js";
import { ExecutionEngine } from "../common/tasks.js";
import { AbstractTaskService, IWorkspaceFolderConfigurationResult } from "./abstractTaskService.js";
import { ITaskFilter, ITaskService } from "../common/taskService.js";
import { InstantiationType, registerSingleton } from "../../../../platform/instantiation/common/extensions.js";
class TaskService extends AbstractTaskService {
  static {
    __name(this, "TaskService");
  }
  static ProcessTaskSystemSupportMessage = nls.localize("taskService.processTaskSystem", "Process task system is not support in the web.");
  _getTaskSystem() {
    if (this._taskSystem) {
      return this._taskSystem;
    }
    if (this.executionEngine !== ExecutionEngine.Terminal) {
      throw new Error(TaskService.ProcessTaskSystemSupportMessage);
    }
    this._taskSystem = this._createTerminalTaskSystem();
    this._taskSystemListeners = [
      this._taskSystem.onDidStateChange((event) => {
        this._taskRunningState.set(this._taskSystem.isActiveSync());
        this._onDidStateChange.fire(event);
      })
    ];
    return this._taskSystem;
  }
  _computeLegacyConfiguration(workspaceFolder) {
    throw new Error(TaskService.ProcessTaskSystemSupportMessage);
  }
  _versionAndEngineCompatible(filter) {
    return this.executionEngine === ExecutionEngine.Terminal;
  }
}
registerSingleton(ITaskService, TaskService, InstantiationType.Delayed);
export {
  TaskService
};
//# sourceMappingURL=taskService.js.map
