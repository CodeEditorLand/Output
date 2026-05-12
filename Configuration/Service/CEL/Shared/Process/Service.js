var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { TauriMainProcessService } from "./TauriMainProcessService.js";
class SharedProcessService extends TauriMainProcessService {
  static {
    __name(this, "SharedProcessService");
  }
  constructor(WindowId, _LogService) {
    super(WindowId);
  }
  notifyRestored() {
  }
  async getConnection() {
    return this;
  }
}
var Service_default = SharedProcessService;
export {
  SharedProcessService,
  Service_default as default
};
//# sourceMappingURL=Service.js.map
