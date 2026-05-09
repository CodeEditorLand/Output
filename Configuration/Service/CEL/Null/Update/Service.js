const s = { dispose: () => {} },

	n = (a, o, t) => s;

class e {

	state = { type: "idle", updateType: 0 };

	onStateChange = n;

	_serviceBrand = void 0;

	async checkForUpdates(o) {}

	async downloadUpdate() {}

	async applyUpdate() {}

	async quitAndInstall() {}

	async isLatestVersion() {

		return !0;
	}

	async _applySpecificUpdate(o) {}
}

const i = e;

var d = e;

export {
	e as AbstractUpdateService,
	e as UpdateService,
	i as UpdateService_default,
	d as default,
};
