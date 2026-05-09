const i = { firstPage: [], total: 0, pageSize: 50, getPage: async () => [] },

	s = (t) => () =>
		Promise.reject(
			new Error(
				"[LandFix] ExtensionGalleryService is no-op (offline marketplace): " +
					t,
			),
		);

class r {

	_serviceBrand = void 0;

	isEnabled() {

		return !1;
	}

	async query(n, e) {

		return i;
	}

	async getExtensions(n, e, o) {

		return [];
	}

	async isExtensionCompatible(n) {

		return !1;
	}

	async getCompatibleExtension(n, e, o) {

		return null;
	}

	async getAllCompatibleVersions(n, e, o) {

		return [];
	}

	async download(n, e, o) {

		return s("download")();
	}

	async downloadSignatureArchive(n, e) {

		return s("downloadSignatureArchive")();
	}

	async reportStatistic(n, e, o, a) {}

	async getReadme(n, e) {

		return "";
	}

	async getManifest(n, e) {

		return null;
	}

	async getChangelog(n, e) {

		return "";
	}

	async getCoreTranslation(n, e) {

		return null;
	}

	async getExtensionsControlManifest() {

		return { malicious: [], deprecated: {}, search: [] };
	}

	async getExtensionMcpManifest() {

		return null;
	}
}

const u = r;

var l = r;

export {
	r as AbstractExtensionGalleryService,
	r as ExtensionGalleryService,
	u as ExtensionGalleryService_default,
	l as default,
};
