import { TauriMainProcessService } from "./TauriMainProcessService.js";

var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });

class SharedProcessService extends TauriMainProcessService {
	static {
		__name(this, "SharedProcessService");
	}
	constructor(WindowId, _LogService) {
		super(WindowId);
	}
	notifyRestored() {}
	async getConnection() {
		return this;
	}
}
var CELSharedProcessService_default = SharedProcessService;
export { SharedProcessService, CELSharedProcessService_default as default };
//# sourceMappingURL=CELSharedProcessService.js.map
