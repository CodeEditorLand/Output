var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { localize, localize2 } from "../../../nls.js";
import { Action2 } from "../../../platform/actions/common/actions.js";
import { ILocalizedString } from "../../../platform/action/common/action.js";
import product from "../../../platform/product/common/product.js";
import { IDialogService } from "../../../platform/dialogs/common/dialogs.js";
import { ServicesAccessor } from "../../../platform/instantiation/common/instantiation.js";
import { INativeHostService } from "../../../platform/native/common/native.js";
import { toErrorMessage } from "../../../base/common/errorMessage.js";
import { IProductService } from "../../../platform/product/common/productService.js";
import { isCancellationError } from "../../../base/common/errors.js";
const shellCommandCategory = localize2("shellCommand", "Shell Command");
class InstallShellScriptAction extends Action2 {
  static {
    __name(this, "InstallShellScriptAction");
  }
  constructor() {
    super({
      id: "workbench.action.installCommandLine",
      title: localize2("install", "Install '{0}' command in PATH", product.applicationName),
      category: shellCommandCategory,
      f1: true
    });
  }
  async run(accessor) {
    const nativeHostService = accessor.get(INativeHostService);
    const dialogService = accessor.get(IDialogService);
    const productService = accessor.get(IProductService);
    try {
      await nativeHostService.installShellCommand();
      dialogService.info(localize("successIn", "Shell command '{0}' successfully installed in PATH.", productService.applicationName));
    } catch (error) {
      if (isCancellationError(error)) {
        return;
      }
      dialogService.error(toErrorMessage(error));
    }
  }
}
class UninstallShellScriptAction extends Action2 {
  static {
    __name(this, "UninstallShellScriptAction");
  }
  constructor() {
    super({
      id: "workbench.action.uninstallCommandLine",
      title: localize2("uninstall", "Uninstall '{0}' command from PATH", product.applicationName),
      category: shellCommandCategory,
      f1: true
    });
  }
  async run(accessor) {
    const nativeHostService = accessor.get(INativeHostService);
    const dialogService = accessor.get(IDialogService);
    const productService = accessor.get(IProductService);
    try {
      await nativeHostService.uninstallShellCommand();
      dialogService.info(localize("successFrom", "Shell command '{0}' successfully uninstalled from PATH.", productService.applicationName));
    } catch (error) {
      if (isCancellationError(error)) {
        return;
      }
      dialogService.error(toErrorMessage(error));
    }
  }
}
export {
  InstallShellScriptAction,
  UninstallShellScriptAction
};
//# sourceMappingURL=installActions.js.map
