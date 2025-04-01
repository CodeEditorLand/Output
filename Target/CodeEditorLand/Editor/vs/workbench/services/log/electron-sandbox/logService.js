var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { DisposableStore } from "../../../../base/common/lifecycle.js";
import { ConsoleLogger, ILogger } from "../../../../platform/log/common/log.js";
import { LoggerChannelClient } from "../../../../platform/log/common/logIpc.js";
import { LogService } from "../../../../platform/log/common/logService.js";
import { INativeWorkbenchEnvironmentService } from "../../environment/electron-sandbox/environmentService.js";
import { windowLogGroup, windowLogId } from "../common/logConstants.js";
class NativeLogService extends LogService {
  static {
    __name(this, "NativeLogService");
  }
  constructor(loggerService, environmentService) {
    const disposables = new DisposableStore();
    const fileLogger = disposables.add(
      loggerService.createLogger(environmentService.logFile, {
        id: windowLogId,
        name: windowLogGroup.name,
        group: windowLogGroup
      })
    );
    let consoleLogger;
    if (environmentService.isExtensionDevelopment && !!environmentService.extensionTestsLocationURI) {
      consoleLogger = loggerService.createConsoleMainLogger();
    } else {
      consoleLogger = new ConsoleLogger(fileLogger.getLevel());
    }
    super(fileLogger, [consoleLogger]);
    this._register(disposables);
  }
}
export {
  NativeLogService
};
//# sourceMappingURL=logService.js.map
