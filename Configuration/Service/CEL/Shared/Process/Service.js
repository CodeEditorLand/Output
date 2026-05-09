import { TauriMainProcessService as o } from "./TauriMainProcessService.js";

class e extends o {

	constructor(r, t) {

		super(r);
	}

	notifyRestored() {}

	async getConnection() {

		return this;
	}
}

var i = e;

export { e as SharedProcessService, i as default };
