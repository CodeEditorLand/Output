var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const EmptyPager = {
	firstPage: [],
	total: 0,
	pageSize: 50,
	getPage: /* @__PURE__ */ __name(async () => [], "getPage"),
};
const Reject = /* @__PURE__ */ __name(
	(Operation) => () =>
		Promise.reject(
			new Error(
				"[LandFix] ExtensionGalleryService is no-op (offline marketplace): " +
					Operation,
			),
		),
	"Reject",
);
class NullExtensionGalleryService {
	static {
		__name(this, "NullExtensionGalleryService");
	}
	_serviceBrand = void 0;
	isEnabled() {
		return false;
	}
	async query(_Options, _Token) {
		return EmptyPager;
	}
	async getExtensions(_ExtensionInfos, _Arg2, _Arg3) {
		return [];
	}
	async isExtensionCompatible(_Extension) {
		return false;
	}
	async getCompatibleExtension(
		_Extension,
		_IncludePreRelease,
		_TargetPlatform,
	) {
		return null;
	}
	async getAllCompatibleVersions(
		_Extension,
		_IncludePreRelease,
		_TargetPlatform,
	) {
		return [];
	}
	async download(_Extension, _Location, _Operation) {
		return Reject("download")();
	}
	async downloadSignatureArchive(_Extension, _Location) {
		return Reject("downloadSignatureArchive")();
	}
	async reportStatistic(_Publisher, _Name, _Version, _Type) {}
	async getReadme(_Extension, _Token) {
		return "";
	}
	async getManifest(_Extension, _Token) {
		return null;
	}
	async getChangelog(_Extension, _Token) {
		return "";
	}
	async getCoreTranslation(_Extension, _LanguageId) {
		return null;
	}
	async getExtensionsControlManifest() {
		return { malicious: [], deprecated: {}, search: [] };
	}
	async getExtensionMcpManifest() {
		return null;
	}
}
const ExtensionGalleryService_default = NullExtensionGalleryService;
var Service_default = NullExtensionGalleryService;
export {
	NullExtensionGalleryService as AbstractExtensionGalleryService,
	NullExtensionGalleryService as ExtensionGalleryService,
	ExtensionGalleryService_default,
	Service_default as default,
};
//# sourceMappingURL=Service.js.map
